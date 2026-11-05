const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

/** Escape a user-supplied string before it goes into email HTML. */
export const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => ENTITIES[c]!)

/** Escape, then turn newlines into line breaks. */
export const escapeHtmlBr = (s: string): string =>
  escapeHtml(s).replace(/\r?\n/g, "<br>")

/**
 * Strip CR/LF before a value is used in a mail header. An unsanitised
 * Reply-To is a header-injection vector.
 */
export const headerSafe = (s: string): string => s.replace(/[\r\n]+/g, " ").trim()
