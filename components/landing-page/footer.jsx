import Image from "next/image";
import { cn } from "@/lib/utils";
import Logo from "@/app/logo.png";

export default function Footer() {
  return (
    <footer className="w-full h-fit border-y border-grid px-8 sm:px-6 md:px-12 py-5 text-muted-foreground justify-center">
      <a href="/" className="flex items-center w-fit">
        <Image
          src={Logo}
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
        © 2026 ROI Monk. <br />
        All rights reserved.
      </p>
      <div
        className={cn(
          "grid gap-x-8 gap-y-2 text-center md:gap-y-24 grid-cols-1",
          "lg:grid-cols-3",
        )}
      >
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/refund-policy">Refund Policy</a>
        <a href="/terms-and-conditions">Terms and Condition</a>
      </div>
    </footer>
  );
}
