"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/ui/button";

export default function Preason() {
  const [reason, setReason] = useState("");

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
          <FormControl
            sx={{
              m: 1,
              width: 200,
              "& .MuiSelect-select": {
                color: "white",
              },
            }}
            size="small"
          >
            <Select
              value={reason}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Select a reason</em>
              </MenuItem>
              <MenuItem value={"ge"}>general inquiry</MenuItem>
              <MenuItem value={"fr"}>feature request</MenuItem>
              <MenuItem value={"ts"}>technical support</MenuItem>
              <MenuItem value={"is"}>issue</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex items-start">
          <p className="text-lg mr-5 pt-4">My concern is:</p>
          <TextField
            id="outlined-multiline-static"
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
        {/* 
        MARK: implement image uploader */}
        <div className="w-[90%] flex justify-end mt-5">
          <Button>Submit</Button>
        </div>
      </div>
    </>
  );
}
