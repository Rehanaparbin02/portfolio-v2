import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './KoaProject.css';

gsap.registerPlugin(ScrollTrigger);

// Import images
const koaImagesModules = import.meta.glob('../../assets/koa/koa-case/**/*.{png,jpg,jpeg,webp,svg}', { eager: true });
let koaImages = Object.entries(koaImagesModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([, mod]) => (mod && (mod.default || mod)) || null)
  .filter(Boolean)
  .slice(0, 5);

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
      gsap.from('.hero-tag-top-right', {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.hero-modern-title span', {
        y: 150,
        opacity: 0,
        skewY: 5,
        stagger: 0.2,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.3
      });

      gsap.from('.hero-modern-description', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.from('.hero-meta-item', {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1
      });

      // === SPLIT TEXT ANIMATIONS ===
      gsap.utils.toArray('.split-text').forEach((el) => {
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
        const finalValue = value.textContent;
        const isNumber = /[\d.]+/.test(finalValue);
        
        if (isNumber) {
          const numValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
          const obj = { value: 0 };
          
          gsap.to(obj, {
            value: numValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%'
            },
            delay: 0.3,
            onUpdate: () => {
              if (finalValue.includes('+')) {
                value.textContent = `${Math.round(obj.value)}+`;
              } else if (finalValue.includes('%')) {
                value.textContent = `${Math.round(obj.value)}%`;
              } else {
                value.textContent = Math.round(obj.value);
              }
            }
          });
        }
      });

      // === TEXT HIGHLIGHT ON SCROLL ===
      gsap.utils.toArray('.highlight-word').forEach((word) => {
        gsap.fromTo(word, 
          {
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)'
          },
          {
            background: 'rgba(139, 92, 246, 0.2)',
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

      // === CHALLENGE & SOLUTION ===
      gsap.utils.toArray('.challenge-box').forEach((box) => {
        gsap.from(box, {
          x: -200,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: box,
            start: 'top 85%'
          }
        });
      });

      gsap.utils.toArray('.solution-box').forEach((box) => {
        gsap.from(box, {
          x: 200,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: box,
            start: 'top 85%'
          }
        });
      });

      // === PILLARS ===
      gsap.utils.toArray('.pillar-bento-card').forEach((card, i) => {
        gsap.from(card, {
          scale: 0.8,
          opacity: 0,
          rotation: -10,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          },
          delay: i * 0.1
        });
      });

      // === DEV BOXES ===
      gsap.utils.toArray('.dev-box').forEach((box, i) => {
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

      // === LEARNING CARDS ===
      gsap.utils.toArray('.learning-card-redesigned').forEach((card, i) => {
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

      // === TIMELINE ===
      gsap.utils.toArray('.timeline-entry').forEach((entry, i) => {
        gsap.from(entry, {
          x: i % 2 === 0 ? -150 : 150,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%'
          }
        });
      });

      // === IMAGE REVEAL ===
      gsap.utils.toArray('.reveal-image').forEach((img) => {
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

        gsap.to(img, {
          y: -100,
          scale: 1.05,
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });

      // === VISUAL ITEMS ===
      gsap.utils.toArray('.visual-item').forEach((item, i) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%'
          },
          delay: i * 0.15
        });
      });

      // === TEXT REVEAL ===
      gsap.utils.toArray('.reveal-text').forEach((text) => {
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

      // === STAGGERED LISTS ===
      gsap.utils.toArray('.stagger-list li').forEach((list) => {
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
      const buttons = document.querySelectorAll('.magnetic-btn');
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
      gsap.to('.parallax-bg', {
        y: 300,
        scrollTrigger: {
          trigger: '.parallax-bg',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // === TECH CARDS ===
      gsap.utils.toArray('.tech-modern-card').forEach((card, i) => {
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

        gsap.to(card.querySelector('.tech-card-glow'), {
          opacity: 0.2,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      });

      // === FEATURES HORIZONTAL SCROLL ===
      const featuresSection = document.querySelector('.features-horizontal-scroll');
      const featuresWrapper = document.querySelector('.features-scroll-wrapper');

      if (featuresSection && featuresWrapper) {
        const scrollDistance = featuresWrapper.scrollWidth - window.innerWidth;
        
        const horizontalScroll = gsap.timeline({
          scrollTrigger: {
            trigger: featuresSection,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            anticipatePin: 1,
            pin: '.features-horizontal-scroll',
            pinSpacing: true
          }
        });

        horizontalScroll.to(featuresWrapper, {
          x: -scrollDistance,
          ease: 'none'
        });

        gsap.utils.toArray('.feature-scroll-card').forEach((card, index) => {
          if (index < 3) {
            gsap.set(card, { scale: 1, opacity: 1, rotation: 0 });
          } else {
            gsap.from(card, {
              scale: 0.8,
              opacity: 0,
              rotation: -10,
              duration: 0.8,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'left 85%',
                end: 'left 50%',
                containerAnimation: horizontalScroll,
                toggleActions: 'play none none reverse'
              }
            });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word">{word}</span>
    ));
  };

  return (
    <div className="koa-case-study-new" ref={containerRef}>
      {/* Navigation */}
      <nav className="case-nav">
        <button className="nav-back-btn magnetic-btn" onClick={() => navigate('/projects')}>
          <span>← BACK</span>
        </button>
        <div className="hero-tag-top-right">CASE STUDY · 2024</div>
      </nav>

      {/* Hero Section */}
      <section className="hero-modern">
        <div className="hero-modern-container">
          <div className="hero-modern-badge">CASE STUDY 2024</div>
          <div className="hero-modern-content">
            <div className="hero-modern-left">
              <div className="hero-modern-number">02</div>
              <div className="hero-modern-subtitle">PROJECT</div>
            </div>
            <div className="hero-modern-center">
              <h1 className="hero-modern-title">
                <span className="hero-title-line-1">KOA</span>
                <span className="hero-title-line-2">DESIGN</span>
                <span className="hero-title-line-3">SYSTEM</span>
              </h1>
              <div className="hero-modern-description">
                A comprehensive design system and component library built to scale, featuring 50+ reusable components, design tokens, and extensive documentation for modern product teams.
              </div>
            </div>
            <div className="hero-modern-right">
              <div className="hero-modern-meta">
                <div className="hero-meta-item">
                  <span className="meta-label">PLATFORM</span>
                  <span className="meta-value">Web</span>
                </div>
                <div className="hero-meta-item">
                  <span className="meta-label">ROLE</span>
                  <span className="meta-value">Design & Dev</span>
                </div>
                <div className="hero-meta-item">
                  <span className="meta-label">YEAR</span>
                  <span className="meta-value">2024</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-modern-scroll-indicator">
            <div className="scroll-line"></div>
            <span>SCROLL</span>
          </div>
        </div>
        <div className="hero-modern-bg-gradient"></div>
      </section>

      {/* Summary */}
      <section className="summary-full">
        <div className="summary-content">
          <h2 className="summary-text-highlight">
            <span className="highlight-word">Koa</span> is a modern design system that bridges the gap between <span className="highlight-word">design</span> and <span className="highlight-word">development</span>, providing a single source of truth for building consistent, accessible digital products at scale.
          </h2>
          <p className="summary-tags">React · TypeScript · Storybook · Design Tokens · Figma · Documentation</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-single-line">
        <div className="stat-item">
          <div className="stat-value">50+</div>
          <div className="stat-label">Components</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">12</div>
          <div className="stat-label">Product Teams</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">300+</div>
          <div className="stat-label">Design Tokens</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">60%</div>
          <div className="stat-label">Faster Prototyping</div>
        </div>
      </section>

      {/* Overview */}
      <section className="overview-split">
        <div className="overview-text">
          <div className="section-label">OVERVIEW</div>
          <h2 className="section-title split-text">{splitText('Building at Scale')}</h2>
          <p className="reveal-text">
            Koa Design System was created to solve the fragmentation across multiple product teams. By establishing a unified design language, comprehensive component library, and clear documentation, we reduced design debt by 40%, accelerated feature development by 60%, and ensured consistent user experiences across all touchpoints. The system includes over 50 production-ready components, 300+ design tokens, accessibility guidelines, and interactive documentation built with Storybook.
          </p>
        </div>
        <div className="overview-visual">
          {koaImages.length > 0 && (
            <div className="reveal-image">
              <img src={koaImages[0]} alt="Koa Design System" />
              <img src={koaImages[1]} alt="Koa Components" style={{position: 'relative', right: '6rem'}}/>
            </div>
          )}
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="challenge-solution-split">
        <div className="challenge-box challenge-slide">
          <div className="box-number">01</div>
          <h3>The Challenge</h3>
          <p>Product teams across the organization were reinventing the wheel, leading to inconsistent experiences and wasted effort.</p>
          <ol className="stagger-list">
            <li>Designers creating duplicate components in Figma</li>
            <li>Developers building the same UI patterns repeatedly</li>
            <li>Inconsistent styling and interaction patterns</li>
            <li>No single source of truth for design decisions</li>
            <li>Accessibility gaps across products</li>
          </ol>
        </div>
        <div className="solution-box solution-slide">
          <div className="box-number">02</div>
          <h3>The Solution</h3>
          <p>Koa provides a comprehensive design system with production-ready components, design tokens, and extensive documentation that enables teams to build consistent, accessible products faster.</p>
        </div>
      </section>

      {/* Features Horizontal Scroll */}
      <section className="features-horizontal-scroll">
        <div className="features-pinned-header">
          <div className="section-label">FEATURES</div>
          <h2 className="section-title split-text">{splitText('System Capabilities')}</h2>
          <p className="features-modern-intro">Comprehensive tools and components designed for modern product development.</p>
        </div>
        <div className="features-scroll-container">
          <div className="features-scroll-wrapper">
            {[
              { title: 'Component Library', text: '50+ production-ready React components with TypeScript support, extensive props, and customization options.' },
              { title: 'Design Tokens', text: '300+ design tokens for colors, typography, spacing, and more, ensuring consistency across all platforms.' },
              { title: 'Accessibility First', text: 'WCAG 2.1 AA compliant components with keyboard navigation, screen reader support, and focus management.' },
              { title: 'Interactive Docs', text: 'Storybook-powered documentation with live code examples, props tables, and usage guidelines.' },
              { title: 'Figma Integration', text: 'Synchronized Figma library with matching components, styles, and auto-layout specifications.' },
              { title: 'Theme System', text: 'Flexible theming engine supporting dark mode, custom brands, and runtime theme switching.' }
            ].map((feature, i) => (
              <div key={i} className="feature-scroll-card">
                <div className="feature-card-pin"></div>
                <div className="feature-modern-number">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="feature-modern-title">{feature.title}</h3>
                <p className="feature-modern-text">{feature.text}</p>
                <div className="feature-modern-accent"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process Timeline */}
      <section className="process-timeline-section">
        <div className="section-label">PROCESS</div>
        <h2 className="section-title split-text">{splitText('Development Journey')}</h2>
        <div className="timeline-container">
          {[
            { num: '01', title: 'Research & Audit', text: 'Conducted comprehensive audit of existing products, identifying 200+ unique component variations and inconsistencies. Interviewed 15 designers and developers to understand pain points and requirements.' },
            { num: '02', title: 'Foundation & Principles', text: 'Established core design principles: consistency, accessibility, flexibility, and scalability. Defined design tokens for colors, typography, spacing, and motion.' },
            { num: '03', title: 'Component Architecture', text: 'Designed atomic component hierarchy and created initial library of 30 foundational components. Established naming conventions and API patterns.' },
            { num: '04', title: 'Documentation System', text: 'Built comprehensive Storybook documentation with code examples, accessibility notes, and usage guidelines. Created migration guides for existing products.' },
            { num: '05', title: 'Testing & Refinement', text: 'Conducted usability testing with 3 pilot teams. Refined components based on feedback, added 20 additional patterns, and improved TypeScript types.' },
            { num: '06', title: 'Rollout & Adoption', text: 'Phased rollout across 12 product teams with workshops, office hours, and dedicated support. Achieved 85% adoption rate within 6 months.' }
          ].map((item, i) => (
            <div key={i} className="timeline-entry">
              <div className="timeline-line"></div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-num">{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Design */}
      <section className="visual-design-section">
        <div className="visual-header">
          <div className="section-label">COMPONENTS</div>
          <h2 className="section-title split-text">{splitText('System Showcase')}</h2>
          <p className="visual-intro">A selection of components from the Koa Design System, demonstrating consistency and flexibility.</p>
        </div>
        {koaImages.length > 0 && (
          <div className="visual-showcase-grid">
            {koaImages.map((img, index) => (
              <div key={index} className="visual-showcase-item reveal-image">
                <img src={img} alt={`Koa Component ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Development */}
      <section className="development-redesigned">
        <div className="dev-header-redesigned">
          <div className="section-label">DEVELOPMENT</div>
          <h2 className="section-title split-text">{splitText('Technical Implementation')}</h2>
          <p className="dev-intro-text">
            Built with modern technologies and best practices to ensure performance, maintainability, and developer experience.
          </p>
        </div>
        
        <div className="dev-content-redesigned">
          <div className="dev-boxes">
            <div className="dev-box dev-scale">
              <div className="dev-box-number">01</div>
              <h4 className="dev-box-title">Architecture</h4>
              <ul className="dev-box-list">
                <li>Monorepo structure with Nx</li>
                <li>Component-driven development</li>
                <li>Strict TypeScript typing</li>
                <li>CSS-in-JS with emotion</li>
              </ul>
            </div>
            <div className="dev-box dev-scale">
              <div className="dev-box-number">02</div>
              <h4 className="dev-box-title">Key Features</h4>
              <ul className="dev-box-list">
                <li>Tree-shakeable exports</li>
                <li>SSR compatibility</li>
                <li>Comprehensive testing</li>
                <li>Automated versioning</li>
              </ul>
            </div>
            <div className="dev-box dev-scale">
              <div className="dev-box-number">03</div>
              <h4 className="dev-box-title">Results</h4>
              <ul className="dev-box-list">
                <li>60% faster development</li>
                <li>40% less design debt</li>
                <li>100% component coverage</li>
                <li>15,000+ weekly downloads</li>
              </ul>
            </div>
          </div>
          
          <div className="tech-section-modern">
            <div className="tech-modern-header">
              <div className="section-label">TECHNOLOGY</div>
              <h2 className="section-title split-text">{splitText('Tech Stack')}</h2>
              <p className="tech-modern-intro">Modern tools and frameworks powering the design system.</p>
            </div>
            <div className="tech-modern-grid">
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
                <div key={i} className="tech-modern-card tech-glow">
                  <div className="tech-card-glow" style={{ '--tech-color': tech.color }}></div>
                  <div className="tech-card-content">
                    <div className="tech-card-header">
                      <div className="tech-card-icon" style={{ backgroundColor: tech.color + '20', color: tech.color }}>
                        {tech.name.charAt(0)}
                      </div>
                      <div className="tech-card-category">{tech.category}</div>
                    </div>
                    <h3 className="tech-card-name">{tech.name}</h3>
                    <div className="tech-card-bar" style={{ backgroundColor: tech.color }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tech-modern-footer">
              <div className="tech-footer-item">
                <span className="tech-footer-label">COMPONENTS</span>
                <span className="tech-footer-value">50+</span>
              </div>
              <div className="tech-footer-divider"></div>
              <div className="tech-footer-item">
                <span className="tech-footer-label">COVERAGE</span>
                <span className="tech-footer-value">100%</span>
              </div>
              <div className="tech-footer-divider"></div>
              <div className="tech-footer-item">
                <span className="tech-footer-label">TEAMS</span>
                <span className="tech-footer-value">12</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="learnings-redesigned">
        <div className="learnings-header-redesigned">
          <div className="section-label">INSIGHTS</div>
          <h2 className="section-title split-text">{splitText('Key Learnings')}</h2>
        </div>
        <div className="learnings-grid-redesigned">
          {[
            { num: '01', title: 'Start with the foundation', text: 'Design tokens and principles must come first. Without a solid foundation, component libraries become inconsistent collections of UI elements rather than cohesive systems.' },
            { num: '02', title: 'Documentation is critical', text: 'Comprehensive documentation with live examples drives adoption. Teams are 3x more likely to use components when they can see working examples and understand intended usage.' },
            { num: '03', title: 'Accessibility cannot be optional', text: 'Building accessibility into components from the start is far easier than retrofitting. Every component should be WCAG compliant by default.' },
            { num: '04', title: 'Iterate with real teams', text: 'Early collaboration with product teams revealed edge cases and necessary flexibility. Beta testing with 3 pilot teams saved months of rework.' }
          ].map((learning, i) => (
            <div key={i} className="learning-card-redesigned learning-fade">
              <div className="learning-card-header">
                <div className="learning-num-redesigned">{learning.num}</div>
                <h3 className="learning-title-redesigned">{learning.title}</h3>
              </div>
              <p className="learning-text-redesigned">{learning.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="next-steps-section-new">
        <div className="section-label">ROADMAP</div>
        <h2 className="section-title split-text">{splitText('Future Plans')}</h2>
        <div className="next-steps-list-new">
          {[
            'Expand to 75+ components based on team feedback',
            'Build React Native version for mobile consistency',
            'Develop VS Code extension for faster development',
            'Create design system metrics dashboard',
            'Establish community contribution guidelines'
          ].map((step, i) => (
            <div key={i} className="next-step-item-new">
              <span className="step-indicator">{String(i + 1).padStart(2, '0')}</span>
              <span className="step-text-new">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section-new">
        <h2 className="cta-title-new split-text">{splitText('EXPLORE MORE')}</h2>
        <button className="cta-button-new magnetic-btn" onClick={() => navigate('/projects')}>
          <span>VIEW ALL PROJECTS</span>
          <span>→</span>
        </button>
      </section>

      {/* Parallax Background */}
      <div className="parallax-bg"></div>
    </div>
  );
};

export default KoaProject;