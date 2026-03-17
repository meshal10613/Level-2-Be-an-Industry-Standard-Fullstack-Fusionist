import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    Eye,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import Loading from "../Loading/Loading";
import DataTableFilters, {
    DataTableFilterConfig,
    DataTableFilterValue,
    DataTableFilterValues,
} from "./DataTableFilters";
import { PaginationMeta } from "../../../types/api.types";
import DataTableSearch from "./DataTableSearch";
import DataTablePagination from "./DataTablePagination";

interface DataTableActions<TData> {
    onView?: (data: TData) => void;
    onEdit?: (data: TData) => void;
    onDelete?: (data: TData) => void;
}

interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    actions?: DataTableActions<TData>;
    toolbarAction?: React.ReactNode;
    emptyMessage?: string;
    isLoading?: boolean;
    sorting?: {
        state: SortingState;
        onSortingChange: (state: SortingState) => void;
    };
    pagination?: {
        state: PaginationState;
        onPaginationChange: (state: PaginationState) => void;
    };
    search?: {
        initialValue?: string;
        placeholder?: string;
        debounceMs?: number;
        onDebouncedChange: (value: string) => void;
    };
    filters?: {
        configs: DataTableFilterConfig[];
        values: DataTableFilterValues;
        onFilterChange: (
            filterId: string,
            value: DataTableFilterValue | undefined,
        ) => void;
        onClearAll?: () => void;
    };
    meta?: PaginationMeta;
}

export default function DataTable<TData>({
    data = [] as TData[],
    columns,
    actions,
    emptyMessage,
    isLoading,
    sorting,
    pagination,
    search,
    filters,
    meta,
}: DataTableProps<TData>) {
    const tableColumns: ColumnDef<TData>[] = actions
        ? [
              ...columns,
              {
                  id: "actions",
                  header: "Actions",
                  cell: ({ row }) => {
                      const rowData = row.original;
                      return (
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button
                                      variant="ghost"
                                      className="h-8 w-8 p-0 flex items-center justify-center"
                                  >
                                      <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                  align="end"
                                  className="w-37.5"
                              >
                                  {actions.onView && (
                                      <DropdownMenuItem
                                          onClick={() =>
                                              actions.onView?.(rowData)
                                          }
                                          className="flex items-center gap-2 cursor-pointer"
                                      >
                                          <Eye className="h-4 w-4" />
                                          View
                                      </DropdownMenuItem>
                                  )}

                                  {actions.onEdit && (
                                      <DropdownMenuItem
                                          onClick={() =>
                                              actions.onEdit?.(rowData)
                                          }
                                          className="flex items-center gap-2 cursor-pointer"
                                      >
                                          <Pencil className="h-4 w-4" />
                                          Edit
                                      </DropdownMenuItem>
                                  )}

                                  {actions.onDelete && (
                                      <DropdownMenuItem
                                          onClick={() =>
                                              actions.onDelete?.(rowData)
                                          }
                                          className="flex items-center gap-2 cursor-pointer"
                                      >
                                          <Trash2 className="h-4 w-4" />
                                          Delete
                                      </DropdownMenuItem>
                                  )}
                              </DropdownMenuContent>
                          </DropdownMenu>
                      );
                  },
              },
          ]
        : columns;

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualSorting: !!sorting,
        manualPagination: !!pagination,
        pageCount: pagination ? Math.max(meta?.totalPages ?? 0, 0) : undefined,
        state: {
            ...(sorting ? { sorting: sorting.state } : {}),
            ...(pagination ? { pagination: pagination.state } : {}),
        },
        onSortingChange: sorting
            ? (updater) => {
                  const currentSortingState = sorting.state;
                    const nextSortingState =
                        typeof updater === "function"
                            ? updater(currentSortingState)
                            : updater;

                    sorting.onSortingChange(nextSortingState);
              }
            : undefined,
        onPaginationChange: pagination
            ? (updater) => {
                  const currentPaginationState = pagination.state;
                  const nextPaginationState =
                      typeof updater === "function"
                          ? updater(currentPaginationState)
                          : updater;

                  pagination.onPaginationChange(nextPaginationState);
              }
            : undefined,
    });

    return (
        <div className="relative">
            {isLoading && <Loading />}

            {(search || filters) && (
                <div className="mb-4 flex flex-wrap items-start gap-3">
                    {search && (
                        <DataTableSearch
                            key={search.initialValue ?? ""}
                            initialValue={search.initialValue}
                            placeholder={search.placeholder}
                            debounceMs={search.debounceMs}
                            onDebouncedChange={search.onDebouncedChange}
                            isLoading={isLoading}
                        />
                    )}

                    {filters && (
                        <DataTableFilters
                            filters={filters.configs}
                            values={filters.values}
                            onFilterChange={filters.onFilterChange}
                            onClearAll={filters.onClearAll}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            )}

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                            <Button
                                                variant={"ghost"}
                                                className="h-auto cursor-pointer p-0 font-semibold hover:bg-transparent hover:text-inherit focus-visible:ring-0"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}

                                                {header.column.getIsSorted() ===
                                                "asc" ? (
                                                    <ArrowUp className="ml-1 h-4 w-4" />
                                                ) : header.column.getIsSorted() ===
                                                  "desc" ? (
                                                    <ArrowDown className="ml-1 h-4 w-4" />
                                                ) : (
                                                    <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                                                )}
                                            </Button>
                                        ) : (
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel()?.rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
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
                                    colSpan={tableColumns.length}
                                    className="h-24 text-center"
                                >
                                    {emptyMessage || "No data available."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {pagination && (
                    <DataTablePagination
                        table={table}
                        totalPages={meta?.totalPages}
                        totalRows={meta?.total}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
}
