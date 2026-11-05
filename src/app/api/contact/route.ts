import { NextResponse } from "next/server"
import { Resend } from "resend"
import { escapeHtml, escapeHtmlBr, headerSafe } from "@/lib/html"
import {
  validateEnquiry,
  PROJECT_LABELS,
  BUDGET_LABELS,
  type Enquiry,
} from "@/lib/validate-enquiry"
import { siteUrl } from "@/lib/site"
import { profile } from "@/content/profile"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const RECIPIENT = process.env.ENQUIRY_RECIPIENT ?? profile.email

/**
 * Sending identities.
 *
 * `onboarding@resend.dev` is Resend's shared sandbox sender — it only ever
 * delivers to the Resend account owner's own verified address, so it works
 * by accident and stops the moment the recipient changes. Verify the domain
 * and set these, per the DNS steps in the README.
 */
const FROM_NOTIFICATIONS =
  process.env.RESEND_FROM_NOTIFICATIONS ?? "Scotch Ajison Portfolio <onboarding@resend.dev>"
const FROM_REPLIES = process.env.RESEND_FROM_REPLIES ?? FROM_NOTIFICATIONS

/**
 * Per-instance rate limit.
 *
 * Honest about what it is: a Map in one lambda's module scope. Cold starts
 * reset it and concurrent instances each keep their own, so it slows a
 * flood rather than stopping one. The checks that actually hold — origin,
 * honeypot, time trap — are stateless and run first. Upgrade path is
 * Upstash Redis; see the README.
 */
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3

function rateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) hits.clear() // crude ceiling; this map is not durable state
  return false
}

const clientKey = (req: Request): string =>
  (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]!.trim()

