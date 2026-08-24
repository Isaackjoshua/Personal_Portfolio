import { TagLink } from "@/components/ui/tag";
import { getAllPosts, getAllTags } from "@/lib/blog";

/**
 * Link-based filtering — no client state, so the whole listing stays static.
 * `activeSlug` is undefined on /blog, which highlights "All".
 */
export function TagFilter({ activeSlug }: { activeSlug?: string }) {
  const tags = getAllTags();
  // The count on "All" is the number of posts, not the number of tag
  // applications — a post with three tags must still count once.
  const postCount = getAllPosts().length;

  if (tags.length === 0) return null;

  return (
    <nav aria-label="Filter posts by tag">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          <TagLink href="/blog" active={!activeSlug}>
            All
            <span className="ml-1.5 text-faint">{postCount}</span>
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
