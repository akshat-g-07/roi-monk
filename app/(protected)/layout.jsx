import { getUserEmail } from "@/data/user";
import { GetPaymentStatus } from "@/actions/user";
import AppHeader from "@/components/common/app-header";
import SideNavBar from "@/components/common/side-navbar";
import { UserCurrencyProvider } from "@/contexts/user-currency";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const userEmail = await getUserEmail();

  if (!userEmail) redirect("/sign-in");

  const response = await GetPaymentStatus();

  if (!response.data) redirect("/");

  return (
    <UserCurrencyProvider>
      <main className="min-w-screen min-h-screen overflow-hidden bg-background dark text-foreground flex">
        <SideNavBar />
        <section className="flex flex-col h-screen grow w-full">
          <AppHeader />
          <div className="overflow-y-auto min-h-[calc(100vh-76.8px)] p-8">
            {children}
          </div>
        </section>
      </main>
    </UserCurrencyProvider>
  );
}
