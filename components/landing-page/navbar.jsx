import Image from "next/image";
import GetStartedButton from "./get-started";

export default function NavBar() {
  return (
    <>
      <div className="w-full !flex-row justify-between md:px-8 py-4">
        <a href="/" className="flex items-center w-fit">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Logo"
            className="py-2 px-px mx-2 cursor-pointer"
          />

          <span className="px-2 mx-auto h-full items-center inline-flex text-nowrap text-xl md:text-5xl font-bold">
            ROI Monk
          </span>
        </a>

        <GetStartedButton />
      </div>
    </>
  );
}
