import { faqData } from '../data/FaqData'; // Adjust path if FaqData.js is in another folder

const FaqPage = () => {
  return (
    <div className="row justify-content-center pt-4 container m-auto">
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark-blue">Frequently Asked Questions</h3>
              <p className="text-muted small">Quick answers to common questions about our services</p>
            </div>
    
            <div className="accordion accordion-flush shadow-sm rounded-4 overflow-hidden bg-white" id="contactFaq">
              {faqData.map((faq, index) => {
                const isFirst = index === 0;
                const isLast = index === faqData.length - 1;
    
                return (
                  <div 
                    key={faq.id} 
                    className={`accordion-item ${!isLast ? 'border-bottom' : ''}`}
                  >
                    <h2 className="accordion-header" id={`faq${faq.id}`}>
                      <button
                        className={`accordion-button fw-semibold text-dark-blue shadow-none ${!isFirst ? 'collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${faq.id}`}
                        aria-expanded={isFirst ? "true" : "false"}
                        aria-controls={`collapse${faq.id}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${faq.id}`}
                      className={`accordion-collapse collapse ${isFirst ? 'show' : ''}`}
                      aria-labelledby={`faq${faq.id}`}
                      data-bs-parent="#contactFaq"
                    >
                      <div className="accordion-body text-muted small lh-lg">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  )
}

export default FaqPage