import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import Portrait from "@/components/Portrait"
import StackTag from "@/components/StackTag"
import { profile } from "@/content/profile"

export const metadata: Metadata = {
  title: "About",
  description:
    "Scotch Ajison — GIS systems architect in Harare. Six years building production spatial systems for land registries, banks and regulators, and applied AI on top of them.",
}

export default function AboutPage() {
  return (
    <>
      <section className="max-w-[1240px] mx-auto px-6 pt-32 md:pt-44 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
          <div className="max-w-[760px]">
            <p className="font-mono text-[11px] text-fg-subtle tracking-[0.2em] uppercase mb-8">
              About
            </p>
            <h1
              className="font-display font-semibold text-fg tracking-[-0.035em] leading-[1.0] max-w-[17ch]"
              style={{ fontSize: "clamp(38px, 5.8vw, 68px)" }}
            >
              Most of the difficulty was never the{" "}
              <span className="text-accent">analysis</span>.
            </h1>
          </div>
          <Portrait size={300} priority className="hidden lg:block" />
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-14 lg:gap-20">
          <div className="space-y-6 max-w-[64ch]">
            {profile.bio.map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <p className="text-fg-muted leading-[1.78] text-[16px] md:text-[17px]">{para}</p>
              </ScrollReveal>
            ))}

            <ScrollReveal>
              <h2 className="font-display font-semibold text-xl text-fg tracking-[-0.015em] pt-6">
                Where I am going
              </h2>
              <p className="text-fg-muted leading-[1.78] text-[16px] mt-3">
                The slow part of this work was never the analysis — it was hunting
                down data and reconciling identifiers that nobody designed to
                match. That is the part I now hand to machines, carefully and with
                the result measured. Retrieval that grounds a model in verified
                sources instead of its own priors. Evaluation harnesses that report
                a number rather than an impression. Validators that fail a build
                when an output is unsafe.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="lg:hidden pt-4">
                <Portrait size={240} />
              </div>
            </ScrollReveal>
          </div>

          <aside className="space-y-10">
            <ScrollReveal>
              <h2 className="font-mono text-[11px] text-fg-subtle uppercase tracking-[0.18em] pb-3 border-b border-border">
                Credentials
              </h2>
              <ul className="mt-4 space-y-3">
                {profile.credentials.map((c) => (
                  <li key={c} className="flex gap-3 text-[14px] text-fg-muted leading-relaxed">
                    <span className="text-accent shrink-0 mt-[7px] h-1 w-1 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-mono text-[11px] text-fg-subtle uppercase tracking-[0.18em] pb-3 border-b border-border">
                Working with me
              </h2>
              <dl className="mt-4 space-y-3 text-[14px]">
                {[
                  ["Based", `${profile.location} · ${profile.coordinates.label}`],
                  ["Hours", profile.timezoneNote],
                  ["Open to", profile.availability],
                  ["Languages", "English"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-4">
                    <dt className="font-mono text-[11px] text-fg-subtle uppercase tracking-[0.1em] w-20 shrink-0 pt-0.5">
                      {k}
                    </dt>
                    <dd className="text-fg-muted leading-relaxed">{v}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </aside>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="bg-paper text-fg-on-light on-paper">
        <div className="max-w-[1240px] mx-auto px-6 py-20 md:py-28">
          <ScrollReveal>
            <p className="section-mark mb-12">§ 01 — Experience</p>
          </ScrollReveal>

          <div className="space-y-12">
            {profile.experience.map((job) => (
              <ScrollReveal key={`${job.company}-${job.period}`}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-10 pb-12 border-b border-border-on-light last:border-0">
                  <div>
                    <p className="font-mono text-[11px] text-fg-muted-on-light tracking-[0.08em]">
                      {job.period}
                    </p>
                    <p className="font-mono text-[11px] text-fg-muted-on-light tracking-[0.08em] mt-1">
                      {job.location}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl md:text-2xl tracking-[-0.02em]">
                      {job.role}
                    </h3>
                    <p className="font-mono text-[12px] text-accent-paper tracking-[0.06em] mt-1.5">
                      {job.company}
                    </p>
                    <p className="text-[15px] text-fg-muted-on-light leading-[1.7] mt-4 max-w-[68ch]">
                      {job.summary}
                    </p>
                    {job.points.length > 0 && (
                      <ul className="mt-4 space-y-2.5 max-w-[68ch]">
                        {job.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex gap-3 text-[15px] text-fg-muted-on-light leading-[1.65]"
                          >
                            <span className="shrink-0 mt-[9px] h-1 w-1 rounded-full bg-accent-paper" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-[1240px] mx-auto px-6 py-20 md:py-28">
        <ScrollReveal>
          <p className="section-mark mb-12">§ 02 — Timeline</p>
        </ScrollReveal>
        <ol className="space-y-0">
          {profile.milestones.map((m) => (
            <ScrollReveal key={`${m.year}-${m.label}`}>
              <li className="flex gap-6 md:gap-10 py-4 border-b border-border">
                <span className="font-mono text-[13px] text-accent tabular-nums w-12 shrink-0 pt-0.5">
                  {m.year}
                </span>
                <span className="text-[15px] text-fg-muted leading-relaxed">{m.label}</span>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      {/* ── Stack ── */}
      <section className="max-w-[1240px] mx-auto px-6 pb-20 md:pb-28">
        <ScrollReveal>
          <p className="section-mark mb-12">§ 03 — Stack</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {profile.skills.map((group) => (
            <ScrollReveal key={group.group}>
              <h3 className="font-display font-semibold text-[17px] text-fg tracking-[-0.01em] pb-3 mb-4 border-b border-border">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <StackTag key={item} label={item} />
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pb-8">
        <ScrollReveal>
          <div className="border border-border rounded-md p-10 md:p-14 bg-ink-raised flex flex-col md:flex-row md:items-center justify-between gap-8">
            <h2 className="font-display font-semibold text-2xl md:text-[34px] text-fg tracking-[-0.025em] leading-[1.1] max-w-[22ch]">
              The work is more interesting than the summary.
            </h2>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/work"
                className="font-display font-semibold text-[15px] px-6 py-3.5 rounded-md
                  bg-accent text-accent-ink hover:brightness-110 transition-[filter] duration-150"
              >
                See the work
              </Link>
              <Link
                href="/contact"
                className="font-display font-semibold text-[15px] px-6 py-3.5 rounded-md
                  border border-border-strong text-fg hover:border-accent hover:text-accent transition-colors duration-150"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
