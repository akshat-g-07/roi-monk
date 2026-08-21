"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  flexRender,
  useTable,
  tableFeatures,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  rowSortingFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  filterFn_includesString,
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
import Loading from "@/components/common/loading";

// Features + row models are composed once; the core row model is applied automatically.
const features = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  // v9 no longer auto-registers built-in filterFns; "auto" needs this to resolve includesString.
  filterFns: { includesString: filterFn_includesString },
});

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
  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between py-4">
        <Input
          placeholder="Search Transaction Name..."
          value={table.getColumn("transactionName")?.getFilterValue() || ""}
          onChange={(event) =>
            table
              .getColumn("transactionName")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
          disabled={isLoading}
        />
        <div className="flex gap-x-4">
          <AlertDialog open={open} onOpenChange={setOpen} defaultOpen={true}>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" disabled={isLoading}>
                Add
              </Button>
            </AlertDialogTrigger>
            <AddTransactionDialogContent
              form={form}
              handleFormSubmit={(e) => {
                handleAddTransaction(e);
                setOpen(false);
              }}
            />
          </AlertDialog>

          <Button
            onClick={handleSaveOperation}
            disabled={hasChanges || isLoading}
          >
            Save
          </Button>
          <Button
            variant="destructive"
            disabled={
              !table.getFilteredSelectedRowModel().rows.length || isLoading
            }
            onClick={() => {
              handleBulkDeleteOperation(
                table.getFilteredSelectedRowModel().rows,
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
              <TableRow key={headerGroup.id} className="h-14">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="relative">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${
                        cell.column.id === "transactionName"
                          ? "max-lg:max-w-50 max-lg:min-w-50"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
            {isLoading && (
              <TableRow className="absolute size-full z-10 top-0 hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="absolute size-full"
                >
                  <Loading />
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
          disabled={!table.getCanPreviousPage() || isLoading}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isLoading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
