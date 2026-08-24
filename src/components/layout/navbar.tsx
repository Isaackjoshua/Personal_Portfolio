"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock the page behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:border focus:border-accent focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-line-soft bg-bg/70 backdrop-blur-xl supports-backdrop-filter:bg-bg/60"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="container-wide flex h-16 items-center justify-between gap-4 sm:h-18"
        >
          <Link
            href="/"
            className="group inline-flex items-baseline gap-0.5 font-mono text-base font-semibold tracking-tight"
          >
            <span className="text-accent">$</span>
            <span className="text-fg transition-colors group-hover:text-accent">
              isaack
            </span>
            <span className="text-faint">.dev</span>
            <span
              aria-hidden
              className="ml-0.5 inline-block h-4 w-[7px] translate-y-px bg-accent animate-caret"
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 font-mono text-[0.8125rem] tracking-tight transition-colors duration-200",
                      active ? "text-accent" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2.5 -bottom-px h-px bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.cv.href}
              download={siteConfig.cv.filename}
              className={cn(
                buttonClasses({ variant: "secondary", size: "sm" }),
                "hidden sm:inline-flex",
              )}
            >
              <Download className="size-3.5" strokeWidth={2} aria-hidden />
              Download CV
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface/50 text-muted transition-colors hover:border-accent/50 hover:text-accent lg:hidden"
            >
              {open ? (
                <X className="size-5" strokeWidth={1.75} aria-hidden />
              ) : (
                <Menu className="size-5" strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            id="mobile-nav"
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-bg/80 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
              className="absolute right-0 top-0 flex h-full w-[min(20rem,86vw)] flex-col border-l border-line bg-bg-soft px-6 pt-24 pb-8"
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 font-mono text-base transition-colors",
                          active
                            ? "bg-accent/10 text-accent"
                            : "text-muted hover:bg-surface hover:text-fg",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "text-xs",
                            active ? "text-accent" : "text-faint",
                          )}
                        >
                          ▸
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto space-y-5 pt-8">
                <a
                  href={siteConfig.cv.href}
                  download={siteConfig.cv.filename}
                  className={cn(
                    buttonClasses({ variant: "primary", size: "md" }),
                    "w-full",
                  )}
                >
                  <Download className="size-4" strokeWidth={2} aria-hidden />
                  Download CV
                </a>
                <SocialLinks size="sm" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
