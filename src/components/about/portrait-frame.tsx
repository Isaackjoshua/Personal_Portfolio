/**
 * Headshot slot for the About page — placeholder until Isaack supplies a photo.
 *
 * To swap in the real portrait:
 *   1. Drop the file at `public/isaack.jpg` (4:5 crop, ~1200×1500, optimised).
 *   2. Add `import Image from "next/image"` at the top of this file.
 *   3. Inside the frame div, delete the three placeholder layers marked by
 *      the "placeholder" comment — the dot-field, the dashed inner slot and
 *      the monogram block — and render the photo instead:
 *
 *        <Image
 *          src="/isaack.jpg"
 *          alt="Isaack Joshua Lukumay"
 *          fill
 *          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 60vw, 90vw"
 *          className="object-cover"
 *          priority
 *        />
 *
 *   The frame, corner ticks and caption stay exactly as they are.
 */

import { CornerTicks } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PortraitFrame({ className }: { className?: string }) {
  return (
    <figure className={cn("group", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 group-hover:border-accent/30">
        {/* placeholder */}
        <div aria-hidden className="absolute inset-0 dot-field opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-accent/8 blur-[70px]"
        />
        <div
          aria-hidden
          className="absolute inset-4 rounded-lg border border-dashed border-line-soft sm:inset-5"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span
            aria-hidden
            className="select-none font-mono text-[clamp(3.25rem,13vw,5.5rem)] font-semibold tracking-[0.12em] text-faint/45"
          >
            {siteConfig.monogram}
          </span>
          <span
            aria-hidden
            className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-faint/70"
          >
            portrait
          </span>
        </div>
        <span
          aria-hidden
          className="absolute bottom-4 left-4 font-mono text-[0.625rem] tracking-[0.18em] text-faint/70 sm:bottom-5 sm:left-5"
        >
          4:5
        </span>
        <CornerTicks />
      </div>

      <figcaption className="mt-4 space-y-1 font-mono text-[0.6875rem] leading-relaxed tracking-wide">
        <span className="block text-muted">{siteConfig.name}</span>
        <span className="block text-faint">
          {siteConfig.role} &middot; {siteConfig.location}
        </span>
      </figcaption>
    </figure>
  );
}
