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
    note: "Expected graduation 2026",
  },
  {
    qualification: "ACSEE",
    institution: "Kongwa Secondary School",
    location: "Dodoma",
    period: "2021 — 2023",
  },
];
