import { Link } from 'react-router';
import { FaPlay } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";


const Hero = () => {
  return (
    <section 
      className="hero-section text-dark position-relative d-flex align-items-center py-5"
      style={{
        minHeight: '85vh',
        width: '100%'
      }}
    >
      <div className="container py-4 py-lg-5">
        <div className="row">
          <div className="col-12 col-md-7 col-lg-5 hero-content">
            
            {/* Tagline */}
            <p className="fw-semibold text-mySecondary text-uppercase mb-2" style={{letterSpacing: '0.5px' }}>
              Source • Sell • Grow
            </p>

            {/* Main Heading */}
            <h1 className="display-4 fw-bold mb-3 text-myPrimary" style={{lineHeight: '1.15' }}>
              Zen Vora<br />Global Ventures
            </h1>

            {/* Subheading */}
            <h5 className="fw-semibold text-myPrimary mb-3" style={{ lineHeight: '1.4' }}>
              Your Trusted Partner for Global Sourcing, Dropshipping & E-commerce Success
            </h5>

            {/* Description Text */}
            <p className="text-myPrimary opacity-75 mb-4 fs-6" style={{ lineHeight: '1.6' }}>
              We connect you with the world’s top marketplaces like <strong>Amazon, eBay, Walmart, Home Depot, AliExpress and Alibaba</strong> — helping you source the best products, sell globally, and grow your business with ease.
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <Link to={`/support`}
                className="btn bg-mySecondary hover-mySecondary rounded-pill px-4 py-2 fw-semibold text-white shadow-sm d-inline-flex align-items-center gap-2"
              >
                Free Consultation <FaArrowRightLong />
              </Link>

              <Link to={`/services`}
                className="btn btn-outline-myPrimary rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
              >
                <FaPlay /> Learn More
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;