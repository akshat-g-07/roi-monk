import { SignOutButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      This is private route
      <br />
      <SignOutButton redirectUrl="/" />
    </>
  );
}
