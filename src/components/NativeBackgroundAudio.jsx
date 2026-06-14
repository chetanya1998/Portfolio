import React, { useEffect, useRef } from 'react';

export const NativeBackgroundAudio = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const handlePlay = () => {
            if (audioRef.current) {
                // Modern browsers require user interaction before play() resolves.
                // Since this event is triggered by a click in AudioControl, it usually satisfies the requirement.
                audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
            }
        };

        const handlePause = () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };

        const handleVolume = (e) => {
            if (audioRef.current) {
                // HTML5 Audio volume is 0.0 to 1.0
                audioRef.current.volume = Math.max(0, Math.min(1, e.detail / 100));
            }
        };

        window.addEventListener('play-yt-music', handlePlay);
        window.addEventListener('pause-yt-music', handlePause);
        window.addEventListener('volume-yt-music', handleVolume);

        // Set initial volume
        import('../utils/sounds').then(module => {
            if (audioRef.current) {
                audioRef.current.volume = Math.max(0, Math.min(1, module.getBackgroundVolume() / 100));
            }
        });

        return () => {
            window.removeEventListener('play-yt-music', handlePlay);
            window.removeEventListener('pause-yt-music', handlePause);
            window.removeEventListener('volume-yt-music', handleVolume);
        };
    }, []);

    // Provide a fallback public URL for testing, or use local ambient.mp3
    return (
        <audio 
            ref={audioRef}
            src={`${import.meta.env.BASE_URL}ambient.mp3`} 
            loop 
            preload="auto"
            className="hidden"
        />
    );
};
