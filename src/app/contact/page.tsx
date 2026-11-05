import type { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import ContactForm from "@/components/ContactForm"
import ContactGlobe from "@/components/three/ContactGlobeWrapper"
import { profile } from "@/content/profile"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for GIS consultancy, drone data processing, spatial data consulting, or research collaboration.",
}

const processSteps = [
  { step: "01", text: "I'll review your inquiry within 48 hours" },
  { step: "02", text: "If it's a good fit, we'll schedule a discovery call" },
  {
    step: "03",
    text: "I'll provide a scoped proposal with clear deliverables",
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ─── HEADER ── Dark section ──────────────────────── */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
        {/* 3D Globe */}
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{ top: "-20px", right: "80px", width: "420px", height: "420px", opacity: 0.75 }}
        >
          <ContactGlobe />
        </div>

        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(7,8,15,1) 40%, rgba(7,8,15,0.55) 72%, rgba(7,8,15,0.1) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #07080F)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-[11px] text-electric tracking-[0.2em] uppercase mb-6">
              Get in Touch
            </p>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-fg tracking-tight leading-[1.05]">
              Start a conversation.
            </h1>
            <p className="text-fg-muted text-lg leading-relaxed mt-6 max-w-2xl">
              I take on a limited number of consultancy projects — focused on
              work where deep GIS expertise makes the difference.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FORM + DETAILS ── Dark section ──────────────── */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-border pt-16 md:pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24">
              <div>
                <ScrollReveal>
                  <ContactForm />
                </ScrollReveal>
              </div>

              <div>
                <ScrollReveal delay={0.1}>
                  <div className="lg:sticky lg:top-28 space-y-0">
                    <div className="py-6 border-b border-border">
                      <p className="font-mono text-[11px] text-fg-subtle tracking-[0.15em] uppercase mb-2">
                        Email
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="group flex items-center gap-2 text-fg hover:text-electric transition-colors font-medium"
                      >
                        {profile.email}
                        <span className="text-fg-subtle group-hover:text-electric transition-colors text-xs">
                          →
                        </span>
                      </a>
                    </div>

                    <div className="py-6 border-b border-border">
                      <p className="font-mono text-[11px] text-fg-subtle tracking-[0.15em] uppercase mb-2">
                        LinkedIn
                      </p>
                      <a
                        href={profile.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-fg hover:text-electric transition-colors font-medium"
                      >
                        LinkedIn profile
                        <span className="text-fg-subtle group-hover:text-electric transition-colors text-xs">
                          ↗
                        </span>
                      </a>
                    </div>

                    <div className="py-6 border-b border-border">
                      <p className="font-mono text-[11px] text-fg-subtle tracking-[0.15em] uppercase mb-2">
                        Location
                      </p>
                      <p className="text-fg font-medium">{profile.location}</p>
                      <p className="font-mono text-[11px] text-fg-subtle mt-1">
                        {profile.coordinates.label}
                      </p>
                      <p className="font-mono text-[11px] text-fg-subtle/60 mt-0.5">
                        {profile.timezoneNote}
                      </p>
                    </div>

                    <div className="py-6 border-b border-border">
                      <p className="font-mono text-[11px] text-fg-subtle tracking-[0.15em] uppercase mb-2">
                        Response Time
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                        </span>
                        <p className="text-fg font-medium">Within 48 hours</p>
                      </div>
                    </div>

                    <div className="py-6">
                      <p className="font-mono text-[11px] text-fg-subtle tracking-[0.15em] uppercase mb-3">
                        Engagement Types
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Project-Based",
                          "Retainer",
                          "Research Collaboration",
                        ].map((type) => (
                          <span
                            key={type}
                            className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-border-strong text-fg-muted"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ── Light section ────────────────────── */}
      <section className="bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <ScrollReveal>
            <p className="font-mono text-[11px] text-violet tracking-[0.2em] uppercase mb-10">
              What Happens Next
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {processSteps.map((s) => (
                <div key={s.step} className="flex gap-4">
                  <span className="font-mono text-sm text-violet font-medium shrink-0">
                    {s.step}
                  </span>
                  <p className="text-sm text-fg-muted-on-light leading-relaxed">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
