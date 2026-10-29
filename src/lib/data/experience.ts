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
   * The issuer's own verification page for this credential. Given one, the
   * card's title becomes a link, which is the only thing that makes a listed
   * certificate checkable by a reader.
   */
  url?: string;
  /** Shown as plain text when the issuer gives an ID but no verifiable link. */
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
export const certifications: Certification[] = [];
