"use client";

import { usePathname } from "next/navigation";
import FeedbackButton from "@/components/common/feedback-button";
import SearchOption from "@/components/common/search-option";
import PortfolioHeader from "@/components/portfolio/portfolio-header";

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header
      className="h-[76.8px] w-full py-2 px-6 border-b
    border-white text-3xl font-bold flex items-center justify-between"
    >
      <div className="size-fit">
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
          "Something"
        )}
      </div>
      <div className="flex items-center">
        <SearchOption />
        <FeedbackButton />
      </div>
    </header>
  );
}
