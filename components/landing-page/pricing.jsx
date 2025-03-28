import { CheckCircledIcon } from "@radix-ui/react-icons";
import GetStartedButton from "./get-started";

export default function Pricing() {
  const pricingFeatures = [
    "Create unlimited portfolios with unlimited entries to track all your investments effortlessly.",
    "Monitor individual portfolio performance with clear, independent tracking.",
    "Gain insightful reports on your dashboard to understand how your investments are performing.",
    "Set your preferred currency for a personalized tracking experience.",
    "Enjoy 24/7 email support for any assistance you need.",
  ];
  return (
    <>
      <div className="w-full pb-8">
        <h2 className="text-3xl text-white leading-[1.15] font-bold">
          Pricing
        </h2>
        <div className="rounded w-64 md:w-3/4 h-fit border border-gray-400 mt-6 flex flex-col items-center p-4">
          <h3 className="text-xl font-semibold text-white mb-2">
            $ 9
            <span className="text-base text-white/75 font-normal"> /month</span>
          </h3>
          {pricingFeatures.map((feature) => {
            return (
              <div
                key={feature}
                className="flex items-start w-full space-x-2 my-1"
              >
                <p className="size-5 aspect-square flex items-start justify-center pt-1">
                  <CheckCircledIcon className="text-green-500 size-5" />
                </p>
                <p className="grow">{feature}</p>
              </div>
            );
          })}
          <div className="my-3 w-full h-1 opacity-0" />
          <GetStartedButton />
        </div>
      </div>
    </>
  );
}
