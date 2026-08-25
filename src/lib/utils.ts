import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "2025-03-14" -> "14 March 2025" */
export function formatDate(input: string | Date) {
  const date = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** "2025-03-14" -> "2025.03.14" for monospace/technical contexts. */
export function formatDateStamp(input: string | Date) {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toISOString().slice(0, 10).replace(/-/g, ".");
}

/** Absolute URL against the configured site origin. */
export function absoluteUrl(path: string, origin: string) {
  return new URL(path, origin).toString();
}

/**
 * Serialise a JSON-LD object for embedding in a <script> tag.
 *
 * JSON.stringify leaves `<` untouched, so any value containing `</script>`
 * would close the tag and everything after it would be parsed as HTML. The
 * inputs here are repo-controlled today; escaping keeps that from becoming an
 * XSS hole the moment any of it comes from somewhere less trusted.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
