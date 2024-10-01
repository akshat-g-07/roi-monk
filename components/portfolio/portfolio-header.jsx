import { UpdatePortfolioNameByName } from "@/actions/portfolio";
import TextField from "@mui/material/TextField";
import { CheckIcon, Pencil1Icon, SymbolIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PortfolioHeader({ portfolioName }) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(portfolioName);
  return (
    <>
      <div className="flex items-end">
        <TextField
          variant="standard"
          disabled={loading}
          sx={{
            margin: "0 0.5rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "& .MuiInputBase-input.MuiInput-input.Mui-disabled": {
              color: "rgba(255,255,255,0.5)",
              WebkitTextFillColor: "unset",
            },
            "& .MuiInputBase-input": {
              color: "white",
              cursor: edit ? "text" : "default",
              fontSize: "1.875rem",
              fontWeight: "700",
              lineHeight: " 2.25rem",
            },
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          InputProps={{
            readOnly: !edit,
          }}
        />
        {loading ? (
          <SymbolIcon className="size-5 text-foreground animate-spin" />
        ) : (
          <>
            {edit ? (
              <CheckIcon
                className="size-7 text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={async () => {
                  setLoading(true);
                  const response = await UpdatePortfolioNameByName(
                    portfolioName,
                    value
                  );
                  setLoading(false);
                  if (response.message === "error") {
                    toast.error(
                      `Uh oh! Something went wrong.\nPlease try again.`
                    );
                    setValue(portfolioName);
                  } else if (response.message === "exists") {
                    toast.error(
                      `Portfolio name already exists.\nPlease choose unique name.`
                    );
                    setValue(portfolioName);
                  } else {
                    toast.success(
                      "Your portfolio name is updated successfully!!"
                    );
                    router.push(`/portfolio/${value}`);
                  }
                  setEdit(false);
                }}
              />
            ) : (
              <Pencil1Icon
                className="size-5 text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => {
                  setEdit(true);
                }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
