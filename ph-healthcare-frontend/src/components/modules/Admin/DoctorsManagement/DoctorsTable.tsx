"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { getDoctors } from "../../../../services/doctor.service";

export default function DoctorsManagementPage() {
    const doctorColumns = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "designation", header: "Designation" },
        {
            accessorKey: "specialties",
            header: "Specialization",
            cell: ({
                getValue,
            }: {
                getValue: () => {
                    specialty: { title: string; isDeleted: boolean };
                }[];
            }) =>
                getValue()
                    ?.filter((s) => !s.specialty.isDeleted)
                    .map((s) => s.specialty.title)
                    .join(", ") ?? "—",
        },
        { accessorKey: "experience", header: "Experience" },
        { accessorKey: "averageRating", header: "Rating" },
        { accessorKey: "appointmentFee", header: "Appointment Fee" },
    ];

    const { data: doctorDataResponse } = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors,
    });

    const { data: doctors } = doctorDataResponse! || [];

    // eslint-disable-next-line react-hooks/incompatible-library
    const { getHeaderGroups, getRowModel } = useReactTable({
        data: doctors ?? [],
        columns: doctorColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    // console.log(doctorDataResponse?.data.map(doctor => doctor.name));

    console.log(doctorDataResponse);
    return (
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
                {getRowModel().rows.map((row) => (
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
                ))}
            </TableBody>
        </Table>
    );
}
