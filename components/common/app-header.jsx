"use client";

import { usePathname } from "next/navigation";
import FeedbackButton from "@/components/common/feedback-button";
import SearchOption from "@/components/common/search-option";
import PortfolioHeader from "@/components/portfolio/portfolio-header";

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header
      className="mt-2 md:mt-0 md:h-[76.8px] h-fit w-full py-2 px-6 border-b
    border-white text-3xl font-bold flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
    >
      <div className="size-fit text-nowrap">
        {pathname === "/dashboard" ? (
          "Overview"
        ) : pathname.includes("/create-new/") ? (
          "Create New"
        ) : pathname.includes("/portfolio/") ? (
          <>
            <PortfolioHeader
              portfolioName={pathname.slice(pathname.lastIndexOf("/") + 1)}
            />
          </>
        ) : pathname === "/support" ? (
          "Support"
        ) : pathname === "/feedback" ? (
          "Feedback"
        ) : (
          pathname === "/settings" && "Settings"
        )}
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center h-fit w-full justify-center lg:justify-end">
        <SearchOption />
        <FeedbackButton />
      </div>
    </header>
  );
}
