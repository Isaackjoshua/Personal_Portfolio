import { MapPin, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Detail = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const details: Detail[] = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    Icon: Mail,
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneHref}`,
    Icon: Phone,
  },
  {
    label: "GitHub",
    value: "github.com/Isaackjoshua",
    href: siteConfig.socials.github,
    external: true,
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/isaack-joshua",
    href: siteConfig.socials.linkedin,
    external: true,
    Icon: LinkedinIcon,
  },
  {
    label: "Location",
    value: siteConfig.location,
    Icon: MapPin,
  },
];

export function ContactDetails({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-line bg-surface/50", className)}>
      <p className="border-b border-line px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
        Direct
      </p>

      <ul className="px-6 py-2">
        {details.map(({ label, value, href, external, Icon }) => (
          <li
            key={label}
            className="flex items-center gap-4 border-b border-line-soft py-4 last:border-b-0"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-soft text-muted">
              <Icon className="size-4" strokeWidth={1.75} />
            </span>

            <span className="min-w-0">
              <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
                {label}
              </span>

              {href ? (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  className="link-underline block truncate text-sm text-fg transition-colors duration-200 hover:text-accent"
                >
                  {value}
                </a>
              ) : (
                <span className="block truncate text-sm text-fg">{value}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
