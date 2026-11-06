import useFaqs from "../hooks/useFaqs";

const FaqPage = () => {
  const { faqs, loading, error } = useFaqs();

  return (
    <div className="row justify-content-center pt-4 container m-auto">
      <div className="text-center mb-4">
        <h3 className="fw-bold text-dark-blue">Frequently Asked Questions</h3>
        <p className="text-muted small">
          Quick answers to common questions about our services
        </p>
      </div>

      {loading && (
        <p className="text-muted text-center" role="status">
          Loading FAQs...
        </p>
      )}
      {error && (
        <p className="text-danger text-center" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && faqs.length === 0 && (
        <p className="text-muted text-center">No FAQs are available yet.</p>
      )}

      {!loading && !error && faqs.length > 0 && (
        <div
          className="accordion accordion-flush shadow-sm rounded-4 overflow-hidden bg-white"
          id="faqPageAccordion"
        >
          {faqs.map((faq, index) => {
            const questionId = `faq-question-${faq._id}`;
            const answerId = `faq-answer-${faq._id}`;
            const isFirst = index === 0;
            const isLast = index === faqs.length - 1;

            return (
              <div
                key={faq._id}
                className={`accordion-item ${!isLast ? "border-bottom" : ""}`}
              >
                <h2 className="accordion-header" id={questionId}>
                  <button
                    className={`accordion-button fw-semibold text-dark-blue shadow-none ${!isFirst ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${answerId}`}
                    aria-expanded={isFirst}
                    aria-controls={answerId}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={answerId}
                  className={`accordion-collapse collapse ${isFirst ? "show" : ""}`}
                  aria-labelledby={questionId}
                  data-bs-parent="#faqPageAccordion"
                >
                  <div className="accordion-body text-muted small lh-lg">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FaqPage;
