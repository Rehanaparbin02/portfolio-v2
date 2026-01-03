import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DoItProject.css';

// Specific imports for Overview and Visual Design
import ana1Img from '../../assets/do-it/ANA1.png';
import ana2Img from '../../assets/do-it/ANA2.png';
import blackImg from '../../assets/do-it/Black.png';
import calendarImg from '../../assets/do-it/calender.png';
import s1Img from '../../assets/do-it/S1.png';
import s2Img from '../../assets/do-it/S2.png';

// Case Study Screens for Visual Design Section
import caseAnalysisImg from '../../assets/do-it/do-it-case/analysis2.png';
import caseCalendarImg from '../../assets/do-it/do-it-case/calender.png';
import caseDrawerImg from '../../assets/do-it/do-it-case/drawer.png';
import caseHomeImg from '../../assets/do-it/do-it-case/home-space.png';
import caseNoteImg from '../../assets/do-it/do-it-case/note.png';
import casePomoImg from '../../assets/do-it/do-it-case/pomo.png';
import caseSpaceImg from '../../assets/do-it/do-it-case/space.png';
import caseTimeImg from '../../assets/do-it/do-it-case/time-tracking.png';




gsap.registerPlugin(ScrollTrigger);

const doItImages = [
  caseHomeImg,
  caseAnalysisImg,
  caseCalendarImg,
  caseDrawerImg,
  caseNoteImg,
  casePomoImg,
  caseSpaceImg,
  caseTimeImg
];