function notificationEmail(d: Enquiry) {
  const label = PROJECT_LABELS[d.projectType] ?? d.projectType
  const budget = d.budget ? (BUDGET_LABELS[d.budget] ?? d.budget) : null

  const text = [
    `New enquiry via ${siteUrl}`,
    "",
    `Name:         ${d.name}`,
    `Email:        ${d.email}`,
    `Organisation: ${d.organization}`,
    `Project:      ${label}`,
    budget ? `Budget:       ${budget}` : null,
    "",
    "Message:",
    d.message,
    "",
    `Reply directly to this email to reach ${d.name}.`,
  ]
    .filter((l) => l !== null)
    .join("\n")

  const row = (k: string, v: string) => `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid #232326;color:#8A8782;font-size:11px;letter-spacing:.12em;text-transform:uppercase;vertical-align:top;width:132px">${k}</td>
      <td style="padding:11px 0;border-bottom:1px solid #232326;color:#F0EDE7;font-size:14px">${v}</td>
    </tr>`

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:36px;background:#0B0B0C;color:#F0EDE7">
    <div style="border-bottom:2px solid #E8542B;padding-bottom:18px;margin-bottom:26px">
      <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#E8542B">New enquiry</div>
      <div style="font-size:22px;font-weight:600;margin-top:7px">${escapeHtml(d.name)} · ${escapeHtml(d.organization)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      ${row("Email", `<a href="mailto:${encodeURIComponent(d.email)}" style="color:#E8542B;text-decoration:none">${escapeHtml(d.email)}</a>`)}
      ${row("Project", escapeHtml(label))}
      ${budget ? row("Budget", escapeHtml(budget)) : ""}
    </table>
    <div style="margin-top:26px">
      <div style="color:#8A8782;font-size:11px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px">Message</div>
      <div style="color:#B5B1AA;font-size:15px;line-height:1.7">${escapeHtmlBr(d.message)}</div>
    </div>
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #232326">
      <a href="mailto:${encodeURIComponent(d.email)}" style="display:inline-block;background:#E8542B;color:#0B0B0C;text-decoration:none;font-weight:700;font-size:14px;padding:11px 24px;border-radius:6px">Reply to ${escapeHtml(d.name)}</a>
      <p style="margin-top:18px;color:#56534F;font-size:11px">Sent from the contact form at ${escapeHtml(siteUrl)}</p>
    </div>
  </div>`

  return { text, html, subject: `[Portfolio] New enquiry: ${label} — ${d.name}` }
}

function autoReplyEmail(d: Enquiry) {
  const text = [
    `Hi ${d.name},`,
    "",
    "Thanks for getting in touch — your message reached me and I read everything that comes through this form.",
    "I usually reply within 48 hours. If it's urgent, reply to this email directly.",
    "",
    "— Scotch Ajison",
    `${profile.role} · ${profile.location}`,
    siteUrl,
    "",
    "---",
    "Your message:",
    d.message,
  ].join("\n")

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:36px;color:#16161A">
    <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Hi ${escapeHtml(d.name)},</p>
    <p style="font-size:16px;line-height:1.7;margin:0 0 16px">Thanks for getting in touch — your message reached me, and I read everything that comes through this form.</p>
    <p style="font-size:16px;line-height:1.7;margin:0 0 24px">I usually reply within 48 hours. If it's urgent, just reply to this email directly.</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 4px"><strong>Scotch Ajison</strong></p>
    <p style="font-size:14px;color:#5A5852;margin:0 0 24px">${escapeHtml(profile.role)} · ${escapeHtml(profile.location)}<br><a href="${escapeHtml(siteUrl)}" style="color:#C23D16">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a></p>
    <div style="border-top:1px solid #DCD7CC;padding-top:18px">
      <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8A8782;margin-bottom:8px">Your message</div>
      <div style="font-size:14px;line-height:1.7;color:#5A5852">${escapeHtmlBr(d.message)}</div>
    </div>
  </div>`

  return { text, html, subject: "Thanks — your message reached me" }
}

export async function POST(request: Request) {
  try {
    // Origin check first: stateless, and it stops the trivial curl floods.
    const origin = request.headers.get("origin")
    const allowed = [siteUrl, "http://localhost:3000", "http://localhost:3005"]
    if (!origin || !allowed.includes(origin)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 })
    }

    const result = validateEnquiry(await request.json())

    // A bot that gets a 400 retries. A bot that gets a success moves on.
    if (!result.ok && result.reason === "bot") {
      return NextResponse.json({ success: true })
    }
    if (!result.ok) {
      return NextResponse.json(
        { error: "Please check the highlighted fields.", errors: result.errors },
        { status: 400 }
      )
    }

    if (rateLimited(clientKey(request))) {
      return NextResponse.json(
        { error: `Too many messages. Email ${RECIPIENT} directly.` },
        { status: 429 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: `Email isn't configured yet. Please write to ${RECIPIENT} directly.` },
        { status: 503 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const d = result.data
    const notification = notificationEmail(d)

    const { data, error } = await resend.emails.send({
      from: FROM_NOTIFICATIONS,
      to: [RECIPIENT],
      replyTo: headerSafe(d.email),
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
    })

    if (error) {
      console.error("[contact] notification rejected by Resend:", error)
      return NextResponse.json(
        { error: `Message could not be sent. Please email ${RECIPIENT} directly.` },
        { status: 502 }
      )
    }

    // Resend accepting a send is not the same as it being delivered: with
    // the shared sandbox sender it will accept the call and then drop the
    // message unless the recipient is the Resend account owner. Keep the
    // id so a send can actually be traced in the Resend dashboard instead
    // of guessed at.
    console.log(
      `[contact] queued id=${data?.id ?? "none"} from=${FROM_NOTIFICATIONS} to=${RECIPIENT}`
    )

    // Auto-reply is best effort — the enquiry is already delivered, so a
    // failure here must not report failure to the sender. Skipped when
    // someone submits the form using the recipient address, which would
    // otherwise bounce mail back and forth.
    if (d.email.toLowerCase() !== RECIPIENT.toLowerCase()) {
      const reply = autoReplyEmail(d)
      try {
        await resend.emails.send({
          from: FROM_REPLIES,
          to: [headerSafe(d.email)],
          replyTo: RECIPIENT,
          subject: reply.subject,
          text: reply.text,
          html: reply.html,
          headers: { "Auto-Submitted": "auto-replied" },
        })
      } catch (err) {
        console.error("[contact] auto-reply failed:", err)
      }
    }

    return NextResponse.json({ success: true, id: data?.id ?? null })
  } catch (err) {
    console.error("[contact] route error:", err)
    return NextResponse.json(
      { error: `Something broke. Please email ${RECIPIENT} directly.` },
      { status: 500 }
    )
  }
}
