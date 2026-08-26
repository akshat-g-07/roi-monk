import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserEmail, getUserName } from "@/data/user";
import { UserRegistration, GetPaymentStatus } from "@/actions/user";
import Payment from "./payment-component";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function Page() {
  await auth.protect();

  const email = await getUserEmail();
  if (!email) redirect("/sign-in");

  // Make sure the user row exists before we attach a subscription to it.
  await UserRegistration();

  const status = await GetPaymentStatus();
  if (status?.data) redirect("/dashboard");

  const name = await getUserName();

  return <Payment email={email} name={name} />;
}
