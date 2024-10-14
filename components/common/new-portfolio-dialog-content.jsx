"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CircularProgress from "@mui/material/CircularProgress";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { GetPortfolioByName } from "@/actions/portfolio";

export default function NewPortfolioDialogContent({ handleDialogClose }) {
  const router = useRouter();
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const [error, setError] = useState();

  return (
    <>
      <AlertDialogContent className="dark w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Name of Portfolio.
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter the name of the investment portfolio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          autoFocus
          disabled={loadingResponse}
          value={portfolioName}
          className="text-foreground"
          placeholder="Portfolio Name"
          onChange={(event) => setPortfolioName(event.target.value)}
        />
        {error && <span className="text-rose-500 text-sm ml-2">{error}</span>}
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loadingResponse}
            className={` text-white`}
            onClick={() => {
              setPortfolioName("");
              setError();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={loadingResponse}
            className={`${loadingResponse && "bg-slate-700"} w-[90px]`}
            onClick={async () => {
              setLoadingResponse(true);
              if (!portfolioName) {
                setError("Portfolio name can't be blank!");
                setLoadingResponse(false);
                return;
              }

              const regex = /^[a-zA-Z0-9_\-\s]+$/;
              if (!regex.test(portfolioName)) {
                setError(
                  "Portfolio name can only have a-z, A-Z, 0-9, space, _, -"
                );
                setLoadingResponse(false);
                return;
              }

              const response = await GetPortfolioByName(portfolioName);
              if (response.message === "unique") {
                setPortfolioName("");
                setLoadingResponse(false);
                handleDialogClose();
                router.push(`/create-new/${portfolioName}`);
              } else if (response.data) {
                setError(
                  "Portfolio name already exists. Please choose unique name."
                );
                setLoadingResponse(false);
                return;
              } else {
                setError("Something went wrong. Please try again in sometime.");
                setLoadingResponse(false);
                return;
              }
            }}
          >
            {loadingResponse ? (
              <>
                <CircularProgress
                  size={20}
                  sx={{
                    color: "#29b6f6",
                  }}
                />
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
