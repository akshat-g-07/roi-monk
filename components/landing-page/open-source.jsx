import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function OpenSource() {
  return (
    <div className="space-y-6 mt-4 mb-8">
      <h2 className="text-3xl text-white text-center leading-[1.15] font-bold">
        Proudly{" "}
        <span className="bg-gradient-to-br from-orange-400 to-amber-600 bg-clip-text text-transparent">
          Open Source!
        </span>
      </h2>
      <a
        target="_blank"
        href="https://github.com/akshat-g-07/roi-monk"
        className="w-fit flex items-center text-lg font-semibold bg-[#1F2937] text-white/90 p-2 rounded-md hover:bg-[#1F2937]/90 cursor-pointer space-x-2"
      >
        <p>Star on Github</p>
        <GitHubLogoIcon />
      </a>
    </div>
  );
}
