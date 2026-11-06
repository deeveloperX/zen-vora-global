import { BsHeadset } from "react-icons/bs";
import { FiBarChart2, FiSearch, FiShoppingCart } from "react-icons/fi";
import { HiOutlinePaperAirplane } from "react-icons/hi2";

export const serviceIconOptions = [
  { value: "search", label: "Search" },
  { value: "shopping-cart", label: "Shopping cart" },
  { value: "bar-chart", label: "Bar chart" },
  { value: "paper-airplane", label: "Paper airplane" },
  { value: "headset", label: "Headset" },
];

export const serviceIcons = {
  search: FiSearch,
  "shopping-cart": FiShoppingCart,
  "bar-chart": FiBarChart2,
  "paper-airplane": HiOutlinePaperAirplane,
  headset: BsHeadset,
};
