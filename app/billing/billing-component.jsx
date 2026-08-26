"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { ReactivateSubscription } from "@/actions/payment";
import { GetPaymentStatus } from "@/actions/user";

// Copy per lapsed status. PAST_DUE is recoverable in place (update payment
// method); the terminal states send the user back to a fresh subscription.
const COPY = {
  PAST_DUE: {
    tag: "Payment failed",
    heading: "Your renewal didn't go through",
    blurb:
      "Your monthly payment for ROI Monk failed, so your access is paused. Update your payment method to clear the outstanding amount and restore access right away.",
    cta: "Update payment method & pay",
    rightTitle: "Restore your access",
    rightBlurb:
      "You'll be taken to our secure checkout to update your payment method.",
  },
  CANCELLED: {
    tag: "Subscription ended",
    heading: "Your subscription was cancelled",
    blurb:
      "Your ROI Monk subscription is no longer active. Re-subscribe to pick up right where you left off.",
    cta: "Re-subscribe · $9/month",
    rightTitle: "Continue with ROI Monk",
    rightBlurb: "You'll be taken back to the subscription page.",
  },
  EXPIRED: {
    tag: "Subscription ended",
    heading: "Your subscription has expired",
    blurb:
      "Your ROI Monk subscription reached the end of its term. Subscribe again to keep tracking your ROI.",
    cta: "Subscribe · $9/month",
    rightTitle: "Continue with ROI Monk",
    rightBlurb: "You'll be taken back to the subscription page.",
  },
  FAILED: {
    tag: "Setup failed",
    heading: "We couldn't set up your subscription",
    blurb:
      "Your subscription couldn't be created with the payment method you used. Start again with a working payment method to get access.",
    cta: "Try again · $9/month",
    rightTitle: "Continue with ROI Monk",
    rightBlurb: "You'll be taken back to the subscription page.",
  },
};

export default function Billing({ status }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [error, setError] = useState("");

  const isPastDue = status === "PAST_DUE";
  const copy = COPY[status] ?? COPY.CANCELLED;

  // If Dodo redirected back after a payment-method update, poll until the
  // webhook marks the user subscribed, then send them into the app.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const processing =
      new URLSearchParams(window.location.search).get("status") ===
      "processing";
    if (!processing) return;

    let cancelled = false;
    (async () => {
      setFinalizing(true);
      for (let i = 0; i < 15; i++) {
        const s = await GetPaymentStatus();
        if (cancelled) return;
        if (s?.data) {
          router.replace("/dashboard");
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (!cancelled) {
        setFinalizing(false);
        setError(
          "We haven't received your payment confirmation yet. If you completed payment, your access will restore shortly — please refresh this page.",
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleClick = async () => {
    if (loading || finalizing) return;
    // Terminal states can't be reactivated — start a fresh subscription.
    if (!isPastDue) {
      router.push("/payment");
      return;
    }
    setLoading(true);
    setError("");
    const res = await ReactivateSubscription();
    if (!res?.ok) {
      setLoading(false);
      if (res?.message === "no_subscription") {
        router.push("/payment");
        return;
      }
      setError(res?.message || "Something went wrong. Please try again.");
      return;
    }
    window.location.href = res.paymentLink; // Dodo hosted payment page
  };

  return (
    <div className="bg-stone-700 text-white h-screen w-screen lg:flex overflow-y-scroll">
      <div className="w-full lg:w-1/2 h-fit lg:h-full p-20 cursor-default">
        <div className="w-full items-center flex">
          <Button
            onClick={() => {
              router.push("/");
            }}
            variant="ghost"
            className="rounded-full"
          >
            <ChevronLeftIcon size={15} />
          </Button>
          <p className="text-xl font-bold ml-5">ROI Monk</p>
        </div>
        <div className="w-full mt-10 flex flex-col">
          <p className="text-lg font-semibold ml-5 text-amber-300">
            {copy.tag}
          </p>
          <p className="text-4xl font-bold ml-5 my-3">{copy.heading}</p>
          <p className="ml-5 text-neutral-400 max-w-md">{copy.blurb}</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-fit lg:h-full overflow-y-scroll py-10 px-6 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-neutral-900 text-2xl font-bold">
            {copy.rightTitle}
          </h2>
          <p className="text-neutral-500 mt-2 text-sm">{copy.rightBlurb}</p>

          {error ? <p className="text-red-600 text-sm mt-4">{error}</p> : null}

          <Button
            onClick={handleClick}
            disabled={loading || finalizing}
            className="mt-8 w-full bg-neutral-900 text-white hover:bg-neutral-800"
          >
            {finalizing
              ? "Confirming your payment…"
              : loading
                ? "Opening…"
                : copy.cta}
          </Button>

          <p className="text-neutral-400 text-xs mt-3 text-center">
            Secured by Dodo Payments.
          </p>
        </div>
      </div>
    </div>
  );
}
