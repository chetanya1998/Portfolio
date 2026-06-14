import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound } from '../utils/sounds';

const sectionMeta = {
    'hero': { label: 'Start Screen', next: 'impact', hint: 'Scroll down to see your impact numbers', color: '#FF6A00' },
    'impact': { label: 'Impact Scoreboard', next: 'work', hint: 'Click any metric card for details', color: '#FF6A00' },
    'work': { label: 'Career Mission Map', next: 'experiences', hint: 'Click a mission node to open the brief', color: '#00D4FF' },
    'experiences': { label: 'Experience Timeline', next: 'projects', hint: 'Previous roles and chapters', color: '#8B5CF6' },
    'projects': { label: 'Product Arcade', next: 'case-studies', hint: 'Insert a coin to explore a build', color: '#FF2E88' },
    'case-studies': { label: 'Case Study Theater', next: 'research', hint: 'Use ← → arrows to navigate cases', color: '#B6FF00' },
    'research': { label: 'Research Lab', next: 'skills', hint: 'Click a file to declassify it', color: '#8B5CF6' },
    'skills': { label: 'Skill Inventory', next: 'contact', hint: 'Click skills to collect them', color: '#B6FF00' },
    'recognition': { label: 'Recognition', next: 'contact', hint: 'Achievements and awards', color: '#FF6A00' },
    'contact': { label: 'Connect Terminal', next: null, hint: 'Run a command to connect', color: '#FF6A00' },
};

export const MiniTerminal = ({ activeSection }) => {
    const [isOpen, setIsOpen] = useState(typeof window !== 'undefined' && window.innerWidth >= 768);
    const [logs, setLogs] = useState([]);
    const prevSectionRef = useRef(null);
    const logContainerRef = useRef(null);

    // Log new section arrivals
    useEffect(() => {
        if (activeSection && activeSection !== prevSectionRef.current) {
            prevSectionRef.current = activeSection;
            const meta = sectionMeta[activeSection];
            if (meta) {
                const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                setLogs(prev => {
                    const newLogs = [
                        ...prev,
                        { text: `[${timestamp}] entered: ${meta.label}`, color: meta.color },
                        { text: `  hint: ${meta.hint}`, color: '#71717A' },
                    ];
                    // Keep only last 12 lines
                    return newLogs.slice(-12);
                });
            }
        }
    }, [activeSection]);

    // Auto-scroll log container
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const meta = sectionMeta[activeSection] || sectionMeta['hero'];

    const handleNextClick = () => {
        playClickSound();
        if (meta.next) {
            document.getElementById(meta.next)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        key="terminal-open"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px] bg-[#050505] border-2 border-neutral-800 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] font-mono text-sm"
                    >
                        {/* Header */}
                        <div className="bg-neutral-900/90 border-b-2 border-neutral-800 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                            </div>
                            <span className="text-neutral-500 text-xs font-bold tracking-widest">quest_guide.sh</span>
                            <button
                                onClick={() => { setIsOpen(false); playClickSound(); }}
                                className="text-neutral-500 hover:text-white transition-colors text-xs font-bold"
                            >
                                [—]
                            </button>
                        </div>

                        {/* Scrollable log area */}
                        <div
                            ref={logContainerRef}
                            className="p-4 h-[200px] overflow-y-auto scrollbar-hide flex flex-col gap-2"
                        >
                            {logs.length === 0 && (
                                <span className="text-neutral-600">{'>'} awaiting scroll input...</span>
                            )}
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="leading-relaxed whitespace-pre-wrap break-words"
                                    style={{ color: log.color }}
                                >
                                    {log.text}
                                </motion.div>
                            ))}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-1.5 h-3 bg-neonOrange"
                            />
                        </div>

                        {/* Footer / Input */}
                        <div className="border-t-2 border-neutral-800 p-4 bg-[#080808] flex items-center justify-between">
                            <div className="flex items-center gap-3 text-neonOrange text-sm">
                                <span className="animate-pulse">▶</span>
                                <span className="uppercase tracking-widest font-bold">{meta.label}</span>
                            </div>
                            {meta.next && (
                                <button
                                    onClick={handleNextClick}
                                    className="px-4 py-1.5 bg-neutral-800 hover:bg-white hover:text-black text-white text-xs uppercase tracking-widest rounded transition-colors"
                                >
                                    Next ↵
                                </button>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="terminal-closed"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => { setIsOpen(true); playClickSound(); }}
                        className="w-12 h-12 bg-[#050505] border border-neutral-800 rounded-xl flex items-center justify-center text-neonOrange hover:border-neonOrange transition-colors shadow-xl group"
                        title="Open Quest Guide"
                    >
                        <span className="text-lg group-hover:animate-pulse">{'>'}_</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