const DoItProject = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === HERO ANIMATIONS ===
      gsap.from('.doit-nav-badge', {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.doit-hero-title span', {
        y: 150,
        opacity: 0,
        skewY: 5,
        stagger: 0.2,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.3
      });

      gsap.from('.doit-hero-description', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.from('.doit-hero-meta-item', {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1
      });

      // === SPLIT TEXT ANIMATIONS ===
      gsap.utils.toArray('.doit-split-text').forEach((el) => {
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

        const value = stat.querySelector('.stat-value');
        const finalValue = value.textContent.trim();
        const isNumber = /[\d.]+/.test(finalValue);

        if (isNumber) {
          // Extract the numeric part and handle '+' and '%'
          let numValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
          const hasPlus = finalValue.includes('+');
          const hasPercent = finalValue.includes('%');

          const obj = { value: 0 };

          // Set initial value to 0
          if (hasPercent) {
            value.textContent = `0%`;
          } else if (hasPlus) {
            value.textContent = `0+`;
          } else {
            value.textContent = '0';
          }

          gsap.to(obj, {
            value: numValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            delay: 0.3,
            onUpdate: () => {
              if (hasPercent) {
                value.textContent = `${Math.round(obj.value)}%`;
              } else if (hasPlus) {
                value.textContent = `${Math.round(obj.value)}+`;
              } else {
                value.textContent = Math.round(obj.value);
              }
            }
          });
        }
      });
      // === TEXT HIGHLIGHT ON SCROLL ===
      gsap.utils.toArray('.doit-highlight-word').forEach((word) => {
        gsap.fromTo(word,
          {
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)'
          },
          {
            background: 'rgba(34, 197, 94, 0.2)',
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

      // === CHALLENGE & SOLUTION V2 ANIMATIONS ===
      const challengeSection = document.querySelector('.doit-challenge-solution');
      if (challengeSection) {
        const cards = challengeSection.querySelectorAll('.doit-challenge-card');

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

          // Stagger items inside the cards
          const items = card.querySelectorAll('.doit-reveal-item-v2, .doit-highlight-item-v2');
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
      gsap.utils.toArray('.doit-dev-box').forEach((box, i) => {
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

      // === LEARNING CARDS ANIMATIONS ===
      gsap.utils.toArray('.doit-learning-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          },
          delay: i * 0.12
        });
      });

      // === TIMELINE ANIMATIONS ===
      // Header Animation
      gsap.from('.doit-timeline-section .doit-section-label, .doit-timeline-section .doit-section-title .word', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.doit-timeline-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Entries Animation
      gsap.utils.toArray('.doit-timeline-entry').forEach((entry, i) => {
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
          .from(entry.querySelector('.doit-timeline-dot'), {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(2)'
          }, '-=0.6')
          .from(entry.querySelector('.doit-timeline-line'), {
            width: 0,
            duration: 0.5,
            ease: 'power3.out'
          }, '-=0.4')
          .from(entry.querySelectorAll('.doit-timeline-content > *'), {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.3');
      });

      // === IMAGE REVEAL ANIMATIONS ===
      gsap.utils.toArray('.doit-reveal-image').forEach((img) => {
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
      gsap.utils.toArray('.doit-reveal-text').forEach((text) => {
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

      // === STAGGERED LIST ITEMS ===
      gsap.utils.toArray('.doit-stagger-list li').forEach((list) => {
        const items = list.querySelectorAll('li') || [list];
        gsap.from(items, {
          x: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 85%'
          }
        });
      });

      // === MAGNETIC BUTTONS ===
      const buttons = document.querySelectorAll('.doit-magnetic-btn');
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
      gsap.to('.doit-parallax-bg', {
        y: 300,
        scrollTrigger: {
          trigger: '.doit-parallax-bg',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // === TECH CARDS ANIMATIONS ===
      gsap.utils.toArray('.doit-tech-card').forEach((card, i) => {
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

        // Continuous glow pulse
        gsap.to(card.querySelector('.doit-tech-glow'), {
          opacity: 0.2,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      });

      // === FEATURES HORIZONTAL SCROLL ===
      const featuresSection = document.querySelector('.doit-features-scroll');
      const featuresHeader = document.querySelector('.doit-features-header');
      const featuresWrapper = document.querySelector('.doit-features-wrapper');

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
        gsap.utils.toArray('.doit-feature-card').forEach((card) => {
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
      const layers = gsap.utils.toArray('.doit-visual-layer');
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
    <div className="doit-case-study-container" ref={containerRef}>
      {/* Navigation */}
      <nav className="doit-nav">
        <button className="doit-nav-back-btn doit-magnetic-btn" onClick={() => navigate('/projects')}>
          <span>← BACK</span>
        </button>
        <div className="doit-nav-badge">CASE STUDY · 2025</div>
      </nav>

      {/* Hero Section */}
      <section className="doit-hero">
        <div className="doit-hero-container">
          <div className="doit-hero-badge">CASE STUDY 2025</div>
          <div className="doit-hero-content">
            <div className="doit-hero-left">
              <div className="doit-hero-number">01</div>
              <div className="doit-hero-subtitle">PROJECT</div>
            </div>
            <div className="doit-hero-center">
              <h1 className="doit-hero-title">
                <span className="doit-hero-title-line-1">DO-IT</span>
                <span className="doit-hero-title-line-2">TASK</span>
                <span className="doit-hero-title-line-3">REIMAGINED</span>
              </h1>
              <div className="doit-hero-description">
                A full-stack productivity platform that transforms task management through intelligent automation, seamless collaboration, and beautiful design.
              </div>
            </div>
            <div className="doit-hero-right">
              <div className="doit-hero-meta">
                <div className="doit-hero-meta-item">
                  <span className="doit-meta-label">PLATFORM</span>
                  <span className="doit-meta-value">Mobile</span>
                </div>
                <div className="doit-hero-meta-item">
                  <span className="doit-meta-label">ROLE</span>
                  <span className="doit-meta-value">Full-Stack</span>
                </div>
                <div className="doit-hero-meta-item">
                  <span className="doit-meta-label">YEAR</span>
                  <span className="doit-meta-value">2024</span>
                </div>
              </div>
            </div>
          </div>
          <div className="doit-hero-scroll-indicator">
            <div className="doit-scroll-line"></div>
            <span>SCROLL</span>
          </div>
        </div>
        <div className="doit-hero-bg-gradient"></div>
      </section>

      {/* Summary */}
      <section className="doit-summary-full">
        <div className="doit-summary-content-new">
          <div className="doit-summary-decorative-line"></div>
          <h2 className="doit-summary-text-highlight">
            <span className="doit-summary-line">
              <span className="doit-highlight-word">DO-IT</span> transforms how you handle
            </span>
            <span className="doit-summary-line">
              tasks by blending <span className="doit-highlight-word">automation</span>,
            </span>
            <span className="doit-summary-line">
              <span className="doit-highlight-word">analytics</span>, and <span className="doit-highlight-word">collaboration</span>
            </span>
            <span className="doit-summary-line">
              into one calm, intelligent
            </span>
            <span className="doit-summary-line">
              task management experience.
            </span>
          </h2>
          <div className="doit-summary-tags-wrapper">
            {['React Native', 'AI UX', 'Task Management App', 'iOS', 'Android', 'Passion Project'].map((tag, i) => (
              <span key={i} className="doit-summary-tag-item">{tag}</span>
            ))}
          </div>
          <div className="doit-summary-gradient-orb"></div>
        </div>
      </section>

      {/* Stats */}
      <section className="doit-stats">
        <div className="doit-stat-item">
          <div className="doit-stat-value">8.5k+</div>
          <div className="doit-stat-label">Lines of Code</div>
        </div>
        <div className="doit-stat-item">
          <div className="doit-stat-value">18</div>
          <div className="doit-stat-label">Screens Designed</div>
        </div>
        <div className="doit-stat-item">
          <div className="doit-stat-value">100%</div>
          <div className="doit-stat-label">Offline Ready</div>
        </div>
        <div className="doit-stat-item">
          <div className="doit-stat-value">77%</div>
          <div className="doit-stat-label">Faster Load Times</div>
        </div>
      </section>

      {/* Overview */}
      <section className="doit-overview-v2">
        <div className="doit-overview-container-v2">
          <div className="doit-overview-header-v2">
            <div className="doit-section-label">OVERVIEW</div>
            <h2 className="doit-overview-title-v2 doit-split-text">
              {splitText('Next-Gen Productivity')} <br />
              <span className="doit-text-accent">{splitText('Engineered for Speed.')}</span>
            </h2>
          </div>

          <div className="doit-overview-grid-v2">
            <div className="doit-overview-main-text">
              <p className="doit-reveal-text">
                DO-IT is a full-stack, cross-platform note-taking and productivity app built with React Native + Expo and powered by a Supabase (PostgreSQL) backend. It delivers real-time sync, secure authentication, and an offline-first experience.
              </p>
              <div className="doit-overview-features-mini">
                <div className="doit-mini-feature">
                  <div className="doit-mini-icon">☁️</div>
                  <div className="doit-mini-content">
                    <h4>Cloud Sync</h4>
                    <p>Real-time data persistence across devices.</p>
                  </div>
                </div>
                <div className="doit-mini-feature">
                  <div className="doit-mini-icon">🔒</div>
                  <div className="doit-mini-content">
                    <h4>Isolated Auth</h4>
                    <p>Secure authentication with guest session migration.</p>
                  </div>
                </div>
              </div>
              <p className="doit-reveal-text secondary-text">
                Featuring custom Spaces, rich media attachments, and native widgets, DO-IT provides a production-ready solution with over 3,500 lines of optimized UI code.
              </p>
            </div>

            <div className="doit-overview-visual-stack">
              <div className="doit-visual-layer layer-1 doit-reveal-image">
                <img src={blackImg} alt="DO-IT App Home" />
              </div>
              <div className="doit-visual-layer layer-2 doit-reveal-image">
                <img src={ana1Img} alt="DO-IT App Workspace" />
              </div>
              <div className="doit-visual-layer layer-3 doit-reveal-image">
                <img src={calendarImg} alt="DO-IT App Calendar" />
              </div>
              <div className="doit-visual-glow"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="doit-challenge-solution">
        <div className="doit-challenge-header-v2">
          <div className="doit-section-label">STRATEGY</div>
          <h2 className="doit-section-title doit-split-text">{splitText('Problem vs Solution')}</h2>
        </div>

        <div className="doit-challenge-content-v2">
          <div className="doit-challenge-card challenge">
            <div className="doit-card-header">
              <span className="doit-card-tag">THE PROBLEM</span>
              <div className="doit-card-number">01</div>
            </div>
            <h3>Fragmented productivity landscape.</h3>
            <p>Modern professionals struggle with disconnected tools that increase cognitive load rather than reducing it.</p>
            <ul className="doit-challenge-list-v2">
              <li className="doit-reveal-item-v2">Mandatory accounts block instant flow</li>
              <li className="doit-reveal-item-v2">Cluttered UIs hide essential features</li>
              <li className="doit-reveal-item-v2">Poor offline support for mobile usage</li>
              <li className="doit-reveal-item-v2">Fragmented task & note management</li>
            </ul>
          </div>

          <div className="doit-challenge-card solution">
            <div className="doit-card-header">
              <span className="doit-card-tag green">THE CURE</span>
              <div className="doit-card-number">02</div>
            </div>
            <h3>One hub. No friction. Total focus.</h3>
            <p>DO-IT consolidates the essentials into a single, blazing-fast interface designed for high-performance deep work.</p>
            <div className="doit-solution-highlights-v2">
              <div className="doit-highlight-item-v2">
                <span className="doit-highlight-icon">✓</span>
                <span>Native Widgets</span>
              </div>
              <div className="doit-highlight-item-v2">
                <span className="doit-highlight-icon">✓</span>
                <span>Offline Sync</span>
              </div>
              <div className="doit-highlight-item-v2">
                <span className="doit-highlight-icon">✓</span>
                <span>Smart Workspaces</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Horizontal Scroll */}
      <section className="doit-features-scroll">
        <div className="doit-features-header">
          <div className="doit-section-label">FEATURES</div>
          <h2 className="doit-section-title doit-split-text">{splitText('Key Features')}</h2>
          <p className="doit-features-intro">Discover the powerful capabilities that make DO-IT a game-changer in productivity management.</p>
        </div>
        <div className="doit-features-container">
          <div className="doit-features-wrapper">
            {[
              { title: 'Frictionless Guest Mode', text: 'Start instantly without an account. Full functionality using local storage with smooth migration to authenticated users.' },
              { title: 'Smart Workspaces', text: 'Custom Spaces for organizing notes by context without complex folder hierarchies.' },
              { title: 'Rich Media Support', text: 'Photos, videos, PDFs, and audio recordings attached directly to notes in one searchable place.' },
              { title: 'Native Widgets', text: 'Home-screen widgets for quick access and creation without opening the app.' },
              { title: 'Focus & Analytics', text: 'Pomodoro timer and automatic time tracking to visualize productivity trends.' },
              { title: 'Offline-First Experience', text: 'Full functionality without internet; automatic sync when connectivity returns.' }
            ].map((feature, i) => (
              <div key={i} className="doit-feature-card">
                <div className="doit-feature-pin"></div>
                <div className="doit-feature-number">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="doit-feature-title">{feature.title}</h3>
                <p className="doit-feature-text">{feature.text}</p>
                <div className="doit-feature-accent"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="doit-timeline-section">
        <div className="doit-section-label">PROCESS</div>
        <h2 className="doit-section-title doit-split-text">{splitText('Design Process')}</h2>
        <div className="doit-timeline-container">
          {[
            { num: '01', title: 'Research & Discovery', text: 'Analysis of leading productivity apps revealed pain points: forced sign-ups, cluttered UI, and poor offline support. Key takeaways: fast entry, offline reliability, simple organization, lightweight productivity tools.' },
            { num: '02', title: 'Information Architecture', text: 'Designed a dual flow: Guest Mode for instant use and Authenticated flow for advanced features. Navigation centers around a clean home hub with Spaces, quick actions, and tools.' },
            { num: '03', title: 'Wireframing & Prototyping', text: 'Low-fidelity wireframes explored layouts, FAB placement, and modal patterns. A reusable component system ensured consistency, followed by a high-fidelity prototype with gestures, micro-animations, and accessibility checks.' },
            { num: '04', title: 'Visual Design', text: 'Dark-first theme with green accents. System fonts, an 8-point spacing grid, rounded cards, intuitive modals, clean icons, and subtle motion.' },
            { num: '05', title: 'Development Handoff', text: 'Detailed documentation of component states, variants, tokens, animations, and responsive behavior.' },
            { num: '06', title: 'Usability Testing', text: 'Testing revealed issues with FAB visibility, attachment clutter, and discoverability. Improvements included clearer icons, larger FABs, dedicated attachment views, guided tooltips, and accessibility refinements.' }
          ].map((item, i) => (
            <div key={i} className="doit-timeline-entry">
              <div className="doit-timeline-line"></div>
              <div className="doit-timeline-dot"></div>
              <div className="doit-timeline-content">
                <div className="doit-timeline-num">{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Design */}
      <section className="doit-visual-section">
        <div className="doit-visual-header">
          <div className="doit-section-label">DESIGN</div>
          <h2 className="doit-section-title doit-split-text">{splitText('Visual Design')}</h2>
          <p className="doit-visual-intro">A comprehensive look at the app's interface design, showcasing key screens and user flows.</p>
        </div>
        {doItImages.length > 0 && (
          <div className="doit-visual-grid">
            {doItImages.map((img, index) => (
              <div key={index} className="doit-visual-item">
                <img src={img} alt={`DO-IT App Screen ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Development */}
      <section className="doit-development">
        <div className="doit-dev-header">
          <div className="doit-section-label">DEVELOPMENT</div>
          <h2 className="doit-section-title doit-split-text">{splitText('Development Phase')}</h2>
          <p className="doit-dev-intro">
            Over an eight-week Agile cycle, the entire cross-platform app was built solo.
          </p>
        </div>

        <div className="doit-dev-content">
          <div className="doit-dev-boxes">
            <div className="doit-dev-box">
              <div className="doit-dev-box-number">01</div>
              <h4 className="doit-dev-box-title">Architecture Highlights</h4>
              <ul className="doit-dev-box-list">
                <li>Offline-first data flow with optimistic UI</li>
                <li>Background sync and queued retries</li>
                <li>Clear separation of concerns</li>
                <li>Secure cloud backend with real-time sync</li>
              </ul>
            </div>
            <div className="doit-dev-box">
              <div className="doit-dev-box-number">02</div>
              <h4 className="doit-dev-box-title">Key Challenges Solved</h4>
              <ul className="doit-dev-box-list">
                <li>Guest session isolation</li>
                <li>Reliable sync under poor networks</li>
                <li>Widget updates</li>
                <li>Performance at scale</li>
              </ul>
            </div>
            <div className="doit-dev-box">
              <div className="doit-dev-box-number">03</div>
              <h4 className="doit-dev-box-title">Outcomes</h4>
              <ul className="doit-dev-box-list">
                <li>Up to 77% faster load times</li>
                <li>Stable widget behavior</li>
                <li>Flexible, reusable component system</li>
                <li>~8,500 lines of code across 50+ files</li>
              </ul>
            </div>
          </div>

          <div className="doit-tech-section">
            <div className="doit-tech-header">
              <div className="doit-section-label">TECHNOLOGY</div>
              <h2 className="doit-section-title doit-split-text">{splitText('Technology Stack')}</h2>
              <p className="doit-tech-intro">Built with cutting-edge technologies for performance, scalability, and developer experience.</p>
            </div>
            <div className="doit-tech-grid">
              {[
                { name: 'React Native', category: 'Framework', color: '#61DAFB' },
                { name: 'Expo', category: 'Platform', color: '#000020' },
                { name: 'TypeScript', category: 'Language', color: '#3178C6' },
                { name: 'Supabase', category: 'Backend', color: '#3ECF8E' },
                { name: 'PostgreSQL', category: 'Database', color: '#336791' },
                { name: 'Reanimated', category: 'Animation', color: '#FF6B6B' },
                { name: 'Zustand', category: 'State', color: '#FFC107' },
                { name: 'React Query', category: 'Data', color: '#FF4154' }
              ].map((tech, i) => (
                <div key={i} className="doit-tech-card">
                  <div className="doit-tech-glow" style={{ '--tech-color': tech.color }}></div>
                  <div className="doit-tech-content">
                    <div className="doit-tech-card-header">
                      <div className="doit-tech-icon" style={{ backgroundColor: tech.color + '20', color: tech.color }}>
                        {tech.name.charAt(0)}
                      </div>
                      <div className="doit-tech-category">{tech.category}</div>
                    </div>
                    <h3 className="doit-tech-name">{tech.name}</h3>
                    <div className="doit-tech-bar" style={{ backgroundColor: tech.color }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="doit-tech-footer">
              <div className="doit-tech-footer-item">
                <span className="doit-tech-footer-label">PLATFORMS</span>
                <span className="doit-tech-footer-value">iOS & Android</span>
              </div>
              <div className="doit-tech-footer-divider"></div>
              <div className="doit-tech-footer-item">
                <span className="doit-tech-footer-label">ARCHITECTURE</span>
                <span className="doit-tech-footer-value">Offline-First</span>
              </div>
              <div className="doit-tech-footer-divider"></div>
              <div className="doit-tech-footer-item">
                <span className="doit-tech-footer-label">SYNC</span>
                <span className="doit-tech-footer-value">Real-Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learnings */}
      <section className="doit-learnings">
        <div className="doit-learnings-header">
          <div className="doit-section-label">REFLECTIONS</div>
          <h2 className="doit-section-title doit-split-text">{splitText('Key Learnings')}</h2>
        </div>
        <div className="doit-learnings-grid">
          {[
            { num: '01', title: 'Offline-first simplifies logic', text: 'Writing locally first makes failures predictable and easier to handle. The offline-first approach reduced complexity and improved reliability.' },
            { num: '02', title: 'Guest Mode beats forced signup', text: 'Letting users try before committing increased engagement and quality feedback. Conversion rates improved significantly with frictionless onboarding.' },
            { num: '03', title: 'Speed is part of UX', text: 'Virtualized lists and memoization made large workspaces feel instant. Performance optimizations directly translated to better user satisfaction.' },
            { num: '04', title: 'Behavior beats feature requests', text: 'Analytics showed quick actions and widgets mattered more than deep folder structures. User behavior data guided feature prioritization.' }
          ].map((learning, i) => (
            <div key={i} className="doit-learning-card">
              <div className="doit-learning-header">
                <div className="doit-learning-num">{learning.num}</div>
                <h3 className="doit-learning-title">{learning.title}</h3>
              </div>
              <p className="doit-learning-text">{learning.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="doit-next-steps">
        <div className="doit-section-label">FUTURE</div>
        <h2 className="doit-section-title doit-split-text">{splitText('Next Steps')}</h2>
        <div className="doit-next-steps-list">
          {[
            'Launch a closed beta with power users',
            'Refine onboarding and Guest Mode',
            'Harden sync and conflict handling',
            'Expand widgets and shortcuts',
            'Document offline-first patterns for future projects'
          ].map((step, i) => (
            <div key={i} className="doit-next-step-item">
              <span className="doit-step-indicator">{String(i + 1).padStart(2, '0')}</span>
              <span className="doit-step-text">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="doit-cta">
        <h2 className="doit-cta-title doit-split-text">{splitText('NEXT PROJECT')}</h2>
        <button className="doit-cta-button doit-magnetic-btn" onClick={() => navigate('/projects')}>
          <span>VIEW ALL PROJECTS</span>
          <span>→</span>
        </button>
      </section>

      {/* Parallax Background */}
      <div className="doit-parallax-bg"></div>
    </div>
  );
};

export default DoItProject;