import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const contentRef = useRef(null);
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZoneName: 'short'
            });
            setTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        // GSAP Animations
        const ctx = gsap.context(() => {
            // Uncover Reveal Effect
            gsap.from(contentRef.current, {
                yPercent: -50,
                opacity: 0,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(".footer-cta-eyebrow", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            })
                .from(".footer-cta-title", {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.3")
                .from(".footer-col", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.4")
                .from(".footer-bottom", {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5");

            // Float animation for background blobs
            gsap.to(".blob-1", {
                x: 100,
                y: 50,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(".blob-2", {
                x: -100,
                y: -50,
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, footerRef);

        return () => {
            clearInterval(interval);
            ctx.revert();
        };
    }, []);

    return (
        <footer className="footer-section" id="contact" ref={footerRef}>
            <div className="footer-blobs">
                <div className="footer-blob blob-1"></div>
                <div className="footer-blob blob-2"></div>
            </div>

            <div className="footer-container" ref={contentRef}>
                <div className="footer-top">
                    <span className="footer-cta-eyebrow">Project in mind?</span>
                    <h2 className="footer-cta-title">
                        <a href="mailto:hello@example.com">
                            Let's talk <span className="arrow">↗</span>
                        </a>
                    </h2>
                </div>

                <div className="footer-main">
                    <div className="footer-col">
                        <h4 className="footer-col-title">Navigation</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#work">Work</a></li>
                            <li><a href="#projects">Projects</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">Socials</h4>
                        <ul className="footer-links">
                            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">Local Time</h4>
                        <div className="footer-contact-item current-time">{time}</div>
                        <h4 className="footer-col-title" style={{ marginTop: '2.5rem' }}>Contact</h4>
                        <a href="mailto:hello@example.com" className="footer-contact-item email">hello@example.com</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        © {new Date().getFullYear()} All rights reserved.
                    </div>
                    <div className="footer-credit">
                        Designed & Built by <span>Rehana</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
