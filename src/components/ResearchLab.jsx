import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { researchPapers } from '../data/portfolio';
import { triggerAchievement } from './AchievementToast';
import { playModalOpenSound, playModalCloseSound, playHoverSound } from '../utils/sounds';
import { BookOpen, Award, ExternalLink, Hash, Calendar, Layers, X } from 'lucide-react';

const TiltCard = ({ paper, color, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            onMouseEnter={playHoverSound}
            className="group cursor-pointer relative h-full bg-[#0d0d12]/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl transition-colors hover:border-neutral-600"
        >
            {/* Ambient Radial Glow */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${color}, transparent 60%)` }}
            />
            
            {/* Content Layer with 3D Depth */}
            <div className="relative h-full flex flex-col" style={{ transform: "translateZ(40px)" }}>
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/60 border border-neutral-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <BookOpen size={24} style={{ color }} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-black/40 border border-neutral-800 rounded-sm text-neutral-400 backdrop-blur-sm">
                            {paper.year}
                        </span>
                        {paper.citationCount !== '—' && (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg" style={{ color, backgroundColor: `${color}1A`, border: `1px solid ${color}33` }}>
                                <Award size={12} />
                                {paper.citationCount}
                            </span>
                        )}
                    </div>
                </div>

                <h3 className="text-lg font-heading font-bold text-neutral-200 group-hover:text-white transition-colors line-clamp-3 leading-snug mb-6">
                    {paper.title}
                </h3>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800/60">
                    <span className="text-xs font-mono px-2 py-1 bg-black/30 rounded" style={{ color }}>{paper.topic}</span>
                    <span className="text-neutral-600 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1">→</span>
                </div>
            </div>
        </motion.div>
    );
};

export const ResearchLab = () => {
    const [selectedPaper, setSelectedPaper] = useState(null);

    useEffect(() => {
        if (selectedPaper) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [selectedPaper]);

    const handlePaperClick = (paper) => {
        playModalOpenSound();
        setSelectedPaper(paper);
        triggerAchievement("Research File Declassified");
    };

    const handleClose = () => {
        playModalCloseSound();
        setSelectedPaper(null);
    };

    // Vibrant futuristic palette
    const iconColors = ['#FF2E88', '#00E5FF', '#B6FF00', '#FF6A00', '#8B5CF6', '#FF2E88', '#00E5FF', '#B6FF00', '#FF6A00', '#8B5CF6'];

    return (
        <section id="research" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 perspective-1000">
            <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-3 py-1 bg-violet/10 border border-violet/30 text-violet text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Level 05</span>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight">
                    Research <span className="text-violet">Lab</span>
                </h2>
                <p className="text-neutral-400 mt-4 max-w-xl text-base leading-relaxed">10 published research papers & book chapters with 100+ citations exploring the intersection of deep learning, blockchain, and real-world impact.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1200px" }}>
                {researchPapers.map((paper, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: "easeOut" }}
                    >
                        <TiltCard 
                            paper={paper} 
                            color={iconColors[i % iconColors.length]} 
                            onClick={() => handlePaperClick({...paper, color: iconColors[i % iconColors.length]})} 
                        />
                    </motion.div>
                ))}
            </div>

            {/* Nudge */}
            <motion.div 
                className="mt-20 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <a href="#skills" onMouseEnter={playHoverSound} className="inline-flex flex-col items-center gap-2 text-neutral-500 hover:text-violet transition-colors group">
                    <span className="text-xs font-mono uppercase tracking-widest">Next: Skill Inventory</span>
                    <span className="animate-float-arrow text-lg">↓</span>
                </a>
            </motion.div>

            {/* Redesigned Paper Modal */}
            <AnimatePresence>
                {selectedPaper && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                        onClick={handleClose}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f0f15] border border-neutral-800 w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col"
                        >
                            {/* Colorful Header */}
                            <div className="h-32 relative flex items-end p-8" style={{ background: `linear-gradient(to right, ${selectedPaper.color}22, transparent)` }}>
                                <div className="absolute top-0 right-0 p-8 opacity-20">
                                    <BookOpen size={120} color={selectedPaper.color} />
                                </div>
                                <div 
                                    className="absolute bottom-0 left-0 w-full h-px" 
                                    style={{ background: `linear-gradient(to right, ${selectedPaper.color}, transparent)` }} 
                                />
                                <button 
                                    onClick={handleClose}
                                    onMouseEnter={playHoverSound}
                                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/80 rounded-full text-neutral-400 hover:text-white transition-colors z-10"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-8">
                                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8 leading-tight">
                                    {selectedPaper.title}
                                </h3>
                                
                                <div className="grid grid-cols-3 gap-4 mb-10">
                                    <div className="bg-black/40 border border-neutral-800 p-4 rounded-xl flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-neutral-500">
                                            <Layers size={14} />
                                            <span className="text-[10px] font-mono uppercase tracking-wider">Domain</span>
                                        </div>
                                        <p className="text-white text-sm font-medium">{selectedPaper.topic}</p>
                                    </div>
                                    <div className="bg-black/40 border border-neutral-800 p-4 rounded-xl flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-neutral-500">
                                            <Calendar size={14} />
                                            <span className="text-[10px] font-mono uppercase tracking-wider">Published</span>
                                        </div>
                                        <p className="text-white text-sm font-medium">{selectedPaper.year}</p>
                                    </div>
                                    <div className="bg-black/40 border border-neutral-800 p-4 rounded-xl flex flex-col gap-2 relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundColor: selectedPaper.color }} />
                                        <div className="flex items-center gap-2" style={{ color: selectedPaper.color }}>
                                            <Award size={14} />
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Impact</span>
                                        </div>
                                        <p className="text-white text-sm font-bold">{selectedPaper.citationCount} Citations</p>
                                    </div>
                                </div>

                                {selectedPaper.link && (
                                    <a 
                                        href={selectedPaper.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group relative flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-heading font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl overflow-hidden"
                                    >
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: selectedPaper.color }} />
                                        Access Research Source
                                        <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                )}

                                <div className="terminal-log mt-8 text-center text-xs opacity-50">
                                    {'>'} connection secure. file declassified.
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
