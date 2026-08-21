import { UpdatePortfolioNameByName } from "@/actions/portfolio";
import TextField from "@mui/material/TextField";
import { CheckIcon, Pencil1Icon, SymbolIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function PortfolioHeader({ portfolioName }) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const decodedName = decodeURI(portfolioName);
  const [value, setValue] = useState(decodedName);
  const inputRef = useRef(null);

  // Focus the input once it becomes editable so the caret is ready to type.
  useEffect(() => {
    if (edit) inputRef.current?.focus();
  }, [edit]);

  return (
    <>
      <div className="flex items-end">
        <TextField
          variant="standard"
          inputRef={inputRef}
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
              fontSize: { xs: "1.25rem", sm: "1.875rem" },
              fontWeight: "700",
              lineHeight: { xs: "0rem", sm: "2.25rem" },
            },
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          slotProps={{
            input: {
              readOnly: !edit,
            },
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
                  // Nothing changed: revert to the pencil without hitting the API.
                  if (value === decodedName) {
                    setEdit(false);
                    return;
                  }
                  setLoading(true);
                  const response = await UpdatePortfolioNameByName(
                    decodedName,
                    value,
                  );
                  setLoading(false);
                  if (response.message === "error") {
                    toast.error(
                      `Uh oh! Something went wrong.\nPlease try again.`,
                    );
                    setValue(decodedName);
                  } else if (response.message === "exists") {
                    toast.error(
                      `Portfolio name already exists.\nPlease choose unique name.`,
                    );
                    setValue(decodedName);
                  } else {
                    toast.success(
                      "Your portfolio name is updated successfully!!",
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
