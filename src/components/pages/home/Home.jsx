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

      // Reveal lines with stagger
      tl.from('.hero-line', {
        y: 150,
        opacity: 0,
        rotateX: -20,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power4.out'
      })
      .from('.footer-content', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.5');

      // Parallax effect on scroll
      gsap.to('.hero-line:first-child', {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to('.hero-line:last-child', {
        y: 50,
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
      {/* Grid Background */}
      <div className="grid-background"></div>

      {/* Main Content */}
      <main className="hero-bold">
        <div className="hero-text-bold">
          <h1 className="hero-line">UI/UX DESIGNER</h1>
          <h2 className="hero-line">FULLSTACK DEVELOPER</h2>
        </div>
      </main>

     
    </div>
  );
}