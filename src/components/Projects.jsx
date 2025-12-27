// import { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import gsap from 'gsap';

// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import './Projects.css';

// gsap.registerPlugin(ScrollTrigger);

// const projectsData = [
//     {
//         id: 1,
//         title: "Lumina Noir",
//         category: "E-Commerce",
//         description: "A luxury dark-mode e-commerce experience tailored for high-end fashion brands. Features seamless page transitions, WebGL product previews, and a bespoke checkout flow.",
//         tags: ["Next.js", "WebGL", "Stripe", "GSAP"],
//         color: "#1a1a1a",
//         image: "linear-gradient(45deg, #1c1c1c 0%, #2a2a2a 100%)" // Placeholder
//     },
//     {
//         id: 2,
//         title: "Vanguard",
//         category: "Fintech App",
//         description: "Real-time dashboard for cryptocurrency trading with predictive analytics. Implements heavy data visualization using D3.js and efficient WebSocket connections.",
//         tags: ["React", "D3.js", "WebSockets", "Node.js"],
//         color: "#0f1525",
//         image: "linear-gradient(45deg, #0f1525 0%, #1c2540 100%)"
//     },
//     {
//         id: 3,
//         title: "Nebula OS",
//         category: "Web Application",
//         description: "A cloud-based operating system interface running entirely in the browser. Mimics desktop styling with window management, file systems, and multitasking capabilities.",
//         tags: ["TypeScript", "Rust", "WASM", "React"],
//         color: "#2b1c2b",
//         image: "linear-gradient(45deg, #2b1c2b 0%, #452c45 100%)"
//     },
//     {
//         id: 4,
//         title: "Aether Lens",
//         category: "AI Platform",
//         description: "Generative AI platform interface for editing and synthesizing images. Focuses on intuitive controls and instant feedback loops using edge computing.",
//         tags: ["Vue.js", "Python", "TensorFlow", "FastAPI"],
//         color: "#1c2b2b",
//         image: "linear-gradient(45deg, #1c2b2b 0%, #2c4545 100%)"
//     }
// ];

// export default function Projects() {
//     const containerRef = useRef(null);
//     const titleRef = useRef(null);
//     const subtitleRef = useRef(null);
//     const cardsRef = useRef([]);

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             // Title Animation (Character Reveal)
//             const titleChars = titleRef.current.querySelectorAll('.char');

//             gsap.fromTo(titleChars,
//                 {
//                     y: 100,
//                     opacity: 0,
//                     rotateX: -90,
//                     skewX: 20,
//                     transformOrigin: "bottom center"
//                 },
//                 {
//                     scrollTrigger: {
//                         trigger: containerRef.current,
//                         start: "top 85%",
//                         toggleActions: "play none none reverse",
//                     },
//                     y: 0,
//                     opacity: 1,
//                     rotateX: 0,
//                     skewX: 0,
//                     duration: 1.5,
//                     stagger: {
//                         amount: 0.8,
//                         from: "start"
//                     },
//                     ease: "expo.out"
//                 }
//             );

//             // Subtitle Animation
//             gsap.fromTo(subtitleRef.current,
//                 { y: 30, opacity: 0 },
//                 {
//                     scrollTrigger: {
//                         trigger: containerRef.current,
//                         start: "top 80%",
//                     },
//                     y: 0,
//                     opacity: 1,
//                     duration: 1,
//                     delay: 0.5,
//                     ease: "power3.out"
//                 }
//             );

//             // Stack Animation Logic
//             projectsData.forEach((_, index) => {
//                 const card = cardsRef.current[index];
//                 if (!card) return;

//                 // Stacking Scale Animation
//                 // Use projectsData.length for stable calculation
//                 const totalCards = projectsData.length;

//                 gsap.to(card, {
//                     scale: 0.95 - (totalCards - index) * 0.02,
//                     filter: `blur(${(totalCards - index) * 1}px)`,
//                     scrollTrigger: {
//                         trigger: card,
//                         start: "top 10%",
//                         end: "bottom top",
//                         scrub: true,
//                     }
//                 });

//                 // Parallax for the image inside
//                 const image = card.querySelector('.project-image');
//                 if (image) {
//                     gsap.to(image, {
//                         yPercent: 20,
//                         ease: "none",
//                         scrollTrigger: {
//                             trigger: card,
//                             start: "top bottom",
//                             end: "bottom top",
//                             scrub: true
//                         }
//                     });
//                 }

