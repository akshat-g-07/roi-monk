"use client";

import { format } from "date-fns";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TransactionForm from "@/components/transaction-form";
import { useState } from "react";

export const columns = (
  handleEditOperation,
  handleCopyOperation,
  handleDeleteOperation
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          {column.getIsSorted() && (
            <>
              {column.getIsSorted() === "asc" ? (
                <ArrowUpwardIcon sx={{ marginLeft: "4px", fontSize: "16px" }} />
              ) : (
                <ArrowDownwardIcon
                  sx={{ marginLeft: "4px", fontSize: "16px" }}
                />
              )}
            </>
          )}
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          {column.getIsSorted() && (
            <>
              {column.getIsSorted() === "asc" ? (
                <ArrowUpwardIcon sx={{ marginLeft: "4px", fontSize: "16px" }} />
              ) : (
                <ArrowDownwardIcon
                  sx={{ marginLeft: "4px", fontSize: "16px" }}
                />
              )}
            </>
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          style={{
            paddingLeft: "17.5px",
          }}
        >
          $ {row.getValue("amount")}
        </div>
      );
    },
  },
  {
    accessorKey: "transactionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Date
          {column.getIsSorted() && (
            <>
              {column.getIsSorted() === "asc" ? (
                <ArrowUpwardIcon sx={{ marginLeft: "4px", fontSize: "16px" }} />
              ) : (
                <ArrowDownwardIcon
                  sx={{ marginLeft: "4px", fontSize: "16px" }}
                />
              )}
            </>
          )}
        </Button>
      );
    },
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
          {row.getValue("comments").length > 0 ? row.getValue("comments") : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizIcon sx={{ fontSize: "20px" }} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark">
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer hover:bg-primary/90">
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
                <DeleteOutlineIcon className="mr-2 size-3.5" />
                Move to trash
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent className="dark">
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
              handleEditOperation={handleEditOperation}
            />
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
