import { dodoProvider } from "@/payment/providers/dodo";

const DEFAULT_PROVIDER = "DODO";
const PROVIDERS = { [dodoProvider.key]: dodoProvider };

function getProvider(key = DEFAULT_PROVIDER) {
  const provider = PROVIDERS[key];
  if (!provider) throw new Error(`Unknown payment provider: ${key}`);
  return provider;
}

// Business code talks to this facade only — never to a gateway SDK directly.
// Swapping/adding a provider is a drop-in on the registry above.
export const paymentService = {
  createSubscriptionCheckout(args, key = DEFAULT_PROVIDER) {
    return getProvider(key).createSubscriptionCheckout(args);
  },
  reactivateSubscription(args, key = DEFAULT_PROVIDER) {
    return getProvider(key).reactivateSubscription(args);
  },
  verifyWebhook(rawBody, headers, key = DEFAULT_PROVIDER) {
    return getProvider(key).verifyWebhook(rawBody, headers);
  },
};
