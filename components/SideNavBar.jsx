"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

        {/* 
        New Investment Button
         */}
        <div className="flex items-center w-fit bg-accent hover:bg-primary-foreground dark justify-evenly rounded-full cursor-pointer">
          <PlusIcon className="size-6 m-2" />
          <span
            className={`${open ? "inline-flex" : "hidden"} mx-5 text-nowrap`}
          >
            New Investment
          </span>
        </div>

        <div
          className={`m-4 ${
            open ? "px-24" : "px-4"
          } border-b border-white duration-300 ease-in-out`}
        />

        {/* 
        Recent Investments Sections
         */}

        <div className="w-full">
          <span
            className={`${open ? "inline-flex" : "hidden"} mx-5 text-nowrap`}
          >
            Recents:
          </span>
          {/* 
          MARK: Todo-> Investment List of user coming from DB
            */}
          <div
            className={`${open ? "mt-1" : "mt-7"} flex flex-col items-center`}
          >
            {[...new Array(5)].map((_item, index) => {
              return (
                <div
                  key={index}
                  className={`flex items-center ${
                    open ? "justify-start" : "justify-evenly"
                  } w-full group cursor-pointer my-px`}
                >
                  <Avatar className={`m-2 ${open && "ml-3"}`}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span
                    className={`${
                      open ? "inline-flex" : "hidden"
                    } mx-2 text-nowrap text-sm peer truncate`}
                  >
                    Lorem ipsum dolor sit amet.
                  </span>
                  {open && (
                    <span className="group-hover:inline-flex hidden size-fit">
                      <Pencil1Icon className="size-5 mr-1 text-muted-foreground hover:text-foreground" />
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <TrashIcon className="size-5 ml-1 text-destructive hover:text-red-500" />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="dark">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-foreground">
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {/* 
                              MARK: Change this too!
                               */}
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className={"text-white"}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className={buttonVariants({
                                variant: "destructive",
                              })}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
