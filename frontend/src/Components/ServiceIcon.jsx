import { FiSearch } from "react-icons/fi";
import { serviceIcons } from "../data/ServiceIcons";

export default function ServiceIcon({ name, size = 20 }) {
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

  const Icon = serviceIcons[name] || FiSearch;
  return <Icon size={size} aria-hidden="true" />;
}
