import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: "01",
        name: "Lumina Noir",
        category: "E-Commerce • Web Platform",
        description: "A luxury dark-mode e-commerce experience tailored for high-end fashion brands. Features seamless page transitions, WebGL product previews, and a bespoke checkout flow.",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "02",
        name: "Vanguard",
        category: "Fintech • SaaS Dashboard",
        description: "Real-time dashboard for cryptocurrency trading with predictive analytics. Implements heavy data visualization using D3.js and efficient WebSocket connections.",
        imageUrl: "https://images.unsplash.com/photo-1611974717483-3600997e550e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "03",
        name: "Nebula OS",
        category: "Web Application • Operating System",
        description: "A cloud-based operating system interface running entirely in the browser. Mimics desktop styling with window management, file systems, and multitasking capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "04",
        name: "Aether Lens",
        category: "AI Platform • Creative Tool",
        description: "Generative AI platform interface for editing and synthesizing images. Focuses on intuitive controls and instant feedback loops using edge computing.",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function ProjectShowcase() {
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            const heroTl = gsap.timeline({
                defaults: { ease: "power4.out" }
            });

            heroTl.from(".hero-sub", {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.5
            })
                .from(".hero-title .char", {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.05,
                }, "-=0.8");

            // Scroll Progress
            gsap.to(progressRef.current, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.3
                }
            });

            // Projects Reveal Animation
            const projectItems = gsap.utils.toArray('.project-item');
            projectItems.forEach((item, i) => {
                const img = item.querySelector('.project-image-wrapper');
                const info = item.querySelector('.project-info');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });

                tl.from(img, {
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power3.out"
                })
                    .from(info.children, {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out"
                    }, "-=1");

                // Hover Parallax Effect on Image
                if (img) {
                    img.addEventListener('mousemove', (e) => {
                        const { left, top, width, height } = img.getBoundingClientRect();
                        const x = (e.clientX - left) / width - 0.5;
                        const y = (e.clientY - top) / height - 0.5;

                        gsap.to(img.querySelector('.project-image'), {
                            x: x * 30,
                            y: y * 30,
                            rotateX: -y * 10,
                            rotateY: x * 10,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    });

                    img.addEventListener('mouseleave', () => {
                        gsap.to(img.querySelector('.project-image'), {
                            x: 0,
                            y: 0,
                            rotateX: 0,
                            rotateY: 0,
                            duration: 0.8,
                            ease: "elastic.out(1, 0.3)"
                        });
                    });
                }

                // Liquid Button Effect
                const liquidBtn = item.querySelector('.liquid-btn');
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
            });

            // Smooth background glow tracking
            const onMouseMove = (e) => {
                const x = e.clientX;
                const y = e.clientY;
                gsap.to('.bg-glow', {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 2,
                    ease: 'power2.out'
                });
            };
            document.addEventListener('mousemove', onMouseMove);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split text for hero animation
    const splitText = (text) => {
        return text.split("").map((char, i) => (
            <span key={i} className="char" style={{ display: 'inline-block' }}>
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    return (
        <div className="project-showcase-container" ref={containerRef}>
            <div className="scroll-progress-bar" ref={progressRef}></div>
            <div className="bg-glow"></div>
            <div className="bg-glow-2"></div>

            <section className="project-showcase-hero">
                <span className="hero-sub">Curation 2024-25</span>
                <h1 className="hero-title">
                    <div>{splitText("CRAFTING")}</div>
                    <div className="outline">{splitText("DIGITAL")}</div>
                    <div>{splitText("LEGACIES")}</div>
                </h1>
            </section>

            <section className="showcase-grid">
                {projects.map((project, index) => (
                    <div className="project-item" key={project.id}>
                        <div className="project-image-wrapper">
                            <img src={project.imageUrl} alt={project.name} className="project-image" />
                        </div>
                        <div className="project-info">
                            <span className="project-num">{project.id}</span>
                            <span className="project-category">{project.category}</span>
                            <h2 className="project-name">{project.name}</h2>
                            <p className="project-description">{project.description}</p>
                            <button
                                className="liquid-btn"
                                onClick={() => {
                                    if (project.id === "01") {
                                        navigate('/doit-project');
                                    }
                                }}
                            >
                                <span className="liquid-btn__flair"></span>
                                <span className="liquid-btn__label">
                                    VIEW FULL PROJECT
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
