"use server";

import { auth } from "@clerk/nextjs/server";
import { getUserEmail, getUserName } from "@/data/user";
import { db } from "@/lib/db";
import { paymentService, SUBSCRIPTION_STATUS } from "@/payment";
import { isValidPhone } from "@/payment/payment-utils";
import { ANALYTICS_EVENT, trackEvent } from "@/lib/analytics";
import { SITE_CONFIG } from "@/config/site";

function appUrl() {
  const base = SITE_CONFIG.URL || "http://localhost:3000";
  return base.replace(/\/$/, "");
}

// Starts a monthly subscription checkout. Writes a PENDING subscription + the
// (compulsory) phone number to our DB, then asks Dodo for a hosted checkout URL.
// It never marks the user subscribed — that is the webhook's job.
export async function CreateSubscriptionCheckout(phone) {
  await auth.protect();

  const email = await getUserEmail();
  const name = await getUserName();
  if (!email) return { ok: false, message: "Not signed in" };

  const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
  if (!isValidPhone(trimmedPhone)) {
    return { ok: false, message: "Please enter a valid phone number." };
  }

  try {
    // Ensure the user row exists and persist the phone number immediately.
    await db.User.upsert({
      where: { email },
      create: { email, name, phone: trimmedPhone },
      update: { phone: trimmedPhone },
    });

    // Record/refresh a PENDING subscription for this user.
    await db.Subscription.upsert({
      where: { ownerEmail: email },
      create: {
        ownerEmail: email,
        provider: "DODO",
        status: SUBSCRIPTION_STATUS.PENDING,
      },
      update: { status: SUBSCRIPTION_STATUS.PENDING },
    });

    const { checkoutUrl } = await paymentService.createSubscriptionCheckout({
      customer: { email, name, phone: trimmedPhone },
      returnUrl: `${appUrl()}/dashboard?status=processing`,
      metadata: { userEmail: email }, // echoed back on the webhook
    });

    await trackEvent(
      ANALYTICS_EVENT.SUBSCRIPTION_STARTED,
      { provider: "dodo" },
      { distinctId: email },
    );

    return { ok: true, checkoutUrl };
  } catch (error) {
    console.error("CreateSubscriptionCheckout failed", error?.message);
    return {
      ok: false,
      message: "Could not start checkout. Please try again.",
    };
  }
}

// Read the current user's subscription state for gating and the billing page.
export async function GetSubscriptionState() {
  await auth.protect();
  const email = await getUserEmail();
  try {
    const user = await db.User.findUnique({
      where: { email },
      include: { subscription: true },
    });
    return {
      data: {
        subscribed: Boolean(user?.subscribed),
        status: user?.subscription?.status ?? null,
      },
    };
  } catch (error) {
    console.error("GetSubscriptionState failed", error?.message);
    return { message: "error" };
  }
}

// Recover an on_hold subscription: returns a Dodo hosted link where the customer
// updates their payment method, which also settles the outstanding dues.
export async function ReactivateSubscription() {
  await auth.protect();
  const email = await getUserEmail();
  if (!email) return { ok: false, message: "Not signed in" };

  try {
    const sub = await db.Subscription.findUnique({
      where: { ownerEmail: email },
    });
    if (!sub?.providerSubscriptionId)
      return { ok: false, message: "no_subscription" };

    const { paymentLink } = await paymentService.reactivateSubscription({
      subscriptionId: sub.providerSubscriptionId,
      returnUrl: `${appUrl()}/billing?status=processing`,
    });
    if (!paymentLink) {
      return {
        ok: false,
        message: "Could not create a payment link. Please try again.",
      };
    }
    return { ok: true, paymentLink };
  } catch (error) {
    console.error("ReactivateSubscription failed", error?.message);
    return {
      ok: false,
      message: "Could not start the payment update. Please try again.",
    };
  }
}
