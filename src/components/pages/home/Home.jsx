// import { useEffect, useRef } from 'react';
// import Lenis from 'lenis';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import './Home.css';

// import ribbon from '../../../assets/ribbon.png';
// import heart from '../../../assets/heart.png';
// import flower from '../../../assets/flower.png';
// import cherry from '../../../assets/cherry.png';
// import butterfly from '../../../assets/butterfly.png';

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             // Entrance Animation
//             const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//             // 1. Character Reveal (Staggered)
//             const chars = containerRef.current.querySelectorAll('.char');

//             tl.from(chars, {
//                 y: 100, // Move from below
//                 opacity: 0,
//                 rotateX: -90,
//                 stagger: 0.02,
//                 duration: 1,
//                 ease: "power4.out"
//             })
//                 .from(".selection-box", {
//                     scale: 0,
//                     opacity: 0,
//                     duration: 0.6,
//                     stagger: 0.2,
//                     ease: "back.out(1.7)"
//                 }, "-=0.5")
//                 .from(".floating-wrapper", {
//                     y: 50,
//                     opacity: 0,
//                     duration: 0.8,
//                     stagger: 0.1,
//                     ease: "back.out(1.2)"
//                 }, "-=0.8");

//             // Parallax Scroll Effect
//             gsap.to(".top-row", {
//                 y: -150,
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: 1,
//                 }
//             });

//             gsap.to(".middle-row", {
//                 y: -80,
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: 1,
//                 }
//             });

//             gsap.to(".bottom-row", {
//                 y: -40,
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: 1,
//                 }
//             });

//             // Scale background on scroll
//             gsap.to(".hero-content", {
//                 scale: 0.9,
//                 opacity: 0.5,
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: true
//                 }
//             });

//             // Individual text elements for more dynamic effect
//             gsap.to(".text-uiux", {
//                 x: -150,
//                 y: -50,
//                 rotation: -15,
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: 1,
//                 }
//             });

//             gsap.to(".designer-wrapper", {
//                 x: 150,
//                 y: -80,
//                 rotation: 15,
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: 1,
//                 }
//             });

//             gsap.to(".text-ampersand", {
//                 rotation: 180,
//                 scale: 1.2,
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: 1,
//                 }
//             });

//             gsap.to(".frontend-wrapper", {
//                 x: -120,
//                 y: 50,
//                 rotation: -20,
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: 1,
//                 }
//             });

//             gsap.to(".text-developer", {
//                 x: 120,
//                 y: 80,
//                 rotation: 20,
//                 scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: 1,
//                 }
//             });

//             // Floating Elements Parallax (Targets the wrappers)
//             gsap.to(".floating-ribbon", {
//                 y: -200,
//                 rotate: 45,
//                 scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
//             });
//             gsap.to(".floating-heart", {
//                 y: -150,
//                 scale: 1.1,
//                 scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 2 }
//             });
//             gsap.to(".floating-flower", {
//                 y: -100,
//                 rotate: -30,
//                 scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.2 }
//             });
//             gsap.to(".floating-cherry", {
//                 y: -180,
//                 rotate: 20,
//                 scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.8 }
//             });
//             gsap.to(".floating-butterfly", {
//                 y: -250,
//                 x: 50,
//                 rotate: 15,
//                 scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 2.5 }
//             });

//             // Continuous rotation for inline flower
//             gsap.to(".floating-wrapper.inline-flower .floating-item", {
//                 rotation: 360,
//                 duration: 8,
//                 repeat: -1,
//                 ease: "linear"
//             });

//             // Hover Effects for floating elements (Targets the images)
//             const floatingItems = document.querySelectorAll('.floating-item');
//             const getRotation = (el) => gsap.getProperty(el, "rotation");

//             floatingItems.forEach((el) => {
//                 const isInline = el.parentElement?.classList.contains('inline-flower');

//                 // Skip hover effects for the continuously rotating flower
//                 if (isInline) return;

//                 el.addEventListener('mouseenter', () => {
//                     gsap.to(el, { scale: 1.2, rotation: 10, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
//                 });
//                 el.addEventListener('mouseleave', () => {
//                     gsap.to(el, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' });
//                 });
//             });

//         }, containerRef);

//         return () => ctx.revert();
//     }, []);

//     return (
//         <div className="home-container" id="home" ref={containerRef}>
//             {/* Floating Elements (Wrappers for Parallax, Images for Hover) */}
//             <div className="floating-wrapper floating-ribbon">
//                 <img src={ribbon} alt="ribbon" className="floating-item" />
//             </div>
//             <div className="floating-wrapper floating-heart">
//                 <img src={heart} alt="heart" className="floating-item" />
//             </div>
//             {/* Flower moved to text */}
//             <div className="floating-wrapper floating-cherry">
//                 <img src={cherry} alt="cherry" className="floating-item" />
//             </div>
//             <div className="floating-wrapper floating-butterfly">
//                 <img src={butterfly} alt="butterfly" className="floating-item" />
//             </div>

