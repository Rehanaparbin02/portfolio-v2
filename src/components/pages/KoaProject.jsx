import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './KoaProject.css';

gsap.registerPlugin(ScrollTrigger);

// Import images for Overview Stack
import koa2Img from '../../assets/koa-case/2.png';
import koa3Img from '../../assets/koa-case/3.png';
import koaBlueImg from '../../assets/koa-case/Blue.png';

// Import images for Gallery
import homeImg from '../../assets/koa-case/home.png';
import home1Img from '../../assets/koa-case/home-1.png';
import home2Img from '../../assets/koa-case/home-2.png';
import home3Img from '../../assets/koa-case/home-3.png';
import home4Img from '../../assets/koa-case/home-4.png';
import home5Img from '../../assets/koa-case/home-5.png';
import home6Img from '../../assets/koa-case/home-6.png';
import home7Img from '../../assets/koa-case/home-7.png';
import home8Img from '../../assets/koa-case/home-8.png';

const koaGalleryImages = [
  homeImg,
  home1Img,
  home2Img,
  home3Img,
  home4Img,
  home5Img,
  home6Img,
  home7Img,
  home8Img
];

// Import images dynamically (Preserving existing logic with corrected path)
const koaImagesModules = import.meta.glob('../../assets/koa-case/**/*.{png,jpg,jpeg,webp,svg}', { eager: true });
let koaImages = Object.entries(koaImagesModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([, mod]) => (mod && (mod.default || mod)) || null)
  .filter(Boolean)
  .slice(0, 8); // Increased slice to show more in gallery if available

if (koaImages.length > 0 && koaImages.length < 5) {
  const last = koaImages[koaImages.length - 1];
  while (koaImages.length < 5) koaImages.push(last);
}

