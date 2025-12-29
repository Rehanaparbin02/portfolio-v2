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
        category: "E-Commerce",
        description: "A luxury dark-mode e-commerce experience tailored for high-end fashion brands. Features seamless page transitions, WebGL product previews, and a bespoke checkout flow.",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
        tags: ["Next.js", "WebGL", "Stripe", "GSAP"]
    },
    {
        id: "02",
        name: "Vanguard",
        category: "Fintech",
        description: "Real-time dashboard for cryptocurrency trading with predictive analytics. Implements heavy data visualization using D3.js and efficient WebSocket connections.",
        imageUrl: "https://images.unsplash.com/photo-1611974717483-3600997e550e?q=80&w=2070&auto=format&fit=crop",
        tags: ["React", "D3.js", "WebSockets", "Node.js"]
    },
    {
        id: "03",
        name: "Nebula OS",
        category: "Web Application",
        description: "A cloud-based operating system interface running entirely in the browser. Mimics desktop styling with window management, file systems, and multitasking capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
        tags: ["Vue.js", "Firebase", "SCSS", "PWA"]
    },
    {
        id: "04",
        name: "Aether Lens",
        category: "AI Platform",
        description: "Generative AI platform interface for editing and synthesizing images. Focuses on intuitive controls and instant feedback loops using edge computing.",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        tags: ["React Three Fiber", "TensorFlow.js", "Python", "AWS"]
    }
];

export default function ProjectShowcase() {
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Reveal
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".project-showcase-hero",
                    start: "top 80%",
                }
            });

            heroTl.from(".hero-sub", {
                y: 30, opacity: 0, duration: 1, ease: "power3.out"
            })
                .from(".hero-title .char", {
                    y: 100, skewY: 10, opacity: 0, duration: 1.2, stagger: 0.02, ease: "expo.out"
                }, "-=0.7");

            // Progress Bar
            gsap.to(progressRef.current, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });

            // Card Stack Animation
            const cards = gsap.utils.toArray('.project-item');
            cards.forEach((card, i) => {
                if (i !== cards.length - 1) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.5,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 10% ",
                            end: "bottom 10%",
                            scrub: true,
                            onEnter: () => {
                                gsap.to(card, { boxShadow: "0 20px 50px rgba(0,0,0,0.5)" });
                            }
                        }
                    });
                }

                // Content Entrance Reveal
                gsap.from(card.querySelector('.project-card-content > *'), {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 60%",
                    }
                });

                // Image Entrance Reveal
                gsap.from(card.querySelector('.project-image'), {
                    scale: 1.2,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 60%",
                    }
                });
            });

            // Premium Button Hover Logic
            const buttonElements = document.querySelectorAll('[data-block="button"]');
            buttonElements.forEach((btn) => {
                const flair = btn.querySelector('.button__flair');
                const xSet = gsap.quickSetter(flair, "xPercent");
                const ySet = gsap.quickSetter(flair, "yPercent");

                const getXY = (e) => {
                    const { left, top, width, height } = btn.getBoundingClientRect();
                    const xTransformer = gsap.utils.pipe(
                        gsap.utils.mapRange(0, width, 0, 100),
                        gsap.utils.clamp(0, 100)
                    );
                    const yTransformer = gsap.utils.pipe(
                        gsap.utils.mapRange(0, height, 0, 100),
                        gsap.utils.clamp(0, 100)
                    );
                    return {
                        x: xTransformer(e.clientX - left),
                        y: yTransformer(e.clientY - top)
                    };
                };

                btn.addEventListener("mouseenter", (e) => {
                    const { x, y } = getXY(e);
                    xSet(x);
                    ySet(y);
                    gsap.to(flair, { scale: 1, duration: 0.4, ease: "power2.out" });
                });

                btn.addEventListener("mouseleave", (e) => {
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

                btn.addEventListener("mousemove", (e) => {
                    const { x, y } = getXY(e);
                    gsap.to(flair, { xPercent: x, yPercent: y, duration: 0.4, ease: "power2" });
                });
            });

            // Background Smooth tracking
            const onMouseMove = (e) => {
                const x = (e.clientX - window.innerWidth / 2) * 0.05;
                const y = (e.clientY - window.innerHeight / 2) * 0.05;
                gsap.to('.bg-glow', { x, y, duration: 2, ease: 'power2.out' });
                gsap.to('.bg-glow-2', { x: -x, y: -y, duration: 3, ease: 'power2.out' });
            };
            window.addEventListener('mousemove', onMouseMove);

            return () => window.removeEventListener('mousemove', onMouseMove);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text) => text.split("").map((char, i) => (
        <span key={i} className="char" style={{ display: 'inline-block' }}>{char === ' ' ? '\u00A0' : char}</span>
    ));

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

            <div className="project-stack">
                {projects.map((project, index) => (
                    <div key={project.id} className="project-item">
                        <div className="project-card-content">
                            <div className="project-header">
                                <span className="project-num">{project.id}</span>
                                <span className="project-category">{project.category}</span>
                            </div>

                            <h2 className="project-name">{project.name}</h2>
                            <p className="project-description">{project.description}</p>

                            <div className="project-tags">
                                {project.tags.map(tag => (
                                    <span key={tag} className="project-tag">{tag}</span>
                                ))}
                            </div>

                            <a
                                href="#"
                                className="button button--stroke"
                                data-block="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo(0, 0);
                                    navigate('/doit-project');
                                }}
                            >
                                <span className="button__flair"></span>
                                <span className="button__label">VIEW FULL PROJECT
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </div>

                        <div className="project-card-visual">
                            <div className="project-image-wrapper">
                                <div className="img-overlay"></div>
                                <img src={project.imageUrl} alt={project.name} className="project-image" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
