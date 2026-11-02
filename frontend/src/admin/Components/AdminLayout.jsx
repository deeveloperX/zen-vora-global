import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  return (
    <div className="admin-layout d-flex flex-column flex-md-row bg-light min-vh-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <AdminHeader />
        <main className="p-3 p-lg-4 flex-grow-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
