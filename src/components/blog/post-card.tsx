import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import type { PostMeta } from "@/lib/blog";
import { formatDateStamp } from "@/lib/utils";

/**
 * Hairline row rather than a boxed card — a list of posts reads better as a
 * ledger than as a grid of panels.
 */
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative border-b border-line-soft py-8 transition-colors duration-300 first:border-t hover:border-line">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.6875rem] tracking-wide text-faint">
        <time dateTime={post.date}>{formatDateStamp(post.date)}</time>
        <span aria-hidden className="text-line">
          /
        </span>
        <span>{post.readingTime}</span>
      </div>

      <h2 className="mt-3 text-xl transition-colors duration-300 group-hover:text-accent sm:text-2xl">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {post.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <p
          aria-hidden
          className="inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors duration-300 group-hover:text-accent"
        >
          Read
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
          />
        </p>
      </div>
    </article>
  );
}
