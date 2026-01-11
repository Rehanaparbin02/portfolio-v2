import { useLayoutEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    rotationAmount = 0,
    blurAmount = 0,
    onStackComplete
}) => {
    const scrollerRef = useRef(null);
    const stackCompletedRef = useRef(false);
    const cardsRef = useRef([]);
    const cardPositionsRef = useRef([]); // Cache initial positions
    const lastTransformsRef = useRef(new Map());
    const tickingRef = useRef(false);

    const parsePercentage = useCallback((value, containerHeight) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }, []);

    const calculateProgress = useCallback((scrollTop, start, end) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    // Cache card positions to avoid recalculating on every scroll
    const cacheCardPositions = useCallback(() => {
        const positions = cardsRef.current.map((card) => {
            if (!card) return 0;
            const rect = card.getBoundingClientRect();
            return rect.top + window.scrollY;
        });
        cardPositionsRef.current = positions;
    }, []);

    const updateTransforms = useCallback(() => {
        if (!cardsRef.current.length || !cardPositionsRef.current.length) return;

        const scrollTop = window.scrollY;
        const containerHeight = window.innerHeight;
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const endElement = document.querySelector('.scroll-stack-end');
        const endElementTop = endElement
            ? endElement.getBoundingClientRect().top + scrollTop
            : 0;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            // Use cached position instead of recalculating
            const cardTop = cardPositionsRef.current[i];

            const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = triggerStart;
            const pinEnd = endElementTop - (containerHeight / 2);

            // Calculate scale
            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + (i * itemScale);
            const scale = Math.max(0.3, 1 - (scaleProgress * (1 - targetScale)));

            // Calculate rotation
            const rotation = rotationAmount ? (i * rotationAmount * scaleProgress) : 0;

            // Calculate blur - simplified to avoid nested loops
            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cardPositionsRef.current.length; j++) {
                    const jCardTop = cardPositionsRef.current[j];
                    const jTriggerStart = jCardTop - stackPositionPx - (itemStackDistance * j);
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }
                if (i < topCardIndex) {
                    blur = Math.max(0, (topCardIndex - i) * blurAmount);
                }
            }

            // Calculate translateY
            let translateY = 0;
            if (scrollTop >= pinStart && scrollTop <= pinEnd) {
                translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = lastTransformsRef.current.get(i);
            // Reduced threshold for smoother updates
            const hasChanged = !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.5 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.002 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transformStr = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filterStr = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : 'none';

                card.style.transform = transformStr;
                card.style.filter = filterStr;

                lastTransformsRef.current.set(i, newTransform);
            }

            // Stack complete callback
            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        tickingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        onStackComplete,
        calculateProgress,
        parsePercentage
    ]);

    const requestTick = useCallback(() => {
        if (!tickingRef.current) {
            tickingRef.current = true;
            requestAnimationFrame(updateTransforms);
        }
    }, [updateTransforms]);

    useLayoutEffect(() => {
        const cards = Array.from(document.querySelectorAll('.scroll-stack-card'));
        cardsRef.current = cards;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translate3d(0, 0, 0)';
        });

        // Cache initial positions
        cacheCardPositions();

        // Initial calculation
        updateTransforms();

        // Listen to scroll
        window.addEventListener('scroll', requestTick, { passive: true });

        // Recalculate positions on resize
        const handleResize = () => {
            cacheCardPositions();
            requestTick();
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', requestTick);
            window.removeEventListener('resize', handleResize);
            cardsRef.current = [];
            cardPositionsRef.current = [];
            lastTransformsRef.current.clear();
            stackCompletedRef.current = false;
            tickingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        onStackComplete,
        updateTransforms,
        requestTick,
        cacheCardPositions
    ]);

    return (
        <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
            <div className="scroll-stack-inner">
                {children}
                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;