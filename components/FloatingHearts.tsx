
import React from 'react';

const FloatingHearts: React.FC = () => {
    const isMobile = window.innerWidth <= 768;
    const hearts = Array.from({ length: isMobile ? 8 : 15 });

    const Heart: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
        <div className="heart absolute text-rose-400" style={style}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </div>
    );
    
    return (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
            {hearts.map((_, i) => {
                const size = Math.random() * 2 + 1; // 1rem to 3rem
                const style = {
                    width: `${size}rem`,
                    height: `${size}rem`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 10 + 10}s`, // 10s to 20s
                    animationDelay: `${Math.random() * 15}s`,
                    opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
                };
                return <Heart key={i} style={style} />;
            })}
        </div>
    );
};

export default FloatingHearts;
