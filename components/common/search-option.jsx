import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GetAllPortfolios } from "@/actions/portfolio";
import { useServerAction } from "@/hooks/useServerAction";
import Loading from "./loading";

export default function SearchOption() {
  const router = useRouter();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const {
    isLoading,
    data: portfolios,
    error,
  } = useServerAction(GetAllPortfolios);

  if (isLoading)
    return (
      <Loading
        className="bg-transparent lg:mx-7 min-h-14 w-96 -ml-36 mt-2 md:ml-0 md:mt-0"
        size="1rem"
      />
    );

  if (error) return <></>;

  return (
    <>
      <div className="lg:mx-2 -ml-36 md:ml-0 mt-2 md:mt-0 lg:mt-0 w-96">
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
            width: "100%",
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
          options={portfolios}
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
