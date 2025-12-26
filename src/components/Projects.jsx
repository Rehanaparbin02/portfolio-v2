import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 1,
        title: "Lumina Noir",
        category: "E-Commerce",
        description: "A luxury dark-mode e-commerce experience tailored for high-end fashion brands. Features seamless page transitions, WebGL product previews, and a bespoke checkout flow.",
        tags: ["Next.js", "WebGL", "Stripe", "GSAP"],
        color: "#1a1a1a",
        image: "linear-gradient(45deg, #1c1c1c 0%, #2a2a2a 100%)" // Placeholder
    },
    {
        id: 2,
        title: "Vanguard",
        category: "Fintech App",
        description: "Real-time dashboard for cryptocurrency trading with predictive analytics. Implements heavy data visualization using D3.js and efficient WebSocket connections.",
        tags: ["React", "D3.js", "WebSockets", "Node.js"],
        color: "#0f1525",
        image: "linear-gradient(45deg, #0f1525 0%, #1c2540 100%)"
    },
    {
        id: 3,
        title: "Nebula OS",
        category: "Web Application",
        description: "A cloud-based operating system interface running entirely in the browser. Mimics desktop styling with window management, file systems, and multitasking capabilities.",
        tags: ["TypeScript", "Rust", "WASM", "React"],
        color: "#2b1c2b",
        image: "linear-gradient(45deg, #2b1c2b 0%, #452c45 100%)"
    },
    {
        id: 4,
        title: "Aether Lens",
        category: "AI Platform",
        description: "Generative AI platform interface for editing and synthesizing images. Focuses on intuitive controls and instant feedback loops using edge computing.",
        tags: ["Vue.js", "Python", "TensorFlow", "FastAPI"],
        color: "#1c2b2b",
        image: "linear-gradient(45deg, #1c2b2b 0%, #2c4545 100%)"
    }
];

export default function Projects() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            });

            // Stack Animation Logic
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Stacking Scale Animation
                gsap.to(card, {
                    scale: 0.95 - (cardsRef.current.length - index) * 0.02,
                    filter: `blur(${(cardsRef.current.length - index) * 1}px)`,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 10%",
                        end: "bottom top",
                        scrub: true,
                    }
                });

                // Parallax for the image inside
                const image = card.querySelector('.project-image');
                if (image) {
                    gsap.to(image, {
                        yPercent: 20,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                }

                // Entrance animation
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section className="projects-section" id="projects" ref={containerRef}>
            <div className="projects-container">
                <div className="projects-header">
                    <div className="projects-title-wrapper">
                        <h2 className="projects-title" ref={titleRef}>Selected Works</h2>
                    </div>
                    <p className="projects-subtitle">
                        A curated selection of projects that demonstrate my passion for building robust and interactive digital experiences.
                    </p>
                </div>

                <div className="projects-stack">
                    {projectsData.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card"
                            ref={addToRefs}
                            onMouseMove={(e) => {
                                const card = e.currentTarget;
                                const rect = card.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                card.style.setProperty('--mouse-x', `${x}px`);
                                card.style.setProperty('--mouse-y', `${y}px`);
                            }}
                            style={{
                                top: `calc(15vh + ${index * 2}vh)`
                            }}
                        >
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
                                        <a href="#_" className="project-link">
                                            View Project <span className="arrow">→</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="project-image-container">
                                    <div className="project-overlay"></div>
                                    <div className="project-image-wrapper">
                                        <div
                                            className="project-image"
                                            style={{ background: project.image }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="view-all-projects-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh', paddingBottom: '10vh' }}>
                    <Link to="/projects" className="view-all-projects-btn">
                        VIEW ALL PROJECTS <span>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
