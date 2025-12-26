import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './Work.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Work() {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);
    const ballRef = useRef(null);
    const bgTextRef = useRef(null);

    const services = [
        { number: "01", title: "Full Stack Development", description: "Building scalable and high-performance web applications.", tags: ["Next.js", "React", "Node.js"] },
        { number: "02", title: "UI/UX Design & Frontend", description: "Designing modern, responsive interfaces.", tags: ["Figma", "Tailwind", "Framer"] },
        { number: "03", title: "SaaS Platform Development", description: "Developing end-to-end SaaS solutions.", tags: ["Stripe", "SaaS", "Scalability"] },
        { number: "04", title: "API & System Architecture", description: "Designing maintainable APIs and database schemas.", tags: ["PostgreSQL", "Prisma", "REST"] },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Background Parallax
            gsap.to(bgTextRef.current, {
                xPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // 2. Path & Ball Animation (Linked)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cards-container",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                }
            });

            tl.fromTo(pathRef.current,
                { strokeDasharray: 2000, strokeDashoffset: 2000 },
                { strokeDashoffset: 0, ease: "none" }, 0
            )
                .to(ballRef.current, {
                    motionPath: {
                        path: pathRef.current,
                        align: pathRef.current,
                        alignOrigin: [0.5, 0.5]
                    },
                    ease: "none"
                }, 0);

            // 3. Card Reveals
            gsap.utils.toArray(".service-card").forEach((card) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 100,
                    scale: 0.95,
                    duration: 1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="work-section" id="work" ref={sectionRef}>
            <div className="parallax-bg" ref={bgTextRef}>SERVICES</div>

            <div className="work-hero">
                <span className="work-eyebrow">Expertise</span>
                <h2 className="work-title">Digital Solutions</h2>
            </div>

            <div className="cards-container">
                {/* Fixed SVG attributes to prevent oval stretching */}
                <svg className="curved-svg" viewBox="0 0 400 1200" preserveAspectRatio="xMidYMin meet">
                    <path
                        ref={pathRef}
                        d="M200 0C200 100 350 150 350 300C350 450 50 450 50 600C50 750 350 750 350 900C350 1050 200 1100 200 1200"
                        stroke="rgba(0,0,0,0.1)"
                        strokeWidth="2"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                    />
                    {/* The Circle */}
                    <circle ref={ballRef} r="10" fill="#000" className="moving-ball" />
                </svg>

                <div className="cards-list">
                    {services.map((service, index) => (
                        <div key={index} className={`service-card ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="service-card-inner">
                                <span className="service-number">{service.number}</span>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <div className="service-tags">
                                    {service.tags.map((tag, i) => <span key={i} className="service-tag">{tag}</span>)}
                                </div>
                                <div className="service-cta">
                                    <span>View Details</span>
                                    <span className="cta-arrow">→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}