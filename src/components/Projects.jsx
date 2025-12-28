import { useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

// Throttle function for performance
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

const projectsData = [
    {
        id: 1,
        title: "KOA",
        category: "Budgeting App",
        description:
            "A comprehensive budgeting application designed to streamline expense management and income tracking. It features real-time data synchronization across devices and provides users with detailed financial insights through interactive charts.",
        tags: ["React Native", "Figma", "Android", "Expo", "Redux", "Supabase"],
        image: new URL('../assets/Mockup koa.png', import.meta.url).href,
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
    // {
    //     id: 3,
    //     title: "Nebula OS",
    //     category: "Web Application",
    //     description:
    //         "A cloud-based operating system interface running entirely in the browser. Mimics desktop styling with window management, file systems, and multitasking capabilities.",
    //     tags: ["TypeScript", "Rust", "WASM", "React"],
    //     image: "linear-gradient(45deg, #2b1c2b 0%, #452c45 100%)",
    //     link: "/nebula-project"
    // },
    // {
    //     id: 4,
    //     title: "Aether Lens",
    //     category: "AI Platform",
    //     description:
    //         "Generative AI platform interface for editing and synthesizing images. Focuses on intuitive controls and instant feedback loops using edge computing.",
    //     tags: ["Vue.js", "Python", "TensorFlow", "FastAPI"],
    //     image: "linear-gradient(45deg, #1c2b2b 0%, #2c4545 100%)",
    //     link: "/aether-project"
    // }
];

export default function Projects() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardsRef = useRef([]);
    const mouseMoveHandlersRef = useRef(new Map());

    // Memoized throttled mouse move handler
    const getThrottledMouseMove = useCallback((cardElement) => {
        if (!mouseMoveHandlersRef.current.has(cardElement)) {
            mouseMoveHandlersRef.current.set(
                cardElement,
                throttle((e) => {
                    const rect = cardElement.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    cardElement.style.setProperty('--mouse-x', `${x}px`);
                    cardElement.style.setProperty('--mouse-y', `${y}px`);
                }, 16)
            );
        }
        return mouseMoveHandlersRef.current.get(cardElement);
    }, []);

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

            /* ---------------- Card logic (OPTIMIZED) ---------------- */
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const overlay = card.querySelector('.project-overlay');
                const imgWrapper = card.querySelector('.project-image-wrapper');
                const img = card.querySelector('.project-image');
                const elements = card.querySelectorAll(
                    '.project-number, .project-category, .project-name, .project-description, .project-tag, .liquid-btn'
                );

                /* Content reveal — once only (optimized) */
                gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        once: true,
                        markers: false
                    }
                })
                    .fromTo(
                        overlay,
                        { xPercent: 0 },
                        { xPercent: 101, duration: 1.2, ease: "power4.inOut", force3D: true }
                    )
                    .fromTo(
                        imgWrapper,
                        { scale: 1.3, filter: "blur(15px)" },
                        { scale: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.out", force3D: true },
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
                            ease: "power4.out",
                            force3D: true
                        },
                        "-=1.2"
                    );

                /* Parallax image (optimized with reduced range) */
                if (img) {
                    gsap.to(img, {
                        yPercent: 10, // Reduced from 15 for better performance
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1, // Smoother scrub value
                            markers: false
                        }
                    });
                }

                /* Stacking effect (optimized - removed blur for performance) */
                const nextCard = cardsRef.current[index + 1];
                if (nextCard) {
                    gsap.to(card, {
                        scale: 0.92, // Slightly less scale for smoother transition
                        opacity: 0.7,
                        // Removed blur filter - very expensive
                        force3D: true,
                        scrollTrigger: {
                            trigger: nextCard,
                            start: "top center",
                            end: "top top",
                            scrub: 1,
                            invalidateOnRefresh: true,
                            markers: false
                        }
                    });
                }
            });

            /* ---------------- Liquid Button Effect (OPTIMIZED) ---------------- */
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

                    let rafId = null;
                    let mouseX = 50;
                    let mouseY = 50;

                    const updateFlair = () => {
                        xSet(mouseX);
                        ySet(mouseY);
                        rafId = null;
                    };

                    liquidBtn.addEventListener('mouseenter', (e) => {
                        const { x, y } = getXY(e);
                        mouseX = x;
                        mouseY = y;
                        xSet(x);
                        ySet(y);
                        gsap.to(flair, {
                            scale: 1,
                            duration: 0.4,
                            ease: "power2.out",
                            force3D: true
                        });
                    });

                    liquidBtn.addEventListener('mouseleave', (e) => {
                        const { x, y } = getXY(e);
                        gsap.killTweensOf(flair);
                        if (rafId) {
                            cancelAnimationFrame(rafId);
                            rafId = null;
                        }
                        gsap.to(flair, {
                            xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                            yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                            scale: 0,
                            duration: 0.3,
                            ease: "power2.out",
                            force3D: true
                        });
                    });

                    // Throttled mousemove with requestAnimationFrame
                    liquidBtn.addEventListener('mousemove', throttle((e) => {
                        const { x, y } = getXY(e);
                        mouseX = x;
                        mouseY = y;
                        if (!rafId) {
                            rafId = requestAnimationFrame(updateFlair);
                        }
                    }, 16)); // ~60fps
                }
            });

        }, containerRef);

        /* Final refresh AFTER layout is ready - debounced */
        const refreshTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        }, 100);

        return () => {
            clearTimeout(refreshTimeout);
            ctx.revert();
        };
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
                                const handler = getThrottledMouseMove(e.currentTarget);
                                handler(e);
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
                                            style={{
                                                backgroundImage: project.image.includes('linear-gradient')
                                                    ? project.image
                                                    : `url(${project.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                            }}
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
