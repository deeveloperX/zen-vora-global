import { useNavigate } from 'react-router';

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <header className="navbar navbar-expand bg-white border-bottom shadow-sm px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center p-0">
        <span className="badge bg-light text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold">
          CMS Control Panel
        </span>

        <div className="d-flex align-items-center gap-3">
          <span className="text-secondary small fw-medium">ZenVora Admin</span>
          <button 
            onClick={handleLogout} 
            className="btn btn-outline-danger btn-sm px-3 fw-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}