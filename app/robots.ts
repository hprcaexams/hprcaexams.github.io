import type { MetadataRoute } from "next";

const siteUrl =
  "https://hprca-joa-it-preparation.rahulllthaaakur.chatgpt.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
