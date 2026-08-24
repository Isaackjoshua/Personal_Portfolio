import { cn } from "@/lib/utils";

/**
 * Full-bleed decorative layer: faint technical grid, a slow emerald bloom,
 * and a scan line. Purely presentational — always aria-hidden.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 grid-field mask-fade opacity-70" />

      <div className="absolute left-1/2 top-[-18%] h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px] animate-drift" />
      <div className="absolute right-[-10%] top-1/3 h-72 w-72 rounded-full bg-accent-dim/6 blur-[90px]" />

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent animate-scan" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-bg)_88%)]" />
    </div>
  );
}
