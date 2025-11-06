
import React from 'react';

interface HeroSectionProps {
    onOpenBook: () => void;
}

const RosePetal: React.FC<{ className: string }> = ({ className }) => (
    <svg 
        viewBox="0 0 100 100" 
        className={`absolute w-24 h-24 text-rose-300/30 fill-current ${className}`}
        style={{ filter: 'blur(2px)' }}
    >
        <path d="M50 0 C0 25, 0 75, 50 100 C100 75, 100 25, 50 0 Z" />
    </svg>
);

const FloatingHeart: React.FC<{ className: string }> = ({ className }) => (
    <svg 
        viewBox="0 0 24 24" 
        className={`absolute w-16 h-16 text-rose-400/20 fill-current animate-pulse ${className}`}
        style={{ filter: 'blur(3px)' }}
    >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const FloatingStar: React.FC<{ className: string }> = ({ className }) => (
    <svg 
        viewBox="0 0 24 24" 
        className={`absolute w-12 h-12 text-amber-300/20 fill-current animate-pulse ${className}`}
        style={{ filter: 'blur(3px)' }}
    >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

const Candle: React.FC<{ className: string }> = ({ className }) => (
    <div className={`absolute ${className}`}>
        <style>{`
            @keyframes flicker {
                0%, 100% { opacity: 1; transform: scaleY(1) translateY(0); }
                50% { opacity: 0.7; transform: scaleY(0.98) translateY(1px); }
            }
            .flame {
                animation: flicker 1.5s ease-in-out infinite;
                transform-origin: bottom;
            }
        `}</style>
        <svg width="60" height="120" viewBox="0 0 60 120" className="opacity-70">
            {/* Candle Body */}
            <defs>
                <linearGradient id="candleGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#F8E9E9" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#F8E9E9" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#F8E9E9" stopOpacity="0.8"/>
                </linearGradient>
                <radialGradient id="flameGradient">
                    <stop offset="0%" stopColor="#FCD34D" />
                    <stop offset="90%" stopColor="transparent" />
                </radialGradient>
            </defs>
            <rect x="20" y="40" width="20" height="80" fill="url(#candleGradient)" rx="2"/>
            {/* Wick */}
            <line x1="30" y1="40" x2="30" y2="35" stroke="#4a2c2a" strokeWidth="1.5" />
            {/* Flame */}
            <ellipse className="flame" cx="30" cy="25" rx="7" ry="12" fill="url(#flameGradient)" />
            {/* Glow */}
            <ellipse cx="30" cy="25" rx="15" ry="20" fill="#FCD34D" style={{ filter: 'blur(15px)', opacity: 0.3 }} />
        </svg>
    </div>
);


const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBook }) => {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-black opacity-90 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 z-0"></div>
            
            <div className="relative z-10 text-center text-white p-8 flex flex-col items-center">
                <RosePetal className="top-10 left-10 transform -rotate-45" />
                <RosePetal className="bottom-20 right-5 transform rotate-30 scale-75" />
                <FloatingHeart className="top-1/3 left-1/4 transform -rotate-12 scale-75" />
                <FloatingStar className="bottom-1/3 right-1/4 transform rotate-12 scale-50" />
                <RosePetal className="bottom-1/4 left-1/4 transform -rotate-12 scale-90" />


                <h1 className="font-cursive text-7xl md:text-9xl text-amber-300" style={{ textShadow: '0 0 15px rgba(252, 211, 77, 0.7)' }}>
                    Our Love Story
                </h1>
                <p className="mt-4 text-3xl md:text-4xl text-rose-200 tracking-widest">
                    Lolo & Loly
                </p>
                 <p className="mt-2 text-lg text-rose-200/80 tracking-widest">
                    Est. 2024
                </p>
                <button 
                    onClick={onOpenBook} 
                    className="mt-16 text-amber-200 animate-bounce-slow flex flex-col items-center group focus:outline-none"
                >
                    <span className="group-hover:text-white transition-colors duration-300">Click to open our story</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>

            {/* Book spine effect */}
            <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/60 via-stone-900/80 to-transparent"></div>
            <Candle className="bottom-0 right-4 hidden md:block" />
        </section>
    );
};

export default HeroSection;
