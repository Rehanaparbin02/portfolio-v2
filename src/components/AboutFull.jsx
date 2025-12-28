// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Link } from 'react-router-dom';
// import './AboutFull.css';

// gsap.registerPlugin(ScrollTrigger);

// export default function AboutFull() {
//     const containerRef = useRef(null);
//     const heroImageRef = useRef(null);
//     const sphereRef = useRef(null);

//     useEffect(() => {
//         window.scrollTo(0, 0);

//         const ctx = gsap.context(() => {
//             // Mouse follower setup
//             // Target the WHOLE square (heroImageRef) - Horizontal Only
//             const xTo = gsap.quickTo(heroImageRef.current, "x", { duration: 0.5, ease: "power3", overwrite: "auto" });

//             // State to manage blending between mouse follow and centered scroll state
//             const scrollProgress = { current: 0 };
//             const mouseOffset = { current: 0 };

//             const updateX = () => {
//                 // As scroll progress increases, the influence of mouse fades to 0 (centering the element)
//                 // We clamp progress between 0 and 1 just in case
//                 const progress = Math.min(Math.max(scrollProgress.current, 0), 1);
//                 const currentOffset = mouseOffset.current * (1 - progress);
//                 xTo(currentOffset);
//             };

//             const handleMouseMove = (e) => {
//                 if (!heroImageRef.current) return;

//                 // Calculate the center of the element relative to the viewport
//                 const currentX = gsap.getProperty(heroImageRef.current, "x");
//                 const { left, width } = heroImageRef.current.getBoundingClientRect();

//                 const centerX = left - currentX + width / 2;
//                 const mouseX = e.clientX;

//                 // Calculate raw distance from center
//                 mouseOffset.current = (mouseX - centerX) * 1;

//                 updateX();
//             };

//             window.addEventListener("mousemove", handleMouseMove);

//             // Cleanup listener inside context cleanup? 
//             // Better to do it in return of useEffect or use GSAP's matchMedia/context scoping if possible.
//             // Since we're adding to window, we should manually remove it.

//             // Entrance animation
//             const tl = gsap.timeline();

//             const titleChars = containerRef.current.querySelectorAll('.about-full-title .char');

//             tl.from(titleChars, {
//                 y: 100,
//                 opacity: 0,
//                 rotateX: -90,
//                 stagger: 0.04,
//                 duration: 1.2,
//                 ease: "power4.out"
//             })
//                 .from(".about-full-hero-image", {
//                     scale: 1.2,
//                     opacity: 0,
//                     duration: 1.5,
//                     ease: "power3.out"
//                 }, "-=0.8")
//                 .from(".about-full-intro p", {
//                     y: 50,
//                     opacity: 0,
//                     duration: 1,
//                     stagger: 0.2,
//                     ease: "power3.out"
//                 }, "-=1");


//             // Hero Image Expansion ScrollTrigger
//             const storySection = document.querySelector(".about-full-story");
//             if (heroImageRef.current && storySection) {
//                 // Calculate distance to move down
//                 // We want the image to roughly cover the story section
//                 // We can't rely on exact pixel math if screen resizes, but we can try to get initial delta
//                 const heroRect = heroImageRef.current.getBoundingClientRect();
//                 const storyRect = storySection.getBoundingClientRect();
//                 // Adjustment: align centers?
//                 // Visual guess: move top of hero to top of story
//                 const accumulatedY = storyRect.top - heroRect.top;

//                 gsap.to(heroImageRef.current, {
//                     scrollTrigger: {
//                         trigger: ".about-full-story",
//                         start: "top bottom", // when story starts entering viewport
//                         end: "center center", // when story is centered
//                         scrub: 1,
//                         onUpdate: (self) => {
//                             scrollProgress.current = self.progress;
//                             updateX();
//                         }
//                     },
//                     y: accumulatedY,
//                     // x: 0, // REMOVED: Managed manually via onUpdate/updateX to allow smooth transition
//                     width: "100%", // Expand to full width
//                     height: "100vh", // Expand to full height of screen/section
//                     borderRadius: "2rem",
//                     ease: "none"
//                 });
//             }

