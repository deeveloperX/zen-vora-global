import { useCallback, useEffect, useState } from "react";
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "../api/services";
import { serviceIconOptions } from "../data/ServiceIcons";

const initialFormState = {
  title: "",
  description: "",
  icon: "search",
  image: "",
  order: 0,
};

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setServices(await getServices());
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not load services.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const fetchServices = async () => {
      try {
        const items = await getServices();
        if (active) setServices(items);
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Could not load services.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchServices();
    return () => {
      active = false;
    };
  }, []);

  const openCreate = () => {
    setCurrentServiceId(null);
    setFormData({ ...initialFormState, order: services.length });
    setError("");
    setShowModal(true);
  };

  const openEdit = (service) => {
    setCurrentServiceId(service._id);
    setFormData({
      title: service.title || "",
      description: service.description || "",
      icon: service.icon || "search",
      image: service.image || "",
      order: service.order ?? 0,
    });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");

    try {
      if (currentServiceId === null) {
        await createService(formData);
        setNotice("Service created.");
      } else {
        await updateService(currentServiceId, formData);
        setNotice("Service updated.");
      }

      setShowModal(false);
      await loadServices();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not save this service.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    setDeletingId(id);
    setError("");
    setNotice("");

    try {
      await deleteService(id);
      setNotice("Service deleted.");
      await loadServices();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not delete this service.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">Services Management</h1>
          <p className="text-muted small mb-0">
            Add, configure, and manage your offered business services.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="btn btn-dark fw-semibold px-3"
        >
          <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
          Add New Service
        </button>
      </div>

      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}
      {notice && (
        <div className="alert alert-success py-2" role="status">
          {notice}
        </div>
      )}

      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-0">
          {loading ? (
            <p className="text-center text-muted py-5 mb-0" role="status">
              Loading services...
            </p>
          ) : services.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-0">
                No services found. Add your first service offering!
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-secondary small text-uppercase">
                  <tr>
                    <th className="py-3 ps-4">Service Title</th>
                    <th className="py-3">Description</th>
                    <th className="py-3">Order</th>
                    <th className="py-3 text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service._id}>
                      <td className="ps-4 fw-semibold text-dark">
                        {service.title}
                      </td>
                      <td
                        className="text-muted small text-truncate"
                        style={{ maxWidth: "350px" }}
                      >
                        {service.description}
                      </td>
                      <td>{service.order}</td>
                      <td className="text-end pe-4 text-nowrap">
                        <button
                          type="button"
                          onClick={() => openEdit(service)}
                          className="btn btn-sm btn-outline-secondary me-2 px-2 py-1"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(service._id)}
                          className="btn btn-sm btn-outline-danger px-2 py-1"
                          disabled={deletingId === service._id}
                        >
                          {deletingId === service._id ? "Deleting..." : "Delete"}
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

      {showModal && (
        <div
          className="modal show d-block"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-3">
              <div className="modal-header border-bottom px-4 py-3">
                <h2 id="service-modal-title" className="modal-title h5 fw-bold">
                  {currentServiceId === null ? "Add New Service" : "Edit Service"}
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                  disabled={submitting}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  {error && (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="row g-3">
                    <div className="col-12">
                      <label
                        htmlFor="service-title"
                        className="form-label fw-semibold small text-secondary"
                      >
                        Service Title
                      </label>
                      <input
                        id="service-title"
                        type="text"
                        className="form-control"
                        value={formData.title}
                        maxLength={150}
                        onChange={(event) =>
                          setFormData({ ...formData, title: event.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="service-icon"
                        className="form-label fw-semibold small text-secondary"
                      >
                        Icon
                      </label>
                      <select
                        id="service-icon"
                        className="form-select"
                        value={formData.icon}
                        onChange={(event) =>
                          setFormData({ ...formData, icon: event.target.value })
                        }
                      >
                        {serviceIconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="service-order"
                        className="form-label fw-semibold small text-secondary"
                      >
                        Display Order
                      </label>
                      <input
                        id="service-order"
                        type="number"
                        className="form-control"
                        min="0"
                        step="1"
                        value={formData.order}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            order: Number(event.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="col-12">
                      <label
                        htmlFor="service-image"
                        className="form-label fw-semibold small text-secondary"
                      >
                        Image URL
                      </label>
                      <input
                        id="service-image"
                        type="url"
                        className="form-control"
                        value={formData.image}
                        maxLength={2048}
                        onChange={(event) =>
                          setFormData({ ...formData, image: event.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label
                        htmlFor="service-description"
                        className="form-label fw-semibold small text-secondary"
                      >
                        Description
                      </label>
                      <textarea
                        id="service-description"
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        maxLength={2000}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            description: event.target.value,
                          })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top px-4 py-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setShowModal(false)}
                    disabled={submitting}
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
                      : currentServiceId === null
                        ? "Save Service"
                        : "Update Service"}
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
