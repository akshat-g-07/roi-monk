import DashboardHeader from "@/components/DashboardHeader";
import SideNavBar from "@/components/SideNavBar";

export default function DashboardLayout({ children }) {
  return (
    <main className="min-w-screen min-h-screen overflow-hidden bg-background dark text-foreground flex">
      <SideNavBar />
      <section className="flex-auto min-h-full">
        <DashboardHeader />
        {children}
      </section>
    </main>
  );
}
