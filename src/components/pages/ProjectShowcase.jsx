import { useEffect, useRef } from 'react';
import { useNavigate, Link, Links } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectShowcase.css';
import doitMockup from '../../assets/doit-mockup.png';
import koaMockup from '../../assets/Mockup koa.png';
import eventlyMockup from '../../assets/evently/mockuper.png';


gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: "01",
        name: "Do-It: Manage with ease",
        category: "Productivity",
        description: "A task management app that helps users stay organized and productive by allowing them to create, prioritize, and track their tasks in one place.",
        imageUrl: doitMockup,
        tags: ["Next.js", "Figma", "Expo", "Supabase", "React Native"],
        links: '/doit-project'
    },
    {
        id: "02",
        name: "Koa - Budgeting made easy",
        category: "Fintech",
        description: "A comprehensive personal finance tracker that simplifies money management by automating expense categorization, visualizing financial trends, and helping users plan smarter savings goals with clarity-driven dashboards.",
        imageUrl: koaMockup,
        tags: ["React Native", "Figma", "Express.js", "Node.js", "Supabase", "Firebase"],
        links: '/koa-project'
    },
    {
        id: "03",
        name: "Evently",
        category: "Web Application",
        description: "A comprehensive event management platform that streamlines the entire lifecycle of events, from seamless ticket booking and attendee registration to real-time scheduling and interactive community engagement tools.",
        imageUrl: eventlyMockup,
        tags: ["Next.js", "Figma", "Supabase", "Firebase", "Tailwind CSS", "gsap"],
        links: '/evently-project'
    },
    {
        id: "04",
        name: "ZenFlow - Mental Wellness",
        category: "Mobile Application",
        description: "A comprehensive mental wellness mobile application designed to help users track their emotional journey through intuitive journaling and mood tracking.",
        imageUrl: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=2038&auto=format&fit=crop",
        tags: ["React Native", "Expo", "Supabase", "TypeScript", "Reanimated"],
        links: '/zenflo-project'
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
                }, "-=0.7")
                .from(".hero-extra-text", {
                    y: 20, opacity: 0, duration: 1, ease: "power3.out"
                }, "-=0.5");

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
            {/* <div className="scroll-progress-bar" ref={progressRef}></div> */}
            <div className="bg-glow"></div>
            <div className="bg-glow-2"></div>

            <header className="project-showcase-header">
                <Link to="/" className="back-link">
                    <span className="arrow">←</span> <span>GO BACK</span>
                </Link>
            </header>
            <section className="project-showcase-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <div>{splitText("CRAFTING")}</div>
                        <div className="outline">{splitText("DIGITAL")}</div>
                        <div>{splitText("LEGACIES")}</div>
                    </h1>

                    <div className="hero-extra-text">
                        <p>
                            We merge creative vision with technical excellence
                            to build digital masterpieces that stand the test of time.
                            Every pixel is curated for impact.
                        </p>
                    </div>
                </div>
            </section>

            <div className="project-stack">
                {projects.map((project) => (
                    <div key={project.id} className="project-item">
                        <div className="project-card-content">
                            <div className="project-header">
                                <span className="project-num">{project.id}</span>
                                <span className="project-category">{project.category}</span>
                            </div>

                            <div className="project-info-group">
                                <h2 className="project-name">{project.name}</h2>
                                <p className="project-description">{project.description}</p>

                                <div className="project-tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <a
                                href="#"
                                className="button button--stroke"
                                data-block="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo(0, 0);
                                    navigate(project.links ? project.links : '/projects');
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
                            <div className="project-image-wrapper" style={{ position: 'relative', top: '0rem' }}>
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
