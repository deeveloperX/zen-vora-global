import { useState } from "react";
import { servicesData } from "../data/ServicesData";
import { readAdminContent, writeAdminContent } from "../data/AdminContent";

const SERVICE_STORAGE_KEY = "zenvora-admin-services";

export default function ServiceManagement() {
  const [services, setServices] = useState(() =>
    readAdminContent(SERVICE_STORAGE_KEY, servicesData),
  );

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  const initialFormState = {
    title: "",
    description: "",
    icon: "",
    image: "",
    price: "",
    features: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData(initialFormState);
    setShowModal(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (service) => {
    setIsEditing(true);
    setCurrentServiceId(service._id ?? service.id);
    setFormData({
      title: service.title || "",
      description: service.description || "",
      icon: typeof service.icon === "string" ? service.icon : "",
      image: service.image || "",
      price: service.price || "",
      // If features is stored as an array in backend, join with commas for the input field
      features: Array.isArray(service.features)
        ? service.features.join(", ")
        : service.features || "",
    });
    setShowModal(true);
  };

  // Submit form (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Process features into an array if user entered comma-separated values
    const payload = {
      ...formData,
      features: formData.features
        ? formData.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
        : [],
    };

    const nextServices = isEditing
      ? services.map((service) =>
          (service._id ?? service.id) === currentServiceId
            ? { ...service, ...payload }
            : service,
        )
      : [...services, { ...payload, id: `demo-${Date.now()}` }];
    setServices(nextServices);
    writeAdminContent(SERVICE_STORAGE_KEY, nextServices);
    setShowModal(false);
    setSubmitting(false);
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    const nextServices = services.filter(
      (service) => (service._id ?? service.id) !== id,
    );
    setServices(nextServices);
    writeAdminContent(SERVICE_STORAGE_KEY, nextServices);
  };

  return (
    <div className="container-fluid p-0">
      {/* Header section with Create Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Services Management</h2>
          <p className="text-muted small mb-0">
            Add, configure, and manage your offered business services.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn btn-dark fw-semibold px-3"
        >
          <i className="bi bi-plus-lg me-2"></i> Add New Service
        </button>
      </div>

      {/* Error Alert */}
      <div className="alert alert-info py-2 small">
        Sample services from the data folder. Changes are saved in this browser.
      </div>

      {/* Main Table Card */}
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-0">
          {services.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-0">
                No services found. Add your first service offering!
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-secondary small uppercase">
                  <tr>
                    <th className="py-3 ps-4">Service Title</th>
                    <th className="py-3">Description</th>
                    <th className="py-3">Price</th>
                    <th className="py-3 text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service._id ?? service.id}>
                      <td className="ps-4 fw-semibold text-dark">
                        {service.title}
                      </td>
                      <td
                        className="text-muted small text-truncate"
                        style={{ maxWidth: "350px" }}
                      >
                        {service.description}
                      </td>
                      <td className="fw-semibold text-success">
                        {service.price ? `$${service.price}` : "Custom"}
                      </td>
                      <td className="text-end pe-4">
                        <button
                          onClick={() => handleOpenEdit(service)}
                          className="btn btn-sm btn-outline-secondary me-2 px-2 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(service._id ?? service.id)
                          }
                          className="btn btn-sm btn-outline-danger px-2 py-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-3">
              <div className="modal-header border-bottom px-4 py-3">
                <h5 className="modal-title fw-bold">
                  {isEditing ? "Edit Service" : "Add New Service"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold small text-secondary">
                        Service Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-secondary">
                        Price / Rate
                      </label>
                      <input
                        type="text"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="e.g., 299 or Custom"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-secondary">
                        Icon Class / Name
                      </label>
                      <input
                        type="text"
                        name="icon"
                        className="form-control"
                        value={formData.icon}
                        onChange={handleInputChange}
                        placeholder="e.g., bi-laptop"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small text-secondary">
                        Image URL
                      </label>
                      <input
                        type="url"
                        name="image"
                        className="form-control"
                        value={formData.image}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small text-secondary">
                        Description
                      </label>
                      <textarea
                        name="description"
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small text-secondary">
                        Features (Comma-separated)
                      </label>
                      <input
                        type="text"
                        name="features"
                        className="form-control"
                        value={formData.features}
                        onChange={handleInputChange}
                        placeholder="e.g., 24/7 Support, Custom Integration, Fully Responsive"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top px-4 py-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-dark px-4 fw-semibold"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Saving..."
                      : isEditing
                        ? "Update Service"
                        : "Save Service"}
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
