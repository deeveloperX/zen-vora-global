import { BsSend, BsCheckCircleFill,} from 'react-icons/bs';
import { useState } from 'react';
const ContactFormAndMap = () => {
      const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Product Sourcing',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect backend API / Web3Forms / EmailJS here
    setSubmitted(true);
  };
  return (
        <div className="row g-4 align-items-stretch mb-5 container m-auto">
          
          {/* Left Column: Form */}
          <div className="col-12 col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100 bg-white">
              <h3 className="fw-bold text-dark-blue mb-2">Send Us a Message</h3>
              <p className="text-muted small mb-4">
                Fill out the form below and an e-commerce specialist will get back to you shortly.
              </p>

              {submitted ? (
                <div className="alert alert-success border-0 bg-success-subtle text-success p-4 rounded-4 text-center my-auto">
                  <BsCheckCircleFill className="fs-1 mb-2 text-success" />
                  <h5 className="fw-bold">Message Sent Successfully!</h5>
                  <p className="small mb-0">
                    Thank you for reaching out to Zen Vora. Our team will review your inquiry and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold text-dark-blue">Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        className="form-control form-control-lg rounded-3 fs-6" 
                        placeholder="John Doe" 
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold text-dark-blue">Business Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        className="form-control form-control-lg rounded-3 fs-6" 
                        placeholder="john@company.com" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold text-dark-blue">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        className="form-control form-control-lg rounded-3 fs-6" 
                        placeholder="+92 300 0000000" 
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold text-dark-blue">Service of Interest</label>
                      <select 
                        name="service"
                        className="form-select form-select-lg rounded-3 fs-6"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="Product Sourcing">Product Sourcing</option>
                        <option value="Dropshipping Services">Dropshipping Services</option>
                        <option value="E-commerce Support">E-commerce Support</option>
                        <option value="International Shipping">International Shipping</option>
                        <option value="Marketplace Management">Marketplace Management (Amazon/eBay)</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark-blue">Project Details / Message *</label>
                      <textarea 
                        name="message"
                        rows="4" 
                        className="form-control rounded-3 fs-6" 
                        placeholder="Tell us about your business goals, target marketplaces, or sourcing requirements..." 
                        required
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-12 mt-4">
                      <button 
                        type="submit" 
                        className="btn bg-mySecondary hover-mySecondary btn-lg w-100 rounded-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                      >
                        <span>Send Message</span>
                        <BsSend className="fs-6" />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 d-flex flex-column">
              <div className="map-wrapper flex-grow-1 min-h-250">
                <iframe
                  title="Office Location Map"
                  src="https://maps.google.com/maps?q=Nasheman-e-Iqbal%20Phase%202%2C%20Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '280px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-4 bg-dark-blue text-myPrimary">
                <h5 className="fw-bold mb-2">Global Operations</h5>
                <p className="small text-myPrimary mb-0">
                  Supporting clients across USA, UK, UAE, and Asian supplier markets with 24/7 client portal accessibility.
                </p>
              </div>
            </div>
          </div>

        </div>
  )
}

export default ContactFormAndMap