const KoaProject = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === HERO ANIMATIONS ===
      gsap.from('.koa-nav-badge', {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.koa-hero-title span', {
        y: 150,
        opacity: 0,
        skewY: 5,
        stagger: 0.2,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.3
      });

      gsap.from('.koa-hero-description', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.from('.koa-hero-meta-item', {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1
      });

      // === SPLIT TEXT ANIMATIONS ===
      gsap.utils.toArray('.koa-split-text').forEach((el) => {
        // Skip elements in timeline section as they have a more specific animation below
        if (el.closest('.koa-timeline-section')) return;

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
      gsap.utils.toArray('.koa-stat-item').forEach((stat, i) => {
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
      gsap.utils.toArray('.koa-highlight-word').forEach((word) => {
        gsap.fromTo(word,
          {
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)',
            padding: '0.1em 0.3em',
            borderRadius: '4px',
            margin: '0 -0.1em'
          },
          {
            background: 'rgba(139, 92, 246, 0.2)',
            color: '#fff',
            padding: '0.1em 0.3em',
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
      const challengeSection = document.querySelector('.koa-challenge-solution');
      if (challengeSection) {
        const cards = challengeSection.querySelectorAll('.koa-challenge-card');

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

          const items = card.querySelectorAll('.koa-reveal-item-v2, .koa-highlight-item-v2');
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
      gsap.utils.toArray('.koa-dev-box').forEach((box, i) => {
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
      gsap.from('.koa-timeline-section .koa-section-label, .koa-timeline-section .koa-section-title .word', {
        y: 60,
        opacity: 0,
        rotateX: -45, // Adding a bit of rotation for consistency
        duration: 1.2,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.koa-timeline-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.utils.toArray('.koa-timeline-entry').forEach((entry, i) => {
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
          .from(entry.querySelector('.koa-timeline-dot'), {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(2)'
          }, '-=0.6')
          .from(entry.querySelector('.koa-timeline-line'), {
            width: 0,
            duration: 0.5,
            ease: 'power3.out'
          }, '-=0.4')
          .from(entry.querySelectorAll('.koa-timeline-content > *'), {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.3');
      });

      // === IMAGE REVEAL ANIMATIONS ===
      gsap.utils.toArray('.koa-reveal-image').forEach((img) => {
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
      gsap.utils.toArray('.koa-reveal-text').forEach((text) => {
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
      const buttons = document.querySelectorAll('.koa-magnetic-btn');
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
      gsap.to('.koa-parallax-bg', {
        y: 300,
        scrollTrigger: {
          trigger: '.koa-parallax-bg',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // === FEATURES HORIZONTAL SCROLL ===
      const featuresSection = document.querySelector('.koa-features-scroll');
      const featuresWrapper = document.querySelector('.koa-features-wrapper');

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
        gsap.utils.toArray('.koa-feature-card').forEach((card) => {
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

      // === VISUAL DESIGN GRID ANIMATIONS ===
      gsap.utils.toArray('.koa-visual-item').forEach((item, i) => {
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

      // === VISUAL STACK ROTATION ===
      const layers = gsap.utils.toArray('.koa-visual-layer');
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

      // === TECH CARDS ANIMATIONS ===
      gsap.utils.toArray('.koa-tech-card').forEach((card, i) => {
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
        gsap.to(card.querySelector('.koa-tech-glow'), {
          opacity: 0.2,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      });

      // === LEARNING CARDS ANIMATIONS ===
      gsap.utils.toArray('.koa-learning-card').forEach((card, i) => {
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
    <div className="koa-case-study-container" ref={containerRef}>
      {/* Navigation */}
      <nav className="koa-nav">
        <button className="koa-nav-back-btn koa-magnetic-btn" onClick={() => navigate('/projects')}>
          <span>← BACK</span>
        </button>
        {/* <div className="koa-nav-badge">CASE STUDY · 2024</div> */}
      </nav>

      {/* Hero Section */}
      <section className="koa-hero">
        <div className="koa-hero-container">
          {/* <div className="koa-hero-badge">CASE STUDY 2024</div> */}
          <div className="koa-hero-content">
            <div className="koa-hero-left">
              <div className="koa-hero-number">02</div>
              <div className="koa-hero-subtitle">PROJECT</div>
            </div>
            <div className="koa-hero-center">
              <h1 className="koa-hero-title">
                <span className="koa-hero-title-line-1">KOA</span>
                <span className="koa-hero-title-line-2">BUDGET</span>
                <span className="koa-hero-title-line-3">MANAGEMENT</span>
              </h1>
              {/* <div className="koa-hero-description">
                A comprehensive design system and component library built to scale, featuring 50+ reusable components, design tokens, and extensive documentation for modern product teams.
              </div> */}
            </div>
            <div className="koa-hero-right">
              <div className="koa-hero-meta">
                <div className="koa-hero-meta-item">
                  <span className="koa-meta-label">PLATFORM</span>
                  <span className="koa-meta-value">Mobile</span>
                </div>
                <div className="koa-hero-meta-item">
                  <span className="koa-meta-label">ROLE</span>
                  <span className="koa-meta-value">Design & Dev</span>
                </div>
                <div className="koa-hero-meta-item">
                  <span className="koa-meta-label">YEAR</span>
                  <span className="koa-meta-value">2024</span>
                </div>
              </div>
            </div>
          </div>
          <div className="koa-hero-scroll-indicator">
            <div className="koa-scroll-line"></div>
            <span>SCROLL</span>
          </div>
        </div>
        <div className="koa-hero-bg-gradient"></div>
      </section>

      {/* Summary */}
      <section className="koa-summary-full">
        <div className="koa-summary-content-new">
          <div className="koa-summary-decorative-line"></div>
          <h2 className="koa-summary-text-highlight">
            <span className="koa-summary-line">
              <span className="koa-highlight-word">Koa</span> is a <span className="koa-highlight-word">personal finance tool</span>
            </span>
            <span className="koa-summary-line">
              designed to <span className="koa-highlight-word">streamline</span> how you
            </span>
            <span className="koa-summary-line">
              <span className="koa-highlight-word">track, manage, and analyze</span>
            </span>
            <span className="koa-summary-line">
              your <span className="koa-highlight-word">budget,</span> providing a clear
            </span>
            <span className="koa-summary-line">
              overview of your spending to
            </span>
            <span className="koa-summary-line">
              achieve <span className="koa-highlight-word">financial freedom.</span>
            </span>
          </h2>
          <div className="koa-summary-tags-wrapper">
            {['React Native', 'Supabase', 'Expo Router', 'Financial Dashboard', 'iOS & Android', 'Full-Stack'].map((tag, i) => (
              <span key={i} className="koa-summary-tag-item">{tag}</span>
            ))}
          </div>
          <div className="koa-summary-gradient-orb"></div>
        </div>
      </section>

      {/* Stats */}
      <section className="koa-stats">
        <div className="koa-stat-item">
          <div className="koa-stat-value">50+</div>
          <div className="koa-stat-label">Components</div>
        </div>
        <div className="koa-stat-item">
          <div className="koa-stat-value">12+</div>
          <div className="koa-stat-label">Screens</div>
        </div>
        <div className="koa-stat-item">
          <div className="koa-stat-value">8k+</div>
          <div className="koa-stat-label">Lines Of Code</div>
        </div>
        <div className="koa-stat-item">
          <div className="koa-stat-value">60%</div>
          <div className="koa-stat-label">Faster Prototyping</div>
        </div>
      </section>

      {/* Overview */}
      <section className="koa-overview-v2">
        <div className="koa-overview-container-v2">
          <div className="koa-overview-header-v2">
            <div className="koa-section-label">OVERVIEW</div>
            <h2 className="koa-overview-title-v2 koa-split-text">
              {splitText('Building at Scale')} <br />
              <span className="koa-text-accent">{splitText('Unified Design.')}</span>
            </h2>
          </div>

          <div className="koa-overview-grid-v2">
            <div className="koa-overview-main-text">
              <p className="koa-reveal-text">
                Koa is an intelligent personal finance application built to help users master their money. By combining intuitive tracking, automated categorization, and deep financial analytics, Koa provides a comprehensive view of your financial health in a single, beautiful interface.
              </p>
              <div className="koa-overview-features-mini">
                <div className="koa-mini-feature">
                  <div className="koa-mini-icon">📊</div>
                  <div className="koa-mini-content">
                    <h4>Analytics</h4>
                    <p>Deep spending insights & charts.</p>
                  </div>
                </div>
                <div className="koa-mini-feature">
                  <div className="koa-mini-icon">💰</div>
                  <div className="koa-mini-content">
                    <h4>Budgeting</h4>
                    <p>Smart envelope-style saving goals.</p>
                  </div>
                </div>
              </div>
              <p className="koa-reveal-text secondary-text">
                The platform features end-to-end encryption for security, real-time sync across devices, and automated receipt scanning to minimize manual entry.
              </p>
            </div>

            <div className="koa-overview-visual-stack">
              <div className="koa-visual-layer layer-1 koa-reveal-image">
                <img src={koaBlueImg} alt="Koa Design System Main" />
              </div>
              <div className="koa-visual-layer layer-2 koa-reveal-image">
                <img src={koa2Img} alt="Koa Component View" />
              </div>
              <div className="koa-visual-layer layer-3 koa-reveal-image">
                <img src={koa3Img} alt="Koa Style Guide" />
              </div>
              <div className="koa-visual-glow"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="koa-challenge-solution">
        <div className="koa-challenge-header-v2">
          <div className="koa-section-label">STRATEGY</div>
          <h2 className="koa-section-title koa-split-text">{splitText('Problem vs Solution')}</h2>
        </div>

        <div className="koa-challenge-content-v2">
          <div className="koa-challenge-card challenge">
            <div className="koa-card-header">
              <span className="koa-card-tag">THE PROBLEM</span>
              <div className="koa-card-number">01</div>
            </div>
            <h3>Financial Chaos.</h3>
            <p>Users often struggle to keep track of multiple accounts, subscriptions, and hidden expenses across different platforms.</p>
            <ul className="koa-challenge-list-v2">
              <li className="koa-reveal-item-v2">Mixed manual tracking</li>
              <li className="koa-reveal-item-v2">No clear spending trends</li>
              <li className="koa-reveal-item-v2">Subscription fatigue</li>
              <li className="koa-reveal-item-v2">Security concerns</li>
            </ul>
          </div>

          <div className="koa-challenge-card solution">
            <div className="koa-card-header">
              <span className="koa-card-tag green">THE CURE</span>
              <div className="koa-card-number">02</div>
            </div>
            <h3>Unified Hub.</h3>
            <p>Koa provides a seamless, secure platform to consolidate all financial data into one intuitive dashboard for better decision-making.</p>
            <div className="koa-solution-highlights-v2">
              <div className="koa-highlight-item-v2">
                <span className="koa-highlight-icon">✓</span>
                <span>Auto-Sync</span>
              </div>
              <div className="koa-highlight-item-v2">
                <span className="koa-highlight-icon">✓</span>
                <span>AI Insights</span>
              </div>
              <div className="koa-highlight-item-v2">
                <span className="koa-highlight-icon">✓</span>
                <span>Privacy First</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Horizontal Scroll */}
      <section className="koa-features-scroll">
        <div className="koa-features-header">
          <div className="koa-section-label">CAPABILITIES</div>
          <h2 className="koa-section-title koa-split-text">{splitText('System Features')}</h2>
          <p className="koa-features-intro">Comprehensive tools and components designed for modern product development.</p>
        </div>
        <div className="koa-features-container">
          <div className="koa-features-wrapper">
            {[
              { title: 'Smart Tracking', text: 'Automatically categorizes your transactions with 98% accuracy using intelligent learning algorithms.' },
              { title: 'Goal Setting', text: 'Create and monitor multiple savings goals with milestone notifications and visual progress tracking.' },
              { title: 'Bill Monitoring', text: 'Never miss a payment again with smart bill detection and early reminder notifications.' },
              { title: 'Deep Analytics', text: 'Interactive charts and weekly reports that break down your spending habits by category and time.' },
              { title: 'Cloud Sync', text: 'Securely access your financial data across multiple devices with real-time end-to-end encrypted sync.' },
              { title: 'Export Ready', text: 'Generate professional PDF reports or CSV exports for your accountant with a single tap.' }
            ].map((feature, i) => (
              <div key={i} className="koa-feature-card">
                <div className="koa-feature-pin"></div>
                <div className="koa-feature-number">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="koa-feature-title">{feature.title}</h3>
                <p className="koa-feature-text">{feature.text}</p>
                <div className="koa-feature-accent"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="koa-timeline-section">
        <div className="koa-section-label">PROCESS</div>
        <h2 className="koa-section-title koa-split-text">{splitText('Design Process')}</h2>
        <div className="koa-timeline-container">
          {[
            { num: '01', title: 'Market Research', text: 'Analyzed top budgeting apps to identify gaps in user experience, focusing on automation and privacy features.' },
            { num: '02', title: 'Feature Mapping', text: 'Defined the core architecture for the transaction engine, categorization logic, and security protocols.' },
            { num: '03', title: 'UI/UX Prototyping', text: 'Designed high-fidelity mobile interfaces with a focus on ease of entry and clear data visualization.' },
            { num: '04', title: 'Beta Development', text: 'Built the core MVP with React Native, integrating Supabase for real-time sync and secure data storage.' },
            { num: '05', title: 'Security Audit', text: 'Conducted rigorous penetration testing and implemented AES-256 encryption for all sensitive user data.' },
            { num: '06', title: 'Launch & Iterate', text: 'Successfully launched on iOS and Android. Achieved high user retention by iterating based on feedback.' }
          ].map((item, i) => (
            <div key={i} className="koa-timeline-entry">
              <div className="koa-timeline-line"></div>
              <div className="koa-timeline-dot"></div>
              <div className="koa-timeline-content">
                <div className="koa-timeline-num">{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Design / Gallery */}
      <section className="koa-visual-section">
        <div className="koa-visual-header">
          <div className="koa-section-label">DESIGN</div>
          <h2 className="koa-section-title koa-split-text">{splitText('Visual Design')}</h2>
          <p className="koa-visual-intro">A comprehensive look at the design system library, showcasing key components and style guides.</p>
        </div>
        {koaGalleryImages.length > 0 && (
          <div className="koa-visual-grid">
            {koaGalleryImages.map((img, index) => (
              <div key={index} className="koa-visual-item">
                <img src={img} alt={`Koa System Screen ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Development */}
      <section className="koa-development">
        <div className="koa-dev-header">
          <div className="koa-section-label">DEVELOPMENT</div>
          <h2 className="koa-section-title koa-split-text">{splitText('Development Phase')}</h2>
          <p className="koa-dev-intro">
            A robust engineering approach focused on scalability, performance, and developer experience.
          </p>
        </div>

        <div className="koa-dev-content">
          <div className="koa-dev-boxes">
            <div className="koa-dev-box">
              <div className="koa-dev-box-number">01</div>
              <h4 className="koa-dev-box-title">Architecture Highlights</h4>
              <ul className="koa-dev-box-list">
                <li>Real-time data sync with Supabase PostgreSQL</li>
                <li>Secure AES-256 client-side encryption for transactions</li>
                <li>Offline-first architecture with local SQLite storage</li>
                <li>Modular React Native components for scalability</li>
              </ul>
            </div>
            <div className="koa-dev-box">
              <div className="koa-dev-box-number">02</div>
              <h4 className="koa-dev-box-title">Key Challenges Solved</h4>
              <ul className="koa-dev-box-list">
                <li>Optimized chart rendering for performance on low-end devices</li>
                <li>Automated category prediction using lightweight ML models</li>
                <li>Seamless sync conflict resolution across multiple devices</li>
                <li>Secure integration with multi-factor authentication</li>
              </ul>
            </div>
            <div className="koa-dev-box">
              <div className="koa-dev-box-number">03</div>
              <h4 className="koa-dev-box-title">Project Milestones</h4>
              <ul className="koa-dev-box-list">
                <li>Successfully passed external security audits</li>
                <li>Achieved sub-100ms response times for data fetching</li>
                <li>10k+ transactions processed during pilot phase</li>
                <li>99.9% crash-free sessions on production launch</li>
              </ul>
            </div>
          </div>

          <div className="koa-tech-section">
            <div className="koa-tech-header">
              <div className="koa-section-label">TECHNOLOGY</div>
              <h2 className="koa-section-title koa-split-text">{splitText('Technology Stack')}</h2>
              <p className="koa-tech-intro">Modern tools and frameworks powering the design system.</p>
            </div>

            <div className="koa-tech-grid">
              {[
                { name: 'React Native', category: 'Framework', color: '#61DAFB' },
                { name: 'Expo Router', category: 'Navigation', color: '#ffffff' },
                { name: 'Supabase', category: 'Backend', color: '#3ECF8E' },
                { name: 'JavaScript', category: 'Language', color: '#F7DF1E' },
                { name: 'Gesture Handler', category: 'Interaction', color: '#61DAFB' },
                { name: 'Async Storage', category: 'Storage', color: '#336791' },
                { name: 'Figma', category: 'Design', color: '#F24E1E' },
                { name: 'AES-JS', category: 'Security', color: '#FFC107' }
              ].map((tech, i) => (
                <div key={i} className="koa-tech-card">
                  <div className="koa-tech-glow" style={{ '--tech-color': tech.color }}></div>
                  <div className="koa-tech-content">
                    <div className="koa-tech-card-header">
                      <div className="koa-tech-icon" style={{ backgroundColor: tech.color + '20', color: tech.color }}>
                        {tech.name === 'React Native' ? 'RN' : tech.name.charAt(0)}
                      </div>
                      <div className="koa-tech-category">{tech.category}</div>
                    </div>
                    <div className="koa-tech-name">{tech.name}</div>
                    <div className="koa-tech-bar" style={{ backgroundColor: tech.color }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="koa-tech-footer">
              <div className="koa-tech-footer-item">
                <span className="koa-tech-footer-label">PLATFORMS</span>
                <span className="koa-tech-footer-value">iOS & Android</span>
              </div>
              <div className="koa-tech-footer-divider"></div>
              <div className="koa-tech-footer-item">
                <span className="koa-tech-footer-label">ARCHITECTURE</span>
                <span className="koa-tech-footer-value">Modular SDK</span>
              </div>
              <div className="koa-tech-footer-divider"></div>
              <div className="koa-tech-footer-item">
                <span className="koa-tech-footer-label">STORAGE</span>
                <span className="koa-tech-footer-value">Async & Supabase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learnings */}
      <section className="koa-learnings">
        <div className="koa-learnings-header">
          <div className="koa-section-label">REFLECTIONS</div>
          <h2 className="koa-section-title koa-split-text">{splitText('Key Learnings')}</h2>
        </div>
        <div className="koa-learnings-grid">
          {[
            { num: '01', title: 'Consistency over creativity', text: 'Stricter guidelines lead to better user experiences. By prioritizing unified patterns, we reduced cognitive load and improved brand trust.' },
            { num: '02', title: 'Documentation is a product', text: 'A system is only as good as its guides. Investing in interactive documentation significantly reduced support tickets and improved developer onboarding.' },
            { num: '03', title: 'Accessibility is non-negotiable', text: 'Building for everyone makes the product better for everyone. Semantic HTML and ARIA patterns improved usability for all users.' },
            { num: '04', title: 'Adoption needs advocacy', text: 'Systems are built by people, for people. Regular workshops and active support channels were critical for achieving high adoption rates.' }
          ].map((learning, i) => (
            <div key={i} className="koa-learning-card">
              <div className="koa-learning-header">
                <div className="koa-learning-num">{learning.num}</div>
                <h3 className="koa-learning-title">{learning.title}</h3>
              </div>
              <p className="koa-learning-text">{learning.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="koa-next-steps">
        <div className="koa-section-label">FUTURE</div>
        <h2 className="koa-section-title koa-split-text">{splitText('Next Steps')}</h2>
        <div className="koa-next-steps-list">
          {[
            'Expand icon library with 100+ new items',
            'Implement automated accessibility testing CI/CD',
            'Create comprehensive design-to-code playground',
            'Launch version 2.0 with enhanced multi-theme support',
            'Conduct cross-functional workshops for advanced usage'
          ].map((step, i) => (
            <div key={i} className="koa-next-step-item">
              <span className="koa-step-indicator">{String(i + 1).padStart(2, '0')}</span>
              <span className="koa-step-text">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="koa-cta">
        <h2 className="koa-cta-title koa-split-text">{splitText('EXPLORE MORE')}</h2>
        <button className="koa-cta-button koa-magnetic-btn" onClick={() => navigate('/projects')}>
          <span>VIEW ALL PROJECTS</span>
        </button>
      </section>

      <div className="koa-parallax-bg"></div>
    </div>
  );
}

export default KoaProject;