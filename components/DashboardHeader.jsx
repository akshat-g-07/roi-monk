"use client";

import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header>{pathname === "/dashboard" ? "Dashboard" : "Something"}</header>
  );
}
