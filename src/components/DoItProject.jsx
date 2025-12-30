import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import koaMockup from '../assets/koa-mockup.png';
import './DoItProject.css';

gsap.registerPlugin(ScrollTrigger);

const DoItProject = () => {
    const componentRef = useRef(null);
    const heroTextRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // --- HERO ANIMATION ---
            // Use .from() for safer initialization (content visible if JS fails, hidden instantly if JS runs)
            tl.from('.hero-visual', {
                autoAlpha: 0,
                scale: 0.2,
                rotationX: 20,
                duration: 2,
                ease: "power3.out"
            })
                .to('.hero-title-filled', {
                    width: "100%",
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "-=1.5")
                .from('.hero-meta span', {
                    y: 20,
                    autoAlpha: 0,
                    stagger: 0.1,
                    duration: 0.8
                }, "-=1");

            // 3. Hero Scroll Effect (Parallax & Fade)
            gsap.to('.hero-title-container', {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.doit-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });

            gsap.to('.hero-visual', {
                y: 100,
                scale: 0.8,
                scrollTrigger: {
                    trigger: '.doit-hero',
                    start: 'top top',
                    end: 'bottom 20%',
                    scrub: 1
                }
            });


            // --- HORIZONTAL SCROLL SECTION (PROCESS) ---
            const slides = gsap.utils.toArray('.h-slide');

            if (slides.length > 0) {
                const totalMove = 100 * (slides.length - 1);

                gsap.to(slides, {
                    xPercent: -totalMove,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".h-scroll-wrapper",
                        pin: true,
                        scrub: 1,
                        start: "top top",
                        end: "+=" + (slides.length * 100) + "%",
                    }
                });
            }


            // --- CONTENT REVEALS ---
            gsap.utils.toArray('.reveal-text, .bento-item, .reflection-card, .visual-element').forEach(el => {
                gsap.from(el, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // --- STATS COUNT UP ---
            gsap.utils.toArray('.stat-item').forEach(stat => {
                gsap.from(stat, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: '.stats-grid',
                        start: 'top 85%'
                    }
                });
            });

            // --- TECH STACK HOVER EFFECT ---
            const techSection = document.querySelector('.tech-section');
            if (techSection) {
                techSection.addEventListener('mousemove', (e) => {
                    const x = (e.clientX / window.innerWidth - 0.5) * 20;
                    const y = (e.clientY / window.innerHeight - 0.5) * 20;
                    gsap.to('.tech-grid', {
                        x: x,
                        y: y,
                        duration: 1,
                        ease: 'power2.out'
                    });
                });
            }

        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="doit-wrapper" ref={componentRef}>
            {/* Ambient Background Elements */}
            <div className="floater f-1"></div>
            <div className="floater f-2"></div>

            <nav className="doit-nav">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/projects'); }} className="nav-back">
                    <div className="nav-indicator">←</div>
                    <span>Back to Portfolio</span>
                </a>
                <div className="nav-logo" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>DO-IT.APP</div>
            </nav>

            <section className="doit-hero">
                <div className="hero-visual">
                    <img src={koaMockup} alt="DO-IT App Mockup" />
                </div>

                <div className="hero-title-container">
                    <h1 className="hero-title" ref={heroTextRef}>
                        DO-IT
                        <span className="hero-title-filled">DO-IT</span>
                    </h1>
                    <div className="hero-meta">
                        <span>IOS / ANDROID</span>
                        <span>•</span>
                        <span>PRODUCTIVITY</span>
                        <span>•</span>
                        <span>2024</span>
                    </div>
                </div>

                <div className="scroll-prompt">SCROLL TO DISCOVER</div>
            </section>

            <div className="content-block">
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-value">8 Weeks</span>
                        <span className="stat-label">Development Time</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">8.5k+</span>
                        <span className="stat-label">Lines of Code</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">18</span>
                        <span className="stat-label">Screens</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">Zero</span>
                        <span className="stat-label">Friction</span>
                    </div>
                </div>

                <div className="story-layout">
                    <h2 className="story-heading reveal-text">
                        Overview
                    </h2>
                    <div className="story-text reveal-text">
                        <p>
                            DO-IT is a <span style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>full-stack, cross-platform productivity application</span> built with React Native and Expo. It delivers a comprehensive task management experience with a powerful offline-first architecture.
                        </p>
                        <p>
                            Featuring an innovative guest mode, custom spaces, rich media attachments, and integrated productivity tools like Pomodoro timers—it consolidates scattered workflows into one calm, intelligent interface.
                        </p>
                    </div>
                </div>

                <div className="story-layout" style={{ marginTop: '-5vh' }}>
                    <h2 className="story-heading reveal-text">
                        The Challenge
                    </h2>
                    <div className="story-text reveal-text">
                        <p>
                            Modern professionals struggle with fragmented tools. Notes live in one app, tasks in another, and timers in a third. Existing solutions often enforce mandatory sign-ups, creating barriers to entry.
                        </p>
                        <p>
                            The goal was to build a <span style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>unified, native mobile experience</span> that organizes thoughts and tasks efficiently while respecting privacy and offering immediate value through friction-free onboarding.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- KEY FEATURES (BENTO GRID) --- */}
            <div className="content-block">
                <span className="section-label">KEY FEATURES</span>
                <h2 className="story-heading reveal-text" style={{ marginBottom: '4rem' }}>
                    INTELLIGENT DESIGN
                </h2>

                <div className="bento-grid">
                    <div className="bento-item large">
                        <div className="bento-icon">🎭</div>
                        <h3>Frictionless Guest Mode</h3>
                        <p>Start instantly without an account. Full functionality with local storage, isolated sessions, and seamless migration to authenticated accounts whenever you're ready.</p>
                    </div>
                    <div className="bento-item">
                        <div className="bento-icon">📂</div>
                        <h3>Smart Workspaces</h3>
                        <p>Organize notes into custom Spaces. Dedicated contexts keep your work separated from personal projects.</p>
                    </div>
                    <div className="bento-item">
                        <div className="bento-icon">⚡</div>
                        <h3>Native Speed</h3>
                        <p>Built with React Native Reanimated for 60fps gesture-driven interactions that feel magical.</p>
                    </div>
                    <div className="bento-item large">
                        <div className="bento-icon">📡</div>
                        <h3>Offline-First Architecture</h3>
                        <p>Full functionality without internet. Changes sync automatically to Supabase when connectivity returns, with conflict resolution and optimistic UI updates.</p>
                    </div>
                    <div className="bento-item">
                        <div className="bento-icon">📎</div>
                        <h3>Rich Media</h3>
                        <p>Attach photos, videos, PDFs, and audio recordings directly to notes.</p>
                    </div>
                    <div className="bento-item large">
                        <div className="bento-icon">🧩</div>
                        <h3>Android Widgets</h3>
                        <p>Interactive home screen widgets for recent notes and quick creation without launching the app, featuring deep linking.</p>
                    </div>
                </div>
            </div>

            {/* Horizontal Scroll Section (Process) */}
            <div className="h-scroll-wrapper">
                <div className="horizontal-scroll-container">
                    <div className="h-slide">
                        <div className="h-slide-content">
                            <span className="section-label">01. DISCOVERY</span>
                            <h3>USER PAIN POINTS</h3>
                            <p>Analysis revealed that mandatory sign-ups constitute the biggest drop-off point. Users want to test utility before committing to an identity.</p>
                        </div>
                        <div className="h-slide-image">
                            <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974" alt="Research" />
                        </div>
                    </div>
                    <div className="h-slide">
                        <div className="h-slide-content">
                            <span className="section-label">02. INFORMATION ARCHITECTURE</span>
                            <h3>THE GUEST PARADIGM</h3>
                            <p>We designed a dual-track data layer: local SQLite (WatermelonDB) for guests, and Supabase for cloud sync. The switch is invisible to the user.</p>
                        </div>
                        <div className="h-slide-image">
                            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070" alt="Architecture" />
                        </div>
                    </div>
                    <div className="h-slide">
                        <div className="h-slide-content">
                            <span className="section-label">03. VISUAL LANGUAGE</span>
                            <h3>DARK MODE NATIVE</h3>
                            <p>Using deep navy tones (#050505) and vibrant green/cyan accents to create a sense of focus and energy without eye strain.</p>
                        </div>
                        <div className="h-slide-image">
                            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070" alt="Design" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- VISUAL SYSTEM --- */}
            <div className="content-block visuals-section">
                <div className="story-layout">
                    <div>
                        <span className="section-label">VISUAL IDENTITY</span>
                        <h2 className="story-heading reveal-text" style={{ marginTop: '1rem' }}>
                            SYSTEM DESIGN
                        </h2>
                        <p className="reveal-text story-text" style={{ marginTop: '2rem' }}>
                            The interface uses a strict 8px grid system and system fonts to feel entirely native. The color palette is designed to convey trust (navy) and energy (neon green).
                        </p>
                        <div className="color-palette reveal-text">
                            <div className="color-swatch" style={{ background: '#0A0A0A', color: '#fff' }}>DEEP VOID</div>
                            <div className="color-swatch" style={{ background: '#22C55E', color: '#000' }}>NEON GREEN</div>
                            <div className="color-swatch" style={{ background: '#06B6D4', color: '#fff' }}>CYAN</div>
                            <div className="color-swatch" style={{ background: '#3B82F6', color: '#fff' }}>ELECTRIC</div>
                        </div>
                    </div>
                    <div className="visual-element">
                        <div className="typography-preview">
                            <div style={{ opacity: 0.5, fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                                TYPOGRAPHY
                            </div>
                            Space Grotesk<br />
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>SYNCOPATE DISPLAY</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DEVELOPMENT HIGHLIGHTS --- */}
            <div className="content-block">
                <div className="story-layout">
                    <div>
                        <span className="section-label">ENGINEERING</span>
                        <h2 className="story-heading reveal-text" style={{ marginTop: '1rem' }}>
                            UNDER THE HOOD
                        </h2>
                    </div>
                    <div className="dev-highlights reveal-text">
                        <ul className="highlight-list">
                            <li>
                                <span>Architecture</span>
                                <strong>Offline-First / Local-First</strong>
                            </li>
                            <li>
                                <span>Backend</span>
                                <strong>Supabase + PostgreSQL</strong>
                            </li>
                            <li>
                                <span>State</span>
                                <strong>Zustand + React Query</strong>
                            </li>
                            <li>
                                <span>Forms</span>
                                <strong>Zod + Hook Form</strong>
                            </li>
                            <li>
                                <span>Performance</span>
                                <strong>Memoization + Virtualization</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- TECH STACK CARDS --- */}
            <section className="tech-section">
                <span className="section-label">FULL STACK</span>
                <h2 className="story-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    TECHNOLOGIES
                </h2>

                <div className="tech-grid">
                    <div className="tech-card">React Native 0.81</div>
                    <div className="tech-card">Expo SDK 54</div>
                    <div className="tech-card">TypeScript</div>
                    <div className="tech-card">Supabase Auth</div>
                    <div className="tech-card">PostgreSQL RLS</div>
                    <div className="tech-card">Edge Functions</div>
                    <div className="tech-card">Reanimated 3</div>
                    <div className="tech-card">FlashList</div>
                </div>
            </section>

            {/* --- REFLECTIONS --- */}
            <div className="content-block">
                <span className="section-label">KEY LEARNINGS</span>
                <h2 className="story-heading reveal-text" style={{ marginBottom: '4rem' }}>
                    REFLECTIONS
                </h2>
                <div className="reflections-grid">
                    <div className="reflection-card reveal-text">
                        <div className="reflection-icon">📡</div>
                        <h4>Offline-First Simplicity</h4>
                        <p>Writing to local storage first, then syncing, removed most network edge cases and made failure modes predictable.</p>
                    </div>
                    <div className="reflection-card reveal-text">
                        <div className="reflection-icon">🚪</div>
                        <h4>Guest Mode Wins</h4>
                        <p>Letting users try DO-IT without an account turned "maybe later" into real engaged sessions.</p>
                    </div>
                    <div className="reflection-card reveal-text">
                        <div className="reflection-icon">⚡</div>
                        <h4>Perceived Performance</h4>
                        <p>Optimistic UI and background worker queues make the app feel instant, regardless of actual network latency.</p>
                    </div>
                    <div className="reflection-card reveal-text">
                        <div className="reflection-icon">📊</div>
                        <h4>Behavior Over Requests</h4>
                        <p>Analytics showed users valued quick capture widgets far more than deep organizational folders, shifting our roadmap.</p>
                    </div>
                </div>
            </div>

            <div className="next-project-footer" onClick={() => navigate('/projects')}>
                <span className="next-label">NEXT PROJECT</span>
                <h2 className="next-title">ALL<br />PROJECTS</h2>
            </div>
        </div>
    );
};

export default DoItProject;
