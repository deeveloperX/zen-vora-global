import { useCallback, useEffect, useState } from "react";
import {
  createFaq,
  deleteFaq,
  getAdminFaqs,
  updateFaq,
} from "../api/faqs";

const emptyFaq = {
  question: "",
  answer: "",
  category: "",
  order: 0,
  isPublished: false,
};

export default function FaqManagement() {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState(emptyFaq);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadFaqs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setFaqs(await getAdminFaqs());
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not load FAQs.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const fetchFaqs = async () => {
      try {
        const items = await getAdminFaqs();
        if (active) setFaqs(items);
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Could not load FAQs.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchFaqs();
    return () => {
      active = false;
    };
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyFaq);
    setError("");
    setShowModal(true);
  };

  const openEdit = (faq) => {
    setEditingId(faq._id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "",
      order: faq.order ?? 0,
      isPublished: faq.isPublished,
    });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      if (editingId === null) {
        await createFaq(formData);
        setNotice("FAQ created.");
      } else {
        await updateFaq(editingId, formData);
        setNotice("FAQ updated.");
      }

      setShowModal(false);
      await loadFaqs();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not save this FAQ.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    setError("");
    setNotice("");

    try {
      await deleteFaq(id);
      setNotice("FAQ deleted.");
      await loadFaqs();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not delete this FAQ.",
      );
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <p className="text-uppercase text-secondary small fw-bold mb-1">
            Website content
          </p>
          <h1 className="h3 fw-bold text-dark mb-1">
            Frequently asked questions
          </h1>
          <p className="text-muted small mb-0">
            Manage the questions and answers shown on the public FAQ page.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-dark fw-semibold"
          onClick={openCreate}
        >
          <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>Add FAQ
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
      <div className="d-flex flex-wrap gap-3 mb-3">
        <div className="border-start border-3 border-warning ps-3">
          <span className="text-muted small d-block">Total questions</span>
          <strong className="fs-5">{faqs.length}</strong>
        </div>
        <div className="border-start border-3 border-success ps-3">
          <span className="text-muted small d-block">Published</span>
          <strong className="fs-5">
            {faqs.filter((faq) => faq.isPublished).length}
          </strong>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-3">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 ps-4">Question</th>
                <th className="py-3">Answer</th>
                <th className="py-3">Order</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-5">
                    Loading FAQs...
                  </td>
                </tr>
              )}
              {!loading &&
                faqs.map((faq) => (
                  <tr key={faq._id}>
                    <td
                      className="ps-4 fw-semibold"
                      style={{ minWidth: "220px" }}
                    >
                      {faq.question}
                      {faq.category && (
                        <span className="d-block text-muted small fw-normal">
                          {faq.category}
                        </span>
                      )}
                    </td>
                    <td
                      className="text-muted small"
                      style={{ minWidth: "280px", maxWidth: "560px" }}
                    >
                      {faq.answer}
                    </td>
                    <td>{faq.order}</td>
                    <td>
                      <span
                        className={`badge ${faq.isPublished ? "text-bg-success" : "text-bg-secondary"}`}
                      >
                        {faq.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="text-end pe-4 text-nowrap">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => openEdit(faq)}
                        aria-label={`Edit ${faq.question}`}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(faq._id)}
                        aria-label={`Delete ${faq.question}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              {!loading && faqs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-5">
                    No FAQs yet. Add the first question to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="modal show d-block"
          role="dialog"
          aria-modal="true"
          aria-labelledby="faq-modal-title"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h2 id="faq-modal-title" className="modal-title h5 fw-bold">
                    {editingId === null ? "Add FAQ" : "Edit FAQ"}
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                    disabled={saving}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  {error && (
                    <div className="alert alert-danger py-2" role="alert">
                      {error}
                    </div>
                  )}
                  <label
                    htmlFor="faq-question"
                    className="form-label fw-semibold"
                  >
                    Question
                  </label>
                  <input
                    id="faq-question"
                    className="form-control mb-3"
                    value={formData.question}
                    maxLength={300}
                    onChange={(event) =>
                      setFormData({ ...formData, question: event.target.value })
                    }
                    required
                  />
                  <label
                    htmlFor="faq-answer"
                    className="form-label fw-semibold"
                  >
                    Answer
                  </label>
                  <textarea
                    id="faq-answer"
                    className="form-control mb-3"
                    rows="5"
                    maxLength={5000}
                    value={formData.answer}
                    onChange={(event) =>
                      setFormData({ ...formData, answer: event.target.value })
                    }
                    required
                  />
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="faq-category"
                        className="form-label fw-semibold"
                      >
                        Category
                      </label>
                      <input
                        id="faq-category"
                        className="form-control"
                        maxLength={100}
                        value={formData.category}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            category: event.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="faq-order"
                        className="form-label fw-semibold"
                      >
                        Display order
                      </label>
                      <input
                        id="faq-order"
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
                  </div>
                  <div className="form-check mt-3">
                    <input
                      id="faq-published"
                      type="checkbox"
                      className="form-check-input"
                      checked={formData.isPublished}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          isPublished: event.target.checked,
                        })
                      }
                    />
                    <label
                      htmlFor="faq-published"
                      className="form-check-label"
                    >
                      Publish this FAQ on the public website
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowModal(false)}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save FAQ"}
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
