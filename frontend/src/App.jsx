import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Footer from "./Components/Footer";
import TopBar from "./Components/TopBar";
import Navbar from "./Components/Navbar";
import Contact from "./Pages/Contact";
import Blogs from "./Pages/Blogs";
import BlogDetails from "./Pages/BlogDetails";
import FaqPage from "./Pages/FaqPage";
import ServicesPage from "./Pages/ServicesPage";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import logo from "./assets/android-chrome-192x192.png";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/Components/AdminLayout";
import DashboardHome from "./admin/DashboardHome";
import BlogManagement from "./admin/BlogManagement";
import ServiceManagement from "./admin/ServiceManagement";
import FaqManagement from "./admin/FaqManagement";
import LegalManagement from "./admin/LegalManagement";
import HighlightsManagement from "./admin/HighlightsManagement";

// Create a Layout component to check the current route location
function Layout() {
  const { pathname } = useLocation();

  // Define routes where global headers, footers, and floating elements should be hidden
  const hideGlobalElements =
    pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

  return (
    <>
      {!hideGlobalElements && <TopBar />}
      {!hideGlobalElements && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        {/* Admin Login Route */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<Navigate to="/admin" replace />} />

        {/* Admin Dashboard Layout & Nested Modules */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="blogs" element={<BlogManagement />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="highlights" element={<HighlightsManagement />} />
          <Route path="faqs" element={<FaqManagement />} />
          <Route path="legal" element={<LegalManagement />} />
        </Route>
      </Routes>

      {!hideGlobalElements && <Footer />}

      {!hideGlobalElements && (
        <FloatingWhatsApp
          phoneNumber="923203664619"
          accountName="ZenVora Global"
          statusMessage="We're here to help!"
          chatMessage="Hello! How can we help you?"
          notificationClassName="floating-whatsapp-notification"
          notificationStyle={{ backgroundColor: "#d50d0d" }}
          avatar={logo}
          className="custom-chatbox"
          allowClickAway={true}
          darkMode={true}
        />
      )}
    </>
  );
}

function App() {
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
