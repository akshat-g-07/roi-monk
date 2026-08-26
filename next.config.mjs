/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["components"],
  allowedDevOrigins: ["192.168.0.4"],
  // Keep the server-only Dodo SDK out of the client bundle.
  serverExternalPackages: ["dodopayments"],
  // Required for PostHog's trailing-slash ingestion calls.
  skipTrailingSlashRedirect: true,
  // Reverse-proxy PostHog through /ingest so ad-blockers don't drop events.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
