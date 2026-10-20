const FeaturesBar = () => {
  const features = [
    {
      title: "Global Market Access",
      subtitle: "Shop & Sell Worldwide",
      // Globe Icon
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" style={{ fontSize: '1.8rem' }}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    },
    {
      title: "Secure & Reliable",
      subtitle: "Safe & Trusted Deals",
      // Shield / Check Icon
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" style={{ fontSize: '1.8rem' }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
      )
    },
    {
      title: "Fast & Efficient",
      subtitle: "Worldwide Shipping",
      // Truck Icon
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" style={{ fontSize: '1.8rem' }}>
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      )
    },
    {
      title: "Dedicated Support",
      subtitle: "Always Here to Help",
      // Headset Icon
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" style={{ fontSize: '1.8rem' }}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      )
    },
    {
      title: "Grow Your Business",
      subtitle: "Expand Without Limits",
      // Trending Up Icon
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" style={{ fontSize: '1.8rem' }}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white border-bottom shadow-sm">
      <div className="container py-3">
        {/* Row with g-0 to remove gutters, text-center for small screens, text-lg-start for large */}
        <div className="row text-center text-lg-start align-items-center justify-content-center g-0">
          {features.map((item, index) => (
            /* col-12 for full width on mobile, col-md-6 (2 per row on tablets), col-lg (auto-stretches even 5 per row) */
            <div 
              key={index} 
              className="col-12 col-md-6 col-lg d-flex flex-column align-items-center justify-content-center p-2"
              style={{ minWidth: '180px' }} // Added min-width to ensure they can't shrink too small and wrap
            >
              <div className="mb-2 p-1 rounded-circle bg-white d-inline-flex align-items-center justify-content-center shadow-sm" style={{ width: '48px', height: '48px' , border: '1.5px solid #e2e8f0' }}>
                {item.icon}
              </div>
              <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.9rem' }}>{item.title}</h6>
              <small className="text-secondary" style={{ fontSize: '0.8rem' }}>{item.subtitle}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;