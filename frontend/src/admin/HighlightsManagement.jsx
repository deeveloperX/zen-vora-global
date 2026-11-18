import { useState, useEffect } from "react";
import HighlightIcon from "../Components/HighlightIcon";
import {
  createHighlight,
  deleteHighlight,
  getHighlights,
  updateHighlight,
} from "../api/highlights";
import IconUploadField from "./Components/IconUploadField";

export default function HighlightsManagement() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", subtitle: "", icon: "FiGlobe" });
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getHighlights()
      .then((data) => {
        if (data && Array.isArray(data)) {
          setHighlights(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching highlights:", err);
        setError(`Failed to load highlights from the server: ${err.message}`);
        setLoading(false);
      });
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({ title: "", subtitle: "", icon: "FiGlobe" });
    setError("");
    setShowModal(true);
  };

  const openEdit = (highlight) => {
    setEditingId(highlight.id);
    setFormData({ 
      title: highlight.title, 
      subtitle: highlight.subtitle, 
      icon: highlight.icon || "FiGlobe" 
    });
    setError("");
    setShowModal(true);
  };

  const isCustomIcon = formData.icon.startsWith("data:image/");

  const handleSave = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");

    try {
      if (editingId === null) {
        const newHighlight = await createHighlight(formData);
        setHighlights((items) => [...items, newHighlight].sort((a, b) => a.id - b.id));
        setNotice("Highlight created.");
      } else {
        const updatedItem = await updateHighlight(editingId, formData);
        setHighlights((items) =>
          items.map((highlight) =>
            highlight.id === editingId ? { ...highlight, ...updatedItem } : highlight,
          ),
        );
        setNotice("Highlight updated.");
      }

      setShowModal(false);
    } catch (err) {
      setError(err.message || "Error saving highlight changes.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (highlight) => {
    if (!window.confirm(`Are you sure you want to delete "${highlight.title}"?`)) {
      return;
    }

    setDeletingId(highlight.id);
    setError("");
    setNotice("");

    try {
      await deleteHighlight(highlight.id);
      setHighlights((items) => items.filter((item) => item.id !== highlight.id));
      setNotice("Highlight deleted.");
    } catch (err) {
      setError(err.message || "Error deleting highlight.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="p-4 text-muted">Loading highlights...</div>;

  return (
    <div className="container-fluid p-0">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p className="text-uppercase text-secondary small fw-bold mb-1">
            Website content
          </p>
          <h1 className="h3 fw-bold text-dark mb-1">Website highlights</h1>
          <p className="text-muted small mb-0">
            Manage the benefit highlights and icons displayed on the home page.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="btn btn-dark fw-semibold px-3"
        >
          <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
          Add Highlight
        </button>
      </div>

      {notice && (
        <div className="alert alert-success py-2" role="status">
          {notice}
        </div>
      )}

      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}

      {!error && highlights.length === 0 && (
        <div className="alert alert-warning">
          No highlights found in the database. Please run your backend seed script (`npm run seed:highlights`)!
        </div>
      )}
      {highlights.length > 0 && (
        <div className="d-grid gap-2">
          {highlights.map((highlight) => {
            return (
              <div
                className="card border-0 shadow-sm rounded-3"
                key={highlight.id || highlight._id}
              >
                <div className="card-body d-flex align-items-center gap-3">
                  <div
                    className="bg-warning bg-opacity-10 text-warning rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: 48, height: 48 }}
                  >
                    <HighlightIcon name={highlight.icon} />
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
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(highlight)}
                    disabled={deletingId === highlight.id}
                    aria-label={`Delete ${highlight.title}`}
                  >
                    {deletingId === highlight.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div
          className="modal show d-block"
          role="dialog"
          aria-modal="true"
          aria-labelledby="highlight-modal-title"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <form onSubmit={handleSave}>
                <div className="modal-header">
                  <h2 id="highlight-modal-title" className="modal-title h5 fw-bold">
                    {editingId === null ? "Add highlight" : "Edit highlight"}
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                    disabled={submitting}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  {error && (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  )}
                  <label htmlFor="highlight-title" className="form-label fw-semibold">
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

                  <label htmlFor="highlight-subtitle" className="form-label fw-semibold">
                    Subtitle
                  </label>
                  <input
                    id="highlight-subtitle"
                    className="form-control mb-3"
                    value={formData.subtitle}
                    onChange={(event) =>
                      setFormData({ ...formData, subtitle: event.target.value })
                    }
                    required
                  />

                  <label htmlFor="highlight-icon" className="form-label fw-semibold">
                    Icon Selection
                  </label>
                  <select
                    id="highlight-icon"
                    className="form-select"
                    value={isCustomIcon ? "custom" : formData.icon}
                    onChange={(event) => {
                      if (event.target.value !== "custom") {
                        setFormData({ ...formData, icon: event.target.value });
                      }
                    }}
                  >
                    {isCustomIcon && <option value="custom">Uploaded custom icon</option>}
                    <option value="FiGlobe">Globe (Global Market)</option>
                    <option value="FiShield">Shield (Secure & Reliable)</option>
                    <option value="FiTruck">Truck (Fast Shipping)</option>
                    <option value="BsHeadset">Headset (Dedicated Support)</option>
                    <option value="FiTrendingUp">Trending Up (Grow Business)</option>
                  </select>
                  <IconUploadField
                    id="highlight-custom-icon"
                    value={formData.icon}
                    onChange={(icon) => {
                      setError("");
                      setFormData((current) => ({ ...current, icon }));
                    }}
                    onError={setError}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowModal(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark" disabled={submitting}>
                    {submitting
                      ? "Saving..."
                      : editingId === null
                        ? "Add highlight"
                        : "Save highlight"}
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