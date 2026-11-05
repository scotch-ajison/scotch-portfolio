"use client"

import { useState, useRef, useId, useEffect } from "react"
import { profile } from "@/content/profile"

type FormState = "idle" | "submitting" | "success" | "error"
type FieldErrors = Partial<Record<string, string>>

const PROJECT_TYPES = [
  ["gis-system", "GIS System Architecture"],
  ["drone-gis", "Drone Data & GIS Integration"],
  ["spatial-consulting", "Spatial Data Consulting"],
  ["ai-gis", "AI + GIS Research"],
  ["other", "Other"],
] as const

const BUDGETS = [
  ["", "Prefer not to say"],
  ["under-5k", "Under $5,000"],
  ["5k-20k", "$5,000 – $20,000"],
  ["20k-50k", "$20,000 – $50,000"],
  ["50k-plus", "$50,000+"],
] as const

const FIELD_CLASS =
  "w-full bg-transparent border-b border-border-strong pb-3 pt-1 text-[15px] text-fg " +
  "placeholder:text-fg-subtle focus:border-accent transition-colors duration-200"

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-mono text-[11px] text-fg-subtle tracking-[0.12em] uppercase mb-2"
    >
      {children}
      {required && (
        <span className="text-accent ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="font-mono text-[11px] text-error mt-2">
      {message}
    </p>
  )
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    projectType: "",
    budget: "",
    message: "",
    website: "", // honeypot
  })

  // The time trap compares against this. Stamped in an effect rather than
  // during render — Date.now() in a render body is impure and can shift on
  // any re-render.
  const startedAt = useRef<number>(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const uid = useId()
  const fid = (n: string) => `${uid}-${n}`

  const field = FIELD_CLASS

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("submitting")
    setErrorMsg("")
    setFieldErrors({})

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt: startedAt.current }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        setFieldErrors(data.errors ?? {})
        setState("error")
        return
      }
      setState("success")
    } catch {
      setErrorMsg(
        `Network error — please check your connection, or email ${profile.email} directly.`
      )
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <div className="py-16 space-y-5" role="status">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-live" />
          <p className="font-mono text-[11px] text-live tracking-[0.16em] uppercase">
            Message sent
          </p>
        </div>
        <h2 className="font-display font-semibold text-3xl text-fg tracking-[-0.025em]">
          It reached me.
        </h2>
        <p className="text-fg-muted text-[15px] leading-[1.7] max-w-md">
          A copy is on its way to your inbox so you have a record of it. I read
          everything that comes through this form and usually reply within 48
          hours.
        </p>
      </div>
    )
  }

  const a11y = (name: string, required = false) => ({
    id: fid(name),
    name,
    required,
    "aria-invalid": fieldErrors[name] ? (true as const) : undefined,
    "aria-describedby": fieldErrors[name] ? `${fid(name)}-error` : undefined,
    onChange: handleChange,
    className: field,
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Honeypot. Off-screen rather than display:none — some bots skip
          hidden fields but fill positioned ones. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input
          id={fid("website")}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
        <div>
          <FieldLabel htmlFor={fid("name")} required>Name</FieldLabel>
          <input type="text" placeholder="Your full name" value={form.name} autoComplete="name" {...a11y("name", true)} />
          <FieldError id={`${fid("name")}-error`} message={fieldErrors.name} />
        </div>
        <div>
          <FieldLabel htmlFor={fid("email")} required>Email</FieldLabel>
          <input type="email" placeholder="you@organisation.com" value={form.email} autoComplete="email" {...a11y("email", true)} />
          <FieldError id={`${fid("email")}-error`} message={fieldErrors.email} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor={fid("organization")} required>Organisation</FieldLabel>
        <input type="text" placeholder="Company or institution" value={form.organization} autoComplete="organization" {...a11y("organization", true)} />
        <FieldError id={`${fid("organization")}-error`} message={fieldErrors.organization} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
        <div>
          <FieldLabel htmlFor={fid("projectType")} required>Project type</FieldLabel>
          <select value={form.projectType} {...a11y("projectType", true)} className={`${field} appearance-none cursor-pointer rounded-none`}>
            <option value="" disabled>Select a category</option>
            {PROJECT_TYPES.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <FieldError id={`${fid("projectType")}-error`} message={fieldErrors.projectType} />
        </div>
        <div>
          <FieldLabel htmlFor={fid("budget")}>Budget range</FieldLabel>
          <select value={form.budget} {...a11y("budget")} className={`${field} appearance-none cursor-pointer rounded-none`}>
            {BUDGETS.map(([v, l]) => (
              <option key={v || "none"} value={v}>{l}</option>
            ))}
          </select>
          <FieldError id={`${fid("budget")}-error`} message={fieldErrors.budget} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor={fid("message")} required>Message</FieldLabel>
        <textarea
          rows={5}
          placeholder="What are you trying to solve, and where does it sit geographically?"
          value={form.message}
          {...a11y("message", true)}
          className={`${field} resize-none`}
        />
        <FieldError id={`${fid("message")}-error`} message={fieldErrors.message} />
      </div>

      <div aria-live="polite" className="min-h-[1.25rem]">
        {state === "error" && errorMsg && (
          <p className="font-mono text-[12px] text-error">{errorMsg}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="font-display font-semibold text-[15px] px-7 py-3.5 rounded-md
          bg-accent text-accent-ink hover:brightness-110
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-[filter,opacity] duration-150"
      >
        {state === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
