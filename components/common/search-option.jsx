import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { GetAllPortfolios } from "@/actions/portfolio";
import { useServerAction } from "@/hooks/useServerAction";
import Loading from "./loading";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SearchOption() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refresh = searchParams.get("refresh");
  const deviceSize = useMediaQuery("(max-width:600px)") ? "small" : "medium";
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const {
    isLoading,
    data: portfolios,
    error,
    refetch,
  } = useServerAction(GetAllPortfolios);

  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh, refetch]);

  if (isLoading)
    return (
      <Loading
        className="bg-transparent lg:mx-7 min-h-14 w-full mt-2 md:mt-0 max-w-96"
        size="1rem"
      />
    );

  if (error) return <></>;

  return (
    <>
      <div className="mx-2 max-w-96 mt-4 md:mt-0 w-full">
        <Autocomplete
          size={deviceSize}
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
