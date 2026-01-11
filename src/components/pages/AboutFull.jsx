import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import meImg from '../../assets/me.jpg';
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
                .from(".left-panel", {
                    x: -100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out"
                }, "-=1")
                .from(".right-panel", {
                    x: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out"
                }, "-=1")
                .from(".central-visual-engine", {
                    scale: 0,
                    opacity: 0,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)"
                }, "-=1.2")
                .from(".text-reveal-line", {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.5")
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

            // Continuous rotation for visual engine
            gsap.to(".engine-ring.ring-1", { rotate: 360, duration: 20, repeat: -1, ease: "none" });
            gsap.to(".engine-ring.ring-2", { rotate: -360, duration: 15, repeat: -1, ease: "none" });
            gsap.to(".engine-ring.ring-3", { rotate: 360, duration: 25, repeat: -1, ease: "none" });

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

            // --- MOUSE FOLLOW BLOBS (WHITE SECTIONS) ---
            const whiteBlobs = document.querySelectorAll('.phi-blob, .edu-blob');
            whiteBlobs.forEach(blob => {
                const container = blob.parentElement;
                const xTo = gsap.quickTo(blob, "x", { duration: 0.8, ease: "power3" });
                const yTo = gsap.quickTo(blob, "y", { duration: 0.8, ease: "power3" });

                container.addEventListener("mousemove", (e) => {
                    const { left, top, width, height } = container.getBoundingClientRect();
                    const x = e.clientX - left;
                    const y = e.clientY - top;
                    xTo(x);
                    yTo(y);
                });

                container.addEventListener("mouseleave", () => {
                    gsap.to(blob, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.5
                    });
                });

                container.addEventListener("mouseenter", () => {
                    gsap.to(blob, {
                        opacity: 0.4,
                        scale: 1,
                        duration: 0.5
                    });
                });
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

            // --- TECH STACK BOOKS REVEAL ---
            gsap.from(".book-item", {
                scrollTrigger: {
                    trigger: ".books-shelf",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                rotateY: 45,
                duration: 1.5,
                stagger: 0.2,
                ease: "expo.out"
            });

            // --- TEXT HIGHLIGHT REVEAL ---
            const highlightElements = gsap.utils.toArray('.text-highlight');
            highlightElements.forEach(el => {
                ScrollTrigger.create({
                    trigger: el,
                    start: "top 85%",
                    onEnter: () => el.classList.add('active-highlight'),
                    // Optional: Remove if scrolling back up? 
                    // onLeaveBack: () => el.classList.remove('active-highlight') 
                    // Keeping it permanent once triggered looks often better for "reading" flow
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const skillGroups = [
        {
            category: "LANGUAGES",
            items: [
                { name: "JavaScript" },
                { name: "TypeScript" },
                { name: "Python" },
                { name: "C++" },
                { name: "SQL" }
            ]
        },
        {
            category: "FRONTEND",
            items: [
                { name: "React.js" },
                { name: "Next.js" },
                { name: "React Native" },
                { name: "HTML5" },
                { name: "CSS3" },
                { name: "Tailwind CSS" }
            ]
        },
        {
            category: "BACKEND & DATA",
            items: [
                { name: "Node.js" },
                { name: "Express.js" },
                { name: "Supabase" },
                { name: "PostgreSQL" },
                { name: "MongoDB" },
                { name: "Firebase" }
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

            <section className="hero-section">


                <div className="hero-content-wrapper">
                    <h1 className="hero-main-title">
                        <span className="line"><span>REHANA</span></span>
                        <br />
                        <span className="line"><span>PARBIN</span></span>
                    </h1>
                    <div className="hero-portrait-wrapper">
                        <img src={meImg} alt="Rehana Parbin" className="hero-portrait-img" />
                        <div className="portrait-frame"></div>
                    </div>
                    <div className="hero-meta-grid">
                        <div className="meta-card role-card">
                            <span className="meta-label">ROLE</span>
                            <h2 className="meta-value">Full-Stack Developer</h2>
                        </div>

                        <div className="meta-card location-card">
                            <span className="meta-label">BASED IN</span>
                            <h2 className="meta-value">India</h2>
                        </div>

                        <div className="meta-card status-card">
                            <span className="meta-label">STATUS</span>
                            <div className="status-indicator">
                                <span className="status-dot"></span>
                                <h2 className="meta-value">Available for Work</h2>
                            </div>
                        </div>
                    </div>

                    {/* <div className="hero-description">
                        <p className="hero-lead">
                            I create <span className="text-highlight">digital products</span> by combining
                            <span className="text-highlight"> smart technology</span> with a
                            <span className="text-highlight"> human touch</span>, focusing on building
                            <span className="text-highlight"> clean, reliable, and user-friendly solutions</span>.
                        </p>
                    </div> */}
                    {/* 
                    <div className="hero-tech-tags">
                        <span className="tech-pill">React.js</span>
                        <span className="tech-pill">Node.js</span>
                        <span className="tech-pill">PostgreSQL</span>
                        <span className="tech-pill">TypeScript</span>
                        <span className="tech-pill">React Native</span>
                        <span className="tech-pill">Supabase</span>
                    </div> */}
                </div>

                <div className="scroll-prompt">
                    <span className="scroll-text">SCROLL TO EXPLORE</span>
                    <div className="scroll-line"></div>
                </div>
            </section>

            {/* Redesigned Philosophy Section - White Theme */}
            <section className="philosophy-section white-theme">
                <div className="phi-blob"></div>
                <div className="phi-container">
                    <span className="section-label-about">THE PHILOSOPHY</span>
                    <div className="phi-content-layout">
                        <div className="phi-title-area">
                            <h2 className="phi-title">WHERE <span className="text-highlight">THINKING</span><br />
                                BECOMES <span className="text-highlight">EXPERIENCE.</span></h2>
                        </div>
                        <div className="phi-content-block">
                            <p className="phi-lead">As a <span className="text-highlight">Full-Stack Developer</span>, I design and build <span className="text-highlight">digital products</span> that feel <span className="text-highlight">intentional</span>—systems that are <span className="text-highlight">carefully engineered</span>, yet <span className="text-highlight">effortless to use.</span></p>
                            <div className="phi-paragraph">
                                <p>My work lives at the intersection of <span className="text-highlight">structure and simplicity</span>. With a background in <span className="text-highlight">Computer Science</span> and a strong appreciation for <span className="text-highlight">minimal design</span>, I focus on turning <span className="text-highlight">complex logic</span> into clear, usable interfaces.</p>
                                <p>Whether I’m crafting <span className="text-highlight">responsive frontends</span>, designing <span className="text-highlight">scalable back-end architectures</span>, or refining interactions through <span className="text-highlight">motion and gestures</span>, my goal is always the same: <span className="text-highlight">reduce friction</span> and let the product speak for itself.</p>
                                <p><span className="text-highlight">Great technology</span> doesn’t demand attention—it quietly supports the user, connecting <span className="text-highlight">robust systems</span> with <span className="text-highlight">real human needs.</span></p>
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
                    <span className="section-label-about">EXPERIENCE</span>
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
                    <a href="/final-Dev-resume.pdf" download className="liquid-btn resume-btn">
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

            {/* Redesigned Tech Matrix Section - Book Style */}
            <section className="tech-living-section">
                <div className="exp-sticky-title">
                    <span className="section-label-about">TECH STACK</span>
                    <h2>Skills & Tools</h2>
                </div>
                <div className="books-shelf">
                    {skillGroups.map((group, i) => (
                        <div key={i} className="book-item">
                            <div className="book">
                                <div className="book-cover">
                                    <div className="book-spine"></div>
                                    <div className="book-front">
                                        <div className="cover-blob"></div>
                                        <div className="book-cover-design">
                                            <span className="book-tag">Notebook Vol. 0{i + 1}</span>
                                            <h3 className="book-title">{group.category}</h3>
                                            <div className="book-decorator"></div>
                                            <span className="book-author">RP / Handcrafted</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="book-pages">
                                    <div className="notebook-page">
                                        <div className="page-header">
                                            <span className="page-no">pg. 0{i + 1}</span>
                                        </div>
                                        <div className="notebook-lines">
                                            <h4 className="notebook-title">{group.category}</h4>
                                            <ul className="skills-notebook-list">
                                                {group.items.map((skill, j) => (
                                                    <li key={j} className="skill-note">
                                                        <span className="bullet">✻</span>
                                                        <span className="skill-name">{skill.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Redesigned Education Section - White Theme */}
            <section className="education-section white-theme">
                <div className="edu-blob"></div>
                <div className="edu-container">
                    <span className="section-label-about">EDUCATION</span>
                    <div className="edu-content-layout">
                        <div className="edu-title-area">
                            <h2 className="edu-main-title">Academic <br />Foundations.</h2>
                        </div>
                        <div className="edu-details-area">
                            <div className="edu-item">
                                {/* <span className="edu-year">2019 — 2023</span> */}
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
