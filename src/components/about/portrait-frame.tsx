/**
 * Headshot for the About page.
 *
 * The source file is `public/isaack.jpg` (1086×1448, 3:4). It is rendered into
 * a 4:5 frame with `object-cover`, which trims a few percent from the top and
 * bottom and leaves the subject centred. To replace the photo, drop a new file
 * at the same path — keep it portrait, at least ~1000px wide, and no lighter
 * than the current frame or it will glare against the dark page.
 */

import Image from "next/image";
import { CornerTicks } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PortraitFrame({ className }: { className?: string }) {
  return (
    <figure className={cn("group", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 group-hover:border-accent/30">
        <Image
          src="/isaack.jpg"
          alt={`${siteConfig.name}, ${siteConfig.role}`}
          fill
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 60vw, 90vw"
          className="object-cover object-center"
          priority
        />

        {/* Settles the photo into the dark page: a touch of contrast, and a
            scrim so the bottom edge meets the frame rather than cutting off. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/45 via-transparent to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"
        />

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
