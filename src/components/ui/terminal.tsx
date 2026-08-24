import { cn } from "@/lib/utils";

/**
 * Static terminal chrome. Used instead of stock imagery to give a section
 * visual texture without pretending to be a live shell.
 */
export function TerminalWindow({
  title = "bash",
  command,
  output,
  className,
}: {
  title?: string;
  command: string;
  output: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface/80 font-mono text-xs shadow-[0_24px_60px_-32px_rgba(0,0,0,1)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-hi px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
        </span>
        <span className="ml-1 truncate text-[0.6875rem] tracking-wide text-faint">
          {title}
        </span>
      </div>

      <div className="overflow-x-auto px-4 py-4 leading-relaxed">
        <p className="flex gap-2 whitespace-pre">
          <span className="shrink-0 text-accent" aria-hidden>
            $
          </span>
          <span className="text-fg">{command}</span>
        </p>
        <div className="mt-2.5 space-y-1 whitespace-pre text-muted">
          {output.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
