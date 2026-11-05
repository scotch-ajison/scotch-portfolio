import type { TagVariant } from "@/content/types"

interface StackTagProps {
  label: string
  variant?: TagVariant
  onPaper?: boolean
}

/**
 * One neutral chip. The old three-colour variant system existed to use up
 * the violet/cyan/amber palette; with a single signal accent the colour was
 * carrying no information, so it no longer varies. The prop stays so the
 * content module keeps its shape.
 */
export default function StackTag({ label, onPaper = false }: StackTagProps) {
  return (
    <span
      className={`font-mono text-[11px] px-2.5 py-1 rounded inline-block tracking-[0.02em] border ${
        onPaper
          ? "border-border-on-light text-fg-muted-on-light bg-black/[0.02]"
          : "border-border-strong text-fg-muted bg-white/[0.03]"
      }`}
    >
      {label}
    </span>
  )
}
