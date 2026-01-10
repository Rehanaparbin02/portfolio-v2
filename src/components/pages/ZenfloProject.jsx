import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ZenfloProject.css';
import zenImg1 from '../../assets/zenflow/zen01.png';
import zenImg2 from '../../assets/zenflow/zen02.png';
import zenImg3 from '../../assets/zenflow/zen03.png';
import mock01 from '../../assets/zenflow/zenmock01.png';
import mock02 from '../../assets/zenflow/zenmock02.png';
import mock03 from '../../assets/zenflow/zenmock03.png';
import mock04 from '../../assets/zenflow/zenmock04.png';
import mock05 from '../../assets/zenflow/zenmock05.png';
import mock06 from '../../assets/zenflow/zenmock06.png';
import mock07 from '../../assets/zenflow/zenmock07.png';
import mock08 from '../../assets/zenflow/zenmock08.png';

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
                        background: 'rgba(255, 204, 0, 0.2)',
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
            gsap.utils.toArray('.zen-challenge-solution').forEach((section) => {
                const cards = section.querySelectorAll('.zen-card');
                cards.forEach((card, i) => {
                    gsap.from(card, {
                        x: i % 2 === 0 ? -100 : 100,
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
            });

            // === FEATURES HORIZONTAL SCROLL ===
            const featuresSection = document.querySelector('.zen-features-scroll');
            const featuresHeader = document.querySelector('.zen-features-header');
            const featuresWrapper = document.querySelector('.zen-features-wrapper');

            if (featuresSection && featuresHeader && featuresWrapper) {
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
                gsap.utils.toArray('.zen-feature-card').forEach((card) => {
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
            // === TIMELINE ANIMATIONS ===
            // (Removed duplicate heading animation to prevent conflict with splitText loop)

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

            // === DEV BOXES ANIMATIONS ===
            gsap.utils.toArray('.zen-dev-box').forEach((box, i) => {
                gsap.from(box, {
                    scale: 0.7,
                    opacity: 0,
                    duration: 1,
                    ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: i * 0.15
                });
            });

            // === TECH CARDS ANIMATIONS ===
            gsap.utils.toArray('.zen-tech-card-v2').forEach((card, i) => {
                gsap.from(card, {
                    scale: 0,
                    opacity: 0,
                    rotation: 180,
                    duration: 1,
                    ease: 'back.out(2)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: i * 0.1
                });
            });

            // === LEARNING CARDS ANIMATIONS ===
            gsap.utils.toArray('.zen-learning-card').forEach((card, i) => {
                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: i * 0.12
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

            // === VISUAL DESIGN ANIMATIONS ===
            // (Removed duplicate heading animation to prevent conflict with splitText loop)

            gsap.utils.toArray('.zen-visual-item').forEach((item, i) => {
                gsap.from(item, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: (i % 2) * 0.2
                });
            });

            // === VISUAL STACK ROTATION ===
            const layers = gsap.utils.toArray('.zen-visual-layer');
            if (layers.length > 0) {
                const positions = [
                    { x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', zIndex: 3, rotate: 0 },
                    { x: -180, y: -40, scale: 0.8, opacity: 0.3, filter: 'blur(6px)', zIndex: 2, rotate: -10 },
                    { x: 180, y: 40, scale: 0.8, opacity: 0.3, filter: 'blur(6px)', zIndex: 1, rotate: 10 }
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
                {/* <div className="zen-nav-badge">CASE STUDY · 2025</div> */}
            </nav>

            {/* Hero Section */}
            <section className="zen-hero">
                <div className="zen-hero-container">
                    {/* <div className="zen-hero-badge">CASE STUDY 2025</div> */}
                    <div className="zen-hero-content">
                        <div className="zen-hero-left">
                            <div className="zen-hero-number">03</div>
                            <div className="zen-hero-subtitle">PROJECT</div>
                        </div>
                        <div className="zen-hero-center">
                            <h1 className="zen-hero-title">
                                <span className="zen-hero-title-line-1">ZENFLOW</span>
                                <span className="zen-hero-title-line-2">MICRO</span>
                                <span className="zen-hero-title-line-3">JOURNALING</span>
                            </h1>
                            {/* <div className="zen-hero-description">
                                A comprehensive mental wellness mobile application designed to help users track their emotional journey through intuitive journaling and mood tracking.
                            </div> */}
                        </div>
                        <div className="zen-hero-right">
                            <div className="zen-hero-meta">
                                <div className="zen-hero-meta-item">
                                    <span className="zen-meta-label">PLATFORM</span>
                                    <span className="zen-meta-value">Mobile</span>
                                </div>
                                <div className="zen-hero-meta-item">
                                    <span className="zen-meta-label">ROLE</span>
                                    <span className="zen-meta-value">Full-Stack</span>
                                </div>
                                <div className="zen-hero-meta-item">
                                    <span className="zen-meta-label">YEAR</span>
                                    <span className="zen-meta-value">2024</span>
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
                        {['React Native', 'Expo', 'Supabase', 'TypeScript', 'Reanimated', 'Expo Router', 'Gestures', 'Zustand'].map((tag, i) => (
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
                                <strong>Emotion-Based Categorization:</strong> Based on Plutchik's wheel of emotions, ZenFlow uses 6 distinct mood categories—Happy, Sad, Calm, Stressed, Anxious, Angry—each with a unique color identity that permeates the UI.
                            </p>
                            <div className="zen-overview-features-mini">
                                <div className="zen-mini-feature">
                                    <div className="zen-mini-icon">🎨</div>
                                    <div className="zen-mini-content">
                                        <h4>Color Psychology</h4>
                                        <p>Strategic color coding for emotional awareness.</p>
                                    </div>
                                </div>
                                <div className="zen-mini-feature">
                                    <div className="zen-mini-icon">🌊</div>
                                    <div className="zen-mini-content">
                                        <h4>Thought Trail</h4>
                                        <p>Vertical timeline with fluid scroll.</p>
                                    </div>
                                </div>
                            </div>
                            <p className="secondary-text">
                                Unlike standard lists, the <strong>Thought Trail</strong> allows users to explore their emotional history through a beautiful, animated vertical timeline. Integrated with Supabase and AsyncStorage, it offers a seamless offline-first experience with secure cloud backup.
                            </p>
                        </div>

                        <div className="zen-overview-visual-stack">
                            <div className="zen-visual-layer layer-1 zen-reveal-image">
                                <img src={zenImg1} alt="ZenFlow Screen 1" />
                            </div>
                            <div className="zen-visual-layer layer-2 zen-reveal-image">
                                <img src={zenImg2} alt="ZenFlow Screen 2" />
                            </div>
                            <div className="zen-visual-layer layer-3 zen-reveal-image">
                                <img src={zenImg3} alt="ZenFlow Screen 3" />
                            </div>
                            <div className="zen-visual-glow"></div>
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
                        <p>In a fast-paced world, many struggle to maintain a consistent journaling habit. Existing apps often suffer from cluttered interfaces, lack of personalization, and provide poor visual feedback on emotional patterns.</p>
                        <ul>
                            <li>Inconsistent tracking habits</li>
                            <li>Cluttered, overwhelming UIs</li>
                            <li>Difficulty identifying mood triggers</li>
                        </ul>
                    </div>

                    <div className="zen-card solution">
                        <div className="zen-card-header">
                            <span className="zen-card-tag">THE SOLUTION</span>
                            <div className="zen-card-number">02</div>
                        </div>
                        <h3>Mindful Design.</h3>
                        <p>ZenFlow solves this with a minimalist, neomorphic design that encourages reflection. By focusing on micro-interactions and Plutchik's color psychology, it turns journaling into a delightful, secure habit.</p>
                        <ul>
                            <li><strong>Visual Insights:</strong> 6 distinct mood categories.</li>
                            <li><strong>Thought Trail:</strong> Animated timeline visualization.</li>
                            <li><strong>Privacy First:</strong> Supabase RLS & Local persistence.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Key Features Scroll */}
            <section className="zen-features-scroll">
                <div className="zen-features-header">
                    <div className="zen-section-label">FEATURES</div>
                    <h2 className="zen-section-title zen-split-text">{splitText('Key Features')}</h2>
                    <p className="zen-features-intro">Experience a journaling app that feels alive and intuitive.</p>
                </div>
                <div className="zen-features-container">
                    <div className="zen-features-wrapper">
                        {[
                            { title: 'Thought Trail', text: 'An animated vertical timeline that allows for fluid exploration of past entries and emotional states.' },
                            { title: 'Mood Psychology', text: 'Integrated Plutchik wheel-based categorization with dynamic thematic color mapping across the entire UI.' },
                            { title: 'Neomorphic UI', text: 'A soft, tactile design system focused on depth and interactive elements that reduce cognitive load.' },
                            { title: 'Secure Persistence', text: 'Offline-first architecture with AsyncStorage and secure cloud sync using Supabase Row Level Security.' },
                            { title: 'Micro-Animations', text: '60fps interactions powered by Reanimated, providing immediate tactile feedback for every user action.' },
                            { title: 'Deep Insights', text: 'Visualized mood patterns and emotional trends through a clean, distraction-free analytical interface.' }
                        ].map((feature, i) => (
                            <div key={i} className="zen-feature-card">
                                <div className="zen-feature-pin"></div>
                                <div className="zen-feature-number">{String(i + 1).padStart(2, '0')}</div>
                                <h3 className="zen-feature-title">{feature.title}</h3>
                                <p className="zen-feature-text">{feature.text}</p>
                                <div className="zen-feature-accent"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Process / Timeline */}
            <section className="zen-timeline-section">
                <div className="zen-section-label">PROCESS</div>
                <h2 className="zen-section-title zen-split-text">{splitText('Design Process')}</h2>
                <div className="zen-timeline-container">
                    {[
                        { num: '01', title: 'Empathy Mapping', text: 'Understanding the emotional state of users and the need for a distraction-free journaling space.' },
                        { num: '02', title: 'Mood Architecture', text: 'Establishing a 6-tier mood system based on Plutchik\'s Wheel for balanced emotional tracking.' },
                        { num: '03', title: 'Neomorphic System', text: 'Exploratory visual design focused on soft shadows and tactile interaction to reduce cognitive load.' },
                        { num: '04', title: 'UX/UI Prototyping', text: 'Iterating on the "Thought Trail" timeline concept to ensure fluid exploration of past journal entries.' },
                        { num: '05', title: 'Privacy Strategy', text: 'Implementing Supabase Row Level Security and local encryption to ensure user data remains deeply personal.' },
                        { num: '06', title: 'Analytics Design', text: 'Developing clean, non-intrusive data visualizations for identifying long-term emotional patterns.' }
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

            {/* Visual Design */}
            <section className="zen-visual-section">
                <div className="zen-visual-header">
                    <div className="zen-section-label">VISUAL DESIGN</div>
                    <h2 className="zen-section-title zen-split-text">{splitText('Crafting the Experience')}</h2>
                    <p className="zen-visual-intro">A closer look at the interfaces and micro-interactions that define Zenflo.</p>
                </div>
                <div className="zen-visual-grid">
                    {[
                        mock01, mock02, mock03, mock04,
                        mock05, mock06, mock07, mock08
                    ].map((img, i) => (
                        <div key={i} className="zen-visual-item">
                            <div className="zen-visual-image-wrapper">
                                <img src={img} alt={`ZenFlo Interface ${i + 1}`} />
                                <div className="zen-visual-overlay">
                                    <div className="zen-overlay-content">
                                        <span className="zen-overlay-num">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="zen-overlay-tag">UI/UX</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Development & Technology */}
            <section className="zen-development">
                <div className="zen-dev-header">
                    <div className="zen-section-label">DEVELOPMENT</div>
                    <h2 className="zen-section-title zen-split-text">{splitText('Development Phase')}</h2>
                    <p className="zen-dev-intro">
                        Focused on high-performance mobile engineering and secure data synchronization.
                    </p>
                </div>

                <div className="zen-dev-content">
                    <div className="zen-dev-boxes">
                        <div className="zen-dev-box">
                            <div className="zen-dev-box-number">01</div>
                            <h4 className="zen-dev-box-title">Architecture Highlights</h4>
                            <ul className="zen-dev-box-list">
                                <li>Expo Router for file-based navigation</li>
                                <li>Supabase RLS for secure user-owned data</li>
                                <li>Offline-first sync with AsyncStorage</li>
                                <li>Reusable Neomorphic component library</li>
                            </ul>
                        </div>
                        <div className="zen-dev-box">
                            <div className="zen-dev-box-number">02</div>
                            <h4 className="zen-dev-box-title">Key Challenges Solved</h4>
                            <ul className="zen-dev-box-list">
                                <li>Refined pagination to prevent infinite loops</li>
                                <li>`useNativeDriver` for Android animation parity</li>
                                <li>Coordinated modal exit animations</li>
                                <li>Dynamic theme engine for mood states</li>
                            </ul>
                        </div>
                        <div className="zen-dev-box">
                            <div className="zen-dev-box-number">03</div>
                            <h4 className="zen-dev-box-title">Outcomes</h4>
                            <ul className="zen-dev-box-list">
                                <li>60fps buttery smooth UI interactions</li>
                                <li>85% User onboarding completion rate</li>
                                <li>Unified iOS and Android codebase</li>
                                <li>Scalable state management with Zustand</li>
                            </ul>
                        </div>
                    </div>

                    <div className="zen-tech-section">
                        <div className="zen-tech-header">
                            <div className="zen-section-label">TECHNOLOGY</div>
                            <h2 className="zen-section-title zen-split-text">{splitText('Technology Stack')}</h2>
                            <p className="zen-tech-intro">A modern, native-first stack optimized for the mobile experience.</p>
                        </div>
                        <div className="zen-tech-grid-v2">
                            {[
                                { name: 'React Native', category: 'Framework', color: '#61dafb' },
                                { name: 'Expo Router', category: 'Navigation', color: '#ffffff' },
                                { name: 'Supabase', category: 'Backend', color: '#3ecf8e' },
                                { name: 'TypeScript', category: 'Language', color: '#3178c6' },
                                { name: 'Reanimated', category: 'Animation', color: '#ff5252' },
                                { name: 'Zustand', category: 'State', color: '#ffffff' },
                                { name: 'Gestures', category: 'Interaction', color: '#ffffff' },
                                { name: 'AsyncStorage', category: 'Storage', color: '#4e9ad4' }
                            ].map((tech, i) => (
                                <div key={i} className="zen-tech-card-v2">
                                    <div className="zen-tech-glow" style={{ '--tech-color': tech.color }}></div>
                                    <div className="zen-tech-content">
                                        <div className="zen-tech-card-header">
                                            <div className="zen-tech-icon" style={{ backgroundColor: tech.color + '20', color: tech.color }}>
                                                {tech.name === 'React Native' ? 'RN' : tech.name.charAt(0)}
                                            </div>
                                            <div className="zen-tech-category">{tech.category}</div>
                                        </div>
                                        <div className="zen-tech-name">{tech.name}</div>
                                        <div className="zen-tech-bar" style={{ backgroundColor: tech.color }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="zen-tech-footer">
                            <div className="zen-tech-footer-item">
                                <span className="zen-tech-footer-label">PLATFORMS</span>
                                <span className="zen-tech-footer-value">iOS & Android</span>
                            </div>
                            <div className="zen-tech-footer-divider"></div>
                            <div className="zen-tech-footer-item">
                                <span className="zen-tech-footer-label">ARCHITECTURE</span>
                                <span className="zen-tech-footer-value">Offline-First</span>
                            </div>
                            <div className="zen-tech-footer-divider"></div>
                            <div className="zen-tech-footer-item">
                                <span className="zen-tech-footer-label">BACKEND</span>
                                <span className="zen-tech-footer-value">Supabase RLS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Future Roadmap */}
            <section className="zen-next-steps">
                <div className="zen-section-label">ROADMAP</div>
                <h2 className="zen-section-title zen-split-text">{splitText('Future Enhancements')}</h2>
                <div className="zen-next-steps-list">
                    {[
                        'AI-driven emotional pattern recognition and personalized journaling prompts',
                        'Social Connect feature for shared reflection and community support',
                        'Deep integration with Apple Health and Google Fit for holistic wellness data',
                        'Expanded statistics dashboard with monthly/yearly emotional heatmaps',
                        'Voice-to-text journaling with sentiment analysis for easier reflection'
                    ].map((step, i) => (
                        <div key={i} className="zen-next-step-item">
                            <span className="zen-next-step-indicator">{String(i + 1).padStart(2, '0')}</span>
                            <span className="zen-next-step-text">{step}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="zen-cta">
                <h2 className="zen-cta-title zen-split-text">{splitText('EXPLORE MORE')}</h2>
                <button className="zen-cta-button zen-magnetic-btn" onClick={() => navigate('/projects')}>
                    <span>VIEW ALL PROJECTS</span>
                </button>
            </section>

            <div className="zen-parallax-bg"></div>
        </div>
    );
}

export default ZenfloProject;
