import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-dark-default",
  // globals.css owns the surface colour so code blocks match the site.
  keepBackground: false,
  defaultLang: "ts",
};

/**
 * Callout used from MDX for asides. Everything referenced from a post must
 * exist in the `components` map below.
 */
function Callout({
  children,
  type = "note",
}: {
  children: ReactNode;
  type?: "note" | "warning";
}) {
  return (
    <aside
      className={
        "not-prose my-7 rounded-xl border-l-2 bg-bg-soft px-5 py-4 text-sm leading-relaxed " +
        (type === "warning"
          ? "border-l-amber-400/70 text-muted"
          : "border-l-accent text-muted")
      }
    >
      <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
        {type === "warning" ? "Careful" : "Note"}
      </p>
      {children}
    </aside>
  );
}

function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const external = /^https?:/.test(href);

  return (
    <a
      href={href}
      className="text-accent"
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      {...props}
    />
  );
}

const components = {
  a: Anchor,
  Callout,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="scroll-mt-24" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="scroll-mt-24" {...props} />
  ),
  hr: () => <hr className="my-10 border-line-soft" />,
};

export async function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        // Frontmatter is stripped in lib/blog.ts before it reaches here.
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, prettyCodeOptions],
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ],
        },
      }}
    />
  );
}
