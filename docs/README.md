# docs/

Build sources for assets that ship in `public/`.

## `cv-source.html`

The typeset source for `public/Isaack_Joshua_Lukumay_CV.pdf`. It is a
single self-contained HTML file with print styles targeting A4.

Regenerate the PDF after editing it:

```bash
google-chrome --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/Isaack_Joshua_Lukumay_CV.pdf \
  "file://$PWD/docs/cv-source.html"
```

Any Chromium build works (`chromium`, `chromium-browser`, `google-chrome`).
The file is not served — it lives outside `public/` on purpose.

Keep it in sync with `src/lib/site.ts`, `src/lib/data/experience.ts`,
`src/lib/data/skills.ts` and `src/lib/data/projects.ts`, which are the single
source of truth for the same content on the site and at `/cv`.
