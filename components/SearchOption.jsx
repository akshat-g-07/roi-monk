import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="mx-2">
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          setValue(null);
          setInputValue("");
          router.push(`/portfolio/${newValue.label}`);
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
        PaperComponent={PaperComp}
        renderOption={(props, option) => (
          <CustomListItem props={props} option={option} />
        )}
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

const CustomListItem = ({ props, option }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      {...props}
      style={{
        backgroundColor: isHovered ? "black" : "inherit",
        color: "inherit",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {option.label}
    </li>
  );
};

const PaperComp = (props) => {
  console.log(props);
  return (
    <div
      style={{
        backgroundColor: "rgba(14, 28, 64,1)",
        color: "hsl(210 40% 98%)",
      }}
      {...props}
    />
  );
};
