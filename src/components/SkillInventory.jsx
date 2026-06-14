import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillGroups } from '../data/portfolio';
import { triggerAchievement } from './AchievementToast';
import { playSkillCollectSound, playHoverSound } from '../utils/sounds';

const groupColors = ['#FF6A00', '#00D4FF', '#8B5CF6', '#FF2E88'];
const groupGlows = ['glow-orange', 'glow-blue', 'glow-violet', 'glow-pink'];

export const SkillInventory = () => {
    const [collectedSkills, setCollectedSkills] = useState(new Set());
    const [activeTooltip, setActiveTooltip] = useState(null);

    const handleCollect = (skillName) => {
        if (!collectedSkills.has(skillName)) {
            const newSet = new Set([...collectedSkills, skillName]);
            setCollectedSkills(newSet);
            playSkillCollectSound();
            triggerAchievement(`Skill Collected: ${skillName}`);
        }
    };

    return (
        <section id="skills" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-3 py-1 bg-acidGreen/10 border border-acidGreen/30 text-acidGreen text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Level 06</span>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight">
                    Skill <span className="text-acidGreen">Inventory</span>
                </h2>
                <p className="text-neutral-500 mt-4 max-w-xl text-base">
                    Tools and capabilities collected across product, AI, adtech, and systems. 
                    <span className="text-acidGreen ml-1 font-mono text-xs">({collectedSkills.size} collected)</span>
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillGroups.map((group, groupIdx) => (
                    <motion.div 
                        key={group.groupName}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: groupIdx * 0.1, duration: 0.6 }}
                        className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-xl backdrop-blur-sm"
                    >
                        <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: groupColors[groupIdx] }} />
                            {group.groupName}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2.5">
                            {group.skills.map((skill) => {
                                const isCollected = collectedSkills.has(skill.name);
                                const color = groupColors[groupIdx];
                                
                                return (
                                    <div key={skill.name} className="relative group/tooltip">
                                        <motion.button
                                            onClick={() => handleCollect(skill.name)}
                                            onMouseEnter={playHoverSound}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all duration-300 border"
                                            style={isCollected ? {
                                                backgroundColor: color,
                                                color: '#000',
                                                borderColor: color,
                                                fontWeight: 700,
                                                boxShadow: `0 0 15px ${color}40`
                                            } : {
                                                backgroundColor: 'rgba(255,255,255,0.03)',
                                                color: '#A1A1AA',
                                                borderColor: 'rgba(255,255,255,0.1)',
                                            }}
                                        >
                                            {skill.name}
                                        </motion.button>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] p-3 bg-black border border-neutral-700 text-neutral-300 text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl text-center">
                                            {skill.tooltip}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-neutral-700 rotate-45 -mt-1" />
                                        </div>
                                    </div>
                                );
                            })}
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
                <a href="#contact" onMouseEnter={playHoverSound} className="inline-flex flex-col items-center gap-2 text-neutral-500 hover:text-acidGreen transition-colors group">
                    <span className="text-xs font-mono uppercase tracking-widest">Final Level: Connect</span>
                    <span className="animate-float-arrow text-lg">↓</span>
                </a>
            </motion.div>
        </section>
    );
};
