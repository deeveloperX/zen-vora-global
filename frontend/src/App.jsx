import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './Pages/Home'
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