//                 // Advanced Entrance animation (Animatic style)
//                 const tl = gsap.timeline({
//                     scrollTrigger: {
//                         trigger: card,
//                         start: "top 85%",
//                         toggleActions: "play none none reverse",
//                     }
//                 });

//                 tl.fromTo(card,
//                     {
//                         clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
//                         y: 150,
//                         rotationX: -15,
//                         transformOrigin: "center bottom",
//                         opacity: 0
//                     },
//                     {
//                         clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
//                         y: 0,
//                         rotationX: 0,
//                         opacity: 1,
//                         duration: 1.5,
//                         ease: "expo.out"
//                     }
//                 );

//                 // Glow/Shimmer animation
//                 const glow = card.querySelector('.project-reveal-glow');
//                 if (glow) {
//                     tl.fromTo(glow,
//                         { xPercent: -100, skewX: -15 },
//                         { xPercent: 200, skewX: -15, duration: 2, ease: "power3.inOut" },
//                         "-=1.5"
//                     );
//                 }

//                 // Image reveal
//                 tl.fromTo(card.querySelector('.project-image-wrapper'),
//                     { scale: 1.5, filter: "blur(20px)" },
//                     {
//                         scale: 1,
//                         filter: "blur(0px)",
//                         duration: 2,
//                         ease: "expo.out"
//                     },
//                     "-=1.5"
//                 );

//                 // Content staggered reveal
//                 const contentElements = card.querySelectorAll('.project-number, .project-category, .project-name, .project-description, .project-tag, .project-link');
//                 tl.fromTo(contentElements,
//                     {
//                         y: 40,
//                         opacity: 0,
//                         skewY: 5
//                     },
//                     {
//                         y: 0,
//                         opacity: 1,
//                         skewY: 0,
//                         stagger: 0.1,
//                         duration: 1.2,
//                         ease: "power4.out"
//                     },
//                     "-=1.5"
//                 );

//                 // Overlay swipe
//                 tl.from(card.querySelector('.project-overlay'), {
//                     xPercent: -100,
//                     duration: 1.5,
//                     ease: "power2.inOut"
//                 }, "-=2");
//             });

//             // Liquid Button Effect for ALL buttons
//             const liquidButtons = containerRef.current.querySelectorAll('.liquid-btn');

//             liquidButtons.forEach(liquidBtn => {
//                 const flair = liquidBtn.querySelector('.liquid-btn__flair');

//                 if (liquidBtn && flair) {
//                     const xSet = gsap.quickSetter(flair, "xPercent");
//                     const ySet = gsap.quickSetter(flair, "yPercent");
//                     const getXY = (e) => {
//                         const { left, top, width, height } = liquidBtn.getBoundingClientRect();
//                         return {
//                             x: gsap.utils.clamp(0, 100, gsap.utils.mapRange(0, width, 0, 100, e.clientX - left)),
//                             y: gsap.utils.clamp(0, 100, gsap.utils.mapRange(0, height, 0, 100, e.clientY - top))
//                         };
//                     };

//                     liquidBtn.addEventListener('mouseenter', (e) => {
//                         const { x, y } = getXY(e);
//                         xSet(x);
//                         ySet(y);
//                         gsap.to(flair, {
//                             scale: 1,
//                             duration: 0.4,
//                             ease: "power2.out"
//                         });
//                     });

//                     liquidBtn.addEventListener('mouseleave', (e) => {
//                         const { x, y } = getXY(e);
//                         gsap.killTweensOf(flair);
//                         gsap.to(flair, {
//                             xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
//                             yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
//                             scale: 0,
//                             duration: 0.3,
//                             ease: "power2.out"
//                         });
//                     });

//                     liquidBtn.addEventListener('mousemove', (e) => {
//                         const { x, y } = getXY(e);
//                         gsap.to(flair, {
//                             xPercent: x,
//                             yPercent: y,
//                             duration: 0.4,
//                             ease: "power2"
//                         });
//                     });
//                 }
//             });

//         }, containerRef);

//         return () => ctx.revert();
//     }, []);

//     return (
//         <section className="projects-section" id="projects" ref={containerRef}>
//             <div className="projects-container">
//                 <div className="projects-header">
//                     <div className="projects-title-wrapper">
//                         <h2 className="projects-title" ref={titleRef}>
//                             {"Selected Works".split("").map((char, index) => (
//                                 <span key={index} className="char" style={{ display: "inline-block" }}>
//                                     {char === " " ? "\u00A0" : char}
//                                 </span>
//                             ))}
//                         </h2>
//                     </div>
//                     <p className="projects-subtitle" ref={subtitleRef}>
//                         A curated selection of projects that demonstrate my passion for building robust and interactive digital experiences.
//                     </p>
//                 </div>

