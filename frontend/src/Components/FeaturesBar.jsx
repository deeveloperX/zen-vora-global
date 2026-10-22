import { featuresData } from '../data/FeaturesData';

const FeaturesBar = () => {
  return (
    <section className="bg-white border-bottom rounded-4 mx-auto shadow-sm py-4 px-3 feature-custom-position">
      <div className="container">
        <div className="row g-3 justify-content-center align-items-stretch">
          {featuresData.map((item) => {
            const IconComponent = item.icon;

            return (
              <div 
                key={item.id} 
                className="col-6 col-md-4 col-lg d-flex"
                style={{ minWidth: '160px' }}
              >
                <div className="feature-card w-100 p-3 rounded-3 border border-light bg-light-subtle d-flex flex-column align-items-center text-center justify-content-center">
                  
                  {/* Icon Wrapper */}
                  <div 
                    className="mb-2 p-2 rounded-circle bg-white text-mySecondary d-inline-flex align-items-center justify-content-center shadow-sm feature-icon-box" 
                    style={{ width: '46px', height: '46px' }}
                  >
                    <IconComponent size={22} />
                  </div>

                  {/* Title & Subtitle */}
                  <h6 className="fw-bold text-myPrimary mb-1" style={{ fontSize: '0.85rem' }}>
                    {item.title}
                  </h6>
                  <span className="text-muted text-truncate w-100" style={{ fontSize: '0.75rem' }}>
                    {item.subtitle}
                  </span>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;