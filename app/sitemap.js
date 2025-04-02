import { SITE_CONFIG } from "@/config/site";

export default function sitemap() {
  return [
    {
      url: SITE_CONFIG.URL,
      lastModified: new Date(),
      priority: 1.0,
    },
  ];
}
