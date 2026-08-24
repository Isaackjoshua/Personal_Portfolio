import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: siteConfig.socials.github, label: "GitHub", Icon: GithubIcon },
  { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: siteConfig.socials.email, label: "Email", Icon: Mail },
];

export function SocialLinks({
  className,
  size = "md",
  showLabels = false,
}: {
  className?: string;
  size?: "sm" | "md";
  showLabels?: boolean;
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
            aria-label={label}
            className={cn(
              "group inline-flex items-center gap-2 rounded-lg border border-line bg-surface/50 text-muted",
              "transition-all duration-200 hover:border-accent/50 hover:text-accent hover:bg-surface",
              size === "sm" ? "h-9 px-2.5" : "h-11 px-3",
              showLabels && "px-3.5",
            )}
          >
            <Icon
              className={cn(size === "sm" ? "size-4" : "size-[1.125rem]")}
              aria-hidden
            />
            {showLabels && (
              <span className="font-mono text-xs tracking-tight">{label}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
