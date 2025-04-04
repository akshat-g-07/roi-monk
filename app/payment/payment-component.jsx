"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { UpdateSubscription } from "@/actions/user";

export default function Payment() {
  const router = useRouter();
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_PLAN_ID = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID;

  const initialOptions = {
    clientId: PAYPAL_CLIENT_ID,
    vault: true,
    intent: "subscription",
  };

  const createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: PAYPAL_PLAN_ID,
    });
  };

  const onApprove = async (data) => {
    await UpdateSubscription();
    alert(`You have been subscribed to ROI Monk!`);
    router.push("/dashboard");
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
      <div className="w-full lg:w-1/2 h-fit lg:h-full overflow-y-scroll py-10 flex justify-center bg-white">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            createSubscription={createSubscription}
            onApprove={onApprove}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
