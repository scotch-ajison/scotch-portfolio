"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navRoutes } from "@/content/routes"
import { profile } from "@/content/profile"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock the page behind the panel, close on Escape, and send focus back
  // to the trigger on the way out.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    panelRef.current?.querySelector<HTMLElement>("a")?.focus()

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-ink/85 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between gap-6"
        >
          <Link href="/" className="flex items-baseline gap-3 group shrink-0">
            <span className="font-mono text-[13px] font-medium text-accent tracking-[0.1em]">
              {profile.initials}
            </span>
            <span className="font-display font-medium text-[15px] text-fg tracking-[-0.01em] hidden sm:block">
              {profile.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navRoutes.map((l) => (
              <Link
                key={l.path}
                href={l.path}
                aria-current={isActive(l.path) ? "page" : undefined}
                className={`relative font-sans text-[14px] px-3.5 py-2 rounded-md transition-colors duration-150 ${
                  isActive(l.path)
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                {l.label}
                {isActive(l.path) && (
                  <span className="absolute bottom-0.5 left-3.5 right-3.5 h-px bg-accent" />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-3 font-display font-semibold text-[14px] px-4 py-2 rounded-md
                bg-accent text-accent-ink hover:brightness-110 transition-[filter] duration-150"
            >
              Get in touch
            </Link>
          </div>

          <button
            ref={triggerRef}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden relative z-50 -mr-2 p-2 flex flex-col gap-[5px]"
          >
            <span
              className={`block w-5 h-[1.5px] bg-fg transition-transform duration-300 origin-center ${
                open ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-fg transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-fg transition-transform duration-300 origin-center ${
                open ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile panel. `inert` when closed, so its links are not focusable
          while invisible — they were, before. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-ink-sunken/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          ref={panelRef}
          className={`absolute top-0 right-0 h-full w-[300px] max-w-[85vw] bg-ink-raised border-l border-border
            flex flex-col transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="h-16 flex items-center px-6 border-b border-border">
            <span className="font-mono text-[13px] text-accent tracking-[0.1em]">
              {profile.initials}
            </span>
          </div>

          <div className="flex-1 flex flex-col px-6 py-8">
            {navRoutes.map((l) => (
              <Link
                key={l.path}
                href={l.path}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.path) ? "page" : undefined}
                className={`font-display text-xl py-3.5 border-b border-border transition-colors ${
                  isActive(l.path) ? "text-accent" : "text-fg hover:text-accent"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="px-6 py-6 border-t border-border">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block text-center font-display font-semibold text-[15px] px-5 py-3 rounded-md
                bg-accent text-accent-ink"
            >
              Get in touch
            </Link>
            <p className="font-mono text-[11px] text-fg-subtle mt-4 text-center">
              {profile.coordinates.label}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
