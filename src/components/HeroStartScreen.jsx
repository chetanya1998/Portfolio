import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

const TerminalLine = ({ text, delay, color = "#FF6A00" }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!visible) return null;
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-sm md:text-base"
            style={{ color }}
        >
            <span className="text-neutral-500 mr-2">{'>'}</span>
            {text}
        </motion.div>
    );
};

const TypewriterText = ({ text }) => {
    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 1 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.05
                    }
                }
            }}
            className="inline-block"
        >
            {text && typeof text === 'string' && text.split('').map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    variants={{
                        hidden: { opacity: 0, display: 'none' },
                        visible: { opacity: 1, display: 'inline' }
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export const HeroStartScreen = ({ onStart }) => {
    const [phase, setPhase] = useState(0); // 0: terminal boot, 1: main content
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setPhase(1), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Allow skip
    useEffect(() => {
        const handleSkip = () => {
            if (phase < 1) setPhase(1);
        };
        window.addEventListener('scroll', handleSkip, { once: true });
        return () => window.removeEventListener('scroll', handleSkip);
    }, [phase]);

    // Rotating roles
    useEffect(() => {
        if (phase < 1) return;
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [phase]);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 px-4">
            
            {/* Terminal Boot Screen */}
            <AnimatePresence>
                {phase === 0 && (
                    <motion.div 
                        key="terminal-boot"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center"
                    >
                        <div className="max-w-lg w-full p-8 space-y-3 terminal-log">
                            <TerminalLine text="Booting Product Quest v2.0..." delay={200} />
                            <TerminalLine text="Loading modules: [AI] [AdTech] [Gaming] [Creator Economy]" delay={600} />
                            <TerminalLine text="Initializing career_data.json..." delay={1000} />
                            <TerminalLine text="Rendering mission map..." delay={1400} />
                            <TerminalLine text="Compiling impact metrics..." delay={1800} />
                            <TerminalLine text="System ready. Welcome, recruiter." delay={2200} color="#B6FF00" />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ delay: 2.4, repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2.5 h-5 bg-neonOrange mt-4"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Hero Content */}
            <motion.div 
                className="max-w-5xl mx-auto text-center w-full z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Name */}
                <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 30 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    <h1 className="text-6xl md:text-9xl font-heading font-black text-white tracking-tighter leading-none">
                        Chetanya
                        <br />
                        <span className="gradient-text">Ved</span>
                        <span className="text-neonOrange">.</span>
                    </h1>
                </motion.div>

                {/* Tagline */}
                <motion.p 
                    className="text-xl md:text-2xl text-neutral-300 mb-2 max-w-3xl mx-auto font-medium tracking-wide leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {personalInfo.tagline}
                </motion.p>
                
                {/* Location */}
                <motion.p
                    className="text-sm md:text-base text-neutral-500 mb-6 font-mono"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    📍 Based in New Delhi, India
                </motion.p>

                {/* Rotating Roles with Typing Animation */}
                <motion.div
                    className="h-10 mb-10 flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={roleIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-neonOrange font-mono text-sm md:text-lg tracking-widest uppercase font-bold flex items-center gap-1"
                        >
                            <TypewriterText text={personalInfo.roles[roleIndex]} />
                            <motion.span 
                                animate={{ opacity: [1, 0] }} 
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2 h-5 bg-neonOrange ml-1"
                            />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.9 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <a 
                        href="#impact" 
                        onClick={onStart} 
                        className="group px-10 py-4 font-heading font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded-sm relative overflow-hidden z-20 shadow-[0_0_30px_rgba(255,106,0,0.6)] border-2 border-[#FF6A00] w-full sm:w-[220px]"
                        style={{ backgroundColor: '#FF6A00' }}
                    >
                        <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300 block text-center">Start Journey</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-neonOrange via-neonPink to-violet opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    </a>
                    <a 
                        href={personalInfo.resumeLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="group px-10 py-4 border-2 border-neutral-700 text-neutral-300 font-mono text-sm hover:text-white hover:border-neonOrange transition-all duration-300 rounded-sm w-full sm:w-[220px]"
                    >
                        <span className="block text-center w-full uppercase tracking-widest">View Resume</span>
                    </a>
                </motion.div>

                {/* Scroll Nudge */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 1 ? 0.6 : 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em]">Scroll to unlock missions</span>
                    <div className="animate-float-arrow text-neonOrange text-lg">↓</div>
                </motion.div>
            </motion.div>
        </section>
    );
};
