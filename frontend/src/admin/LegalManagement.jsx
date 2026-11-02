import { useState } from "react";
import { privacyData, termsData } from "../data/LegalData";
import { readAdminContent, writeAdminContent } from "../data/AdminContent";

const LEGAL_STORAGE_KEY = "zenvora-admin-legal";
const defaultDocuments = { privacy: privacyData, terms: termsData };

export default function LegalManagement() {
  const [documents, setDocuments] = useState(() =>
    readAdminContent(LEGAL_STORAGE_KEY, defaultDocuments),
  );
  const [activeDocument, setActiveDocument] = useState("privacy");
  const [notice, setNotice] = useState("");
  const document = documents[activeDocument];

  const updateDocument = (field, value) => {
    setDocuments({
      ...documents,
      [activeDocument]: { ...document, [field]: value },
    });
  };

  const updateSection = (index, field, value) => {
    const sections = document.sections.map((section, sectionIndex) =>
      sectionIndex === index
        ? {
            ...section,
            [field]:
              field === "list"
                ? value.split("\n").filter((item) => item.trim())
                : value,
          }
        : section,
    );
    updateDocument("sections", sections);
  };

  const addSection = () => {
    updateDocument("sections", [
      ...document.sections,
      {
        id: `section-${Date.now()}`,
        title: "New section",
        content: "",
        list: [],
      },
    ]);
  };

  const removeSection = (index) => {
    updateDocument(
      "sections",
      document.sections.filter((_, sectionIndex) => sectionIndex !== index),
    );
  };

  const saveChanges = (event) => {
    event.preventDefault();
    writeAdminContent(LEGAL_STORAGE_KEY, documents);
    setNotice("Legal document changes saved in this browser.");
  };

  return (
    <div className="container-fluid p-0">
      <div className="mb-4">
        <p className="text-uppercase text-secondary small fw-bold mb-1">
          Website content
        </p>
        <h1 className="h3 fw-bold text-dark mb-1">Legal documents</h1>
        <p className="text-muted small mb-0">
          Edit the privacy policy and terms shown on the public website.
        </p>
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 border-bottom mb-4">
        <div
          className="nav nav-tabs border-0"
          role="tablist"
          aria-label="Legal documents"
        >
          <button
            type="button"
            className={`nav-link ${activeDocument === "privacy" ? "active fw-semibold" : ""}`}
            onClick={() => setActiveDocument("privacy")}
          >
            Privacy policy
          </button>
          <button
            type="button"
            className={`nav-link ${activeDocument === "terms" ? "active fw-semibold" : ""}`}
            onClick={() => setActiveDocument("terms")}
          >
            Terms &amp; conditions
          </button>
        </div>
        <span className="badge bg-light text-secondary border mb-2">
          {document.sections.length} sections
        </span>
      </div>

      {notice && (
        <div className="alert alert-success py-2" role="status">
          {notice}
        </div>
      )}
      <form onSubmit={saveChanges}>
        <div className="card border-0 shadow-sm rounded-3 mb-4">
          <div className="card-body p-4">
            <h2 className="h6 fw-bold mb-3">Document details</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <label
                  htmlFor="legal-title"
                  className="form-label small fw-semibold"
                >
                  Title
                </label>
                <input
                  id="legal-title"
                  className="form-control"
                  value={document.title}
                  onChange={(event) =>
                    updateDocument("title", event.target.value)
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="legal-updated"
                  className="form-label small fw-semibold"
                >
                  Last updated
                </label>
                <input
                  id="legal-updated"
                  className="form-control"
                  value={document.lastUpdated}
                  onChange={(event) =>
                    updateDocument("lastUpdated", event.target.value)
                  }
                  required
                />
              </div>
              <div className="col-12">
                <label
                  htmlFor="legal-intro"
                  className="form-label small fw-semibold"
                >
                  Introduction
                </label>
                <textarea
                  id="legal-intro"
                  className="form-control"
                  rows="3"
                  value={document.introduction}
                  onChange={(event) =>
                    updateDocument("introduction", event.target.value)
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h5 fw-bold mb-0">Document sections</h2>
          <button
            type="button"
            className="btn btn-sm btn-outline-dark"
            onClick={addSection}
          >
            <i className="bi bi-plus-lg me-1" aria-hidden="true"></i>Add section
          </button>
        </div>
        <div className="d-grid gap-3 mb-4">
          {document.sections.map((section, index) => (
            <section
              className="card border-0 shadow-sm rounded-3"
              key={section.id}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <div className="flex-grow-1">
                    <label
                      htmlFor={`legal-section-title-${index}`}
                      className="form-label small fw-semibold"
                    >
                      Section title
                    </label>
                    <input
                      id={`legal-section-title-${index}`}
                      className="form-control"
                      value={section.title}
                      onChange={(event) =>
                        updateSection(index, "title", event.target.value)
                      }
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mt-4"
                    onClick={() => removeSection(index)}
                    aria-label={`Remove ${section.title}`}
                  >
                    <i className="bi bi-trash" aria-hidden="true"></i>
                  </button>
                </div>
                <label
                  htmlFor={`legal-section-content-${index}`}
                  className="form-label small fw-semibold"
                >
                  Section content
                </label>
                <textarea
                  id={`legal-section-content-${index}`}
                  className="form-control mb-3"
                  rows="3"
                  value={section.content}
                  onChange={(event) =>
                    updateSection(index, "content", event.target.value)
                  }
                  required
                />
                <label
                  htmlFor={`legal-section-list-${index}`}
                  className="form-label small fw-semibold"
                >
                  List items{" "}
                  <span className="text-muted fw-normal">(one per line)</span>
                </label>
                <textarea
                  id={`legal-section-list-${index}`}
                  className="form-control"
                  rows="3"
                  value={(section.list || []).join("\n")}
                  onChange={(event) =>
                    updateSection(index, "list", event.target.value)
                  }
                />
              </div>
            </section>
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-dark fw-semibold px-4">
            Save document
          </button>
        </div>
      </form>
    </div>
  );
}
