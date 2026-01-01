// import { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import './DoItProject.css';

// gsap.registerPlugin(ScrollTrigger);

// // Import images
// // include nested folders (do-it-case) so the case images are picked up
// const doItImagesModules = import.meta.glob('../../assets/do-it/do-it-case/**/*.{png,jpg,jpeg,webp,svg}', { eager: true });
// let doItImages = Object.entries(doItImagesModules)
//   .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
//   .map(([, mod]) => (mod && (mod.default || mod)) || null)
//   .filter(Boolean)
//   .slice(0, 5);

// if (doItImages.length > 0 && doItImages.length < 5) {
//   const last = doItImages[doItImages.length - 1];
//   while (doItImages.length < 5) doItImages.push(last);
// }

// const DoItProject = () => {
//   const containerRef = useRef(null);
//   // const cursorDotRef = useRef(null);
//   // const cursorRingRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // === HERO ANIMATIONS ===
//       gsap.from('.hero-tag-top-right', {
//         x: 100,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out'
//       });

//       gsap.from('.hero-modern-title span', {
//         y: 150,
//         opacity: 0,
//         skewY: 5,
//         stagger: 0.2,
//         duration: 1.5,
//         ease: 'expo.out',
//         delay: 0.3
//       });

//       gsap.from('.hero-modern-description', {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out',
//         delay: 0.8
//       });

//       gsap.from('.hero-meta-item', {
//         x: -30,
//         opacity: 0,
//         stagger: 0.1,
//         duration: 0.8,
//         ease: 'power3.out',
//         delay: 1
//       });

//       // === SPLIT TEXT ANIMATIONS ===
//       gsap.utils.toArray('.split-text').forEach((el) => {
//         const words = el.querySelectorAll('.word');
//         gsap.from(words, {
//           y: 100,
//           opacity: 0,
//           rotateX: -90,
//           stagger: 0.05,
//           duration: 1,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: el,
//             start: 'top 85%'
//           }
//         });
//       });

//       // === STATS COUNTER ANIMATION - UNIQUE SCALE EFFECT ===
//       gsap.utils.toArray('.stat-item').forEach((stat, i) => {
//         // Initial scale animation
//         gsap.from(stat, {
//           scale: 0,
//           opacity: 0,
//           rotation: -180,
//           duration: 1,
//           ease: 'back.out(2)',
//           scrollTrigger: {
//             trigger: stat,
//             start: 'top 85%'
//           },
//           delay: i * 0.1
//         });

//         // Counter animation
//         const value = stat.querySelector('.stat-value');
//         const finalValue = value.textContent;
//         const isNumber = /[\d.]+/.test(finalValue);
        
//         if (isNumber) {
//           const numValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
//           const obj = { value: 0 };
          
//           gsap.to(obj, {
//             value: numValue,
//             duration: 2,
//             ease: 'power2.out',
//             scrollTrigger: {
//               trigger: stat,
//               start: 'top 85%'
//             },
//             delay: 0.3,
//             onUpdate: () => {
//               if (finalValue.includes('k+')) {
//                 value.textContent = `${Math.round(obj.value)}k+`;
//               } else if (finalValue.includes('%')) {
//                 value.textContent = `${Math.round(obj.value)}%`;
//               } else {
//                 value.textContent = Math.round(obj.value);
//               }
//             }
//           });
//         }
//       });

//       // === TEXT HIGHLIGHT ON SCROLL ===
//       gsap.utils.toArray('.highlight-word').forEach((word) => {
//         gsap.fromTo(word, 
//           {
//             background: 'transparent',
//             color: 'rgba(255, 255, 255, 0.7)'
//           },
//           {
//             background: 'rgba(255, 255, 255, 0.1)',
//             color: '#fff',
//             padding: '0.2em 0.4em',
//             borderRadius: '4px',
//             duration: 0.5,
//             ease: 'power2.out',
//         scrollTrigger: {
//               trigger: word,
//               start: 'top 90%',
//               end: 'bottom 10%',
//               scrub: true
//             }
//           }
//         );
//       });

//       // === CHALLENGE & SOLUTION - SLIDE IN FROM SIDES ===
//       gsap.utils.toArray('.challenge-box').forEach((box) => {
//         gsap.from(box, {
//           x: -200,
//           opacity: 0,
//           duration: 1.2,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: box,
//             start: 'top 85%'
//           }
//         });
//       });

//       gsap.utils.toArray('.solution-box').forEach((box) => {
//         gsap.from(box, {
//           x: 200,
//           opacity: 0,
//           duration: 1.2,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: box,
//             start: 'top 85%'
//           }
//         });
//       });

