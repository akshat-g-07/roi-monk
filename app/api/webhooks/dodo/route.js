import { paymentService } from "@/payment";
import { db } from "@/lib/db";
import { ANALYTICS_EVENT, trackEvent } from "@/lib/analytics";
import GetMailConfig from "@/lib/mail-config";

export const runtime = "nodejs"; // needs Node crypto + the raw request body
export const dynamic = "force-dynamic";

export async function POST(request) {
  const rawBody = await request.text(); // RAW body — required for signature check
  const headers = {
    "webhook-id": request.headers.get("webhook-id") ?? "",
    "webhook-signature": request.headers.get("webhook-signature") ?? "",
    "webhook-timestamp": request.headers.get("webhook-timestamp") ?? "",
  };

  let event;
  try {
    event = paymentService.verifyWebhook(rawBody, headers); // throws on bad signature
  } catch (error) {
    console.warn("Webhook signature failed", error?.message);
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    await handleEvent(event, headers["webhook-id"]);
  } catch (error) {
    console.error("Webhook processing failed", event?.type, error?.message);
    return Response.json({ error: "Processing failed" }, { status: 500 }); // → Dodo retries
  }
  return Response.json({ received: true }, { status: 200 });
}

async function alreadyProcessed(webhookId) {
  if (!webhookId) return false;
  const seen = await db.ProcessedWebhook.findUnique({ where: { webhookId } });
  return Boolean(seen);
}

// Correlate an event back to a user via our metadata first, then the stored
// subscription id, then the customer email — robust to out-of-order delivery.
async function resolveOwnerEmail(data) {
  const metaEmail = data?.metadata?.userEmail;
  if (metaEmail) return metaEmail;

  const subId = data?.subscription_id;
  if (subId) {
    const sub = await db.Subscription.findUnique({
      where: { providerSubscriptionId: subId },
    });
    if (sub) return sub.ownerEmail;
  }
  return data?.customer?.email ?? null;
}

async function handleEvent(event, webhookId) {
  if (await alreadyProcessed(webhookId)) return; // idempotent — no double effects

  const type = event?.type;
  const data = event?.data ?? {};
  const ownerEmail = await resolveOwnerEmail(data);
  const phone = data?.customer?.phone_number || null;
  const subId = data?.subscription_id || null;
  const periodEnd = data?.next_billing_date
    ? new Date(data.next_billing_date)
    : null;

  let sendWelcome = false;

  try {
    await db.$transaction(async (tx) => {
      if (type === "subscription.active") {
        if (ownerEmail) {
          const existing = await tx.Subscription.findUnique({
            where: { ownerEmail },
          });
          sendWelcome = !existing || existing.status !== "ACTIVE";
          await tx.Subscription.upsert({
            where: { ownerEmail },
            create: {
              ownerEmail,
              provider: "DODO",
              status: "ACTIVE",
              providerSubscriptionId: subId,
              currentPeriodEnd: periodEnd,
            },
            update: {
              status: "ACTIVE",
              ...(subId ? { providerSubscriptionId: subId } : {}),
              ...(periodEnd ? { currentPeriodEnd: periodEnd } : {}),
            },
          });
          await tx.User.updateMany({
            where: { email: ownerEmail },
            data: { subscribed: true, ...(phone ? { phone } : {}) },
          });
        }
      } else if (type === "subscription.renewed") {
        await tx.Subscription.updateMany({
          where: { ownerEmail },
          data: {
            status: "ACTIVE",
            ...(periodEnd ? { currentPeriodEnd: periodEnd } : {}),
          },
        });
        await tx.User.updateMany({
          where: { email: ownerEmail },
          data: { subscribed: true },
        });
      } else if (type === "subscription.on_hold") {
        await revoke(tx, ownerEmail, "PAST_DUE");
      } else if (type === "subscription.cancelled") {
        await revoke(tx, ownerEmail, "CANCELLED");
      } else if (type === "subscription.expired") {
        await revoke(tx, ownerEmail, "EXPIRED");
      } else if (type === "subscription.failed") {
        await revoke(tx, ownerEmail, "FAILED");
      } else if (type === "subscription.paused") {
        // Pausing revokes access immediately (Dodo freezes billing).
        await revoke(tx, ownerEmail, "PAUSED");
      } else if (type === "subscription.unpaused") {
        await tx.Subscription.updateMany({
          where: { ownerEmail },
          data: {
            status: "ACTIVE",
            ...(periodEnd ? { currentPeriodEnd: periodEnd } : {}),
          },
        });
        await tx.User.updateMany({
          where: { email: ownerEmail },
          data: { subscribed: true },
        });
      } else if (type === "payment.succeeded" && ownerEmail && phone) {
        // Capture the phone Dodo collected even if subscription.active is delayed.
        await tx.User.updateMany({
          where: { email: ownerEmail },
          data: { phone },
        });
      }

      // Record inside the same transaction so a duplicate can never double-apply.
      await tx.ProcessedWebhook.create({ data: { webhookId, type } });
    });
  } catch (error) {
    if (error?.code === "P2002") return; // concurrent duplicate already handled it
    throw error;
  }

  // Best-effort side effects AFTER the DB write — these must never throw.
  if (sendWelcome && ownerEmail) await sendWelcomeMail(ownerEmail);
  await notify(type, ownerEmail);
}

async function revoke(tx, ownerEmail, status) {
  if (!ownerEmail) return;
  await tx.Subscription.updateMany({ where: { ownerEmail }, data: { status } });
  await tx.User.updateMany({
    where: { email: ownerEmail },
    data: { subscribed: false },
  });
}

async function sendWelcomeMail(email) {
  try {
    const { name, transport } = GetMailConfig("akshat");
    await transport.sendMail({
      from: name,
      to: email,
      bcc: process.env.BCC_EMAIL,
      subject: "Welcome to ROI Monk",
      text: "Hi, I am Akshat Garg https://akshat-garg.com, creator of ROI Monk.\nThank you for joining ROI Monk. I am excited to have you on board.",
    });
  } catch (error) {
    console.warn("Welcome mail failed", error?.message);
  }
}

async function notify(type, ownerEmail) {
  const map = {
    "subscription.active": ANALYTICS_EVENT.SUBSCRIPTION_ACTIVE,
    "subscription.renewed": ANALYTICS_EVENT.SUBSCRIPTION_RENEWED,
    "subscription.on_hold": ANALYTICS_EVENT.SUBSCRIPTION_ON_HOLD,
    "subscription.cancelled": ANALYTICS_EVENT.SUBSCRIPTION_CANCELLED,
    "subscription.expired": ANALYTICS_EVENT.SUBSCRIPTION_EXPIRED,
    "subscription.failed": ANALYTICS_EVENT.PAYMENT_FAILED,
    "payment.succeeded": ANALYTICS_EVENT.PAYMENT_SUCCEEDED,
    "payment.failed": ANALYTICS_EVENT.PAYMENT_FAILED,
  };
  const evt = map[type];
  if (evt)
    await trackEvent(evt, { type }, { distinctId: ownerEmail || "server" });
}
