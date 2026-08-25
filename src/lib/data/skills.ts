export type SkillGroup = {
  slug: string;
  title: string;
  /** One-line framing so the grid reads as capability, not a keyword dump. */
  blurb: string;
  icon:
    | "terminal"
    | "brain"
    | "layers"
    | "eye"
    | "database"
    | "chart"
    | "smartphone"
    | "users";
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    slug: "languages-tools",
    title: "Languages & Tools",
    blurb: "The everyday surface — where the work actually gets written and run.",
    icon: "terminal",
    skills: [
      "Python",
      "TypeScript",
      "Git / GitHub",
      "Linux",
      "nginx",
      "Streamlit",
      "Electron",
    ],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning & AI",
    blurb: "Training models is half of it. Getting them to run somewhere real is the other half.",
    icon: "brain",
    skills: [
      "Deep learning",
      "Transfer learning",
      "Model fine-tuning",
      "ONNX export",
      "On-device inference",
      "LLM tool-use",
      "Agentic systems",
    ],
  },
  {
    slug: "frameworks",
    title: "Frameworks",
    blurb: "From research notebooks through to the API serving the result.",
    icon: "layers",
    skills: [
      "PyTorch",
      "TensorFlow / Keras",
      "HuggingFace Transformers",
      "Scikit-learn",
      "FastAPI",
      "Celery",
      "React",
    ],
  },
  {
    slug: "computer-vision",
    title: "Computer Vision",
    blurb: "Medical imaging work, where a prediction has to be explainable to a clinician.",
    icon: "eye",
    skills: [
      "Image preprocessing",
      "Augmentation",
      "Segmentation",
      "Classification",
      "Grad-CAM explainability",
    ],
  },
  {
    slug: "data",
    title: "Data",
    blurb: "Most of the accuracy is decided before the model sees anything.",
    icon: "database",
    skills: [
      "Data cleaning",
      "EDA",
      "Feature engineering",
      "PostgreSQL",
      "Data visualisation",
    ],
  },
  {
    slug: "reporting",
    title: "Reporting",
    blurb: "A finding only counts once someone outside the team can act on it.",
    icon: "chart",
    skills: ["Power BI", "Microsoft Excel", "Microsoft Word", "Canva"],
  },
  {
    slug: "mobile-desktop",
    title: "Mobile & Desktop",
    blurb: "Shipping to the device the user already has in front of them.",
    icon: "smartphone",
    skills: ["Flutter (Android)", "Electron (cross-platform desktop)"],
  },
  {
    slug: "professional",
    title: "Professional",
    blurb: "The parts of the work that happen between people, not in an editor.",
    icon: "users",
    skills: [
      "Technical communication",
      "Cross-team collaboration",
      "Problem solving",
      "Adaptability",
    ],
  },
];
