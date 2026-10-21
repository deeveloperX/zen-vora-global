import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Footer from './Components/Footer'
import TopBar from './Components/TopBar'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
      <TopBar />
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
