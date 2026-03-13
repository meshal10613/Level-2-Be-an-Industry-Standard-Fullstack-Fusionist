import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import Loading from "../Loading/Loading";

interface DataTableActions<TData> {
    onView?: (data: TData) => void;
    onEdit?: (data: TData) => void;
    onDelete?: (data: TData) => void;
}

interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    actions?: DataTableActions<TData>;
    emptyMessage?: string;
    isLoading?: boolean;
}

export default function DataTable<TData>({
    data,
    columns,
    actions,
    emptyMessage,
    isLoading,
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
    const { getHeaderGroups, getRowModel } = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="relative">
            {isLoading && <Loading />}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        {getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {getRowModel().rows.length ? (
                            getRowModel().rows.map((row) => (
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
            </div>
        </div>
    );
}
