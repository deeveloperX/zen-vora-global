import React from 'react';
import { termsData } from '../data/LegalData';

const TermsConditions = () => {
  return (
    <div className="bg-light py-4">
      <div className="container py-4">
        {/* Header Banner Card */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-myPrimary text-white">
          <span className="badge bg-mySecondary text-dark align-self-start mb-3 px-3 py-2 fw-semibold">
            Service Agreement
          </span>
          <h1 className="display-5 fw-bold mb-2">{termsData.title}</h1>
          <p className="text-white-50 mb-0">Last Updated: {termsData.lastUpdated}</p>
        </div>

        {/* Content Body */}
        <div className="row g-4">
          <div className="col-lg-12">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
              <p className="lead text-muted mb-4">{termsData.introduction}</p>
              <hr className="my-4 text-muted opacity-25" />

              {termsData.sections.map((section, index) => (
                <div key={index} className="mb-4">
                  <h3 className="h4 fw-bold text-dark mb-3">{section.title}</h3>
                  <p className="text-muted">{section.content}</p>
                  
                  {section.list && (
                    <ul className="list-group list-group-flush my-3">
                      {section.list.map((item, i) => (
                        <li key={i} className="list-group-item bg-transparent border-0 text-muted py-1 ps-0">
                          <i className="bi bi-check-circle-fill text-warning me-2"></i> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;