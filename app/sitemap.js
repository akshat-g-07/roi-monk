import { SITE_CONFIG } from "@/config/site";
import { EXAMPLE_PORTFOLIOS } from "@/data/example-portfolios";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: SITE_CONFIG.URL, changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${SITE_CONFIG.URL}/examples`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_CONFIG.URL}/refund-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_CONFIG.URL}/terms-and-conditions`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const exampleRoutes = EXAMPLE_PORTFOLIOS.map((portfolio) => ({
    url: `${SITE_CONFIG.URL}/examples/${portfolio.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...exampleRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