//             // Story Text Reveal Animation
//             // Reveals the text as if it's appearing "inside" the expanded card
//             gsap.from(".about-full-story .section-label, .about-full-story .section-content h3, .about-full-story .section-content p", {
//                 scrollTrigger: {
//                     trigger: ".about-full-story",
//                     start: "top 60%", // Triggers as the card background is establishing itself
//                     toggleActions: "play none none reverse"
//                 },
//                 y: 50,
//                 opacity: 0,
//                 duration: 1,
//                 stagger: 0.1,
//                 ease: "power3.out"
//             });

//             // TECH STACK ANIMATIONS
//             const techTitleChars = containerRef.current.querySelectorAll('.tech-stack-title-line span');
//             if (techTitleChars.length > 0) {
//                 gsap.from(techTitleChars, {
//                     scrollTrigger: {
//                         trigger: ".about-full-expertise",
//                         start: "top 70%",
//                         toggleActions: "play none none reverse"
//                     },
//                     y: 150,
//                     opacity: 0,
//                     rotateX: -90,
//                     stagger: 0.02,
//                     duration: 1,
//                     ease: "power4.out"
//                 });
//             }

//             gsap.from(".tech-stack-subtitle", {
//                 scrollTrigger: {
//                     trigger: ".about-full-expertise",
//                     start: "top 70%",
//                     toggleActions: "play none none reverse"
//                 },
//                 opacity: 0,
//                 x: -20,
//                 duration: 0.8,
//                 delay: 0.2,
//                 ease: "power2.out"
//             });

//             gsap.from(".tech-item", {
//                 scrollTrigger: {
//                     trigger: ".about-full-expertise",
//                     start: "top 65%",
//                     toggleActions: "play none none reverse"
//                 },
//                 y: 30,
//                 opacity: 0,
//                 duration: 0.6,
//                 stagger: 0.03,
//                 ease: "back.out(1.5)"
//             });

//             // Force refresh to ensure global footer and other triggers recalculate positions correctly after content removal
//             ScrollTrigger.refresh();


//             // Cleanup function for the listener
//             return () => {
//                 window.removeEventListener("mousemove", handleMouseMove);
//             };

//         }, containerRef);

//         return () => ctx.revert();
//     }, []);

//     return (
//         <div className="about-full-container" ref={containerRef}>
//             {/* Header / Back Link */}
//             <header className="about-full-header">
//                 <Link to="/" className="back-link">
//                     <span className="arrow">←</span> Back to Home
//                 </Link>
//             </header>

//             {/* Hero Section */}
//             <section className="about-full-hero">
//                 <div className="about-full-title">
//                     <h1>
//                         {"DESIGNING".split("").map((c, i) => (
//                             <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
//                         ))}
//                     </h1>
//                     <h1>
//                         {"WITH".split("").map((c, i) => (
//                             <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
//                         ))}
//                     </h1>
//                     <h1 className="outline-text">
//                         {"PURPOSE".split("").map((c, i) => (
//                             <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
//                         ))}
//                     </h1>
//                 </div>
//                 <div className="about-full-intro">
//                     <p>I am a creative developer based in the digital world, specializing in building exceptional digital experiences.</p>
//                 </div>
//                 <div className="about-full-hero-image" ref={heroImageRef}>
//                     {/* Decorative element */}
//                     <div className="gradient-sphere" ref={sphereRef}></div>
//                 </div>
//             </section>

//             {/* Detailed Info */}
//             <section className="about-full-section about-full-story">
//                 <div className="section-grid">
//                     <div className="section-label">01 / MY STORY</div>
//                     <div className="section-content">
//                         <h3>Fusing Code & Design</h3>
//                         <p>
//                             My journey started with a fascination for how things look on the screen, which quickly evolved into a passion for how they work. I believe that great design is not just about aesthetics, but about solving problems and creating intuitive experiences.
//                         </p>
//                         <p>
//                             With a background in both UI/UX design and Fullstack development, I bridge the gap between imagination and implementation. I don't just write code; I craft digital products that resonate with users.
//                         </p>
//                     </div>
//                 </div>
//             </section>

