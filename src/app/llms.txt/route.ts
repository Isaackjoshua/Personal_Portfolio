import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/data/projects";
import { roles } from "@/lib/data/experience";
import { siteConfig } from "@/lib/site";

/**
 * `/llms.txt` — the convention AI crawlers and answer engines check the way
 * search engines check `robots.txt` (see llmstxt.org). Plain Markdown: who this
 * is, what the key pages are, and where they live.
 *
 * It is a route rather than a file in `public/` for the same reason
 * `sitemap.ts` is: it reads the data that builds the pages, so a new project or
 * post appears here without anyone remembering to update a second copy. A
 * hand-maintained file would be wrong within a release or two.
 *
 * The spec wants an H1, an italicised summary, then link sections — so the
 * shape below is deliberate, not decorative.
 */

const origin = siteConfig.url.replace(/\/+$/, "");

const url = (path: string) => `${origin}${path}`;

/** Static so the file is generated at build time and served from the edge. */
export const dynamic = "force-static";

function body(): string {
  const posts = getAllPosts();
  const current = roles.find((role) => role.current);

  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.role} in ${siteConfig.location}. ${siteConfig.availability.long} Builds end-to-end AI systems — model training, export to on-device inference, agentic tooling, and the backends that carry them into production. ${siteConfig.tagline}`,
    "",
    "Work centres on machine learning that has to run under real constraints rather than benchmark conditions: offline inference on phones and laptops, explainability requirements in clinical settings, and deployment targets without reliable connectivity.",
    "",
  ];

  if (current) {
    lines.push(
      `Currently ${current.title.toLowerCase()} at the ${current.organisation}, ${current.period.toLowerCase()}. ${current.summary}`,
      "",
    );
  }

  lines.push(
    "## Key pages",
    "",
    `- [About](${url("/about")}): background, working principles, and how the engineering fits together end to end.`,
    `- [Projects](${url("/projects")}): ${projects.length} systems across machine learning, backend, desktop, and mobile, each written up with the decisions behind it.`,
    `- [Skills](${url("/skills")}): tools and techniques grouped by capability.`,
    `- [Experience](${url("/experience")}): roles, dates, and what shipped.`,
    `- [Blog](${url("/blog")}): notes on ML engineering, deployment, and agent architecture.`,
    `- [Contact](${url("/contact")}): enquiries about roles, contract work, and collaboration.`,
    "",
    "## Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${project.name}](${url(`/projects/${project.slug}`)}): ${project.summary} ${project.domain}; ${project.stack.slice(0, 4).join(", ")}. ${project.year}, ${project.status.toLowerCase()}.`,
    ),
    "",
    "## Writing",
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${url(`/blog/${post.slug}`)}): ${post.description} Published ${post.date}.`,
    ),
    "",
    "## Contact",
    "",
    `- Email: ${siteConfig.email}`,
    `- GitHub: ${siteConfig.socials.github}`,
    `- LinkedIn: ${siteConfig.socials.linkedin}`,
    `- CV (PDF): ${url(siteConfig.cv.href)}`,
    "",
  );

  return lines.join("\n");
}

export function GET() {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
