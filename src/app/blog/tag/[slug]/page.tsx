import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { getAllTags, getPostsByTag, getTagName } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const name = getTagName(slug);

  if (!name) return { title: "Tag not found" };

  const count = getPostsByTag(slug).length;
  const description = `${count} ${count === 1 ? "post" : "posts"} tagged ${name}.`;

  return {
    title: `${name} — posts`,
    description,
    alternates: { canonical: `/blog/tag/${slug}` },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}/blog/tag/${slug}`,
      title: `${name} — posts`,
      description,
    },
  };
}

export default async function TagPage({ params }: Params) {
  const { slug } = await params;
  const name = getTagName(slug);

  if (!name) notFound();

  const posts = getPostsByTag(slug);

  return (
    <>
      <PageHeader
        eyebrow="tag"
        title={name}
        lead={`${posts.length} ${posts.length === 1 ? "post" : "posts"} tagged ${name}.`}
      />

      <Section width="prose">
        <Reveal>
          <TagFilter activeSlug={slug} />
        </Reveal>

        <RevealGroup className="mt-12">
          {posts.map((post) => (
            <RevealItem key={post.slug}>
              <PostCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
