
import React from 'react';
import HeartDivider from './HeartDivider';

interface PageProps {
    title: string;
    content: React.ReactNode;
    pageNumber: number;
}

const Page: React.FC<PageProps> = ({ title, content, pageNumber }) => {
    return (
        <div className="w-full bg-[#f3e5d8] text-stone-800 p-6 md:p-12 flex flex-col relative overflow-hidden md:h-full">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-40"></div>
            <div className="relative z-10 flex-grow flex flex-col">
                <h2 className="font-cursive text-4xl md:text-5xl text-rose-800 mb-4 text-center" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                    {title}
                </h2>
                <HeartDivider />
                <div className="text-stone-700 text-base md:text-lg leading-relaxed space-y-4 prose prose-p:text-stone-700">
                    {content}
                </div>
            </div>
            <div className="relative z-10 text-center pt-6 md:pt-0 md:mt-auto">
                <span className="text-stone-500 text-sm">{pageNumber}</span>
            </div>
            <style>{`
                .prose .highlight-word {
                    color: #B76E79; /* Romantic Rose Gold */
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .prose .highlight-word:hover {
                    color: #5D4037; /* Warm Brown */
                }
            `}</style>
        </div>
    );
};

export default Page;
