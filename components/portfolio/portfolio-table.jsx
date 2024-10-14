"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AddTransactionDialogContent from "../common/add-transaction-dialog-content";

export default function PortfolioTable({
  columns,
  data,
  handleBulkDeleteOperation,
  form,
  handleAddTransaction,
  handleSaveOperation,
  hasChanges,
  isLoading,
}) {
  const [open, setOpen] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search Transaction Name..."
          value={table.getColumn("transactionName")?.getFilterValue() || ""}
          onChange={(event) =>
            table
              .getColumn("transactionName")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex gap-x-4">
          <AlertDialog open={open} onOpenChange={setOpen} defaultOpen={true}>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">Add</Button>
            </AlertDialogTrigger>
            <AddTransactionDialogContent
              form={form}
              handleFormSubmit={(e) => {
                handleAddTransaction(e);
                setOpen(false);
              }}
            />
          </AlertDialog>

          <Button onClick={handleSaveOperation} disabled={hasChanges}>
            Save
          </Button>
          <Button
            variant="destructive"
            disabled={!table.getFilteredSelectedRowModel().rows.length}
            onClick={() => {
              handleBulkDeleteOperation(
                table.getFilteredSelectedRowModel().rows
              );
              setRowSelection({});
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
