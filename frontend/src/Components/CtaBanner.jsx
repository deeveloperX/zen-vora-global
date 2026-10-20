import { BsCheckCircleFill } from 'react-icons/bs';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import GlobalTrade from '../assets/global-trade-656x405.webp';
import { Link } from 'react-router';

const CtaBanner = () => {
  const benefits = [
    'Global Marketplace Access',
    'Competitive Pricing',
    'Reliable Support',
    'Unlimited Growth Opportunities',
  ];

  return (
    <section className="cta-banner-section  ">
      <div className="container-fluid px-lg-5">
        <div className="cta-banner-card bg-myPrimary rounded-4 overflow-hidden shadow-lg text-white p-3 p-lg-1">
          <div className="row g-0 align-items-center">
            
            {/*     Globe Image Container */}
            <div className="col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center p-3 p-md-0"
            >
              <div className="globe-image-wrapper text-center w-100 ">
                <img
                  src={GlobalTrade} 
                  alt="Global E-commerce Sourcing"
                  className="img-fluid object-fit-cover rounded-start-4"
                />
              </div>
            </div>

            {/* Text & CTA Button */}
            <div className="col-12 col-md-8 col-lg-6 text-center">
              <h2 className="fw-bold mb-2 fs-3 text-white">
                Let's Grow Your E-commerce Business Together!
              </h2>
              <p className="text-white-50 mb-4 px-lg-3 small lh-base">
                Join Zen Vora Global Ventures today and get access to the best global products, trusted marketplaces, and expert support.
              </p>
              <Link to={`/support`}
                href="#start-journey"
                className="btn btn-cta-banner rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 text-white shadow-sm cta-btn-hover"
              >
                <span>Start Your Journey</span>
                <HiOutlineArrowRight className="fs-5" />
              </Link>
            </div>

            {/* Bullet Points with Vertical Border */}
            <div className="col-12 col-lg-3 p-4 border-start-lg border-white-15">
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="d-flex align-items-center gap-2">
                    <BsCheckCircleFill className="text-mySecondary flex-shrink-0 fs-5" />
                    <span className="small fw-medium text-white-90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;