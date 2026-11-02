import { Link } from "react-router";

export default function DashboardHome() {
  return (
    <div className="container-fluid p-0">
      {/* Welcome Banner */}
      <div className="card bg-primary text-white shadow-sm border-0 mb-4 rounded-3">
        <div className="card-body p-4 p-md-5">
          <h1 className="fw-bold fs-3 mb-2">Welcome to ZenVora CMS 🚀</h1>
          <p className="mb-0 text-white-50">
            Manage your website content from one place.
          </p>
        </div>
      </div>

      {/* Quick Statistics Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl">
          <div className="card border-0 shadow-sm h-100 rounded-3">
            <div className="card-body d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-3 me-3 fs-3">
                📝
              </div>
              <div>
                <h6 className="text-muted small mb-1">Blog Posts</h6>
                <h4 className="fw-bold mb-0">Manage</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl">
          <div className="card border-0 shadow-sm h-100 rounded-3">
            <div className="card-body d-flex align-items-center">
              <div className="bg-success bg-opacity-10 text-success p-3 rounded-3 me-3 fs-3">
                🛠️
              </div>
              <div>
                <h6 className="text-muted small mb-1">Services</h6>
                <h4 className="fw-bold mb-0">Update</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl">
          <div className="card border-0 shadow-sm h-100 rounded-3">
            <div className="card-body d-flex align-items-center">
              <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-3 me-3 fs-3">
                📄
              </div>
              <div>
                <h6 className="text-muted small mb-1">Legal Docs</h6>
                <h4 className="fw-bold mb-0">Compliance</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl">
          <div className="card border-0 shadow-sm h-100 rounded-3">
            <div className="card-body d-flex align-items-center">
              <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-3 me-3 fs-3">
                <i className="bi bi-question-circle" aria-hidden="true"></i>
              </div>
              <div>
                <h6 className="text-muted small mb-1">FAQs</h6>
                <h4 className="fw-bold mb-0">Manage</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl">
          <div className="card border-0 shadow-sm h-100 rounded-3">
            <div className="card-body d-flex align-items-center">
              <div className="bg-info bg-opacity-10 text-info p-3 rounded-3 me-3 fs-3">
                <i className="bi bi-stars" aria-hidden="true"></i>
              </div>
              <div>
                <h6 className="text-muted small mb-1">Highlights</h6>
                <h4 className="fw-bold mb-0">Manage</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-4">
          <h5 className="fw-bold text-dark mb-3">Quick Actions</h5>
          <div className="d-flex flex-wrap gap-3">
            <Link
              to="/dashboard/blogs"
              className="btn btn-dark px-4 py-2 fw-semibold"
            >
              Manage Blog Posts
            </Link>
            <Link
              to="/dashboard/services"
              className="btn btn-outline-secondary px-4 py-2 fw-semibold"
            >
              Manage Services
            </Link>
            <Link
              to="/dashboard/faqs"
              className="btn btn-outline-secondary px-4 py-2 fw-semibold"
            >
              Manage FAQs
            </Link>
            <Link
              to="/dashboard/highlights"
              className="btn btn-outline-secondary px-4 py-2 fw-semibold"
            >
              Manage Highlights
            </Link>
            <Link
              to="/dashboard/legal"
              className="btn btn-outline-secondary px-4 py-2 fw-semibold"
            >
              Manage Legal Documents
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
