export type Role = {
  title: string;
  subtitle: string;
  organisation: string;
  location: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    title: "Machine Learning Intern",
    subtitle: "Industrial Practical Training",
    organisation:
      "Emerging Technologies for Healthcare (ETH) Lab, Muhimbili University of Health and Allied Sciences (MUHAS)",
    location: "Dar es Salaam, Tanzania",
    period: "March 2025 — Present",
    current: true,
    summary:
      "Building and deploying models against real clinical constraints — offline devices, explainability requirements, and datasets assembled across institutions.",
    highlights: [
      "Designed and deployed Mwana AI, a breast cancer ultrasound classifier (PyTorch, ONNX, Flutter) built for offline use in clinics.",
      "Built a CNN-based TB/HIV co-infection detection system with Grad-CAM explainability.",
      "Led multi-institution data extraction for a respiratory disease study across Aga Khan, Warwick, and NTLP.",
      "Assisted in fine-tuning the RETFound foundation model for diabetic retinopathy detection.",
      "Applied transfer learning to cardiac imaging for dilated cardiomyopathy prediction.",
      "Designed data preprocessing pipelines for medical imaging and audio datasets.",
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
    note: "CGPA 4.6 / 5.0",
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
    name: "Machine Learning Virtual Internship",
    issuer: "CodeAlpha",
    issued: "April 2026",
    document: "/certificates/codealpha-machine-learning-internship.pdf",
    credentialId: "CA/DF1/31259",
  },
];
