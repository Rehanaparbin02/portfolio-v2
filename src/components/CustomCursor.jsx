import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const trailRefs = useRef([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const trails = trailRefs.current;

        if (!cursor || !follower) return;

        // GSAP QuickTo for ultra-smooth movement
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

        const followerXTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3.out" });
        const followerYTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3.out" });

        // Trail quickSetters
        const trailQuickTo = trails.map((trail, i) => ({
            x: gsap.quickTo(trail, "x", { duration: 0.15 + i * 0.1, ease: "power2.out" }),
            y: gsap.quickTo(trail, "y", { duration: 0.15 + i * 0.1, ease: "power2.out" })
        }));

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            mousePos.current = { x: clientX, y: clientY };

            // Show cursor on first move
            if (cursor.style.opacity === "0" || !cursor.style.opacity) {
                gsap.to([cursor, follower, trails], { opacity: 1, duration: 0.3 });
            }

            xTo(clientX);
            yTo(clientY);
            followerXTo(clientX);
            followerYTo(clientY);

            trailQuickTo.forEach(t => {
                t.x(clientX);
                t.y(clientY);
            });
        };

        const onMouseDown = () => {
            gsap.to(cursor, { scale: 0.7, duration: 0.2 });
            gsap.to(follower, { scale: 0.8, duration: 0.2 });
        };

        const onMouseUp = () => {
            gsap.to(cursor, { scale: isHovering.current ? 1.5 : 1, duration: 0.2 });
            gsap.to(follower, { scale: isHovering.current ? 2 : 1, duration: 0.2 });
        };

        const onMouseEnterLink = () => {
            isHovering.current = true;
            gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "back.out(1.7)" });
            gsap.to(follower, { scale: 2, duration: 0.3, ease: "back.out(1.7)", borderColor: "rgba(255,255,255,0.8)" });
            gsap.to(trails, { opacity: 0, duration: 0.2 });
        };

        const onMouseLeaveLink = () => {
            isHovering.current = false;
            gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(follower, { scale: 1, duration: 0.3, ease: "power2.out", borderColor: "rgba(255,255,255,0.4)" });
            gsap.to(trails, { opacity: 1, duration: 0.3, stagger: 0.05 });
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
            {/* Trail Elements */}
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    ref={el => trailRefs.current[i] = el}
                    className="cursor-trail"
                    style={{
                        zIndex: 9998 - i,
                        opacity: 0.3 - i * 0.1
                    }}
                />
            ))}

            {/* Main Follower Ring */}
            <div
                ref={followerRef}
                className="cursor-follower-ring"
            />

            {/* Core Dot Cursor */}
            <div
                ref={cursorRef}
                className="cursor-core-dot"
            />
        </div>
    );
};

export default CustomCursor;