//                 <div className="projects-stack">
//                     {projectsData.map((project, index) => (
//                         <div
//                             key={project.id}
//                             className="project-card"
//                             ref={(el) => (cardsRef.current[index] = el)}
//                             onMouseMove={(e) => {
//                                 const card = e.currentTarget;
//                                 const rect = card.getBoundingClientRect();
//                                 const x = e.clientX - rect.left;
//                                 const y = e.clientY - rect.top;
//                                 card.style.setProperty('--mouse-x', `${x}px`);
//                                 card.style.setProperty('--mouse-y', `${y}px`);
//                             }}
//                             style={{
//                                 top: `calc(15vh + ${index * 2}vh)`
//                             }}
//                         >
//                             <div className="project-reveal-glow"></div>
//                             <div className="project-card-inner">
//                                 <div className="project-content">
//                                     <div className="project-header">
//                                         <div className="project-number">0{project.id}</div>
//                                         <div className="project-category">{project.category}</div>
//                                     </div>

//                                     <div className="project-details">
//                                         <h3 className="project-name">{project.title}</h3>
//                                         <p className="project-description">{project.description}</p>
//                                         <div className="project-tags">
//                                             {project.tags.map(tag => (
//                                                 <span key={tag} className="project-tag">{tag}</span>
//                                             ))}
//                                         </div>
//                                         <Link to="/doit-project" className="liquid-btn project-card-btn">
//                                             <span className="liquid-btn__flair"></span>
//                                             <span className="liquid-btn__label">
//                                                 View Project
//                                                 <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                     <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                 </svg>
//                                             </span>
//                                         </Link>
//                                     </div>
//                                 </div>
//                                 <div className="project-image-container">
//                                     <div className="project-overlay"></div>
//                                     <div className="project-image-wrapper">
//                                         <div
//                                             className="project-image"
//                                             style={{ background: project.image }}
//                                         ></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="view-all-projects-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh', paddingBottom: '10vh' }}>
//                     <Link to="/projects" className="liquid-btn view-all-projects-btn-liquid">
//                         <span className="liquid-btn__flair"></span>
//                         <span className="liquid-btn__label">
//                             VIEW ALL PROJECTS
//                             <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                         </span>
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// }
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 1,
        title: "Lumina Noir",
        category: "E-Commerce",
        description:
            "A luxury dark-mode e-commerce experience tailored for high-end fashion brands. Features seamless page transitions, WebGL product previews, and a bespoke checkout flow.",
        tags: ["Next.js", "WebGL", "Stripe", "GSAP"],
        image: "linear-gradient(45deg, #1c1c1c 0%, #2a2a2a 100%)",
        link: "/doit-project"
    },
    {
        id: 2,
        title: "Vanguard",
        category: "Fintech App",
        description:
            "Real-time dashboard for cryptocurrency trading with predictive analytics. Implements heavy data visualization using D3.js and efficient WebSocket connections.",
        tags: ["React", "D3.js", "WebSockets", "Node.js"],
        image: "linear-gradient(45deg, #0f1525 0%, #1c2540 100%)",
        link: "/vanguard-project"
    },
    {
        id: 3,
        title: "Nebula OS",
        category: "Web Application",
        description:
            "A cloud-based operating system interface running entirely in the browser. Mimics desktop styling with window management, file systems, and multitasking capabilities.",
        tags: ["TypeScript", "Rust", "WASM", "React"],
        image: "linear-gradient(45deg, #2b1c2b 0%, #452c45 100%)",
        link: "/nebula-project"
    },
    {
        id: 4,
        title: "Aether Lens",
        category: "AI Platform",
        description:
            "Generative AI platform interface for editing and synthesizing images. Focuses on intuitive controls and instant feedback loops using edge computing.",
        tags: ["Vue.js", "Python", "TensorFlow", "FastAPI"],
        image: "linear-gradient(45deg, #1c2b2b 0%, #2c4545 100%)",
        link: "/aether-project"
    }
];

