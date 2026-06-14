import React, { useState, useEffect } from 'react';
import GlobalBackground from './components/GlobalBackground';
import GlowingCursor from './components/GlowingCursor';
import { ProgressHUD } from './components/ProgressHUD';
import { AchievementToast } from './components/AchievementToast';
import { HeroStartScreen } from './components/HeroStartScreen';
import { ImpactScoreboard } from './components/ImpactScoreboard';
import { MissionMap } from './components/MissionMap';
import { ProjectArcade } from './components/ProjectArcade';
import { CaseStudyTheater } from './components/CaseStudyTheater';
import { ResearchLab } from './components/ResearchLab';
import { SkillInventory } from './components/SkillInventory';
import { ContactTerminal } from './components/ContactTerminal';
import { MiniTerminal } from './components/MiniTerminal';
import { AudioControl } from './components/AudioControl';
import { YoutubeBackgroundAudio } from './components/YoutubeBackgroundAudio';
import { ParticleMeshBackground } from './components/ParticleMeshBackground';
import { playHoverSound, playClickSound } from './utils/sounds';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences, leadership, leadershipRoles, initiativesAndTalks, education } from './data/portfolio';

export default function Portfolio() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for Active Section Tracking
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const expColors = ['#FF6A00', '#00D4FF', '#8B5CF6', '#FF2E88'];

    const { scrollYProgress } = useScroll();
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    return (
        <div className="min-h-screen bg-transparent text-neutral-300 font-sans selection:bg-neonOrange/30 selection:text-neonOrange relative overflow-x-hidden">
            {/* Overlays */}
            <div className="scanline-overlay" />
            <GlobalBackground />
            
            {/* Desktop Only Custom Cursor */}
            <div className="hidden md:block">
                <GlowingCursor />
            </div>

            <YoutubeBackgroundAudio />
            <motion.div style={{ y: yBg }} className="fixed inset-0 pointer-events-none z-0">
                <ParticleMeshBackground />
            </motion.div>

            {/* Main Content Sections */}
            <AudioControl />
            <MiniTerminal activeSection={activeSection} />
            <ProgressHUD activeSection={activeSection} />
            <AchievementToast />

            {/* Sticky Nav */}
            <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3' : 'py-5 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
                    <a 
                        href="#hero" 
                        onClick={playClickSound}
                        onMouseEnter={playHoverSound}
                        className="text-xl font-heading font-black text-white tracking-tighter flex items-center gap-2 group"
                    >
                        <span className="text-neonOrange group-hover:animate-pulse">CV.</span>
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { href: '#impact', label: 'Impact' },
                            { href: '#work', label: 'Work' },
                            { href: '#projects', label: 'Builds' },
                            { href: '#research', label: 'Research' },
                            { href: '#education', label: 'Education' },
                        ].map(item => (
                            <a 
                                key={item.href} 
                                href={item.href} 
                                onClick={playClickSound}
                                onMouseEnter={playHoverSound}
                                className="text-sm font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-widest relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neonOrange transition-all group-hover:w-full" />
                            </a>
                        ))}
                        <a 
                            href="#contact" 
                            onClick={playClickSound}
                            onMouseEnter={playHoverSound}
                            className="px-5 py-2 border border-neonOrange/50 text-neonOrange text-sm font-mono hover:bg-neonOrange hover:text-black transition-all uppercase tracking-widest rounded-sm"
                        >
                            Connect
                        </a>
                    </div>

                    <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden">
                    <div className="flex flex-col gap-6 text-2xl font-heading font-light text-white">
                        <a href="#hero" onClick={() => setIsMenuOpen(false)} className="hover:text-neonOrange transition-colors">Start</a>
                        <a href="#impact" onClick={() => setIsMenuOpen(false)} className="hover:text-neonOrange transition-colors">Impact</a>
                        <a href="#work" onClick={() => setIsMenuOpen(false)} className="hover:text-electricBlue transition-colors">Work</a>
                        <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-neonPink transition-colors">Builds</a>
                        <a href="#research" onClick={() => setIsMenuOpen(false)} className="hover:text-violet transition-colors">Research</a>
                        <a href="#education" onClick={() => setIsMenuOpen(false)} className="hover:text-acidGreen transition-colors">Education</a>
                        <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-neonOrange font-bold">Connect</a>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main>
                <HeroStartScreen onStart={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })} />
                <ImpactScoreboard />
                <MissionMap />

                {/* Other Experiences Section */}
                <section id="experiences" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div 
                        className="mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-3 py-1 bg-violet/10 border border-violet/30 text-violet text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Previous Chapters</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
                            Experience <span className="text-violet">Timeline</span>
                        </h2>
                    </motion.div>

                    <div className="relative mt-8">
                        {/* Vertical line */}
                        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet via-neonPink to-electricBlue" />

                        {experiences && experiences.filter(exp => exp.company !== "Unibots").map((exp, i) => (
                            <motion.div 
                                key={exp.company}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="mb-8 relative pl-14 md:pl-24 group"
                            >
                                {/* Node */}
                                <div className="absolute left-2 md:left-6 top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-10"
                                    style={{ borderColor: expColors[i % expColors.length], backgroundColor: '#080808' }}
                                >
                                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
                                        style={{ backgroundColor: expColors[i % expColors.length] }}
                                    />
                                </div>

                                {/* Horizontal connector */}
                                <div className="absolute left-9 md:left-13 top-8 w-5 md:w-11 h-px transition-colors duration-300"
                                    style={{ backgroundColor: expColors[i % expColors.length], opacity: 0.4 }}
                                />

                                {/* Card */}
                                <div className="bg-neutral-900/60 border border-neutral-800 hover:border-neutral-600 p-6 rounded-lg transition-all duration-300 card-hover backdrop-blur-sm group-hover:shadow-lg relative overflow-hidden">
                                    {/* Accent glow */}
                                    <div className="absolute top-0 left-0 w-full h-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                                        style={{ backgroundColor: expColors[i % expColors.length] }}
                                    />

                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                                        <div>
                                            <h3 className="text-xl font-heading font-bold text-white group-hover:text-violet transition-colors">{exp.company}</h3>
                                            <p className="text-neonOrange text-sm font-medium">{exp.role}</p>
                                        </div>
                                        <div className="md:text-right">
                                            <p className="text-neutral-500 text-xs font-mono">{exp.period}</p>
                                            <p className="text-neutral-600 text-xs font-mono">{exp.type}</p>
                                        </div>
                                    </div>
                                    
                                    <ul className="space-y-2 mt-4 mb-4">
                                        {exp.achievements.map((ach, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-neutral-300 text-base leading-relaxed">
                                                <span className="text-violet mt-1 shrink-0 text-sm">▸</span>
                                                {ach}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-800/50">
                                        {exp.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-1 bg-neutral-800/80 text-neutral-400 text-[10px] font-mono uppercase tracking-wider rounded-sm border border-neutral-700/50">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <ProjectArcade />
                <CaseStudyTheater />
                <ResearchLab />
                <SkillInventory />

                {/* Education Section */}
                {education && education.length > 0 && (
                    <section id="education" className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                        <motion.div 
                            className="mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-3 py-1 bg-acidGreen/10 border border-acidGreen/30 text-acidGreen text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Academic Background</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
                                Education
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-6">
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden group hover:border-acidGreen/50 transition-colors"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-acidGreen opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-2xl shadow-inner border border-neutral-700">
                                                {edu.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-heading font-bold text-white mb-1">{edu.degree}</h3>
                                                <p className="text-neutral-400 font-medium">{edu.university}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col md:items-end gap-1 pl-16 md:pl-0">
                                            <span className="text-neutral-500 font-mono text-sm tracking-widest">{edu.duration}</span>
                                            <span className="text-acidGreen font-mono text-sm border border-acidGreen/30 px-2 py-0.5 rounded bg-acidGreen/10">CGPA: {edu.cgpa}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Leadership & Recognition */}
                {leadership && leadership.length > 0 && (
                    <section id="recognition" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                        <motion.div 
                            className="mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-3 py-1 bg-neonOrange/10 border border-neonOrange/30 text-neonOrange text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Achievements</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
                                Recognition & <span className="text-neonOrange">Leadership</span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {leadership.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-950 shadow-lg"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-neonOrange via-neonPink to-violet opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative bg-[#080808] h-full rounded-2xl p-8 flex flex-col justify-between z-10">
                                        <div>
                                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">🏆</div>
                                            <h3 className="text-2xl font-heading font-bold text-white mb-2">{item.role}</h3>
                                            <p className="text-xs font-mono text-neonOrange tracking-widest uppercase mb-4">{item.org}</p>
                                        </div>
                                        <p className="text-neutral-400 leading-relaxed text-sm">{item.desc}</p>
                                        
                                        {/* Cyberpunk accents */}
                                        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-neutral-800 group-hover:border-neonOrange transition-colors rounded-tr-2xl" />
                                        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-neutral-800 group-hover:border-neonOrange transition-colors rounded-bl-2xl" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Leadership Roles & Responsibilities */}
                {leadershipRoles && leadershipRoles.length > 0 && (
                    <section id="leadership-roles" className="py-12 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-10 hover:bg-neutral-900 transition-colors"
                        >
                            <h3 className="text-2xl font-heading font-bold text-white mb-10 flex items-center gap-3">
                                <div className="p-3 bg-neonOrange/10 rounded-lg text-neonOrange">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                </div>
                                Leadership Role & Responsibilities
                            </h3>
                            <div className="space-y-10">
                                {leadershipRoles.map((role, idx) => (
                                    <div key={idx} className="relative pl-6 md:pl-8 border-l border-neutral-800 hover:border-neonOrange transition-colors">
                                        <h4 className="text-white font-medium text-lg md:text-xl leading-snug mb-4">{role.role}</h4>
                                        <ul className="space-y-3">
                                            {role.points.map((point, pIdx) => {
                                                // Quick hack to parse markdown bold and links from the string
                                                const formattedPoint = point
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
                                                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-neonOrange hover:underline decoration-neonOrange/30">$1</a>');
                                                
                                                return (
                                                    <li key={pIdx} className="text-neutral-400 text-sm md:text-base leading-relaxed list-disc list-outside ml-4 marker:text-neonOrange" dangerouslySetInnerHTML={{ __html: formattedPoint }} />
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </section>
                )}

                {/* Initiatives & Talks */}
                {initiativesAndTalks && initiativesAndTalks.length > 0 && (
                    <section id="talks" className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                        <motion.div 
                            className="mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-3 py-1 bg-electricBlue/10 border border-electricBlue/30 text-electricBlue text-xs font-mono uppercase tracking-widest rounded-sm mb-4">Speaking & Leadership</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
                                Initiatives & <span className="text-electricBlue">Talks</span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {initiativesAndTalks.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-electricBlue/50 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                        <div className="text-6xl">🎙</div>
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-white mb-2 relative z-10">{item.title}</h3>
                                    <p className="text-sm font-mono text-electricBlue mb-3 relative z-10">{item.org}</p>
                                    <p className="text-neutral-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                <ContactTerminal />
                
                {/* Footer */}
                <footer className="relative z-10 py-8 text-center border-t border-neutral-800 bg-[#050505]">
                    <p className="text-neutral-500 font-mono text-sm tracking-widest uppercase">
                        Made by Chetanya with <span className="text-neonPink animate-pulse">❤</span>
                    </p>
                    <p className="text-neutral-600 font-mono text-xs mt-2">
                        &copy; 2026 COPYRIGHT
                    </p>
                </footer>
            </main>
        </div>
    );
}