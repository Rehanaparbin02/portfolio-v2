import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DoItProject.css';

gsap.registerPlugin(ScrollTrigger);

const DoItProject = () => {
  const containerRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === HERO ANIMATIONS ===
      gsap.from('.hero-label', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.hero-title-minimal .char', {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
      });

      gsap.from('.hero-meta-minimal span', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.8
      });

      // Parallax background grid
      gsap.to('.hero-grid-bg', {
        y: 200,
        scrollTrigger: {
          trigger: '.hero-minimal',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Background number scale
      gsap.to('.hero-number', {
        scale: 1.5,
        opacity: 0.02,
        scrollTrigger: {
          trigger: '.hero-minimal',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // === STATS REVEAL ===
      gsap.from('.stat-card', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-minimal',
          start: 'top 80%'
        }
      });

      // === SECTION HEADERS ===
      gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.querySelector('.section-label'), {
          x: -50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: header,
            start: 'top 80%'
          }
        });

        gsap.from(header.querySelector('.section-title'), {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: header,
            start: 'top 80%'
          }
        });

        const desc = header.querySelector('.section-description');
        if (desc) {
          gsap.from(desc, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: header,
              start: 'top 80%'
            }
          });
        }
      });

      // === FEATURE CARDS ===
      gsap.from('.feature-card', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%'
        }
      });

      // === TECH ITEMS ===
      gsap.from('.tech-item', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 80%'
        }
      });

      // === IMAGE SHOWCASE ===
      gsap.from('.showcase-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.showcase-image',
          start: 'top 80%'
        }
      });

      // Parallax image
      gsap.to('.showcase-image img', {
        y: -50,
        scrollTrigger: {
          trigger: '.showcase-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // === CTA SECTION ===
      gsap.from('.cta-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 80%'
        }
      });

      gsap.from('.cta-button', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.cta-button',
          start: 'top 90%'
        }
      });

      // === MAGNETIC BUTTON EFFECT ===
      const buttons = document.querySelectorAll('.cta-button, .nav-back');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, { scale: 1.05, duration: 0.3 });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, { scale: 1, duration: 0.3 });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // === CUSTOM CURSOR ===
  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
      gsap.to(cursorRingRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursorRingRef.current, { scale: 1.5, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRingRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);
    
    const interactiveElements = document.querySelectorAll('a, button, .stat-card, .feature-card, .tech-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // === MAGNETIC HOVER EFFECT ===
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const splitText = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word">
        {word.split('').map((char, j) => (
          <span key={j} className="char">{char}</span>
        ))}
      </span>
    ));
  };

  return (
    <div className="doit-modern" ref={containerRef}>
      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="custom-cursor-dot" />
      <div ref={cursorRingRef} className="custom-cursor-ring" />

      {/* Navigation */}
      <nav className="nav-minimal">
        <div className="nav-back" onClick={() => navigate('/projects')}>
          ← BACK
        </div>
        <div className="nav-logo">DO-IT</div>
      </nav>

      {/* Hero */}
      <section className="hero-minimal">
        <div className="hero-grid-bg" />
        <div className="hero-number">01</div>
        <div className="hero-content-minimal">
          <div className="hero-label">PRODUCTIVITY APP</div>
          <h1 className="hero-title-minimal">{splitText('DO-IT')}</h1>
          <div className="hero-meta-minimal">
            <span>REACT NATIVE</span>
            <span>•</span>
            <span>SUPABASE</span>
            <span>•</span>
            <span>2024</span>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-minimal">
        {[
          { value: '8 Weeks', label: 'Development' },
          { value: '8.5k+', label: 'Lines of Code' },
          { value: '18', label: 'Screens' },
          { value: '100%', label: 'Offline Ready' }
        ].map((stat, i) => (
          <div key={i} className="stat-card" onMouseMove={handleMouseMove}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Overview */}
      <section className="content-section">
        <div className="section-header">
          <div className="section-label">OVERVIEW</div>
          <h2 className="section-title">Full-Stack Productivity</h2>
          <p className="section-description">
            DO-IT is a comprehensive task management application built with React Native and Expo. 
            It features an innovative guest mode, custom workspaces, and offline-first architecture.
          </p>
        </div>

        <div className="features-grid">
          {[
            { icon: '🎭', title: 'Guest Mode', text: 'Start instantly without an account. Full functionality with seamless migration to authenticated accounts.' },
            { icon: '📂', title: 'Smart Workspaces', text: 'Organize notes into custom spaces. Keep work separated from personal projects.' },
            { icon: '⚡', title: 'Native Speed', text: 'Built with React Native Reanimated for 60fps gesture-driven interactions.' },
            { icon: '📡', title: 'Offline First', text: 'Full functionality without internet. Changes sync automatically when connectivity returns.' }
          ].map((feature, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-stack">
        <div className="section-header">
          <div className="section-label">TECHNOLOGY</div>
          <h2 className="section-title">Built With</h2>
        </div>
        <div className="tech-grid">
          {['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Reanimated', 'Zustand', 'React Query'].map((tech, i) => (
            <div key={i} className="tech-item">{tech}</div>
          ))}
        </div>
      </section>

      {/* Image Showcase */}
      <section className="image-showcase">
        <div className="showcase-image">
          <div style={{ 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'rgba(255,255,255,0.3)'
          }}>
            App Screenshot
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">NEXT PROJECT</h2>
        <button className="cta-button" onClick={() => navigate('/projects')}>
          <span>VIEW ALL PROJECTS</span>
          <span>→</span>
        </button>
      </section>
    </div>
  );
};

export default DoItProject;