//             <section className="about-full-section about-full-expertise">
//                 <div className="section-content tech-stack-section">
//                     <div className="tech-stack-title">
//                         <div className="tech-stack-title-line">
//                             {"MODERN".split("").map((c, i) => (
//                                 <span key={i} className="char">{c}</span>
//                             ))}
//                         </div>
//                         <div className="tech-stack-title-line">
//                             {"TECH STACK".split("").map((c, i) => (
//                                 <span key={i} className="char">{c === " " ? "\u00A0" : c}</span>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="tech-stack-details">
//                         <h4 className="tech-stack-subtitle">Professional at</h4>

//                         <div className="tech-grid-container">
//                             {/* Row 1: The 'Big Three' or Core Tech */}
//                             <div className="tech-grid-row large">
//                                 <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="tech-cell large-cell">
//                                     <svg viewBox="0 0 24 24" className="tech-icon"><circle cx="12" cy="12" r="2" fill="currentColor" /><g stroke="currentColor" strokeWidth="1.5" fill="none"><ellipse rx="10" ry="4.5" cx="12" cy="12" /><ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" /><ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" /></g></svg>
//                                     <span className="tech-label">React</span>
//                                 </a>
//                                 <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="tech-cell large-cell">
//                                     <svg viewBox="0 0 24 24" className="tech-icon" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.17 6.417l-6 8-.638.48 2.05-8.52h1.666l-2.05 8.52 7.037-9.395.638-.48h-2.703z" /></svg>
//                                     <span className="tech-label">Next.js</span>
//                                 </a>
//                                 <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="tech-cell large-cell">
//                                     <svg viewBox="0 0 24 24" className="tech-icon" fill="currentColor"><path d="M2 2v20h20V2h-20zm14.73 15.68h-1.68v-6.3h-2.18v-1.42h6.05v1.42h-2.19v6.3zm-5.06-.01H10l-.06-1.1c-.55.65-1.12.87-1.89.87-.76 0-1.67-.35-1.92-1.35-.12-.47-.11-1.04.03-1.57.44-1.63 2.1-1.95 3.33-1.95.42 0 .76.04.99.11v-.32c0-.68-.22-1.17-.96-1.17-.55 0-.91.24-1.12.57l-1.29-.7c.56-.99 1.48-1.28 2.6-1.28 1.94 0 2.76 1.05 2.76 2.75v5l-.8 1zm-1.6-.99c.64 0 1.05-.45 1.05-1.16v-.65c-.29-.08-.6-.13-.98-.13-1.05 0-1.62.33-1.77.92-.09.34.03.62.37.82.35.2.86.2 1.33.2z" /></svg>
//                                     <span className="tech-label">TypeScript</span>
//                                 </a>
//                             </div>