//       // === PILLARS - STAGGER FADE WITH SCALE ===
//       gsap.utils.toArray('.pillar-bento-card').forEach((card, i) => {
//         gsap.from(card, {
//           scale: 0.8,
//           opacity: 0,
//           rotation: -10,
//           duration: 0.8,
//           ease: 'back.out(1.7)',
//           scrollTrigger: {
//             trigger: card,
//             start: 'top 85%'
//           },
//           delay: i * 0.1
//         });
//       });

//       // === DEV BOXES - SCALE UP WITH BORDER ANIMATION ===
//       gsap.utils.toArray('.dev-box').forEach((box, i) => {
//         gsap.from(box, {
//           scale: 0.7,
//           opacity: 0,
//           duration: 1,
//           ease: 'elastic.out(1, 0.5)',
//           scrollTrigger: {
//             trigger: box,
//             start: 'top 85%'
//           },
//           delay: i * 0.15
//         });
//       });

//       // === LEARNING CARDS - FADE IN WITH SLIDE UP ===
//       gsap.utils.toArray('.learning-card-redesigned').forEach((card, i) => {
//         gsap.from(card, {
//           y: 60,
//           opacity: 0,
//           duration: 0.9,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: card,
//             start: 'top 85%'
//           },
//           delay: i * 0.12
//         });
//       });

//       // === TIMELINE ANIMATIONS ===
//       gsap.utils.toArray('.timeline-entry').forEach((entry, i) => {
//         gsap.from(entry, {
//           x: i % 2 === 0 ? -150 : 150,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out',
//         scrollTrigger: {
//             trigger: entry,
//             start: 'top 85%'
//           }
//         });
//       });

//       // === IMAGE REVEAL - UNIQUE PARALLAX EFFECT ===
//       gsap.utils.toArray('.reveal-image').forEach((img) => {
//         gsap.from(img, {
//           scale: 1.5,
//           opacity: 0,
//           filter: 'blur(20px)',
//           duration: 1.5,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: img,
//             start: 'top 85%'
//           }
//         });

//         gsap.to(img, {
//           y: -100,
//           scale: 1.05,
//           scrollTrigger: {
//             trigger: img,
//             start: 'top bottom',
//             end: 'bottom top',
//             scrub: 1
//           }
//         });
//       });

//       // === VISUAL ITEMS - FADE IN FROM BOTTOM ===
//       gsap.utils.toArray('.visual-item').forEach((item, i) => {
//         gsap.from(item, {
//           y: 50,
//           opacity: 0,
//           duration: 0.8,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: item,
//             start: 'top 85%'
//           },
//           delay: i * 0.15
//         });
//       });

//       // === TEXT REVEAL ON SCROLL ===
//       gsap.utils.toArray('.reveal-text').forEach((text) => {
//         gsap.from(text, {
//           clipPath: 'inset(100% 0 0 0)',
//           duration: 1.2,
//           ease: 'power3.out',
//             scrollTrigger: {
//             trigger: text,
//             start: 'top 85%'
//           }
//         });
//       });

//       // === STAGGERED LIST ITEMS ===
//       gsap.utils.toArray('.stagger-list li').forEach((list) => {
//         const items = list.querySelectorAll('li') || [list];
//         gsap.from(items, {
//           x: -30,
//         opacity: 0,
//           stagger: 0.1,
//           duration: 0.8,
//         ease: 'power3.out',
//         scrollTrigger: {
//             trigger: list,
//             start: 'top 85%'
//           }
//         });
//       });

//       // === MAGNETIC BUTTONS ===
//       const buttons = document.querySelectorAll('.magnetic-btn');
//       buttons.forEach(button => {
//         button.addEventListener('mousemove', (e) => {
//           const rect = button.getBoundingClientRect();
//           const x = e.clientX - rect.left - rect.width / 2;
//           const y = e.clientY - rect.top - rect.height / 2;
          
//           gsap.to(button, {
//             x: x * 0.3,
//             y: y * 0.3,
//         duration: 0.5,
//             ease: 'power2.out'
//           });
//         });

//         button.addEventListener('mouseleave', () => {
//           gsap.to(button, {
//             x: 0,
//             y: 0,
//             duration: 0.5,
//             ease: 'power2.out'
//           });
//         });
//       });

