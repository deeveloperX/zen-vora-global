import { NavLink } from "react-router";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
      {/* Brand Header */}
      <a
        href="/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none px-2"
      >
        <span className="fs-4 fw-bold">ZenVora Admin</span>
      </a>

      <hr className="bg-secondary" />

      {/* Navigation Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        {/* Dashboard Home Link */}
        <li className="nav-item mb-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active bg-primary" : ""}`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink
            to="/dashboard/blogs"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active bg-primary" : ""}`
            }
          >
            <i className="bi bi-journal-text me-2"></i> Blog Management
          </NavLink>
        </li>
        <li className="nav-item mb-1">
          <NavLink
            to="/dashboard/services"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active bg-primary" : ""}`
            }
          >
            <i className="bi bi-gear me-2"></i> Service Management
          </NavLink>
        </li>
        <li className="nav-item mb-1">
          <NavLink
            to="/dashboard/highlights"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active bg-primary" : ""}`
            }
          >
            <i className="bi bi-stars me-2"></i> Website Highlights
          </NavLink>
        </li>
        <li className="nav-item mb-1">
          <NavLink
            to="/dashboard/faqs"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active bg-primary" : ""}`
            }
          >
            <i className="bi bi-question-circle me-2"></i> FAQ Management
          </NavLink>
        </li>
        <li className="nav-item mb-1">
          <NavLink
            to="/dashboard/legal"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active bg-primary" : ""}`
            }
          >
            <i className="bi bi-file-earmark-text me-2"></i> Legal Documents
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
