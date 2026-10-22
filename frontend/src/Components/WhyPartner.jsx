import { BsCheckCircleFill, BsShieldCheck, BsGlobe } from 'react-icons/bs';
import { Link } from 'react-router';

const WhyPartner = () => {
  return (
    <section className="py-3 py-lg-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            
            <div className="col-12 col-lg-6">
              <span className="text-mySecondary fw-semibold text-uppercase small tracking-wide">Why Partner With Zen Vora</span>
              <h2 className="fw-bold text-myPrimary display-6 mt-1 mb-3">Built for E-Commerce Entrepreneurs</h2>
              <p className="text-muted mb-4 small lh-lg">
                Running an e-commerce brand involves juggling suppliers, logistics, advertising, and customer service. We handle the heavy lifting so you can focus on scaling your revenue.
              </p>

              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <div className="p-3 border rounded-3 h-100 bg-light-subtle">
                    <BsShieldCheck className="text-mySecondary fs-3 mb-2" />
                    <h6 className="fw-bold text-myPrimary mb-1">Verified Suppliers</h6>
                    <p className="text-muted small mb-0">Direct factory partnerships ensuring strict quality control.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="p-3 border rounded-3 h-100 bg-light-subtle">
                    <BsGlobe className="text-mySecondary fs-3 mb-2" />
                    <h6 className="fw-bold text-myPrimary mb-1">Global Reach</h6>
                    <p className="text-muted small mb-0">Seamless multi-channel fulfillment across US, UK, and EU markets.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="p-4 p-md-5 rounded-4 bg-myPrimary text-white shadow-lg">
                <h3 className="fw-bold mb-3">Ready to Scale Your Brand?</h3>
                <p className="text-white-50 small mb-4 lh-lg">
                  Schedule a free 20-minute strategy call with our e-commerce consultants to identify bottlenecks and unlock hidden growth opportunities.
                </p>
                <ul className="list-unstyled d-flex flex-column gap-2 mb-4 small text-white-90">
                  <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-mySecondary" /> Custom Supply Chain Analysis</li>
                  <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-mySecondary" /> Marketplace Profitability Audit</li>
                  <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-mySecondary" /> Tailored Growth Roadmap</li>
                </ul>
                <Link to={`/support`} className="btn bg-mySecondary hover-mySecondary w-100 py-3 rounded-3 text-white fw-semibold shadow-sm">
                  Book a Free Consultation
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
  )
}

export default WhyPartner