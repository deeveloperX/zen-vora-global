import React from "react";

const SupportedMarkets = () => {
  return (
    <>
      {/* Innovative Add-on: Supported Marketplace Micro-Badges */}
      <div className="py-4 px-5 ">
        <small
          className="text-uppercase fw-bold text-secondary d-block mb-4"
        >
          Supported Ecosystem & Marketplaces:
        </small>

        <div className="d-flex flex-wrap align-items-center gap-2 justify-content-between">
          {[
            "Amazon",
            "eBay",
            "Walmart",
            "Home Depot",
            "AliExpress",
            "Alibaba",
          ].map((platform, idx) => (
            <span
              key={idx}
              className="badge bg-light text-myPrimary border px-4 py-3 rounded-pill fw-semibold shadow-2xs fs-5"
            >
              <span className="text-mySecondary">●</span>{" "}
              {platform}
            </span>
          ))}
        </div>
      </div>
      </>
  );
};

export default SupportedMarkets;
