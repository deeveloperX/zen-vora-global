import FeaturesBar from "../Components/FeaturesBar"
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"
import TopBar from "../Components/TopBar"
import Services from "../Components/Services"
import CtaBanner from "../Components/CtaBanner"

const Home = () => {
  return (
    <>
    <TopBar/>
    <Navbar />
    <Hero/>
    <FeaturesBar/>
    <Services />
    <CtaBanner />
    </>
  )
}

export default Home