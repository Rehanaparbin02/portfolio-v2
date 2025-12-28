import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Contact.css';

export default function Contact() {
    const contactRef = useRef(null);
    const formRef = useRef(null);
    const infoRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Entrances
            const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

            tl.from(".contact-heading h1", {
                y: 100,
                opacity: 0,
                skewY: 7,
                stagger: 0.1
            })
                .from(".contact-heading p", {
                    y: 20,
                    opacity: 0,
                }, "-=1.2")
                .from(".detail-item", {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1
                }, "-=1")
                .from(".contact-form-section", {
                    x: 100,
                    opacity: 0,
                    scale: 0.95,
                    duration: 2
                }, "-=1.5");

            // Floating Blobs
            gsap.to(".blob-purple", {
                x: "10%",
                y: "10%",
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(".blob-blue", {
                x: "-10%",
                y: "-10%",
                duration: 25,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, contactRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log("Form submitted");
    };

    return (
        <div className="contact-wrapper" ref={contactRef}>
            <div className="contact-blobs">
                <div className="contact-blob blob-purple"></div>
                <div className="contact-blob blob-blue"></div>
            </div>

            <div className="contact-container">
                <div className="contact-info-section" ref={infoRef}>
                    <div className="contact-heading">
                        <h1>Let's build <br />something <br />great.</h1>
                        <p>Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.</p>
                    </div>

                    <div className="contact-details">
                        <div className="detail-item">
                            <span className="detail-label">Email</span>
                            <a href="mailto:rehanaparbin0210@gmail.com" className="detail-link">rehanaparbin0210@gmail.com</a>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Phone</span>
                            <a href="tel:+918638401703" className="detail-link">+91 8638401703</a>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Social</span>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <a href="https://linkedin.com/in/rehanaparbin" target="_blank" rel="noopener noreferrer" className="detail-link">LinkedIn</a>
                                <a href="https://github.com/rehanaparbin" target="_blank" rel="noopener noreferrer" className="detail-link">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-section" ref={formRef}>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" id="name" className="form-input" placeholder=" " required />
                            <label htmlFor="name" className="form-label">Full Name</label>
                        </div>

                        <div className="form-group">
                            <input type="email" id="email" className="form-input" placeholder=" " required />
                            <label htmlFor="email" className="form-label">Email Address</label>
                        </div>

                        <div className="form-group">
                            <input type="text" id="subject" className="form-input" placeholder=" " required />
                            <label htmlFor="subject" className="form-label">Subject</label>
                        </div>

                        <div className="form-group">
                            <textarea id="message" className="form-input" placeholder=" " required></textarea>
                            <label htmlFor="message" className="form-label">Message</label>
                        </div>

                        <div className="submit-btn-wrapper">
                            <button type="submit" className="submit-btn">
                                Send Message
                                <span className="btn-glow"></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
