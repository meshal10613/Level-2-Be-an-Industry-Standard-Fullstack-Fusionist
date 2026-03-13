import { ColumnDef } from "@tanstack/react-table";

interface DataTableActions<TData> {
    onView?: (data: TData) => void;
    onEdit?: (data: TData) => void;
    onDelete?: (data: TData) => void;
}

interface DataTableProps<TData> {
    data: TData[];
    colums: ColumnDef<TData>[];
    actions?: DataTableActions<TData>;
    emptyMessage?: string;
    isLoading?: boolean;
}

export default function DataTable<TData>({
    data,
    colums,
    actions,
    emptyMessage,
    isLoading,
}: DataTableProps<TData>) {
    return (
        <div>
            <h1>This is Table Page</h1>
        </div>
    );
}
