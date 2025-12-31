import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';
import starIcon from '../../assets/star.png';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const starRef = useRef(null); // New ref for independent rotation
    const followerRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const star = starRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower || !star) return;

        // Center the anchor point
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        // Continuous rotation applied SEPARATELY to the inner image
        // This avoids conflicts with the quickTo x/y transforms on the parent
        gsap.to(star, { rotation: 360, duration: 12, repeat: -1, ease: "linear" });

        // GSAP QuickTo for ultra-smooth movement on the parent cursor
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

        const followerXTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3.out" });
        const followerYTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3.out" });

        const createGlitter = (x, y) => {
            const particle = document.createElement('div');
            particle.classList.add('glitter-particle');
            document.body.appendChild(particle);

            // Size: 5px to 20px
            const size = Math.random() * 15 + 5;

            // Initial Random Rotation
            const rotation = Math.random() * 360;

            // Set initial state
            gsap.set(particle, {
                x: x,
                y: y,
                width: size,
                height: size,
                rotation: rotation,
                opacity: 0,
                scale: 0
            });

            // Animate
            const tl = gsap.timeline({
                onComplete: () => {
                    particle.remove();
                }
            });

            tl.to(particle, {
                opacity: 1,
                scale: 1,
                duration: 0.15,
                ease: "power2.out"
            })
                .to(particle, {
                    x: x + (Math.random() - 0.5) * 40,
                    y: y + (Math.random() - 0.5) * 40,
                    rotation: rotation + 180,
                    scale: 0,
                    opacity: 0,
                    duration: 0.5 + Math.random() * 0.5,
                    ease: "power2.in"
                });
        };

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            mousePos.current = { x: clientX, y: clientY };

            // Show cursor on first move
            if (cursor.style.opacity === "0" || !cursor.style.opacity) {
                gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
            }

            xTo(clientX);
            yTo(clientY);
            followerXTo(clientX);
            followerYTo(clientY);

            // Create glitter trail (throttle slightly if needed, but modern browsers handle this okay)
            if (Math.random() > 0.72) { // 8% chance per frame to make it very sparse
                createGlitter(clientX, clientY);
            }
        };

        const onMouseDown = () => {
            gsap.to(cursor, { scale: 0.8, duration: 0.15, ease: "power2.out" });
            gsap.to(follower, { scale: 1.2, duration: 0.15, ease: "power2.out" });
        };

        const onMouseUp = () => {
            gsap.to(cursor, { scale: isHovering.current ? 1.5 : 1, duration: 0.15, ease: "back.out(1.7)" });
            gsap.to(follower, { scale: isHovering.current ? 1.8 : 1, duration: 0.15, ease: "back.out(1.7)" });
        };

        const onMouseEnterLink = () => {
            isHovering.current = true;
            gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "back.out(2)" });
            gsap.to(follower, { opacity: 0, duration: 0.2 });
        };

        const onMouseLeaveLink = () => {
            isHovering.current = false;
            gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(follower, { opacity: 1, duration: 0.2 });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        const attachListeners = (elements) => {
            elements.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnterLink);
                el.addEventListener('mouseleave', onMouseLeaveLink);
            });
        };

        const links = document.querySelectorAll('a, button, .cursor-pointer, input, label');
        attachListeners(links);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const elements = node.querySelectorAll('a, button, .cursor-pointer, input, label');
                        attachListeners(elements);
                        if (node.matches?.('a, button, .cursor-pointer, input, label')) {
                            attachListeners([node]);
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
            observer.disconnect();
            links.forEach((link) => {
                link.removeEventListener('mouseenter', onMouseEnterLink);
                link.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    return (
        <div className="custom-cursor-wrapper">
            {/* Background Glow Follower */}
            <div
                ref={followerRef}
                className="cursor-follower-glow"
            />

            {/* Main Star Cursor */}
            <div ref={cursorRef} className="cursor-star">
                {/* Apply ref to image for independent rotation */}
                <img ref={starRef} src={starIcon} alt="cursor" className="star-icon" />
            </div>
        </div>
    );
};

export default CustomCursor;