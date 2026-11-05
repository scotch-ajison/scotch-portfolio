import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * TEMPORARY — delivery diagnostics. Delete once the sending domain is
 * verified.
 *
 * The Resend key is marked sensitive in Vercel, so its value cannot be
 * read back and the API cannot be queried from a laptop. This runs on the
 * server, where the key already lives, and reports only what Resend says
 * about delivery.
 *
 * It never returns the key, any part of it, or its length. Reading a
 * message needs that message's full UUID, which is not enumerable, and
 * only delivery metadata comes back — no message bodies.
 */
export async function GET(request: Request) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set" }, { status: 503 })
  }

  const id = new URL(request.url).searchParams.get("id")

  // No id: report the sending setup, which is what decides whether
  // anything can be delivered at all.
  if (!id) {
    const res = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    })
    const body = (await res.json().catch(() => null)) as { data?: unknown[] } | null
    const domains = Array.isArray(body?.data)
      ? (body.data as Array<Record<string, unknown>>).map((d) => ({
          name: d.name,
          status: d.status,
          region: d.region,
        }))
      : []
    return NextResponse.json({
      keyAccepted: res.ok,
      domainsStatus: res.status,
      verifiedDomains: domains,
      from: process.env.RESEND_FROM_NOTIFICATIONS ?? "Portfolio <onboarding@resend.dev>",
      recipientOverrideSet: Boolean(process.env.ENQUIRY_RECIPIENT),
    })
  }

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: "id must be a message UUID" }, { status: 400 })
  }

  const res = await fetch(`https://api.resend.com/emails/${id}`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: "no-store",
  })
  const body = (await res.json().catch(() => null)) as Record<string, unknown> | null

  return NextResponse.json({
    status: res.status,
    to: body?.to ?? null,
    from: body?.from ?? null,
    subject: body?.subject ?? null,
    created_at: body?.created_at ?? null,
    last_event: body?.last_event ?? null,
    message: res.ok ? null : body?.message ?? null,
  })
}
