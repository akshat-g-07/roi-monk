import { CircularProgress } from "@mui/material";

export default function Loading({ size = "3rem", absolute = false }) {
  return (
    <>
      <div
        className={`size-full z-10 bg-primary/40 flex items-center justify-center ${
          absolute && "absolute z-10"
        }`}
      >
        <CircularProgress size={size} />
      </div>
    </>
  );
}
