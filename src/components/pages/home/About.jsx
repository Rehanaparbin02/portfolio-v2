import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);
    // const marqueeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background Text
            gsap.to(".bg-text", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                x: "-20%",
                ease: "none"
            });

            // Reveal Content
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-card",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reset"
                }
            });

            // Split text into characters for animation
            const eyebrowTexts = document.querySelectorAll(".section-eyebrow");
            eyebrowTexts.forEach(eyebrowText => {
                if (eyebrowText && !eyebrowText.dataset.split) {
                    const text = eyebrowText.textContent;
                    eyebrowText.innerHTML = text.split('').map(char =>
                        `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
                    ).join('');
                    eyebrowText.dataset.split = 'true';
                }
            });

            tl.from(".section-eyebrow .char", {
                y: -100,
                opacity: 0,
                rotationX: -90,
                transformOrigin: "50% 50%",
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.7)"
            })
                .from(".about-description", {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .from(".highlight-left", {
                    x: -100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "<+0.2")
                .from(".highlight-right", {
                    x: 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "<");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-section" id="about" ref={containerRef}>
            {/* <div className="parallax-bg">
                <h1 className="bg-text">
                    CREATIVE • DEVELOPER • DESIGNER • CREATIVE • DEVELOPER • DESIGNER •
                    CREATIVE • DEVELOPER • DESIGNER • CREATIVE • DEVELOPER • DESIGNER
                </h1>
            </div> */}

            <div className="about-card">

                <div className="about-text-content" style={{ position: "relative", bottom: "20rem" }}>
                    <h1 className="section-eyebrow" style={{ position: "relative", top: "27rem" }}>HEY</h1>
                    <h1 className="section-eyebrow" style={{ position: "relative", top: "27rem" }}>THERE!</h1>
                    <p className="about-description">
                        I’m a <span className="highlight highlight-left">Full Stack Developer</span> <i className="fa-solid fa-rocket emoji"></i> driven by a passion for building <span className="highlight highlight-right">engaging web and mobile experiences <i className="fa-solid fa-mobile-screen-button emoji-black"></i></span>.
                        I merge thoughtful<span className="highlight highlight-left"> design <i className="fa-solid fa-palette emoji-black"></i></span> with <span className="highlight highlight-right">clean, efficient code</span> <i className="fa-solid fa-laptop-code emoji"></i> to transform ideas into <span className="highlight highlight-right">seamless digital experiences <i className="fa-solid fa-wand-magic-sparkles emoji-black"></i></span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
