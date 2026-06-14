import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { impactMetrics } from '../data/portfolio';
import { triggerAchievement } from './AchievementToast';

const TerminalFeedback = ({ message }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="terminal-log mt-4 text-center"
    >
        {'>'} {message}
    </motion.div>
);

export const ImpactScoreboard = () => {
    const [selectedMetric, setSelectedMetric] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedMetric) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [selectedMetric]);

    const handleMetricClick = (metric) => {
        setSelectedMetric(metric);
        triggerAchievement("Impact Scoreboard Unlocked");
    };

    return (
        <section id="impact" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-3 py-1 bg-neonOrange/10 border border-neonOrange/30 text-neonOrange text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Level 01</span>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight">
                    Impact <span className="gradient-text">Scoreboard</span>
                </h2>
                <p className="text-neutral-500 mt-4 max-w-xl text-base">Numbers from products, systems, and experiments I have worked on.</p>
            </motion.div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {impactMetrics.map((metric, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -8, scale: 1.03 }}
                        onClick={() => handleMetricClick(metric)}
                        className="group cursor-pointer relative bg-neutral-900/80 border border-neutral-800 p-7 rounded-lg overflow-hidden card-hover backdrop-blur-sm"
                    >
                        {/* Accent top bar */}
                        <div 
                            className="absolute top-0 left-0 w-full h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: metric.accentColor }}
                        />
                        
                        {/* Ambient glow on hover */}
                        <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"
                            style={{ background: `radial-gradient(circle at 50% 0%, ${metric.accentColor}, transparent 70%)` }}
                        />

                        <div className="relative z-10">
                            <h3 
                                className="text-4xl md:text-5xl font-heading font-black tracking-tighter mb-3 transition-colors duration-300 group-hover:drop-shadow-lg"
                                style={{ color: metric.accentColor }}
                            >
                                {metric.value}
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed font-medium">
                                {metric.label}
                            </p>
                        </div>

                        {/* Click hint */}
                        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            CLICK →
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Nudge to next section */}
            <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <a href="#work" className="inline-flex flex-col items-center gap-2 text-neutral-500 hover:text-neonOrange transition-colors group">
                    <span className="text-xs font-mono uppercase tracking-widest">Next: Career Mission Map</span>
                    <span className="animate-float-arrow text-lg group-hover:text-neonOrange">↓</span>
                </a>
            </motion.div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedMetric && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
                        onClick={() => setSelectedMetric(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0A0A0F] border border-neutral-800 p-8 w-full max-w-lg rounded-lg shadow-2xl relative"
                        >
                            <button 
                                onClick={() => setSelectedMetric(null)}
                                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors font-mono text-xs"
                            >
                                [ESC]
                            </button>
                            <div 
                                className="w-full h-1 rounded-full mb-6"
                                style={{ backgroundColor: selectedMetric.accentColor }}
                            />
                            <h3 className="text-4xl font-heading font-black text-white mb-2" style={{ color: selectedMetric.accentColor }}>{selectedMetric.value}</h3>
                            <p className="text-white font-medium text-lg mb-6">{selectedMetric.label}</p>
                            <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-lg">
                                <p className="text-neutral-300 leading-relaxed">{selectedMetric.context}</p>
                            </div>
                            <TerminalFeedback message="impact_data loaded successfully." />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