//       // === PARALLAX BACKGROUND ===
//       gsap.to('.parallax-bg', {
//         y: 300,
//         scrollTrigger: {
//           trigger: '.parallax-bg',
//           start: 'top bottom',
//           end: 'bottom top',
//           scrub: 1
//         }
//       });

//       // === TECH CARDS - GLOW PULSE EFFECT ===
//       gsap.utils.toArray('.tech-modern-card').forEach((card, i) => {
//         gsap.from(card, {
//           scale: 0,
//           opacity: 0,
//           rotation: 180,
//           duration: 1,
//           ease: 'back.out(2)',
//           scrollTrigger: {
//             trigger: card,
//             start: 'top 85%'
//           },
//           delay: i * 0.1
//         });

//         // Continuous glow pulse
//         gsap.to(card.querySelector('.tech-card-glow'), {
//           opacity: 0.2,
//           duration: 2,
//           ease: 'sine.inOut',
//           repeat: -1,
//           yoyo: true
//         });
//       });

//       // === FEATURES HORIZONTAL SCROLL WITH PIN ===
// const featuresSection = document.querySelector('.features-horizontal-scroll');
// const featuresHeader = document.querySelector('.features-pinned-header');
// const featuresWrapper = document.querySelector('.features-scroll-wrapper');

// if (featuresSection && featuresHeader && featuresWrapper) {
//   const scrollDistance = featuresWrapper.scrollWidth - window.innerWidth;
  
//   // Create horizontal scroll timeline
//   const horizontalScroll = gsap.timeline({
//     scrollTrigger: {
//       trigger: featuresSection,
//       start: 'top top',
//       end: () => `+=${scrollDistance}`,
//       scrub: 1,
//       anticipatePin: 1,
//       pin: '.features-horizontal-scroll',
//       pinSpacing: true
//     }
//   });

//   // Animate horizontal scroll
//   horizontalScroll.to(featuresWrapper, {
//     x: -scrollDistance,
//     ease: 'none'
//   });

//  // Animate cards as they come into view (skip first 3 cards so they're visible immediately)
//  gsap.utils.toArray('.feature-scroll-card').forEach((card, index) => {
//   // First 3 cards should be visible from the start
//   if (index < 3) {
//     gsap.set(card, { scale: 1, opacity: 1, rotation: 0 });
//   } else {
//     gsap.from(card, {
//       scale: 0.8,
//       opacity: 0,
//       rotation: -10,
//       duration: 0.8,
//       ease: 'back.out(1.7)',
//       scrollTrigger: {
//         trigger: card,
//         start: 'left 85%',
//         end: 'left 50%',
//         containerAnimation: horizontalScroll,
//         toggleActions: 'play none none reverse'
//       }
//     });
//   }
// });
// }
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   // === CUSTOM CURSOR ===
//   // useEffect(() => {
//   //   const moveCursor = (e) => {
//   //     gsap.to(cursorDotRef.current, {
//   //       x: e.clientX,
//   //       y: e.clientY,
//   //       duration: 0.1
//   //     });
//   //     gsap.to(cursorRingRef.current, {
//   //       x: e.clientX,
//   //       y: e.clientY,
//   //       duration: 0.3
//   //     });
//   //   };

//   //   const handleMouseEnter = () => {
//   //     gsap.to(cursorRingRef.current, { scale: 1.8, duration: 0.3 });
//   //   };

//   //   const handleMouseLeave = () => {
//   //     gsap.to(cursorRingRef.current, { scale: 1, duration: 0.3 });
//   //   };

//   //   window.addEventListener('mousemove', moveCursor);
    
//   //   const interactiveElements = document.querySelectorAll('a, button, .floating-card, .stat-item, .timeline-entry');
//   //   interactiveElements.forEach(el => {
//   //     el.addEventListener('mouseenter', handleMouseEnter);
//   //     el.addEventListener('mouseleave', handleMouseLeave);
//   //   });

//   //   return () => {
//   //     window.removeEventListener('mousemove', moveCursor);
//   //     interactiveElements.forEach(el => {
//   //       el.removeEventListener('mouseenter', handleMouseEnter);
//   //       el.removeEventListener('mouseleave', handleMouseLeave);
//   //     });
//   //   };
//   // }, []);

//   const splitText = (text) => {
//     return text.split(' ').map((word, i) => (
//       <span key={i} className="word">{word}</span>
//     ));
//   };

//   return (
//     <div className="doit-case-study-new" ref={containerRef}>
//       {/* Custom Cursor */}
//       {/* <div ref={cursorDotRef} className="custom-cursor-dot" />
//       <div ref={cursorRingRef} className="custom-cursor-ring" /> */}

