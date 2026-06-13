import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlowingCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setHidden(false);
        const handleMouseLeave = () => setHidden(true);

        const handleLinkHoverEvents = () => {
            const interactables = document.querySelectorAll('a, button, [role="button"]');
            interactables.forEach((el) => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
            return interactables;
        };

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        
        // Initial attach
        let interactables = handleLinkHoverEvents();

        // Re-attach on DOM mutations (simplified observer for dynamically added elements)
        const observer = new MutationObserver(() => {
            interactables.forEach(el => {
                el.removeEventListener('mouseenter', () => setIsHovering(true));
                el.removeEventListener('mouseleave', () => setIsHovering(false));
            });
            interactables = handleLinkHoverEvents();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            interactables.forEach((el) => {
                el.removeEventListener('mouseenter', () => setIsHovering(true));
                el.removeEventListener('mouseleave', () => setIsHovering(false));
            });
            observer.disconnect();
        };
    }, []);

    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    if (isMobile()) return null;

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "rgba(249, 115, 22, 0.2)",
            border: "1px solid rgba(249, 115, 22, 0.5)",
            mixBlendMode: "screen"
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            height: 48,
            width: 48,
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            border: "2px solid rgba(249, 115, 22, 1)",
            mixBlendMode: "screen",
            scale: 1.2
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center backdrop-blur-[2px]"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
                style={{
                    opacity: hidden ? 0 : 1
                }}
            >
                {/* Inner dot */}
                <motion.div 
                    className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,1)]"
                    animate={{
                        scale: isHovering ? 0 : 1,
                        opacity: isHovering ? 0 : 1
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
            
            {/* Ambient wide glow behind the cursor */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    opacity: hidden ? 0 : 1
                }}
                transition={{
                    type: "tween",
                    ease: "linear",
                    duration: 0.1
                }}
            />
        </>
    );
};

export default GlowingCursor;
