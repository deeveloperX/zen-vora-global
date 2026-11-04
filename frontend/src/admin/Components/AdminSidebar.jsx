import { NavLink, useNavigate } from "react-router";
import {
  HiHome,
  HiDocumentText,
  HiCog,
  HiStar,
  HiQuestionMarkCircle,
  HiShieldCheck,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

export default function AdminSidebar({ isCollapsed, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/admin', { replace: true });
  };
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-transparent border-end position-relative"
      style={{
        width: isCollapsed ? "80px" : "280px",
        minHeight: "100vh",
        transition: "width 0.3s ease",
      }}
    >
      {/* Brand Header & Toggle */}
      {/* Brand Header & Toggle */}
      <div className={`d-flex align-items-center mb-4 px-2 pt-2 ${isCollapsed ? 'justify-content-center flex-column gap-3' : 'justify-content-between'}`}>
        {!isCollapsed ? (
          <div className="d-flex align-items-center overflow-hidden">
            <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3 me-2 fw-bold fs-5 flex-shrink-0">
              ZV
            </div>
            <div>
              <span className="fs-5 fw-bold text-dark d-block text-truncate">Admin</span>
              <small className="text-muted text-truncate d-block" style={{ fontSize: '11px' }}>ZenVora Global</small>
            </div>
          </div>
        ) : (
          <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3 fw-bold fs-5 text-center">
            ZV
          </div>
        )}
        
        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar} 
          className="btn btn-light border btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center shadow-sm"
          style={{ width: '32px', height: '32px', flexShrink: 0 }}
          title="Toggle Sidebar"
        >
          {isCollapsed ? <HiChevronRight className="fs-5" /> : <HiChevronLeft className="fs-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="nav nav-pills flex-column mb-auto gap-1">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            end
            className="nav-link admin-sidebar-link"
          >
           
            <HiHome className={`fs-5 ${!isCollapsed ? 'me-3' : ''}`} />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/dashboard/blogs"
            className="nav-link admin-sidebar-link"
          >
            
            <HiDocumentText className={`fs-5 ${!isCollapsed ? 'me-3' : ''}`} />
            {!isCollapsed && <span> Blog Management </span>}
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/dashboard/services"
            className="nav-link admin-sidebar-link"
          >
            
            <HiCog className={`fs-5 ${!isCollapsed ? 'me-3' : ''}`} />
            {!isCollapsed && <span> Service Management </span>}
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/dashboard/highlights"
            className="nav-link admin-sidebar-link"
          >
            
            <HiStar className={`fs-5 ${!isCollapsed ? 'me-3' : ''}`} />
            {!isCollapsed && <span> Website Highlights </span>}
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/dashboard/faqs"
            className="nav-link admin-sidebar-link"
          >
            
            <HiQuestionMarkCircle className={`fs-5 ${!isCollapsed ? 'me-3' : ''}`} />
            {!isCollapsed && <span> FAQ Management </span>}
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/dashboard/legal"
            className="nav-link admin-sidebar-link"
          >
            
            <HiShieldCheck className={`fs-5 ${!isCollapsed ? 'me-3' : ''}`} />
            {!isCollapsed && <span> Legal Documents </span>}
          </NavLink>
        </li>
      </ul>

      {/* Footer User Info / Status inside sidebar */}
      {/* Footer User Info / Status */}
      <div className="pt-3 border-top mt-auto">
        <div
          className={`d-flex align-items-center p-2 bg-light rounded-3 ${isCollapsed ? "justify-content-center" : ""}`}
        >
          
          {!isCollapsed && (
           <button 
            onClick={handleLogout} 
            className="btn btn-outline-danger btn-sm px-3 fw-semibold w-100"
          >
            Logout
          </button>
          )}
        </div>
      </div>
    </div>
  );
}
