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

            // State to manage blending between mouse follow and centered scroll state
            const scrollProgress = { current: 0 };
            const mouseOffset = { current: 0 };

            const updateX = () => {
                // As scroll progress increases, the influence of mouse fades to 0 (centering the element)
                // We clamp progress between 0 and 1 just in case
                const progress = Math.min(Math.max(scrollProgress.current, 0), 1);
                const currentOffset = mouseOffset.current * (1 - progress);
                xTo(currentOffset);
            };

            const handleMouseMove = (e) => {
                if (!heroImageRef.current) return;

                // Calculate the center of the element relative to the viewport
                const currentX = gsap.getProperty(heroImageRef.current, "x");
                const { left, width } = heroImageRef.current.getBoundingClientRect();

                const centerX = left - currentX + width / 2;
                const mouseX = e.clientX;

                // Calculate raw distance from center
                mouseOffset.current = (mouseX - centerX) * 1;

                updateX();
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

            // Hero Image Expansion ScrollTrigger
            const storySection = document.querySelector(".about-full-story");
            if (heroImageRef.current && storySection) {
                // Calculate distance to move down
                // We want the image to roughly cover the story section
                // We can't rely on exact pixel math if screen resizes, but we can try to get initial delta
                const heroRect = heroImageRef.current.getBoundingClientRect();
                const storyRect = storySection.getBoundingClientRect();
                // Adjustment: align centers?
                // Visual guess: move top of hero to top of story
                const accumulatedY = storyRect.top - heroRect.top;

                gsap.to(heroImageRef.current, {
                    scrollTrigger: {
                        trigger: ".about-full-story",
                        start: "top bottom", // when story starts entering viewport
                        end: "center center", // when story is centered
                        scrub: 1,
                        onUpdate: (self) => {
                            scrollProgress.current = self.progress;
                            updateX();
                        }
                    },
                    y: accumulatedY,
                    // x: 0, // REMOVED: Managed manually via onUpdate/updateX to allow smooth transition
                    width: "100%", // Expand to full width
                    height: "100vh", // Expand to full height of screen/section
                    borderRadius: "2rem",
                    ease: "none"
                });
            }

            // Story Text Reveal Animation
            // Reveals the text as if it's appearing "inside" the expanded card
            gsap.from(".about-full-story .section-label, .about-full-story .section-content h3, .about-full-story .section-content p", {
                scrollTrigger: {
                    trigger: ".about-full-story",
                    start: "top 60%", // Triggers as the card background is establishing itself
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });

            // EXPERTISE (02) - Staggered List Reveal
            gsap.from(".expertise-item", {
                scrollTrigger: {
                    trigger: ".about-full-expertise",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2, // Stagger columns
                ease: "power2.out"
            });

            // Stagger list items inside each column
            gsap.utils.toArray(".expertise-item ul li").forEach((li, i) => {
                gsap.from(li, {
                    scrollTrigger: {
                        trigger: li,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    x: -10,
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.1,
                    ease: "power1.out"
                });
            });

            // PHILOSOPHY (03) - Clip Path Text Reveal
            // We'll wrap the h3 in a clip-path container effectively
            gsap.from(".about-full-philosophy h3", {
                scrollTrigger: {
                    trigger: ".about-full-philosophy",
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                },
                clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", // Starts invisible (left-to-right wipe if we animate to polygon(0 0, 100% 0, 100% 100%, 0 100%)) 
                // Actually, let's do a simple gradient text reveal or just a nice mask using opacity/y stagger on words if we could split them.
                // Simpler reliable effect:
                y: 30,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1.2,
                ease: "power2.out"
            });

            gsap.from(".about-full-philosophy p", {
                scrollTrigger: {
                    trigger: ".about-full-philosophy",
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                },
                y: 20,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "power2.out"
            });

            // PROCESS (04) - New Section Animation (Cards flip up)
            gsap.from(".process-card", {
                scrollTrigger: {
                    trigger: ".about-full-process",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                rotateX: -15,
                y: 50,
                opacity: 0,
                transformOrigin: "top center",
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)"
            });

            // Footer Parallax/Reveal
            gsap.from(".about-full-footer h2", {
                scrollTrigger: {
                    trigger: ".about-full-footer",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: "expo.out"
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

            <section className="about-full-section about-full-process">
                <div className="section-grid">
                    <div className="section-label">04 / PROCESS</div>
                    <div className="section-content">
                        <h3>How I Work</h3>
                        <div className="process-grid">
                            <div className="process-card">
                                <span className="process-number">01</span>
                                <h4>Discovery</h4>
                                <p>Understanding the core problem and user needs through research.</p>
                            </div>
                            <div className="process-card">
                                <span className="process-number">02</span>
                                <h4>Design</h4>
                                <p>Crafting intuitive interfaces and visual systems that align with the brand.</p>
                            </div>
                            <div className="process-card">
                                <span className="process-number">03</span>
                                <h4>Develop</h4>
                                <p>Building robust, scalable solutions using modern technologies.</p>
                            </div>
                            <div className="process-card">
                                <span className="process-number">04</span>
                                <h4>Launch</h4>
                                <p>Testing, optimizing, and deploying the final product to the world.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
