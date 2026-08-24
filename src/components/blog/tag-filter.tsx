import { TagLink } from "@/components/ui/tag";
import { getAllTags } from "@/lib/blog";

/**
 * Link-based filtering — no client state, so the whole listing stays static.
 * `activeSlug` is undefined on /blog, which highlights "All".
 */
export function TagFilter({ activeSlug }: { activeSlug?: string }) {
  const tags = getAllTags();

  if (tags.length === 0) return null;

  return (
    <nav aria-label="Filter posts by tag">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          <TagLink href="/blog" active={!activeSlug}>
            All
            <span className="ml-1.5 text-faint">
              {tags.reduce((total, tag) => total + tag.count, 0)}
            </span>
          </TagLink>
        </li>
        {tags.map((tag) => (
          <li key={tag.slug}>
            <TagLink
              href={`/blog/tag/${tag.slug}`}
              active={activeSlug === tag.slug}
            >
              {tag.tag}
              <span className="ml-1.5 text-faint">{tag.count}</span>
            </TagLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
