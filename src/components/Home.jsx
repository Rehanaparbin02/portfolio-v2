import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance Animation
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Character Reveal (Staggered)
            const chars = containerRef.current.querySelectorAll('.char');

            tl.from(chars, {
                y: 100, // Move from below
                opacity: 0,
                rotateX: -90,
                stagger: 0.02,
                duration: 1,
                ease: "power4.out"
            })
                .from(".selection-box", {
                    scale: 0,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                }, "-=0.5");

            // Parallax Scroll Effect
            gsap.to(".top-row", {
                y: -150,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            gsap.to(".middle-row", {
                y: -80,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            gsap.to(".bottom-row", {
                y: -40,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // Scale background on scroll
            gsap.to(".hero-content", {
                scale: 0.9,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Individual text elements for more dynamic effect
            gsap.to(".text-uiux", {
                x: -150,
                y: -50,
                rotation: -15,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            gsap.to(".designer-wrapper", {
                x: 150,
                y: -80,
                rotation: 15,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            gsap.to(".text-ampersand", {
                rotation: 180,
                scale: 1.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            gsap.to(".frontend-wrapper", {
                x: -120,
                y: 50,
                rotation: -10,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            gsap.to(".text-developer", {
                x: 120,
                y: 80,
                rotation: 10,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="home-container" id="home" ref={containerRef}>
            <div className="hero-content">
                <div className="top-row">
                    <h1 className="text-uiux">
                        {"UI/UX".split("").map((c, i) => (
                            <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
                        ))}
                    </h1>
                    <div className="designer-wrapper">
                        <h1 className="text-designer">
                            {"DESIGNER".split("").map((c, i) => (
                                <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
                            ))}
                        </h1>
                        <div className="selection-box designer-box">
                            <div className="handle tl"></div>
                            <div className="handle tr"></div>
                            <div className="handle bl"></div>
                            <div className="handle br"></div>
                        </div>
                    </div>
                </div>

                <div className="middle-row">
                    <h1 className="text-ampersand">
                        {"&".split("").map((c, i) => (
                            <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
                        ))}
                    </h1>
                </div>

                <div className="bottom-row">
                    <div className="frontend-wrapper">
                        <h1 className="text-frontend-fullstack">
                            {"FULLSTACK".split("").map((c, i) => (
                                <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
                            ))}
                        </h1>
                        <div className="selection-box frontend-box">
                            <div className="handle tl"></div>
                            <div className="handle tr"></div>
                            <div className="handle bl"></div>
                            <div className="handle br"></div>
                        </div>
                    </div>
                    <h1 className="text-developer">
                        {"DEVELOPER".split("").map((c, i) => (
                            <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
                        ))}
                    </h1>
                </div>
            </div>
        </div>
    );
}