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

export const columns = [
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
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizIcon sx={{ fontSize: "20px" }} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark">
            <DropdownMenuItem>
              <EditIcon className="mr-2 size-3.5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ContentCopyIcon className="mr-2 size-3.5" />
              Make a copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteOutlineIcon className="mr-2 size-3.5" />
              Move to trash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
