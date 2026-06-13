import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to merge tailwind classes
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const GlassCard = ({ children, className, glowColor = "rgba(249, 115, 22, 0.5)", noTilt = false }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for the glow effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Physics for 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        
        // Calculate for glow
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);

        // Calculate for 3D tilt
        if (!noTilt) {
            const width = rect.width;
            const height = rect.height;
            const mouseXPos = e.clientX - rect.left;
            const mouseYPos = e.clientY - rect.top;

            const xPct = mouseXPos / width - 0.5;
            const yPct = mouseYPos / height - 0.5;

            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!noTilt) {
            x.set(0);
            y.set(0);
        }
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: noTilt ? 0 : rotateX,
                rotateY: noTilt ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "relative flex flex-col group overflow-hidden rounded-3xl",
                "bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
                "transition-colors duration-500",
                className
            )}
        >
            {/* Spotlight Glow Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([currentX, currentY]) => `radial-gradient(600px circle at ${currentX}px ${currentY}px, ${glowColor}, transparent 40%)`
                    )
                }}
            />
            
            {/* Content Container (elevated to pop slightly in 3D) */}
            <div style={{ transform: noTilt ? "none" : "translateZ(20px)" }} className="relative z-10 flex flex-col h-full w-full">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
