import React from 'react';
// Make sure 'hero.png' (Image 2) is located inside your 'src/assets/' directory
import heroBg from '../assets/hero.png';

const Hero = () => {
  return (
    <section 
      className="hero-section text-dark position-relative d-flex align-items-center py-5"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        minHeight: '85vh',
        width: '100%'
      }}
    >
      <div className="container py-4 py-lg-5">
        <div className="row">
          <div className="col-12 col-md-7 col-lg-5">
            
            {/* Orange Tagline */}
            <p className="fw-semibold text-warning text-uppercase mb-2" style={{ color: '#ff6600', letterSpacing: '0.5px' }}>
              Source • Sell • Grow
            </p>

            {/* Main Heading */}
            <h1 className="display-4 fw-bold mb-3 text-navy" style={{ color: '#0d1b2a', lineHeight: '1.15' }}>
              Zen Vora<br />Global Ventures
            </h1>

            {/* Subheading */}
            <h5 className="fw-semibold text-dark mb-3" style={{ lineHeight: '1.4' }}>
              Your Trusted Partner for Global Sourcing, Dropshipping & E-commerce Success
            </h5>

            {/* Description Text */}
            <p className="text-secondary mb-4 fs-6" style={{ lineHeight: '1.6' }}>
              We connect you with the world’s top marketplaces like <strong>Amazon, eBay, Walmart, Home Depot, AliExpress and Alibaba</strong> — helping you source the best products, sell globally, and grow your business with ease.
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <a 
                href="#get-started" 
                className="btn btn-warning rounded-pill px-4 py-2 fw-semibold text-white shadow-sm d-inline-flex align-items-center gap-2"
                style={{ backgroundColor: '#ff5500', borderColor: '#ff5500' }}
              >
                Get Started <span>&rarr;</span>
              </a>

              <a 
                href="#learn-more" 
                className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
              >
                <small>&#9654;</small> Learn More
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;