import {
  BsEnvelope,
  BsTelephone,
  BsGeoAlt,
  BsFacebook,
  BsLinkedin,
  BsTwitterX,
  BsInstagram,
} from "react-icons/bs";
import Logo from "../assets/android-chrome-192x192.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer-section bg-myPrimary text-white pt-5 mt-5 pb-3 border-top border-secondary border-opacity-25">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row g-4 mb-4">
          {/* Column 1: Brand & Bio */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-1 mb-lg-4">
              <img
                alt="logo"
                className="filter-white"
                src={Logo}
                style={{ width: "60px" }}
              />
              <div className="d-flex flex-column lh-1">
                <span className="fw-bold fs-5 text-white">ZenVora</span>
                <span className="small text-white-50 uppercase-subtext">
                  Global Ventures
                </span>
              </div>
            </div>
            <p className="text-white-50 small mb-4 lh-base">
              Your trusted global partner for professional e-commerce sourcing,
              dropshipping, international shipping, and end-to-end marketplace
              business growth.
            </p>
            {/* Social Icons */}
            <div className="d-flex align-items-center gap-3">
              <a
                href="#facebook"
                className="social-icon-link text-white bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center p-2"
              >
                <BsFacebook size={16} />
              </a>
              <a
                href="#linkedin"
                className="social-icon-link text-white bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center p-2"
              >
                <BsLinkedin size={16} />
              </a>
              <a
                href="#twitter"
                className="social-icon-link text-white bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center p-2"
              >
                <BsTwitterX size={16} />
              </a>
              <a
                href="#instagram"
                className="social-icon-link text-white bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center p-2"
              >
                <BsInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-6 col-md-6 col-lg-2">
            <h6 className="fw-bold text-white mb-3 fs-6 border-bottom border-orange pb-2 d-inline-block mb-lg-4">
              Quick Links
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link
                  to={`/home`}
                  className="text-white-50 text-decoration-none footer-link"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/about`}
                  className="text-white-50 text-decoration-none footer-link"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={`/services`}
                  className="text-white-50 text-decoration-none footer-link"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to={`/marketplaces`}
                  className="text-white-50 text-decoration-none footer-link"
                >
                  Marketplaces
                </Link>
              </li>
              <li>
                <Link
                  to={`/blogs`}
                  className="text-white-50 text-decoration-none footer-link"
                >
                  Blog &amp; News
                </Link>
              </li>
              <li>
                <Link
                  to={`/support`}
                  className="text-white-50 text-decoration-none footer-link"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-6 col-md-6 col-lg-3">
            <h6 className="fw-bold text-white mb-3 fs-6 border-bottom border-orange pb-2 d-inline-block mb-lg-4">
              Our Services
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to={`/services`} className="text-white-50 text-decoration-none footer-link">Product Sourcing</Link></li>
              <li><Link to={`/services`} className="text-white-50 text-decoration-none footer-link">Dropshipping Services</Link></li>
              <li><Link to={`/services`} className="text-white-50 text-decoration-none footer-link">E-commerce Support</Link></li>
              <li><Link to={`/services`} className="text-white-50 text-decoration-none footer-link">International Shipping</Link></li>
              <li><Link to={`/services`} className="text-white-50 text-decoration-none footer-link">Business Growth</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="fw-bold text-white mb-3 fs-6 border-bottom border-orange pb-2 d-inline-block mb-lg-4">
              Get in Touch
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-4">
              <li className="d-flex align-items-center gap-2 text-white-50">
                <BsTelephone className="text-orange flex-shrink-0" />
                <a
                  href="tel:+923203664619"
                  className="text-white-50 text-decoration-none footer-link"
                >
                  +92 320 3664619
                </a>
              </li>
              <li className="d-flex align-items-center gap-2 text-white-50">
                <BsEnvelope className="text-orange flex-shrink-0" />
                <a
                  href="mailto:zenvoraglobalventures@gmail.com"
                  className="text-white-50 text-decoration-none footer-link"
                >
                  zenvoraglobalventures@gmail.com
                </a>
              </li>
                <li className="d-flex align-items-center gap-2 text-white-50">
                  <BsGeoAlt className="text-orange flex-shrink-0" />
                  <span>Office#125, Nasheman-e-Iqbal Phase 2, Lahore, Pakistan</span>
                </li>
            </ul>
          </div>
        </div>
        {/* Divider & Copyright */}
        <div className="row pt-3 border-top border-secondary border-opacity-10 align-items-center">
          {/* Left Side: Copyright */}
          <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
            <p className="small text-white-50 mb-0">
              &copy; {new Date().getFullYear()} ZenVora Global Ventures (LLC).
              All rights reserved.
            </p>
          </div>

          {/* Right Side: Links */}
          <div className="col-12 col-md-6 text-center text-md-end">
            <div className="d-inline-flex gap-3 small text-white-50">
              <Link
                to="/privacy-policy"
                className="text-white-50 text-decoration-none footer-link"
              >
                Privacy Policy
              </Link>
              <span>&bull;</span>
              <Link
                to="/terms-conditions"
                className="text-white-50 text-decoration-none footer-link"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
