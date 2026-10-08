import React, { useState, useEffect } from 'react';
import { NewsFlash } from '../types/blog';
import { ChevronRight, ChevronLeft, Zap, ExternalLink } from 'lucide-react';

interface NewsTickerProps {
  flashes: NewsFlash[];
  onSelectFlash: (flash: NewsFlash) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ flashes, onSelectFlash }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || flashes.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flashes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, flashes.length]);

  if (flashes.length === 0) return null;
  const current = flashes[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? flashes.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % flashes.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-stone-900 text-stone-200 border-b border-stone-800 text-xs py-2 px-4 sm:px-8 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          {/* Ticker Kicker - Non-pill unboxed uppercase text */}
          <div className="flex items-center gap-1.5 shrink-0 text-amber-400 font-mono tracking-wider font-semibold">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span className="uppercase text-[11px]">DISPATCH WIRE:</span>
          </div>

          <button
            onClick={() => onSelectFlash(current)}
            className="text-left truncate flex-1 hover:text-white transition-colors cursor-pointer group flex items-center gap-2"
          >
            <span className="text-stone-400 font-mono text-[11px] shrink-0">
              [{current.timeAgo}]
            </span>
            <span className="font-medium text-stone-100 truncate group-hover:underline">
              {current.headline}
            </span>
            <span className="text-stone-500 text-[11px] hidden md:inline">
              — {current.source}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] font-mono text-stone-400 mr-2 hidden sm:inline">
            {currentIndex + 1}/{flashes.length}
          </span>
          <button
            onClick={handlePrev}
            aria-label="Previous dispatch"
            className="p-1 text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next dispatch"
            className="p-1 text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
