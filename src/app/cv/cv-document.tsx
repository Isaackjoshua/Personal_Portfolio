import { siteConfig, languages } from "@/lib/site";
import { education, roles } from "@/lib/data/experience";
import { skillGroups } from "@/lib/data/skills";
import { projects } from "@/lib/data/projects";

/**
 * Print stylesheet. Scoped to `.cv` so it cannot leak into the rest of the
 * site, plus a couple of element rules that reach the layout chrome — the
 * global header and footer are outside this component's tree, so Tailwind's
 * `print:` variants cannot touch them.
 */
const printCss = `
@media print {
  @page { size: A4; margin: 14mm 15mm; }
  html, body { background: #fff !important; }
  body > header, body > footer, .cv-screen-only { display: none !important; }
  main { padding: 0 !important; }

  .cv { max-width: none; padding: 0 !important; color: #16181d; }
  .cv h1, .cv h2, .cv h3, .cv dt, .cv strong { color: #0b0c0f !important; }
  .cv p, .cv li, .cv dd, .cv span { color: #24272d !important; }
  .cv a { color: #0b7a55 !important; text-decoration: none; }
  .cv .cv-accent { color: #0b7a55 !important; }
  .cv .cv-rule { border-color: #dfe3e8 !important; }
  .cv .cv-entry { break-inside: avoid; page-break-inside: avoid; }
  .cv h2 { break-after: avoid; page-break-after: avoid; }
  .cv .cv-panel { border-color: #dfe3e8 !important; background: transparent !important; }
}
`;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="cv-rule mt-10 border-b border-line pb-2 font-mono text-xs uppercase tracking-[0.16em] text-fg">
      {children}
    </h2>
  );
}

export function CvDocument() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printCss }} />

      <div className="cv container-prose pt-32 pb-24 print:pt-0">
        <div className="cv-screen-only mb-10 rounded-xl border border-line bg-surface/50 p-5">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
            Print view
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {
              "This page mirrors the downloadable CV. Use your browser's print dialog (Ctrl/Cmd + P) and choose “Save as PDF” to export a copy, or "
            }
            <a
              href={siteConfig.cv.href}
              download={siteConfig.cv.filename}
              className="text-accent link-underline"
            >
              download the PDF directly
            </a>
            .
          </p>
        </div>

        <header className="cv-entry">
          <h1 className="text-3xl tracking-tight sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="cv-accent mt-2 font-mono text-sm text-accent">
            {siteConfig.role} &middot; Software Developer
          </p>
          <p className="mt-3 text-sm text-muted">
            {siteConfig.location} &middot;{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
            &middot; {siteConfig.phone}
          </p>
          <p className="mt-1 text-sm text-muted">
            <a href={siteConfig.socials.github}>github.com/Isaackjoshua</a>{" "}
            &middot;{" "}
            <a href={siteConfig.socials.linkedin}>
              linkedin.com/in/isaack-joshua
            </a>
          </p>
        </header>

        <SectionTitle>Profile</SectionTitle>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {
            "Machine learning engineer and software developer who builds end-to-end systems, not just models. Work spans ML/AI, backend engineering, cross-platform desktop applications and mobile, with a consistent focus on getting systems into real use — offline and on-device inference, explicit safety boundaries, and modular architecture that survives a second use case. Final-year Computer Science student at St. Joseph University in Tanzania and machine learning intern at the Emerging Technologies for Healthcare Lab, MUHAS."
          }
        </p>

        <SectionTitle>Experience</SectionTitle>
        {roles.map((role) => (
          <section key={role.title} className="cv-entry mt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-base font-semibold">{role.title}</h3>
              <p className="font-mono text-xs text-faint">{role.period}</p>
            </div>
            <p className="mt-0.5 text-sm text-faint">{role.subtitle}</p>
            <p className="mt-1 text-sm font-medium text-fg">
              {role.organisation} &mdash; {role.location}
            </p>
            <ul className="mt-3 space-y-1.5">
              {role.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2 text-sm leading-relaxed text-muted"
                >
                  <span className="cv-accent text-accent" aria-hidden>
                    &bull;
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-xs text-faint">
              {role.stack.join(" · ")}
            </p>
          </section>
        ))}

        <SectionTitle>Selected projects</SectionTitle>
        <div className="mt-4 space-y-4">
          {projects.map((project) => (
            <section key={project.slug} className="cv-entry">
              <p className="text-sm leading-relaxed text-muted">
                <strong className="font-semibold text-fg">{project.name}</strong>{" "}
                &mdash; {project.summary}
              </p>
              <p className="mt-1 font-mono text-xs text-faint">
                {project.stack.join(" · ")}
                {" | "}
                <a href={project.github}>
                  {project.github.replace("https://", "")}
                </a>
              </p>
            </section>
          ))}
        </div>

        <SectionTitle>Technical skills</SectionTitle>
        <dl className="mt-4">
          {skillGroups.map((group) => (
            <div
              key={group.slug}
              className="cv-entry cv-rule flex flex-col gap-1 border-b border-line-soft py-2.5 last:border-b-0 sm:flex-row sm:gap-6"
            >
              <dt className="cv-accent w-44 shrink-0 font-mono text-xs text-accent">
                {group.title}
              </dt>
              <dd className="text-sm text-muted">{group.skills.join(", ")}</dd>
            </div>
          ))}
        </dl>

        <SectionTitle>Education</SectionTitle>
        <div className="mt-4 space-y-4">
          {education.map((entry) => (
            <section key={entry.qualification} className="cv-entry">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                <h3 className="text-base font-semibold">
                  {entry.qualification}
                </h3>
                <p className="font-mono text-xs text-faint">{entry.period}</p>
              </div>
              <p className="mt-0.5 text-sm text-muted">
                {entry.institution}
                {entry.location ? `, ${entry.location}` : ""}
                {entry.note ? ` — ${entry.note}` : ""}
              </p>
            </section>
          ))}
        </div>

        <SectionTitle>Languages</SectionTitle>
        <dl className="mt-4">
          {languages.map((language) => (
            <div
              key={language.name}
              className="cv-entry cv-rule flex gap-6 border-b border-line-soft py-2.5 last:border-b-0"
            >
              <dt className="cv-accent w-44 shrink-0 font-mono text-xs text-accent">
                {language.name}
              </dt>
              <dd className="text-sm text-muted">{language.level}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
