import type { MetadataRoute } from "next";

const siteUrl =
  "https://hprca-joa-it-preparation.rahulllthaaakur.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-07-30"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
