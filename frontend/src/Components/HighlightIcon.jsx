import { BsHeadset } from "react-icons/bs";
import { FiGlobe, FiShield, FiTrendingUp, FiTruck } from "react-icons/fi";

const iconMap = {
  FiGlobe,
  FiShield,
  FiTruck,
  BsHeadset,
  FiTrendingUp,
};

export default function HighlightIcon({ name, size = 22 }) {
  if (name?.startsWith("data:image/")) {
    return (
      <img
        src={name}
        alt=""
        aria-hidden="true"
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }

  const Icon = iconMap[name] || FiGlobe;
  return <Icon size={size} aria-hidden="true" />;
}
