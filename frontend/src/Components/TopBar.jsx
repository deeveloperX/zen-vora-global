import { BsEnvelope, BsTelephone } from 'react-icons/bs';
import { Link } from 'react-router';

const TopNav = () => {
  return (
    <div className="d-none d-lg-block top-nav-bar bg-dark-blue text-white py-2 border-bottom border-secondary border-opacity-25">
      <div className="row align-items-center gy-2 px-5">
        {/* Left Column: Email & Phone */}
        <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center justify-content-center justify-content-md-start gap-4">
          <Link to={`mailto:zenvoraglobalventures@gmail.com`} 
            className="text-white-50 text-decoration-none d-inline-flex align-items-center gap-2 small nav-hover"
          >
            <BsEnvelope className="fs-6" />
            <span>zenvoraglobalventures@gmail.com</span>
          </Link>

          <Link to={`tel:+923203664619`} 
            className="text-white-50 text-decoration-none d-inline-flex align-items-center gap-2 small nav-hover"
          >
            <BsTelephone className="fs-6" />
            <span>+92 320 3664619</span>
          </Link>
        </div>

        {/* Center Column: Tagline */}
        <div className="col-12 col-md-4 col-lg-4 text-center">
          <span className="small fw-normal text-white d-none d-md-inline">
            Your Global Sourcing &amp; E-commerce Partner
          </span>
        </div>

        {/* Right Column: Quick Links */}
        <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center justify-content-center justify-content-md-end">
          <div className="d-flex align-items-center gap-2 small">
            <Link to={`/track-order`} className="text-white-50 text-decoration-none nav-hover">
              Track Order
            </Link>
            <span className="text-white-50">|</span>
            <Link to={`/support`} className="text-white-50 text-decoration-none nav-hover">
              Support
            </Link>
            <span className="text-white-50">|</span>
            <Link to={`/login`} className="text-white-50 text-decoration-none nav-hover">
              Log In / Register
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopNav;