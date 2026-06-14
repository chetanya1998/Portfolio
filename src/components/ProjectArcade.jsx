import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';
import { triggerAchievement } from './AchievementToast';
import { playModalOpenSound, playModalCloseSound, playHoverSound } from '../utils/sounds';

export const ProjectArcade = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        if (selectedProject) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [selectedProject]);

    const handleProjectClick = (project) => {
        playModalOpenSound();
        setSelectedProject(project);
        triggerAchievement("Cartridge Loaded: " + project.title);
    };

    const handleClose = () => {
        playModalCloseSound();
        setSelectedProject(null);
    };

    return (
        <>
        <section id="projects" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-3 py-1 bg-neonPink/10 border border-neonPink/30 text-neonPink text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Level 03</span>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight">
                    Product <span className="text-neonPink">Arcade</span>
                </h2>
                <p className="text-neutral-500 mt-4 max-w-xl text-base">0→1 builds, prototypes, and product experiments.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40, rotateX: -10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ delay: (i % 4) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -12, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onMouseEnter={playHoverSound}
                        onClick={() => handleProjectClick(project)}
                        className="group cursor-pointer relative bg-neutral-900/70 border border-neutral-800 rounded-xl overflow-hidden min-h-[380px] flex flex-col backdrop-blur-sm card-hover"
                        style={{ perspective: 1000 }}
                    >
                        {/* Gradient Header */}
                        <div className={`h-28 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center`}>
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="relative z-10 text-5xl group-hover:scale-125 transition-transform duration-500">
                                {project.visualType === 'meteor' && '☄️'}
                                {project.visualType === 'nodes' && '🕸️'}
                                {project.visualType === 'radar' && '📡'}
                                {project.visualType === 'graph' && '📈'}
                                {project.visualType === 'shield' && '🛡️'}
                                {project.visualType === 'domain' && '🌐'}
                                {project.visualType === 'coins' && '💰'}
                                {project.visualType === 'split' && '🤖'}
                            </div>
                        </div>
                        
                        <div className="p-8 flex-1 flex flex-col justify-between">
                            <div>
                                <p className="text-xs md:text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">{project.category}</p>
                                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 group-hover:text-neonPink transition-colors">{project.title}</h3>
                                <p className="text-base md:text-lg text-neutral-400 line-clamp-3 leading-relaxed">{project.shortLine}</p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-neutral-800">
                                <span className="text-xs font-mono text-neonPink uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                                    Insert Coin →
                                </span>
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
                <a href="#case-studies" onMouseEnter={playHoverSound} className="inline-flex flex-col items-center gap-2 text-neutral-500 hover:text-neonPink transition-colors group">
                    <span className="text-xs font-mono uppercase tracking-widest">Next: Case Study Theater</span>
                    <span className="animate-float-arrow text-lg">↓</span>
                </a>
            </motion.div>
        </section>

        {/* Project Modal - Moved outside section to escape z-index stacking context */}
        <AnimatePresence>
            {selectedProject && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 40 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 22, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#0A0A0F] border border-neutral-800 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden"
                    >
                        {/* Gradient Banner */}
                        <div className={`h-32 bg-gradient-to-r ${selectedProject.gradient} relative flex items-center justify-center`}>
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="relative z-10 text-6xl animate-bounce">
                                {selectedProject.visualType === 'meteor' && '☄️'}
                                {selectedProject.visualType === 'nodes' && '🕸️'}
                                {selectedProject.visualType === 'radar' && '📡'}
                                {selectedProject.visualType === 'graph' && '📈'}
                                {selectedProject.visualType === 'shield' && '🛡️'}
                                {selectedProject.visualType === 'domain' && '🌐'}
                                {selectedProject.visualType === 'coins' && '💰'}
                                {selectedProject.visualType === 'split' && '🤖'}
                            </div>
                            <button 
                                onClick={handleClose}
                                onMouseEnter={playHoverSound}
                                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all text-sm font-bold"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="p-8">
                            <p className="text-[10px] font-mono text-neonPink uppercase tracking-widest mb-2">{selectedProject.category}</p>
                            <h3 className="text-3xl font-heading font-bold text-white mb-3">{selectedProject.title}</h3>
                            <p className="text-neutral-300 text-lg mb-8 leading-relaxed">{selectedProject.shortLine}</p>
                            
                            <div className="space-y-3 mb-8">
                                {selectedProject.details.map((detail, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <span className="text-neonPink mt-0.5">▸</span>
                                        <span className="text-neutral-200">{detail}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] font-mono uppercase tracking-wider rounded-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="terminal-log mt-6 text-center">
                                {'>'} cartridge_data loaded. insert_coin accepted.
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};
