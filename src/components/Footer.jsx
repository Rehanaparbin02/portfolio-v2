import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const contentRef = useRef(null);
    // const [time, setTime] = useState('');

    useEffect(() => {
        // const updateTime = () => {
        //     const now = new Date();
        //     const timeString = now.toLocaleTimeString('en-US', {
        //         hour: '2-digit',
        //         minute: '2-digit',
        //         hour12: true,
        //         timeZoneName: 'short'
        //     });
        //     // setTime(timeString);
        // };

        //  const interval = setInterval(updateTime, 1000);

        // GSAP Animations
        const ctx = gsap.context(() => {
            // Uncover Reveal Effect
            // Uncover Reveal Effect
            gsap.from(contentRef.current, {
                yPercent: -50,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true
                }
            });

            // Main Timeline for progressive reveal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(footerRef.current,
                { clipPath: "inset(20% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }
            )
                .from(".footer-marquee-section", {
                    y: 150,
                    skewY: 5,
                    opacity: 0,
                    duration: 1.2,
                    ease: "expo.out"
                }, "-=0.8")
                .from(".footer-col", {
                    y: 60,
                    skewX: -5,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power4.out"
                }, "-=0.6")
                .from(".footer-links li", {
                    x: -20,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power2.out"
                }, "-=0.4")
                .from(".footer-contact-item", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }, "-=0.6")
                .from(".footer-bottom", {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.8");

            // Float animation for background blobs
            gsap.to(".blob-1", {
                x: 150,
                y: 80,
                scale: 1.2,
                duration: 12,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(".blob-2", {
                x: -150,
                y: -80,
                scale: 0.8,
                duration: 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            tl.from(".footer-blob", {
                scale: 0,
                opacity: 0,
                duration: 2,
                stagger: 0.5,
                ease: "expo.out"
            }, 0);
        }, footerRef);

        return () => {
            // clearInterval(interval);
            ctx.revert();
        };
    }, []);

    return (
        <footer className="footer-section" id="contact" ref={footerRef}>
            <div className="footer-blobs">
                <div className="footer-blob blob-1"></div>
                <div className="footer-blob blob-2"></div>
            </div>

            <div ref={contentRef}>
                <div className="footer-marquee-section">
                    <div className="marquee-container">
                        <div className="marquee-track">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="marquee-item">
                                    <a href="mailto:rehanaparbin0210@gmail.com">
                                        Let's talk <span className="arrow">↗</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-container">
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
                                <li><a href="https://linkedin.com/in/rehanaparbin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                <li><a href="https://github.com/rehanaparbin" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                                {/* <li><a href="/" target="_blank" rel="noopener noreferrer">Portfolio</a></li> */}
                            </ul>
                        </div>

                        <div className="footer-col">
                            {/* <h4 className="footer-col-title">Local Time</h4>
                            <div className="footer-contact-item current-time">{time}</div> */}
                            <h4 className="footer-col-title contact-title">Contact</h4>
                            <a href="mailto:rehanaparbin0210@gmail.com" className="footer-contact-item email">rehanaparbin0210@gmail.com</a>
                            <a href="tel:+918638401703" className="footer-contact-item phone">+91 8638401703</a>
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
            </div>
        </footer>
    );
}
