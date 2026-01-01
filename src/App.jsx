import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './App.css'
import Home from './components/pages/home/Home'
import HamburgerMenu from './components/common/HamburgerMenu'
import About from './components/pages/home/About'
import Work from './components/pages/home/Work'
import Projects from './components/pages/home/Projects'
import AboutFull from './components/pages/AboutFull'
import Footer from './components/common/Footer'
import ProjectShowcase from './components/pages/ProjectShowcase'
import DoItProject from './components/pages/DoItProject'
import Contact from './components/pages/Contact'
import CustomCursor from './components/common/CustomCursor'
import KoaProject from './components/pages/KoaProject'
// import PageTransition from './components/PageTransition'


gsap.registerPlugin(ScrollTrigger)

function HomeLayout() {
  return (
    <>
      <Home />
      <About />
      <Work />
      <Projects />
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
      <CustomCursor />
      <div className="main-wrapper">
        <HamburgerMenu />
        <Routes>
          <Route path="/" element={
            // <PageTransition>
            <HomeLayout />
            // </PageTransition>
          } />
          <Route path="/about" element={
            // <PageTransition>
            <AboutFull />
            // </PageTransition>
          } />
          <Route path="/projects" element={
            // <PageTransition>
            <ProjectShowcase />
            // </PageTransition>
          } />
          <Route path="/doit-project" element={
            // <PageTransition>
            <DoItProject />
            // </PageTransition>
          } />
          <Route path='/koa-project' element={
            // <PageTransition>
            <KoaProject />
            // </PageTransition>
          } />
          <Route path="/contact" element={
            // <PageTransition>
            <Contact />
            // </PageTransition>
          } />
          <Route path="*" element={
            // <PageTransition>
            <HomeLayout />
            // </PageTransition>
          } />

        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
