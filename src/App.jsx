import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './App.css'
import Home from './components/Home'
import HamburgerMenu from './components/HamburgerMenu'
import About from './components/About'
import Work from './components/Work'
import Projects from './components/Projects'
import AboutFull from './components/AboutFull'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function HomeLayout() {
  return (
    <>
      <Home />
      <About />
      <Work />
      <Projects />
      <Footer />
    </>
  )
}

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <Router>
      <div className="main-wrapper">
        <HamburgerMenu />
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/about" element={<AboutFull />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
