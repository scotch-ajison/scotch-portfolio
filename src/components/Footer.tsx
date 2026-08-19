import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 relative">
      {/* Gradient accent line */}
      <div className="h-px gradient-bg" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-16">
          {/* Brand column — larger presence */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-xl gradient-text leading-none tracking-tight">
                SA
              </span>
              <span className="h-5 w-px bg-border-strong" />
              <span className="font-display font-medium text-fg">
                Scotch Ajison
              </span>
            </div>
            <p className="font-display font-bold text-2xl md:text-3xl text-fg-muted tracking-tight leading-tight max-w-md">
              Building the systems that map reality.
            </p>
            <p className="font-mono text-xs text-fg-subtle tracking-wide">
              17°49′S 31°03′E · Harare, Zimbabwe
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="font-mono text-xs text-fg-subtle uppercase tracking-wider">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/work", label: "Work" },
                { href: "/research", label: "Research" },
                { href: "/services", label: "Services" },
                { href: "/writing", label: "Writing" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-fg-muted hover:text-fg transition-colors duration-150 w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <p className="font-mono text-xs text-fg-subtle uppercase tracking-wider">
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:sajison71@gmail.com"
                className="text-sm text-fg-muted hover:text-fg transition-colors duration-150 w-fit"
              >
                sajison71@gmail.com
              </a>
              <a
                href="https://github.com/scotch-ajison"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fg-muted hover:text-fg transition-colors duration-150 w-fit"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/scotchajison"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fg-muted hover:text-fg transition-colors duration-150 w-fit"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fg-muted hover:text-fg transition-colors duration-150 w-fit"
              >
                OSM Contributor ↗
              </a>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-fg-subtle">
            © {year} Scotch Ajison. All rights reserved.
          </p>
          <p className="font-mono text-xs text-fg-subtle">
            GIS · Drones · Spatial AI
          </p>
        </div>
      </div>
    </footer>
  )
}
