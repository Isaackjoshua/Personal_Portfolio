import { Card, CornerTicks } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Principle = {
  index: string;
  title: string;
  body: string;
};

const principles: Principle[] = [
  {
    index: "01",
    title: "Ship past the notebook",
    body: "A result that only reproduces on my own machine is a draft, not a system. I take it the rest of the way — export, service, interface — because the last stretch is where the real constraints show up.",
  },
  {
    index: "02",
    title: "Offline by constraint",
    body: "Connectivity is a dependency like any other, and it is usually the first one to fail. Where it matters I move inference onto the device, so the tool keeps working when the network does not.",
  },
  {
    index: "03",
    title: "Safety boundaries are structural",
    body: "A system allowed to do anything will eventually do the wrong thing. I define the scope an agent may act inside as part of the architecture, and route everything beyond it to a human.",
  },
  {
    index: "04",
    title: "Modular enough for the second use case",
    body: "The first version always fits the problem it was written for. I keep data, model and interface separable, so the next case is a swap rather than a rewrite.",
  },
];

export function Principles({ className }: { className?: string }) {
  return (
    <section id="principles" className={cn("container-wide", className)}>
      <SectionHeading
        index="01"
        eyebrow="how i work"
        title="Four rules the work keeps proving right"
        description="Not a methodology. Just the decisions that separate a system that survives contact with the field from one that only ever ran on a laptop."
      />

      <RevealGroup
        as="ul"
        className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2"
        stagger={0.08}
      >
        {principles.map((principle) => (
          <RevealItem as="li" key={principle.index} className="flex">
            <Card interactive className="relative flex w-full flex-col p-6 sm:p-7">
              <CornerTicks />
              <span
                aria-hidden
                className="font-mono text-xs tracking-[0.18em] text-accent/70"
              >
                {principle.index}
              </span>
              <h3 className="mt-3 text-lg leading-snug text-fg sm:text-xl">
                {principle.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                {principle.body}
              </p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
