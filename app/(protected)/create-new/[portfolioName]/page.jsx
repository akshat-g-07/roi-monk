"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Card } from "@/components/ui/card";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CreatePortfolio } from "@/actions/portfolio";
import AddTransactionDialogContent from "@/components/common/add-transaction-dialog-content";

export default function Page({ params }) {
  const { portfolioName } = params;
  const decodedPortfolioName = decodeURIComponent(portfolioName);
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  // the number saves the index of transactions[] for which edit is called, might be 0 as well, -1 indicates none.
  const [editAction, setEditAction] = useState(-1);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      amount: "",
      comments: "",
      transactionDate: "",
      transactionName: "",
      type: "",
    },
    resolver: async (values) => {
      const errors = {};
      const { amount, comments, transactionDate, transactionName, type } =
        values;

      if (!type) {
        errors.type = {
          type: "required",
          message: "Type is required.",
        };
      }

      const nameRegex = /^[a-zA-Z0-9\s\-_]*$/;
      if (!transactionName) {
        errors.transactionName = {
          type: "required",
          message: "Name is required.",
        };
      } else if (!nameRegex.test(transactionName)) {
        errors.transactionName = {
          type: "validation",
          message: "Name can only have a-z, A-Z, 0-9, space, -, _.",
        };
      }

      if (!amount) {
        errors.amount = {
          type: "required",
          message: "Amount is required.",
        };
      } else if (amount <= 0) {
        errors.amount = {
          type: "validation",
          message: "Amount should be a postive number.",
        };
      }

      if (!transactionDate) {
        errors.transactionDate = {
          type: "required",
          message: "Date is required.",
        };
      }

      const commentRegex = /^[a-zA-Z0-9\s.'"&,!?\-_]*$/;
      if (!commentRegex.test(comments)) {
        errors.comments = {
          type: "validation",
          message: `Comments can only have a-z, A-Z, 0-9, space, ., ', ", &, !, ?, -, _.`,
        };
      }

      return {
        errors: errors,
        values: values,
      };
    },
  });

  const addTransaction = (values) => {
    if (editAction === -1) setTransactions([...transactions, values]);
    else {
      transactions[editAction] = values;
      setEditAction(-1);
    }
    form.reset();
    setOpen(false);
  };

  const savePortfolio = async () => {
    const portfolio = await CreatePortfolio(decodedPortfolioName, transactions);
    if (portfolio.message === "error") {
      toast.error(`Uh oh! Something went wrong.\nPlease try again.`);
    } else if (portfolio.message === "unique error") {
      toast.error(
        `Transaction duplicate found.\nPlease try changing the transaction details.`
      );
    } else {
      toast.success("Your portfolio is created successfully!!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/dashboard");
    }
  };

  const handleEditButton = (index) => {
    let tempTransaction = transactions[index];
    form.setValue("amount", tempTransaction.amount);
    form.setValue("comments", tempTransaction.comments);
    form.setValue("transactionName", tempTransaction.transactionName);
    form.setValue("type", tempTransaction.type);
    form.setValue("transactionDate", tempTransaction.transactionDate);
    setEditAction(index);
    setOpen(true);
  };

  const handleDeleteButton = (indx) => {
    let tempTransactions = transactions.filter((item, index) => index !== indx);
    setTransactions(tempTransactions);
  };

  return (
    <>
      <div className="w-full min-h-full">
        <p className="text-2xl font-semibold">{decodedPortfolioName}</p>
        <>
          <Card className="mt-10 p-4">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[10px]"></TableHead>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead className="w-[200px]">Transaction Name</TableHead>
                  <TableHead className="w-[200px]">Amount</TableHead>
                  <TableHead className="w-[200px]">Date</TableHead>
                  <TableHead className="w-fit">Comments</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length < 1 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center font-semibold text-muted-foreground h-16"
                    >
                      Click on &quot;+&quot; button to add a transaction.
                    </TableCell>
                  </TableRow>
                )}
                {transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-[10px]">
                      <ArrowDownwardIcon
                        sx={{
                          rotate: `${
                            transaction.type === "Credit" ? "180deg" : "0deg"
                          }`,
                          color: `${
                            transaction.type === "Credit" ? "green" : "red"
                          }`,
                          fontSize: "0.85rem",
                        }}
                      />
                    </TableCell>
                    <TableCell className="w-[50px]">
                      {transaction.type}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      {transaction.transactionName}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      {transaction.amount}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      {format(transaction.transactionDate, "LLL dd, y")}
                    </TableCell>
                    <TableCell className="w-fit">
                      {transaction.comments ? transaction.comments : "-"}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      <div className="flex">
                        <Pencil1Icon
                          className="size-5 mr-[5px] text-muted-foreground hover:text-foreground cursor-pointer"
                          onClick={() => {
                            handleEditButton(index);
                          }}
                        />
                        <TrashIcon
                          className="size-5 ml-[5px] text-destructive hover:text-red-500 cursor-pointer"
                          onClick={() => {
                            handleDeleteButton(index);
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          {transactions.length > 0 && (
            <div className="w-full flex justify-between my-5 px-5">
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Cancel
              </Button>
              <Button onClick={savePortfolio}>Save</Button>
            </div>
          )}
        </>
        <AlertDialog open={open} onOpenChange={setOpen} defaultOpen={true}>
          <AlertDialogTrigger>
            <div className="flex items-center w-fit bg-primary hover:bg-primary/90 dark justify-evenly rounded-full cursor-pointer fixed bottom-5 right-5 z-10">
              <PlusIcon className="size-6 m-2 text-black" />
            </div>
          </AlertDialogTrigger>
          <AddTransactionDialogContent
            form={form}
            handleFormSubmit={addTransaction}
          />
        </AlertDialog>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}
