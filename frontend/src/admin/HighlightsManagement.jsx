import { useState, useEffect } from "react";
import { FiGlobe, FiShield, FiTruck, FiTrendingUp } from "react-icons/fi";
import { BsHeadset } from "react-icons/bs";
import { getHighlights, updateHighlight } from "../api/highlights";

const iconMap = {
  FiGlobe: FiGlobe,
  FiShield: FiShield,
  FiTruck: FiTruck,
  BsHeadset: BsHeadset,
  FiTrendingUp: FiTrendingUp,
};

export default function HighlightsManagement() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", subtitle: "", icon: "FiGlobe" });
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
        setError("Failed to load highlights from the server.");
        setLoading(false);
      });
  }, []);

  const openEdit = (highlight) => {
    setEditingId(highlight.id);
    setFormData({ 
      title: highlight.title, 
      subtitle: highlight.subtitle, 
      icon: highlight.icon || "FiGlobe" 
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const updatedItem = await updateHighlight(editingId, formData);

      const nextHighlights = highlights.map((highlight) =>
        highlight.id === editingId ? { ...highlight, ...updatedItem } : highlight,
      );

      setHighlights(nextHighlights);
      setEditingId(null);
      setNotice("Highlight updated successfully in MongoDB!");
      setTimeout(() => setNotice(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error saving highlight changes.");
      setTimeout(() => setError(""), 4000);
    }
  };

  if (loading) return <div className="p-4 text-muted">Loading highlights...</div>;

  return (
    <div className="container-fluid p-0">
      <div className="mb-4">
        <p className="text-uppercase text-secondary small fw-bold mb-1">
          Website content
        </p>
        <h1 className="h3 fw-bold text-dark mb-1">Website highlights</h1>
        <p className="text-muted small mb-0">
          Manage the five benefit highlights displayed across the home page (stored in MongoDB).
        </p>
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

      {highlights.length === 0 ? (
        <div className="alert alert-warning">
          No highlights found in the database. Please run your backend seed script (`npm run seed:highlights`)!
        </div>
      ) : (
        <div className="d-grid gap-2">
          {highlights.map((highlight) => {
            const Icon = iconMap[highlight.icon] || FiGlobe;

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
                    <Icon size={22} aria-hidden="true" />
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
      )}

      {/* Edit Modal */}
      {editingId !== null && (
        <div
          className="modal show d-block"
          role="dialog"
          aria-modal="true"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <form onSubmit={handleSave}>
                <div className="modal-header">
                  <h2 className="modal-title h5 fw-bold">Edit highlight</h2>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditingId(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4">
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
                    value={formData.icon}
                    onChange={(event) =>
                      setFormData({ ...formData, icon: event.target.value })
                    }
                  >
                    <option value="FiGlobe">Globe (Global Market)</option>
                    <option value="FiShield">Shield (Secure & Reliable)</option>
                    <option value="FiTruck">Truck (Fast Shipping)</option>
                    <option value="BsHeadset">Headset (Dedicated Support)</option>
                    <option value="FiTrendingUp">Trending Up (Grow Business)</option>
                  </select>
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