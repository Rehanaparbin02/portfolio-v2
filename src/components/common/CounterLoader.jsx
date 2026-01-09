import { useEffect, useState } from 'react'
import gsap from 'gsap'
import './CounterLoader.css'

const CounterLoader = ({ onLoadComplete }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // Counter animation
        const counter = { value: 0 }
        const tl = gsap.timeline({
            onComplete: () => {
                // Animate loader out
                gsap.to('.counter-loader', {
                    yPercent: -100,
                    duration: 1,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        if (onLoadComplete) onLoadComplete()
                    }
                })
            }
        })

        // Animate counter from 0 to 100
        tl.to(counter, {
            value: 100,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                setCount(Math.floor(counter.value))
            }
        })

        // Animate the loading text
        tl.from('.loading-text', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, 0.3)

        // Animate the progress bar
        tl.to('.progress-bar-fill', {
            width: '100%',
            duration: 2.5,
            ease: 'power2.inOut'
        }, 0)

        // Animate decorative lines
        tl.from('.decorative-line', {
            scaleX: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
        }, 0.5)

        return () => {
            tl.kill()
        }
    }, [onLoadComplete])

    return (
        <div className="counter-loader">
            <div className="loader-content">
                <div className="decorative-line top-line"></div>

                <div className="counter-display">
                    <div className="counter-number">{count}</div>
                    <div className="percent-symbol">%</div>
                </div>

                <div className="loading-text">Loading Experience</div>

                <div className="progress-bar">
                    <div className="progress-bar-fill"></div>
                </div>

                <div className="decorative-line bottom-line"></div>
            </div>

            {/* Animated background grid */}
            <div className="loader-grid">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="grid-line"></div>
                ))}
            </div>
        </div>
    )
}

export default CounterLoader
