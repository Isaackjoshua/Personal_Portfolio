import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const description =
  "Notes on machine learning engineering, deployment, and the parts of a system that decide whether a model ever reaches anyone.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/blog`,
    title: "Blog",
    description,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="blog"
        title="Writing"
        lead="Notes on the engineering around machine learning — export paths, deployment constraints, agent architecture, and the decisions that get made long before the model does anything useful."
      />

      <Section width="prose">
        <Reveal>
          <TagFilter />
        </Reveal>

        {posts.length === 0 ? (
          <Reveal className="mt-12">
            <div className="rounded-xl border border-line bg-surface/50 p-8 text-center">
              <p className="font-mono text-sm text-accent">
                $ ls content/blog
              </p>
              <p className="mt-3 text-sm text-muted">
                Nothing published yet. The first post is being written.
              </p>
            </div>
          </Reveal>
        ) : (
          <RevealGroup className="mt-12">
            {posts.map((post) => (
              <RevealItem key={post.slug}>
                <PostCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>
    </>
  );
}
