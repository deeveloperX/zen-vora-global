import { useState } from "react";
import { faqData } from "../data/FaqData";
import { readAdminContent, writeAdminContent } from "../data/AdminContent";

const FAQ_STORAGE_KEY = "zenvora-admin-faqs";
const emptyFaq = { question: "", answer: "" };

export default function FaqManagement() {
  const [faqs, setFaqs] = useState(() =>
    readAdminContent(FAQ_STORAGE_KEY, faqData),
  );
  const [formData, setFormData] = useState(emptyFaq);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState("");

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyFaq);
    setShowModal(true);
  };

  const openEdit = (faq) => {
    setEditingId(faq.id);
    setFormData({ question: faq.question, answer: faq.answer });
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextFaqs =
      editingId === null
        ? [...faqs, { id: Date.now(), ...formData }]
        : faqs.map((faq) =>
            faq.id === editingId ? { ...faq, ...formData } : faq,
          );
    setFaqs(nextFaqs);
    writeAdminContent(FAQ_STORAGE_KEY, nextFaqs);
    setShowModal(false);
    setNotice("FAQ changes saved in this browser.");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    const nextFaqs = faqs.filter((faq) => faq.id !== id);
    setFaqs(nextFaqs);
    writeAdminContent(FAQ_STORAGE_KEY, nextFaqs);
    setNotice("FAQ deleted.");
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
      </div>

      <div className="card border-0 shadow-sm rounded-3">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 ps-4">Question</th>
                <th className="py-3">Answer</th>
                <th className="py-3 text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id}>
                  <td
                    className="ps-4 fw-semibold"
                    style={{ minWidth: "220px" }}
                  >
                    {faq.question}
                  </td>
                  <td
                    className="text-muted small"
                    style={{ minWidth: "280px", maxWidth: "560px" }}
                  >
                    {faq.answer}
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
                      onClick={() => handleDelete(faq.id)}
                      aria-label={`Delete ${faq.question}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-5">
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
                  ></button>
                </div>
                <div className="modal-body p-4">
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
                    className="form-control"
                    rows="5"
                    value={formData.answer}
                    onChange={(event) =>
                      setFormData({ ...formData, answer: event.target.value })
                    }
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark">
                    Save FAQ
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
