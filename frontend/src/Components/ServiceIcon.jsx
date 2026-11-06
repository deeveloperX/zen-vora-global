import { FiSearch } from "react-icons/fi";
import { serviceIcons } from "../data/ServiceIcons";

export default function ServiceIcon({ name, size = 20 }) {
  const Icon = serviceIcons[name] || FiSearch;
  return <Icon size={size} aria-hidden="true" />;
}
