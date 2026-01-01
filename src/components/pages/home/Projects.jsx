import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';
import koaMockup from '../../../assets/Mockup koa.png';
import doitMockup from '../../../assets/doit-mockup.png';

gsap.registerPlugin(ScrollTrigger);

const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

const projectsData = [
    {
            id: "01",
            name: "Do-It: Manage with ease",
            category: "Productivity",
            description: "A task management app that helps users stay organized and productive by allowing them to create, prioritize, and track their tasks in one place.",
            tags: ["Next.js", "Figma", "Expo", "Supabase", "React Native"],
            image: doitMockup,
            link: "/doit-project",
            
    },
    {
        id: "02",
        title: "Koa - Budgeting made easy",
        category: "Fintech",
        description: "A comprehensive personal finance tracker that simplifies money management by automating expense categorization, visualizing financial trends, and helping users plan smarter savings goals with clarity-driven dashboards.",
        tags: ["React Native", "Figma", "Express.js", "Node.js", "Supabase", "Firebase"],
        image: koaMockup,
        link: "/doit-project",
        
    },
];

export default function Projects() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const mouseMoveHandlersRef = useRef(new Map());

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
        const ctx = gsap.context(() => {
            // Title Reveal Animation
            const titleChars = titleRef.current?.querySelectorAll('.char');
            if (titleChars) {
                gsap.fromTo(titleChars,
                    {
                        y: 100,
                        opacity: 0,
                        rotateX: -45,
                        skewY: 7
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        skewY: 0,
                        stagger: 0.03,
                        duration: 1.5,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 90%",
                        }
                    }
                );
            }

            // Subtitle Reveal Animation
            const subtitle = containerRef.current?.querySelector('.projects-subtitle');
            if (subtitle) {
                gsap.fromTo(subtitle,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        delay: 0.4,
                        scrollTrigger: {
                            trigger: subtitle,
                            start: "top 95%",
                        }
                    }
                );
            }

            // Cards Reveal and Interaction Logic
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const img = card.querySelector('.project-image');
                const imgWrapper = card.querySelector('.project-image-wrapper');
                const revealItems = card.querySelectorAll('.reveal-item');

                // Initial Content Reveal
                gsap.fromTo(revealItems,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 1,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                        }
                    }
                );

                // Image Parallax Effect
                if (imgWrapper) {
                    gsap.to(img, {
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

                // Stacking Card Effect
                const nextCard = cardsRef.current[index + 1];
                if (nextCard) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.4,
                        filter: "blur(4px)",
                        scrollTrigger: {
                            trigger: nextCard,
                            start: "top 85%",
                            end: "top 15%",
                            scrub: true
                        }
                    });
                }
            });

            // Premium Liquid Button Interaction
            const liquidButtons = document.querySelectorAll('.liquid-btn');
            liquidButtons.forEach(btn => {
                const flair = btn.querySelector('.liquid-btn__flair');
                const label = btn.querySelector('.liquid-btn__label');

                const xSet = gsap.quickSetter(flair, "xPercent");
                const ySet = gsap.quickSetter(flair, "yPercent");

                btn.addEventListener('mouseenter', () => {
                    gsap.to(flair, { scale: 1, duration: 0.5, ease: "power2.out" });
                    gsap.to(label, { x: 5, duration: 0.3 });
                });

                btn.addEventListener('mouseleave', () => {
                    gsap.to(flair, { scale: 0, duration: 0.4, ease: "power2.in" });
                    gsap.to(label, { x: 0, duration: 0.3 });
                });

                btn.addEventListener('mousemove', (e) => {
                    const { left, top, width, height } = btn.getBoundingClientRect();
                    const x = ((e.clientX - left) / width) * 100;
                    const y = ((e.clientY - top) / height) * 100;
                    xSet(x);
                    ySet(y);

                    // Subtle magnetic pull
                    const pullX = (e.clientX - (left + width / 2)) * 0.15;
                    const pullY = (e.clientY - (top + height / 2)) * 0.15;
                    gsap.to(btn, { x: pullX, y: pullY, duration: 0.4, ease: "power2.out" });
                });

                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="projects-section" id="projects" ref={containerRef}>
            <div className="projects-container">
                <header className="projects-header">
                    <div className="projects-title-wrapper">
                        <h2 className="projects-title" ref={titleRef}>
                            {"Selected Works".split("").map((char, i) => (
                                <span key={i} className="char">{char === " " ? "\u00A0" : char}</span>
                            ))}
                        </h2>
                    </div>
                    <p className="projects-subtitle">
                        A curated selection of projects demonstrating a passion for building robust, high-performance digital experiences.
                    </p>
                </header>

                <div className="projects-stack">
                    {projectsData.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card"
                            ref={(el) => (cardsRef.current[index] = el)}
                            style={{ zIndex: index + 1 }}
                            onClick={() => navigate(project.link)}
                            onMouseMove={(e) => getThrottledMouseMove(e.currentTarget)(e)}
                        >
                            <div className="project-card-inner">
                                <div className="project-content">
                                    <div className="project-meta reveal-item">
                                        <span className="project-number">0{project.id}</span>
                                        <span className="project-category">{project.category}</span>
                                    </div>

                                    <div className="project-details">
                                        <h3 className="project-name reveal-item">{project.title}</h3>
                                        <p className="project-description reveal-item">{project.description}</p>
                                        <div className="project-tags reveal-item">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="project-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="reveal-item">
                                            <div className="project-link">
                                                Explore Case Study <span className="arrow">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-image-container">
                                    <div className="project-image-wrapper">
                                        <div
                                            className="project-image"
                                            style={{
                                                backgroundImage: project.image.includes('linear-gradient')
                                                    ? project.image : `url(${project.image})`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="view-all-footer">
                    <Link to="/projects" className="liquid-btn">
                        <span className="liquid-btn__flair"></span>
                        <div className="liquid-btn__label">
                            <span>VIEW ALL PROJECTS</span>
                            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" style={{ marginLeft: '10px' }}>
                                <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
