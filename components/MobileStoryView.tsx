import React, { useState, useRef } from 'react';
import Page from './Page';

interface PageData {
    title: string;
    content: React.ReactNode;
}

interface MobileStoryViewProps {
    pages: PageData[];
    onCloseBook: () => void;
}

const MobileStoryView: React.FC<MobileStoryViewProps> = ({ pages, onCloseBook }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [hearts, setHearts] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);
    const pageTurnSoundRef = useRef<HTMLAudioElement>(null);

    const changePage = (newIndex: number) => {
        if (newIndex < 0 || newIndex >= pages.length || newIndex === currentPage) return;

        // Play sound effect
        if (pageTurnSoundRef.current) {
            pageTurnSoundRef.current.currentTime = 0;
            pageTurnSoundRef.current.play().catch(error => {
                console.error("Page turn sound failed to play:", error);
            });
        }

        // Trigger heart burst
        const newHearts = Array.from({ length: 10 }).map((_, i) => ({
            id: Date.now() + i,
            style: {
                left: '50%',
                top: '50%',
                animation: `heart-burst 0.7s ${i * 0.04}s ease-out forwards`,
                '--angle': `${Math.random() * 360}deg`,
                '--distance': `${Math.random() * 50 + 40}px`,
            },
        }));
        setHearts(newHearts);
        setTimeout(() => setHearts([]), 800);

        setCurrentPage(newIndex);
    };

    // Swipe gestures
    const touchStartX = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX.current;
        if (Math.abs(deltaX) > 40) { // Swipe threshold
            if (deltaX < 0) changePage(currentPage + 1);
            else changePage(currentPage - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-stone-900 z-30 flex flex-col font-sans">
            <audio ref={pageTurnSoundRef} preload="auto">
                <source src="https://cdn.pixabay.com/audio/2022/03/15/audio_b6562f8e32.mp3" type="audio/mpeg" />
            </audio>
            <style>{`
                @keyframes heart-burst {
                    0% { transform: translate(-50%, -50%) rotate(var(--angle)) scale(0.3); opacity: 1; }
                    100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--distance))) scale(1); opacity: 0; }
                }
                .heart-burst-item {
                    position: absolute;
                    color: #fecdd3;
                    width: 1.75rem;
                    height: 1.75rem;
                }
                @keyframes page-fade-in {
                    from { opacity: 0.5; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                .page-content-mobile {
                    animation: page-fade-in 0.4s ease-out forwards;
                }
            `}</style>
            
            {/* Header */}
            <header className="flex-shrink-0 z-40 bg-stone-900/80 backdrop-blur-sm flex justify-between items-center p-2 text-rose-200">
                <button 
                    onClick={onCloseBook}
                    className="p-3 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Close story"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="flex space-x-2">
                    {pages.map((_, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === index ? 'bg-rose-300 scale-125' : 'bg-rose-300/40'}`} />
                    ))}
                </div>
                <div className="w-12 h-12"></div> {/* Spacer */}
            </header>

            {/* Main Content */}
            <main 
                className="flex-grow relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Heart Burst Container */}
                <div className="absolute inset-0 pointer-events-none z-20">
                    {hearts.map(heart => (
                        <div key={heart.id} className="heart-burst-item" style={heart.style}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                        </div>
                    ))}
                </div>

                {/* Page */}
                <div className="absolute inset-0 p-2 sm:p-4">
                    <section 
                        key={currentPage} 
                        className="page-content-mobile bg-[#f3e5d8] rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
                    >
                        <div className="overflow-y-auto h-full">
                            <Page 
                                title={pages[currentPage].title}
                                content={pages[currentPage].content}
                                pageNumber={currentPage + 1}
                            />
                        </div>
                    </section>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => changePage(currentPage - 1)}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white transition-opacity duration-300 ${currentPage > 0 ? 'opacity-50 hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
                    aria-label="Previous Page"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                    onClick={() => changePage(currentPage + 1)}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white transition-opacity duration-300 ${currentPage < pages.length - 1 ? 'opacity-50 hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
                    aria-label="Next Page"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </main>
        </div>
    );
};

export default MobileStoryView;