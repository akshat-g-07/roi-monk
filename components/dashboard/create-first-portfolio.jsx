import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewPortfolioDialogContent from "@/components/common/new-portfolio-dialog-content";

export default function CreateFirstPortfolio() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <div className="size-full border-dashed border-2 flex justify-center items-center">
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogTrigger>
            <div className="size-fit border-dashed border-2 flex flex-col justify-center items-center p-5 opacity-75 hover:opacity-100 hover:border-[#50668a] cursor-pointer">
              <AddIcon fontSize="large" />
              <p className="text-center font-bold text-lg whitespace-pre-line">
                {`Create Your First\nPortfolio`}
              </p>
            </div>
          </AlertDialogTrigger>
          <NewPortfolioDialogContent handleDialogClose={handleDialogClose} />
        </AlertDialog>
      </div>
    </>
  );
}
