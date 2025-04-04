import AppHeader from "@/components/common/app-header";
import SideNavBar from "@/components/common/side-navbar";
import SubscriptionGuard from "@/components/common/subscription-guard";
import { UserCurrencyProvider } from "@/contexts/user-currency";

export default async function DashboardLayout({ children }) {
  return (
    <SubscriptionGuard>
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
    </SubscriptionGuard>
  );
}
