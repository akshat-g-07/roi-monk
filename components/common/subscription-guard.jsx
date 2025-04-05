"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/hooks/useServerAction";
import { GetPaymentStatus } from "@/actions/user";
import { useUserType } from "@/contexts/user-type";
import Loading from "./loading";

export default function SubscriptionGuard({ children }) {
  const router = useRouter();
  const userType = useUserType();
  const { isLoading, data } = useServerAction(GetPaymentStatus);

  useEffect(() => {
    if (!isLoading && !data && userType) {
      router.replace("/");
    }
  }, [data, isLoading, router, userType]);

  if (isLoading) {
    return <Loading className={"min-h-screen"} />;
  }

  return data || !userType ? children : null;
}
