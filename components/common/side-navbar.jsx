"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
import { GetRecentPortfolios } from "@/actions/portfolio";
import NewPortfolioDialogContent from "./new-portfolio-dialog-content";

export default function SideNavBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [recentPortfolios, setRecentPortfolios] = useState([]);

  async function RecentPortfolios() {
    let response = await GetRecentPortfolios();
    if (response.data) setRecentPortfolios(response.data);
  }

  useEffect(() => {
    RecentPortfolios();
  }, []);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  return (
    <>
      <nav
        className={`${
          open ? "w-[230px]" : "w-[70px]"
        } h-screen border-r-4 flex flex-col items-center duration-300 ease-in-out relative`}
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

        {/* 
        New Portfolio Button
         */}

        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogTrigger>
            <div className="flex items-center w-fit bg-accent hover:bg-primary-foreground dark justify-evenly rounded-full cursor-pointer">
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

        {recentPortfolios.length > 0 && (
          <>
            <div className="w-full">
              <span
                className={`${
                  open ? "inline-flex" : "hidden"
                } mx-5 text-nowrap`}
              >
                Recents:
              </span>
              <div
                className={`${
                  open ? "mt-1" : "mt-7"
                } flex flex-col items-center`}
              >
                {recentPortfolios.map((portfolio, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-center ${
                        open ? "justify-start" : "justify-evenly"
                      } w-full group cursor-pointer my-px hover:bg-accent`}
                      onClick={() => {
                        router.push(`/portfolio/${portfolio.portfolioName}`);
                        setOpen(false);
                      }}
                    >
                      <Avatar className={`m-2 ${open && "ml-3"}`}>
                        <AvatarFallback>
                          {portfolio.portfolioName.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        style={{
                          display: open ? "inline-flex" : "none",
                          margin: "0 0.5rem",
                          whiteSpace: "nowrap",
                          fontSize: "0.875rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "white",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        {portfolio.portfolioName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`m-4 ${
                open ? "px-24" : "px-4"
              } border-b border-white duration-300 ease-in-out`}
            />
          </>
        )}

        {/* 
        Support and other buttons
         */}

        <div className="absolute bottom-5 w-full flex flex-col items-center">
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
