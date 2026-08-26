import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserEmail } from "@/data/user";
import { GetSubscriptionState } from "@/actions/payment";
import Billing from "./billing-component";

export const metadata = {
  robots: { index: false, follow: false },
};

const LAPSED = ["PAST_DUE", "CANCELLED", "EXPIRED", "FAILED"];

export default async function Page() {
  await auth.protect();

  const email = await getUserEmail();
  if (!email) redirect("/sign-in");

  const state = await GetSubscriptionState();
  const data = state?.data;

  if (data?.subscribed) redirect("/dashboard");
  // Never subscribed (or still pending) → send them to the subscribe page.
  if (!data || !LAPSED.includes(data.status)) redirect("/payment");

  return <Billing status={data.status} />;
}
