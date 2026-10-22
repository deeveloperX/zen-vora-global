import { servicesData } from '../data/ServicesData';

const Services = () => {
  return (
    <section className="py-5 my-4 bg-light-subtle container-fluid px-lg-5 py-3">
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
          {servicesData.map((service) => {
            const IconComponent = service.icon;

            return (
              <div key={service.id} className="col-12 col-sm-6 col-md-4 col-lg" style={{ minWidth: '220px' }}>
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
                      <IconComponent size={20} />
                    </div>

                    <h6 className="fw-bold mt-2 mb-2" style={{ fontSize: '1rem', color: '#0d1b2a' }}>
                      {service.title}
                    </h6>
                    
                    <p className="text-secondary mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                      {service.description}
                    </p>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
    </section>
  );
};

export default Services;