//       {/* Navigation */}
//       <nav className="case-nav">
//         <button className="nav-back-btn magnetic-btn" onClick={() => navigate('/projects')}>
//           <span>← BACK</span>
//         </button>
//         <div className="hero-tag-top-right">CASE STUDY · 2025</div>
//       </nav>

//       {/* Hero Section - Redesigned */}
//       <section className="hero-modern">
//         <div className="hero-modern-container">
//           <div className="hero-modern-badge">CASE STUDY 2025</div>
//           <div className="hero-modern-content">
//             <div className="hero-modern-left">
//               <div className="hero-modern-number">01</div>
//               <div className="hero-modern-subtitle">PROJECT</div>
//             </div>
//             <div className="hero-modern-center">
//               <h1 className="hero-modern-title">
//                 <span className="hero-title-line-1">DO-IT</span>
//                 <span className="hero-title-line-2">TASK</span>
//                 <span className="hero-title-line-3">REIMAGINED</span>
//               </h1>
//               <div className="hero-modern-description">
//                 A full-stack productivity platform that transforms task management through intelligent automation, seamless collaboration, and beautiful design.
//               </div>
//             </div>
//             <div className="hero-modern-right">
//               <div className="hero-modern-meta">
//                 <div className="hero-meta-item">
//                   <span className="meta-label">PLATFORM</span>
//                   <span className="meta-value">Mobile</span>
//                 </div>
//                 <div className="hero-meta-item">
//                   <span className="meta-label">ROLE</span>
//                   <span className="meta-value">Full-Stack</span>
//                 </div>
//                 <div className="hero-meta-item">
//                   <span className="meta-label">YEAR</span>
//                   <span className="meta-value">2024</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="hero-modern-scroll-indicator">
//             <div className="scroll-line"></div>
//             <span>SCROLL</span>
//           </div>
//         </div>
//         <div className="hero-modern-bg-gradient"></div>
//       </section>

//       {/* Summary - Full Width */}
//       <section className="summary-full">
//         <div className="summary-content">
//           <h2 className="summary-text-highlight">
//             <span className="highlight-word">DO-IT</span> transforms how you handle tasks by blending <span className="highlight-word">automation</span>, <span className="highlight-word">analytics</span>, and <span className="highlight-word">collaboration</span> into one calm, intelligent task management experience.
//           </h2>
//           <p className="summary-tags">React Native · AI UX · Task Management App · iOS · Android · Passion Project</p>
//         </div>
//       </section>

//       {/* Stats - Single Line */}
//       <section className="stats-single-line">
//         <div className="stat-item">
//           <div className="stat-value">8.5k+</div>
//           <div className="stat-label">Lines of Code</div>
//         </div>
//         <div className="stat-item">
//           <div className="stat-value">18</div>
//           <div className="stat-label">Screens Designed</div>
//         </div>
//         <div className="stat-item">
//           <div className="stat-value">100%</div>
//           <div className="stat-label">Offline Ready</div>
//         </div>
//         <div className="stat-item">
//           <div className="stat-value">77%</div>
//           <div className="stat-label">Faster Load Times</div>
//         </div>
//       </section>

//       {/* Overview - Split Screen */}
//       <section className="overview-split">
//         <div className="overview-text">
//           <div className="section-label">OVERVIEW</div>
//           <h2 className="section-title split-text">{splitText('Full-Stack Productivity')}</h2>
//           <p className="reveal-text">
//             DO-IT is a full-stack, cross-platform note-taking and productivity app built with React Native + Expo and powered by a Supabase (PostgreSQL) backend, delivering real-time sync, secure authentication, 
//             and an offline-first experience—featuring full auth (email/password, OTP, recovery), a configurable Guest Mode with seamless account migration, custom Spaces, rich media attachments, advanced search and batch 
//             actions, productivity tools (Pomodoro, time tracking, calendar, reminders), native Android widgets with deep linking, smooth navigation, robust validation, and isolated guest sessions—resulting in a 
//             production-ready, scalable solution with 3,500+ lines of well-structured UI code.
//           </p>
//         </div>
//         <div className="overview-visual">
//           {doItImages.length > 0 && (
//             <div className="reveal-image">
//               <img src={doItImages[0]} alt="DO-IT App" /> {/* Changed from doItImages[1] to doItImages[0] */}
//               <img src={doItImages[1]} alt="DO-IT App" style={{position: 'relative', right: '6rem'}}/>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Challenge & Solution - Side by Side */}
//       <section className="challenge-solution-split">
//         <div className="challenge-box challenge-slide">
//           <div className="box-number">01</div>
//           <h3>The Challenge</h3>
//           <p>Modern professionals and students struggle with fragmented productivity tools, forcing them to juggle multiple apps for notes, tasks, time tracking, and reminders.</p>
//           <ol className="stagger-list">
//             <li>Require mandatory sign-ups</li>
//             <li>Feel cluttered or slow</li>
//             <li>Fail to work reliably offline</li>
//             <li>Don't provide fast access when information is needed most</li>
//           </ol>
//         </div>
//         <div className="solution-box solution-slide">
//           <div className="box-number">02</div>
//           <h3>The Solution</h3>
//           <p>DO-IT delivers an all-in-one productivity platform that combines note-taking, task management, workspace organization, and time tracking in a single native mobile app.</p>
//         </div>
//       </section>

