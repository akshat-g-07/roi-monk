import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { GetAllPortfolioNames } from "@/actions/portfolio";

export default function SearchOption() {
  const router = useRouter();
  const [value, setValue] = useState(null);
  const [portfolioNames, setPortfolioNames] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function PortfolioNames() {
      const portfolioNamesData = await GetAllPortfolioNames();

      if (portfolioNamesData.data) setPortfolioNames(portfolioNamesData.data);
      else if (portfolioNamesData.message === "empty") setPortfolioNames([]);
    }

    PortfolioNames();
  }, []);

  return (
    <>
      {portfolioNames && (
        <div className="mx-2">
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(null);
              setInputValue("");
              router.push(`/portfolio/${newValue.portfolioName}`);
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
              <CustomListItem key={option.id} props={props} option={option} />
            )}
            autoHighlight
            options={portfolioNames}
            getOptionLabel={(option) => option.portfolioName}
            noOptionsText={
              <span style={{ color: "rgba(255,255,255,0.6)" }}>No Options</span>
            }
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
      )}
    </>
  );
}

const CustomListItem = ({ props, option }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      {...props}
      key={option.id}
      style={{
        backgroundColor: isHovered ? "black" : "inherit",
        color: "inherit",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {option.portfolioName}
    </li>
  );
};

const PaperComp = (props) => {
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
