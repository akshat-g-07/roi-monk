"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { CreateSubscriptionCheckout } from "@/actions/payment";
import { GetPaymentStatus } from "@/actions/user";
import { dodoClientMode, isValidPhone } from "@/payment/payment-utils";

let dodoInitialized = false; // the overlay checkout SDK is a global singleton

export default function Payment({ email, name }) {
  const router = useRouter();
  const sdkRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [error, setError] = useState("");

  // The webhook is the source of truth; poll until the user is marked subscribed.
  const finalize = useCallback(async () => {
    setFinalizing(true);
    for (let i = 0; i < 15; i++) {
      const status = await GetPaymentStatus();
      if (status?.data) {
        router.push("/dashboard");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    // No confirmation yet — don't bounce the user; let them retry / refresh.
    setFinalizing(false);
    setError(
      "We haven't received your payment confirmation yet. If you completed checkout, your subscription will activate shortly — please refresh this page.",
    );
  }, [router]);

  useEffect(() => {
    let active = true;
    import("dodopayments-checkout").then((mod) => {
      if (!active) return;
      sdkRef.current = mod.DodoPayments;
      if (dodoInitialized) return;
      mod.DodoPayments.Initialize({
        mode: dodoClientMode(),
        displayType: "overlay",
        onEvent: (e) => {
          if (
            ["checkout.closed", "checkout.redirect"].includes(e?.event_type)
          ) {
            mod.DodoPayments.Checkout.close?.();
            setLoading(false);
            finalize();
          }
        },
      });
      dodoInitialized = true;
    });
    return () => {
      active = false;
    };
  }, [finalize]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading || finalizing) return;
    if (!isValidPhone(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await CreateSubscriptionCheckout(phone);
    if (!res?.ok) {
      setLoading(false);
      setError(res?.message || "Something went wrong. Please try again.");
      return;
    }
    sdkRef.current?.Checkout.open({ checkoutUrl: res.checkoutUrl });
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
          <p className="text-lg font-semibold ml-5 text-neutral-300">
            Subscribe to ROI Monk
          </p>
          <p className="text-4xl font-bold ml-5 my-3">
            $9
            <span className="text-base text-white/75 font-normal"> /month</span>
          </p>

          <p className="ml-5 text-neutral-400">
            Start tracking your ROI right!
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-fit lg:h-full overflow-y-scroll py-10 px-6 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-neutral-900 text-2xl font-bold">
            Complete your subscription
          </h2>
          <p className="text-neutral-500 mt-2 text-sm">
            Enter your phone number to continue to secure checkout.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-neutral-700 text-sm font-medium"
            >
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
              placeholder="+1 555 123 4567"
              disabled={loading || finalizing}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 disabled:opacity-60"
            />
            {error ? <p className="text-red-600 text-sm">{error}</p> : null}

            <Button
              type="submit"
              disabled={loading || finalizing}
              className="mt-4 w-full bg-neutral-900 text-white hover:bg-neutral-800"
            >
              {loading
                ? "Opening checkout…"
                : finalizing
                  ? "Finalizing your subscription…"
                  : "Subscribe · $9/month"}
            </Button>

            <p className="text-neutral-400 text-xs mt-3 text-center">
              Secured by Dodo Payments. Cancel anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