//                             {/* Row 2: The Grid */}
//                             <div className="tech-grid-row small">
//                                 <a href="https://gsap.com" target="_blank" rel="noopener noreferrer" className="tech-cell">
//                                     <span className="tech-text-logo">GSAP</span>
//                                 </a>
//                                 <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="tech-cell">
//                                     <svg viewBox="0 0 24 24" className="tech-icon" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" /></svg>
//                                 </a>
//                                 <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="tech-cell highlighted">
//                                     <svg viewBox="0 0 24 24" className="tech-icon" fill="currentColor"><path d="M21.362 9.354H10.034L13.16 2.06c.266-.694-.257-1.442-1-1.427-.245.006-.477.112-.634.305L3.483 12.836c-.52.64.062 1.626.883 1.493h10.999l-2.484 7.575c-.247.756.408 1.503 1.156 1.319.26-.065.485-.25.61-.504l8.307-11.838c.433-.618.005-1.48-.592-1.527z" /></svg>
//                                 </a>
//                                 <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="tech-cell">
//                                     <svg viewBox="0 0 24 24" className="tech-icon" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z" /></svg>
//                                 </a>
//                                 <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer" className="tech-cell">
//                                     <svg viewBox="0 0 15 24" className="tech-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M3.75 24C5.82107 24 7.5 22.3211 7.5 20.25V16.5H3.75C1.67893 16.5 0 18.1789 0 20.25C0 22.3211 1.67893 24 3.75 24Z" fill="#0ACF83" />
//                                         <path d="M0 12.75C0 10.6789 1.67893 9 3.75 9H7.5V16.5H3.75C1.67893 16.5 0 14.8211 0 12.75Z" fill="#A259FF" />
//                                         <path d="M0 5.25C0 3.17893 1.67893 1.5 3.75 1.5H7.5V9H3.75C1.67893 9 0 7.32107 0 5.25Z" fill="#F24E1E" />
//                                         <path d="M7.5 0V7.5H11.25C13.3211 7.5 15 5.82107 15 3.75C15 1.67893 13.3211 0 11.25 0H7.5Z" fill="#FF7262" />
//                                         <path d="M15 12.75C15 14.8211 13.3211 16.5 11.25 16.5C9.17893 16.5 7.5 14.8211 7.5 12.75C7.5 10.6789 9.17893 9 11.25 9C13.3211 9 15 10.6789 15 12.75Z" fill="#1ABCFE" />
//                                     </svg>
//                                 </a>
//                                 <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="tech-cell">
//                                     <svg viewBox="0 0 24 24" className="tech-icon" fill="currentColor"><path d="M12.007 24C5.385 24 .013 18.628.013 12.007c0-6.622 5.372-11.993 11.994-11.993 6.621 0 11.993 5.371 11.993 11.993 0 6.62-5.372 12-11.993 12zm5.285-11.455h-2.146q-.106-1.503-1.39-1.503-1.05 0-1.125 1.109l-.01.378 1.635.34q2.536.528 2.536 2.593 0 1.96-1.921 1.96-1.787 0-2.099-1.896h2.16q.057 1.05 1.05 1.05.9 0 .973-1.045l.006-.34-1.635-.357q-2.583-.56-2.583-2.612 0-1.933 1.964-1.933 1.837 0 2.126 1.854.004.09.02.404z" /></svg>
//                                 </a>
//                                 <a href="https://graphql.org" target="_blank" rel="noopener noreferrer" className="tech-cell">
//                                     <svg viewBox="0 0 24 24" className="tech-icon" fill="currentColor"><path d="M14.12 4.413L16.276 9h3.31l-5.637-6.225.17.638zM9.88 4.413l3.31 7.038-.17-1.638-3.31-4.762zM21.36 9h-2.914l1.34 2.85L22.616 9h-1.256zm-1.636 12L16.59 9H7.408l-3.134 12h15.45zM3.895 11.85l1.34-2.85H2.32L5.12 15h.638l-1.863-3.15zM2 9h1.256L5.34 4.587 2 9zm10-7l2.134 4.538L12 2 9.866 6.538z" /></svg>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>


