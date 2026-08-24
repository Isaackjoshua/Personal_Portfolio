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
