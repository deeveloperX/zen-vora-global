import { BsSend } from 'react-icons/bs';
import FormMap from './FormMap';

const CONTACT_EMAIL = 'zenvoraglobalventures@gmail.com';

const ContactFormAndMap = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const subject = `Contact form message from ${formData.get('name')}`;
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      '',
      formData.get('message')
    ].join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="row g-4 align-items-stretch mb-5 container m-auto">
      <div className="col-12 col-lg-7">
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100 bg-white">
          <h3 className="fw-bold text-dark-blue mb-2">Send Us a Message</h3>
          <p className="text-muted small mb-4">
            Share a few details and we’ll be in touch.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="contact-name" className="form-label small fw-semibold text-dark-blue">
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-control form-control-lg rounded-3 fs-6"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="contact-email" className="form-label small fw-semibold text-dark-blue">
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="form-control form-control-lg rounded-3 fs-6"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="contact-message" className="form-label small fw-semibold text-dark-blue">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  className="form-control rounded-3 fs-6"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="btn bg-mySecondary hover-mySecondary btn-lg w-100 rounded-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                >
                  <span>Send via Email</span>
                  <BsSend className="fs-6" />
                </button>
                <p className="text-muted small text-center mt-2 mb-0">
                  This opens your email app to send the message.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <FormMap />
    </div>
  );
};

export default ContactFormAndMap;
