// Provider-agnostic, normalized event names. Each provider maps its own event
// strings onto these so business code never depends on a specific gateway.
export const PAYMENT_EVENT = {
  // one-time
  SUCCEEDED: "payment.succeeded",
  FAILED: "payment.failed",
  CANCELLED: "payment.cancelled",
  // subscription lifecycle
  SUB_ACTIVE: "subscription.active",
  SUB_RENEWED: "subscription.renewed",
  SUB_ON_HOLD: "subscription.on_hold", // renewal failed / past due
  SUB_CANCELLED: "subscription.cancelled",
  SUB_EXPIRED: "subscription.expired",
  SUB_FAILED: "subscription.failed",
};

// Normalized subscription statuses stored on the Subscription row.
export const SUBSCRIPTION_STATUS = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  PAST_DUE: "PAST_DUE",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
  FAILED: "FAILED",
};
