import "server-only";

import { getPostHogClient } from "@/lib/posthog-server";

// Stable event names. Server-side events are for CONFIRMED money events and must
// not depend on the browser staying open.
export const ANALYTICS_EVENT = {
  PAYMENT_STARTED: "payment_started",
  SUBSCRIPTION_STARTED: "subscription_started",
  SUBSCRIPTION_ACTIVE: "subscription_active",
  SUBSCRIPTION_RENEWED: "subscription_renewed",
  SUBSCRIPTION_ON_HOLD: "subscription_on_hold",
  SUBSCRIPTION_CANCELLED: "subscription_cancelled",
  SUBSCRIPTION_EXPIRED: "subscription_expired",
  PAYMENT_SUCCEEDED: "payment_succeeded",
  PAYMENT_FAILED: "payment_failed",
};

// Best-effort: never throws, so a failed capture cannot break the caller.
export async function trackEvent(event, properties = {}, { distinctId } = {}) {
  try {
    const client = getPostHogClient();
    if (!client) return;
    client.capture({
      distinctId: distinctId || "server", // pass the auth user id to merge with client events
      event,
      properties: { source: "server", ...properties },
    });
    await client.flush();
  } catch (error) {
    console.warn("Analytics capture failed", event, error?.message);
  }
}
