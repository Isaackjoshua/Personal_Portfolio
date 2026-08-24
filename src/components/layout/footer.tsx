import Link from "next/link";
import { MapPin } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent"
      />

      <div className="container-wide py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-baseline gap-0.5 font-mono text-base font-semibold"
            >
              <span className="text-accent">$</span>
              <span className="text-fg">isaack</span>
              <span className="text-faint">.dev</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {siteConfig.role} building end-to-end AI systems — from training
              to the device it runs on.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-faint">
              <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden />
              {siteConfig.location}
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                Navigate
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-mono text-sm text-muted transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                Elsewhere
              </p>
              <SocialLinks className="mt-4" size="sm" showLabels />
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-block font-mono text-sm text-muted transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-faint">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted transition-colors hover:text-accent"
            >
              Next.js
            </a>{" "}
            · Deployed on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted transition-colors hover:text-accent"
            >
              Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
