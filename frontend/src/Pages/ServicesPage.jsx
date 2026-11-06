import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router';
import ServicesCtaBanner from '../Components/ServicesCtaBanner';
import Services from '../Components/Services';
import WhyPartner from '../Components/WhyPartner';
import useServices from '../hooks/useServices';

const ServicesPage = () => {
  const { services, loading, error } = useServices();

  return (
    <div className="services-page bg-light">
      <ServicesCtaBanner />

      <Services />
      
      <WhyPartner />
    </div>
  );
};

export default ServicesPage;