import { useState } from "react";
import { featuresData } from "../data/FeaturesData";
import { readAdminContent, writeAdminContent } from "../data/AdminContent";

const HIGHLIGHTS_STORAGE_KEY = "zenvora-admin-highlights";
const initialHighlights = featuresData.map((feature) => ({
  id: feature.id,
  title: feature.title,
  subtitle: feature.subtitle,
}));

export default function HighlightsManagement() {
  const [highlights, setHighlights] = useState(() =>
    readAdminContent(HIGHLIGHTS_STORAGE_KEY, initialHighlights),
  );
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", subtitle: "" });
  const [notice, setNotice] = useState("");

  const openEdit = (highlight) => {
    setEditingId(highlight.id);
    setFormData({ title: highlight.title, subtitle: highlight.subtitle });
  };

  const saveHighlight = (event) => {
    event.preventDefault();
    const nextHighlights = highlights.map((highlight) =>
      highlight.id === editingId ? { ...highlight, ...formData } : highlight,
    );
    setHighlights(nextHighlights);
    writeAdminContent(HIGHLIGHTS_STORAGE_KEY, nextHighlights);
    setEditingId(null);
    setNotice("Highlight changes saved in this browser.");
  };

  return (
    <div className="container-fluid p-0">
      <div className="mb-4">
        <p className="text-uppercase text-secondary small fw-bold mb-1">
          Website content
        </p>
        <h1 className="h3 fw-bold text-dark mb-1">Website highlights</h1>
        <p className="text-muted small mb-0">
          Manage the five benefit highlights displayed across the home page.
        </p>
      </div>

      {notice && (
        <div className="alert alert-success py-2" role="status">
          {notice}
        </div>
      )}
      <div className="d-grid gap-2">
        {highlights.map((highlight) => {
          const Icon = featuresData.find(
            (feature) => feature.id === highlight.id,
          )?.icon;
          return (
            <div
              className="card border-0 shadow-sm rounded-3"
              key={highlight.id}
            >
              <div className="card-body d-flex align-items-center gap-3">
                <div
                  className="bg-warning bg-opacity-10 text-warning rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 48, height: 48 }}
                >
                  {Icon && <Icon size={22} aria-hidden="true" />}
                </div>
                <div className="flex-grow-1 min-w-0">
                  <h2 className="h6 fw-bold mb-1">{highlight.title}</h2>
                  <p className="text-muted small mb-0">{highlight.subtitle}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => openEdit(highlight)}
                  aria-label={`Edit ${highlight.title}`}
                >
                  <i className="bi bi-pencil me-sm-1" aria-hidden="true"></i>
                  <span className="d-none d-sm-inline">Edit</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingId !== null && (
        <div
          className="modal show d-block"
          role="dialog"
          aria-modal="true"
          aria-labelledby="highlight-modal-title"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <form onSubmit={saveHighlight}>
                <div className="modal-header">
                  <h2
                    id="highlight-modal-title"
                    className="modal-title h5 fw-bold"
                  >
                    Edit highlight
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditingId(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <label
                    htmlFor="highlight-title"
                    className="form-label fw-semibold"
                  >
                    Title
                  </label>
                  <input
                    id="highlight-title"
                    className="form-control mb-3"
                    value={formData.title}
                    onChange={(event) =>
                      setFormData({ ...formData, title: event.target.value })
                    }
                    required
                  />
                  <label
                    htmlFor="highlight-subtitle"
                    className="form-label fw-semibold"
                  >
                    Subtitle
                  </label>
                  <input
                    id="highlight-subtitle"
                    className="form-control"
                    value={formData.subtitle}
                    onChange={(event) =>
                      setFormData({ ...formData, subtitle: event.target.value })
                    }
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark">
                    Save highlight
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
