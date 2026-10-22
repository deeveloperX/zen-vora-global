import {
    BsEnvelope,
    BsTelephone,
    BsGeoAlt,
    BsClock
} from 'react-icons/bs';

const GetInTouchCards = () => {
    return (
        <div className="contact-page bg-light py-5">
            <div className="container">

                <div className="text-center mb-5    ">
                    <p
                        className="fw-semibold text-uppercase mb-2 text-mySecondary"
                        style={{ letterSpacing: "1px", fontSize: "0.9rem" }}
                    >
                        — Get In Touch —
                    </p>

                </div>  

                <div className="row g-4">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-4 contact-card">
                            <div className="icon-wrapper mx-auto mb-3 bg-dark-blue-subtle text-dark-blue rounded-circle d-flex align-items-center justify-content-center">
                                <BsTelephone className="fs-4" />
                            </div>
                            <h6 className="fw-bold text-dark-blue mb-1">Call Us</h6>
                            <p className="text-muted small mb-2">Mon - Sat from 9am to 6pm</p>
                            <a href="tel:+923203664619" className="fw-semibold text-orange text-decoration-none small">
                                +92 320 3664619
                            </a>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-4 contact-card">
                            <div className="icon-wrapper mx-auto mb-3 bg-dark-blue-subtle text-dark-blue rounded-circle d-flex align-items-center justify-content-center">
                                <BsEnvelope className="fs-4" />
                            </div>
                            <h6 className="fw-bold text-dark-blue mb-1">Email Us</h6>
                            <p className="text-muted small mb-2">Our team responds within 24h</p>
                            <a href="mailto:zenvoraglobalventures@gmail.com" className="fw-semibold text-orange text-decoration-none small">
                                zenvoraglobalventures@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-4 contact-card">
                            <div className="icon-wrapper mx-auto mb-3 bg-dark-blue-subtle text-dark-blue rounded-circle d-flex align-items-center justify-content-center">
                                <BsGeoAlt className="fs-4" />
                            </div>
                            <h6 className="fw-bold text-dark-blue mb-1">Main Headquarters</h6>
                            <p className="text-muted small mb-0">
                                Office# 125, Nasheman-e-Iqbal Phase 2, Lahore
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-4 contact-card">
                            <div className="icon-wrapper mx-auto mb-3 bg-dark-blue-subtle text-dark-blue rounded-circle d-flex align-items-center justify-content-center">
                                <BsClock className="fs-4" />
                            </div>
                            <h6 className="fw-bold text-dark-blue mb-1">Business Hours</h6>
                            <p className="text-muted small mb-0">
                                Monday – Friday: 9:00 AM – 6:00 PM<br />
                                Saturday: 10:00 AM – 2:00 PM
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GetInTouchCards