//       {/* Solution Pillars - Bento Grid */}
//       {/* <section className="pillars-creative">
//         <div className="section-label">SOLUTION PILLARS</div>
//         <div className="pillars-bento-grid">
//           {[
//             { num: '01', title: 'Frictionless Entry', text: 'Guest mode with no signup required, allowing instant use with an upgrade path for unlimited access.', size: 'medium' },
//             { num: '02', title: 'Unified Workspace', text: 'Custom Spaces to organize notes by project, supporting rich media attachments and advanced filtering.', size: 'large' },
//             { num: '03', title: 'Instant Access', text: 'Native Android widgets for recent notes and quick note creation directly from the home screen.', size: 'medium' },
//             { num: '04', title: 'Productivity Integration', text: 'Built-in Pomodoro timer, time tracking analytics, calendar visualization, and intelligent reminders.', size: 'large' },
//             { num: '05', title: 'Smart Organization', text: 'Multi-select batch actions, favorites, archiving, and powerful search for large workspaces.', size: 'medium' },
//             { num: '06', title: 'Privacy-First Architecture', text: 'Isolated guest sessions with a secure backend and seamless account migration.', size: 'medium' }
//           ].map((pillar, i) => (
//             <div key={i} className={`pillar-bento-card ${pillar.size}`}>
//               <div className="pillar-header">
//                 <div className="pillar-num-redesigned">{pillar.num}</div>
//                 <h4 className="pillar-title-redesigned">{pillar.title}</h4>
//               </div>
//               <p className="pillar-text-redesigned">{pillar.text}</p>
//             </div>
//           ))}
//         </div>
//       </section> */}

//       {/* Key Features - Horizontal Scroll with Pin */}
// <section className="features-horizontal-scroll">
//   <div className="features-pinned-header">
//     <div className="section-label">FEATURES</div>
//     <h2 className="section-title split-text">{splitText('Key Features')}</h2>
//     <p className="features-modern-intro">Discover the powerful capabilities that make DO-IT a game-changer in productivity management.</p>
//   </div>
//   <div className="features-scroll-container">
//     <div className="features-scroll-wrapper">
//       {[
//         { title: 'Frictionless Guest Mode', text: 'Start instantly without an account. Full functionality using local storage with smooth migration to authenticated users.' },
//         { title: 'Smart Workspaces', text: 'Custom Spaces for organizing notes by context without complex folder hierarchies.' },
//         { title: 'Rich Media Support', text: 'Photos, videos, PDFs, and audio recordings attached directly to notes in one searchable place.' },
//         { title: 'Native Widgets', text: 'Home-screen widgets for quick access and creation without opening the app.' },
//         { title: 'Focus & Analytics', text: 'Pomodoro timer and automatic time tracking to visualize productivity trends.' },
//         { title: 'Offline-First Experience', text: 'Full functionality without internet; automatic sync when connectivity returns.' }
//       ].map((feature, i) => (
//         <div key={i} className="feature-scroll-card">
//           <div className="feature-card-pin"></div>
//           <div className="feature-modern-number">{String(i + 1).padStart(2, '0')}</div>
//           <h3 className="feature-modern-title">{feature.title}</h3>
//           <p className="feature-modern-text">{feature.text}</p>
//           <div className="feature-modern-accent"></div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>

