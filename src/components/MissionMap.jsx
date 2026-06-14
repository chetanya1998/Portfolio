import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { missions } from '../data/portfolio';
import { triggerAchievement } from './AchievementToast';


export const MissionMap = () => {
    const [activeMission, setActiveMission] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (activeMission) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [activeMission]);

    const handleMissionClick = (mission) => {
        setActiveMission(mission);
        triggerAchievement("Mission Brief Accessed");
    };

    const accentColors = ['#FF6A00', '#00D4FF', '#8B5CF6', '#FF2E88', '#B6FF00', '#00D4FF', '#FF6A00', '#8B5CF6'];

    return (
        <section id="work" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-3 py-1 bg-electricBlue/10 border border-electricBlue/30 text-electricBlue text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Level 02</span>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight">
                    Career <span className="text-electricBlue">Mission Map</span>
                </h2>
                <p className="text-neutral-500 mt-4 max-w-xl text-base">Products, systems, and business problems I have worked on.</p>
            </motion.div>

            {/* Current Role Badge */}
            <motion.div 
                className="mb-16 bg-neutral-900/50 border border-electricBlue/20 p-6 rounded-lg max-w-fit glow-blue"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-[10px] text-electricBlue font-mono uppercase tracking-[0.3em] mb-2">Active Assignment</p>
                <p className="text-white font-heading font-bold text-xl">Associate Product Manager — Unibots</p>
                <p className="text-neutral-500 text-sm mt-1 font-mono">Dec 2024 – Present | New Delhi, India</p>
            </motion.div>

            {/* Mission Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-electricBlue via-violet to-neonPink" />

                {missions.map((mission, i) => (
                    <motion.div 
                        key={mission.id}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 relative pl-14 md:pl-24 group"
                    >
                        {/* Node */}
                        <div className="absolute left-2 md:left-6 top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-10"
                            style={{ borderColor: accentColors[i % accentColors.length], backgroundColor: '#080808' }}
                        >
                            <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
                                style={{ backgroundColor: accentColors[i % accentColors.length] }}
                            />
                        </div>

                        {/* Horizontal connector */}
                        <div className="absolute left-9 md:left-13 top-8 w-5 md:w-11 h-px transition-colors duration-300"
                            style={{ backgroundColor: accentColors[i % accentColors.length], opacity: 0.4 }}
                        />

                        {/* Card */}
                        <div 
                            onClick={() => handleMissionClick(mission)}
                            className="bg-neutral-900/60 border border-neutral-800 hover:border-neutral-600 p-6 rounded-lg cursor-pointer transition-all duration-300 card-hover backdrop-blur-sm group-hover:shadow-lg relative overflow-hidden"
                        >
                            {/* Accent glow */}
                            <div className="absolute top-0 left-0 w-full h-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: accentColors[i % accentColors.length] }}
                            />

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                                <h3 className="text-xl font-heading font-bold text-white group-hover:text-electricBlue transition-colors">{mission.title}</h3>
                                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest shrink-0">Mission 0{i + 1}</span>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed mb-4">{mission.shortLabel}</p>
                            <div className="flex flex-wrap gap-2">
                                {mission.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 bg-neutral-800/80 text-neutral-400 text-[10px] font-mono uppercase tracking-wider rounded-sm border border-neutral-700/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Nudge */}
            <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <a href="#projects" className="inline-flex flex-col items-center gap-2 text-neutral-500 hover:text-electricBlue transition-colors group">
                    <span className="text-xs font-mono uppercase tracking-widest">Next: Product Arcade</span>
                    <span className="animate-float-arrow text-lg">↓</span>
                </a>
            </motion.div>

            {/* Mission Brief Modal */}
            <AnimatePresence>
                {activeMission && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
                        onClick={() => setActiveMission(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0A0A0F] border border-electricBlue/30 w-full max-w-2xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col mt-16 md:mt-0"
                        >
                            <div className="border-b border-neutral-800 p-4 bg-neutral-900/50 flex justify-between items-center">
                                <span className="font-mono text-electricBlue text-xs tracking-widest uppercase flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-electricBlue animate-pulse" />
                                    Mission Brief
                                </span>
                                <button onClick={() => setActiveMission(null)} className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-mono text-xs uppercase tracking-widest transition-colors border border-neutral-600">
                                    [Close]
                                </button>
                            </div>
                            
                            <div className="p-6 md:p-8 overflow-y-auto scrollbar-hide">
                                <h3 className="text-3xl font-heading font-bold text-white mb-8">{activeMission.title}</h3>
                                
                                <div className="space-y-8">
                                    <div className="border-l-2 border-neutral-700 pl-5">
                                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Problem</p>
                                        <p className="text-neutral-300 text-lg leading-relaxed">{activeMission.problem}</p>
                                    </div>
                                    <div className="border-l-2 border-electricBlue/50 pl-5">
                                        <p className="text-[10px] font-mono text-electricBlue uppercase tracking-widest mb-2">Action</p>
                                        <p className="text-neutral-200 text-lg leading-relaxed">{activeMission.action}</p>
                                    </div>
                                    <div className="border-l-2 border-acidGreen/50 pl-5">
                                        <p className="text-[10px] font-mono text-acidGreen uppercase tracking-widest mb-2">Impact</p>
                                        <p className="text-acidGreen font-medium text-lg leading-relaxed">{activeMission.impact}</p>
                                    </div>
                                </div>

                                <div className="terminal-log mt-6 text-center">
                                    {'>'} mission_brief rendered successfully.
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
