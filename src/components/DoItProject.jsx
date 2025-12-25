import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import './DoItProject.css';

gsap.registerPlugin(ScrollTrigger);

const DoItProject = () => {
    const containerRef = useRef(null);
    const heroImageRef = useRef(null);
    const heroTitleRef = useRef(null);
    const techStackRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Hero Entrance
            tl.to(".doit-hero-image", {
                scale: 1,
                duration: 1.8,
                ease: "power2.inOut"
            })
                .from(".doit-hero-title .char", {
                    y: 200,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: "power4.out"
                }, "-=1.2")
                .to(".doit-hero-subtitle", {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5");

            // Hero Mouse Parallax
            const heroSection = document.querySelector('.doit-hero');
            if (heroSection) {
                heroSection.addEventListener('mousemove', (e) => {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;
                    const xPos = (clientX / innerWidth - 0.5) * 20;
                    const yPos = (clientY / innerHeight - 0.5) * 20;

                    gsap.to(".doit-hero-content", {
                        x: xPos,
                        y: yPos,
                        duration: 1,
                        ease: "power2.out"
                    });
                    gsap.to(heroImageRef.current, {
                        scale: 1.05,
                        x: -xPos * 0.5,
                        y: -yPos * 0.5,
                        duration: 1.2,
                        ease: "power2.out"
                    });
                });
            }

            // Tech Stack Spotlight Effect
            const techSection = techStackRef.current;
            if (techSection) {
                techSection.addEventListener('mousemove', (e) => {
                    const rect = techSection.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    techSection.style.setProperty('--mouse-x', `${x}px`);
                    techSection.style.setProperty('--mouse-y', `${y}px`);
                });
            }

            // Hero Scroll Parallax
            gsap.to(heroImageRef.current, {
                y: 200,
                ease: "none",
                scrollTrigger: {
                    trigger: ".doit-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // 2. Section Titles Reveal
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.to(title, {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // 3. Text Reveal (Lines)
            gsap.utils.toArray('.doit-text h3, .doit-text p').forEach(el => {
                gsap.from(el, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // 4. Details Stagger
            gsap.to('.doit-detail-item', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.doit-details',
                    start: "top 80%"
                }
            });


            // 5. Feature Cards 3D Flip In
            gsap.utils.toArray('.feature-card').forEach((card, i) => {
                gsap.to(card, {
                    opacity: 1,
                    transform: "translateY(0) rotateX(0)",
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: ".features-grid", // Trigger on the grid, not individual
                        start: "top 75%",
                    }
                });
            });

            // 6. Tech Stack reveal with card tilt
            const techCards = gsap.utils.toArray('.tech-column');
            techCards.forEach((card, i) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".doit-tech-stack",
                        start: "top 70%"
                    }
                });
            });


            // 7. Timeline Drawing Animation
            const timelineLine = document.querySelector('.timeline-line-active');
            gsap.to(timelineLine, {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: ".timeline",
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: 1
                }
            });

            gsap.utils.toArray('.timeline-item').forEach((item, i) => {
                gsap.to(item, {
                    opacity: 1,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 70%",
                        toggleActions: "play reverse play reverse"
                    }
                });
            });

            // 8. Impact Counts
            gsap.utils.toArray('.impact-stat').forEach((stat) => {
                const numEl = stat.querySelector('.number');
                const rawValue = numEl.innerText;
                const value = parseInt(rawValue.replace(/,/g, '').replace('+', ''));
                const isPlus = rawValue.includes('+');

                gsap.from(stat, {
                    scale: 0.5,
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: '.impact-grid',
                        start: "top 80%"
                    }
                });

                ScrollTrigger.create({
                    trigger: stat,
                    start: "top 85%",
                    once: true,
                    onEnter: () => {
                        let proxy = { val: 0 };
                        gsap.to(proxy, {
                            val: value,
                            duration: 2,
                            ease: "power2.out",
                            onUpdate: () => {
                                numEl.innerText = Math.floor(proxy.val).toLocaleString() + (isPlus ? '+' : isPlus === '%' ? '%' : '');
                            }
                        });
                    }
                });
            });

            // 9. Gallery Image Reveal
            gsap.utils.toArray('.gallery-image-wrapper').forEach(wrapper => {
                const overlay = wrapper.querySelector('.gallery-overlay');
                const img = wrapper.querySelector('img');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top 75%"
                    }
                });

                tl.to(overlay, {
                    scaleY: 0,
                    transformOrigin: "top",
                    duration: 1,
                    ease: "power3.inOut"
                })
                    .from(img, {
                        scale: 1.2,
                        duration: 1.5,
                        ease: "power2.out"
                    }, "-=1");
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text) => {
        return text.split("").map((char, i) => (
            <span key={i} className="char" style={{ display: 'inline-block' }}>
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    return (
        <div className="doit-project-container" ref={containerRef}>
            <section className="doit-hero">
                <div className="doit-hero-content">
                    <h1 className="doit-hero-title" ref={heroTitleRef}>
                        {splitText("DO-IT")}
                    </h1>
                    <p className="doit-hero-subtitle">
                        A Task Management Revolution
                    </p>
                </div>
                <div className="doit-hero-image-wrapper">
                    <img
                        ref={heroImageRef}
                        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
                        alt="DO-IT App Hero"
                        className="doit-hero-image"
                    />
                </div>
            </section>

            <section className="doit-content">
                <div className="doit-section doit-details">
                    <div className="doit-detail-item">
                        <span className="label">Role</span>
                        <span className="value">Solo Developer</span>
                    </div>
                    <div className="doit-detail-item">
                        <span className="label">Timeline</span>
                        <span className="value">8 Weeks (Agile)</span>
                    </div>
                    <div className="doit-detail-item">
                        <span className="label">Stack</span>
                        <span className="value">React Native, Expo, Supabase</span>
                    </div>
                </div>

                <div className="doit-section doit-overview">
                    <div className="doit-label">The Concept</div>
                    <div className="doit-text">
                        <h3>The Story Behind the App</h3>
                        <p>
                            In a world where productivity apps multiplied faster than the tasks they promised to organize, professionals and students found themselves trapped in digital chaos. The promise of productivity had become a burden.
                        </p>
                        <p>
                            DO-IT emerged from a simple realization: productivity tools should remove friction, not create it. The vision was clear—build a single, native mobile experience that could handle everything from quick notes to complex project management, without forcing users through unnecessary gates.
                        </p>
                        <h3>The Challenge</h3>
                        <p>
                            **Barrier to Entry:** Every app demanded an account before revealing its value.<br />
                            **Fragmented Experience:** Notes lived in one app, tasks in another.<br />
                            **Mobile-First Gaps:** Most apps were desktop tools squeezed into mobile screens.<br />
                        </p>
                    </div>
                </div>

                <div className="doit-section doit-solutions">
                    <h2 className="section-title">The Solution Takes Shape</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h4>Frictionless Beginning</h4>
                            <p>No splash screens, no sign-ups. The app opens to full functionality immediately. Guest mode is the real experience.</p>
                        </div>
                        <div className="feature-card">
                            <h4>Unified Intelligence</h4>
                            <p>Notes, Spaces, and Pomodoro timers live together. One app, one interface, one source of truth.</p>
                        </div>
                        <div className="feature-card">
                            <h4>Native Speed</h4>
                            <p>Built with React Native & Expo for buttery smooth Reanimated transitions and Native performance.</p>
                        </div>
                        <div className="feature-card">
                            <h4>Offline-First</h4>
                            <p>Local-first architecture. Every action writes to storage instantly and syncs to Supabase in the background.</p>
                        </div>
                        <div className="feature-card">
                            <h4>Instant Access</h4>
                            <p>Android home screen widgets enable one-tap note creation and deep linking.</p>
                        </div>
                        <div className="feature-card">
                            <h4>Privacy by Design</h4>
                            <p>Guest sessions are isolated. Data stays local until you choose to sync.</p>
                        </div>
                    </div>
                </div>

                <div className="doit-section doit-tech-stack" ref={techStackRef}>
                    <h2 className="section-title">Technical Foundation</h2>
                    <div className="tech-content">
                        <div className="tech-column">
                            <div className="tech-column-header">
                                <span className="tech-icon">⚡</span>
                                <h3>Frontend</h3>
                            </div>
                            <div className="tech-items-grid">
                                <div className="tech-chip">React Native 0.81</div>
                                <div className="tech-chip">Expo SDK 54</div>
                                <div className="tech-chip">React Navigation</div>
                                <div className="tech-chip">Zod + Hook Form</div>
                                <div className="tech-chip">Reanimated</div>
                                <div className="tech-chip">FlashList</div>
                            </div>
                        </div>
                        <div className="tech-column">
                            <div className="tech-column-header">
                                <span className="tech-icon">🔒</span>
                                <h3>Backend</h3>
                            </div>
                            <div className="tech-items-grid">
                                <div className="tech-chip">Supabase</div>
                                <div className="tech-chip">PostgreSQL</div>
                                <div className="tech-chip">Edge Functions</div>
                                <div className="tech-chip">Row Level Security</div>
                                <div className="tech-chip">Realtime Sync</div>
                            </div>
                        </div>
                        <div className="tech-column">
                            <div className="tech-column-header">
                                <span className="tech-icon">🏗️</span>
                                <h3>Architecture</h3>
                            </div>
                            <div className="tech-items-grid">
                                <div className="tech-chip">Offline-First</div>
                                <div className="tech-chip">Optimistic UI</div>
                                <div className="tech-chip">Custom Contexts</div>
                                <div className="tech-chip">Deep Linking</div>
                                <div className="tech-chip">Widgets</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="doit-section doit-design-journey">
                    <h2 className="section-title">The Design Journey</h2>
                    <div className="timeline">
                        <div className="timeline-line-active"></div>
                        <div className="timeline-item">
                            <span className="timeline-dot"></span>
                            <div className="timeline-content">
                                <h4>Research & Discovery</h4>
                                <p>Studied how people use productivity apps. Identified personas: the quick capturer, the project organizer, and the focused worker.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <span className="timeline-dot"></span>
                            <div className="timeline-content">
                                <h4>Information Architecture</h4>
                                <p>Focused on progressive disclosure. Navigation centers around a home hub where Spaces live and quick actions float within reach.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <span className="timeline-dot"></span>
                            <div className="timeline-content">
                                <h4>Wireframing & Prototyping</h4>
                                <p>Explored gesture patterns. High-fidelity prototypes in Figma tested micro-animations and state transitions.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <span className="timeline-dot"></span>
                            <div className="timeline-content">
                                <h4>Visual Language</h4>
                                <p>Dark-first theme (#050505) with Green accents (#22C55E) for energy and Blue tones (#3B82F6) for navigation.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="doit-section doit-impact">
                    <h2 className="section-title">Impact & Results</h2>
                    <div className="impact-grid">
                        <div className="impact-stat">
                            <span className="number">8,500+</span>
                            <span className="desc">Lines of Code</span>
                        </div>
                        <div className="impact-stat">
                            <span className="number">18</span>
                            <span className="desc">Screens</span>
                        </div>
                        <div className="impact-stat">
                            <span className="number">80%</span>
                            <span className="desc">Faster Load Times</span>
                        </div>
                        <div className="impact-stat">
                            <span className="number">15</span>
                            <span className="desc">Beta Testers</span>
                        </div>
                    </div>
                </div>

                <div className="doit-section doit-gallery">
                    <div className="doit-label">Screenshots</div>
                    <div className="gallery-image-wrapper">
                        <div className="gallery-overlay"></div>
                        <img src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop" alt="Interface" />
                        <p className="caption">Smart Workspace Organization with native gesture handling</p>
                    </div>
                    <div className="gallery-image-wrapper">
                        <div className="gallery-overlay"></div>
                        <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop" alt="Mobile Code" />
                        <p className="caption">Built for speed: Virtualized lists handling thousands of items</p>
                    </div>
                </div>

                <div className="doit-section doit-lessons">
                    <div className="doit-label">Key Takeaways</div>
                    <div className="doit-text">
                        <h3>Lessons Learned</h3>
                        <blockquote>
                            "Guest Mode Beats Forced Sign-Up. Letting users experience full functionality without commitment transformed 'maybe later' into engaged sessions."
                        </blockquote>
                        <p>
                            <strong>Offline-First Simplifies Everything:</strong> Writing to local storage first eliminated most network edge cases.<br />
                            <strong>Speed Is Part of the Experience:</strong> Virtualized lists and memoization made screens feel instant.<br />
                            <strong>Behavior Trumps Requests:</strong> Analytics revealed users valued quick access widgets more than complex organization.
                        </p>
                    </div>
                </div>

                <div className="doit-section doit-next" onClick={() => navigate('/projects')}>
                    <h2>Back to</h2>
                    <p>All Projects</p>
                </div>
            </section>
        </div>
    );
};

export default DoItProject;
