import Image from "next/image"
import StackTag from "@/components/StackTag"
import type { Project } from "@/content/types"

function clientLabel(p: Project): string {
  switch (p.disclosure.kind) {
    case "named":
      return p.disclosure.client
    case "anonymised":
      return p.disclosure.clientDescriptor
    case "self":
      return p.disclosure.client
  }
}

export function LiveBadge() {
  return (
    <span className="flex items-center gap-2 shrink-0">
      <span className="h-1.5 w-1.5 rounded-full bg-live" />
      <span className="font-mono text-[11px] text-live tracking-[0.1em] uppercase">Live</span>
    </span>
  )
}

function Proof({ project }: { project: Project }) {
  const { repo, live } = project.links

  if (!repo && !live) {
    return project.accessNote ? (
      <p className="font-mono text-[11px] text-ink-subtle leading-relaxed max-w-md">
        {project.accessNote}
      </p>
    ) : null
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[12px] text-fg
            border border-line-strong px-3.5 py-2 rounded
            hover:border-accent hover:text-accent transition-colors duration-150"
        >
          Read the source <span aria-hidden="true">↗</span>
        </a>
      )}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[12px] text-ink-muted
            border border-line px-3.5 py-2 rounded
            hover:border-accent hover:text-accent transition-colors duration-150"
        >
          Visit live <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  )
}

/**
 * Cover for a project that has no screenshot — an NDA system, or one whose
 * interface cannot be shown. A typographic plate rather than a borrowed
 * client logo: it scales, needs no third-party asset, and does not imply an
 * endorsement the client never gave.
 */
function Plate({ plate, tall }: { plate: NonNullable<Project["plate"]>; tall: boolean }) {
  return (
    <div
      className={`relative overflow-hidden border-b border-line bg-sunken ${
        tall ? "aspect-[16/8]" : "aspect-[16/10]"
      }`}
    >
      {/* Graticule, echoing the project map */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 160 100"
      >
        {[20, 40, 60, 80, 100, 120, 140].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="var(--color-line)" strokeWidth="0.4" />
        ))}
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="160" y2={y} stroke="var(--color-line)" strokeWidth="0.4" />
        ))}
      </svg>

      <div className="relative h-full flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="block h-[3px] w-9 bg-accent" />
        <span className="font-display font-semibold text-ink tracking-[-0.045em] leading-none text-[clamp(44px,9vw,76px)]">
          {plate.mark}
        </span>
        <span className="font-mono text-[10px] text-ink-subtle tracking-[0.18em] uppercase max-w-[32ch]">
          {plate.caption}
        </span>
      </div>
    </div>
  )
}

export default function ProjectCard({
  project,
  span,
  index,
}: {
  project: Project
  span: "full" | "half"
  index: number
}) {
  const isFull = span === "full"
  const hero = project.images[0]

  return (
    <article
      className={`group relative flex flex-col h-full border border-line rounded-md bg-card
        overflow-hidden transition-colors duration-200 hover:border-line-strong ${
          isFull ? "md:col-span-2" : "md:col-span-1"
        }`}
    >
      {hero ? (
        <div
          className={`relative overflow-hidden border-b border-line bg-sunken ${
            isFull ? "aspect-[16/8]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            placeholder="blur"
            quality={75}
            sizes={isFull ? "(max-width: 768px) 100vw, 1180px" : "(max-width: 768px) 100vw, 580px"}
            className="object-cover object-top"
          />
        </div>
      ) : project.plate ? (
        <Plate plate={project.plate} tall={isFull} />
      ) : null}

      <div className={`${isFull ? "p-7 md:p-10" : "p-7"} flex flex-col gap-5 flex-1`}>
        <header className="flex items-start gap-4">
          <span className="font-mono text-[12px] text-accent tabular-nums pt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] text-ink-subtle tracking-[0.1em] uppercase truncate">
              {clientLabel(project)}
            </p>
            <h3
              className={`font-display font-semibold text-ink tracking-[-0.02em] mt-1.5 ${
                isFull ? "text-2xl md:text-[32px] leading-[1.12]" : "text-xl leading-[1.18]"
              }`}
            >
              {project.title}
            </h3>
          </div>
          {project.status === "live" && <LiveBadge />}
        </header>

        <dl className={`grid gap-x-8 gap-y-4 ${isFull ? "sm:grid-cols-3" : "grid-cols-1"}`}>
          {(
            [
              ["Problem", project.problem],
              ["Approach", project.approach],
              ["Outcome", project.outcome],
            ] as const
          ).map(([label, body]) => (
            <div key={label}>
              <dt className="font-mono text-[10px] text-ink-subtle tracking-[0.16em] uppercase mb-2">
                {label}
              </dt>
              <dd className="text-[14px] text-ink-muted leading-[1.65]">{body}</dd>
            </div>
          ))}
        </dl>

        {project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-x-10 gap-y-4 pt-1 border-t border-line mt-1 pt-5">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display font-semibold text-lg text-ink tracking-[-0.01em] leading-none tabular-nums">
                  {m.value}
                </p>
                <p className="font-mono text-[10px] text-ink-subtle tracking-[0.12em] uppercase mt-1.5">
                  {m.label}
                </p>
                {m.note && (
                  <p className="text-[12px] text-ink-subtle mt-1 max-w-[22ch] leading-snug">
                    {m.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <StackTag key={t.label} label={t.label} variant={t.variant} />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1 mt-auto">
          <Proof project={project} />
          <p className="font-mono text-[11px] text-ink-subtle ml-auto">{project.period}</p>
        </div>

        {project.images.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            {project.images.slice(1, isFull ? 4 : 3).map((img) => (
              <figure key={img.src.src} className="space-y-2">
                <div className="relative aspect-[16/10] overflow-hidden rounded border border-line bg-sunken">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    placeholder="blur"
                    quality={70}
                    sizes="(max-width: 768px) 45vw, 360px"
                    className="object-cover object-top"
                  />
                </div>
                {img.caption && (
                  <figcaption className="text-[11px] text-ink-subtle leading-snug">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {hero?.credit && (
          <p className="font-mono text-[10px] text-ink-subtle">{hero.credit}</p>
        )}
      </div>
    </article>
  )
}
