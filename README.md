# isaack.dev — personal portfolio

The personal site of **Isaack Joshua Lukumay**, a machine learning engineer and
software developer in Dar es Salaam, Tanzania. It is a static-first Next.js
application: a hero and capability overview, five project case studies, a
skills and experience record, an MDX blog, and a working contact form. Content
lives in typed data modules and MDX files in this repository — there is no CMS
and no database.

**Live:** _to be connected (Vercel)_

---

## Tech stack

| Concern | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.3.2 |
| UI runtime | React | 19.2.8 |
| Language | TypeScript (strict) | ^5 |
| Styling | Tailwind CSS (CSS-first, no config file) | ^4 |
| Animation | Framer Motion | ^13.1.1 |
| Blog | MDX via `next-mdx-remote/rsc` | ^6.0.0 |
| Syntax highlighting | `rehype-pretty-code` + Shiki | ^4.4.3 |
| Forms | React Hook Form + Zod | ^7.86.0 / ^4.4.3 |
| Email delivery | Resend (optional) | ^6.22.0 |
| Icons | `lucide-react` (+ inline brand SVGs) | ^1.34.0 |

> `lucide-react` v1 no longer ships brand glyphs. The GitHub and LinkedIn marks
> are hand-written inline SVG in `src/components/ui/icons.tsx`.

---

## Getting started

Requires **Node.js 20 or newer**.

```bash
npm install
npm run dev
```

The dev server runs at <http://localhost:3000>.

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the development server with hot reloading. |
| `npm run build` | Production build — type-checks, compiles, and prerenders every static route. |
| `npm run start` | Serve the production build (run `build` first). |
| `npm run lint` | Run ESLint across the project. |
| `npm run typecheck` | Run `tsc --noEmit` without building. |

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. **Nothing here is
required to run the site locally** — every variable has a working fallback.

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, used for `metadataBase`, canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`. No trailing slash. | No — recommended in production |
| `RESEND_API_KEY` | API key for [Resend](https://resend.com), which delivers contact-form submissions. | No |
| `CONTACT_FROM_EMAIL` | `From` address on contact emails. Must be on a domain verified in Resend. Defaults to Resend's sandbox sender. | No |
| `CONTACT_TO_EMAIL` | Destination inbox. Defaults to `isaackjoshua23@gmail.com`. | No |

### Contact form behaviour without a key

The form is fully functional before email is wired up. When `RESEND_API_KEY` is
absent, `POST /api/contact` still validates the payload, applies rate limiting,
writes the submission to the server log, and returns `200` with
`{ ok: true, delivered: false }`. The visitor sees a normal success state; only
the delivery step is skipped. Set the key and messages start arriving by email
with no code change.

The endpoint also rate-limits to **3 submissions per IP per 10 minutes** using
an in-memory map. That is per-instance and resets on redeploy — a durable store
(Vercel KV, Upstash) is the production upgrade if abuse becomes a problem.

---

## Project structure

```
├── content/
│   └── blog/                     MDX posts — the whole blog corpus
├── public/
│   └── Isaack_Joshua_Lukumay_CV.pdf
└── src/
    ├── app/
    │   ├── layout.tsx            Root layout: fonts, metadata, nav, footer
    │   ├── page.tsx              Home — hero, capabilities, featured work, CTA
    │   ├── globals.css           Design tokens, utilities, prose + code styles
    │   ├── about/                Narrative, principles, quick facts
    │   ├── projects/             Index + [slug] case studies
    │   ├── skills/               Categorised capability grid
    │   ├── experience/           Timeline + education
    │   ├── blog/                 Listing, [slug] posts, tag/[slug] filters
    │   ├── contact/              Form + direct contact details
    │   ├── cv/                   Print-ready CV rendered from the data modules
    │   ├── api/contact/route.ts  Validation, rate limiting, Resend delivery
    │   ├── sitemap.ts robots.ts manifest.ts
    │   ├── icon.svg apple-icon.svg opengraph-image.tsx
    │   └── not-found.tsx loading.tsx
    ├── components/
    │   ├── ui/                   Shared primitives — Button, Tag, Card,
    │   │                         Section, Reveal, TerminalWindow, icons
    │   ├── layout/               Navbar (sticky, blur, mobile drawer), Footer
    │   ├── home/ about/ projects/ skills/ experience/ blog/ contact/
    │   └                         Route-specific components
    └── lib/
        ├── site.ts               Name, role, contact details, nav, socials
        ├── blog.ts               MDX parsing, tags, reading time, adjacency
        ├── validation.ts         Zod contact schema shared by form and API
        ├── utils.ts              cn(), date formatting
        └── data/
            ├── projects.ts       The five case studies
            ├── skills.ts         Six capability groups
            └── experience.ts     Roles and education