//       {/* Design Process - Timeline */}
//       <section className="process-timeline-section">
//         <div className="section-label">PROCESS</div>
//         <h2 className="section-title split-text">{splitText('Design Process')}</h2>
//         <div className="timeline-container">
//           {[
//             { num: '01', title: 'Research & Discovery', text: 'Analysis of leading productivity apps revealed pain points: forced sign-ups, cluttered UI, and poor offline support. Key takeaways: fast entry, offline reliability, simple organization, lightweight productivity tools.' },
//             { num: '02', title: 'Information Architecture', text: 'Designed a dual flow: Guest Mode for instant use and Authenticated flow for advanced features. Navigation centers around a clean home hub with Spaces, quick actions, and tools.' },
//             { num: '03', title: 'Wireframing & Prototyping', text: 'Low-fidelity wireframes explored layouts, FAB placement, and modal patterns. A reusable component system ensured consistency, followed by a high-fidelity prototype with gestures, micro-animations, and accessibility checks.' },
//             { num: '04', title: 'Visual Design', text: 'Dark-first theme with green accents. System fonts, an 8-point spacing grid, rounded cards, intuitive modals, clean icons, and subtle motion.' },
//             { num: '05', title: 'Development Handoff', text: 'Detailed documentation of component states, variants, tokens, animations, and responsive behavior.' },
//             { num: '06', title: 'Usability Testing', text: 'Testing revealed issues with FAB visibility, attachment clutter, and discoverability. Improvements included clearer icons, larger FABs, dedicated attachment views, guided tooltips, and accessibility refinements.' }
//           ].map((item, i) => (
//             <div key={i} className="timeline-entry">
//               <div className="timeline-line"></div>
//               <div className="timeline-dot"></div>
//               <div className="timeline-content">
//                 <div className="timeline-num">{item.num}</div>
//                 <h3>{item.title}</h3>
//                 <p>{item.text}</p>
//               </div>
//         </div>
//           ))}
//         </div>
//       </section>

//     {/* Visual Design - Full Width Image */}
//       <section className="visual-design-section">
//         <div className="visual-header">
//           <div className="section-label">DESIGN</div>
//           <h2 className="section-title split-text">{splitText('Visual Design')}</h2>
//           <p className="visual-intro">A comprehensive look at the app's interface design, showcasing key screens and user flows.</p>
//         </div>
//         {doItImages.length > 0 && (
//           <div className="visual-showcase-grid">
//             {doItImages.map((img, index) => (
//               <div key={index} className="visual-showcase-item reveal-image">
//                 <img src={img} alt={`DO-IT App Screen ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Development - Redesigned Layout */}
//       <section className="development-redesigned">
//         <div className="dev-header-redesigned">
//           <div className="section-label">DEVELOPMENT</div>
//           <h2 className="section-title split-text">{splitText('Development Phase')}</h2>
//           <p className="dev-intro-text">
//             Over an eight-week Agile cycle, the entire cross-platform app was built solo.
//           </p>
//         </div>
        
