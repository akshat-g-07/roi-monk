import DashboardHeader from "@/components/DashboardHeader";
import NavBarToggler from "@/components/NavBarToggler";
import Image from "next/image";

export default function DashboardLayout({ children }) {
  return (
    <main className="min-w-screen min-h-screen overflow-hidden bg-background dark text-foreground flex">
      <nav className="w-[70px] min-h-full border-r-4 flex flex-col items-center duration-500 ease-in-out overflow-hidden">
        <a href="/dashboard" className="flex items-center w-full">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Logo"
            className="py-2 px-px mx-2 border-b w-auto border-white cursor-pointer"
          />
          <span className="px-2 mx-auto h-full items-center inline-flex text-nowrap text-3xl font-bold border-b border-white">
            ROI Monk
          </span>
        </a>

        <NavBarToggler />
      </nav>
      <section className="flex-auto min-h-full">
        <DashboardHeader />
        {children}
      </section>
    </main>
  );
}
