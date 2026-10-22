import { FiSearch, FiShoppingCart, FiBarChart2 } from 'react-icons/fi';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import { BsHeadset } from 'react-icons/bs';

export const servicesData = [
  {
    id: 1,
    title: "Product Sourcing",
    description: "Find high-demand & profitable products from global suppliers.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80",
    icon: FiSearch
  },
  {
    id: 2,
    title: "Dropshipping Services",
    description: "Sell without inventory. We ship directly to your customers.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=500&q=80",
    icon: FiShoppingCart
  },
  {
    id: 3,
    title: "E-commerce Support",
    description: "Get expert guidance on selling, marketing & scaling your business.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
    icon: FiBarChart2
  },
  {
    id: 4,
    title: "International Shipping",
    description: "Fast & reliable shipping from global warehouses to your customers.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=500&q=80",
    icon: HiOutlinePaperAirplane
  },
  {
    id: 5,
    title: "Business Growth",
    description: "Tools & strategies to grow your online store and increase sales.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=500&q=80",
    icon: BsHeadset
  }
];