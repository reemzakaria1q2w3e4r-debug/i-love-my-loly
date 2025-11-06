import React, { useState, useEffect } from 'react';
import Page from './Page';

interface PageData {
    title: string;
    content: React.ReactNode;
}

interface BookProps {
    pages: PageData[];
    onCloseBook: () => void;
}

const Book: React.FC<BookProps> = ({ pages, onCloseBook }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    // Ensure there's an even number of pages for the book spreads
    const bookPages = pages.length % 2 !== 0 
        ? [...pages, { title: '', content: '' }] 
        : pages;
    
    const totalPages = bookPages.length;

    const goToNextPage = () => {
        if (currentPage < totalPages - 2 && !isFlipping) {
            setIsFlipping(true);
            setCurrentPage(prev => prev + 2);
            setTimeout(() => setIsFlipping(false), 1200); // Corresponds to animation duration
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 0 && !isFlipping) {
            setIsFlipping(true);
            setCurrentPage(prev => prev - 2);
            setTimeout(() => setIsFlipping(false), 1200);
        }
    };
    
    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                goToNextPage();
            } else if (e.key === 'ArrowLeft') {
                goToPrevPage();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, isFlipping]);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center p-4 font-sans">
             <style>{`
                .book-container {
                    perspective: 2500px;
                }
                .flippable-page {
                    position: absolute;
                    width: 50%;
                    height: 100%;
                    transform-style: preserve-3d;
                    transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1);
                }
                .page-face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                }
                .page-front {
                    transform: rotateY(0deg);
                }
                .page-back {
                    transform: rotateY(180deg);
                }
            `}</style>
            <div 
              className="book-container w-full max-w-6xl aspect-[2/1.2] relative shadow-2xl shadow-black/70"
            >
                {bookPages.map((page, index) => {
                    const isLeftPage = index % 2 === 0;
                    const isFlipped = currentPage > index;
                    const zIndex = totalPages - index;
                    
                    if (isLeftPage) {
                        // This is a left-side page, which is the back of a flippable sheet
                        return null; 
                    }

                    // This is a right-side page, which is the front of a flippable sheet
                    return (
                        <div 
                            key={index}
                            className="flippable-page"
                            style={{
                                right: '0',
                                transformOrigin: 'left center',
                                transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                                zIndex: isFlipped ? zIndex : totalPages + zIndex, // Prioritize pages that are not yet flipped
                            }}
                        >
                            <div className="page-face page-front">
                                <Page 
                                    title={bookPages[index - 1].title}
                                    content={bookPages[index - 1].content}
                                    pageNumber={index}
                                />
                            </div>
                            <div className="page-face page-back">
                                <Page 
                                    title={page.title}
                                    content={page.content}
                                    pageNumber={index + 1}
                                />
                            </div>
                        </div>
                    );
                })}
                 <div className="w-1/2 h-full absolute left-0 top-0 bg-[#f3e5d8] shadow-inner" style={{zIndex: 0}}>
                    {/* This is the static first page when the book is open */}
                    {currentPage === 0 && (
                         <Page 
                            title={bookPages[0].title}
                            content={bookPages[0].content}
                            pageNumber={1}
                        />
                    )}
                 </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between w-full max-w-6xl mt-6 text-rose-200">
                <button 
                    onClick={goToPrevPage} 
                    disabled={currentPage === 0 || isFlipping}
                    className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Previous
                </button>
                
                <div className="flex flex-col items-center">
                    <span>Page {currentPage + 1}{bookPages[currentPage+1] && ` - ${currentPage+2}`}</span>
                     <button 
                        onClick={onCloseBook}
                        className="mt-2 px-4 py-1 text-xs rounded-full hover:bg-white/10 transition-colors"
                    >
                        Close Book
                    </button>
                </div>

                <button 
                    onClick={goToNextPage} 
                    disabled={currentPage >= totalPages - 2 || isFlipping}
                    className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </button>
            </div>
        </div>
    );
};

export default Book;