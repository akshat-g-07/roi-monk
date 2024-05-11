import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Redirect } from "@/lib/redirect";
import { useState } from "react";

const top100Films = [
  { label: "TheShawshankRedemption" },
  { label: "TheGodfather" },
  { label: "TheGodfather:PartII" },
  { label: "TheDarkKnight" },
  { label: "12AngryMen" },
  { label: "Schindler'sList" },
  { label: "PulpFiction" },
  {
    label: "TheLordoftheRings:TheReturnoftheKing",
  },
  { label: "TheGood,theBadandtheUgly" },
  { label: "FightClub" },
  {
    label: "TheLordoftheRings:TheFellowshipoftheRing",
  },
];

export default function SearchOption() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="mx-2">
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          const redirectURL = `dashboard/${newValue.label}`;
          setValue(null);
          setInputValue("");
          Redirect(redirectURL);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        blurOnSelect
        sx={{
          width: "300px",
          "& .MuiFormLabel-root": {
            color: "rgba(255,255,255,0.6)",
          },
          "& .MuiInputBase-input": {
            color: "rgba(255,255,255,1)",
          },
        }}
        autoHighlight
        options={top100Films}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="filled"
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          />
        )}
      />
    </div>
  );
}
