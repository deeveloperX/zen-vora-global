import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Footer from './Components/Footer'
import TopBar from './Components/TopBar'
import Navbar from './Components/Navbar'
import Contact from './Pages/Contact'
import Blogs from './Pages/Blogs'
import BlogDetails from './Pages/BlogDetails'
import FaqPage from './Pages/FaqPage'
import ServicesPage from './Pages/ServicesPage'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsConditions from './Pages/TermsConditions'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import logo from './assets/android-chrome-192x192.png'

function App() {

  return (
    <div className='overflow-x-hidden'>
      <BrowserRouter>
      <TopBar />
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/support' element={<Contact   />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
          <Route path='/faqs' element={<FaqPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-conditions' element={<TermsConditions/>}/>
        </Routes>
        <Footer />
        <FloatingWhatsApp
          phoneNumber='923203664619'
          accountName='ZenVora Global'
          statusMessage="We're here to help!"
          chatMessage='Hello! How can we help you?'
          notificationClassName='floating-whatsapp-notification'
          notificationStyle={{ backgroundColor: '#d50d0d' }}
          avatar={logo}
          className='custom-chatbox'
          allowClickAway="true"
          darkMode="true"
          
        />
      </BrowserRouter>
    </div>
  )
}

export default App
