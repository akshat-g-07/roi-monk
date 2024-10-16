import { cn } from "@/lib/utils";
import { CircularProgress } from "@mui/material";

export default function Loading({ className, size = "3rem" }) {
  return (
    <>
      <div
        className={cn(
          "size-full bg-primary/40 flex items-center justify-center",
          className
        )}
      >
        <CircularProgress size={size} />
      </div>
    </>
  );
}
