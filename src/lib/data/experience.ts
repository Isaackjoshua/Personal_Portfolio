export type Role = {
  title: string;
  subtitle: string;
  organisation: string;
  /**
   * Organisation name for tight spaces — the quick-facts sidebar, meta rows.
   * Full names here run to a clause and a half; this is the version that fits
   * on one line. Falls back to `organisation` when absent.
   */
  shortOrganisation?: string;
  location: string;
  period: string;
  current: boolean;
  /**
   * The one role that represents the work when only one can be shown.
   *
   * Several roles run concurrently, so "the current role" is not a thing the
   * data can derive — picking the first `current` entry just makes array order
   * into an accidental editorial decision, which is how /about came to pair
   * one job's title with another's employer. Exactly one role should carry
   * this.
   */
  lead?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

/**
 * Reverse-chronological by start date, which is what the timeline rail needs
 * to read correctly top to bottom. That is deliberately not the resume's
 * order — a printed page can lead with the most important role, a dated
 * timeline cannot.
 */
export const roles: Role[] = [
  {
    title: "Technical Lead",
    subtitle: "Contract",
    organisation:
      "AssetMeneja — maintenance management (CMMS) platform for hospitals and organisations",
    shortOrganisation: "AssetMeneja",
    location: "Remote",
    period: "October 2026 — Present",
    current: true,
    summary:
      "Took an AI-built prototype to production: live with one organisation, two hospitals onboarding, and a security audit that rewrote how access is enforced.",
    highlights: [
      "Led a security audit using live privilege-escalation tests and fixed every finding: role-based access on 41 write endpoints, an authentication bypass on IoT sensor and scheduled-job endpoints, unrestricted cascading deletes, a default token-signing key, vulnerable dependencies, and missing HTTP hardening.",
      "Built the core CMMS features the prototype lacked: recurring preventive and meter-based maintenance, per-priority SLA targets with clock-stop states, and labour, parts, downtime and failure-code tracking for MTBF/MTTR.",
      "Added hospital compliance tooling: calibration schedules, IEC 62353 electrical-safety records, an append-only audit trail, and server-side pagination for large asset lists.",
    ],
    stack: ["FastAPI", "React", "PostgreSQL", "Supabase", "Vercel"],
  },
  {
    title: "Co-founder & CTO",
    subtitle: "Digital event invitations and check-in",
    organisation: "Sora Events (formerly SkyEvents)",
    shortOrganisation: "Sora Events",
    location: "Dar es Salaam, Tanzania",
    period: "December 2025 — Present",
    current: true,
    summary:
      "Built the company's platform end to end — personalised invitations delivered over WhatsApp and SMS, and the check-in system that runs the door on event day.",
    highlights: [
      "Built personalised invitation cards rendered with Puppeteer and sent over the WhatsApp Cloud API and SMS, each carrying a unique QR or alphanumeric entry code.",
      "Ran check-in for 6 events, the largest with roughly 700 guests, with role-based access (Super Admin, Admin, Scanner) so clients can manage events remotely.",
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Twilio", "Infobip"],
  },
  {
    title: "Machine Learning Intern",
    subtitle: "Industrial Practical Training",
    organisation:
      "Emerging Technologies for Healthcare (ETH) Lab, Muhimbili University of Health and Allied Sciences (MUHAS)",
    shortOrganisation: "ETH Lab, MUHAS",
    location: "Dar es Salaam, Tanzania",
    period: "March 2025 — Present",
    current: true,
    lead: true,
    summary:
      "Building and deploying models against real clinical constraints — offline devices, explainability requirements, and datasets assembled across institutions.",
    highlights: [
      "Built Mwana AI, an on-device breast cancer ultrasound screening system: a multitask ResNet50 U-Net trained on 1,578 images, reaching 93% sensitivity and 0.96 AUROC, now being tested in hospital settings.",
      "Shipped it as a fully offline Flutter app for Android and iOS: ONNX Runtime inference, on-device report generation with Gemma 4, live capture via the Butterfly iQ probe SDK, and 48 automated tests.",
      "Fine-tuned and benchmarked three foundation models (RETFound, DINOv2, MedSigLIP) on 10,470 Tanzanian retinal fundus images for diabetic retinopathy detection, using patient-level splits to prevent leakage.",
      "Built a CNN for TB/HIV co-infection detection from chest X-rays, with Grad-CAM explanations and ROC/AUC evaluation across demographic subgroups.",
      "Applied transfer learning to cardiac imaging and ejection-fraction data to support prediction of dilated cardiomyopathy.",
      "Led data extraction for a multi-institution respiratory study (Aga Khan University, University of Warwick, NTLP), turning scanned intake forms and echocardiogram TIFFs into analysis-ready datasets.",
    ],
    stack: [
      "PyTorch",
      "ONNX",
      "Flutter",
      "Grad-CAM",
      "Transfer learning",
      "Medical imaging",
    ],
  },
];

/**
 * The role to show wherever only one fits. Resolved once here rather than by
 * each page running its own `.find()`, so /about and /experience can never
 * disagree about which job is the headline one.
 */
export const leadRole =
  roles.find((role) => role.lead) ??
  roles.find((role) => role.current) ??
  roles[0];

export type Education = {
  qualification: string;
  institution: string;
  location?: string;
  period: string;
  note?: string;
};

export const education: Education[] = [
  {
    qualification: "BSc (Hons) Computer Science",
    institution: "St. Joseph University in Tanzania",
    period: "2023 — 2026",
    note: "First Class · CGPA 4.6 / 5.0",
  },
];

export type Certification = {
  name: string;
  /** The body that awarded it — "DeepLearning.AI", "AWS", "Google". */
  issuer: string;
  /** When it was awarded. Year alone is fine: "2026" or "June 2026". */
  issued: string;
  /**
   * Only for credentials that lapse. Most course certificates do not, and an
   * invented expiry is worse than none — leave it off unless the issuer states
   * one.
   */
  expires?: string;
  /**
   * The issuer's own verification page for this credential — the strong form
   * of proof, because the claim is checked against the body that made it.
   */
  url?: string;
  /**
   * A copy of the certificate hosted here, under `public/certificates/`. The
   * weak form: it shows the document but proves nothing on its own, since it
   * is served from this site rather than the issuer's. Kept separate from
   * `url` so the distinction survives — the card says "verify with the issuer"
   * for one and "view certificate" for the other, and swapping a self-hosted
   * PDF for a real verification link later is a one-field change.
   */
  document?: string;
  /** Shown as plain text when there is neither a link nor a hosted copy. */
  credentialId?: string;
};

/**
 * Empty until there is something real to list. Both render sites skip their
 * whole section when this is empty, so an unpopulated array is a safe state to
 * ship rather than a heading with nothing under it.
 *
 * Add entries newest first — neither site sorts, so the order here is the
 * order a reader sees.
 */
export const certifications: Certification[] = [
  {
    name: "Open Science 101",
    issuer: "NASA",
    issued: "October 2026",
    document: "/certificates/nasa-open-science-101.pdf",
  },
  {
    name: "Open Science Essentials",
    issuer: "NASA",
    issued: "October 2026",
    document: "/certificates/nasa-open-science-essentials.pdf",
  },
  {
    name: "Claude 101",
    issuer: "Anthropic",
    issued: "May 2026",
  },
  {
    name: "Machine Learning Virtual Internship",
    issuer: "CodeAlpha",
    issued: "April 2026",
    document: "/certificates/codealpha-machine-learning-internship.pdf",
    credentialId: "CA/DF1/31259",
  },
];
