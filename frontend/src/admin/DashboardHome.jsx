import React from "react";
import { Link } from "react-router";
import { HiDocumentText, HiCog, HiShieldCheck } from "react-icons/hi";

export default function DashboardHome() {
  return (
    <div className="container-fluid px-0">
      {/* Modern Welcome Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">Dashboard Overview</h2>
          <p className="text-muted small mb-0">
            Welcome back, Admin. Here is a quick snapshot of your CMS modules.
          </p>
        </div>
        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold">
          <i className="bi bi-shield-lock-fill me-1"></i> Secure Session Active
        </span>
      </div>

      {/* Grid of Modules */}
      <div className="row g-4 mb-4">
        {/* Blog Card */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 hover-shadow transition">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-4 fs-4 d-flex align-items-center justify-content-center">
                    <HiDocumentText />
                  </div>
                  <span className="badge bg-light text-secondary border">
                    Content
                  </span>
                </div>
                <h5 className="fw-bold text-dark mb-1">Blog Posts</h5>
                <p className="text-muted small mb-4">
                  Manage, publish, and edit articles and announcements for your
                  visitors.
                </p>
              </div>
              <Link
                to="/dashboard/blogs"
                className="btn btn-outline-primary w-100 fw-semibold rounded-3 py-2"
              >
                Manage Blogs <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Services Card */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 hover-shadow transition">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="bg-success bg-opacity-10 text-success p-3 rounded-4 fs-4 d-flex align-items-center justify-content-center">
                    <HiCog />
                  </div>
                  <span className="badge bg-light text-secondary border">
                    Offerings
                  </span>
                </div>
                <h5 className="fw-bold text-dark mb-1">Services</h5>
                <p className="text-muted small mb-4">
                  Update business solutions, package descriptions, pricing, and
                  features.
                </p>
              </div>
              <Link
                to="/dashboard/services"
                className="btn btn-outline-success w-100 fw-semibold rounded-3 py-2"
              >
                Manage Services <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Documents Card */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 hover-shadow transition">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-4 fs-4 d-flex align-items-center justify-content-center">
                    <HiShieldCheck />
                  </div>
                  <span className="badge bg-light text-secondary border">
                    Compliance
                  </span>
                </div>
                <h5 className="fw-bold text-dark mb-1">Legal Documents</h5>
                <p className="text-muted small mb-4">
                  Review and modify terms and conditions, privacy policies, and
                  agreements.
                </p>
              </div>
              <Link
                to="/dashboard/legal"
                className="btn btn-outline-warning text-dark w-100 fw-semibold rounded-3 py-2"
              >
                Manage Legal <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
