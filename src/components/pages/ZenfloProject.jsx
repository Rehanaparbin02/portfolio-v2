import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ZenfloProject.css';

gsap.registerPlugin(ScrollTrigger);

const ZenfloProject = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // === HERO ANIMATIONS ===
            gsap.from('.zen-nav-badge', {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.zen-hero-title span', {
                y: 150,
                opacity: 0,
                skewY: 5,
                stagger: 0.2,
                duration: 1.5,
                ease: 'expo.out',
                delay: 0.3
            });

            gsap.from('.zen-hero-description', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.8
            });

            gsap.from('.zen-hero-meta-item', {
                x: -30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                delay: 1
            });

            // === SPLIT TEXT ANIMATIONS ===
            gsap.utils.toArray('.zen-split-text').forEach((el) => {
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
            gsap.utils.toArray('.zen-stat-item').forEach((stat, i) => {
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

            // === TEXT HIGHLIGHT ON SCROLL ===
            gsap.utils.toArray('.zen-highlight-word').forEach((word) => {
                gsap.fromTo(word,
                    {
                        background: 'transparent',
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    {
                        background: 'rgba(76, 175, 80, 0.2)',
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
            const challengeSection = document.querySelector('.zen-challenge-solution');
            if (challengeSection) {
                const cards = challengeSection.querySelectorAll('.zen-card');

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
                });
            }

            // === TIMELINE ANIMATIONS ===
            gsap.from('.zen-timeline-section .zen-section-label, .zen-timeline-section .zen-section-title .word', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.zen-timeline-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });

            gsap.utils.toArray('.zen-timeline-entry').forEach((entry, i) => {
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
                    .from(entry.querySelector('.zen-timeline-dot'), {
                        scale: 0,
                        duration: 0.5,
                        ease: 'back.out(2)'
                    }, '-=0.6')
                    .from(entry.querySelector('.zen-timeline-line'), {
                        width: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    }, '-=0.4')
                    .from(entry.querySelectorAll('.zen-timeline-content > *'), {
                        y: 20,
                        opacity: 0,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: 'power2.out'
                    }, '-=0.3');
            });

            // === MAGNETIC BUTTONS ===
            const buttons = document.querySelectorAll('.zen-magnetic-btn');
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

            // === TECH CARDS ANIMATIONS ===
            gsap.utils.toArray('.zen-tech-card').forEach((card, i) => {
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

            // === PARALLAX BACKGROUND ===
            gsap.to('.zen-parallax-bg', {
                y: 300,
                scrollTrigger: {
                    trigger: '.zen-parallax-bg',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
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
        <div className="zen-case-study-container" ref={containerRef}>
            {/* Navigation */}
            <nav className="zen-nav">
                <button className="zen-nav-back-btn zen-magnetic-btn" onClick={() => navigate('/projects')}>
                    <span>← BACK</span>
                </button>
                <div className="zen-nav-badge">CASE STUDY · 2025</div>
            </nav>

            {/* Hero Section */}
            <section className="zen-hero">
                <div className="zen-hero-container">
                    <div className="zen-hero-badge">CASE STUDY 2025</div>
                    <div className="zen-hero-content">
                        <div className="zen-hero-left">
                            <div className="zen-hero-number">03</div>
                            <div className="zen-hero-subtitle">PROJECT</div>
                        </div>
                        <div className="zen-hero-center">
                            <h1 className="zen-hero-title">
                                <span className="zen-hero-title-line-1">ZENFLOW</span>
                                <span className="zen-hero-title-line-2">JOURNALING</span>
                                <span className="zen-hero-title-line-3">REIMAGINED</span>
                            </h1>
                            <div className="zen-hero-description">
                                A comprehensive mental wellness mobile application designed to help users track their emotional journey through intuitive journaling and mood tracking.
                            </div>
                        </div>
                        <div className="zen-hero-right">
                            <div className="zen-hero-meta">
                                <div className="zen-hero-meta-item">
                                    <span className="zen-meta-label">PLATFORM</span>
                                    <span className="zen-meta-value">iOS & Android</span>
                                </div>
                                <div className="zen-hero-meta-item">
                                    <span className="zen-meta-label">ROLE</span>
                                    <span className="zen-meta-value">Full-Stack</span>
                                </div>
                                <div className="zen-hero-meta-item">
                                    <span className="zen-meta-label">YEAR</span>
                                    <span className="zen-meta-value">2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="zen-hero-scroll-indicator">
                        <div className="zen-scroll-line"></div>
                        <span>SCROLL</span>
                    </div>
                </div>
                <div className="zen-hero-bg-gradient"></div>
            </section>

            {/* Summary */}
            <section className="zen-summary-full">
                <div className="zen-summary-content-new">
                    <div className="zen-summary-decorative-line"></div>
                    <h2 className="zen-summary-text-highlight">
                        <span className="zen-summary-line">
                            <span className="zen-highlight-word">ZENFLOW</span> transforms how
                        </span>
                        <span className="zen-summary-line">
                            you understand your <span className="zen-highlight-word">emotions</span>
                        </span>
                        <span className="zen-summary-line">
                            through <span className="zen-highlight-word">intuitive</span> journaling
                        </span>
                        <span className="zen-summary-line">
                            in a <span className="zen-highlight-word">distraction-free</span> environment.
                        </span>
                    </h2>
                    <div className="zen-summary-tags-wrapper">
                        {['React Native', 'Expo', 'Supabase', 'TypeScript', 'Reanimated', 'Figma', 'Gestures'].map((tag, i) => (
                            <span key={i} className="zen-summary-tag-item">{tag}</span>
                        ))}
                    </div>
                    <div className="zen-summary-gradient-orb"></div>
                </div>
            </section>

            {/* Stats */}
            <section className="zen-stats">
                <div className="zen-stat-item">
                    <div className="zen-stat-value">6</div>
                    <div className="zen-stat-label">Mood Categories</div>
                </div>
                <div className="zen-stat-item">
                    <div className="zen-stat-value">60fps</div>
                    <div className="zen-stat-label">Smooth Animations</div>
                </div>
                <div className="zen-stat-item">
                    <div className="zen-stat-value">100%</div>
                    <div className="zen-stat-label">Secure & Private</div>
                </div>
                <div className="zen-stat-item">
                    <div className="zen-stat-value">Cross</div>
                    <div className="zen-stat-label">Platform Experience</div>
                </div>
            </section>

            {/* Overview / Smart Features */}
            <section className="zen-overview-v2">
                <div className="zen-overview-container-v2">
                    <div className="zen-overview-header-v2">
                        <div className="zen-section-label">OVERVIEW</div>
                        <h2 className="zen-overview-title-v2 zen-split-text">
                            {splitText('Visual Intelligence')} <br />
                            <span className="zen-text-accent">{splitText('Mindful Design.')}</span>
                        </h2>
                    </div>

                    <div className="zen-overview-grid-v2">
                        <div className="zen-overview-main-text">
                            <p>
                                <strong>Emotion-Based Categorization:</strong> Happy, Sad, Calm, Stressed, Anxious, Angry. Each mood has a unique color identity that permeates the UI when selected.
                            </p>
                            <div className="zen-overview-features-mini">
                                <div className="zen-mini-feature">
                                    <div className="zen-mini-icon">🎨</div>
                                    <div className="zen-mini-content">
                                        <h4>Color Logic</h4>
                                        <p>Dynamic UI based on mood.</p>
                                    </div>
                                </div>
                                <div className="zen-mini-feature">
                                    <div className="zen-mini-icon">🌊</div>
                                    <div className="zen-mini-content">
                                        <h4>Thought Trail</h4>
                                        <p>Fluid timeline scroll.</p>
                                    </div>
                                </div>
                            </div>
                            <p className="secondary-text">
                                Unlike standard lists, the Thought Trail is an animated vertical timeline that allows users to scroll through their emotional history with fluid gestures. Built with Supabase, ZenFlow ensures your private thoughts remain private.
                            </p>
                        </div>

                        <div className="zen-visual-stack-placeholder">
                            ZENFLOW APP INTERFACE
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="zen-challenge-solution">
                <div className="zen-challenge-header-v2">
                    <div className="zen-section-label">STRATEGY</div>
                    <h2 className="zen-section-title zen-split-text">{splitText('Problem vs Solution')}</h2>
                </div>

                <div className="zen-challenge-content-v2">
                    <div className="zen-card challenge">
                        <div className="zen-card-header">
                            <span className="zen-card-tag">THE PROBLEM</span>
                            <div className="zen-card-number">01</div>
                        </div>
                        <h3>The Disconnect.</h3>
                        <p>In a fast-paced world, many struggle to maintain a consistent journaling habit. Existing apps are often cluttered, overwhelming, or lack meaningful insights.</p>
                        <ul>
                            <li>Inconsistent tracking habits</li>
                            <li>Complex, cluttered interfaces</li>
                            <li>Lack of visual feedback</li>
                        </ul>
                    </div>

                    <div className="zen-card solution">
                        <div className="zen-card-header">
                            <span className="zen-card-tag">THE SOLUTION</span>
                            <div className="zen-card-number">02</div>
                        </div>
                        <h3>Mindful Design.</h3>
                        <p>ZenFlow solves this with a minimalist, neomorphic design that encourages reflection. By focusing on micro-interactions and color psychology, it turns journaling into a delightful habit.</p>
                        <ul>
                            <li><strong>Emotion-Based:</strong> 6 distinct mood categories.</li>
                            <li><strong>Thought Trail:</strong> Beautiful timeline visualization.</li>
                            <li><strong>Visual Insights:</strong> Pattern recognition.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Development Timeline */}
            <section className="zen-timeline-section">
                <div className="zen-section-label">PROCESS</div>
                <h2 className="zen-section-title zen-split-text">{splitText('Development Journey')}</h2>
                <div className="zen-timeline-container">
                    {[
                        { num: '01', title: 'Research & Personas', text: 'Analyzed 15+ apps and created personas to understand pain points like complex onboarding and lack of engagement.' },
                        { num: '02', title: 'UX & Wireframing', text: 'Designed low-fidelity wireframes focusing on a clutter-free "Neomorphic" aesthetic with soft shadows.' },
                        { num: '03', title: 'System Architecture', text: 'Set up Supabase for backend, tailored React Native Expo environment, and established a type-safe TypeScript codebase.' },
                        { num: '04', title: 'UI Implementation', text: 'Built the component library with reusable "Neomorphic Cards" and "Emotion Pills". Implemented color systems.' },
                        { num: '05', title: 'Animation', text: 'Integrated React Native Reanimated for 60fps gesture-based animations including the "Thought Trail".' },
                        { num: '06', title: 'Optimization', text: 'Fixed pagination bugs, optimized rendering with React.memo, and refined haptic feedback.' }
                    ].map((item, i) => (
                        <div key={i} className="zen-timeline-entry">
                            <div className="zen-timeline-line"></div>
                            <div className="zen-timeline-dot"></div>
                            <div className="zen-timeline-content">
                                <div className="zen-timeline-num">{item.num}</div>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Stack Grid */}
            <section className="zen-overview-v2">
                <div className="zen-overview-header-v2">
                    <div className="zen-section-label">TECHNOLOGY</div>
                    <h2 className="zen-section-title zen-split-text">{splitText('Tech Stack')}</h2>
                </div>
                <div className="zen-tech-grid">
                    {[
                        { name: 'React Native', cat: 'Framework', color: '#61dafb' },
                        { name: 'Expo', cat: 'Platform', color: '#ffffff' },
                        { name: 'Supabase', cat: 'Backend', color: '#3ecf8e' },
                        { name: 'TypeScript', cat: 'Language', color: '#3178c6' },
                        { name: 'Reanimated', cat: 'Animation', color: '#ff5252' },
                        { name: 'Zustand', cat: 'State', color: '#777' },
                    ].map((tech, i) => (
                        <div key={i} className="zen-tech-card">
                            <div className="zen-tech-category">{tech.cat}</div>
                            <div className="zen-tech-name">{tech.name}</div>
                            <div className="zen-tech-bar" style={{ color: tech.color }}></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="zen-cta">
                <h2 className="zen-hero-title zen-split-text" style={{ fontSize: '3rem', marginBottom: '2rem' }}>{splitText('READY TO REFLECT?')}</h2>
                <button className="zen-cta-button zen-magnetic-btn" onClick={() => navigate('/projects')}>
                    <span>VIEW ALL PROJECTS</span>
                </button>
            </section>

            <div className="zen-parallax-bg"></div>
        </div>
    );
}

export default ZenfloProject;
