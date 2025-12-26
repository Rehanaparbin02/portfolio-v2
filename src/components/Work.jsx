import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
    const sectionRef = useRef(null);
    const cardsContainerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section Title Animation
            gsap.from(".work-eyebrow", {
                scrollTrigger: {
                    trigger: ".work-hero",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(".work-title", {
                scrollTrigger: {
                    trigger: ".work-hero",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.1,
                ease: "power3.out"
            });

            // Sticky Cards Animation
            const cards = gsap.utils.toArray(".service-card");

            cards.forEach((card, i) => {
                const isLast = i === cards.length - 1;

                ScrollTrigger.create({
                    trigger: card,
                    start: "top 15%", // Pin when the card reaches 15% from the top of the viewport
                    endTrigger: cardsContainerRef.current, // Pin until the container ends
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false, // Ensures next card scrolls OVER the pinned one
                    id: `card-${i}`,
                    invalidateOnRefresh: true,
                });

                if (!isLast) {
                    // Animate current card when next card overlaps
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.4,
                        filter: "blur(5px)",
                        ease: "none",
                        scrollTrigger: {
                            trigger: cards[i + 1], // The NEXT card
                            start: "top 85%", // When next card starts overlapping (entering view)
                            end: "top 15%", // When next card is fully on top
                            scrub: true,
                        }
                    });
                }
            });

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
        <section className="work-section" id="work" ref={sectionRef}>
            <div className="work-bg-decoration"></div>

            <div className="work-hero">
                <div className="work-eyebrow">Services</div>
                <h2 className="work-title">
                    Digital Solutions &<br />Creative Engineering
                </h2>
                <p className="work-subtitle">
                    Comprehensive web expertise to elevate your business
                </p>
            </div>

            <div className="cards-container" ref={cardsContainerRef}>
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card"
                    >
                        <div className="service-card-inner">
                            <div className="card-left">
                                <span className="service-number">{service.number}</span>
                                <h3 className="service-title">{service.title}</h3>
                            </div>
                            <div className="card-right">
                                <p className="service-description">{service.description}</p>
                                <div className="service-tags">
                                    {service.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="service-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="service-card-glow"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}