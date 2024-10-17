"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/ui/button";
import Rating from "@mui/material/Rating";
import { CreateFeedback } from "@/actions/feedback";
import { toast } from "react-toastify";

export default function Page() {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  return (
    <>
      <div
        className="w-full h-full p-4"
        style={{
          background: "rgba( 255, 255, 255, 0.3 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 2px )",
          WebkitBackdropFilter: "blur( 2px )",
          borderRadius: "10px",
        }}
      >
        <div className="flex flex-col items-center w-full justify-center">
          <p className="text-lg font-semibold my-4">Rate the product:</p>
          <Rating
            name="no-value"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </div>
        <div className="flex flex-col items-center w-full justify-center">
          <p className="text-lg font-semibold mt-2 text-center">
            If you are enjoying the product, please consider giving shoutout to
            me on{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => {
                window.open("https://x.com/akku_g__");
              }}
            >
              X(Twitter)
            </span>
          </p>
          <p className="mt-6">or consider writing to me personally below:</p>
        </div>
        <div className="flex justify-center mt-3">
          <TextField
            value={comments}
            onChange={(e) => {
              setComments(e.target.value);
            }}
            placeholder="Tell me what you like about the product!"
            multiline
            rows={10}
            sx={{
              width: "80%",
              "& .MuiInputBase-root": {
                color: "white",
              },
            }}
          />
        </div>
        <div className="w-full flex justify-center mt-5">
          <Button
            onClick={async () => {
              const response = await CreateFeedback(rating, comments);

              if (response.message === "error") {
                toast.error(`Uh oh! Something went wrong.\nPlease try again.`);
              } else if (response.message === "exists") {
                toast.error(`Feedback already exists.`);
              } else {
                toast.success("Your feedback is reached me successfully!!");
              }
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
