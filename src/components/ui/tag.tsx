import Link from "next/link";
import { cn } from "@/lib/utils";

const tagBase =
  "inline-flex items-center rounded-md border border-line bg-surface/70 px-2.5 py-1 " +
  "font-mono text-[0.6875rem] leading-none tracking-wide text-muted transition-colors duration-200";

export function Tag({
  children,
  className,
  active,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        tagBase,
        active && "border-accent/50 bg-accent/10 text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagLink({
  href,
  children,
  active,
  className,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        tagBase,
        "hover:border-accent/50 hover:bg-accent/10 hover:text-accent",
        active && "border-accent/60 bg-accent/15 text-accent",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function TagList({
  items,
  className,
  limit,
}: {
  items: readonly string[];
  className?: string;
  limit?: number;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
      {rest > 0 && (
        <li>
          <Tag className="text-faint">+{rest}</Tag>
        </li>
      )}
    </ul>
  );
}
