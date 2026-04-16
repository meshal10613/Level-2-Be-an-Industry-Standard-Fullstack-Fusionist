import DashboardSideBar from "../../components/modules/Dashboard/DashboardSideBar";
import DashboardNavbar from "../../components/modules/Dashboard/DashboardNavbar";

export default function RootDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Dashbaord Sidebar */}
            <DashboardSideBar />

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Dashboard Navbar */}
                <DashboardNavbar />

                {/* Dashbaord Content */}
                <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
                    <div>{children}</div>
                </main>
            </div>
        </div>
    );
}
