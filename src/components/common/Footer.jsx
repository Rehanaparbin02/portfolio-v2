import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

import Logo from './Logo';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const ctaRef = useRef(null);
    const contentRef = useRef(null);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero CTA Animation
            gsap.from(".footer-cta-title span", {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 80%",
                }
            });

            // Parallax on CTA
            gsap.to(".footer-cta-title", {
                y: -50,
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Reveal Animation for columns
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".footer-main-new",
                    start: "top 85%",
                }
            });

            tl.from(".footer-col-new", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            })
                .from(".footer-bottom-new", {
                    opacity: 0,
                    y: 20,
                    duration: 0.8
                }, "-=0.4");

            // Magnetic effect for social links
            const links = document.querySelectorAll('.social-link-new');
            links.forEach(link => {
                link.addEventListener('mousemove', (e) => {
                    const rect = link.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(link, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.4
                    });
                });
                link.addEventListener('mouseleave', () => {
                    gsap.to(link, { x: 0, y: 0, duration: 0.4 });
                });
            });

            // Gradient follow effect
            const footer = footerRef.current;
            footer.addEventListener('mousemove', (e) => {
                const rect = footer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                gsap.to(".footer-cursor-glow", {
                    x: x,
                    y: y,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer-new" id="contact" ref={footerRef}>
            <div className="footer-cursor-glow"></div>

            <div className="footer-cta-section" ref={ctaRef}>
                <div className="footer-cta-container">
                    <div className="footer-label-new">MY COMMITMENT</div>
                    <h2 className="footer-cta-title">
                        <span>BEYOND</span> <span>ALL</span> <span>LIMITS</span> <br />
                        <span className="text-outline">FULL POTENTIAL</span>
                    </h2>
                    <div className="footer-cta-btn-wrap">
                        <a href="mailto:rehanaparbin0210@gmail.com" className="footer-primary-btn">
                            START A PROJECT
                            <span className="btn-arrow">→</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-content-new" ref={contentRef}>
                <div className="footer-container-new">
                    <div className="footer-main-new">
                        <div className="footer-col-new brand-info" style={{ position: 'relative', top: '-1.5rem' }}>
                            <Link to="/" onClick={scrollToTop} className="footer-logo-link">
                                <Logo className="footer-logo-svg" style={{ width: '80px', height: 'auto', borderRadius: '4px' }} />
                            </Link>
                            <p className="footer-description-new">
                                Specializing in creating high-performance digital products and immersive user experiences with a focus on modern aesthetics and functional precision.
                            </p>
                            <div className="footer-availability">
                                <span className="availability-dot"></span>
                                Available for freelance & full-time roles
                            </div>
                        </div>

                        <div className="footer-col-new">
                            <h4 className="footer-col-label">EXPLORE</h4>
                            <nav className="footer-nav-new">
                                <Link to="/" onClick={scrollToTop}>Home</Link>
                                <Link to="/about" onClick={scrollToTop}>About</Link>
                                <Link to="/projects" onClick={scrollToTop}>Projects</Link>
                                <Link to="/contact" onClick={scrollToTop}>Contact</Link>
                            </nav>
                        </div>

                        <div className="footer-col-new">
                            <h4 className="footer-col-label">CONNECT</h4>
                            <div className="footer-social-new">
                                <a href="https://www.linkedin.com/in/rehanaparbin1002/" target="_blank" rel="noopener noreferrer" className="social-link-new">LinkedIn</a>
                                <a href="https://github.com/Rehanaparbin02" target="_blank" rel="noopener noreferrer" className="social-link-new">GitHub</a>
                                <a href="https://www.instagram.com/_rehana_02_?igsh=am9wejVtYmhzOXpl" target="_blank" rel="noopener noreferrer" className="social-link-new">Instagram</a>
                            </div>
                        </div>

                        <div className="footer-col-new contact-direct">
                            <h4 className="footer-col-label">GET IN TOUCH</h4>
                            <a href="mailto:rehanaparbin0210@gmail.com" className="footer-email-link">
                                rehanaparbin0210@gmail.com
                            </a>
                            <p className="footer-phone">+91 8638401703</p>
                        </div>
                    </div>

                    <div className="footer-bottom-new">
                        <div className="footer-bottom-left">
                            <span className="copyright-new">© {new Date().getFullYear()} REHANA PARBIN</span>
                            <span className="footer-separator">•</span>
                            <span className="footer-location-new">BASED IN INDIA</span>
                        </div>

                        <div className="footer-time-section">
                            <span className="time-label">LOCAL TIME (IST):</span>
                            <span className="time-value">{formatTime(time)}</span>
                        </div>

                        <div className="footer-bottom-right">
                            <button className="back-to-top-new" onClick={scrollToTop}>
                                BACK TO TOP <span className="top-arrow">↑</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-noise-overlay"></div>
        </footer>
    );
}