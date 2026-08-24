export type Project = {
  slug: string;
  name: string;
  /** One line, card-length. */
  summary: string;
  /** Full paragraph used on the detail page. */
  description: string;
  /** Short domain label rendered as a monospace kicker on the card. */
  domain: string;
  stack: string[];
  github: string;
  demo?: string;
  year: string;
  status: "Active" | "In development" | "Shipped";
  role: string;
  featured: boolean;
  /** Engineering decisions worth reading — detail page bullets. */
  highlights: { title: string; body: string }[];
  /** Rendered inside the terminal-style panel on the detail page. */
  terminal: { command: string; output: string[] };
};

export const projects: Project[] = [
  {
    slug: "lyceum",
    name: "Lyceum",
    summary:
      "A cross-platform desktop app that turns any LLM into a structured, interactive tutor.",
    description:
      "Lyceum turns any large language model into a structured, interactive tutor — teaching through explanation, worked examples, and adaptive questioning rather than one-shot answers. It is vendor-agnostic by design: users bring their own API key and choose between Claude, GPT, Kimi, or a locally hosted open-weight model. The app ships with no bundled API key and no vendor lock-in, so the teaching layer stays useful regardless of which model is cheapest, fastest, or available offline.",
    domain: "AI Teaching App",
    stack: [
      "Electron",
      "TypeScript",
      "React",
      "Claude",
      "GPT",
      "Kimi",
      "Local models",
    ],
    github: "https://github.com/Isaackjoshua/Lyceum",
    year: "2025",
    status: "Active",
    role: "Design & engineering",
    featured: true,
    highlights: [
      {
        title: "Pedagogy as a pipeline, not a prompt",
        body: "Lessons move through explanation, worked example, and adaptive questioning as distinct stages. The model is asked to do one thing at a time, which keeps a tutoring session coherent across long conversations instead of collapsing into an answer machine.",
      },
      {
        title: "Vendor-agnostic model layer",
        body: "A single provider interface sits in front of Claude, GPT, Kimi, and locally hosted open-weight models. Swapping the backing model is a settings change, not a rewrite — and a local model keeps the app usable with no network at all.",
      },
      {
        title: "Bring your own key",
        body: "No API key is bundled with the binary and no traffic is proxied through a first-party server. Credentials stay on the user's machine, which keeps cost, privacy, and rate limits under the user's control.",
      },
      {
        title: "Genuinely cross-platform",
        body: "Built on Electron with a TypeScript and React front end so the same build targets Linux, macOS, and Windows without maintaining three UIs.",
      },
    ],
    terminal: {
      command: "lyceum --model local:qwen --topic 'gradient descent'",
      output: [
        "session  ▸ tutor mode: adaptive",
        "provider ▸ local (no key required)",
        "stage 1  ▸ explanation",
        "stage 2  ▸ worked example",
        "stage 3  ▸ check for understanding …",
      ],
    },
  },
  {
    slug: "triage",
    name: "Triage",
    summary:
      "A transport-agnostic AI agent that autonomously diagnoses faulty computers.",
    description:
      "Triage is an AI agent that diagnoses faulty computers on its own — running system checks, applying safe software fixes, and escalating hardware or high-risk issues to a human operator. It is built around a modular action pipeline with explicit safety boundaries: the agent may only execute repairs that fall inside a defined low-risk scope, and anything beyond that scope becomes a report for a person rather than a command.",
    domain: "Diagnostics Agent",
    stack: [
      "Python",
      "LLM tool-use",
      "System diagnostics",
      "Cross-platform",
    ],
    github: "https://github.com/Isaackjoshua/Triage",
    year: "2025",
    status: "Active",
    role: "Architecture & engineering",
    featured: true,
    highlights: [
      {
        title: "Safety boundaries are structural",
        body: "Low-risk repairs are the only actions the agent can reach. Hardware faults and destructive operations are not gated behind a prompt instruction — they are outside the action set entirely, and route to a human operator instead.",
      },
      {
        title: "Modular action pipeline",
        body: "Each diagnostic and repair is an independent, testable action with declared inputs, effects, and risk level. Adding a new check means adding a module, not editing a monolith.",
      },
      {
        title: "Transport-agnostic",
        body: "The agent core is decoupled from how it is reached, so the same diagnostic engine can be driven locally or over a remote channel without changing its logic.",
      },
      {
        title: "Tool-use over free-form generation",
        body: "The model chooses tools and reads their real output rather than narrating what it thinks a machine would say. Every conclusion traces back to a command that actually ran.",
      },
    ],
    terminal: {
      command: "triage run --scope low-risk",
      output: [
        "✓ disk        SMART ok · 41% used",
        "✓ memory      no ECC errors",
        "! services    2 failed units → auto-repair",
        "⚠ battery     wear 38% → escalate: hardware",
        "report       ▸ 3 fixed · 1 escalated",
      ],
    },
  },
  {
    slug: "afya-predict",
    name: "Afya-Predict",
    summary:
      "A modular AI platform for predicting disease outbreaks across Tanzania.",
    description:
      "Afya-Predict (Afya is Swahili for \"health\") is a modular, extensible platform for predicting disease outbreaks in Tanzania. It ingests health-facility, climate, and mobility data and surfaces early-warning signals for public-health decision-makers. The architecture is built around plug-in data sources so the same system scales across regions and disease categories instead of being rebuilt for each one.",
    domain: "Epidemiological ML",
    stack: [
      "Python",
      "Machine Learning",
      "Epidemiological modelling",
      "Modular architecture",
    ],
    github: "https://github.com/Isaackjoshua/Afya_Predict",
    year: "2025",
    status: "In development",
    role: "ML engineering",
    featured: true,
    highlights: [
      {
        title: "Plug-in data sources",
        body: "Health-facility reports, climate series, and mobility signals each enter through the same connector interface. A new region or a new feed is a plug-in, so coverage grows without touching the modelling core.",
      },
      {
        title: "Built for decision-makers, not dashboards",
        body: "The output that matters is an early-warning signal a public-health team can act on — which means calibration and lead time are the metrics under scrutiny, not raw accuracy.",
      },
      {
        title: "Scales across disease categories",
        body: "Disease-specific logic is isolated from ingestion and feature engineering, so extending the platform to another category reuses the entire pipeline underneath it.",
      },
    ],
    terminal: {
      command: "afya-predict forecast --region dar-es-salaam --horizon 14d",
      output: [
        "sources  ▸ facility · climate · mobility",
        "features ▸ 42 engineered",
        "signal   ▸ elevated risk · week 3",
        "output   ▸ early-warning brief",
      ],
    },
  },
  {
    slug: "amana",
    name: "Amana",
    summary:
      "A multisignature escrow platform securing mobile money for East African merchants.",
    description:
      "Amana secures mobile money transactions for small merchants and gig workers across East Africa using a multisignature escrow model. The PostgreSQL schema models the full transaction lifecycle — initiation, hold, dispute, release — with atomicity guarantees, and integrates Selcom for mobile money movement. The REST API is built in FastAPI following OWASP security guidance and runs on a Linux VPS behind nginx with Certbot-managed TLS.",
    domain: "Fintech Backend",
    stack: ["Python", "FastAPI", "PostgreSQL", "Celery", "Selcom API"],
    github: "https://github.com/Isaackjoshua/Escrow",
    year: "2025",
    status: "Shipped",
    role: "Backend engineering",
    featured: true,
    highlights: [
      {
        title: "Lifecycle modelled in the schema",
        body: "Initiation, hold, dispute, and release are first-class states in PostgreSQL with atomicity guarantees, so money cannot be released twice or stranded mid-dispute by a partial write.",
      },
      {
        title: "Multisignature release",
        body: "Funds move only when the required parties have both signed off. For a merchant and a gig worker who have never met, that is the entire product.",
      },
      {
        title: "Selcom mobile money integration",
        body: "Real payment rails, not a sandbox toy — the integration handles the asynchronous, retry-prone reality of mobile money, with Celery carrying background work off the request path.",
      },
      {
        title: "Deployed and hardened",
        body: "Built to OWASP guidance and deployed on a Linux VPS with nginx and Certbot. Security posture was part of the design, not a pass at the end.",
      },
    ],
    terminal: {
      command: "curl -X POST /v1/escrow/{id}/release",
      output: [
        "auth      ▸ signature 1/2 · merchant",
        "auth      ▸ signature 2/2 · buyer",
        "tx        ▸ hold → release  [atomic]",
        "selcom    ▸ payout queued (celery)",
        "200 OK    ▸ escrow settled",
      ],
    },
  },
  {
    slug: "mwana-ai",
    name: "Mwana AI",
    summary:
      "An ultrasound classifier for breast cancer screening, built to run offline on-device.",
    description:
      "Mwana AI is an ultrasound image classification model for breast cancer screening, designed for offline deployment in low-resource Tanzanian clinical settings. The model is exported to ONNX for on-device inference and paired with a Flutter mobile front end targeting Android, so screening does not depend on connectivity or a server round-trip. Developed at the Emerging Technologies for Healthcare Lab, MUHAS.",
    domain: "Medical Imaging",
    stack: [
      "Python",
      "PyTorch",
      "HuggingFace Transformers",
      "ONNX Runtime",
      "Flutter",
    ],
    github: "https://github.com/Isaackjoshua/breast_cancer_ai",
    year: "2025",
    status: "Shipped",
    role: "ML engineering · ETH Lab, MUHAS",
    featured: true,
    highlights: [
      {
        title: "Offline-first by requirement",
        body: "The deployment target is a clinic that cannot assume connectivity. Inference runs on the device, which shapes every decision upstream — architecture, size, and export path included.",
      },
      {
        title: "PyTorch to ONNX Runtime",
        body: "Training in PyTorch and HuggingFace Transformers, then exporting to ONNX, keeps research iteration fast while the shipped artefact is a portable runtime that runs on Android hardware.",
      },
      {
        title: "Flutter front end for the field",
        body: "A mobile front end targeting Android puts the model where the ultrasound is, rather than behind a workstation somewhere else in the building.",
      },
      {
        title: "Clinical context, engineering discipline",
        body: "Built at the ETH Lab, MUHAS, against real screening workflow constraints rather than a benchmark leaderboard.",
      },
    ],
    terminal: {
      command: "python export.py --format onnx --target android",
      output: [
        "model    ▸ ultrasound classifier",
        "export   ▸ torch → onnx  [ok]",
        "runtime  ▸ onnxruntime · on-device",
        "network  ▸ not required",
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
