"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { checkDailyLimit } from "@/actions/check-contacts-limit";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  storageKey?: string;
};

const MAX_CONTACTS = 50;

type CombinedProps<TData, TValue> = DataTableProps<TData, TValue> & {
  remainingContacts: number;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  storageKey = "datatable:visibility",
  remainingContacts,
}: CombinedProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filter, setFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [loaded, setLoaded] = React.useState(false);
  const [remaining, setRemaining] = React.useState<number>(remainingContacts);
  const [open, setOpen] = React.useState(remainingContacts <= 0);
  const [tData, setTData] = React.useState<TData[]>(data);

  // Load from localStorage **client-side only**
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        setColumnVisibility(JSON.parse(raw));
      }
    } catch {}
    setLoaded(true);
  }, [storageKey]);

  // Save instantly on toggle
  React.useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(columnVisibility));
    } catch {}
  }, [columnVisibility, loaded, storageKey]);

  React.useEffect(() => {
    setOpen(remainingContacts <= 0);
  }, [remainingContacts]);

  const table = useReactTable({
    data: tData,
    columns,
    state: { sorting, globalFilter: filter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // if (remaining <= 0) return <div>You have reached the daily limit.</div>;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Daily Limit Reached</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            You have reached the maximum number of allowed today.{" "}
            <a href="#">Upgrade your account</a> or wait until the next 24 hours
            for the limit to reset.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </DialogClose>
            <Button>Upgrade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="space-y-4 overflow-x-auto">
        <div className="flex items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Columns
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="max-h-80 overflow-auto"
            >
              {table.getAllLeafColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(Boolean(v))}
                >
                  {String(column.id)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Input
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        /> */}
        </div>

        <div className="rounded-md border">
          <Table className="min-w-max text-sm">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
                    className="text-center p-4"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center gap-2">
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
            onClick={() => {
              table.nextPage();
              checkDailyLimit().then((data) => {
                console.log(data);
                setRemaining(data.remaining);
              });
            }}
            disabled={!table.getCanNextPage() || open || remaining <= 0}
          >
            Next
          </Button>

          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} /{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </>
  );
}
