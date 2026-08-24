/**
 * Blog content pipeline.
 *
 * Posts are MDX files in `content/blog`, read from disk at build time. This
 * module is server-only — it touches `node:fs` and must never be imported from
 * a Client Component. (`server-only` is not a dependency of this project, so
 * that boundary is enforced by convention rather than by a build error.)
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, "YYYY-MM-DD". */
  date: string;
  tags: string[];
  /** e.g. "6 min read" */
  readingTime: string;
  draft: boolean;
};

export type Post = PostMeta & {
  /** Raw MDX body with the frontmatter already stripped. */
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

/** "ML Engineering" -> "ml-engineering" */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[\s/_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function assertString(
  value: unknown,
  field: string,
  file: string,
): asserts value is string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `content/blog/${file}: frontmatter field "${field}" is required and must be a non-empty string.`,
    );
  }
}

function parseFile(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  assertString(data.title, "title", file);
  assertString(data.description, "description", file);
  assertString(data.date, "date", file);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    throw new Error(
      `content/blog/${file}: "date" must be formatted YYYY-MM-DD, received "${data.date}".`,
    );
  }

  if (Number.isNaN(new Date(data.date).getTime())) {
    throw new Error(
      `content/blog/${file}: "date" is not a real calendar date ("${data.date}").`,
    );
  }

  if (
    !Array.isArray(data.tags) ||
    data.tags.length === 0 ||
    data.tags.some((tag: unknown) => typeof tag !== "string" || !tag.trim())
  ) {
    throw new Error(
      `content/blog/${file}: "tags" must be a non-empty array of strings.`,
    );
  }

  const minutes = readingTime(content).minutes;

  return {
    slug: file.replace(/\.mdx?$/, ""),
    title: data.title,
    description: data.description,
    date: data.date,
    tags: (data.tags as string[]).map((tag) => tag.trim()),
    readingTime: `${Math.max(1, Math.ceil(minutes))} min read`,
    draft: data.draft === true,
    content,
  };
}

/** Parsed once per process — the filesystem is read a single time per build. */
let cache: Post[] | null = null;

function allPosts(): Post[] {
  if (cache) return cache;

  if (!fs.existsSync(POSTS_DIR)) {
    cache = [];
    return cache;
  }

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(parseFile)
    .sort((a, b) => {
      const delta = b.date.localeCompare(a.date);
      return delta !== 0 ? delta : a.title.localeCompare(b.title);
    });

  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) {
      throw new Error(`Duplicate blog slug "${post.slug}" in content/blog.`);
    }
    seen.add(post.slug);
  }

  cache = posts;
  return cache;
}

function toMeta({ content: _content, ...meta }: Post): PostMeta {
  return meta;
}

/** Published posts, newest first. Drafts excluded. */
export function getAllPosts(): PostMeta[] {
  return allPosts()
    .filter((post) => !post.draft)
    .map(toMeta);
}

export function getPostSlugs(): string[] {
  return allPosts()
    .filter((post) => !post.draft)
    .map((post) => post.slug);
}

/** Returns drafts too, so an unpublished post can be previewed by URL. */
export function getPost(slug: string): Post | null {
  return allPosts().find((post) => post.slug === slug) ?? null;
}

/** Tags across published posts, most used first, then alphabetical. */
export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const key = tagSlug(tag);
      const entry = counts.get(key);
      if (entry) {
        entry.count += 1;
      } else {
        counts.set(key, { tag, count: 1 });
      }
    }
  }

  return [...counts.entries()]
    .map(([slug, { tag, count }]) => ({ tag, slug, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(slug: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => tagSlug(tag) === slug),
  );
}

export function getTagName(slug: string): string | null {
  return getAllTags().find((tag) => tag.slug === slug)?.tag ?? null;
}

/**
 * Neighbours in reverse-chronological order: `previous` is the older post,
 * `next` is the newer one.
 */
export function getAdjacentPosts(slug: string): {
  previous: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) return { previous: null, next: null };

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}
