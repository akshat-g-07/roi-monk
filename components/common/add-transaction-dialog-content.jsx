"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { useUserCurrency } from "@/contexts/user-currency";

export default function AddTransactionDialogContent({
  form,
  handleFormSubmit,
}) {
  const userCurrency = useUserCurrency().split("- ")[1];

  return (
    <>
      <AlertDialogContent className="dark">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Enter transaction details
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground/50">
            Please enter the transaction details for this portfolio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
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
                        placeholder={`${userCurrency} 200`}
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
    </>
  );
}
