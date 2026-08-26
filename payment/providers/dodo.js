import "server-only";

import DodoPayments from "dodopayments";

// The ONLY file that touches the Dodo SDK. `server-only` guarantees the API key
// and webhook secret can never be bundled into client code.
let client;

function getClient() {
  if (client) return client;
  const bearerToken = process.env.DODO_PAYMENTS_API_KEY;
  if (!bearerToken) throw new Error("DODO_PAYMENTS_API_KEY is not set.");
  client = new DodoPayments({
    bearerToken,
    environment:
      process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
        ? "live_mode"
        : "test_mode",
    webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY,
  });
  return client;
}

export const dodoProvider = {
  key: "DODO",

  // Monthly subscription via the unified Checkout Sessions endpoint (the older
  // subscriptions.create is deprecated). The $9/mo price + interval live on the
  // product, so we only reference its id; Adaptive Currency localises it.
  // `require_phone_number` forces the buyer to supply a phone number to pay.
  async createSubscriptionCheckout({ customer, metadata, returnUrl }) {
    const productId = process.env.DODO_SUBSCRIPTION_PRODUCT_ID;
    if (!productId) throw new Error("DODO_SUBSCRIPTION_PRODUCT_ID is not set.");

    const session = await getClient().checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: {
        email: customer.email,
        name: customer.name || undefined,
        phone_number: customer.phone || undefined,
      },
      return_url: returnUrl,
      metadata, // { userEmail } — echoed back on every related webhook
      feature_flags: {
        allow_currency_selection: true,
        allow_phone_number_collection: true,
        require_phone_number: true, // phone is compulsory
      },
      customization: { theme: "dark", show_order_details: true },
    });

    return { sessionId: session.session_id, checkoutUrl: session.checkout_url };
  },

  // Reactivate an on_hold (past-due) subscription: the customer updates their
  // payment method on a hosted page, which also charges the outstanding dues.
  async reactivateSubscription({ subscriptionId, returnUrl }) {
    const res = await getClient().subscriptions.updatePaymentMethod(
      subscriptionId,
      {
        payment_method: { type: "new", return_url: returnUrl },
      },
    );
    return { paymentLink: res.payment_link, paymentId: res.payment_id };
  },

  // Standard Webhooks verification. Throws on a bad/failed signature.
  verifyWebhook(rawBody, headers) {
    return getClient().webhooks.unwrap(rawBody, { headers });
  },
};
