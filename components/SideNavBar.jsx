"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

export default function SideNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className={`${
          open ? "w-[230px]" : "w-[70px]"
        } min-h-full border-r-4 flex flex-col items-center duration-300 ease-in-out`}
      >
        {/* 
        Top Left Logo Icon 
         */}
        <a href="/dashboard" className="flex items-center w-full">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Logo"
            className="py-2 px-px mx-2 border-b w-auto border-white cursor-pointer"
          />

          <span
            className={`px-2 mx-auto h-full items-center ${
              open ? "inline-flex" : "hidden"
            } text-nowrap text-3xl font-bold border-b border-white`}
          >
            ROI Monk
          </span>
        </a>

        {/* 
        Toggle Button
         */}
        <div
          className={`size-fit ${
            open ? "translate-x-28" : "translate-x-10"
          } -translate-y-[0.9rem] cursor-pointer flex items-center justify-center rounded-md border border-white bg-foreground hover:bg-muted-foreground duration-300 ease-in-out`}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          {open ? (
            <ChevronLeftIcon className="size-7 text-black" />
          ) : (
            <ChevronRightIcon className="size-7 text-black" />
          )}
        </div>
      </nav>
    </>
  );
}
