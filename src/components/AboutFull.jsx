import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import meImg from '../assets/me.jpg';
import './AboutFull.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutFull() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // --- AMBIENT ORBS ---
            gsap.to(".orb-1", {
                x: "10vw",
                y: "5vh",
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });

            // --- HERO ANIMATION ---
            const heroTl = gsap.timeline();
            heroTl.from(".hero-main-title .line span", {
                y: 200,
                skewY: 10,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out"
            })
                .from(".hero-description, .hero-desc-right", {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                }, "-=0.8")
                .from(".hero-portrait-wrapper", {
                    opacity: 0,
                    scale: 1.2,
                    duration: 2,
                    ease: "power4.out"
                }, "-=1.5")
                .from(".scroll-indicator", {
                    opacity: 0,
                    scaleY: 0,
                    transformOrigin: "top",
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.5");

            // --- IMAGE PARALLAX ---
            gsap.to(imageRef.current, {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: -100,
                scale: 1.05,
                ease: "none"
            });

            // --- MARQUEE ANIMATION ---
            const marquees = document.querySelectorAll('.marquee-content');
            marquees.forEach((m, i) => {
                const direction = i % 2 === 0 ? -1 : 1;
                gsap.to(m, {
                    xPercent: -50,
                    repeat: -1,
                    duration: 30,
                    ease: "none"
                }).totalProgress(Math.random());
            });

            // --- GENERAL REVEAL ANIMATIONS (FADE UP) ---
            const fadeUpElements = gsap.utils.toArray(['.section-label', '.experience-item']);
            fadeUpElements.forEach(el => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse"
                    },
                    opacity: 0,
                    y: 40,
                    duration: 1.2,
                    ease: "power3.out"
                });
            });

            // --- LEFT SLIDE REVEALS (TITLES) ---
            const leftSlideElements = gsap.utils.toArray(['.phi-title', '.edu-main-title']);
            leftSlideElements.forEach(el => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse"
                    },
                    opacity: 0,
                    x: -100,
                    duration: 1.5,
                    ease: "power4.out"
                });
            });

            // --- RIGHT SLIDE REVEALS (CONTENT) ---
            const rightSlideElements = gsap.utils.toArray(['.phi-content-block', '.edu-item']);
            rightSlideElements.forEach(el => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse"
                    },
                    opacity: 0,
                    x: 100,
                    duration: 1.5,
                    ease: "power4.out"
                });
            });

            // --- RESUME BUTTON SCALE REVEAL ---
            gsap.from(".liquid-btn.resume-btn", {
                scrollTrigger: {
                    trigger: ".liquid-btn.resume-btn",
                    start: "top 95%",
                    toggleActions: "play reverse play reverse"
                },
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.75)"
            });

            // --- PHILOSOPHY & EDUCATION SCALE REVEAL ---
            const whiteSections = gsap.utils.toArray('.philosophy-section.white-theme, .education-section.white-theme');
            whiteSections.forEach(section => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1,
                    },
                    scale: 0.7,
                    y: 200,
                    borderRadius: "20rem",
                    transformOrigin: "bottom center",
                    ease: "power2.out"
                });
            });

            // --- SPLIT SLIDE REVEALS (LEFT/RIGHT) ---
            const splitSections = gsap.utils.toArray('.experience-section, .tech-living-section');
            splitSections.forEach(section => {
                const title = section.querySelector('.exp-sticky-title, .edu-sticky-title');
                const content = section.querySelector('.experience-list, .skills-matrix, .edu-card-container');

                if (title) {
                    gsap.from(title, {
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play reverse play reverse"
                        },
                        x: -100,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power4.out"
                    });
                }

                if (content) {
                    gsap.from(content, {
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play reverse play reverse"
                        },
                        x: 100,
                        opacity: 0,
                        duration: 1.5,
                        ease: "power4.out"
                    });
                }
            });

            // --- LIQUID BUTTON INTERACTION ---
            const liquidBtn = document.querySelector('.liquid-btn.resume-btn');
            const flair = liquidBtn?.querySelector('.liquid-btn__flair');

            if (liquidBtn && flair) {
                const xSet = gsap.quickSetter(flair, "xPercent");
                const ySet = gsap.quickSetter(flair, "yPercent");
                const getXY = (e) => {
                    const { left, top, width, height } = liquidBtn.getBoundingClientRect();
                    return {
                        x: gsap.utils.clamp(0, 100, gsap.utils.mapRange(0, width, 0, 100, e.clientX - left)),
                        y: gsap.utils.clamp(0, 100, gsap.utils.mapRange(0, height, 0, 100, e.clientY - top))
                    };
                };

                liquidBtn.addEventListener('mouseenter', (e) => {
                    const { x, y } = getXY(e);
                    xSet(x);
                    ySet(y);
                    gsap.to(flair, {
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });

                liquidBtn.addEventListener('mouseleave', (e) => {
                    const { x, y } = getXY(e);
                    gsap.killTweensOf(flair);
                    gsap.to(flair, {
                        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                        scale: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                liquidBtn.addEventListener('mousemove', (e) => {
                    const { x, y } = getXY(e);
                    gsap.to(flair, {
                        xPercent: x,
                        yPercent: y,
                        duration: 0.4,
                        ease: "power2"
                    });
                });
            }

            // --- SKILL GRAPH ANIMATION (SCRUBBED) ---
            gsap.from(".skill-bar", {
                scrollTrigger: {
                    trigger: ".skills-matrix",
                    start: "top 70%",
                    end: "bottom 20%",
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                },
                scaleY: 0,
                transformOrigin: "bottom",
                stagger: {
                    each: 0.1,
                    from: "start"
                },
                ease: "power2.inOut"
            });

            // --- UP AND DOWN FLOATING FOR GRAPH ---
            gsap.to(".skill-bar", {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                stagger: {
                    each: 0.1,
                    from: "center"
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const skillGroups = [
        {
            category: "LANGUAGES",
            items: [
                { name: "JS", level: 95 },
                { name: "TS", level: 90 },
                { name: "PY", level: 85 },
                { name: "C++", level: 80 },
                { name: "SQL", level: 88 }
            ]
        },
        {
            category: "FRONTEND",
            items: [
                { name: "React", level: 98 },
                { name: "Native", level: 92 },
                { name: "HTML", level: 99 },
                { name: "CSS", level: 99 },
                { name: "TW", level: 95 }
            ]
        },
        {
            category: "BACKEND",
            items: [
                { name: "Node", level: 90 },
                { name: "Exprs", level: 92 },
                { name: "Flask", level: 75 },
                { name: "GQL", level: 82 },
                { name: "REST", level: 95 }
            ]
        },
        {
            category: "DATABASES",
            items: [
                { name: "PSQL", level: 90 },
                { name: "Mongo", level: 85 },
                { name: "Supa", level: 95 },
                { name: "FB", level: 88 }
            ]
        }
    ];

    const experience = [
        {
            role: "Full-Stack Developer",
            company: "Freelance",
            period: "06/2024 – Present",
            desc: "Built full-stack applications using React.js, Node.js, and Express.js for multiple clients. Designed and deployed secure RESTful APIs with authentication and optimized databases."
        },
        {
            role: "Research Intern",
            company: "C-DAC Silchar, Assam",
            period: "08/2022 – 11/2022",
            desc: "Researched quantum ML optimization algorithms for complex computational problems. Reviewed 50+ papers and analyzed quantum-enhanced ML techniques showing up to 40% efficiency improvement."
        }
    ];

    const marqueeText = [
        "CONCEPTUAL DESIGN",
        "HIGH-FIDELITY PROTOTYPING",
        "FRONT-END ARCHITECTURE",
        "BACK-END SCALABILITY",
        "SEAMLESS DEPLOYMENT",
        "CI/CD OPTIMIZATION",
        "ARCHITECTING DIGITAL LEGACIES",
        "LOGIC × INTUITION",
        "FULL-STACK SOPHISTICATION",
        "MINIMALISM THROUGH PRECISION",
        "PERFORMANCE-DRIVEN DESIGN",
        "BRIDGING COMPLEXITY & EMOTION"
    ];

    return (
        <div className="about-full-container" ref={containerRef}>
            <div className="bg-ambient">
                <div className="grid-background"></div>
                <div className="ambient-orb orb-1"></div>
            </div>

            <header className="about-full-header">
                <Link to="/" className="back-link">
                    <span className="arrow">←</span> <span>GO BACK</span>
                </Link>
                {/* <div className="portfolio-label">REHANA PARBIN / 2025</div> */}
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-portrait-wrapper">
                    <img src={meImg} alt="Rehana Parbin" className="hero-portrait-img" />
                </div>
                <h1 className="hero-main-title">
                    <span className="line"><span>REHANA</span></span>
                    <span className="line"><span>PARBIN</span></span>
                </h1>
                <div className="hero-sub">
                    <div className="hero-description">
                        Full-Stack Developer. Crafting high-performance digital solutions with scalable architectures and purpose-driven design.
                    </div>
                    <div className="hero-desc-right">
                        SPECIALIZING IN MODERN WEB ARCHITECTURES, PERFORMANCE OPTIMIZATION, AND DATA-DRIVEN USER JOURNEYS.
                    </div>
                </div>
            </section>

            {/* Redesigned Philosophy Section - White Theme */}
            <section className="philosophy-section white-theme">
                <div className="phi-container">
                    <span className="section-label">THE PHILOSOPHY</span>
                    <div className="phi-content-layout">
                        <div className="phi-title-area">
                            <h2 className="phi-title">Where logic <br />meets intuition.</h2>
                        </div>
                        <div className="phi-content-block">
                            <p className="phi-lead">My work is a continuous exploration of the boundary where algorithmic precision meets human intuition.</p>
                            <div className="phi-paragraph">
                                <p>Beyond the screen, I find balance in the tactile ritual of sketching—a space where abstract thoughts crystallize into form. Inspired by the narratives of culture and the discipline of minimalist design, I seek to build digital environments that feel like breathing spaces.</p>
                                <p>I believe that technology achieves its highest state when it disappears, leaving only a seamless bridge between the complex and the emotional.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="phi-background-text">ARCHITECTURE</div>
            </section>

            {/* Intersecting Marquee Section */}
            <div className="marquee-wrapper">
                <div className="marquee-band primary">
                    <div className="marquee-content">
                        {[...marqueeText, ...marqueeText].map((text, i) => (
                            <div key={i} className="marquee-item">
                                <span className="marquee-dot"></span>
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="marquee-band secondary">
                    <div className="marquee-content" style={{ flexDirection: 'row-reverse' }}>
                        {[...marqueeText, ...marqueeText].map((text, i) => (
                            <div key={i} className="marquee-item">
                                <span className="marquee-dot"></span>
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Experience Section */}
            <section className="experience-section">
                <div className="exp-sticky-title">
                    <span className="section-label">EXPERIENCE</span>
                    <h2>The Professional Path</h2>
                </div>
                <div className="experience-list">
                    {experience.map((exp, i) => (
                        <div key={i} className="experience-item">
                            <span className="exp-index">0{i + 1}</span>
                            <div className="exp-header">
                                <h3 className="exp-role">{exp.role}</h3>
                                <span className="exp-period">{exp.period}</span>
                            </div>
                            <div className="exp-meta">
                                <p className="exp-company">{exp.company}</p>
                            </div>
                            <p className="exp-desc">{exp.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Resume Download Section */}
            <section className="resume-section">
                <div className="resume-content">
                    <a href="/resume.pdf" download className="liquid-btn resume-btn">
                        <span className="liquid-btn__flair"></span>
                        <span className="liquid-btn__label">
                            GET MY RESUME
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </a>
                </div>
            </section>

            {/* Redesigned Tech Matrix Section - Graph Style */}
            <section className="tech-living-section">
                <div className="exp-sticky-title">
                    <span className="section-label">TECH STACK</span>
                    <h2>Skills & Tools</h2>
                </div>
                <div className="skills-matrix">
                    {skillGroups.map((group, i) => (
                        <div key={i} className="skill-category-row">
                            <div className="skill-category-name">{group.category}</div>
                            <div className="skills-items-container graph-view">
                                {group.items.map((skill, j) => (
                                    <div key={j} className="skill-graph-item">
                                        <div className="skill-bar-outer">
                                            <div className="skill-bar" style={{ height: `${skill.level}%` }}>
                                                <span className="skill-percent">{skill.level}%</span>
                                            </div>
                                        </div>
                                        <span className="skill-name-label">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Redesigned Education Section - White Theme */}
            <section className="education-section white-theme">
                <div className="edu-container">
                    <span className="section-label">EDUCATION</span>
                    <div className="edu-content-layout">
                        <div className="edu-title-area">
                            <h2 className="edu-main-title">Academic <br />Foundations.</h2>
                        </div>
                        <div className="edu-details-area">
                            <div className="edu-item">
                                <span className="edu-year">2019 — 2023</span>
                                <h3 className="edu-degree-title">Bachelor of Technology</h3>
                                <p className="edu-spec">Computer Science & Engineering</p>
                                <p className="edu-inst">Barak Valley Engineering College, Assam</p>
                                <div className="edu-description">
                                    Focused on core computational theories, software engineering paradigms, and data-driven architectures. Developing a deep understanding of scalable systems and algorithmic optimization.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="edu-background-text">FORMATION</div>
            </section>

            {/* <footer style={{ padding: '8vh 5vw', textAlign: 'center', opacity: 0.3, fontSize: '0.7rem', letterSpacing: '0.2em' }}>
                DESIGNED & DEVELOPED BY REHANA PARBIN © 2025
            </footer> */}
        </div>
    );
}