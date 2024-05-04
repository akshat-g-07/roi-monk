"use client";

import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function NavBarToggler() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <Cross1Icon
          className="size-7 my-5 border-2 rounded-full p-1 border-muted-foreground cursor-pointer"
          onClick={() => {
            setOpen(false);
            const navbar = document.querySelector("nav");
            navbar.classList.add("w-[70px]");
            navbar.classList.remove("w-2/12");
          }}
        />
      ) : (
        <HamburgerMenuIcon
          className="size-7 my-5 border-2 rounded-full p-1 border-muted-foreground cursor-pointer"
          onClick={() => {
            setOpen(true);
            const navbar = document.querySelector("nav");
            navbar.classList.remove("w-[70px]");
            navbar.classList.add("w-2/12");
          }}
        />
      )}
    </>
  );
}
