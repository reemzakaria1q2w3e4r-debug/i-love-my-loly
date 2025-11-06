
import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isInteracted, setIsInteracted] = useState(false);

    // This effect runs once on mount to detect the first user interaction,
    // which is required by browsers to play audio.
    useEffect(() => {
        const onFirstInteraction = () => {
            setIsInteracted(true);
            window.removeEventListener('click', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
        };
        
        window.addEventListener('click', onFirstInteraction);
        window.addEventListener('keydown', onFirstInteraction);

        return () => {
            window.removeEventListener('click', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
        };
    }, []);

    // This effect handles the audio play/pause side effect whenever `isPlaying` state changes.
    // This decouples the action from the state update and prevents race conditions.
    useEffect(() => {
        if (isInteracted && audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Audio playback failed:", error);
                    // If play fails for any reason, reset the state to reflect that.
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, isInteracted]);

    // This function now only toggles the desired state (playing or not playing).
    const togglePlayPause = () => {
        if (!isInteracted) return;
        setIsPlaying(prevIsPlaying => !prevIsPlaying);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <audio ref={audioRef} loop>
                <source src="https://cdn.pixabay.com/audio/2022/02/14/audio_2041a155c2.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            
            <button 
                onClick={togglePlayPause}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out
                            ${!isInteracted ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-rose-300/30 backdrop-blur-md border border-white/10 shadow-lg hover:bg-rose-300/50'}
                            ${isPlaying ? 'scale-110' : ''}`}
                title={isInteracted ? (isPlaying ? 'Pause Music' : 'Play Music') : 'Click anywhere to enable music'}
                disabled={!isInteracted}
            >
                {isPlaying ? (
                    <svg className="w-6 h-6 text-rose-100" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-rose-100" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.118v3.764a1 1 0 001.555.832l3.197-1.882a1 1 0 000-1.664l-3.197-1.882z" clipRule="evenodd"></path>
                    </svg>
                )}
            </button>
        </div>
    );
};

export default MusicPlayer;
