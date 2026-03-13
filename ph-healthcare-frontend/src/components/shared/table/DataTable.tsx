import {
    ColumnDef,
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
import { MoreHorizontal } from "lucide-react";

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
        ? 	[
				...columns,
				{
					id: "actions",
					header: "Actions",
					cell: ({ row }) => {
						const rowData = row.original;
						return (
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Button
										variant={`ghost`}
										className="h-8 w8 p-0"
									>
										<span>Open Menu</span>
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>

								<DropdownMenuContent align="end">
									{actions.onView && (
										<DropdownMenuItem
											onClick={() =>
												actions.onView?.(rowData)
											}
										>
											View
										</DropdownMenuItem>
									)}

									{actions.onView && (
										<DropdownMenuItem
											onClick={() =>
												actions.onEdit?.(rowData)
											}
										>
											Edit
										</DropdownMenuItem>
									)}
									
									{actions.onView && (
										<DropdownMenuItem
											onClick={() =>
												actions.onDelete?.(rowData)
											}
										>
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
    });

    return (
        <div>
            <h1>This is Table Page</h1>
        </div>
    );
}
