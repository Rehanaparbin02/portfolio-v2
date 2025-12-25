import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
    const sectionRef = useRef(null);
    const heroRef = useRef(null);
    const servicesContainerRef = useRef(null);
    const servicesGridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section entrance animation
            gsap.from(sectionRef.current, {
                y: 150,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    toggleActions: "play none none reverse"
                }
            });

            // Border radius animation (Desktop only)
            const mm = gsap.matchMedia();

            mm.add("(min-width: 769px)", () => {
                gsap.fromTo(sectionRef.current, {
                    borderTopLeftRadius: "5rem",
                    borderTopRightRadius: "5rem"
                }, {
                    borderTopLeftRadius: "15rem",
                    borderTopRightRadius: "15rem",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1
                    }
                });

                // Horizontal scroll for desktop
                const servicesGrid = servicesGridRef.current;
                const servicesContainer = servicesContainerRef.current;

                if (servicesGrid && servicesContainer) {
                    const cards = gsap.utils.toArray(".service-card");
                    const scrollWidth = servicesGrid.scrollWidth - window.innerWidth;

                    const horizontalScroll = gsap.to(servicesGrid, {
                        x: () => -scrollWidth,
                        ease: "none",
                        scrollTrigger: {
                            trigger: servicesContainer,
                            start: "top top",
                            end: () => `+=${scrollWidth + window.innerHeight}`,
                            scrub: 1,
                            pin: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true
                        }
                    });

                    // Card reveal animations
                    cards.forEach((card, index) => {
                        gsap.from(card, {
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: horizontalScroll,
                                start: "left 90%",
                                end: "left 60%",
                                scrub: 1,
                            },
                            opacity: 0,
                            scale: 0.9,
                            y: 50
                        });
                    });
                }
            });

            mm.add("(max-width: 768px)", () => {
                // Mobile: simple stagger animation
                gsap.from(".service-card", {
                    scrollTrigger: {
                        trigger: ".services-grid",
                        start: "top 80%",
                    },
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out"
                });
            });

            // Hero entrance animation
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            heroTl
                .from(".work-eyebrow", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                })
                .from(".work-title", {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.5")
                .from(".work-subtitle", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {
            number: "01",
            title: "Full Stack Development",
            description: "Building scalable and high-performance web applications using Next.js, React, Node.js, and TypeScript, with robust backend architectures, secure RESTful APIs, and clean code practices.",
            tags: ["Next.js", "React", "Node.js", "TypeScript"]
        },
        {
            number: "02",
            title: "UI/UX Design & Frontend",
            description: "Designing modern, responsive interfaces with Figma, Tailwind CSS, and Framer Motion. Creating intuitive experiences with clean design systems and pixel-perfect implementations.",
            tags: ["Figma", "Tailwind", "Framer Motion", "Design Systems"]
        },
        {
            number: "03",
            title: "SaaS Platform Development",
            description: "Developing end-to-end SaaS solutions with subscription systems, Stripe billing, and multi-tenant management. Ensuring scalability and secure user management.",
            tags: ["SaaS", "Stripe", "Multi-tenant", "Scalability"]
        },
        {
            number: "04",
            title: "API & System Architecture",
            description: "Designing maintainable APIs with PostgreSQL, Prisma, and MongoDB. Focusing on performance optimization, security best practices, and reliable data flow.",
            tags: ["PostgreSQL", "Prisma", "MongoDB", "REST APIs"]
        },
        {
            number: "05",
            title: "Performance Optimization",
            description: "Optimizing web applications for speed and efficiency. Implementing lazy loading, code splitting, and caching strategies for lightning-fast user experiences.",
            tags: ["Web Vitals", "Optimization", "Caching", "Performance"]
        },
        {
            number: "06",
            title: "DevOps & Deployment",
            description: "Setting up CI/CD pipelines, containerization with Docker, and cloud deployments. Ensuring smooth development workflows and reliable production environments.",
            tags: ["Docker", "CI/CD", "AWS", "Vercel"]
        },
    ];

    return (
        <section className="work-section" ref={sectionRef}>
            {/* Background decoration */}
            <div className="work-bg-decoration"></div>

            {/* Decorative Curves */}
            <svg className="work-curve work-curve-left" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10 Q 10 100, 100 100 L 90 110" stroke="#00ff00" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M90 110 L 100 100 L 110 110" stroke="#00ff00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <svg className="work-curve work-curve-right" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M190 10 Q 190 100, 100 100 L 110 110" stroke="#00ff00" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M110 110 L 100 100 L 90 110" stroke="#00ff00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Hero Section */}
            <div className="work-hero" ref={heroRef}>
                <div className="work-eyebrow">What I Do</div>
                <h2 className="work-title">
                    Transforming ideas into exceptional digital experiences
                </h2>
                <p className="work-subtitle">
                    Through expertise and innovation
                </p>
            </div>

            {/* Horizontal Scroll Services */}
            <div className="services-container" ref={servicesContainerRef}>
                <div className="services-grid" ref={servicesGridRef}>
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card"
                        >
                            <div className="service-card-inner">
                                <div className="service-header">
                                    <span className="service-number">{service.number}</span>
                                    <div className="service-icon">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
                                            <path d="M15 20L18 23L25 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <div className="service-tags">
                                    {service.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="service-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="service-card-glow"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}