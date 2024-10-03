import { format } from "date-fns";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function TransactionForm({
  transactionValues,
  handleCloseDialog,
  handleEditOperation,
}) {
  const form = useForm({
    defaultValues: {
      amount: transactionValues.amount,
      comments: transactionValues.comments,
      transactionDate: transactionValues.transactionDate,
      transactionName: transactionValues.transactionName,
      type: transactionValues.type,
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

  const editTransaction = (values) => {
    handleEditOperation(transactionValues.id, values);
    handleCloseDialog();
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(editTransaction)}
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
                      <SelectItem value="DR">Debit</SelectItem>
                      <SelectItem value="CR">Credit</SelectItem>
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
                  <FormLabel className="text-white">Transaction Name</FormLabel>
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
                    <PopoverContent className="w-auto p-0 dark" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
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
                handleCloseDialog();
                form.reset();
              }}
            >
              Cancel
            </AlertDialogCancel>
            <Button type="submit">Edit</Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </>
  );
}
