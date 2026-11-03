import React, {useState} from "react";
import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
<div className="d-flex min-vh-100 bg-light">
      {/* Sidebar Component with props */}
      <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column">
        <AdminHeader />
        <main className="p-4 flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>  );
}
