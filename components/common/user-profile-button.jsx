import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import { SymbolIcon } from "@radix-ui/react-icons";

export default function UserProfileButton({ open }) {
  return (
    <>
      <div className={`p-2 ${open ? "w-[92.5%] pl-3" : "w-fit"}`}>
        <ClerkLoading>
          <SymbolIcon className="size-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton
              showName={open}
              appearance={{
                elements: {
                  userButtonBox: {
                    flexFlow: "row-reverse",
                  },
                  userButtonOuterIdentifier: {
                    fontSize: "16px",
                    textWrap: "nowrap",
                  },
                },
              }}
            />
          </SignedIn>
        </ClerkLoaded>
      </div>
    </>
  );
}
