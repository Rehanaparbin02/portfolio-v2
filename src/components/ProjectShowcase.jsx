import { useEffect, useRef, useState } from 'react';
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
    const cardRef = useRef(null);
    const flipInnerRef = useRef(null);
    const navigate = useNavigate();

    const [frontIndex, setFrontIndex] = useState(0);
    const [backIndex, setBackIndex] = useState(1);
    const scrollSectionRef = useRef(null);
    const currentProjectRef = useRef(0);

    useEffect(() => {
        let scrollTrigger = null;
        
        const ctx = gsap.context(() => {
            // hero animation (kept lightweight)
            gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 0.8, delay: 0.3 });
            gsap.from(".hero-title .char", { y: 60, opacity: 0, duration: 1, stagger: 0.03, delay: 0.4 });

            // progress bar
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

            // background glow tracking
            const onMouseMove = (e) => {
                const x = e.clientX;
                const y = e.clientY;
                gsap.to('.bg-glow', { x: x * 0.06, y: y * 0.06, duration: 2, ease: 'power2.out' });
            };
            document.addEventListener('mousemove', onMouseMove);

            // Create scroll section for pinning and scrubbing flip animation
            requestAnimationFrame(() => {
                if (!scrollSectionRef.current) return;

                // Pin the card and scrub rotation based on scroll
                scrollTrigger = ScrollTrigger.create({
                    trigger: scrollSectionRef.current,
                    start: 'top top',
                    end: `+=${projects.length * 100}vh`, // 4 projects = 400vh scroll distance
                    pin: cardRef.current,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress; // 0 to 1
                        // Map progress to rotation: 0-1 progress = 0-720deg
                        // 720deg = 2 full rotations = 4 projects (each gets 180deg)
                        const rotation = progress * 720;
                        
                        // Update rotation
                        gsap.set(flipInnerRef.current, {
                            rotationY: rotation,
                            force3D: true
                        });

                        // Calculate which project segment we're in (each 180deg = one project)
                        const segment = Math.floor(rotation / 180);
                        const normalizedRotation = rotation % 360;
                        const isFlipped = normalizedRotation >= 180;
                        
                        // Calculate project indices
                        // Segment 0 (0-180deg): front=0, back=1
                        // Segment 1 (180-360deg): flipped, back=1 visible, but we need front=1, back=2
                        // Segment 2 (360-540deg): front=2, back=3
                        // Segment 3 (540-720deg): flipped, back=3 visible
                        
                        let frontProjectIndex, backProjectIndex;
                        
                        if (isFlipped) {
                            // When flipped, the back face is visible
                            // Back shows the project for current segment
                            backProjectIndex = segment % projects.length;
                            frontProjectIndex = (segment - 1 + projects.length) % projects.length;
                        } else {
                            // When not flipped, front face is visible
                            // Front shows the project for current segment
                            frontProjectIndex = segment % projects.length;
                            backProjectIndex = (segment + 1) % projects.length;
                        }
                        
                        // Update state only if indices changed
                        const newCurrent = isFlipped ? backProjectIndex : frontProjectIndex;
                        if (currentProjectRef.current !== newCurrent) {
                            setFrontIndex(frontProjectIndex);
                            setBackIndex(backProjectIndex);
                            currentProjectRef.current = newCurrent;
                        }
                    }
                });
            });

            // cleanup
            return () => {
                if (scrollTrigger) {
                    scrollTrigger.kill();
                }
                document.removeEventListener('mousemove', onMouseMove);
            };

        }, containerRef);

        return () => {
            ctx.revert();
            if (scrollTrigger) {
                scrollTrigger.kill();
            }
        };
    }, []);

    // split text helper
    const splitText = (text) => text.split("").map((char, i) => (
        <span key={i} className="char" style={{ display: 'inline-block' }}>{char === ' ' ? '\u00A0' : char}</span>
    ));

    // renders the face content for a project index
    const renderFace = (projectIndex) => {
        const project = projects[projectIndex % projects.length];
        if (!project) return null;

        return (
            <>
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

                    {project.id === "01" && (
                        <button
                            className="liquid-btn"
                            onClick={() => { window.scrollTo(0, 0); navigate('/doit-project'); }}
                        >
                            <span className="liquid-btn__flair"></span>
                            <span className="liquid-btn__label">VIEW FULL PROJECT
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </button>
                    )}
                </div>

                <div className="project-card-visual">
                    <div className="project-image-wrapper">
                        <div className="img-overlay"></div>
                        <img src={project.imageUrl} alt={project.name} className="project-image" />
                    </div>
                </div>
            </>
        );
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

            {/* Single flip card that will be pinned and flipped on scroll */}
            <div className="project-item flip-card" ref={cardRef}>
                <div className="flip-card-inner" ref={flipInnerRef}>
                    <div className="card-face front">
                        {renderFace(frontIndex)}
                    </div>

                    <div className="card-face back">
                        {renderFace(backIndex)}
                    </div>
                </div>
            </div>

            {/* Scroll section for pinning and scrubbing flip animation */}
            <div 
                className="project-scroll-section" 
                ref={scrollSectionRef}
                style={{ height: `${projects.length * 100}vh` }}
            >
                {/* This section drives the scroll-based flip */}
            </div>
        </div>
    );
}
