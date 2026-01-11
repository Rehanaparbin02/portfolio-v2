// import { useEffect, useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Lenis from 'lenis'
// import './App.css'
// import Home from './components/pages/home/Home'
// import HamburgerMenu from './components/common/HamburgerMenu'
// import About from './components/pages/home/About'
// import Work from './components/pages/home/Work'
// import Projects from './components/pages/home/Projects'
// import AboutFull from './components/pages/AboutFull'
// import Footer from './components/common/Footer'
// import ProjectShowcase from './components/pages/ProjectShowcase'
// import DoItProject from './components/pages/DoItProject'
// import Contact from './components/pages/Contact'
// import CustomCursor from './components/common/CustomCursor'
// import KoaProject from './components/pages/KoaProject'
// import EventlyProject from './components/pages/EventlyProject'
// import ZenfloProject from './components/pages/ZenfloProject'
// import CounterLoader from './components/common/CounterLoader'


// gsap.registerPlugin(ScrollTrigger)

// function HomeLayout({ isLoaded }) {
//   return (
//     <>
//       <Home isLoaded={isLoaded} />
//       <About />
//       <Work />
//       <Projects />
//     </>
//   )
// }

// function App() {
//   const [isLoading, setIsLoading] = useState(true)

//   const handleLoadComplete = () => {
//     setIsLoading(false)
//   }

//   useEffect(() => {
//     // Initialize Lenis
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//       touchMultiplier: 2,
//     })

//     function raf(time) {
//       lenis.raf(time)
//       requestAnimationFrame(raf)
//     }

//     requestAnimationFrame(raf)

//     lenis.on('scroll', ScrollTrigger.update)

//     gsap.ticker.add((time) => {
//       lenis.raf(time * 1000)
//     })

//     gsap.ticker.lagSmoothing(0)

//     // Force ScrollTrigger refresh after initial render
//     const initialRefresh = setTimeout(() => {
//       ScrollTrigger.refresh()
//     }, 100)

//     // Additional refresh after images/content load
//     const delayedRefresh = setTimeout(() => {
//       ScrollTrigger.refresh()
//     }, 500)

//     // Refresh on window load
//     const handleLoad = () => {
//       ScrollTrigger.refresh()
//     }

//     window.addEventListener('load', handleLoad)

//     return () => {
//       lenis.destroy()
//       clearTimeout(initialRefresh)
//       clearTimeout(delayedRefresh)
//       window.removeEventListener('load', handleLoad)
//     }
//   }, [])

//   return (
//     <>
//       {isLoading && <CounterLoader onLoadComplete={handleLoadComplete} />}
//       <Router>
//         <CustomCursor />
//         <div className="main-wrapper">
//           <HamburgerMenu />
//           <Routes>
//             <Route path="/" element={
//               <HomeLayout isLoaded={!isLoading} />
//             } />
//             <Route path="/about" element={
//               <AboutFull />
//             } />
//             <Route path="/projects" element={
//               <ProjectShowcase />
//             } />
//             <Route path="/doit-project" element={
//               <DoItProject />
//             } />
//             <Route path='/koa-project' element={
//               <KoaProject />
//             } />
//             <Route path='/evently-project' element={
//               <EventlyProject />
//             } />
//             <Route path='/zenflo-project' element={
//               <ZenfloProject />
//             } />
//             <Route path="/contact" element={
//               <Contact />
//             } />
//             <Route path="*" element={
//               <HomeLayout />
//             } />

//           </Routes>
//           <Footer />
//         </div>
//       </Router>
//     </>
//   )
// }

// export default App


import { useEffect, useState } from 'react'
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
import EventlyProject from './components/pages/EventlyProject'
import ZenfloProject from './components/pages/ZenfloProject'
import CounterLoader from './components/common/CounterLoader'

gsap.registerPlugin(ScrollTrigger)

function HomeLayout({ isLoaded }) {
  return (
    <>
      <Home isLoaded={isLoaded} />
      <About />
      <Work />
      <Projects />
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
    })

    // Lenis scroll event for ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Animation frame for Lenis
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Refresh ScrollTrigger after content loads
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      lenis.destroy()
      clearTimeout(refreshTimeout)
    }
  }, [])

  return (
    <>
      {isLoading && <CounterLoader onLoadComplete={handleLoadComplete} />}
      <Router>
        <CustomCursor />
        <div className="main-wrapper">
          <HamburgerMenu />
          <Routes>
            <Route path="/" element={
              <HomeLayout isLoaded={!isLoading} />
            } />
            <Route path="/about" element={
              <AboutFull />
            } />
            <Route path="/projects" element={
              <ProjectShowcase />
            } />
            <Route path="/doit-project" element={
              <DoItProject />
            } />
            <Route path='/koa-project' element={
              <KoaProject />
            } />
            <Route path='/evently-project' element={
              <EventlyProject />
            } />
            <Route path='/zenflo-project' element={
              <ZenfloProject />
            } />
            <Route path="/contact" element={
              <Contact />
            } />
            <Route path="*" element={
              <HomeLayout />
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App