//             <div className="hero-content">
//                 <div className="top-row">
//                     <h1 className="text-uiux">
//                         {"UI/UX".split("").map((c, i) => (
//                             <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
//                         ))}
//                     </h1>
//                     <div className="designer-wrapper">
//                         <h1 className="text-designer">
//                             {"DESIGNER".split("").map((c, i) => (
//                                 <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
//                             ))}
//                         </h1>
//                         <div className="selection-box designer-box">
//                             <div className="handle tl"></div>
//                             <div className="handle tr"></div>
//                             <div className="handle bl"></div>
//                             <div className="handle br"></div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="middle-row">
//                     <h1 className="text-ampersand">
//                         {"&".split("").map((c, i) => (
//                             <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
//                         ))}
//                     </h1>
//                 </div>

//                 <div className="bottom-row">
//                     <div className="frontend-wrapper">
//                         <h1 className="text-frontend-fullstack">
//                             {"FULLSTACK".split("").map((c, i) => (
//                                 <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
//                             ))}
//                         </h1>
//                         <div className="selection-box frontend-box">
//                             <div className="handle tl"></div>
//                             <div className="handle tr"></div>
//                             <div className="handle bl"></div>
//                             <div className="handle br"></div>
//                         </div>
//                     </div>
//                     <h1 className="text-developer" style={{ width: "96rem" }}>
//                         {"DEVELOPER".split("").map((c, i) => {
//                             if (c === "O") {
//                                 return (
//                                     <div key={i} className="floating-wrapper inline-flower" style={{ display: 'inline-block' }}>
//                                         <img src={flower} alt="O" className="floating-item" />
//                                     </div>
//                                 );
//                             }
//                             return <span key={i} className="char" style={{ display: "inline-block" }}>{c}</span>
//                         })}
//                     </h1>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === ENTRANCE ANIMATION ===
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Reveal UI/UX
      tl.from('.text-uiux .char', {
        y: 150,
        opacity: 0,
        rotateX: -90,
        stagger: 0.03,
        duration: 1.2,
        ease: 'power4.out'
      })
      // Reveal DESIGNER
      .from('.text-designer .char', {
        y: 150,
        opacity: 0,
        rotateX: -90,
        stagger: 0.03,
        duration: 1.2,
        ease: 'power4.out'
      }, '-=0.8')
      // Reveal Ampersand
      .from('.ampersand-symbol', {
        scale: 0,
        opacity: 0,
        rotation: 360,
        duration: 1,
        ease: 'back.out(1.7)'
      }, '-=0.6')
      // Reveal FULLSTACK
      .from('.text-fullstack .char', {
        y: 150,
        opacity: 0,
        rotateX: -90,
        stagger: 0.03,
        duration: 1.2,
        ease: 'power4.out'
      }, '-=0.5')
      // Reveal DEVELOPER
      .from('.text-developer .char', {
        y: 150,
        opacity: 0,
        rotateX: -90,
        stagger: 0.03,
        duration: 1.2,
        ease: 'power4.out'
      }, '-=0.8')
      // Reveal scroll indicator
      .from('.scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.3');

      // === SCROLL PARALLAX ===
      gsap.to('.line-top', {
        x: -100,
        y: -50,
        rotation: -3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to('.line-bottom', {
        x: 100,
        y: 50,
        rotation: 3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to('.ampersand-symbol', {
        rotation: 180,
        scale: 1.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // === FLOATING ORBS ===
      gsap.to('.orb-1', {
        y: -40,
        x: 30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.orb-2', {
        y: 50,
        x: -40,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.orb-3', {
        y: -30,
        x: -20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // === HOVER EFFECTS ===
      const textElements = document.querySelectorAll('.text-uiux, .text-designer, .text-fullstack, .text-developer');
      textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      // === AMPERSAND MAGNETIC EFFECT ===
      const ampersand = document.querySelector('.ampersand-symbol');
      ampersand.addEventListener('mousemove', (e) => {
        const rect = ampersand.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(ampersand, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3
        });
      });

      ampersand.addEventListener('mouseleave', () => {
        gsap.to(ampersand, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="home-clean" id="home" ref={containerRef}>
      {/* Floating Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Main Content */}
      <section className="hero-clean">
        <div className="hero-text">
          {/* Top Line */}
          <div className="line-top">
            <h1 className="text-uiux">{splitText('UI/UX')}</h1>
            <h1 className="text-designer">{splitText('DESIGNER')}</h1>
          </div>

          {/* Ampersand */}
          <div className="ampersand-symbol">&</div>

          {/* Bottom Line */}
          <div className="line-bottom">
            <h1 className="text-fullstack">{splitText('FULLSTACK')}</h1>
            <h1 className="text-developer">{splitText('DEVELOPER')}</h1>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-bar" />
          <span>SCROLL</span>
        </div>
      </section>
    </div>
  );
}