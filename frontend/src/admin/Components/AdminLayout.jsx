import {useEffect, useState} from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import AdminSidebar from "./AdminSidebar";
import { AUTH_API_URL } from "../authApi";

export default function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sessionStatus, setSessionStatus] = useState(() =>
    localStorage.getItem("token") ? "checking" : "unauthenticated",
  );
  const [retryCount, setRetryCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const verifySession = async () => {
      try {
        const response = await fetch(`${AUTH_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          if (active) setSessionStatus("unauthenticated");
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to verify your admin session.");
        }

        const data = await response.json();
        if (data.user?.role !== "admin") {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          if (active) setSessionStatus("unauthenticated");
          return;
        }

        if (active) setSessionStatus("authenticated");
      } catch {
        if (active) setSessionStatus("error");
      }
    };

    verifySession();

    return () => {
      active = false;
    };
  }, [retryCount]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (sessionStatus === "unauthenticated") {
    return (
      <Navigate
        to="/admin"
        replace
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        }}
      />
    );
  }

  if (sessionStatus === "checking") {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center" role="status">
          <span className="spinner-border text-primary" aria-hidden="true"></span>
          <p className="text-muted mt-3 mb-0">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  if (sessionStatus === "error") {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center p-3">
        <div className="text-center">
          <p className="text-danger">Unable to verify your admin session. Check your connection and try again.</p>
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => {
              setSessionStatus("checking");
              setRetryCount((count) => count + 1);
            }}
          >
            Retry
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userRole");
              setSessionStatus("unauthenticated");
            }}
          >
            Go to login
          </button>
        </div>
      </div>
    );
  }

  return (
<div className="d-flex min-vh-100 bg-light">
      {/* Sidebar Component with props */}
      <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column">
        <main className="p-4 flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>  );
}
