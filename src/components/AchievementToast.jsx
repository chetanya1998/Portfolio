import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playAchievementSound } from '../utils/sounds';

export const triggerAchievement = (message) => {
    const event = new CustomEvent('achievement-unlocked', { detail: { message } });
    window.dispatchEvent(event);
};

export const AchievementToast = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const handleAchievement = (e) => {
            const newAchievement = {
                id: Date.now(),
                message: e.detail.message,
            };
            
            // Play achievement sound
            playAchievementSound();
            
            setAchievements((prev) => [...prev, newAchievement]);
            
            // Auto dismiss after 3 seconds
            setTimeout(() => {
                setAchievements((prev) => prev.filter(a => a.id !== newAchievement.id));
            }, 3000);
        };

        window.addEventListener('achievement-unlocked', handleAchievement);
        return () => window.removeEventListener('achievement-unlocked', handleAchievement);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {achievements.map((achievement) => (
                    <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 50, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20, transition: { duration: 0.2 } }}
                        className="bg-[#0A0A0F] border border-neonOrange/30 shadow-2xl rounded-xl p-4 flex items-center gap-3 glow-orange"
                    >
                        <div className="w-10 h-10 rounded-full bg-neonOrange/10 flex items-center justify-center border border-neonOrange/30">
                            <span className="text-xl">🏆</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-neonOrange font-mono uppercase tracking-widest">Achievement Unlocked</p>
                            <p className="text-sm font-heading font-bold text-white">{achievement.message}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
