import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const AboutSection = () => {
  return (
    <section className="bg-white position-relative" id="about">
      <div className="container py-4">
        <div className="row align-items-center g-5">
          {/* Left Side: Visual Image with Stats Badge */}
          <div className="col-12 col-lg-6">
            <div className="position-relative">
              {/* Main Sourcing / Logistics Image */}
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80"
                alt="Zen Vora Global Sourcing"
                className="img-fluid rounded-4 shadow-sm w-100"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />

              {/* Floating Stat Card Badge */}
              <div
                className="position-absolute bottom-0 end-0 bg-white p-3 p-md-4 rounded-4 shadow-lg mb-n3 me-n2 me-md-3 border"
                style={{ maxWidth: "240px" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 bg-mySecondary"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div>
                      <h6
                        className="fw-bold mb-0 text-dark"
                        style={{ fontSize: "1.05rem" }}
                      >
                        End-to-End
                      </h6>
                      <small
                        className="text-secondary"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Full Sourcing Support
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="col-12 col-lg-6">
            {/* Tagline */}
            <p
              className="fw-semibold text-uppercase mb-2 text-mySecondary"
              style={{ letterSpacing: "1px", fontSize: "0.9rem" }}
            >
              — About Us —
            </p>

            {/* Main Heading */}
            <h2
              className="fw-bold display-6 mb-3 text-myPrimary"
              style={{ lineHeight: "1.25" }}
            >
              Empowering Businesses with Seamless Global Sourcing
            </h2>

            {/* Description Paragraphs */}
            <p
              className="text-secondary mb-3 fs-6"
              style={{ lineHeight: "1.6" }}
            >
              At <strong>Zen Vora Global Ventures</strong>, we bridge the gap
              between world-class suppliers and growing e-commerce businesses.
              Whether you are selling on{" "}
              <strong>Amazon, eBay, Walmart, or Shopify</strong>, we simplify
              your supply chain so you can focus on scaling your store.
            </p>

            <p
              className="text-secondary mb-4 fs-6"
              style={{ lineHeight: "1.6" }}
            >
              From product discovery and quality control to international
              fulfillment and dropshipping, our team provides trusted,
              end-to-end solutions tailored to your unique market requirements.
            </p>

            {/* Core Pillars Bullet List */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-start gap-2">
                  <span
                    className="rounded-circle d-inline-flex align-items-center justify-content-center text-white flex-shrink-0 mt-1 bg-mySecondary"
                    style={{ width: "20px", height: "20px", fontSize: "11px" }}
                  >
                    ✓
                  </span>
                  <div>
                    <h6
                      className="fw-bold mb-1 text-dark"
                      style={{ fontSize: "0.95rem" }}
                    >
                      Verified Suppliers
                    </h6>
                    <small
                      className="text-secondary"
                      style={{ fontSize: "0.82rem" }}
                    >
                      Direct access to trusted global manufacturers.
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-start gap-2">
                  <span
                    className="rounded-circle d-inline-flex align-items-center justify-content-center text-white flex-shrink-0 mt-1 bg-mySecondary"
                    style={{ width: "20px", height: "20px", fontSize: "11px" }}
                  >
                    ✓
                  </span>
                  <div>
                    <h6
                      className="fw-bold mb-1 text-dark"
                      style={{ fontSize: "0.95rem" }}
                    >
                      Fast Logistics
                    </h6>
                    <small
                      className="text-secondary"
                      style={{ fontSize: "0.82rem" }}
                    >
                      Streamlined shipping and order delivery.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to={`/hello`}
              className="btn rounded-pill px-4 py-2 fw-semibold text-white shadow-sm d-inline-flex align-items-center gap-2 bg-myPrimary"
              style={{ borderColor: "#0d1b2a" }}
            >
              Discover Our Story <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
