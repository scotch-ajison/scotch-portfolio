import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import ProjectCard from "@/components/work/ProjectCard"
import ProjectMap from "@/components/ProjectMap"
import { listed, counts, rhythm } from "@/content/derived"
import { profile } from "@/content/profile"

export const metadata: Metadata = {
  title: "Work",
  description:
    "National systems for government, police, banks and regulators, plus open source tools and research. Each case study covers the problem, the approach and the result.",
}

export default function WorkPage() {
  const spans = rhythm(listed)

  return (
    <>
      <section className="max-w-[1240px] mx-auto px-6 pt-32 md:pt-44 pb-12">
        <p className="font-mono text-[11px] text-fg-subtle tracking-[0.2em] uppercase mb-8">
          Work · {counts.projects} projects
        </p>

        <h1
          className="font-display font-semibold text-fg tracking-[-0.035em] leading-[0.98] max-w-[16ch]"
          style={{ fontSize: "clamp(42px, 7vw, 84px)" }}
        >
          Systems that stayed <span className="text-accent">switched on</span>.
        </h1>

        <p className="text-fg-muted text-[17px] leading-[1.7] mt-8 max-w-[62ch]">
          Production platforms used every day by government agencies, the
          police, banks and regulators, alongside the open source tools and
          research I build in my own time. Live sites and public repositories
          are linked, and internal systems are marked as such.
        </p>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px mt-14 border border-border rounded-md overflow-hidden bg-border">
          {[
            { v: String(counts.projects), k: "Projects" },
            { v: String(counts.live), k: "Live in production" },
            { v: String(counts.publicRepos), k: "Public repositories" },
            { v: `${counts.years}+`, k: "Years" },
          ].map((s) => (
            <div key={s.k} className="bg-card px-5 py-6 md:px-7">
              <dt className="sr-only">{s.k}</dt>
              <dd>
                <span className="block font-display font-semibold text-3xl md:text-4xl text-fg tracking-[-0.03em] leading-none tabular-nums">
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

      <section className="max-w-[1240px] mx-auto px-6 pb-14">
        <ScrollReveal>
          <p className="section-mark mb-8">§ 01 · Where the work is</p>
          <ProjectMap />
        </ScrollReveal>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pb-8">
        <ScrollReveal>
          <p className="section-mark mb-8">§ 02 · Case studies</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {listed.map((p, i) => (
            <ScrollReveal
              key={p.slug}
              delay={i % 2 === 1 ? 0.06 : 0}
              className={spans[i] === "full" ? "md:col-span-2" : "h-full"}
            >
              <ProjectCard project={p} span={spans[i]} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 py-16">
        <ScrollReveal>
          <div className="border border-border rounded-md p-10 md:p-14 bg-ink-raised flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-[52ch]">
              <h2 className="font-display font-semibold text-2xl md:text-[32px] text-fg tracking-[-0.025em] leading-[1.1]">
                Some of this work is under NDA, and I can talk through most of it.
              </h2>
              <p className="text-fg-muted text-[15px] leading-[1.7] mt-4">
                {profile.availability}
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 font-display font-semibold text-[15px] px-7 py-3.5 rounded-md
                bg-accent text-accent-ink hover:brightness-110 transition-[filter] duration-150"
            >
              Get in touch
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