```

---

## Editing content

All site copy that is not page prose lives in typed modules. Edit these rather
than hunting through components:

| File | Owns |
|---|---|
| `src/lib/site.ts` | Name, role, tagline, location, email, phone, socials, nav items, languages |
| `src/lib/data/projects.ts` | Project case studies — summary, description, stack, highlights, terminal panel |
| `src/lib/data/skills.ts` | Skill categories and their contents |
| `src/lib/data/experience.ts` | Roles, highlights, and education |

TypeScript will flag anything that breaks a shape, so a bad edit fails at build
time rather than rendering blank.

### Adding a blog post

Create `content/blog/my-post.mdx`:

```mdx
---
title: "Post title"
description: "One sentence used in the listing, meta description and OG card."
date: "2026-01-15"
tags: ["ML Engineering", "Deployment"]
draft: false
---

Body content starts here.
```

All five frontmatter fields are validated at build time. A missing field or a
malformed date fails the build with the offending filename, so a broken post can
never render blank.

- The filename becomes the slug: `my-post.mdx` → `/blog/my-post`.
- Reading time is computed automatically.
- Tags generate their own pages at `/blog/tag/[slug]`.
- `draft: true` hides a post from listings, tags and the sitemap, but it remains
  reachable by direct URL with a visible draft banner.

Code fences are highlighted by `rehype-pretty-code` and support titles and line
highlighting:

````md
```python title="export.py" {3-5}
import torch
```
````

A `<Callout>` component is available inside MDX for asides:

```mdx
<Callout>Verify the export rather than trusting it.</Callout>
```

### Replacing the CV

Drop the new PDF at `public/Isaack_Joshua_Lukumay_CV.pdf`, overwriting what is
there. The path and filename are configured in `siteConfig.cv`
(`src/lib/site.ts`), so nothing else needs changing.

`/cv` is a separate, print-ready page rendered from the data modules rather than
from the PDF. The two are maintained independently — if you edit the PDF, check
`/cv` still says the same thing.

### Replacing the headshot

The photo lives at `public/isaack.jpg` and is rendered by
`src/components/about/portrait-frame.tsx` into a 4:5 frame with `object-cover`.
To replace it, overwrite that file — keep it portrait and at least ~1000px wide.
Match the extension to the actual encoding (a JPEG must be `.jpg`), otherwise it
is served under the wrong content type.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository. The framework is
   detected automatically; build command and output directory need no changes.
3. Add the environment variables from the table above under
   **Settings → Environment Variables**. At minimum set `NEXT_PUBLIC_SITE_URL`
   to the production origin.
4. Deploy. Connect a custom domain under **Settings → Domains** when ready, and
   update `NEXT_PUBLIC_SITE_URL` to match.

---

## Performance and accessibility

The site targets a Lighthouse score of 90+ across all categories.

- Every route except `POST /api/contact` is statically generated at build time.
- Fonts are self-hosted and preloaded through `next/font`, so there is no
  render-blocking request to an external font host.
- No stock imagery or icon-font payloads — visual texture is CSS gradients,
  inline SVG and terminal chrome.
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`, `Permissions-Policy`) are applied site-wide in
  `next.config.ts`.
- Motion respects `prefers-reduced-motion`: scroll reveals collapse to a plain
  fade and the hero typing effect renders its full string instantly.
- Semantic landmarks, a skip link, visible focus rings, labelled icon-only
  controls, and `aria-live` regions on form state changes.

---

## Licence

MIT.

## Contact

Isaack Joshua Lukumay — [isaackjoshua23@gmail.com](mailto:isaackjoshua23@gmail.com)
· [github.com/Isaackjoshua](https://github.com/Isaackjoshua)
· [linkedin.com/in/isaack-joshua](https://linkedin.com/in/isaack-joshua)
