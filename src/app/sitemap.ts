import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://resumeai-pro.vercel.app";
  const now = new Date();

  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/resume-builder", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/ats-checker", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/resume-analyzer", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/cover-letter", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/linkedin-generator", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/interview-prep", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/keyword-matcher", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/templates", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/career-roadmap", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/blog/how-to-beat-ats-systems-2024", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/blog/resume-keywords-guide", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/blog/cover-letter-mistakes-to-avoid", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/blog/linkedin-profile-optimization", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/blog/behavioral-interview-questions", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/blog/career-change-resume-guide", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return pages.map(p => ({
    url: `${base}${p.url}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
