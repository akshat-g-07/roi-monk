"use client";

import { usePathname } from "next/navigation";
import FeedbackButton from "@/components/common/feedback-button";
import SearchOption from "@/components/common/search-option";
import PortfolioHeader from "@/components/portfolio/portfolio-header";

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header
      className="md:h-[76.8px] h-fit w-full py-2 px-6 border-b
    border-white text-3xl font-bold flex md:items-center justify-between items-baseline"
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
      <div className="flex md:items-center size-fit items-end justify-center md:flex-wrap flex-wrap-reverse">
        <SearchOption />
        <FeedbackButton />
      </div>
    </header>
  );
}
