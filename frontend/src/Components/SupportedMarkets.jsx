
const SupportedMarkets = () => {
  const platforms = [
    "Amazon",
    "eBay",
    "Walmart",
    "Home Depot",
    "AliExpress",
    "Alibaba",
  ];

  return (
    <section className="py-4 bg-white my-4">
      <div className="container px-3 px-md-4">
        
        {/* Section Header / Label */}
        <div className="text-center text-md-start mb-3 mb-md-4">
          <small className="text-uppercase fw-bold text-secondary tracking-wider fs-7">
            Supported Ecosystem &amp; Marketplaces:
          </small>
        </div>

        {/* Badges Container */}
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between gap-2 gap-md-3">
          {platforms.map((platform, idx) => (
            <div
              key={idx}
              className="badge bg-light text-myPrimary border px-3 px-md-4 py-2 py-md-3 rounded-pill fw-semibold shadow-2xs fs-6 fs-md-5 d-inline-flex align-items-center gap-2 marketplace-badge"
            >
              <span className="text-mySecondary fs-6">●</span>
              <span>{platform}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SupportedMarkets;