export default function Projects() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {

            /* ---------------- Header animations (unchanged) ---------------- */
            const titleChars = titleRef.current?.querySelectorAll('.char');
            if (titleChars) {
                gsap.fromTo(
                    titleChars,
                    { y: 100, opacity: 0, rotateX: -90, skewX: 20 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        skewX: 0,
                        duration: 1.2,
                        stagger: 0.03,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 85%"
                        }
                    }
                );
            }

            if (subtitleRef.current) {
                gsap.fromTo(
                    subtitleRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%"
                        }
                    }
                );
            }

            /* ---------------- Card logic (FIXED) ---------------- */
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const overlay = card.querySelector('.project-overlay');
                const imgWrapper = card.querySelector('.project-image-wrapper');
                const img = card.querySelector('.project-image');
                const elements = card.querySelectorAll(
                    '.project-number, .project-category, .project-name, .project-description, .project-tag, .liquid-btn'
                );

                /* Content reveal — once only (no reverse glitch) */
                gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        once: true
                    }
                })
                    .fromTo(
                        overlay,
                        { xPercent: 0 },
                        { xPercent: 101, duration: 1.2, ease: "power4.inOut" }
                    )
                    .fromTo(
                        imgWrapper,
                        { scale: 1.3, filter: "blur(15px)" },
                        { scale: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.out" },
                        "<"
                    )
                    .fromTo(
                        elements,
                        { y: 40, opacity: 0, skewY: 5 },
                        {
                            y: 0,
                            opacity: 1,
                            skewY: 0,
                            duration: 1,
                            stagger: 0.08,
                            ease: "power4.out"
                        },
                        "-=1.2"
                    );

                /* Parallax image */
                if (img) {
                    gsap.to(img, {
                        yPercent: 15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                }

                /* Stacking effect (stable + reversible) */
                const nextCard = cardsRef.current[index + 1];
                if (nextCard) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.6,
                        filter: "blur(4px)",
                        scrollTrigger: {
                            trigger: nextCard,
                            start: "top center",
                            end: "top top",
                            scrub: true,
                            invalidateOnRefresh: true
                        }
                    });
                }
            });

            /* ---------------- Liquid Button Effect ---------------- */
            const liquidButtons = containerRef.current.querySelectorAll('.liquid-btn');

            liquidButtons.forEach(liquidBtn => {
                const flair = liquidBtn.querySelector('.liquid-btn__flair');

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
            });

        }, containerRef);

        /* Final refresh AFTER layout is ready */
        requestAnimationFrame(() => {
            ScrollTrigger.refresh(true);
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="projects-section" id="projects" ref={containerRef}>
            <div className="projects-container">
                <div className="projects-header">
                    <div className="projects-title-wrapper">
                        <h2 className="projects-title" ref={titleRef}>
                            {"Selected Works".split("").map((char, i) => (
                                <span key={i} className="char" style={{ display: "inline-block" }}>
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </h2>
                    </div>
                    <p className="projects-subtitle" ref={subtitleRef}>
                        A curated selection of projects that demonstrate my passion
                        for building robust and interactive digital experiences.
                    </p>
                </div>

                <div className="projects-stack">
                    {projectsData.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card cursor-pointer"
                            ref={(el) => (cardsRef.current[index] = el)}
                            style={{ top: `calc(15vh + ${index * 2}vh)` }}
                            onClick={() => navigate(project.link)}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                e.currentTarget.style.setProperty(
                                    '--mouse-x',
                                    `${e.clientX - rect.left}px`
                                );
                                e.currentTarget.style.setProperty(
                                    '--mouse-y',
                                    `${e.clientY - rect.top}px`
                                );
                            }}
                        >
                            <div className="project-reveal-glow" />
                            <div className="project-card-inner">
                                <div className="project-content">
                                    <div className="project-header">
                                        <div className="project-number">0{project.id}</div>
                                        <div className="project-category">{project.category}</div>
                                    </div>

                                    <div className="project-details">
                                        <h3 className="project-name">{project.title}</h3>
                                        <p className="project-description">{project.description}</p>

                                        <div className="project-tags">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="project-tag">{tag}</span>
                                            ))}
                                        </div>

                                        {/* <div className="liquid-btn project-card-btn">
                                            <span className="liquid-btn__flair" />
                                            <span className="liquid-btn__label">
                                                View Project
                                            </span>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="project-image-container">
                                    <div className="project-overlay" />
                                    <div className="project-image-wrapper">
                                        <div
                                            className="project-image"
                                            style={{ background: project.image }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="view-all-projects-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh', paddingBottom: '10vh' }}>
                    <Link to="/projects" className="liquid-btn view-all-projects-btn-liquid">
                        <span className="liquid-btn__flair"></span>
                        <span className="liquid-btn__label">
                            VIEW ALL PROJECTS
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
