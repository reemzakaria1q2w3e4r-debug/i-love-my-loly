
import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import Book from './components/Book';
import MobileStoryView from './components/MobileStoryView';

const storyData = [
  {
    title: 'Page One: The Beginning',
    content: (
      <>
        <p>My dearest Loly,</p>
        <p>The moment I held a pen to write to you, I felt the paper could never hold everything I feel inside. Maybe there’s a distance between Egypt and Switzerland, but every word I write makes it feel smaller.</p>
        <p>I started learning German for a small dream… but I didn’t know the real dream was meeting you. From the very first words we shared, I felt something different — not coincidence, not luck.</p>
        <p>It was peace… warmth… like my soul finally found its <span className="highlight-word">home</span> in your voice.</p>
      </>
    ),
  },
  {
    title: 'Page Two: About You',
    content: (
      <>
        <p>Loly…</p>
        <p>You’re not like anyone I’ve ever met. Your taste, your thoughts, your way of speaking — they all carry wisdom and kindness. I love that you’re respectful, simple, and pure-hearted.</p>
        <p>Every time you laugh, the whole world seems to smile with you. And when you’re sad, my heart aches quietly.</p>
        <p>I never thought someone I’ve never seen in person could become this close to my heart… But you, you became that <span className="highlight-word">miracle</span>.</p>
      </>
    ),
  },
  {
    title: 'Page Three: The Days We’ve Shared',
    content: (
      <>
        <p>Do you remember the first time I told you “I love you”? I was nervous, uncertain… But you replied so naturally — like you’d been waiting for those words all along.</p>
        <p>Since that day, I’ve known that <span className="highlight-word">fate</span> brought us together for a reason. It’s been five months, just words between us — but every day built another page of our story.</p>
        <p>We argue, yes… but we always find our way back. Because neither of us really knows how to stay away from the other. You’ve become the reason I wake up wanting to be better — So that when we finally meet, I’ll be the man who truly deserves you.</p>
      </>
    ),
  },
    {
    title: 'Page Four: The Promise',
    content: (
      <>
        <p>Maybe the road won’t be easy, and maybe the meeting won’t be soon… But I promise you, Loly, there won’t be a single day I don’t love you more.</p>
        <p>I promise to keep learning, working, and fighting — Until the day I stand before you, not behind a screen, and say: “I made it. I’m here. To stay with you, for life.”</p>
        <p>That day will come, even if it takes time. Because true love doesn’t know distance or deadlines. It is a <span className="highlight-word">promise</span>.</p>
      </>
    ),
  },
  {
    title: 'Page Five: The End (and the Beginning)',
    content: (
      <>
        <p>Loly…</p>
        <p>When this letter reaches you, hold it close to your heart for a moment — maybe you’ll feel my heartbeat through it. Paper can’t carry my voice, but it can carry my feelings.</p>
        <p>I love you in every language, in Arabic, in German, and even in the silence between our hearts.</p>
        <p>You are my home, my peace, and the <span className="highlight-word">most beautiful coincidence</span> of my life.</p>
        <p>Until we meet soon,<br />Lolo ❤️</p>
      </>
    ),
  },
];

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []); 
    return windowSize;
};


const App: React.FC = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  return (
    <div className="bg-stone-900 min-h-screen w-full h-full flex items-center justify-center perspective-1000">
      <FloatingHearts />
      <main className="w-full h-full">
        {!isBookOpen ? (
          <HeroSection onOpenBook={() => setIsBookOpen(true)} />
        ) : isMobile ? (
            <MobileStoryView pages={storyData} onCloseBook={() => setIsBookOpen(false)} />
        ) : (
          <Book pages={storyData} onCloseBook={() => setIsBookOpen(false)} />
        )}
      </main>
      <MusicPlayer />
    </div>
  );
};

export default App;
