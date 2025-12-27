import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Cursor follows mouse exactly
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out',
            });

            // Follower follows mouse with a delay
            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.6,
                ease: 'power3.out',
            });
        };

        const onMouseDown = () => {
            gsap.to([cursor, follower], {
                scale: 0.8,
                duration: 0.2,
            });
        };

        const onMouseUp = () => {
            gsap.to([cursor, follower], {
                scale: 1,
                duration: 0.2,
            });
        };

        const onMouseEnterLink = () => {
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                duration: 0.3,
            });
            gsap.to(follower, {
                scale: 2.5,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                duration: 0.3,
            });
        };

        const onMouseLeaveLink = () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: '#fff',
                duration: 0.3,
            });
            gsap.to(follower, {
                scale: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                duration: 0.3,
            });
        };

        const onMouseEnterWindow = () => {
            gsap.to([cursor, follower], {
                opacity: 1,
                duration: 0.3,
            });
        };

        const onMouseLeaveWindow = () => {
            gsap.to([cursor, follower], {
                opacity: 0,
                duration: 0.3,
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseenter', onMouseEnterWindow);
        window.addEventListener('mouseleave', onMouseLeaveWindow);

        // Initial links in the DOM
        const links = document.querySelectorAll('a, button, .cursor-pointer');
        links.forEach((link) => {
            link.addEventListener('mouseenter', onMouseEnterLink);
            link.addEventListener('mouseleave', onMouseLeaveLink);
        });

        // Handle dynamically added links (if any)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const elements = node.querySelectorAll('a, button, .cursor-pointer');
                        elements.forEach((el) => {
                            el.addEventListener('mouseenter', onMouseEnterLink);
                            el.addEventListener('mouseleave', onMouseLeaveLink);
                        });
                        if (node.tagName === 'A' || node.tagName === 'BUTTON' || node.classList.contains('cursor-pointer')) {
                            node.addEventListener('mouseenter', onMouseEnterLink);
                            node.addEventListener('mouseleave', onMouseLeaveLink);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseenter', onMouseEnterWindow);
            window.removeEventListener('mouseleave', onMouseLeaveWindow);
            observer.disconnect();
            links.forEach((link) => {
                link.removeEventListener('mouseenter', onMouseEnterLink);
                link.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    return (
        <div className="custom-cursor-container">
            <div ref={cursorRef} className="cursor-dot" />
            <div ref={followerRef} className="cursor-follower" />
        </div>
    );
};

export default CustomCursor;
