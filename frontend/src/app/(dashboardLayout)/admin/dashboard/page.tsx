import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDashboardData } from "../../../../services/dashboard.service";
import { ApiResponse } from "../../../../types/api.types";
import { IAdminDashboardData } from "../../../../types/dashboard.types";
import AdminDashboardContent from "../../../../components/modules/Dashboard/AdminDashboardContent";

export default async function AdminDashboardPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["admin-dashboard-data"],
        queryFn: getDashboardData,
        staleTime: 30 * 1000, // 30 seconds - data stays fresh if this data is accessed again within 30 seconds, it will use the cached data instead of making a new request
        gcTime: 5 * 60 * 1000, // 5 minutes - garbage collection time, after this time the cached data will be removed from memory if it's not used
    });

    const dashboardData = queryClient.getQueryData([
        "admin-dashboard-data",
    ]) as ApiResponse<IAdminDashboardData>;

    console.log(dashboardData.data, "Dashboard Data from Page Component");
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AdminDashboardContent />
        </HydrationBoundary>
    );
}
