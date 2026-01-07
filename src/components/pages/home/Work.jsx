import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './Work.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Work() {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);
    const glowPathRef = useRef(null);
    const ballRef = useRef(null);
    const bgTextRef = useRef(null);

    const services = [
        {
            number: "01",
            title: "Mobile App Development",
            description: "Developing high-performance cross-platform apps using React Native and Expo, featuring real-time sync and advanced Reanimated workflows.",
            tags: ["React Native", "Expo", "Supabase"]
        },
        {
            number: "02",
            title: "Full-Stack Web Systems",
            description: "Engineering scalable web applications with React, Node.js, and Express, focusing on secure RESTful APIs and optimized database schemas.",
            tags: ["React", "Node.js", "Express"]
        },
        {
            number: "03",
            title: "UI/UX & Interactive Design",
            description: "Crafting premium interfaces with animated dashboards, custom scaling utilities, and immersive gesture-driven interactions.",
            tags: ["Figma", "GSAP", "Tailwind"]
        },
        {
            number: "04",
            title: "Backend & Cloud Architecture",
            description: "Architecting robust backends with PostgreSQL and Supabase, implementing secure JWT authentication and real-time data persistence.",
            tags: ["PostgreSQL", "JWT", "REST APIs"]
        },
        {
            number: "05",
            title: "API Security & Authentication",
            description: "Implementing industry-standard security protocols, including data encryption, secure communication channels, and robust authentication flows for web services.",
            tags: ["Security", "Auth", "Encryption"]
        },
        {
            number: "06",
            title: "Design Systems & Component Libraries",
            description: "Architecting scalable design systems and reusable component libraries that ensure visual consistency and streamline the development lifecycle across platforms.",
            tags: ["Storybook", "Atomic Design", "Figma"]
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Section Reveal (Dramatic Entrance)
            gsap.fromTo(sectionRef.current,
                {
                    clipPath: "inset(20% 10% 20% 10% round 50px)",
                    scale: 0.9,
                    opacity: 0
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "top 30%",
                        scrub: 1,
                    }
                }
            );

            // 2. Hero Text Reveal
            const eyebrowChars = document.querySelectorAll('.work-eyebrow .char');
            const titleChars = document.querySelectorAll('.work-title .char');

            // Set initial state to prevent flash
            gsap.set([eyebrowChars, titleChars, ".work-desc .word"], { opacity: 0, y: 50 });

            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".work-hero",
                    start: "top 80%",
                }
            });

            heroTl.to(eyebrowChars, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.03,
                duration: 0.8,
                ease: "power3.out"
            })
                .to(titleChars, {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    stagger: 0.05,
                    duration: 1,
                    ease: "power4.out"
                }, "-=0.4")
                .to(".work-desc .word", {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.6");

            // 3. Background Parallax
            gsap.to(bgTextRef.current, {
                xPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // 4. Path & Ball Animation (Enhanced Sync & Performance)
            const path = pathRef.current;
            const glowPath = glowPathRef.current;
            const ball = ballRef.current;

            // Measure total length precisely
            const pathLength = path.getTotalLength();

            // Set up main path and glow path for drawing
            gsap.set([path, glowPath], {
                strokeDasharray: pathLength + 5, // Small buffer
                strokeDashoffset: pathLength + 5,
                visibility: "visible"
            });

            // Master timeline for synchronization
            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cards-container",
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 0.1,
                    invalidateOnRefresh: true,
                }
            });

            // Animate ball motion and path drawing together
            masterTl.to(ball, {
                motionPath: {
                    path: path,
                    alignOrigin: [0.5, 0.5]
                },
                ease: "none"
            }, 0)
                .to([path, glowPath], {
                    strokeDashoffset: 0,
                    ease: "none"
                }, 0);

            // Handle Resize & ScrollTrigger Cleanup
            const handleRefresh = () => {
                const newLength = path.getTotalLength();
                gsap.set([path, glowPath], {
                    strokeDasharray: newLength + 5,
                    strokeDashoffset: masterTl.progress() === 1 ? 0 : newLength + 5
                });
                ScrollTrigger.refresh();
            };

            window.addEventListener('resize', handleRefresh);
            setTimeout(() => ScrollTrigger.refresh(), 500);

            // 5. Card Reveals (Enhanced Animatic Style)
            gsap.utils.toArray(".service-card").forEach((card) => {
                const isLeft = card.classList.contains('left');

                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 150,
                        x: isLeft ? -100 : 100,
                        rotate: isLeft ? -10 : 10,
                        skewY: isLeft ? -5 : 5,
                        filter: "blur(15px)",
                        scale: 0.8
                    },
                    {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        rotate: 0,
                        skewY: 0,
                        filter: "blur(0px)",
                        scale: 1,
                        duration: 1.5,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                            toggleActions: "play none none reverse",
                            onLeaveBack: self => gsap.set(card, { filter: "blur(0px)" })
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="work-section" id="work" ref={sectionRef}>
            <div className="parallax-bg" ref={bgTextRef}>
                <h1 className="bg-title"></h1>
                <p className="bg-desc"></p>
            </div>

            <div className="work-hero">
                <span className="work-eyebrow">
                    {"Expertise".split("").map((char, index) => (
                        <span key={index} className="char" style={{ display: "inline-block" }}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </span>
                <h2 className="work-title">
                    {"Digital Solutions That Deliver".split(" ").map((word, index) => (
                        <span key={index} className="word-wrapper" style={{ display: "inline-block", whiteSpace: "nowrap", margin: "0 0.2em" }}>
                            {word.split("").map((char, charIndex) => (
                                <span key={charIndex} className="char" style={{ display: "inline-block" }}>
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h2>
                <p className="work-desc">
                    <span className="word">Transforming</span>{" "}
                    <span className="word work-highlight">ideas</span>{" "}
                    <i className="fa-solid fa-lightbulb word work-emoji"></i>{" "}
                    <span className="word">into</span>{" "}
                    <span className="word work-highlight">exceptional digital experiences</span>{" "}
                    <i className="fa-solid fa-wand-magic-sparkles word work-emoji"></i>{" "}
                    <span className="word">through</span>{" "}
                    <span className="word work-highlight">expertise</span>{" "}
                    <span className="word">and</span>{" "}
                    <span className="word work-highlight">innovation</span>{" "}
                    <i className="fa-solid fa-gears word work-emoji"></i>
                </p>
            </div>

            <div className="cards-container">
                <svg className="curved-svg" viewBox="0 0 400 3500" preserveAspectRatio="xMidYMin meet">
                    <defs>
                        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
                            <stop offset="20%" stopColor="rgba(0,0,0,0.5)" />
                            <stop offset="80%" stopColor="rgba(0,0,0,0.8)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,1)" />
                        </linearGradient>
                    </defs>

                    {/* Background Guide Path */}
                    <path
                        d="M200 0C200 300 350 300 350 600C350 900 50 900 50 1200C50 1500 350 1500 350 1800C350 2100 50 2100 50 2400C50 2700 350 2700 350 3000C350 3300 200 3300 200 3500"
                        stroke="rgba(0,0,0,0.03)"
                        strokeWidth="2"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                    />

                    {/* Active Animated Path Trail (Glow) */}
                    <path
                        ref={glowPathRef}
                        className="path-glow"
                        d="M200 0C200 300 350 300 350 600C350 900 50 900 50 1200C50 1500 350 1500 350 1800C350 2100 50 2100 50 2400C50 2700 350 2700 350 3000C350 3300 200 3300 200 3500"
                        strokeWidth="8"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                    />

                    {/* Active Animated Path (Main) */}
                    <path
                        ref={pathRef}
                        className="active-path"
                        d="M200 0C200 300 350 300 350 600C350 900 50 900 50 1200C50 1500 350 1500 350 1800C350 2100 50 2100 50 2400C50 2700 350 2700 350 3000C350 3300 200 3300 200 3500"
                        strokeWidth="4"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                    />

                    {/* The Glowing Ball Group */}
                    <g ref={ballRef} className="moving-ball-group">
                        <circle className="ball-glow" r="18" />
                        <circle className="ball-outer" r="10" />
                        <circle className="ball-inner" r="4" cx="-2" cy="-2" />
                    </g>
                </svg>

                <div className="cards-list">
                    {services.map((service, index) => (
                        <div key={index} className={`service-card ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="service-card-inner">
                                <span className="service-number">{service.number}</span>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <div className="service-tags">
                                    {service.tags.map((tag, i) => <span key={i} className="service-tag">{tag}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}