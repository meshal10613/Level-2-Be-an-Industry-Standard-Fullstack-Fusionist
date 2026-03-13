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
import DataTable from "../../../shared/table/DataTable";
import { IDoctor } from "../../../../types/doctor.types";
import { doctorColumns } from "./DoctorsColumn";

export default function DoctorsManagementPage() {
    // const doctorColumns = [
    //     { accessorKey: "name", header: "Name" },
    //     { accessorKey: "designation", header: "Designation" },
    //     {
    //         accessorKey: "specialties",
    //         header: "Specialization",
    //         cell: ({
    //             getValue,
    //         }: {
    //             getValue: () => {
    //                 specialty: { title: string; isDeleted: boolean };
    //             }[];
    //         }) =>
    //             getValue()
    //                 ?.filter((s) => !s.specialty.isDeleted)
    //                 .map((s) => s.specialty.title)
    //                 .join(", ") ?? "—",
    //     },
    //     { accessorKey: "experience", header: "Experience" },
    //     { accessorKey: "averageRating", header: "Rating" },
    //     { accessorKey: "appointmentFee", header: "Appointment Fee" },
    // ];

    // const { data: doctorDataResponse } = useQuery({
    //     queryKey: ["doctors"],
    //     queryFn: getDoctors,
    // });

    // const { data: doctors } = doctorDataResponse! || [];

    // // eslint-disable-next-line react-hooks/incompatible-library
    // const { getHeaderGroups, getRowModel } = useReactTable({
    //     data: doctors ?? [],
    //     columns: doctorColumns,
    //     getCoreRowModel: getCoreRowModel(),
    // });

    // console.log(doctorDataResponse?.data.map(doctor => doctor.name));

    // console.log(doctorDataResponse);

    const { data: doctorDataResponse, isLoading } = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors,
    });

    const { data: doctors } = doctorDataResponse! || [];

    const handleView = (doctor: IDoctor) => {
        console.log("View doctor", doctor);
    };

    const handleEdit = (doctor: IDoctor) => {
        console.log("Edit doctor", doctor);
    };

    const handleDelete = (doctor: IDoctor) => {
        console.log("Delete doctor", doctor);
    };

    return (
        <DataTable
            data={doctors}
            columns={doctorColumns}
            isLoading={isLoading}
            emptyMessage="No doctors found."
            actions={{
                onView: handleView,
                onEdit: handleEdit,
                onDelete: handleDelete,
            }}
        />
    );
}
