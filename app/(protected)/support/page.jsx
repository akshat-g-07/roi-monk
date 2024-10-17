"use client";

import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/ui/button";
import { CreateSupportTicket } from "@/actions/support";
import { toast } from "react-toastify";

export default function Page() {
  const [reason, setReason] = useState("");
  const [concern, setConcern] = useState("");

  const handleChange = (event) => {
    setReason(event.target.value);
  };

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
        <div className="flex items-center">
          <p className="text-lg mr-5">I am here for:</p>
          <Select
            value={reason}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              m: 1,
              width: 200,
              "& .MuiSelect-select": {
                color: "white",
              },
            }}
          >
            <MenuItem value="">
              <em>Select a reason</em>
            </MenuItem>
            <MenuItem value={"GI"}>general inquiry</MenuItem>
            <MenuItem value={"FR"}>feature request</MenuItem>
            <MenuItem value={"TS"}>technical support</MenuItem>
            <MenuItem value={"IS"}>issue</MenuItem>
          </Select>
        </div>
        <div className="flex items-start">
          <p className="text-lg mr-5 pt-4">My concern is:</p>
          <TextField
            value={concern}
            onChange={(e) => {
              setConcern(e.target.value);
            }}
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
        <div className="w-[90%] flex justify-end mt-5">
          <Button
            onClick={async () => {
              const response = await CreateSupportTicket(reason, concern);

              if (response.message === "error") {
                toast.error(`Uh oh! Something went wrong.\nPlease try again.`);
              } else if (response.message === "exists") {
                toast.error(`Ticket already exists.`);
              } else {
                toast.success("Your support ticket is created successfully!!");
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
