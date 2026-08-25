"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Types the tagline once on mount and leaves a blinking block caret behind.
 *
 * The full string is always in the accessibility tree; the animated copy is
 * decorative. A hidden sizing layer holds the final height so the paragraph
 * below never shifts while the line is being written.
 */
export function TypingTagline({
  text = siteConfig.tagline,
  speed = 38,
  className,
}: {
  /** Defaults to the tagline in site config. */
  text?: string;
  /** Milliseconds per character. */
  speed?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);

  // Restart the animation if the text itself changes. Adjusting state during
  // render avoids the cascading re-render an effect would cause.
  const [source, setSource] = useState(text);
  if (source !== text) {
    setSource(text);
    setTyped(0);
  }

  // The first client render has to match the server exactly, so the reduced
  // preference cannot change what is rendered — only how the effect below
  // fills it in. With reduced motion the first tick writes the whole string.
  useEffect(() => {
    let index = 0;
    const step = reduced ? text.length : 1;

    const interval = window.setInterval(
      () => {
        index = Math.min(index + step, text.length);
        setTyped(index);
        if (index >= text.length) window.clearInterval(interval);
      },
      reduced ? 0 : speed,
    );

    return () => window.clearInterval(interval);
  }, [reduced, speed, text]);

  const done = typed >= text.length;

  return (
    <div
      className={cn(
        "relative font-mono text-lg leading-snug tracking-tight text-fg sm:text-xl md:text-2xl",
        className,
      )}
    >
      {/* Read by assistive tech immediately, whatever the animation is doing. */}
      <span className="sr-only">{text}</span>

      {/* Reserves the final height so nothing below moves as the line types. */}
      <span aria-hidden className="invisible block select-none">
        {text}
      </span>

      <span aria-hidden className="absolute inset-0 block">
        <span className="text-accent">{text.slice(0, typed)}</span>
        <span
          className={cn(
            "ml-0.5 inline-block h-[0.95em] w-[0.5em] translate-y-[0.12em] bg-accent/80",
            done && "animate-caret",
          )}
        />
      </span>
    </div>
  );
}
