"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/hooks/useServerAction";
import { GetPaymentStatus } from "@/actions/user";
import Loading from "./loading";

export default function SubscriptionGuard({ children }) {
  const router = useRouter();
  const { isLoading, data } = useServerAction(GetPaymentStatus);

  useEffect(() => {
    if (!isLoading && !data) {
      router.replace("/");
    }
  }, [data, isLoading, router]);

  if (isLoading) {
    return <Loading className={"min-h-screen"} />;
  }

  return data ? children : null;
}
