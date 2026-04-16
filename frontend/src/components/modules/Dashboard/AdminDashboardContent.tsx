"use client";

import AppointmentBarChart from "@/components/shared/AppointmentBarChart";
import AppointmentPieChart from "@/components/shared/AppointmentPieChart";
import StatsCard from "@/components/shared/StatsCard";
import { getDashboardData } from "@/services/dashboard.service";
import { ApiResponse } from "@/types/api.types";
import { IAdminDashboardData } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

const AdminDashboardContent = () => {
    const { data: adminDashboardData } = useQuery({
        queryKey: ["admin-dashboard-data"],
        queryFn: getDashboardData,
        refetchOnWindowFocus: "always", // Refetch the data when the window regains focus
    });

    const { data } = adminDashboardData as ApiResponse<IAdminDashboardData>;
    console.log(data);
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <StatsCard
                    title="Total Appointments"
                    value={data?.appointmentCount || 0}
                    iconName="CalendarDays"
                    description="Number of appointments scheduled"
                />

                <StatsCard
                    title="Total Payments"
                    value={data?.paymentCount || 0}
                    iconName="CreditCard"
                    description="Number of payments received"
                />

                <StatsCard
                    title="Total Revenue"
                    value={data?.totalRevenue || 0}
                    iconName="DollarSign"
                    description="Total revenue generated"
                />

                <StatsCard
                    title="Total Users"
                    value={data?.userCount || 0}
                    iconName="Users"
                    description="Number of users registered"
                />

                <StatsCard
                    title="Total Patients"
                    value={data?.patientCount || 0}
                    iconName="User"
                    description="Number of patients registered"
                />

                <StatsCard
                    title="Total Doctors"
                    value={data?.doctorCount || 0}
                    iconName="Stethoscope"
                    description="Number of doctors registered"
                />

                <StatsCard
                    title="Total Admins"
                    value={data?.adminCount || 0}
                    iconName="ShieldCheck"
                    description="Number of admins registered"
                />

                <StatsCard
                    title="Total Super Admins"
                    value={data?.superAdminCount || 0}
                    iconName="Crown"
                    description="Number of super admins registered"
                />
            </div>

            <AppointmentBarChart data={data?.barChartData || []} />

            <AppointmentPieChart data={data?.pieChartData || []} />
        </div>
    );
};

export default AdminDashboardContent;
