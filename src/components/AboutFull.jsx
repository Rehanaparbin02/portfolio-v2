import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './AboutFull.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutFull() {
    const containerRef = useRef(null);
    const heroImageRef = useRef(null);
    const sphereRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Mouse follower setup
            // Target the WHOLE square (heroImageRef) - Horizontal Only
            const xTo = gsap.quickTo(heroImageRef.current, "x", { duration: 0.5, ease: "power3", overwrite: "auto" });

            const handleMouseMove = (e) => {
                if (!heroImageRef.current) return;

                // Calculate the center of the element relative to the viewport
                const currentX = gsap.getProperty(heroImageRef.current, "x");
                const { left, width } = heroImageRef.current.getBoundingClientRect();

                const centerX = left - currentX + width / 2;
                const mouseX = e.clientX;

                // Calculate distance from center - Horizontal only
                // Use factor of 1 to allow full range movement to the edges
                const xMove = (mouseX - centerX) * 1;

                xTo(xMove);
            };

            window.addEventListener("mousemove", handleMouseMove);

            // Cleanup listener inside context cleanup? 
            // Better to do it in return of useEffect or use GSAP's matchMedia/context scoping if possible.
            // Since we're adding to window, we should manually remove it.

            // Entrance animation
            const tl = gsap.timeline();

            tl.from(".about-full-title h1", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            })
                .from(".about-full-hero-image", {
                    scale: 1.2,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power3.out"
                }, "-=0.8")
                .from(".about-full-intro p", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                }, "-=1");

            // Scroll animations for sections
            gsap.utils.toArray(".about-full-section").forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });

            // Cleanup function for the listener
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="about-full-container" ref={containerRef}>
            {/* Header / Back Link */}
            <header className="about-full-header">
                <Link to="/" className="back-link">
                    <span className="arrow">←</span> Back to Home
                </Link>
            </header>

            {/* Hero Section */}
            <section className="about-full-hero">
                <div className="about-full-title">
                    <h1>DESIGNING</h1>
                    <h1>WITH</h1>
                    <h1 className="outline-text">PURPOSE</h1>
                </div>
                <div className="about-full-intro">
                    <p>I am a creative developer based in the digital world, specializing in building exceptional digital experiences.</p>
                </div>
                <div className="about-full-hero-image" ref={heroImageRef}>
                    {/* Decorative element */}
                    <div className="gradient-sphere" ref={sphereRef}></div>
                </div>
            </section>

            {/* Detailed Info */}
            <section className="about-full-section about-full-story">
                <div className="section-grid">
                    <div className="section-label">01 / MY STORY</div>
                    <div className="section-content">
                        <h3>Fusing Code & Design</h3>
                        <p>
                            My journey started with a fascination for how things look on the screen, which quickly evolved into a passion for how they work. I believe that great design is not just about aesthetics, but about solving problems and creating intuitive experiences.
                        </p>
                        <p>
                            With a background in both UI/UX design and Fullstack development, I bridge the gap between imagination and implementation. I don't just write code; I craft digital products that resonate with users.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-full-section about-full-expertise">
                <div className="section-grid">
                    <div className="section-label">02 / EXPERTISE</div>
                    <div className="section-content">
                        <div className="expertise-grid">
                            <div className="expertise-item">
                                <h4>Frontend</h4>
                                <ul>
                                    <li>React / Next.js</li>
                                    <li>GSAP / Framer Motion</li>
                                    <li>Three.js / WebGL</li>
                                    <li>Tailwind CSS</li>
                                </ul>
                            </div>
                            <div className="expertise-item">
                                <h4>Backend</h4>
                                <ul>
                                    <li>Node.js / Express</li>
                                    <li>PostgreSQL / MongoDB</li>
                                    <li>Prisma / Drizzle</li>
                                    <li>REST & GraphQL</li>
                                </ul>
                            </div>
                            <div className="expertise-item">
                                <h4>Design</h4>
                                <ul>
                                    <li>UI/UX Design</li>
                                    <li>Figma</li>
                                    <li>Branding</li>
                                    <li>Motion Design</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-full-section about-full-philosophy">
                <div className="section-grid">
                    <div className="section-label">03 / PHILOSOPHY</div>
                    <div className="section-content">
                        <h3>Simplicity is the ultimate sophistication.</h3>
                        <p>
                            I strive for clean code and clean design. Every pixel should have a purpose, and every line of code should be efficient. I'm constantly learning and pushing the boundaries of what's possible on the web.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="about-full-footer">
                <h2>Let's create something together.</h2>
                <a href="mailto:hello@example.com" className="email-cta">hello@example.com</a>
            </footer>
        </div>
    );
}
