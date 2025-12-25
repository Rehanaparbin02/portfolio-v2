import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HamburgerMenu.css';

gsap.registerPlugin(ScrollTrigger);

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Close menu when route changes
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        // Hide/Show on scroll
        const showAnim = gsap.from('.hamburger-btn', {
            yPercent: -100,
            paused: true,
            duration: 0.2
        }).progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse();
            }
        });

        if (isOpen) {
            // Animate menu overlay with slide + scale effect
            gsap.fromTo('.menu-overlay',
                {
                    x: '100%',
                    opacity: 0,
                    scale: 0.95,
                },
                {
                    x: '0%',
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                }
            );

            // Stagger animate menu items with rotation
            gsap.fromTo(
                '.menu-item',
                {
                    opacity: 0,
                    x: 60,
                    rotationY: 20,
                },
                {
                    opacity: 1,
                    x: 0,
                    rotationY: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    delay: 0.3,
                    ease: 'back.out(1.2)',
                }
            );
        } else {
            // Slide out to the right with fade
            gsap.to('.menu-overlay', {
                x: '100%',
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                ease: 'power3.in',
            });

            // Quick fade out of menu items
            gsap.to('.menu-item', {
                opacity: 0,
                x: 30,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in',
            });
        }
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Hamburger Button */}
            <button
                className={`hamburger-btn ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className="line line-1"></span>
                <span className="line line-2"></span>
            </button>

            {/* Menu Overlay */}
            <div className="menu-overlay">
                <div className="menu-container">
                    {/* Main Navigation */}
                    <nav className="menu-nav" style={{ position: 'relative', top: '3rem' }}>
                        <div className="menu-links-section">
                            <ul className="menu-links">
                                <li className="menu-item">
                                    <Link to="/" onClick={toggleMenu}>
                                        <span className="link-number">01</span>
                                        <span className="link-text">Home</span>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/about" onClick={toggleMenu}>
                                        <span className="link-number">02</span>
                                        <span className="link-text">About</span>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <a href="/#work" onClick={toggleMenu}>
                                        <span className="link-number">03</span>
                                        <span className="link-text">Work</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#contact" onClick={toggleMenu}>
                                        <span className="link-number">04</span>
                                        <span className="link-text">Contact</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