//         <div className="dev-content-redesigned">
//           <div className="dev-boxes">
//             <div className="dev-box dev-scale">
//               <div className="dev-box-number">01</div>
//               <h4 className="dev-box-title">Architecture Highlights</h4>
//               <ul className="dev-box-list">
//                 <li>Offline-first data flow with optimistic UI</li>
//                 <li>Background sync and queued retries</li>
//                 <li>Clear separation of concerns</li>
//                 <li>Secure cloud backend with real-time sync</li>
//               </ul>
//             </div>
//             <div className="dev-box dev-scale">
//               <div className="dev-box-number">02</div>
//               <h4 className="dev-box-title">Key Challenges Solved</h4>
//               <ul className="dev-box-list">
//                 <li>Guest session isolation</li>
//                 <li>Reliable sync under poor networks</li>
//                 <li>Widget updates</li>
//                 <li>Performance at scale</li>
//               </ul>
//             </div>
//             <div className="dev-box dev-scale">
//               <div className="dev-box-number">03</div>
//               <h4 className="dev-box-title">Outcomes</h4>
//               <ul className="dev-box-list">
//                 <li>Up to 77% faster load times</li>
//                 <li>Stable widget behavior</li>
//                 <li>Flexible, reusable component system</li>
//                 <li>~8,500 lines of code across 50+ files</li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="tech-section-modern">
//             <div className="tech-modern-header">
//               <div className="section-label">TECHNOLOGY</div>
//               <h2 className="section-title split-text">{splitText('Technology Stack')}</h2>
//               <p className="tech-modern-intro">Built with cutting-edge technologies for performance, scalability, and developer experience.</p>
//             </div>
//             <div className="tech-modern-grid">
//               {[
//                 { name: 'React Native', category: 'Framework', color: '#61DAFB' },
//                 { name: 'Expo', category: 'Platform', color: '#000020' },
//                 { name: 'TypeScript', category: 'Language', color: '#3178C6' },
//                 { name: 'Supabase', category: 'Backend', color: '#3ECF8E' },
//                 { name: 'PostgreSQL', category: 'Database', color: '#336791' },
//                 { name: 'Reanimated', category: 'Animation', color: '#FF6B6B' },
//                 { name: 'Zustand', category: 'State', color: '#FFC107' },
//                 { name: 'React Query', category: 'Data', color: '#FF4154' }
//               ].map((tech, i) => (
//                 <div key={i} className="tech-modern-card tech-glow">
//                   <div className="tech-card-glow" style={{ '--tech-color': tech.color }}></div>
//                   <div className="tech-card-content">
//                     <div className="tech-card-header">
//                       <div className="tech-card-icon" style={{ backgroundColor: tech.color + '20', color: tech.color }}>
//                         {tech.name.charAt(0)}
//                       </div>
//                       <div className="tech-card-category">{tech.category}</div>
//                     </div>
//                     <h3 className="tech-card-name">{tech.name}</h3>
//                     <div className="tech-card-bar" style={{ backgroundColor: tech.color }}></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="tech-modern-footer">
//               <div className="tech-footer-item">
//                 <span className="tech-footer-label">PLATFORMS</span>
//                 <span className="tech-footer-value">iOS & Android</span>
//               </div>
//               <div className="tech-footer-divider"></div>
//               <div className="tech-footer-item">
//                 <span className="tech-footer-label">ARCHITECTURE</span>
//                 <span className="tech-footer-value">Offline-First</span>
//               </div>
//               <div className="tech-footer-divider"></div>
//               <div className="tech-footer-item">
//                 <span className="tech-footer-label">SYNC</span>
//                 <span className="tech-footer-value">Real-Time</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Key Learnings - Redesigned */}
//       <section className="learnings-redesigned">
//         <div className="learnings-header-redesigned">
//           <div className="section-label">REFLECTIONS</div>
//           <h2 className="section-title split-text">{splitText('Key Learnings')}</h2>
//         </div>
//         <div className="learnings-grid-redesigned">
//           {[
//             { num: '01', title: 'Offline-first simplifies logic', text: 'Writing locally first makes failures predictable and easier to handle. The offline-first approach reduced complexity and improved reliability.' },
//             { num: '02', title: 'Guest Mode beats forced signup', text: 'Letting users try before committing increased engagement and quality feedback. Conversion rates improved significantly with frictionless onboarding.' },
//             { num: '03', title: 'Speed is part of UX', text: 'Virtualized lists and memoization made large workspaces feel instant. Performance optimizations directly translated to better user satisfaction.' },
//             { num: '04', title: 'Behavior beats feature requests', text: 'Analytics showed quick actions and widgets mattered more than deep folder structures. User behavior data guided feature prioritization.' }
//           ].map((learning, i) => (
//             <div key={i} className="learning-card-redesigned learning-fade">
//               <div className="learning-card-header">
//                 <div className="learning-num-redesigned">{learning.num}</div>
//                 <h3 className="learning-title-redesigned">{learning.title}</h3>
//               </div>
//               <p className="learning-text-redesigned">{learning.text}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Next Steps - List */}
//       <section className="next-steps-section-new">
//         <div className="section-label">FUTURE</div>
//         <h2 className="section-title split-text">{splitText('Next Steps')}</h2>
//         <div className="next-steps-list-new">
//           {[
//             'Launch a closed beta with power users',
//             'Refine onboarding and Guest Mode',
//             'Harden sync and conflict handling',
//             'Expand widgets and shortcuts',
//             'Document offline-first patterns for future projects'
//           ].map((step, i) => (
//             <div key={i} className="next-step-item-new">
//               <span className="step-indicator">{String(i + 1).padStart(2, '0')}</span>
//               <span className="step-text-new">{step}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="cta-section-new">
//         <h2 className="cta-title-new split-text">{splitText('NEXT PROJECT')}</h2>
//         <button className="cta-button-new magnetic-btn" onClick={() => navigate('/projects')}>
//           <span>VIEW ALL PROJECTS</span>
//           <span>→</span>
//         </button>
//       </section>

//       {/* Parallax Background */}
//       <div className="parallax-bg"></div>
//     </div>
//   );
// };

// export default DoItProject;
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DoItProject.css';

gsap.registerPlugin(ScrollTrigger);

