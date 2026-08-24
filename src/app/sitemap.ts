import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { projects } from "@/lib/data/projects";
import { navItems, siteConfig } from "@/lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

const origin = siteConfig.url.replace(/\/+$/, "");

const url = (path: string) => `${origin}${path}`;

/** How often each top-level route is expected to change, keyed by href. */
const sectionFrequency: Record<string, SitemapEntry["changeFrequency"]> = {
  "/about": "monthly",
  "/projects": "monthly",
  "/skills": "monthly",
  "/experience": "monthly",
  "/blog": "weekly",
  "/contact": "yearly",
};

const sectionPriority: Record<string, number> = {
  "/about": 0.8,
  "/projects": 0.9,
  "/skills": 0.7,
  "/experience": 0.7,
  "/blog": 0.8,
  "/contact": 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();
  const now = new Date();

  /** Newest post date — used as the freshness signal for the blog index. */
  const blogUpdated = posts.length > 0 ? new Date(posts[0].date) : now;

  const home: SitemapEntry = {
    url: url("/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  const sections: SitemapEntry[] = navItems.map((item) => ({
    url: url(item.href),
    lastModified: item.href === "/blog" ? blogUpdated : now,
    changeFrequency: sectionFrequency[item.href] ?? "monthly",
    priority: sectionPriority[item.href] ?? 0.7,
  }));

  const projectRoutes: SitemapEntry[] = projects.map((project) => ({
    url: url(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: project.featured ? 0.8 : 0.7,
  }));

  const postRoutes: SitemapEntry[] = posts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const tagRoutes: SitemapEntry[] = tags.map((tag) => ({
    url: url(`/blog/tag/${tag.slug}`),
    lastModified: blogUpdated,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [home, ...sections, ...projectRoutes, ...postRoutes, ...tagRoutes];
}
