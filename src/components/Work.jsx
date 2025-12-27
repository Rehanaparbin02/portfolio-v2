import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './Work.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Work() {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);
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
            title: "Fintech & Security",
            description: "Implementing bank-grade data protection, encrypted storage, and real-time transaction tracking for financial applications.",
            tags: ["Security", "Encryption", "Auth"]
        },
        {
            number: "06",
            title: "Emerging Tech Research",
            description: "Researching Quantum-enhanced ML techniques at C-DAC, optimizing complex computational problems with 40% efficiency gains.",
            tags: ["Python", "Quantum ML", "Research"]
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

            // 4. Path & Ball Animation (Absolute Mathematical Sync)
            const pathElement = pathRef.current;
            const ballElement = ballRef.current;

            // Helper to set up the path
            const setPath = () => {
                const pathLength = pathElement.getTotalLength();

                // Initialize styles
                gsap.set(pathElement, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                    visibility: "visible"
                });

                // Position ball at start point
                const startPoint = pathElement.getPointAtLength(0);
                ballElement.setAttribute("cx", startPoint.x);
                ballElement.setAttribute("cy", startPoint.y);

                return pathLength;
            };

            let pathLength = setPath();

            // Unified progress-driven animation
            const animObj = { p: 0 };
            const syncTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cards-container",
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 0.1,
                    invalidateOnRefresh: true,
                }
            });

            syncTl.to(animObj, {
                p: 1,
                ease: "none",
                onUpdate: () => {
                    const progress = animObj.p;
                    if (pathLength === 0) pathLength = pathElement.getTotalLength();

                    const drawnLength = pathLength * progress;

                    // 1. Precise ball positioning
                    const point = pathElement.getPointAtLength(drawnLength);
                    ballElement.setAttribute("cx", point.x);
                    ballElement.setAttribute("cy", point.y);

                    // 2. Precise line growth
                    const offset = pathLength * (1 - progress);
                    pathElement.setAttribute("stroke-dashoffset", offset);
                }
            });

            // Handle Resize
            const handleResize = () => {
                pathLength = setPath();
                syncTl.scrollTrigger.refresh();
            };

            window.addEventListener('resize', handleResize);
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
                    {"Digital SolutionsThat Deliver".split("").map((char, index) => (
                        <span key={index} className="char" style={{ display: "inline-block" }}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h2>
                <p className="work-desc">
                    {"Transforming ideas into exceptional digital experiences through expertise and innovation".split(" ").map((word, index) => (
                        <span key={index} className="word" style={{ display: "inline-block", marginRight: "0.25em" }}>
                            {word}
                        </span>
                    ))}
                </p>
            </div>

            <div className="cards-container">
                <svg className="curved-svg" viewBox="0 0 400 3500" preserveAspectRatio="xMidYMin meet">
                    {/* Background Guide Path (Thicker) */}
                    <path
                        d="M200 0C200 300 350 300 350 600C350 900 50 900 50 1200C50 1500 350 1500 350 1800C350 2100 50 2100 50 2400C50 2700 350 2700 350 3000C350 3300 200 3300 200 3500"
                        stroke="rgba(0,0,0,0.06)"
                        strokeWidth="4"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                    />
                    {/* Active Animated Path (Much Thicker trail) */}
                    <path
                        ref={pathRef}
                        d="M200 0C200 300 350 300 350 600C350 900 50 900 50 1200C50 1500 350 1500 350 1800C350 2100 50 2100 50 2400C50 2700 350 2700 350 3000C350 3300 200 3300 200 3500"
                        stroke="rgba(0,0,0,0.06)"
                        strokeWidth="4"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                    />
                    {/* The Circle */}
                    <circle ref={ballRef} r="12" fill="#000" className="moving-ball" />
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