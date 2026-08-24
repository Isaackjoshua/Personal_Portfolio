import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { HeroBackdrop } from "@/components/ui/backdrop";
import { TerminalWindow } from "@/components/ui/terminal";

export const metadata: Metadata = {
  title: "404",
  description: "That page does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[86dvh] items-center overflow-hidden">
      <HeroBackdrop />

      <div className="container-prose relative py-24 text-center">
        <p className="eyebrow">{"// 404"}</p>

        <h1 className="mt-5 text-4xl text-gradient sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
          {
            "That route does not exist. It may have moved, or it may never have been here."
          }
        </p>

        <TerminalWindow
          className="mx-auto mt-10 max-w-md text-left"
          title="bash — 404"
          command="cd /that-page"
          output={[
            "bash: cd: /that-page: No such file or directory",
            "hint  ▸ try / or /projects",
          ]}
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            Back to home
          </ButtonLink>
          <ButtonLink href="/projects" variant="ghost">
            View projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
