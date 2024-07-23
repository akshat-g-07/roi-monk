"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "@/components/ui/card";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CreatePortfolio } from "@/actions/portfolio";

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
              <Button variant="outline">Cancel</Button>
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
          <AlertDialogContent className="dark">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">
                Enter transaction details
              </AlertDialogTitle>
            </AlertDialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(addTransaction)}
                className="space-y-8"
              >
                <div className="flex items-start h-fit w-[500px] justify-between">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="w-[175px]">
                        <FormLabel className="text-white">Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-white">
                              <SelectValue placeholder="DR/CR" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark">
                            <SelectItem value="Debit">Debit</SelectItem>
                            <SelectItem value="Credit">Credit</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transactionName"
                    render={({ field }) => (
                      <FormItem className="w-[300px]">
                        <FormLabel className="text-white">
                          Transaction Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-white"
                            placeholder="My Transaction"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-start h-fit w-[500px] justify-between">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-[175px]">
                        <FormLabel className="text-white">Amount</FormLabel>
                        <FormControl>
                          <Input
                            className="text-white"
                            placeholder="$200"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transactionDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col text-white">
                        <FormLabel className="text-white my-[5px]">
                          Transaction Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[300px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 dark"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="h-fit w-[500px]">
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Comments about transaction"
                            className="resize-none text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    className={"text-white"}
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button type="submit">Add</Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogContent>
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
