import { useState, useEffect } from "react";
import { FiGlobe, FiShield, FiTruck, FiTrendingUp } from "react-icons/fi";
import { BsHeadset } from "react-icons/bs";
import { getHighlights } from "../api/highlights";

// Icon mapping dictionary
const iconMap = {
  FiGlobe: FiGlobe,
  FiShield: FiShield,
  FiTruck: FiTruck,
  BsHeadset: BsHeadset,
  FiTrendingUp: FiTrendingUp,
};

// Fallback static data in case backend fetch fails or is unreachable
const fallbackHighlights = [
  { id: 1, title: "Global Market Access", subtitle: "Shop & Sell Worldwide", icon: "FiGlobe" },
  { id: 2, title: "Secure & Reliable", subtitle: "Safe & Trusted Deals", icon: "FiShield" },
  { id: 3, title: "Fast & Efficient", subtitle: "Worldwide Shipping", icon: "FiTruck" },
  { id: 4, title: "Dedicated Support", subtitle: "Always Here to Help", icon: "BsHeadset" },
  { id: 5, title: "Grow Your Business", subtitle: "Expand Without Limits", icon: "FiTrendingUp" }
];

const FeaturesBar = () => {
  const [features, setFeatures] = useState(fallbackHighlights);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHighlights()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setFeatures(data);
        }
      })
      .catch((err) => {
        console.warn("Backend highlights unreachable. Falling back to default data.", err);
        // Keeps fallbackHighlights active automatically
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Never return null or render blank; always show either fresh or fallback data
  if (loading && features.length === 0) return null;

  return (
    <section className="bg-white border-bottom rounded-4 mx-auto shadow-sm py-4 px-3 feature-custom-position">
      <div className="container">
        <div className="row g-3 justify-content-center align-items-stretch">
          {features.map((item) => {
            const IconComponent = iconMap[item.icon] || FiGlobe;

            return (
              <div
                key={item.id || item._id}
                className="col-6 col-md-4 col-lg d-flex"
                style={{ minWidth: "160px" }}
              >
                <div className="feature-card w-100 p-3 rounded-3 border border-light bg-light-subtle d-flex flex-column align-items-center text-center justify-content-center">
                  <div
                    className="mb-2 p-2 rounded-circle bg-white text-mySecondary d-inline-flex align-items-center justify-content-center shadow-sm feature-icon-box"
                    style={{ width: "46px", height: "46px" }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <h6
                    className="fw-bold text-myPrimary mb-1"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {item.title}
                  </h6>
                  <span
                    className="text-muted text-truncate w-100"
                    style={{ fontSize: "0.75rem" }}
                  >
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