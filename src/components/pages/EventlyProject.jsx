import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EventlyProject.css';

// Import images for Overview Stack
import event1 from '../../assets/evently/event (1).png';
import event2 from '../../assets/evently/event (2).png';
import event3 from '../../assets/evently/event (3).png';

// Import images for Gallery
import evently01 from '../../assets/evently/evently01.png';
// import evently02 from '../../assets/evently/evently02.png';
import evently03 from '../../assets/evently/evently03.png';
import evently04 from '../../assets/evently/evently04.png';
import evently05 from '../../assets/evently/evently05.png';
import evently06 from '../../assets/evently/evently06.png';
import evently07 from '../../assets/evently/evently07.png';
import evently08 from '../../assets/evently/evently08.png';

const eventlyGalleryImages = [
    evently01,
    // evently02,
    evently03,
    evently04,
    evently05,
    evently06,
    evently07,
    evently08
];

const mainImg = event1;

gsap.registerPlugin(ScrollTrigger);

const EventlyProject = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // === HERO ANIMATIONS ===
            gsap.from('.evently-nav-badge', {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.evently-hero-title span', {
                y: 150,
                opacity: 0,
                skewY: 5,
                stagger: 0.2,
                duration: 1.5,
                ease: 'expo.out',
                delay: 0.3
            });

            gsap.from('.evently-hero-description', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.8
            });

            gsap.from('.evently-hero-meta-item', {
                x: -30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                delay: 1
            });

            // === SPLIT TEXT ANIMATIONS ===
            gsap.utils.toArray('.evently-split-text').forEach((el) => {
                const words = el.querySelectorAll('.word');
                gsap.from(words, {
                    y: 100,
                    opacity: 0,
                    rotateX: -90,
                    stagger: 0.05,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%'
                    }
                });
            });

            // === STATS COUNTER ANIMATION ===
            gsap.utils.toArray('.stat-item').forEach((stat, i) => {
                gsap.from(stat, {
                    scale: 0,
                    opacity: 0,
                    rotation: -180,
                    duration: 1,
                    ease: 'back.out(2)',
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 85%'
                    },
                    delay: i * 0.1
                });
            });
            // Simple text replacement for stats for now as logic was specific to DoIt

            // === TEXT HIGHLIGHT ON SCROLL ===
            gsap.utils.toArray('.evently-highlight-word').forEach((word) => {
                gsap.fromTo(word,
                    {
                        background: 'transparent',
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    {
                        background: 'rgba(59, 130, 246, 0.2)', // Blue highlight
                        color: '#fff',
                        padding: '0.2em 0.4em',
                        borderRadius: '4px',
                        duration: 0.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: word,
                            start: 'top 90%',
                            end: 'bottom 10%',
                            scrub: true
                        }
                    }
                );
            });

            // === CHALLENGE & SOLUTION ANIMATIONS ===
            const challengeSection = document.querySelector('.evently-challenge-solution');
            if (challengeSection) {
                const cards = challengeSection.querySelectorAll('.evently-challenge-card');

                cards.forEach((card, i) => {
                    gsap.from(card, {
                        x: i === 0 ? -100 : 100,
                        opacity: 0,
                        duration: 1.2,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    });

                    const items = card.querySelectorAll('.evently-reveal-item-v2, .evently-highlight-item-v2');
                    if (items.length > 0) {
                        gsap.from(items, {
                            y: 20,
                            opacity: 0,
                            stagger: 0.1,
                            duration: 0.8,
                            delay: 0.4,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 85%'
                            }
                        });
                    }
                });
            }

            // === DEV BOXES ANIMATIONS ===
            gsap.utils.toArray('.evently-dev-box').forEach((box, i) => {
                gsap.from(box, {
                    scale: 0.7,
                    opacity: 0,
                    duration: 1,
                    ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 85%'
                    },
                    delay: i * 0.15
                });
            });

            // === TIMELINE ANIMATIONS ===
            gsap.from('.evently-timeline-section .evently-section-label, .evently-timeline-section .evently-section-title .word', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.evently-timeline-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });

            gsap.utils.toArray('.evently-timeline-entry').forEach((entry, i) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: entry,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });

                tl.from(entry, {
                    x: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                })
                    .from(entry.querySelector('.evently-timeline-dot'), {
                        scale: 0,
                        duration: 0.5,
                        ease: 'back.out(2)'
                    }, '-=0.6')
                    .from(entry.querySelector('.evently-timeline-line'), {
                        width: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    }, '-=0.4')
                    .from(entry.querySelectorAll('.evently-timeline-content > *'), {
                        y: 20,
                        opacity: 0,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: 'power2.out'
                    }, '-=0.3');
            });

            // === IMAGE REVEAL ANIMATIONS ===
            gsap.utils.toArray('.evently-reveal-image').forEach((img) => {
                gsap.from(img, {
                    scale: 1.5,
                    opacity: 0,
                    filter: 'blur(20px)',
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: img,
                        start: 'top 85%'
                    }
                });
            });

            // === TEXT REVEAL ===
            gsap.utils.toArray('.evently-reveal-text').forEach((text) => {
                gsap.from(text, {
                    clipPath: 'inset(100% 0 0 0)',
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: text,
                        start: 'top 85%'
                    }
                });
            });

            // === MAGNETIC BUTTONS ===
            const buttons = document.querySelectorAll('.evently-magnetic-btn');
            buttons.forEach(button => {
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    gsap.to(button, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                });

                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                });
            });

            // === PARALLAX BACKGROUND ===
            gsap.to('.evently-parallax-bg', {
                y: 300,
                scrollTrigger: {
                    trigger: '.evently-parallax-bg',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });

            // === FEATURES HORIZONTAL SCROLL ===
            const featuresSection = document.querySelector('.evently-features-scroll');
            const featuresWrapper = document.querySelector('.evently-features-wrapper');

            if (featuresSection && featuresWrapper) {
                const getScrollAmount = () => {
                    let wrapperWidth = featuresWrapper.scrollWidth;
                    return -(wrapperWidth - window.innerWidth);
                };

                const horizontalScroll = gsap.timeline({
                    scrollTrigger: {
                        trigger: featuresSection,
                        start: 'top top',
                        end: () => `+=${featuresWrapper.scrollWidth}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                horizontalScroll.to(featuresWrapper, {
                    x: getScrollAmount,
                    ease: 'none'
                });

                // Simple entrance animation for ALL cards
                gsap.utils.toArray('.evently-feature-card').forEach((card) => {
                    gsap.from(card, {
                        opacity: 0,
                        y: 30,
                        scale: 0.95,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: horizontalScroll,
                            start: 'left 90%',
                            toggleActions: 'play none none reverse',
                        }
                    });
                });
            }

            // === VISUAL STACK ROTATION ===
            const layers = gsap.utils.toArray('.evently-visual-layer');
            if (layers.length > 0) {
                const positions = [
                    { x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', zIndex: 3, rotate: 0 },
                    { x: -280, y: -50, scale: 0.8, opacity: 0.3, filter: 'blur(6px)', zIndex: 2, rotate: -5 },
                    { x: 280, y: 50, scale: 0.8, opacity: 0.3, filter: 'blur(6px)', zIndex: 1, rotate: 5 }
                ];

                let step = 0;
                const totalLayers = layers.length;

                const rotate = () => {
                    step++;
                    layers.forEach((layer, i) => {
                        const posIndex = (i + step) % totalLayers;
                        const pos = positions[posIndex];

                        gsap.to(layer, {
                            x: pos.x,
                            y: pos.y,
                            scale: pos.scale,
                            opacity: pos.opacity,
                            filter: pos.filter,
                            zIndex: pos.zIndex,
                            rotate: pos.rotate,
                            duration: 2,
                            ease: 'expo.inOut'
                        });
                    });
                };

                const rotationTimer = gsap.delayedCall(3.5, function cycle() {
                    rotate();
                    rotationTimer.restart(true);
                });
            }

            // === VISUAL DESIGN GRID ANIMATIONS ===
            gsap.utils.toArray('.evently-visual-item').forEach((item, i) => {
                gsap.from(item, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: (i % 4) * 0.1 // Stagger by column
                });
            });

            // === DEV BOXES ANIMATIONS ===
            gsap.utils.toArray('.evently-dev-box').forEach((box, i) => {
                gsap.from(box, {
                    scale: 0.7,
                    opacity: 0,
                    duration: 1,
                    ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 85%'
                    },
                    delay: i * 0.15
                });
            });

            // === TECH CARDS ANIMATIONS ===
            gsap.utils.toArray('.evently-tech-card').forEach((card, i) => {
                gsap.from(card, {
                    scale: 0,
                    opacity: 0,
                    rotation: 180,
                    duration: 1,
                    ease: 'back.out(2)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    },
                    delay: i * 0.1
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text) => {
        if (!text) return '';
        return text.split(' ').map((word, i) => (
            <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.3em' }}>{word}</span>
        ));
    };

    return (
        <div className="evently-case-study-container" ref={containerRef}>
            {/* Navigation */}
            <nav className="evently-nav">
                <button className="evently-nav-back-btn evently-magnetic-btn" onClick={() => navigate('/projects')}>
                    <span>← BACK</span>
                </button>
                {/* <div className="evently-nav-badge">CASE STUDY · 2026</div> */}
            </nav>

            {/* Hero Section */}
            <section className="evently-hero">
                <div className="evently-hero-container">
                    {/* <div className="evently-hero-badge">CASE STUDY 2026</div> */}
                    <div className="evently-hero-content">
                        <div className="evently-hero-left">
                            <div className="evently-hero-number">03</div>
                            <div className="evently-hero-subtitle">PROJECT</div>
                        </div>
                        <div className="evently-hero-center">
                            <h1 className="evently-hero-title">
                                <span className="evently-hero-title-line-1">EVENTLY</span>
                                <span className="evently-hero-title-line-2">PLANNING</span>
                                <span className="evently-hero-title-line-3">& ORGANIZING

                                </span>
                            </h1>
                            <div className="evently-hero-description">
                                A state-of-the-art, responsive web application designed to streamline the complexities of event planning, team coordination, and financial tracking.
                            </div>
                        </div>
                        <div className="evently-hero-right">
                            <div className="evently-hero-meta">
                                <div className="evently-hero-meta-item">
                                    <span className="evently-meta-label">PLATFORM</span>
                                    <span className="evently-meta-value">Web App</span>
                                </div>
                                <div className="evently-hero-meta-item">
                                    <span className="evently-meta-label">ROLE</span>
                                    <span className="evently-meta-value">Full-Stack</span>
                                </div>
                                <div className="evently-hero-meta-item">
                                    <span className="evently-meta-label">YEAR</span>
                                    <span className="evently-meta-value">2026</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="evently-hero-scroll-indicator">
                        <div className="evently-scroll-line"></div>
                        <span>SCROLL</span>
                    </div>
                </div>
                <div className="evently-hero-bg-gradient"></div>
            </section>

            {/* Summary */}
            <section className="evently-summary-full">
                <div className="evently-summary-content-new">
                    <div className="evently-summary-decorative-line"></div>
                    <h2 className="evently-summary-text-highlight">
                        <span className="evently-summary-line">
                            <span className="evently-highlight-word">Evently</span> solves fragmentation
                        </span>
                        <span className="evently-summary-line">
                            by unifying <span className="evently-highlight-word">workflows</span>,
                        </span>
                        <span className="evently-summary-line">
                            <span className="evently-highlight-word">finance</span>, and <span className="evently-highlight-word">personnel</span>
                        </span>
                        <span className="evently-summary-line">
                            into a single, cohesive
                        </span>
                        <span className="evently-summary-line">
                            operational interface.
                        </span>
                    </h2>
                    <div className="evently-summary-tags-wrapper">
                        {['Next.js 16', 'React 19', 'Tailwind CSS 4', 'TypeScript', 'Recharts', 'Framer Motion'].map((tag, i) => (
                            <span key={i} className="evently-summary-tag-item">{tag}</span>
                        ))}
                    </div>
                    <div className="evently-summary-gradient-orb"></div>
                </div>
            </section>

            {/* Stats */}
            <section className="evently-stats">
                <div className="evently-stat-item">
                    <div className="evently-stat-value">5+</div>
                    <div className="evently-stat-label">Core Modules</div>
                </div>
                <div className="evently-stat-item">
                    <div className="evently-stat-value">100%</div>
                    <div className="evently-stat-label">Type Safety</div>
                </div>
                <div className="evently-stat-item">
                    <div className="evently-stat-value">28</div>
                    <div className="evently-stat-label">Components</div>
                </div>
                <div className="evently-stat-item">
                    <div className="evently-stat-value">Active</div>
                    <div className="evently-stat-label">Project Status</div>
                </div>
            </section>

            {/* Overview */}
            <section className="evently-overview-v2">
                <div className="evently-overview-container-v2">
                    <div className="evently-overview-header-v2">
                        <div className="evently-section-label">OVERVIEW</div>
                        <h2 className="evently-overview-title-v2 evently-split-text">
                            {splitText('Operational Hub')} <br />
                            <span className="evently-text-accent">{splitText('Defined by Data.')}</span>
                        </h2>
                    </div>

                    <div className="evently-overview-grid-v2">
                        <div className="evently-overview-main-text">
                            <p className="evently-reveal-text">
                                Evently WebApp provides immediate access to active events and quick operational stats. Whether creating a small corporate meetup or a large-scale international conference, it offers the visibility needed for success.
                            </p>
                            <div className="evently-overview-features-mini">
                                <div className="evently-mini-feature">
                                    <div className="evently-mini-icon">📊</div>
                                    <div className="evently-mini-content">
                                        <h4>Analytics</h4>
                                        <p>Graphical breakdown of event performance metrics.</p>
                                    </div>
                                </div>
                                <div className="evently-mini-feature">
                                    <div className="evently-mini-icon">📅</div>
                                    <div className="evently-mini-content">
                                        <h4>Deadlines</h4>
                                        <p>Automated tracking of upcoming critical dates.</p>
                                    </div>
                                </div>
                            </div>
                            <p className="evently-reveal-text secondary-text">
                                Built with a "Frontend-First" modern stack including Next.js 16 and React 19, leveraging Server Components (RSC) for optimal performance and SEO.
                            </p>
                        </div>

                        <div className="evently-overview-visual-stack">
                            <div className="evently-visual-layer layer-1 evently-reveal-image">
                                <img src={event1} alt="Evently Dashboard" />
                            </div>
                            <div className="evently-visual-layer layer-2 evently-reveal-image">
                                <img src={event2} alt="Evently Analytics" />
                            </div>
                            <div className="evently-visual-layer layer-3 evently-reveal-image">
                                <img src={event3} alt="Evently Team Board" />
                            </div>
                            <div className="evently-visual-glow"></div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="evently-challenge-solution">
                <div className="evently-challenge-header-v2">
                    <div className="evently-section-label">STRATEGY</div>
                    <h2 className="evently-section-title evently-split-text">{splitText('Problem vs Solution')}</h2>
                </div>

                <div className="evently-challenge-content-v2">
                    <div className="evently-challenge-card challenge">
                        <div className="evently-card-header">
                            <span className="evently-card-tag">THE PROBLEM</span>
                            <div className="evently-card-number">01</div>
                        </div>
                        <h3>Fragmentation is the enemy.</h3>
                        <p>Managing events involves distinct workflows—planning, finance, personnel—that often live in disconnected spreadsheets and tools.</p>
                        <ul className="evently-challenge-list-v2">
                            <li className="evently-reveal-item-v2">Disconnected operational workflows</li>
                            <li className="evently-reveal-item-v2">Lack of real-time financial visibility</li>
                            <li className="evently-reveal-item-v2">Difficult team coordination</li>
                            <li className="evently-reveal-item-v2">Scattered data analysis</li>
                        </ul>
                    </div>

                    <div className="evently-challenge-card solution">
                        <div className="evently-card-header">
                            <span className="evently-card-tag green">THE SOLUTION</span>
                            <div className="evently-card-number">02</div>
                        </div>
                        <h3>Unified Control.</h3>
                        <p>Evently unifies these distinct workflows into a single, cohesive interface, providing complete operational visibility.</p>
                        <div className="evently-solution-highlights-v2">
                            <div className="evently-highlight-item-v2">
                                <span className="evently-highlight-icon">✓</span>
                                <span>Financial Tracking</span>
                            </div>
                            <div className="evently-highlight-item-v2">
                                <span className="evently-highlight-icon">✓</span>
                                <span>Team Stats</span>
                            </div>
                            <div className="evently-highlight-item-v2">
                                <span className="evently-highlight-icon">✓</span>
                                <span>Reporting</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Horizontal Scroll */}
            <section className="evently-features-scroll">
                <div className="evently-features-header">
                    <div className="evently-section-label">FEATURES</div>
                    <h2 className="evently-section-title evently-split-text">{splitText('Key Modules')}</h2>
                    <p className="evently-features-intro">Discover the powerful modules that make Evently the ultimate event management solution.</p>
                </div>
                <div className="evently-features-container">
                    <div className="evently-features-wrapper">
                        {[
                            { title: 'Dashboard & Analytics', text: 'The operational hub with real-time overview, event analytics graphs, and quick actions for common tasks.' },
                            { title: 'Event Management', text: 'A dedicated suite for examining and controlling event details, with status tracking and lifestyle stages.' },
                            { title: 'Financial Tracking', text: 'Robust tools for monitoring financial health, including revenue/expense visualization and transaction logs.' },
                            { title: 'Team Collaboration', text: 'Manage human resources effectively with a member directory and aggregate team statistics.' },
                            { title: 'Task Management', text: 'Granular control over deliverables with organized lists of pending, in-progress, and completed tasks.' },
                            { title: 'Reporting', text: 'Deep dives into data for post-event analysis, featuring custom sidebars and revenue charts.' }
                        ].map((feature, i) => (
                            <div key={i} className="evently-feature-card">
                                <div className="evently-feature-pin"></div>
                                <div className="evently-feature-number">{String(i + 1).padStart(2, '0')}</div>
                                <h3 className="evently-feature-title">{feature.title}</h3>
                                <p className="evently-feature-text">{feature.text}</p>
                                <div className="evently-feature-accent"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline (Design Process) */}
            <section className="evently-timeline-section">
                <div className="evently-section-label">PROCESS</div>
                <h2 className="evently-section-title evently-split-text">{splitText('Design Process')}</h2>
                <div className="evently-timeline-container">
                    {[
                        { num: '01', title: 'Research & Discovery', text: 'Analysis of event planning complexities and stakeholder needs to identify core operational friction points.' },
                        { num: '02', title: 'Information Architecture', text: 'Mapping out hierarchical data models for complex event structures, financial tracking, and team roles.' },
                        { num: '03', title: 'UX/UI Design', text: 'Developing an intuitive dashboard and modular control systems optimized for data-heavy operational management.' },
                        { num: '04', title: 'Visual Identity', text: 'Creating a clean, professional blue palette and data-driven interface inspired by modern enterprise standards.' },
                        { num: '05', title: 'Interactive Prototyping', text: 'Iterating on complex interaction patterns for analytics, real-time reporting, and collaborative team boards.' },
                        { num: '06', title: 'Testing & Refinement', text: 'Usability testing with event coordinators to optimize workflows and ensure high-performance at scale.' }
                    ].map((item, i) => (
                        <div key={i} className="evently-timeline-entry">
                            <div className="evently-timeline-line"></div>
                            <div className="evently-timeline-dot"></div>
                            <div className="evently-timeline-content">
                                <div className="evently-timeline-num">{item.num}</div>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Visual Design / Gallery */}
            <section className="evently-visual-section">
                <div className="evently-visual-header">
                    <div className="evently-section-label">INTERFACE</div>
                    <h2 className="evently-section-title evently-split-text">{splitText('Visual Design')}</h2>
                    <p className="evently-visual-intro">A glimpse into the modern, aesthetic interface of Evently.</p>
                </div>
                <div className="evently-visual-grid">
                    {eventlyGalleryImages.map((img, index) => (
                        <div key={index} className="evently-visual-item">
                            <img src={img} alt={`Evently Screen ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Development Phase */}
            <section className="evently-development">
                <div className="evently-dev-header">
                    <div className="evently-section-label">DEVELOPMENT</div>
                    <h2 className="evently-section-title evently-split-text">{splitText('Development Phase')}</h2>
                    <p className="evently-dev-intro">
                        A robust engineering approach focused on scalability, performance, and operational visibility.
                    </p>
                </div>

                <div className="evently-dev-content">
                    <div className="evently-dev-boxes">
                        <div className="evently-dev-box">
                            <div className="evently-dev-box-number">01</div>
                            <h4 className="evently-dev-box-title">Architecture Highlights</h4>
                            <ul className="evently-dev-box-list">
                                <li>Modular Next.js 16 App Router structure</li>
                                <li>Server Component (RSC) optimization for performance</li>
                                <li>Clean Architecture principles for data integrity</li>
                                <li>Responsive dashboard layouts with CSS Modules</li>
                            </ul>
                        </div>
                        <div className="evently-dev-box">
                            <div className="evently-dev-box-number">02</div>
                            <h4 className="evently-dev-box-title">Key Challenges Solved</h4>
                            <ul className="evently-dev-box-list">
                                <li>Real-time complex data visualization with Recharts</li>
                                <li>Unified financial and task management synchronization</li>
                                <li>High-performance reporting for high-volume stats</li>
                                <li>Dynamic team board with aggregate statistics</li>
                            </ul>
                        </div>
                        <div className="evently-dev-box">
                            <div className="evently-dev-box-number">03</div>
                            <h4 className="evently-dev-box-title">Outcomes</h4>
                            <ul className="evently-dev-box-list">
                                <li>50% faster event planning and coordination speed</li>
                                <li>100% type safety for complex financial computations</li>
                                <li>Scalable design suitable for international conferences</li>
                                <li>Production-ready operational interface architecture</li>
                            </ul>
                        </div>
                    </div>

                    <div className="evently-tech-section">
                        <div className="evently-tech-header">
                            <div className="evently-section-label">TECHNOLOGY</div>
                            <h2 className="evently-section-title evently-split-text">{splitText('Technology Stack')}</h2>
                            <p className="evently-tech-intro">Modern tools and frameworks powering the operational hub.</p>
                        </div>

                        <div className="evently-tech-grid">
                            {[
                                { name: 'Next.js 16', category: 'Framework', color: '#ffffff' },
                                { name: 'React 19', category: 'Library', color: '#61DAFB' },
                                { name: 'Tailwind 4', category: 'Styling', color: '#06B6D4' },
                                { name: 'TypeScript', category: 'Language', color: '#3178C6' },
                                { name: 'Recharts', category: 'Analytics', color: '#3178C6' },
                                { name: 'Framer Motion', category: 'Animation', color: '#E10098' },
                                { name: 'Lucide', category: 'Icons', color: '#ffffff' },
                                { name: 'PostCSS', category: 'Processing', color: '#DD3A0A' }
                            ].map((tech, i) => (
                                <div key={i} className="evently-tech-card">
                                    <div className="evently-tech-glow" style={{ '--tech-color': tech.color }}></div>
                                    <div className="evently-tech-content">
                                        <div className="evently-tech-card-header">
                                            <div className="evently-tech-icon" style={{ backgroundColor: tech.color + '20', color: tech.color }}>
                                                {tech.name === 'Next.js 16' ? 'NX' : tech.name.charAt(0)}
                                            </div>
                                            <div className="evently-tech-category">{tech.category}</div>
                                        </div>
                                        <div className="evently-tech-name">{tech.name}</div>
                                        <div className="evently-tech-bar" style={{ backgroundColor: tech.color }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="evently-tech-footer">
                            <div className="evently-tech-footer-item">
                                <span className="evently-tech-footer-label">PLATFORM</span>
                                <span className="evently-tech-footer-value">Responsive Web</span>
                            </div>
                            <div className="evently-tech-footer-divider"></div>
                            <div className="evently-tech-footer-item">
                                <span className="evently-tech-footer-label">ARCHITECTURE</span>
                                <span className="evently-tech-footer-value">App Router (RSC)</span>
                            </div>
                            <div className="evently-tech-footer-divider"></div>
                            <div className="evently-tech-footer-item">
                                <span className="evently-tech-footer-label">VISUALS</span>
                                <span className="evently-tech-footer-value">Recharts & Framer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default EventlyProject;
