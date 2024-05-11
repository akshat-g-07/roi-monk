"use client";

import { usePathname } from "next/navigation";
import OverviewHeader from "./OverviewHeader";
import FeedbackButton from "./FeedbackButton";
import SearchOption from "./SearchOption";

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header
      className="h-[76.8px] w-full py-2 px-6 border-b
    border-white text-3xl font-bold flex items-center justify-between"
    >
      <p className="size-fit">
        {pathname === "/dashboard" ? <OverviewHeader /> : "Something"}
      </p>
      <div className="flex items-center">
        <SearchOption />
        <FeedbackButton />
      </div>
    </header>
  );
}
