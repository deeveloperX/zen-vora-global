
const Mission = () => {
  const pillars = [
    {
      title: "Our Mission",
      description: "To empower global e-commerce businesses by removing supply chain friction, providing direct access to verified international suppliers, and enabling seamless cross-border trading.",
      // Target / Compass Icon
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      )
    },
    {
      title: "Our Vision",
      description: "To become the world's most trusted end-to-end sourcing and dropshipping ecosystem, helping online store owners scale globally on Amazon, eBay, Walmart, and beyond.",
      // Eye / Telescope Globe Icon
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      )
    },
    {
      title: "Our Values",
      description: "Transparency, speed, and unwavering reliability. We put customer growth first by ensuring strict product quality control, competitive pricing, and fast global delivery.",
      // Shield / Heart Icon
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-3" >
      <div className="container py-4">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <p className="fw-semibold text-uppercase mb-1 text-mySecondary" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
            — Purpose & Values —
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="row g-4 justify-content-center">
          {pillars.map((item, index) => (
            <div key={index} className="col-12 col-md-4">
              <div className="card h-100 border -0 rounded-4 p-4 shadow-sm bg-white position-relative overflow-hidden">
                
                {/* Top Accent Line */}
                <div 
                  className="position-absolute top-0 start-0 w-100 bg-mySecondary" 
                  style={{ height: '4px',  }}
                />

                {/* Icon Container */}
                <div 
                  className="mb-4 rounded-3 d-inline-flex align-items-center justify-content-center shadow-sm bg-myPrimary"
                  style={{ width: '50px', height: '50px' }}
                >
                  {item.icon}
                </div>

                <h5 className="fw-bold text-dark mb-4   ">
                  {item.title}
                </h5>

                <p className="text-secondary mb-0 fs-6" style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
                  {item.description}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Mission;