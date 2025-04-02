import { cn } from "@/lib/utils";

export default function Error({ className }) {
  return (
    <>
      <div
        className={cn(
          "md:size-full size-[90%] bg-primary/40 flex items-center justify-center",
          className
        )}
      >
        Something Went Wrong. Please try again!
      </div>
    </>
  );
}
