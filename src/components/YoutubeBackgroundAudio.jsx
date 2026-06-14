import React, { useEffect, useRef, useState } from 'react';

export const YoutubeBackgroundAudio = () => {
    const playerRef = useRef(null);
    const [isApiReady, setIsApiReady] = useState(false);

    useEffect(() => {
        // Load YouTube API
        if (!window.YT || !window.YT.Player) {
            // Only add the script if it hasn't been added yet
            if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                const tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                document.head.appendChild(tag);
            }
            
            // We need to keep the previous callback if there is one
            const prevCallback = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (prevCallback) prevCallback();
                setIsApiReady(true);
            };
        } else {
            setIsApiReady(true);
        }
    }, []);

    useEffect(() => {
        if (!isApiReady) return;

        try {
            playerRef.current = new window.YT.Player('yt-player', {
                height: '10',
                width: '10',
                videoId: 'cIto6qzW0Mc', // Correct 11-character ID
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    loop: 1,
                    playlist: 'cIto6qzW0Mc', // Required for loop
                }
            });
        } catch (error) {
            console.error("YouTube Player failed to initialize:", error);
        }

        // Apply initial volume once player is ready
        if (playerRef.current && playerRef.current.setVolume) {
            import('../utils/sounds').then(module => {
                playerRef.current.setVolume(module.getBackgroundVolume());
            });
        }

        const handlePlay = () => {
            if (playerRef.current && playerRef.current.playVideo) {
                // We don't hardcode volume here anymore, let the handleVolume take care of it or initialize it
                playerRef.current.playVideo();
            }
        };

        const handleVolume = (e) => {
            if (playerRef.current && playerRef.current.setVolume) {
                playerRef.current.setVolume(e.detail);
            }
        };

        const handlePause = () => {
            if (playerRef.current && playerRef.current.pauseVideo) {
                playerRef.current.pauseVideo();
            }
        };

        window.addEventListener('play-yt-music', handlePlay);
        window.addEventListener('pause-yt-music', handlePause);
        window.addEventListener('volume-yt-music', handleVolume);

        return () => {
            window.removeEventListener('play-yt-music', handlePlay);
            window.removeEventListener('pause-yt-music', handlePause);
            window.removeEventListener('volume-yt-music', handleVolume);
        };
    }, [isApiReady]);

    return <div id="yt-player" className="fixed top-0 left-0 w-[10px] h-[10px] opacity-[0.01] pointer-events-none z-[-1]" />;
};
