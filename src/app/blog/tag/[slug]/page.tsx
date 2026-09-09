import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHeader, Section } from "@/components/ui/section";
import { getAllTags, getPostsByTag, getTagName } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { openGraphImage } from "../../../shared-metadata";

type Params = { params: Promise<{ slug: string }> };

// Tags are derived from the posts, so an unknown tag is a real 404.
export const dynamicParams = false;

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
    /**
     * These pages exist to help a reader browse, not to rank. Each is a
     * heading and a list of post links — around 70 words, and mostly the same
     * words as the neighbouring tags. Indexed, they are seven near-duplicates
     * competing with the posts they point at.
     *
     * `follow` is the important half: crawlers still walk these links and
     * reach every post through them. Only the listing page itself stays out
     * of the index.
     */
    robots: { index: false, follow: true },
    openGraph: {
      ...openGraphImage,
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
