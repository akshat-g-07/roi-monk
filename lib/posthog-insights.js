import "server-only";

// Optional server-only metric reads via PostHog's HogQL Query API. Cached, with a
// timeout, and degrades to null so a dashboard shows "—" instead of breaking.
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const API_HOST = (
  process.env.POSTHOG_API_HOST || "https://us.posthog.com"
).replace(/\/+$/, "");

let cache = { at: 0, value: null };

export async function getPageviews() {
  if (!(PROJECT_ID && KEY)) return null;
  if (cache.value !== null && Date.now() - cache.at < 60_000)
    return cache.value;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(`${API_HOST}/api/projects/${PROJECT_ID}/query/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query: `SELECT count() FROM events WHERE event = '$pageview'`,
        },
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn("PostHog query failed", res.status);
      return null;
    }
    const json = await res.json();
    const value = Number(json?.results?.[0]?.[0] ?? 0);
    cache = { at: Date.now(), value };
    return value;
  } catch (error) {
    console.warn("PostHog query error", error?.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}
