import { auth } from "@clerk/nextjs/server";
import AppHeader from "@/components/common/app-header";
import SideNavBar from "@/components/common/side-navbar";
import SubscriptionGuard from "@/components/common/subscription-guard";
import SignedOutRedirect from "@/components/common/signed-out-redirect";
import { UserCurrencyProvider } from "@/contexts/user-currency";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }) {
  await auth.protect();

  return (
    <SignedOutRedirect>
      <SubscriptionGuard>
        <UserCurrencyProvider>
          <main className="min-w-screen lg:min-h-screen max-lg:h-svh overflow-hidden bg-background dark text-foreground flex w-full">
            <SideNavBar />
            <section className="flex flex-col h-screen max-lg:h-svh grow w-full">
              <AppHeader />
              <div className="flex-1 overflow-y-auto p-8">{children}</div>
            </section>
          </main>
        </UserCurrencyProvider>
      </SubscriptionGuard>
    </SignedOutRedirect>
  );
}
