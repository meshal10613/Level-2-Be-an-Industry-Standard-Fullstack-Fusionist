import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDoctors } from "../../../../../services/doctor.service";
import DoctorsTable from "../../../../../components/modules/Admin/DoctorsTable";

export default async function DoctorsManagementPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors,
        staleTime: 1000 * 60 * 60, // 1 hour
        gcTime: 1000 * 60 * 60 * 6, // 1 hour
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DoctorsTable />
        </HydrationBoundary>
    );
}
