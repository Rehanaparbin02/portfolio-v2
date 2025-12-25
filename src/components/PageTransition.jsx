import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import './PageTransition.css'

function PageTransition({ children }) {
    const location = useLocation()
    const containerRef = useRef(null)
    const mosaicGridRef = useRef(null)
    const loaderRef = useRef(null)

    // Get route-specific colors for mosaic tiles
    const getRouteColors = (pathname) => {
        const routes = {
            '/': { primary: '#0a0a0a', secondary: '#1a1a1a' },
            '/about': { primary: '#0f0a14', secondary: '#1a1420' },
            '/projects': { primary: '#0a1014', secondary: '#141a20' },
            '/doit-project': { primary: '#140a0f', secondary: '#201418' },
        }
        return routes[pathname] || routes['/']
    }

    useEffect(() => {
        const container = containerRef.current
        const mosaicGrid = mosaicGridRef.current
        const loader = loaderRef.current

        if (!container || !mosaicGrid || !loader) return

        // Scroll to top immediately
        window.scrollTo(0, 0)

        // Get colors for this route
        const colors = getRouteColors(location.pathname)

        // Create vertical strips dynamically
        const createVerticalStrips = () => {
            mosaicGrid.innerHTML = '' // Clear existing tiles
            const stripCount = 24 // Number of vertical strips (increased for thinner strips)

            for (let i = 0; i < stripCount; i++) {
                const strip = document.createElement('div')
                strip.className = 'vertical-strip'
                strip.dataset.index = i

                // Randomly assign direction (up or down)
                const direction = Math.random() > 0.5 ? 'up' : 'down'
                strip.dataset.direction = direction

                // All strips are pure white
                strip.style.backgroundColor = '#ffffff'

                mosaicGrid.appendChild(strip)
            }

            return document.querySelectorAll('.vertical-strip')
        }

        // Create GSAP context for cleanup
        const ctx = gsap.context(() => {
            const strips = createVerticalStrips()

            // Master timeline for the entire transition
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power2.inOut',
                },
            })

            // Phase 1: Strips slide in from top/bottom based on direction
            strips.forEach((strip) => {
                const direction = strip.dataset.direction
                const startY = direction === 'up' ? '100%' : '-100%'

                gsap.set(strip, { yPercent: parseInt(startY), opacity: 0 })
            })

            tl.to(strips, {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                stagger: {
                    amount: 0.4,
                    from: 'random',
                    ease: 'power1.inOut'
                }
            }, 0)

            // Phase 2: Show loader with pixelated bounce
            tl.fromTo(
                loader,
                { opacity: 0, scale: 0, filter: 'blur(10px)' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.3, ease: 'back.out(2)' },
                '-=0.2'
            )

            // Phase 3: Hide loader
            tl.to(
                loader,
                { opacity: 0, scale: 0, filter: 'blur(10px)', duration: 0.2 },
                '+=0.15'
            )

            // Phase 4: Fade in content with pixelation effect
            tl.fromTo(
                container,
                {
                    opacity: 0,
                    scale: 0.98,
                    filter: 'blur(20px)',
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.6,
                    ease: 'power3.out',
                },
                '-=0.1'
            )

            // Phase 5: Strips slide out to top/bottom based on direction
            strips.forEach((strip, index) => {
                const direction = strip.dataset.direction
                const endY = direction === 'up' ? '-100%' : '100%'

                tl.to(strip, {
                    yPercent: parseInt(endY),
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in'
                }, '-=0.4')
            })

            // Animate child elements with stagger
            tl.fromTo(
                '.animate-in',
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                },
                '-=0.6'
            )
        }, containerRef)

        return () => ctx.revert()
    }, [location.pathname])

    return (
        <>
            <div className="page-transition-mosaic">
                <div ref={mosaicGridRef} className="vertical-strips-container" />
                <div ref={loaderRef} className="transition-loader">
                    <div className="loader-pixel"></div>
                    <div className="loader-pixel"></div>
                    <div className="loader-pixel"></div>
                    <div className="loader-pixel"></div>
                </div>
            </div>
            <div ref={containerRef} className="page-transition-container">
                {children}
            </div>
        </>
    )
}

export default PageTransition
