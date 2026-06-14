import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies } from '../data/portfolio';
import { triggerAchievement } from './AchievementToast';
import { playNavigateSound, playHoverSound } from '../utils/sounds';

export const CaseStudyTheater = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [triggered, setTriggered] = useState(false);

    const handleSelect = useCallback((index) => {
        if (index === activeIndex) return;
        playNavigateSound();
        setActiveIndex(index);
        if (!triggered) {
            triggerAchievement("Theater Mode Activated");
            setTriggered(true);
        }
    }, [activeIndex, triggered]);

    // Keyboard support
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleSelect(activeIndex === caseStudies.length - 1 ? 0 : activeIndex + 1);
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleSelect(activeIndex === 0 ? caseStudies.length - 1 : activeIndex - 1);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [activeIndex, handleSelect]);

    const activeCase = caseStudies[activeIndex];

    return (
        <section id="case-studies" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
                className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div>
                    <span className="inline-block px-3 py-1 bg-acidGreen/10 border border-acidGreen/30 text-acidGreen text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Level 04</span>
                    <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight">
                        Case Study <span className="text-acidGreen">Theater</span>
                    </h2>
                    <p className="text-neutral-500 mt-4 max-w-xl text-base">Analytical breakdowns of product thinking. Navigate the terminal below.</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
                {/* Left Pane - Directory List */}
                <div className="lg:col-span-4 flex flex-col gap-3 h-[300px] lg:h-full overflow-y-auto scrollbar-hide pr-2">
                    {caseStudies.map((study, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <motion.button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                onMouseEnter={playHoverSound}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`text-left w-full p-5 rounded-lg border transition-all duration-300 relative overflow-hidden group ${
                                    isActive 
                                    ? 'bg-acidGreen/10 border-acidGreen shadow-[0_0_15px_rgba(182,255,0,0.1)]' 
                                    : 'bg-[#080808] border-neutral-800 hover:border-neutral-600'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs font-mono tracking-widest ${isActive ? 'text-acidGreen' : 'text-neutral-600'}`}>
                                        INDEX_{String(idx + 1).padStart(2, '0')}
                                    </span>
                                    {isActive && (
                                        <span className="w-2 h-2 rounded-full bg-acidGreen animate-pulse shadow-[0_0_8px_#B6FF00]" />
                                    )}
                                </div>
                                <h3 className={`text-xl font-heading font-bold mb-2 ${isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                    {study.name}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {study.tags.slice(0, 2).map((tag, tIdx) => (
                                        <span key={tIdx} className={`text-[10px] font-mono px-2 py-1 rounded-sm border ${
                                            isActive ? 'border-acidGreen/30 text-acidGreen/80' : 'border-neutral-800 text-neutral-500'
                                        }`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeIndicator"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-acidGreen"
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Right Pane - Detail View */}
                <div className="lg:col-span-8 bg-[#050505] border border-neutral-800 rounded-xl relative overflow-hidden flex flex-col h-[500px] lg:h-full">
                    {/* Terminal Header */}
                    <div className="border-b border-neutral-800 bg-neutral-900/50 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-xs font-mono text-neutral-500">viewer.exe - {activeCase.name.replace(/\s+/g, '_').toLowerCase()}.dat</span>
                        </div>
                        <span className="text-acidGreen text-xs font-mono animate-pulse">STATUS: DECRYPTED</span>
                    </div>

                    {/* Data Content */}
                    <div className="p-8 flex-1 overflow-y-auto relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-10"
                            >
                                {/* Target Identification */}
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-white mb-4 drop-shadow-md">
                                        {activeCase.name}
                                    </h1>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {activeCase.tags.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-mono uppercase tracking-widest rounded-full">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Analysis Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neutral-800 via-neutral-800/50 to-transparent hidden md:block" />
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-neonOrange font-mono text-sm tracking-widest uppercase">
                                            <span className="text-neonOrange">01_</span>
                                            <span>The Problem</span>
                                        </div>
                                        <p className="text-neutral-300 leading-relaxed text-lg font-medium">
                                            {activeCase.problem}
                                        </p>
                                    </div>

                                    <div className="space-y-4 md:pl-4">
                                        <div className="flex items-center gap-2 text-electricBlue font-mono text-sm tracking-widest uppercase">
                                            <span className="text-electricBlue">02_</span>
                                            <span>Product Move</span>
                                        </div>
                                        <p className="text-neutral-300 leading-relaxed text-lg font-medium">
                                            {activeCase.action}
                                        </p>
                                    </div>
                                </div>

                                {/* Impact Banner */}
                                <div className="mt-8 p-6 bg-acidGreen/5 border border-acidGreen/20 rounded-lg relative overflow-hidden">
                                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-acidGreen/10 rounded-full blur-3xl pointer-events-none" />
                                    <div className="flex items-center gap-2 text-acidGreen font-mono text-sm tracking-widest uppercase mb-3">
                                        <span className="animate-pulse">▶</span>
                                        <span>Estimated Impact</span>
                                    </div>
                                    <p className="text-white text-xl md:text-2xl font-heading font-medium leading-tight relative z-10">
                                        "{activeCase.impact}"
                                    </p>
                                </div>

                                {/* Action Button */}
                                <div className="mt-8 pt-4 flex justify-end relative z-50">
                                    <a 
                                        href={activeCase.link || "#"} 
                                        target={activeCase.link ? "_blank" : "_self"}
                                        rel="noreferrer"
                                        onMouseEnter={playHoverSound}
                                        onClick={(e) => {
                                            playClickSound();
                                            if (!activeCase.link) {
                                                e.preventDefault();
                                                alert("Link coming soon!");
                                            }
                                        }}
                                        className="group flex items-center gap-3 px-6 py-3 bg-[#080808] border-2 transition-all duration-300 rounded-sm font-mono text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(182,255,0,0.2)] hover:shadow-[0_0_30px_rgba(182,255,0,0.6)] hover:bg-[#B6FF00]"
                                        style={{ borderColor: '#B6FF00' }}
                                    >
                                        <span className="text-[#B6FF00] group-hover:text-black font-bold">Access Data Core</span>
                                        <span className="text-[#B6FF00] group-hover:text-black group-hover:translate-x-1 transition-transform font-bold">→</span>
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Scanline overlay for the terminal */}
                    <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
                </div>
            </div>
        </section>
    );
};
