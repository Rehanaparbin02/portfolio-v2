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
            color: 'rgba(255, 255, 255, 0.7)'
          },
          {
            background: 'rgba(139, 92, 246, 0.2)', // Violet highlight
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
        y: 30,
        opacity: 0,
        duration: 1,
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
        <div className="koa-nav-badge">CASE STUDY · 2024</div>
      </nav>

      {/* Hero Section */}
      <section className="koa-hero">
        <div className="koa-hero-container">
          <div className="koa-hero-badge">CASE STUDY 2024</div>
          <div className="koa-hero-content">
            <div className="koa-hero-left">
              <div className="koa-hero-number">02</div>
              <div className="koa-hero-subtitle">PROJECT</div>
            </div>
            <div className="koa-hero-center">
              <h1 className="koa-hero-title">
                <span className="koa-hero-title-line-1">KOA</span>
                <span className="koa-hero-title-line-2">DESIGN</span>
                <span className="koa-hero-title-line-3">SYSTEM</span>
              </h1>
              <div className="koa-hero-description">
                A comprehensive design system and component library built to scale, featuring 50+ reusable components, design tokens, and extensive documentation for modern product teams.
              </div>
            </div>
            <div className="koa-hero-right">
              <div className="koa-hero-meta">
                <div className="koa-hero-meta-item">
                  <span className="koa-meta-label">PLATFORM</span>
                  <span className="koa-meta-value">Web</span>
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
              <span className="koa-highlight-word">Koa</span> is a modern design system
            </span>
            <span className="koa-summary-line">
              that bridges the gap between
            </span>
            <span className="koa-summary-line">
              <span className="koa-highlight-word">design</span> and <span className="koa-highlight-word">development</span>,
            </span>
            <span className="koa-summary-line">
              providing a single source of truth
            </span>
            <span className="koa-summary-line">
              for building consistent
            </span>
            <span className="koa-summary-line">
              digital products at scale.
            </span>
          </h2>
          <div className="koa-summary-tags-wrapper">
            {['React', 'TypeScript', 'Storybook', 'Design Tokens', 'Figma', 'Documentation'].map((tag, i) => (
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
          <div className="koa-stat-value">12</div>
          <div className="koa-stat-label">Product Teams</div>
        </div>
        <div className="koa-stat-item">
          <div className="koa-stat-value">300+</div>
          <div className="koa-stat-label">Design Tokens</div>
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
                Koa Design System was created to solve the fragmentation across multiple product teams. By establishing a unified design language, comprehensive component library, and clear documentation, we reduced design debt by 40% and accelerated feature development.
              </p>
              <div className="koa-overview-features-mini">
                <div className="koa-mini-feature">
                  <div className="koa-mini-icon">🧩</div>
                  <div className="koa-mini-content">
                    <h4>Components</h4>
                    <p>50+ Production Ready Components.</p>
                  </div>
                </div>
                <div className="koa-mini-feature">
                  <div className="koa-mini-icon">🎨</div>
                  <div className="koa-mini-content">
                    <h4>Tokens</h4>
                    <p>Semantic Design Tokens.</p>
                  </div>
                </div>
              </div>
              <p className="koa-reveal-text secondary-text">
                The system includes detailed accessibility guidelines, interactive documentation built with Storybook, and seamless Figma integration.
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
              <span className="koa-card-tag">THE CHALLENGE</span>
              <div className="koa-card-number">01</div>
            </div>
            <h3>Fragmentation.</h3>
            <p>Product teams across the organization were reinventing the wheel, leading to inconsistent experiences and wasted effort.</p>
            <ul className="koa-challenge-list-v2">
              <li className="koa-reveal-item-v2">Duplicate components</li>
              <li className="koa-reveal-item-v2">Inconsistent styling</li>
              <li className="koa-reveal-item-v2">No single source of truth</li>
              <li className="koa-reveal-item-v2">Accessibility gaps</li>
            </ul>
          </div>

          <div className="koa-challenge-card solution">
            <div className="koa-card-header">
              <span className="koa-card-tag green">THE SOLUTION</span>
              <div className="koa-card-number">02</div>
            </div>
            <h3>Unified System.</h3>
            <p>Koa provides a comprehensive design system with production-ready components and tokens that enables teams to build faster.</p>
            <div className="koa-solution-highlights-v2">
              <div className="koa-highlight-item-v2">
                <span className="koa-highlight-icon">✓</span>
                <span>Consistency</span>
              </div>
              <div className="koa-highlight-item-v2">
                <span className="koa-highlight-icon">✓</span>
                <span>Speed</span>
              </div>
              <div className="koa-highlight-item-v2">
                <span className="koa-highlight-icon">✓</span>
                <span>Accessibility</span>
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
              { title: 'Component Library', text: '50+ production-ready React components with TypeScript support, extensive props, and customization options.' },
              { title: 'Design Tokens', text: '300+ design tokens for colors, typography, spacing, and more, ensuring consistency across all platforms.' },
              { title: 'Accessibility First', text: 'WCAG 2.1 AA compliant components with keyboard navigation, screen reader support, and focus management.' },
              { title: 'Interactive Docs', text: 'Storybook-powered documentation with live code examples, props tables, and usage guidelines.' },
              { title: 'Figma Integration', text: 'Synchronized Figma library with matching components, styles, and auto-layout specifications.' },
              { title: 'Theme System', text: 'Flexible theming engine supporting dark mode, custom brands, and runtime theme switching.' }
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
        <h2 className="koa-section-title koa-split-text">{splitText('Development Journey')}</h2>
        <div className="koa-timeline-container">
          {[
            { num: '01', title: 'Research & Audit', text: 'Conducted comprehensive audit of existing products, identifying 200+ unique component variations and inconsistencies.' },
            { num: '02', title: 'Foundation & Principles', text: 'Established core design principles and defined atomic design tokens for colors, typography, spacing, and motion.' },
            { num: '03', title: 'Component Architecture', text: 'Designed atomic component hierarchy and created initial library of 30 foundational components with strict naming conventions.' },
            { num: '04', title: 'Documentation System', text: 'Built comprehensive Storybook documentation with code examples, accessibility notes, and usage guidelines.' },
            { num: '05', title: 'Testing & Refinement', text: 'Conducted usability testing with 3 pilot teams. Refined components based on feedback, increasing robustness and flexibility.' },
            { num: '06', title: 'Rollout & Adoption', text: 'Phased rollout across 12 product teams with workshops and support. Achieved 85% adoption rate within 6 months.' }
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
          <div className="koa-section-label">GALLERY</div>
          <h2 className="koa-section-title koa-split-text">{splitText('System Showcase')}</h2>
          <p className="koa-visual-intro">A selection of components from the Koa Design System.</p>
        </div>
        {koaImages.length > 0 && (
          <div className="koa-visual-grid">
            {koaImages.map((img, index) => (
              <div key={index} className="koa-visual-item">
                <img src={img} alt={`Koa Component ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Development / Tech Stack */}
      <section className="koa-development">
        <div className="koa-dev-header">
          <div className="koa-section-label">TECHNOLOGY</div>
          <h2 className="koa-section-title koa-split-text">{splitText('Tech Stack')}</h2>
          <p className="koa-dev-intro">Modern tools and frameworks powering the design system.</p>
        </div>

        <div className="koa-tech-grid">
          {[
            { name: 'React', category: 'Framework', color: '#61DAFB' },
            { name: 'TypeScript', category: 'Language', color: '#3178C6' },
            { name: 'Storybook', category: 'Documentation', color: '#FF4785' },
            { name: 'Emotion', category: 'Styling', color: '#D36AC2' },
            { name: 'Nx', category: 'Monorepo', color: '#143055' },
            { name: 'Figma', category: 'Design', color: '#F24E1E' },
            { name: 'Jest', category: 'Testing', color: '#C21325' },
            { name: 'Rollup', category: 'Bundling', color: '#EC4A3F' }
          ].map((tech, i) => (
            <div key={i} className="koa-tech-card">
              <div className="koa-tech-glow" style={{ '--tech-color': tech.color }}></div>
              <div className="koa-tech-content">
                <div className="koa-tech-card-header">
                  <div className="koa-tech-category">{tech.category}</div>
                </div>
                <div className="koa-tech-name">{tech.name}</div>
                <div className="koa-tech-bar" style={{ backgroundColor: tech.color }}></div>
              </div>
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