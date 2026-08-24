"use client";

import { format } from "date-fns";
import { ArrowUpIcon, ArrowDownIcon, ChevronsUpDownIcon } from "lucide-react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TransactionForm from "@/components/portfolio/transaction-form";
import { useState } from "react";
import { useUserCurrency } from "@/contexts/user-currency";
import { formatAmount } from "@/lib/format-currency";

const AmountCell = ({ row }) => {
  const userCurrency = useUserCurrency().split("- ")[1];
  return (
    <div
      style={{
        paddingLeft: "17.5px",
      }}
    >
      {formatAmount(row.getValue("amount"), userCurrency)}
    </div>
  );
};

const ActionsCell = ({
  row,
  handleEditOperation,
  handleCopyOperation,
  handleDeleteOperation,
}) => {
  const [open, setOpen] = useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizIcon sx={{ fontSize: "20px" }} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="dark">
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-primary/90"
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditIcon className="mr-2 size-3.5" />
              Edit
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleCopyOperation(row.original.id)}
          >
            <ContentCopyIcon className="mr-2 size-3.5" />
            Make a copy
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleDeleteOperation(row.original.id)}
          >
            <DeleteOutlineOutlinedIcon className="mr-2 size-3.5" />
            Move to trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className="w-[90%] max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Enter transaction details
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground/50">
            Please enter the transaction details for this portfolio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <TransactionForm
          transactionValues={row.original}
          handleCloseDialog={handleCloseDialog}
          handleEditOperation={handleEditOperation}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

const SortableHeader = ({ column, label }) => {
  const sorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className={cn(sorted && "py-0 bg-accent font-semibold text-foreground")}
    >
      {label}
      {sorted === "asc" ? (
        <ArrowUpIcon className="ml-1 size-4" />
      ) : sorted === "desc" ? (
        <ArrowDownIcon className="ml-1 size-4" />
      ) : (
        <ChevronsUpDownIcon className="ml-1 size-4 opacity-50" />
      )}
    </Button>
  );
};

export const PortfolioColumns = (
  handleEditOperation,
  handleCopyOperation,
  handleDeleteOperation,
) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transactionName",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: ({ column }) => <SortableHeader column={column} label="Type" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <ArrowDownwardIcon
            sx={{
              rotate: `${row.getValue("type") === "CR" ? "180deg" : "0deg"}`,
              color: `${row.getValue("type") === "CR" ? "green" : "red"}`,
              fontSize: "14px",
              marginRight: "5px",
            }}
          />
          <p>{row.getValue("type") === "CR" ? "Credit" : "Debit"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableHeader column={column} label="Amount" />,
    cell: ({ row }) => <AmountCell row={row} />,
  },
  {
    accessorKey: "transactionDate",
    header: ({ column }) => (
      <SortableHeader column={column} label="Transaction Date" />
    ),
    cell: ({ row }) => {
      return (
        <div
          style={{
            paddingLeft: "20px",
          }}
        >
          {format(row.getValue("transactionDate"), "PPP")}
        </div>
      );
    },
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => {
      return (
        <div
          style={{
            maxWidth: "500px",
          }}
        >
          {row.getValue("comments")?.length > 0
            ? row.getValue("comments")
            : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionsCell
        row={row}
        handleEditOperation={handleEditOperation}
        handleCopyOperation={handleCopyOperation}
        handleDeleteOperation={handleDeleteOperation}
      />
    ),
  },
];
