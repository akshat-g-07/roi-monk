import posthog from "posthog-js";

// Next.js runs this file automatically on the client. PostHog is initialised
// through a reverse proxy (/ingest, see next.config.mjs) so ad-blockers don't
// silently drop events.
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (process.env.NODE_ENV === "development") {
  if (!token) {
    console.error(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
    );
  }
  if (!host) {
    console.error(
      "NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured",
    );
  }
}

if (token) {
  posthog.init(token, {
    api_host: "/ingest", // reverse proxy configured in next.config.mjs
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30", // pins autocapture / pageview defaults
    capture_exceptions: true, // error tracking
    debug: process.env.NODE_ENV === "development",
  });
}
