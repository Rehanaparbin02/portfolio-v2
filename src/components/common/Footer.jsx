import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    // const marqueeRef = useRef(null);
    const contentRef = useRef(null);
    const bottomRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Reveal Animation for the entire footer section
            gsap.fromTo(footerRef.current,
                { yPercent: 40, autoAlpha: 0 },
                {
                    yPercent: 0,
                    autoAlpha: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom",
                        end: "top 20%",
                        scrub: 1,
                        onEnter: () => ScrollTrigger.refresh()
                    }
                }
            );

            // 2. Parallax effect for the content inside
            gsap.fromTo(contentRef.current,
                { y: -100 },
                {
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: true
                    }
                }
            );

            // 3. Staggered reveal for footer columns and elements
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".footer-main",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(".footer-col", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out"
            })
                .from(".footer-social-tag", {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }, "-=0.5")
                .from(bottomRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5");

            // 4. Marquee Text Reveal - each letter or whole words
            gsap.from(".marquee-item a", {
                duration: 1.5,
                y: 100,
                skewY: 7,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".footer-marquee-section",
                    start: "top 90%",
                }
            });

            // 5. Marquee Text Animation (GSAP)
            gsap.to(".marquee-track", {
                xPercent: -50,
                repeat: -1,
                duration: 40,
                ease: "none"
            });

            // 6. Magnetic effect for social links
            const links = document.querySelectorAll('.footer-link-item');
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, { x: 10, color: '#fff', duration: 0.3 });
                });
                link.addEventListener('mouseleave', () => {
                    gsap.to(link, { x: 0, color: 'rgba(255, 255, 255, 0.6)', duration: 0.3 });
                });
            });

            // Robust Refresh Logic
            ScrollTrigger.refresh();
            const handleLoad = () => ScrollTrigger.refresh();

            if (document.readyState === 'complete') {
                ScrollTrigger.refresh();
            } else {
                window.addEventListener('load', handleLoad);
            }

            // Fallback refresh for layout shifts
            const timeout = setTimeout(() => ScrollTrigger.refresh(), 500);

            return () => {
                window.removeEventListener('load', handleLoad);
                clearTimeout(timeout);
            };

        }, footerRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer-section" id="contact" ref={footerRef}>
            <div className="footer-background">
                <div className="footer-glow glow-1"></div>
                <div className="footer-glow glow-2"></div>
                <div className="footer-noise"></div>
            </div>

            <div className="footer-content" ref={contentRef}>
                {/* <div className="footer-marquee-section" ref={marqueeRef}>
                    <div className="marquee-container">
                        <div className="marquee-track">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="marquee-item">
                                    <a href="mailto:rehanaparbin0210@gmail.com">
                                        Let's talk <span className="arrow">↗</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}

                {/* Big hero text above footer content to create prominent call-to-action and page height */}
                <div className="footer-hero-text" aria-hidden="true">
                    WORKING TO FULL POTENTIAL
                </div>

                <div className="footer-container">
                    <div className="footer-main">
                        <div className="footer-col brand-col">
                            <div className="footer-logo">
                                <h2>REHANA<span>.</span></h2>
                            </div>
                            <p className="footer-bio">
                                Crafting digital experiences that blend aesthetic excellence with functional precision.
                            </p>
                            <div className="footer-status">
                                <span className="status-dot"></span>
                                Available for new opportunities
                            </div>
                        </div>

                        <div className="footer-col menu-col">
                            <h4 className="footer-label">Navigation</h4>
                            <nav className="footer-nav" aria-label="Footer Navigation">
                                <ul>
                                    <li><Link to="/" className="footer-link-item" onClick={scrollToTop}>Home</Link></li>
                                    <li><Link to="/about" className="footer-link-item" onClick={scrollToTop}>About</Link></li>
                                    <li><Link to="/projects" className="footer-link-item" onClick={scrollToTop}>Projects</Link></li>
                                    <li><Link to="/contact" className="footer-link-item" onClick={scrollToTop}>Contact</Link></li>
                                </ul>
                            </nav>
                        </div>



                        <div className="footer-col contact-col">
                            <h4 className="footer-label">Get in Touch</h4>
                            <address className="contact-links">
                                <a href="mailto:rehanaparbin0210@gmail.com" className="contact-main-link" aria-label="Email Rehana">rehanaparbin0210@gmail.com</a>
                                <a href="tel:+918638401703" className="contact-sub-link" aria-label="Call Rehana">+91 8638401703</a>
                            </address>
                            <div className="social-tags-container" role="list">
                                <a href="https://linkedin.com/in/rehanaparbin" target="_blank" rel="noopener noreferrer" className="footer-social-tag" aria-label="Open LinkedIn profile">LinkedIn</a>
                                <a href="https://github.com/rehanaparbin" target="_blank" rel="noopener noreferrer" className="footer-social-tag" aria-label="Open GitHub profile">GitHub</a>
                                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="footer-social-tag" aria-label="Open Instagram profile">Instagram</a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom" ref={bottomRef}>
                        <div className="footer-bottom-info">
                            <span className="copyright">© {new Date().getFullYear()} Rehana Parbin</span>
                            <span className="separator">/</span>
                            <span className="location">Based in India, Available Worldwide</span>
                        </div>
                        <div className="footer-bottom-links">
                            <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">Back to top ↑</button>
                            <span className="designed">Designed with passion</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
