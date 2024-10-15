import { cn } from "@/lib/utils";
import { CircularProgress } from "@mui/material";

export default function Loading({
  className,
  size = "3rem",
  absolute = false,
}) {
  return (
    <>
      <div
        className={cn(
          `size-full z-10 bg-primary/40 flex items-center justify-center ${
            absolute && "absolute z-10"
          }`,
          className
        )}
      >
        <CircularProgress size={size} />
      </div>
    </>
  );
}
