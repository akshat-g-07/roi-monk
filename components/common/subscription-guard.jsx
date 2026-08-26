"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/hooks/useServerAction";
import { GetSubscriptionState } from "@/actions/payment";
import Loading from "./loading";

// Statuses where the user had a subscription that lapsed — route them to pay.
const LAPSED = ["PAST_DUE", "CANCELLED", "EXPIRED", "FAILED"];

export default function SubscriptionGuard({ children }) {
  const router = useRouter();
  const { isLoading, data } = useServerAction(GetSubscriptionState);

  useEffect(() => {
    if (isLoading) return;
    if (data?.subscribed) return;
    router.replace(data && LAPSED.includes(data.status) ? "/billing" : "/");
  }, [data, isLoading, router]);

  if (isLoading) {
    return <Loading className={"min-h-screen"} />;
  }

  return data?.subscribed ? children : null;
}
