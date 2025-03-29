import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function GetStartedButton() {
  return (
    <a
      href="/sign-in"
      className="w-fit flex items-center text-lg font-semibold bg-white text-black p-2 rounded-md hover:bg-white/90 cursor-pointer space-x-2"
    >
      <p>Get Started</p>
      <ArrowRightIcon />
    </a>
  );
}
