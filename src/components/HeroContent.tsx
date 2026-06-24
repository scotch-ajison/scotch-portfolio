"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "motion/react"

const HeroGlobe = dynamic(() => import("./three/HeroGlobe"), { ssr: false })

const ease = [0, 0, 0.2, 1] as const

const specialties = ["GIS Systems Developer", "Spatial AI", "Digital Twins", "Drone Data"]

export default function HeroContent() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">

      {/* Globe — full background */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroGlobe />
      </div>

      {/* Heavy left gradient — text readable, globe fully visible on right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(108deg, rgba(7,8,15,0.98) 0%, rgba(7,8,15,0.95) 28%, rgba(7,8,15,0.65) 52%, rgba(7,8,15,0.1) 78%, transparent 100%)",
        }}
      />

      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #07080F)" }}
      />

      {/* ── Content ── left aligned, vertically centred ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[100svh] flex flex-col justify-center pt-28 pb-20">

        {/* Pre-label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.04, ease }}
          className="font-mono text-[11px] text-electric/60 tracking-[0.25em] uppercase mb-5"
        >
          GIS Systems Developer · Zimbabwe & Beyond
        </motion.p>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mb-7"
        >
          <h1
            className="font-display font-bold leading-[0.88] tracking-[-0.04em]"
            style={{ fontSize: "clamp(44px, 8.5vw, 108px)" }}
          >
            <span className="text-fg">Building</span>
            <br />
            <span className="gradient-text">spatial</span>
            <br />
            <span className="text-fg">systems that</span>
            <br />
            <span className="text-fg">
              run nations
              <span className="text-violet">.</span>
            </span>
          </h1>
        </motion.div>

        {/* Specialty chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease }}
          className="flex flex-wrap items-center gap-2 mb-7"
        >
          {specialties.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-3 py-1.5 rounded-full border border-border-strong text-fg-subtle tracking-wide bg-surface/40 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="text-fg-muted text-base md:text-[17px] leading-relaxed max-w-[420px] mb-10"
        >
          GIS platforms governments and banks rely on daily — live, national-scale production.
          Now pushing into{" "}
          <span className="text-fg font-medium">drone AI</span> and{" "}
          <span className="text-fg font-medium">digital twins</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease }}
          className="flex flex-col sm:flex-row items-start gap-3 mb-14"
        >
          <Link
            href="/work"
            className="group flex items-center gap-2 font-display font-bold text-sm px-7 py-3.5 rounded-full bg-amber text-black
              hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200
              shadow-[0_0_36px_rgba(255,159,10,0.4)]"
          >
            See My Work
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
          <Link
            href="/contact"
            className="font-sans text-sm font-semibold px-7 py-3.5 rounded-full border border-border-strong text-fg
              hover:border-electric/40 hover:bg-electric/5 hover:shadow-[0_0_24px_rgba(6,214,240,0.1)]
              transition-all duration-200 backdrop-blur-sm"
          >
            Start a Conversation
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.56, ease }}
          className="flex items-stretch w-fit rounded-2xl border border-border overflow-hidden bg-surface/30 backdrop-blur-sm"
        >
          {[
            { value: "5+", label: "Years" },
            { value: "6", label: "Gov't Systems" },
            { value: "SADC", label: "Region" },
            { value: "Live", label: "Production" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`px-5 py-3.5 ${i < 3 ? "border-r border-border" : ""}`}
            >
              <p className="font-display font-bold text-xl md:text-2xl text-fg tracking-tight leading-none">
                {s.value}
              </p>
              <p className="font-mono text-[9px] text-fg-subtle tracking-[0.12em] uppercase mt-1 whitespace-nowrap">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bottom row: coordinate + scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none"
        >
          <span className="font-mono text-[10px] text-fg-subtle/40 tracking-[0.18em]">
            17.83°S · 31.05°E — Harare, Zimbabwe
          </span>
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] text-fg-subtle/30 tracking-widest uppercase">scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-px h-5 bg-gradient-to-b from-fg-subtle/40 to-transparent"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
