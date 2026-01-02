import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-line', {
        y: 200,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2
      })
      .from('.nav-item, .footer-item', {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.8
      }, '-=0.5');

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
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
