"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../../../app/(commonLayout)/consultation/_actions";
import Link from "next/link";

export default function DoctorList() {
    const { data } = useQuery({
        queryKey: ["doctors"],
        queryFn: () => getDoctors(),
    });

    //non-prefetched query example
    // const { data: nonPrefetchedData } = useQuery({
    //     queryKey: ["doctors-non-prefetched"],
    //     queryFn: () => getDoctors(),
    // });

    // console.log(nonPrefetchedData);

    return (
        <div>
            {data?.data.map((doctor: any) => (
                <Link href={`/consultation/doctor/${doctor.id}`} key={doctor.id}>{doctor.name}</Link>
            ))}
        </div>
    );
}
