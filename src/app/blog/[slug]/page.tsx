import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MdxContent } from "@/components/blog/mdx-content";
import { PostMeta as PostMetaRow } from "@/components/blog/post-meta";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/ui/reveal";
import {
  getAdjacentPosts,
  getPost,
  getPostSlugs,
  type PostMeta,
} from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

// Every post is known at build time, so an unlisted slug is a real 404
// rather than a page rendered on demand that answers 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs({ includeDrafts: true }).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function AdjacentLink({
  post,
  direction,
}: {
  post: PostMeta;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-1 flex-col gap-2 rounded-xl border border-line bg-surface/50 p-5 transition-colors duration-300 hover:border-accent/40 hover:bg-surface ${
        isNext ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
        {!isNext && (
          <ArrowLeft
            className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden
          />
        )}
        {isNext ? "Newer" : "Older"}
        {isNext && (
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden
          />
        )}
      </span>
      <span className="font-mono text-sm text-fg transition-colors duration-300 group-hover:text-accent">
        {post.title}
      </span>
    </Link>
  );
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(post.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    url: `${siteConfig.url}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <article className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd) }}
      />

      <header className="relative overflow-hidden border-b border-line-soft">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-field mask-fade opacity-50"
        />
        <div className="container-prose relative pt-32 pb-12 sm:pt-40 sm:pb-16">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.75} aria-hidden />
              All posts
            </Link>

            {post.draft && (
              <p className="mt-6 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 font-mono text-xs text-amber-300">
                Draft — this post is unpublished and not listed on the blog.
              </p>
            )}

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>

            <h1 className="mt-5 text-3xl leading-tight text-gradient sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-muted">
              {post.description}
            </p>

            <PostMetaRow
              className="mt-7"
              date={post.date}
              readingTime={post.readingTime}
              author={siteConfig.name}
            />
          </Reveal>
        </div>
      </header>

      <div className="container-prose pt-12 sm:pt-16">
        <div className="prose prose-invert prose-terminal max-w-none">
          <MdxContent source={post.content} />
        </div>

        {(previous || next) && (
          <nav
            aria-label="More posts"
            className="mt-16 flex flex-col gap-4 border-t border-line-soft pt-10 sm:flex-row"
          >
            {previous && <AdjacentLink post={previous} direction="previous" />}
            {next && <AdjacentLink post={next} direction="next" />}
          </nav>
        )}
      </div>
    </article>
  );
}
