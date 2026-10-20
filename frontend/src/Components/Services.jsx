const Services = () => {
  const serviceList = [
    {
      title: "Product Sourcing",
      description: "Find high-demand & profitable products from global suppliers.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80",
      // Search / Magnifying Glass Icon
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      title: "Dropshipping Services",
      description: "Sell without inventory. We ship directly to your customers.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=500&q=80",
      // Shopping Cart Icon
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      )
    },
    {
      title: "E-commerce Support",
      description: "Get expert guidance on selling, marketing & scaling your business.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
      // Bar Chart Icon
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    },
    {
      title: "International Shipping",
      description: "Fast & reliable shipping from global warehouses to your customers.",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=500&q=80",
      // Airplane Icon
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13"></path>
          <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
        </svg>
      )
    },
    {
      title: "Business Growth",
      description: "Tools & strategies to grow your online store and increase sales.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=500&q=80",
      // Headset Support Icon
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-5" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="container-fluid px-lg-5 py-3">
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <p className="fw-semibold text-uppercase mb-1" style={{ color: '#ff6600', letterSpacing: '1px', fontSize: '0.9rem' }}>
            — Our Services —
          </p>
          <h2 className="fw-bold mb-2" style={{ color: '#0d1b2a', fontSize: '2.2rem' }}>
            Complete E-commerce Solutions
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '650px', fontSize: '0.95rem' }}>
            From product sourcing to worldwide delivery, we provide end-to-end services to help you build and grow a successful online business.
          </p>
        </div>

        {/* 5 Cards Row */}
        <div className="row g-3 justify-content-center align-items-stretch">
          {serviceList.map((service, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg" style={{ minWidth: '220px' }}>
              <div className="card h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden d-flex flex-column">
                
                {/* Image Container */}
                <div style={{ height: '140px', overflow: 'hidden' }}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="card-body p-3 pt-4 text-center position-relative d-flex flex-column justify-content-between">
                  
                  {/* Floating Circular Orange Badge */}
                  <div 
                    className="position-absolute start-50 translate-middle rounded-circle text-white d-flex align-items-center justify-content-center shadow-sm"
                    style={{ 
                      top: '0%', 
                      width: '42px', 
                      height: '42px', 
                      backgroundColor: '#ff5500', 
                      border: '3px solid #ffffff' 
                    }}
                  >
                    {service.icon}
                  </div>

                  <h6 className="fw-bold text-dark mt-2 mb-2" style={{ fontSize: '1rem', color: '#0d1b2a' }}>
                    {service.title}
                  </h6>
                  
                  <p className="text-secondary mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                    {service.description}
                  </p>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;