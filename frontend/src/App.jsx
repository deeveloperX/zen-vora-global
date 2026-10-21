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

function App() {

  return (
    <>
      <BrowserRouter>
      <TopBar />
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/support' element={<Contact   />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
