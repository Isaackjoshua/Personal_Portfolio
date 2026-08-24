# Portfolio Website Brief — Isaack Joshua Lukumay

## Overview

Build a personal developer portfolio website for Isaack Joshua Lukumay, a machine learning engineer and final-year Computer Science student based in Dar es Salaam, Tanzania. The site serves as a professional showcase for recruiters, potential clients, collaborators, and the open-source community.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion for subtle transitions and scroll-triggered reveals
- **Blog:** MDX (Markdown + JSX) — posts stored in the repo, no CMS dependency
- **Contact form:** React Hook Form + a serverless endpoint (Vercel serverless function or a service like Resend / Formspree)
- **Deployment:** Vercel (custom domain to be connected later)
- **Icons:** Lucide React or React Icons

---

## Design Direction

- **Vibe:** Dark, developer-focused. Think terminal aesthetics meets modern UI — not edgy or gimmicky, but sharp, technical, and confident.
- **Color palette:** Dark background (#0A0A0A or similar near-black), with a signature accent color (electric blue, emerald green, or amber — pick one and commit). White/light grey for body text. Accent used sparingly for links, active states, project tags, and hover effects.
- **Typography:** Monospace for headings, code snippets, and the nav (JetBrains Mono, Fira Code, or Space Mono). Clean sans-serif for body text (Inter or General Sans).
- **Layout:** Generous whitespace. Content max-width ~800–900px for readability. Full-bleed sections for hero and project showcases.
- **Micro-interactions:** Subtle hover effects on project cards, smooth page transitions, a blinking cursor or typing effect on the hero tagline (optional, don't overdo it).
- **No stock imagery.** Use code snippets, terminal-style elements, or geometric/abstract SVG patterns for visual texture.

---

## Site Structure (Multi-page)

### 1. Home / Hero

- Full-screen or near-full-screen hero section
- Name: **Isaack Joshua Lukumay**
- Tagline (one of these or similar):
  - "I build AI systems that ship — not just score."
  - "ML Engineer. Backend Developer. Builder."
  - "Building things that work beyond the notebook."
- Brief 2–3 sentence intro positioning him as an ML engineer and software developer who builds end-to-end systems
- CTA buttons: "View Projects" and "Download CV"
- Social links: GitHub, LinkedIn, Email
- Subtle animated background (e.g. a faint grid, floating particles, or a gradient shift — nothing heavy)

### 2. About

- A longer narrative about who Isaack is, what drives him, and how he works
- Key points to cover:
  - Final-year Computer Science student at St. Joseph University in Tanzania (graduating 2026)
  - ML Intern at the Emerging Technologies for Healthcare (ETH) Lab, Muhimbili University of Health and Allied Sciences (MUHAS)
  - Works across ML/AI, backend engineering, cross-platform desktop apps, and mobile development
  - Builds AI systems with a focus on real-world deployment — offline inference, safety boundaries, modular architecture
  - Based in Dar es Salaam, Tanzania
- Framing: Lead with engineering capability broadly — healthcare is one context, not a defining identity
- Optional: A photo placeholder (Isaack to supply a headshot later)
- Link to download CV (PDF)

### 3. Projects

Each project displayed as a card with:
- Project name and one-line description
- Tech stack tags
- GitHub link
- Optional: live demo link or screenshot/mockup placeholder
- Click-through to a dedicated project detail page (or expandable modal) with a longer description

**Projects to feature (in this order):**

#### Lyceum — Cross-Platform AI Teaching App
- **Stack:** Electron · TypeScript · React · Multi-LLM (Claude, GPT, Kimi, local models)
- **GitHub:** https://github.com/Isaackjoshua/Lyceum
- **Description:** A cross-platform desktop app that turns any LLM into a structured, interactive tutor — teaching through explanation, worked examples, and adaptive questioning rather than one-shot answers. Vendor-agnostic: users bring their own API key and choose from Claude, GPT, Kimi, or a locally hosted open-weight model. Ships with no bundled API key and no vendor lock-in.

#### Triage — AI Machine-Diagnostics Agent
- **Stack:** Python · LLM tool-use · System diagnostics · Cross-platform
- **GitHub:** https://github.com/Isaackjoshua/Triage
- **Description:** A transport-agnostic AI agent that autonomously diagnoses faulty computers — running system checks, applying safe software fixes, and escalating hardware or high-risk issues to a human operator. Built with a modular action pipeline and safety boundaries ensuring the agent only executes repairs within a defined low-risk scope.

#### Afya-Predict — AI Disease-Outbreak Prediction Platform
- **Stack:** Python · Machine Learning · Epidemiological modelling · Modular architecture
- **GitHub:** https://github.com/Isaackjoshua/Afya_Predict
- **Description:** A modular, extensible AI platform for predicting disease outbreaks in Tanzania (Afya = "Health" in Swahili), designed to ingest health-facility, climate, and mobility data and surface early-warning signals for public-health decision-makers. Built with a plug-in data-source architecture so the system scales across regions and disease categories.

#### Amana — Mobile Money Escrow Platform
- **Stack:** Python · FastAPI · PostgreSQL · Celery · Selcom API
- **GitHub:** https://github.com/Isaackjoshua/Escrow
- **Description:** A multisignature escrow platform securing mobile money transactions for small merchants and gig workers across East Africa. PostgreSQL schema supports the full transaction lifecycle (initiation, hold, dispute, release) with atomicity guarantees and Selcom mobile money integration. RESTful API built in FastAPI following OWASP security guidance, deployed on a Linux VPS with nginx and Certbot.

#### Mwana AI — Breast Cancer Ultrasound Classifier
- **Stack:** Python · PyTorch · HuggingFace Transformers · ONNX Runtime · Flutter
- **GitHub:** https://github.com/Isaackjoshua/breast_cancer_ai
- **Description:** An ultrasound image classification model for breast cancer screening, designed for offline deployment in low-resource Tanzanian clinical settings. Model exported to ONNX for on-device inference with a Flutter mobile frontend targeting Android. Developed at the ETH Lab, MUHAS.

### 4. Skills

Visual, categorised display — not a wall of text. Use a grid of skill cards or grouped tags with subtle icons.

**Categories:**

| Category | Skills |
|---|---|
| Languages & Tools | Python, TypeScript, Git/GitHub, Linux, nginx, Streamlit, Electron |
| Machine Learning & AI | Deep learning, transfer learning, model fine-tuning, ONNX export, on-device inference, LLM tool-use, agentic systems |
| Frameworks | PyTorch, TensorFlow/Keras, HuggingFace Transformers, Scikit-learn, FastAPI, Celery, React |
| Computer Vision | Image preprocessing, augmentation, segmentation, classification, Grad-CAM explainability |
| Data | Data cleaning, EDA, feature engineering, PostgreSQL, data visualisation |
| Mobile & Desktop | Flutter (Android), Electron (cross-platform desktop) |

### 5. Experience

Timeline or card layout:

#### Machine Learning Intern (Industrial Practical Training)
**March 2025 – Present**
Emerging Technologies for Healthcare (ETH) Lab, Muhimbili University of Health and Allied Sciences (MUHAS) — Dar es Salaam, Tanzania

Key highlights:
- Designed and deployed Mwana AI — breast cancer ultrasound classifier (PyTorch, ONNX, Flutter) for offline use in clinics
- Built a CNN-based TB/HIV co-infection detection system with Grad-CAM explainability
- Led multi-institution data extraction for a respiratory disease study (Aga Khan, Warwick, NTLP)
- Assisted in fine-tuning the RETFound foundation model for diabetic retinopathy detection
- Applied transfer learning to cardiac imaging for dilated cardiomyopathy prediction
- Designed data preprocessing pipelines for medical imaging and audio datasets

#### Education
- **BSc (Hons) Computer Science** — St. Joseph University in Tanzania (2023–2026 expected)
- **ACSEE** — Kongwa Secondary School, Dodoma (2021–2023)

### 6. Blog

- MDX-powered blog with:
  - Post listing page with title, date, short excerpt, and tags
  - Individual post pages with syntax-highlighted code blocks (use rehype-pretty-code or similar)
  - Tag filtering
  - Reading time estimate
- Content categories (suggested starting topics): ML engineering, project write-ups, tutorials, developer tools, lessons learned
- Start with 2–3 seed posts (Isaack to write) or placeholder posts

### 7. Contact

- Contact form with fields: Name, Email, Subject, Message
- Form validation with clear error states
- Submit to a serverless function (Vercel API route) or service like Resend / Formspree
- Also display:
  - Email: isaackjoshua23@gmail.com
  - Phone: +255 761 638 781
  - GitHub: github.com/Isaackjoshua
  - LinkedIn: linkedin.com/in/isaack-joshua
- Optional: a subtle CTA line like "Have a project in mind? Let's talk."

---

## Global Elements

### Navigation
- Sticky top nav, semi-transparent with blur backdrop on scroll
- Logo or name on the left (text-based: "IJL" monogram or "isaack.dev" style)
- Nav links on the right: About, Projects, Skills, Experience, Blog, Contact
- Mobile: hamburger menu with slide-in drawer
- Active page indicator (underline or accent color)

### Footer
- Social links (GitHub, LinkedIn, Email)
- "Built with Next.js · Deployed on Vercel" or similar
- Copyright line

### Resume Download
- A persistent "Download CV" button accessible from the nav or hero
- Links to the latest PDF version of the CV
- File: Isaack_Joshua_Lukumay_CV.pdf (stored in /public)

### SEO & Meta
- Page-level meta titles and descriptions
- Open Graph tags for link previews (especially for blog posts)
- Favicon (a simple "I" or "IJL" monogram in the accent color)

### Performance
- Static generation (SSG) where possible
- Lazy-load images and project screenshots
- Lighthouse score target: 90+ across all categories

---

## Tone & Copy Guidelines

- Confident but not arrogant. Let the work speak.
- Technical but accessible — a recruiter and a senior engineer should both understand it.
- Lead with engineering capability broadly. Healthcare is one domain, not the identity.
- No "aspiring" or "passionate learner" language. He builds and ships real systems.
- Short sentences. No filler.

---

## Contact & Social Links

| Platform | URL |
|---|---|
| Email | isaackjoshua23@gmail.com |
| Phone | +255 761 638 781 |
| GitHub | https://github.com/Isaackjoshua |
| LinkedIn | https://linkedin.com/in/isaack-joshua |

---

## Languages

- English — Professional working proficiency
- Swahili — Native

---

## Deliverables

1. Fully functional Next.js portfolio site
2. Deployed to Vercel with production build
3. Blog system with MDX support
4. Contact form with working submission
5. Responsive across mobile, tablet, and desktop
6. README with setup instructions for local development
