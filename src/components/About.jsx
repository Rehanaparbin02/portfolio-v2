import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);

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
            const eyebrowText = document.querySelector(".section-eyebrow");
            if (eyebrowText && !eyebrowText.dataset.split) {
                const text = eyebrowText.textContent;
                eyebrowText.innerHTML = text.split('').map(char =>
                    `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
                eyebrowText.dataset.split = 'true';
            }

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

            // Marquee Animation
            gsap.to(".marquee-inner", {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-section" ref={containerRef}>
            <div className="parallax-bg">
                <h1 className="bg-text">
                    CREATIVE • DEVELOPER • DESIGNER • CREATIVE • DEVELOPER • DESIGNER •
                    CREATIVE • DEVELOPER • DESIGNER • CREATIVE • DEVELOPER • DESIGNER
                </h1>
            </div>

            <div className="about-card">

                <div className="about-text-content" style={{ position: "relative", bottom: "20rem" }}>
                    <h1 className="section-eyebrow" style={{ position: "relative", top: "27rem" }}>HEY</h1>
                    <h1 className="section-eyebrow" style={{ position: "relative", top: "27rem" }}>THERE!</h1>
                    <p className="about-description">
                        I'm a passionate <span className="highlight highlight-left">Frontend Developer</span> <span className="emoji">🚀</span> crafting
                        interactive and immersive <span className="highlight highlight-right">web experiences</span> <span className="emoji">🌐</span>.
                        Blurring the line between design and code <span className="emoji">🎨</span> to create digital magic <span className="emoji">✨</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
