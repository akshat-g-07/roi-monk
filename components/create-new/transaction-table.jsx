import { memo } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/common/loading";

export default memo(
  function TransactionTable({
    transactions,
    handleEditButton,
    handleDeleteButton,
    isLoading,
  }) {
    return (
      <>
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
          <TableBody className="relative">
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
                <TableCell className="w-[50px]">{transaction.type}</TableCell>
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
            {isLoading && (
              <TableRow className="absolute size-full z-10 top-0 hover:bg-transparent">
                <TableCell colSpan={7} className="absolute size-full">
                  <Loading />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
