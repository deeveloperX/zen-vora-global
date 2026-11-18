import { useState, useEffect } from "react";
import { getHighlights } from "../api/highlights";
import HighlightIcon from "./HighlightIcon";

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

  useEffect(() => {
    getHighlights()
      .then((data) => {
        if (Array.isArray(data)) {
          setFeatures(data);
        }
      })
      .catch((err) => {
        console.warn("Backend highlights unreachable. Falling back to default data.", err);
        // Keeps fallbackHighlights active automatically
      });
  }, []);

  if (features.length === 0) return null;

  return (
    <section className="bg-white border-bottom rounded-4 mx-auto shadow-sm py-4 px-3 feature-custom-position">
      <div className="container">
        <div className="row g-3 justify-content-center align-items-stretch">
          {features.map((item) => {
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
                    <HighlightIcon name={item.icon} />
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