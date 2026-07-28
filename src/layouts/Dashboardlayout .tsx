import React from "react";
import { COLORS } from "../layouts/AuthLayout";
import Sidebar, { SidebarPage } from "../components/Sidebar";
import NavbarDashboard from "../components/Navbardashboard";

interface DashboardLayoutProps {
  active: SidebarPage;
  children: React.ReactNode;
  userName?: string;
  userRole?: string;
  userInitials?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
                                                           active,
                                                           children,
                                                         }) => {
  return (
    <div className="flex min-h-screen" style={{ background: COLORS.bg }}>
      <Sidebar active={active} />

      <div className="flex-1 min-w-0">
        <NavbarDashboard />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
