import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home({ isLoaded }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('.hero-line',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2 }
      )
        .fromTo('.bg-ampersand',
          { opacity: 0, scale: 0.8, rotate: -5, filter: 'blur(20px)' },
          {
            opacity: 0.6,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            duration: 2,
            ease: 'power3.out'
          },
          '0.3'
        )
        .fromTo('.nav-item, .footer-item',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 },
          '-=0.5'
        );

      // Parallax Marquee effect - Opposing directions
      // Line 1: Moves Right
      gsap.to('.hero-line:first-child', {
        xPercent: 15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Line 2: Moves Left
      gsap.to('.hero-line:last-child', {
        xPercent: -15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Ampersand: Moves slightly up
      gsap.to('.bg-ampersand', {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Mouse follow effect for ampersand
      const handleMouseMove = (e) => {
        const { clientX } = e;
        const { innerWidth } = window;
        const moveX = ((clientX / innerWidth) - 0.5) * 40; // Increased range to -20% to 20% for more visibility

        gsap.to('.bg-ampersand', {
          x: moveX + 'vw',
          duration: 1.5,
          ease: 'power2.out'
        });
      };

      const container = containerRef.current;
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div className="home-bold" id="home" ref={containerRef}>
      <div className="grid-background"></div>

      <header className="top-nav">
        <div className="nav-item">
          <span className="label">BASED IN</span>
          <p>INDIA</p>
        </div>
        <div className="nav-item">
          <span className="label">BUILDING </span>
          <p>CREATIVELY</p>
        </div>
        <div className="nav-item" style={{ position: 'relative', right: '5rem' }}>
          <span className="label">WORK AVAILABILITY</span>
          <p>NOW</p>
        </div>
      </header>

      <main className="hero-bold">
        <div className="hero-text-bold">
          <h1 className="hero-line">UI/UX DESIGNER</h1>
          <div className="bg-ampersand">&</div>
          <h2 className="hero-line">FULLSTACK DEV</h2>
        </div>
      </main>

      <footer className="footer-bold">
        <div className="footer-item">Scroll for more</div>
        <div className="footer-item">cool * site</div>
      </footer>
    </div>
  );
}