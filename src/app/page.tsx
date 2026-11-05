import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import Portrait from "@/components/Portrait"
import ProjectCard from "@/components/work/ProjectCard"
import StackTag from "@/components/StackTag"
import { profile } from "@/content/profile"
import { featured, counts, clientNames, rhythm } from "@/content/derived"

export default function HomePage() {
  const spans = rhythm(featured.length)

  return (
    <>
      {/* ═══ HERO ════════════════════════════════════════════
          Static, no entrance animation and no canvas behind it.
          The headline is the LCP element; nothing should delay it. */}
      <section className="max-w-[1240px] mx-auto px-6 pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
          <div className="max-w-[760px]">
            <p className="font-mono text-[11px] text-fg-subtle tracking-[0.2em] uppercase mb-8">
              {profile.role} · {profile.location} · {profile.timezone}
            </p>

            <h1
              className="font-display font-semibold text-fg tracking-[-0.035em] leading-[0.98]"
              style={{ fontSize: "clamp(40px, 6.4vw, 76px)" }}
            >
              I build the spatial systems that land registries, banks and
              regulators <span className="text-accent">run on</span>.
            </h1>

            <p className="text-fg-muted text-[17px] md:text-[18px] leading-[1.7] mt-8 max-w-[58ch]">
              {profile.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-10">
              <Link
                href="/work"
                className="font-display font-semibold text-[15px] px-6 py-3 rounded-md
                  bg-accent text-accent-ink hover:brightness-110 transition-[filter] duration-150"
              >
                See the work
              </Link>
              <Link
                href="/contact"
                className="font-display font-semibold text-[15px] px-6 py-3 rounded-md
                  border border-border-strong text-fg hover:border-accent hover:text-accent
                  transition-colors duration-150"
              >
                Start a conversation
              </Link>
            </div>
          </div>

          <Portrait size={300} priority className="hidden lg:block" />
        </div>

        {/* Quiet proof strip. Every number is computed from the project
            list, so it cannot disagree with the page it links to. */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 md:mt-24 border border-border rounded-md overflow-hidden bg-border">
          {[
            { v: `${counts.years}+`, k: "Years in production GIS" },
            { v: String(counts.projects), k: "Projects documented" },
            { v: String(counts.live), k: "Live in production" },
            { v: String(counts.publicRepos), k: "Public repositories" },
          ].map((s) => (
            <div key={s.k} className="bg-ink px-5 py-6 md:px-7 md:py-8">
              <dt className="sr-only">{s.k}</dt>
              <dd>
                <span className="block font-display font-semibold text-3xl md:text-[40px] text-fg tracking-[-0.03em] leading-none tabular-nums">
                  {s.v}
                </span>
                <span className="block font-mono text-[10px] text-fg-subtle tracking-[0.14em] uppercase mt-3">
                  {s.k}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ═══ CLIENTS ═════════════════════════════════════════ */}
      <section
        aria-label="Clients and institutions"
        className="border-y border-border py-6 overflow-hidden"
      >
        <div className="flex w-max marquee-track" style={{ animation: "marquee 48s linear infinite" }}>
          {[...clientNames, ...clientNames].map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="font-mono text-[12px] text-fg-subtle tracking-[0.12em] uppercase px-8 whitespace-nowrap"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ SELECTED WORK ═══════════════════════════════════ */}
      <section className="max-w-[1240px] mx-auto px-6 pt-20 md:pt-28">
        <ScrollReveal>
          <p className="section-mark mb-10">§ 01 — Selected work</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.map((p, i) => (
            <ScrollReveal
              key={p.slug}
              delay={i % 2 === 1 ? 0.06 : 0}
              className={spans[i] === "full" ? "md:col-span-2" : "h-full"}
            >
              <ProjectCard project={p} span={spans[i]} index={i} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 flex justify-center">
            <Link
              href="/work"
              className="font-display font-semibold text-[15px] px-6 py-3 rounded-md
                border border-border-strong text-fg hover:border-accent hover:text-accent
                transition-colors duration-150"
            >
              All {counts.projects} projects
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ HOW I WORK ══════════════════════════════════════
          The differentiator. Most portfolios claim only successes; this
          one names the thing its own research could not detect. */}
      <section className="mt-24 md:mt-32 bg-paper text-fg-on-light on-paper">
        <div className="max-w-[1240px] mx-auto px-6 py-20 md:py-28">
          <ScrollReveal>
            <p className="section-mark mb-12">§ 02 — How I work</p>
          </ScrollReveal>

          <ScrollReveal>
            <blockquote className="pull-quote text-[30px] md:text-[46px] max-w-[22ch] md:max-w-[20ch]">
              Trained as a surveying engineer, so I think in error budgets,
              ground truth and validation samples.
            </blockquote>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 mt-16">
            {[
              {
                h: "Measured, not asserted",
                p: "My building-change research reports, in its own README, that vertical extension is not detectable at that resolution — the height deltas have symmetric tails at every threshold, which is what noise looks like. A negative result stated plainly is worth more than a number nobody checked.",
              },
              {
                h: "Safe by construction",
                p: "In the crop-disease pipeline the vision model may only describe what it sees; it is forbidden from naming a disease. A build-time validator fails the build if an output recommends a restricted pesticide. It caught eight, inherited from foreign extension sources.",
              },
              {
                h: "Built to be handed over",
                p: "I deployed GIS databases across more than ten rural district councils and trained the staff to run them without outside support. Installing the platform is the easy half; the councils still operating them is the part that counted.",
              },
            ].map((c) => (
              <ScrollReveal key={c.h}>
                <h3 className="font-display font-semibold text-xl tracking-[-0.015em] mb-3">
                  {c.h}
                </h3>
                <p className="text-[15px] text-fg-muted-on-light leading-[1.7]">{c.p}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITIES ════════════════════════════════════ */}
      <section className="max-w-[1240px] mx-auto px-6 py-20 md:py-28">
        <ScrollReveal>
          <p className="section-mark mb-12">§ 03 — Capabilities</p>
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

      {/* ═══ CTA ═════════════════════════════════════════════ */}
      <section className="max-w-[1240px] mx-auto px-6 pb-8">
        <ScrollReveal>
          <div className="border border-border rounded-md p-10 md:p-16 bg-ink-raised">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-[46ch]">
                <h2 className="font-display font-semibold text-3xl md:text-[44px] text-fg tracking-[-0.03em] leading-[1.06]">
                  Have a system that needs to know where things are?
                </h2>
                <p className="text-fg-muted text-[16px] leading-[1.7] mt-5">
                  {profile.availability} {profile.timezoneNote}.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 shrink-0">
                <Link
                  href="/contact"
                  className="font-display font-semibold text-[15px] px-7 py-3.5 rounded-md
                    bg-accent text-accent-ink hover:brightness-110 transition-[filter] duration-150"
                >
                  Start a conversation
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-[12px] text-fg-subtle hover:text-accent transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
