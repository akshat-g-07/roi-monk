import { getUserEmail } from "@/data/user";
import Payment from "./payment-component";
import { redirect } from "next/navigation";
import { GetPaymentStatus, UserRegistration } from "@/actions/user";

export default async function Page() {
  const userEmail = await getUserEmail();

  if (!userEmail) redirect("/sign-in");

  await UserRegistration();

  const status = await GetPaymentStatus();
  if (status.message) redirect("/sign-in");
  if (status.data) redirect("/dashboard");

  return (
    <>
      <div className="w-screen h-screen overflow-y-auto">
        <Payment />
      </div>
    </>
  );
}
