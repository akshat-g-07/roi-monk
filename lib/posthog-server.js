import { PostHog } from "posthog-node";

// Server-side PostHog singleton. Returns null (clean no-op) when unconfigured so
// analytics can never break a payment, auth, or DB operation.
let posthogClient = null;

export function getPostHogClient() {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (process.env.NODE_ENV === "development" && !token) {
    console.error(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
    );
  }

  if (!token) return null;

  if (!posthogClient) {
    // flushAt/flushInterval force eager delivery — serverless functions can
    // freeze right after responding, so we flush explicitly after each capture.
    posthogClient = new PostHog(token, { host, flushAt: 1, flushInterval: 0 });
  }
  return posthogClient;
}