//         </div>
//     );
// }
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
            const xTo = gsap.quickTo(heroImageRef.current, "x", { duration: 0.5, ease: "power3", overwrite: "auto" });

            const scrollProgress = { current: 0 };
            const mouseOffset = { current: 0 };

            const updateX = () => {
                const progress = Math.min(Math.max(scrollProgress.current, 0), 1);
                const currentOffset = mouseOffset.current * (1 - progress);
                xTo(currentOffset);
            };

            const handleMouseMove = (e) => {
                if (!heroImageRef.current) return;

                const currentX = gsap.getProperty(heroImageRef.current, "x");
                const { left, width } = heroImageRef.current.getBoundingClientRect();

                const centerX = left - currentX + width / 2;
                const mouseX = e.clientX;

                mouseOffset.current = (mouseX - centerX) * 1;

                updateX();
            };

            window.addEventListener("mousemove", handleMouseMove);

            // Entrance animation
            const tl = gsap.timeline();

            const titleChars = containerRef.current.querySelectorAll('.about-full-title .char');

            tl.from(titleChars, {
                y: 100,
                opacity: 0,
                rotateX: -90,
                stagger: 0.04,
                duration: 1.2,
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
                const heroRect = heroImageRef.current.getBoundingClientRect();
                const storyRect = storySection.getBoundingClientRect();
                const accumulatedY = storyRect.top - heroRect.top;

                gsap.to(heroImageRef.current, {
                    scrollTrigger: {
                        trigger: ".about-full-story",
                        start: "top bottom",
                        end: "center center",
                        scrub: 1,
                        onUpdate: (self) => {
                            scrollProgress.current = self.progress;
                            updateX();
                        }
                    },
                    y: accumulatedY,
                    width: "100%",
                    height: "100vh",
                    borderRadius: "2rem",
                    ease: "none"
                });
            }

            // Story Text Reveal Animation
            gsap.from(".about-full-story .section-label, .about-full-story .section-content h3, .about-full-story .section-content p", {
                scrollTrigger: {
                    trigger: ".about-full-story",
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });

            // TECH STACK ANIMATIONS
            const techTitleChars = containerRef.current.querySelectorAll('.tech-stack-title-line span');
            if (techTitleChars.length > 0) {
                gsap.from(techTitleChars, {
                    scrollTrigger: {
                        trigger: ".about-full-expertise",
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    },
                    y: 150,
                    opacity: 0,
                    rotateX: -90,
                    stagger: 0.02,
                    duration: 1,
                    ease: "power4.out"
                });
            }

            gsap.from(".tech-stack-subtitle", {
                scrollTrigger: {
                    trigger: ".about-full-expertise",
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                x: -20,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out"
            });

            gsap.from(".tech-cell", {
                scrollTrigger: {
                    trigger: ".about-full-expertise",
                    start: "top 65%",
                    toggleActions: "play none none reverse"
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.03,
                ease: "back.out(1.5)"
            });

            ScrollTrigger.refresh();

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
                    <h1>
                        {"DESIGNING".split("").map((c, i) => (
                            <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
                        ))}
                    </h1>
                    <h1>
                        {"WITH".split("").map((c, i) => (
                            <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
                        ))}
                    </h1>
                    <h1 className="outline-text">
                        {"PURPOSE".split("").map((c, i) => (
                            <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
                        ))}
                    </h1>
                </div>
                <div className="about-full-intro">
                    <p>I am a creative developer based in the digital world, specializing in building exceptional digital experiences.</p>
                </div>
                <div className="about-full-hero-image" ref={heroImageRef}>
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
                <div className="section-content tech-stack-section">
                    <div className="tech-stack-header">
                        <h4 className="tech-stack-subtitle">PROFESSIONAL AT</h4>
                        <div className="tech-stack-title">
                            <div className="tech-stack-title-line">
                                {"MODERN".split("").map((c, i) => (
                                    <span key={i} className="char">{c}</span>
                                ))}
                            </div>
                            <div className="tech-stack-title-line">
                                {"TECH STACK".split("").map((c, i) => (
                                    <span key={i} className="char">{c === " " ? "\u00A0" : c}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="tech-grid-container">
                        {/* Row 1: The 'Big Three' - Large Cells */}
                        <div className="tech-grid-row large">
                            <div className="tech-cell large-cell">
                                <svg viewBox="0 0 24 24" className="tech-icon">
                                    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
                                    <g stroke="#61DAFB" strokeWidth="1.5" fill="none">
                                        <ellipse rx="10" ry="4.5" cx="12" cy="12" />
                                        <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" />
                                        <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" />
                                    </g>
                                </svg>
                                <span className="tech-label">React.js</span>
                            </div>
                            <div className="tech-cell large-cell">
                                <svg viewBox="0 0 38 57" className="tech-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
                                    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                                    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                                    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                                    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
                                </svg>
                                <span className="tech-label">Figma</span>
                            </div>
                            <div className="tech-cell large-cell">
                                <svg viewBox="0 0 24 24" className="tech-icon" fill="#339933">
                                    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
                                </svg>
                                <span className="tech-label">Node.js</span>
                            </div>
                        </div>

                        {/* Row 2: Specialists - Small Cells */}
                        <div className="tech-grid-row small">
                            <div className="tech-cell">
                                <div className="ts-block-logo">TS</div>
                                <span className="tech-label-small">TypeScript</span>
                            </div>
                            <div className="tech-cell">
                                <svg viewBox="0 0 24 24" className="tech-icon" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0V0z" fill="#F7DF1E" />
                                    <path d="M18.674 19.425l1.356-0.822c0.437 0.753 0.841 1.383 1.708 1.383 0.723 0 1.189-0.364 1.189-1.328 0-0.912-0.738-1.233-1.579-1.902l-0.542-0.463c-1.594-1.353-2.618-2.184-2.618-4.52 0-2.222 1.625-3.805 4.148-3.805 1.776 0 2.943 0.688 3.731 2.053l-1.246 0.8c-0.518-0.903-1.127-1.34-2.433-1.34-0.662 0-1.114 0.334-1.114 0.941 0 0.638 0.437 0.912 1.355 1.696l0.542 0.463c1.913 1.62 2.951 2.493 2.951 4.757 0 2.645-1.928 4.184-4.839 4.184-2.455 0-3.921-1.094-4.726-2.731zM11.666 18.91c0.312 0.536 0.505 0.902 1.143 0.902 0.518 0 0.843-0.213 0.843-1.034V8h1.625v10.742c0 1.945-1.114 2.894-2.83 2.894-1.521 0-2.319-0.775-2.83-1.884l1.049-0.842z" fill="#000" />
                                </svg>
                                <span className="tech-label-small">JavaScript</span>
                            </div>
                            <div className="tech-cell">
                                <svg viewBox="0 0 24 24" className="tech-icon" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.122 0c-1.663 0-3.111.233-4.322.695-2.002.766-2.422 2.046-2.422 4.156v2.333h6.811V8.21H2.334c-1.895 0-3.136 1.059-3.528 2.748C-1.56 12.637-.96 14.8 1.956 14.8h.422v-3.722c0-2.5 1.5-4.567 4.078-4.567h4.867c.767 0 1.444.644 1.444 1.411v8.867c0 1.433-.956 2.456-2.389 2.456H3.378c-1.633 0-2.733-.944-2.733-2.333v-.611h1.444v.611c0 .767.433 1.022 1.256 1.022h6.155c.778 0 1.144-.433 1.144-1.144V8.455c0-.667-.322-1.155-1.155-1.155H4.156c-.667 0-1.144.311-1.144 1.155V14.8c0 1.767.8 2.333 2.5 2.333h3.834v2.333c0 2.5-2.078 4.156-4.156 4.156-1.5 0-2.422-.467-3.056-1.144-1.044-1.134-.733-3.012-.733-3.012L0 19.333s-.367 2.667 1.344 4.122C2.7 24.589 4.389 25.122 6.056 25.122c3.544 0 5.467-2.144 5.467-5.467v-2.334h-6.811V16.3h9.845c1.894 0 3.136-1.059 3.528-2.748C24.444 11.83 24.322 9.4 20.8 9.4h-.422v3.744c0 2.5-1.511 4.545-4.089 4.545H11.41a1.41 1.41 0 0 1-1.411-1.411V7.411c0-1.433.956-2.456 2.389-2.456h6.211c1.633 0 2.733.944 2.733 2.333v.611H19.89v-.611c0-.767-.433-1.022-1.256-1.022h-6.155c-.778 0-1.144.433-1.144 1.144V16.545c0 .667.322 1.155 1.155 1.155h6.189c.667 0 1.144-.311 1.144-1.155V10.2c0-1.767-.8-2.333-2.5-2.333H13.633V5.534C13.633 3.033 15.71 1.378 17.788 1.378c1.5 0 2.422.467 3.056 1.144 1.044 1.134.733 3.012.733 3.012l1.444.133s.367-2.667-1.344-4.122C20.401.467 18.722 0 17.056 0h-4.934z" fill="#3776AB" transform="scale(0.9) translate(1, 1)" />
                                    <path d="M12.122 0c-1.663 0-3.111.233-4.322.695-2.002.766-2.422 2.046-2.422 4.156v2.333h6.811V8.21H2.334c-1.895 0-3.136 1.059-3.528 2.748C-1.56 12.637-.96 14.8 1.956 14.8h.422v-3.722c0-2.5 1.5-4.567 4.078-4.567h4.867c.767 0 1.444.644 1.444 1.411v8.867c0 1.433-.956 2.456-2.389 2.456H3.378c-1.633 0-2.733-.944-2.733-2.333v-.611h1.444v.611c0 .767.433 1.022 1.256 1.022h6.155c.778 0 1.144-.433 1.144-1.144V8.455c0-.667-.322-1.155-1.155-1.155H4.156c-.667 0-1.144.311-1.144 1.155V14.8c0 1.767.8 2.333 2.5 2.333h3.834v2.333c0 2.5-2.078 4.156-4.156 4.156-1.5 0-2.422-.467-3.056-1.144-1.044-1.134-.733-3.012-.733-3.012L0 19.333s-.367 2.667 1.344 4.122C2.7 24.589 4.389 25.122 6.056 25.122c3.544 0 5.467-2.144 5.467-5.467v-2.334h-6.811V16.3h9.845c1.894 0 3.136-1.059 3.528-2.748C24.444 11.83 24.322 9.4 20.8 9.4h-.422v3.744c0 2.5-1.511 4.545-4.089 4.545H11.41a1.41 1.41 0 0 1-1.411-1.411V7.411c0-1.433.956-2.456 2.389-2.456h6.211c1.633 0 2.733.944 2.733 2.333v.611H19.89v-.611c0-.767-.433-1.022-1.256-1.022h-6.155c-.778 0-1.144.433-1.144 1.144V16.545c0 .667.322 1.155 1.155 1.155h6.189c.667 0 1.144-.311 1.144-1.155V10.2c0-1.767-.8-2.333-2.5-2.333H13.633V5.534C13.633 3.033 15.71 1.378 17.788 1.378c1.5 0 2.422.467 3.056 1.144 1.044 1.134.733 3.012.733 3.012l1.444.133s.367-2.667-1.344-4.122C20.401.467 18.722 0 17.056 0h-4.934z" fill="#FFE873" transform="scale(0.9) translate(25, 25) rotate(180 0 0)" />
                                </svg>
                                <span className="tech-label-small">Python</span>
                            </div>
                            <div className="tech-cell">
                                <svg viewBox="0 0 24 24" className="tech-icon" fill="#3ECF8E">
                                    <path d="M21.362 9.354H10.034L13.16 2.06c.266-.694-.257-1.442-1-1.427-.245.006-.477.112-.634.305L3.483 12.836c-.52.64.062 1.626.883 1.493h10.999l-2.484 7.575c-.247.756.408 1.503 1.156 1.319.26-.065.485-.25.61-.504l8.307-11.838c.433-.618.005-1.48-.592-1.527z" />
                                </svg>
                                <span className="tech-label-small">Supabase</span>
                            </div>
                            <div className="tech-cell">
                                <svg viewBox="0 0 24 24" className="tech-icon" fill="#E10098">
                                    <path d="M12.002 0a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.54 4.931a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm0 9.862a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm-8.54 4.931a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.276zm-8.542-4.93a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.277zm0-9.863a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.542-3.378L2.953 6.777v10.448l9.049 5.224 9.047-5.224V6.777z" />
                                </svg>
                                <span className="tech-label-small">GraphQL</span>
                            </div>
                            <div className="tech-cell">
                                <svg viewBox="0 0 76 65" fill="#FFFFFF" className="tech-icon">
                                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                                </svg>
                                <span className="tech-label-small">Vercel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}