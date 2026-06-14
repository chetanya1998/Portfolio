import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Disc3 } from 'lucide-react';
import { toggleMute, getIsMuted, startBackgroundMusic, stopBackgroundMusic, getIsMusicPlaying, playClickSound, setBackgroundVolume, getBackgroundVolume } from '../utils/sounds';

export const AudioControl = () => {
    const [muted, setMuted] = useState(getIsMuted());
    const [musicOn, setMusicOn] = useState(getIsMusicPlaying());
    const [volume, setVolume] = useState(getBackgroundVolume());
    const [showVolume, setShowVolume] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowVolume(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const handleToggleMute = () => {
        playClickSound();
        const nowMuted = toggleMute();
        setMuted(nowMuted);
        if (nowMuted) {
            setMusicOn(false);
            setShowVolume(false);
        }
    };

    const handleToggleMusic = (e) => {
        e.stopPropagation(); // prevent document click from firing immediately
        playClickSound();
        if (getIsMusicPlaying()) {
            stopBackgroundMusic();
            setMusicOn(false);
            setShowVolume(false);
        } else {
            startBackgroundMusic();
            setMusicOn(true);
            setShowVolume(true);
        }
    };

    const handleVolumeChange = (e) => {
        const newVol = parseInt(e.target.value);
        setVolume(newVol);
        setBackgroundVolume(newVol);
    };

    return (
        <div ref={containerRef} className="fixed top-24 right-4 md:right-8 z-50 flex flex-col gap-2 items-center">
            {/* Sound FX Toggle */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleMute}
                className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
                        muted 
                        ? 'bg-neutral-800 border-white/60 text-white shadow-md hover:bg-neutral-700 hover:border-white' 
                        : 'bg-neutral-900 border-neonOrange text-neonOrange shadow-[0_0_12px_rgba(255,106,0,0.4)]'
                }`}
                title={muted ? 'Unmute sounds' : 'Mute sounds'}
            >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </motion.button>

            {/* Background Music Toggle & Volume */}
            {!muted && (
                <div 
                    className="relative group flex flex-col items-center gap-2"
                    onMouseEnter={() => setShowVolume(true)}
                    onMouseLeave={() => setShowVolume(false)}
                >
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleToggleMusic}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 relative ${
                            musicOn 
                                ? 'bg-neutral-900 border-violet text-violet shadow-[0_0_12px_rgba(139,92,246,0.4)]' 
                                : 'bg-neutral-800 border-white/60 text-white shadow-md hover:bg-neutral-700 hover:border-white'
                        }`}
                        title={musicOn ? 'Stop ambient music' : 'Play ambient music'}
                    >
                        {musicOn ? <Disc3 size={18} className="animate-spin-slow" /> : <Music size={18} />}
                    </motion.button>

                    <AnimatePresence>
                        {musicOn && showVolume && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="bg-neutral-900 border border-neutral-800 rounded-full p-2 py-4 flex flex-col items-center"
                            >
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-24 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer -rotate-90 origin-center translate-y-[40px] mb-[80px]"
                                    style={{
                                        background: `linear-gradient(to right, #8B5CF6 ${volume}%, #333 ${volume}%)`
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};
