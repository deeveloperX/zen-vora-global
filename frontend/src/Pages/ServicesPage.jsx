import { servicesData } from '../data/ServicesData';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router';
import ServicesCtaBanner from '../Components/ServicesCtaBanner';
import WhyPartner from '../Components/WhyPartner';

const ServicesPage = () => {
  return (
    <div className="services-page bg-light">
      <ServicesCtaBanner />

      <section id="services-grid" className="py-4">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark-blue mb-2">What We Offer</h2>
            <p className="text-muted col-lg-6 mx-auto small">
              Specialized expertise designed to streamline your supply chain, boost store conversions, and scale sales across global platforms.
            </p>
          </div>

          <div className="row g-4 align-items-stretch">
            {servicesData.map((service) => {
              const IconComponent = service.icon;

              return (
                <div key={service.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden d-flex flex-column service-card-hover">
                    
                    {/* Card Image */}
                    <div style={{ height: '200px', overflow: 'hidden' }} className="position-relative">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-100 h-100 object-fit-cover"
                      />
                      <div className="position-absolute top-0 end-0 m-3 rounded-circle bg-orange text-white p-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                        <IconComponent size={20} />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="fw-bold text-dark-blue mb-2 fs-5">
                          {service.title}
                        </h4>
                        <p className="text-muted small mb-4 lh-lg">
                          {service.description} Comprehensive management tailored to maximize your return on investment and minimize operational hurdles.
                        </p>
                      </div>

                      <div className="pt-3 border-top border-light">
                        <Link to={`/support`} href="#contact" className="text-orange text-decoration-none fw-semibold small d-inline-flex align-items-center gap-1 service-link">
                          <span>Get Support</span>
                          <BsArrowRight />
                        </Link>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <WhyPartner />
    </div>
  );
};

export default ServicesPage;