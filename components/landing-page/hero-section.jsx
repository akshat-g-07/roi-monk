import { GitHubLogoIcon } from "@radix-ui/react-icons";
import GetStartedButton from "./get-started";

export default function HeroSection() {
  return (
    <>
      <div className="w-full flex flex-col items-center py-4 text-center">
        <h1 className="text-4xl text-white leading-[1.15] font-extrabold">
          ROI Monk – Your{" "}
          <span className="bg-gradient-to-br from-amber-300 to-orange-600 bg-clip-text text-transparent">
            Investment
          </span>{" "}
          Dashboard, Simplified.
        </h1>
        <h3 className="text-lg font-semibold text-white/75 mt-4 md:mt-2">
          Get a clear picture of your investments and their returns with our
          powerful yet easy-to-use tracking tool.
        </h3>
        <div className="w-full flex items-center justify-evenly md:px-12 mt-12">
          <a
            target="_blank"
            href="https://github.com/akshat-g-07/roi-monk"
            className="w-fit flex items-center text-lg font-semibold bg-[#1F2937] text-white/90 p-2 rounded-md hover:bg-[#1F2937]/90 cursor-pointer space-x-2"
          >
            <p>Star on Github</p>
            <GitHubLogoIcon />
          </a>
          <GetStartedButton />
        </div>
      </div>
    </>
  );
}
