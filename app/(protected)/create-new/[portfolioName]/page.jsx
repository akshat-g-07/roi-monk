"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CreatePortfolio } from "@/actions/portfolio";
import AddTransactionDialogContent from "@/components/common/add-transaction-dialog-content";
import TransactionTable from "@/components/create-new/transaction-table";

export default function Page({ params }) {
  const { portfolioName } = params;
  const decodedPortfolioName = decodeURIComponent(portfolioName);
  const [open, setOpen] = useState(true);
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

  const handleAddTransaction = (values) => {
    if (editAction === -1) setTransactions([...transactions, values]);
    else {
      transactions[editAction] = values;
      setEditAction(-1);
    }
    form.reset();
    setOpen(false);
  };

  const handleSavePortfolio = async () => {
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
            <TransactionTable
              transactions={transactions}
              handleEditButton={handleEditButton}
              handleDeleteButton={handleDeleteButton}
            />
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
              <Button onClick={handleSavePortfolio}>Save</Button>
            </div>
          )}
        </>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger>
            <div className="flex items-center w-fit bg-primary hover:bg-primary/90 dark justify-evenly rounded-full cursor-pointer fixed bottom-5 right-5 z-10">
              <PlusIcon className="size-6 m-2 text-black" />
            </div>
          </AlertDialogTrigger>
          <AddTransactionDialogContent
            form={form}
            handleFormSubmit={handleAddTransaction}
          />
        </AlertDialog>
      </div>
    </>
  );
}
