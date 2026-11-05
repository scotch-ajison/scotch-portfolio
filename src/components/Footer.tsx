import Link from "next/link"
import { profile } from "@/content/profile"
import { routes } from "@/content/routes"
import { counts } from "@/content/derived"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-32 border-t border-border">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-12 md:gap-16">
          <div className="space-y-6 max-w-sm">
            <p className="font-display text-2xl md:text-[28px] text-fg tracking-[-0.02em] leading-[1.2]">
              {profile.pitch}
            </p>
            <div className="space-y-1.5">
              <p className="font-mono text-[11px] text-fg-subtle tracking-[0.08em]">
                {profile.coordinates.label} · {profile.location}
              </p>
              <p className="font-mono text-[11px] text-fg-subtle tracking-[0.08em]">
                {profile.timezoneNote}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[11px] text-fg-subtle uppercase tracking-[0.18em]">
              Site
            </p>
            <nav aria-label="Footer" className="flex flex-col gap-2.5">
              {routes
                .filter((r) => r.path !== "/")
                .map((l) => (
                  <Link
                    key={l.path}
                    href={l.path}
                    className="text-[14px] text-fg-muted hover:text-accent transition-colors duration-150 w-fit"
                  >
                    {l.label}
                  </Link>
                ))}
            </nav>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-[11px] text-fg-subtle uppercase tracking-[0.18em]">
              Elsewhere
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                className="text-[14px] text-fg-muted hover:text-accent transition-colors duration-150 w-fit"
              >
                {profile.email}
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-fg-muted hover:text-accent transition-colors duration-150 w-fit"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-fg-muted hover:text-accent transition-colors duration-150 w-fit"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-fg-subtle">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-[11px] text-fg-subtle tracking-[0.08em]">
            {counts.projects} projects · {counts.live} live · {counts.publicRepos} public
            repositories
          </p>
        </div>
      </div>
    </footer>
  )
}