// Import images
const doItImagesModules = import.meta.glob('../../assets/do-it/do-it-case/**/*.{png,jpg,jpeg,webp,svg}', { eager: true });
let doItImages = Object.entries(doItImagesModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([, mod]) => (mod && (mod.default || mod)) || null)
  .filter(Boolean)
  .slice(0, 5);

if (doItImages.length > 0 && doItImages.length < 5) {
  const last = doItImages[doItImages.length - 1];
  while (doItImages.length < 5) doItImages.push(last);
}

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
      gsap.utils.toArray('.doit-stat-item').forEach((stat, i) => {
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

        const value = stat.querySelector('.doit-stat-value');
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
              if (finalValue.includes('k+')) {
                value.textContent = `${Math.round(obj.value)}k+`;
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
      gsap.utils.toArray('.doit-summary-highlight').forEach((word) => {
        gsap.fromTo(word, 
          {
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)'
          },
          {
            background: 'rgba(34, 197, 94, 0.4)',
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
      gsap.utils.toArray('.doit-challenge-box').forEach((box) => {
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

      gsap.utils.toArray('.doit-solution-box').forEach((box) => {
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
      gsap.utils.toArray('.doit-timeline-entry').forEach((entry, i) => {
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

      // === VISUAL ITEMS ANIMATIONS ===
      gsap.utils.toArray('.doit-visual-item').forEach((item, i) => {
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
        const scrollDistance = featuresWrapper.scrollWidth - window.innerWidth;
        
        const horizontalScroll = gsap.timeline({
          scrollTrigger: {
            trigger: featuresSection,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            anticipatePin: 1,
            pin: '.doit-features-scroll',
            pinSpacing: true
          }
        });

        horizontalScroll.to(featuresWrapper, {
          x: -scrollDistance,
          ease: 'none'
        });

        // Animate cards as they come into view (skip first 3 cards)
        gsap.utils.toArray('.doit-feature-card').forEach((card, index) => {
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
      <section className="doit-summary">
        <div className="doit-summary-content">
          <h2 className="doit-summary-text">
            <span className="doit-summary-highlight">DO-IT</span> transforms how you handle tasks by blending <span className="doit-summary-highlight">automation</span>, <span className="doit-summary-highlight">analytics</span>, and <span className="doit-summary-highlight">collaboration</span> into one calm, intelligent task management experience.
          </h2>
          <p className="doit-summary-tags">React Native · AI UX · Task Management App · iOS · Android · Passion Project</p>
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
      <section className="doit-overview">
        <div className="doit-overview-text">
          <div className="doit-section-label">OVERVIEW</div>
          <h2 className="doit-section-title doit-split-text">{splitText('Full-Stack Productivity')}</h2>
          <p className="doit-reveal-text">
            DO-IT is a full-stack, cross-platform note-taking and productivity app built with React Native + Expo and powered by a Supabase (PostgreSQL) backend, delivering real-time sync, secure authentication, 
            and an offline-first experience—featuring full auth (email/password, OTP, recovery), a configurable Guest Mode with seamless account migration, custom Spaces, rich media attachments, advanced search and batch 
            actions, productivity tools (Pomodoro, time tracking, calendar, reminders), native Android widgets with deep linking, smooth navigation, robust validation, and isolated guest sessions—resulting in a 
            production-ready, scalable solution with 3,500+ lines of well-structured UI code.
          </p>
        </div>
        <div className="doit-overview-visual">
          {doItImages.length > 0 && (
            <div className="doit-reveal-image">
              <img src={doItImages[0]} alt="DO-IT App" />
              <img src={doItImages[1]} alt="DO-IT App" style={{position: 'relative', right: '6rem'}}/>
            </div>
          )}
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="doit-challenge-solution">
        <div className="doit-challenge-box">
          <div className="doit-box-number">01</div>
          <h3>The Challenge</h3>
          <p>Modern professionals and students struggle with fragmented productivity tools, forcing them to juggle multiple apps for notes, tasks, time tracking, and reminders.</p>
          <ol className="doit-stagger-list">
            <li>Require mandatory sign-ups</li>
            <li>Feel cluttered or slow</li>
            <li>Fail to work reliably offline</li>
            <li>Don't provide fast access when information is needed most</li>
          </ol>
        </div>
        <div className="doit-solution-box">
          <div className="doit-box-number">02</div>
          <h3>The Solution</h3>
          <p>DO-IT delivers an all-in-one productivity platform that combines note-taking, task management, workspace organization, and time tracking in a single native mobile app.</p>
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
              <div key={index} className="doit-visual-item doit-reveal-image">
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