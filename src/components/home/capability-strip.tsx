import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const capabilities = [
  {
    index: "01",
    title: "ML systems",
    body: "Training, fine-tuning, and export — PyTorch and HuggingFace through to ONNX Runtime, so inference lands on the device instead of a server.",
  },
  {
    index: "02",
    title: "Backend & APIs",
    body: "FastAPI services over PostgreSQL schemas that model the whole transaction lifecycle, with Celery keeping slow work off the request path.",
  },
  {
    index: "03",
    title: "Desktop & mobile",
    body: "Electron and TypeScript for cross-platform desktop, Flutter for Android — one build reaching the machine the user already owns.",
  },
  {
    index: "04",
    title: "Deployment",
    body: "Linux, nginx, TLS, and offline-first design. Shipping is part of the engineering, not a hand-off at the end of it.",
  },
];

export function CapabilityStrip() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="relative border-b border-line-soft bg-bg-soft"
    >
      <h2 id="capabilities-heading" className="sr-only">
        What I build
      </h2>

      <div className="container-wide">
        <RevealGroup
          as="ul"
          className="-mx-6 grid gap-px bg-line-soft sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
        >
          {capabilities.map((capability) => (
            <RevealItem
              key={capability.index}
              as="li"
              className="group bg-bg-soft px-6 py-8 sm:py-9"
            >
              <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                <span className="text-accent">{capability.index}</span>
                <span
                  aria-hidden
                  className="h-px w-6 bg-line transition-colors duration-300 group-hover:bg-accent/50"
                />
              </p>
              <h3 className="mt-3 font-mono text-sm tracking-tight text-fg">
                {capability.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {capability.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
