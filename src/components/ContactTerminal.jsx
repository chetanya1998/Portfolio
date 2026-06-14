import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import { triggerAchievement } from './AchievementToast';
import { playHoverSound, playClickSound } from '../utils/sounds';

export const ContactTerminal = () => {
    const [copied, setCopied] = useState(false);

    const handleCommand = (cmd) => {
        playClickSound();
        triggerAchievement("Uplink Established");
        
        if (cmd === 'email') {
            navigator.clipboard.writeText(personalInfo.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else if (cmd === 'linkedin') {
            window.open(personalInfo.linkedin, '_blank');
        } else if (cmd === 'resume') {
            window.open(personalInfo.resumeLink, '_blank');
        } else if (cmd === 'github') {
            window.open(personalInfo.github, '_blank');
        } else if (cmd === 'scholar') {
            window.open(personalInfo.scholar, '_blank');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <section id="contact" className="py-32 relative z-10 w-full flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-r from-neonOrange/20 via-neonPink/10 to-electricBlue/20 blur-[100px] rounded-full pointer-events-none z-0 opacity-50 animate-pulse-slow" />
            
            <motion.div 
                className="mb-16 text-center relative z-10"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-white text-sm font-mono uppercase tracking-[0.3em] rounded-full mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">Signal Established</span>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-300 to-neutral-600 tracking-tighter drop-shadow-2xl">
                    CONNECT
                </h2>
                <p className="text-neutral-400 mt-6 font-mono text-sm md:text-base max-w-2xl mx-auto uppercase tracking-widest">
                    Awaiting authorization. Select a secure uplink protocol.
                </p>
            </motion.div>

            <motion.div 
                className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Email */}
                <motion.button
                    variants={itemVariants}
                    onClick={() => handleCommand('email')}
                    onMouseEnter={playHoverSound}
                    className="group relative h-64 rounded-2xl bg-neutral-900/40 border border-neutral-800 p-6 flex flex-col items-center justify-center overflow-hidden hover:border-neonOrange transition-all duration-500 backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-neonOrange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-neonOrange to-neonPink blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    
                    <div className="relative z-10 text-5xl mb-6 text-neutral-500 group-hover:text-neonOrange transition-colors duration-500 group-hover:scale-110 transform">✉</div>
                    <h3 className="relative z-10 font-heading font-bold text-xl text-white mb-2 tracking-wide uppercase">Email Transmission</h3>
                    <p className="relative z-10 font-mono text-xs text-neutral-500 group-hover:text-neonOrange transition-colors duration-300 tracking-widest">
                        {copied ? '✓ COPIED TO SECURE CLIPBOARD' : 'INITIALIZE PROTOCOL'}
                    </p>
                </motion.button>

                {/* LinkedIn */}
                <motion.button
                    variants={itemVariants}
                    onClick={() => handleCommand('linkedin')}
                    onMouseEnter={playHoverSound}
                    className="group relative h-64 rounded-2xl bg-neutral-900/40 border border-neutral-800 p-6 flex flex-col items-center justify-center overflow-hidden hover:border-electricBlue transition-all duration-500 backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-electricBlue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-electricBlue to-cyan-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    
                    <div className="relative z-10 text-5xl mb-6 text-neutral-500 group-hover:text-electricBlue transition-colors duration-500 group-hover:scale-110 transform">🔗</div>
                    <h3 className="relative z-10 font-heading font-bold text-xl text-white mb-2 tracking-wide uppercase">LinkedIn Uplink</h3>
                    <p className="relative z-10 font-mono text-xs text-neutral-500 group-hover:text-electricBlue transition-colors duration-300 tracking-widest">ESTABLISH CONNECTION</p>
                </motion.button>

                {/* Resume */}
                <motion.button
                    variants={itemVariants}
                    onClick={() => handleCommand('resume')}
                    onMouseEnter={playHoverSound}
                    className="group relative h-64 rounded-2xl bg-neutral-900/40 border border-neutral-800 p-6 flex flex-col items-center justify-center overflow-hidden hover:border-acidGreen transition-all duration-500 backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-acidGreen/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-acidGreen to-green-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    
                    <div className="relative z-10 text-5xl mb-6 text-neutral-500 group-hover:text-acidGreen transition-colors duration-500 group-hover:scale-110 transform">📄</div>
                    <h3 className="relative z-10 font-heading font-bold text-xl text-white mb-2 tracking-wide uppercase">Resume Datacore</h3>
                    <p className="relative z-10 font-mono text-xs text-neutral-500 group-hover:text-acidGreen transition-colors duration-300 tracking-widest">DOWNLOAD RECORDS</p>
                </motion.button>

                {/* GitHub */}
                <motion.button
                    variants={itemVariants}
                    onClick={() => handleCommand('github')}
                    onMouseEnter={playHoverSound}
                    className="group relative h-64 rounded-2xl bg-neutral-900/40 border border-neutral-800 p-6 flex flex-col items-center justify-center overflow-hidden hover:border-violet transition-all duration-500 backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-violet/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet to-purple-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    
                    <div className="relative z-10 text-5xl mb-6 text-neutral-500 group-hover:text-violet transition-colors duration-500 group-hover:scale-110 transform">💻</div>
                    <h3 className="relative z-10 font-heading font-bold text-xl text-white mb-2 tracking-wide uppercase">GitHub Repository</h3>
                    <p className="relative z-10 font-mono text-xs text-neutral-500 group-hover:text-violet transition-colors duration-300 tracking-widest">ACCESS SOURCE</p>
                </motion.button>
            </motion.div>
            
            <div className="mt-24 text-center relative z-10 flex flex-col items-center gap-4">
                <div className="w-px h-16 bg-gradient-to-b from-neutral-500 to-transparent opacity-50" />
                <p className="text-neutral-600 font-mono text-xs uppercase tracking-[0.4em] animate-pulse">SYSTEM_STANDBY_MODE</p>
            </div>
        </section>
    );
};
