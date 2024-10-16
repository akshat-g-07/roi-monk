"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowTopRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import NewPortfolioDialogContent from "./new-portfolio-dialog-content";
import RecentPortfolios from "./recent-portfolios";

export default function SideNavBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  return (
    <>
      <nav
        className={`${
          open ? "w-[230px]" : "w-[70px]"
        } h-screen border-r-4 flex flex-col items-center justify-between duration-300 ease-in-out relative`}
      >
        <div className="w-full flex flex-col items-center">
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

          {/* 
        New Portfolio Button
         */}

          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogTrigger>
              <div className="flex items-center w-fit h-fit bg-accent hover:bg-primary-foreground dark justify-evenly rounded-full cursor-pointer">
                <PlusIcon className="size-6 m-2" />
                <span
                  className={`${
                    open ? "inline-flex" : "hidden"
                  } mx-5 text-nowrap`}
                >
                  New Portfolio
                </span>
              </div>
            </AlertDialogTrigger>
            <NewPortfolioDialogContent handleDialogClose={handleDialogClose} />
          </AlertDialog>

          <div
            className={`m-4 ${
              open ? "px-24" : "px-4"
            } border-b border-white duration-300 ease-in-out`}
          />

          {/* 
        Recent Investments Sections
         */}
          <RecentPortfolios open={open} handleDialogClose={handleDialogClose} />
        </div>
        {/* 
        Support and other buttons
         */}

        <div className="w-full pb-5 flex flex-col items-center">
          <div
            className={`flex items-center hover:bg-accent dark justify-start rounded-full cursor-pointer p-2 ${
              open ? "w-[92.5%] pl-3" : "w-fit"
            }`}
            onClick={() => {
              router.push("/support");
              setOpen(false);
            }}
          >
            <SupportAgentIcon sx={{ fontSize: 25 }} />
            <span
              className={`${open ? "inline-flex" : "hidden"} ml-5 text-nowrap`}
            >
              Support
            </span>
          </div>
          <div
            className={`flex items-center hover:bg-accent dark justify-start rounded-full cursor-pointer p-2 ${
              open ? "w-[92.5%] pl-3" : "w-fit"
            }`}
          >
            <SettingsIcon sx={{ fontSize: 25 }} />
            <span
              className={`${open ? "inline-flex" : "hidden"} mx-5 text-nowrap`}
            >
              Settings
            </span>
          </div>
          <SignOutButton redirectUrl="/">
            <div
              className={`flex items-center hover:bg-accent dark justify-start rounded-full cursor-pointer p-2 ${
                open ? "w-[92.5%] pl-4" : "w-fit pl-3"
              }`}
            >
              <LogoutIcon sx={{ fontSize: 25 }} />
              <span
                className={`${
                  open ? "inline-flex" : "hidden"
                } mx-4 text-nowrap`}
              >
                Logout
              </span>
            </div>
          </SignOutButton>

          {/* 
        Developer's Corner
         */}
          <div
            className={`flex items-center  ${
              open ? "w-[95%]" : "w-fit"
            } bg-accent mt-3 hover:bg-primary-foreground dark justify-evenly rounded-full cursor-pointer`}
            onClick={() => {
              window.open("https://akshat-garg.com");
            }}
          >
            <Avatar className={`m-2 size-7`}>
              <AvatarImage src="/akshat-garg.png" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <span className={`${open ? "inline-flex" : "hidden"} text-nowrap`}>
              Developer&apos;s Corner <ArrowTopRightIcon className="size-3" />
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
