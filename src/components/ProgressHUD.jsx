import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';

const sections = [
    { id: 'hero', label: 'Start' },
    { id: 'impact', label: 'Impact' },
    { id: 'work', label: 'Work' },
    { id: 'projects', label: 'Builds' },
    { id: 'case-studies', label: 'Cases' },
    { id: 'research', label: 'Research' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'recognition', label: 'Leadership' },
    { id: 'talks', label: 'Talks' },
    { id: 'contact', label: 'Connect' }
];

export const ProgressHUD = ({ activeSection }) => {
    return (
        <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
            {sections.map((section, index) => {
                const isActive = activeSection === section.id;
                
                return (
                    <a 
                        key={section.id} 
                        href={`#${section.id}`}
                        className="group flex items-center justify-end gap-3"
                        aria-label={`Scroll to ${section.label}`}
                    >
                        <span className={cn(
                            "text-xs font-mono tracking-widest transition-all duration-300",
                            isActive ? "text-neonOrange opacity-100" : "text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:text-white"
                        )}>
                            {section.label}
                        </span>
                        
                        {/* Indicator Node */}
                        <div className="relative flex items-center justify-center w-8 h-8">
                            <div className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all duration-300 z-10",
                                isActive ? "bg-neonOrange shadow-[0_0_10px_#FF6A00]" : "bg-neutral-600 group-hover:bg-neutral-400 group-hover:scale-125"
                            )} />
                            
                            {/* Radial Active Ring */}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-ring"
                                    className="absolute inset-0 m-auto w-12 h-12 border-2 border-[#FF6A00] rounded-full shadow-[0_0_15px_rgba(255,106,0,0.3)] bg-[#FF6A00]/10"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </div>
                    </a>
                );
            })}
        </div>
    );
};
