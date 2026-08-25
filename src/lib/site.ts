export const siteConfig = {
  name: "Isaack Joshua Lukumay",
  shortName: "Isaack Joshua",
  monogram: "IJL",
  role: "Machine Learning Engineer",
  tagline: "I build AI systems that ship — not just score.",
  description:
    "Machine learning engineer and software developer based in Dar es Salaam, available for remote work worldwide and open to relocation. I build end-to-end AI systems — offline inference, agentic tooling, and the backends that carry them into production.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://isaackjoshua.vercel.app",
  location: "Dar es Salaam, Tanzania",
  /**
   * Where he can work, as opposed to where he is. Recruiters scanning the site
   * need this as early as the hero, so it lives beside the location rather
   * than being buried in prose.
   */
  availability: {
    status: "Open to work",
    /** Tight spaces — pills, terminal lines, meta rows. */
    short: "Remote or relocating",
    /** Full sentence for prose and meta descriptions. */
    long: "Available for remote work worldwide and open to relocation.",
  },
  email: "isaackjoshua23@gmail.com",
  phone: "+255 761 638 781",
  phoneHref: "+255761638781",
  cv: {
    href: "/Isaack_Joshua_Lukumay_CV.pdf",
    filename: "Isaack_Joshua_Lukumay_CV.pdf",
  },
  socials: {
    github: "https://github.com/Isaackjoshua",
    linkedin: "https://linkedin.com/in/isaack-joshua",
    email: "mailto:isaackjoshua23@gmail.com",
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
};

export const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const languages = [
  { name: "English", level: "Professional working proficiency" },
  { name: "Swahili", level: "Native" },
] as const;
