import Image from "next/image";
import { useUserType } from "@/contexts/user-type";
import { cn } from "@/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export default function Footer() {
  const userType = useUserType();

  return (
    <footer className="w-full h-fit border-y border-grid px-8 sm:px-6 md:px-12 py-5 text-muted-foreground justify-center">
      <a href="/" className="flex items-center w-fit">
        <Image
          src="/logo.png"
          width={20}
          height={20}
          alt="Logo"
          className="py-2 px-px mx-2 cursor-pointer"
        />

        <span className="px-2 mx-auto h-full items-center inline-flex text-nowrap text-xl text-white font-bold">
          ROI Monk
        </span>
      </a>
      <p className="text-muted-foreground py-2 text-sm font-light">
        © 2025 ROI Monk. <br />
        All rights reserved.
      </p>
      <div
        className={cn(
          "grid gap-x-8 gap-y-2 text-center md:gap-y-24 grid-cols-1",
          userType ? "lg:grid-cols-3" : "lg:grid-cols-2"
        )}
      >
        <a href="/privacy-policy">Privacy Policy</a>
        {userType && <a href="/refund-policy">Refund Policy</a>}
        <a href="/terms-and-conditions">Terms and Condition</a>
      </div>
      {userType ? (
        <div>
          <div className="w-full mt-5 text-center flex items-center justify-center gap-x-1 text-base">
            <p>Made by</p>
            <a
              href="https://pixelventurers.com"
              target="_blank"
              className="font-semibold text-blue-500 hover:underline flex items-start"
            >
              <span>Pixel Venturers</span>
              <ArrowTopRightIcon className="size-3" />
            </a>
          </div>
          <div className="w-full mt-2 text-center flex items-center justify-center gap-x-1 text-base">
            <p>Powered by</p>
            <a
              href="https://initiatejs.dev/"
              target="_blank"
              className="font-semibold text-yellow-500 hover:underline flex items-start"
            >
              <span>InitiateJS</span>
              <ArrowTopRightIcon className="size-3" />
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full mt-5 text-center flex items-center justify-center gap-x-1 text-base">
          <p>Developed by</p>
          <a
            href="https://akshat-garg.com"
            target="_blank"
            className="font-semibold text-yellow-500 hover:underline flex items-start"
          >
            <span>Akshat Garg</span>
            <ArrowTopRightIcon className="size-3" />
          </a>
        </div>
      )}
    </footer>
  );
}
