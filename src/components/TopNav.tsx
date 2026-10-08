import React from 'react';
import { Bookmark, Search, Mail, Sparkles, Send } from 'lucide-react';
import { ArticleCategory } from '../types/blog';

interface TopNavProps {
  activeCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenNewsletter: () => void;
  onOpenSubmitTip: () => void;
  bookmarkCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenBookmarks,
  onOpenNewsletter,
  onOpenSubmitTip,
  bookmarkCount,
}) => {
  const categories: ArticleCategory[] = [
    'All',
    'Frontier Models',
    'Embodied AI',
    'Silicon & Compute',
    'Bio & Science',
    'Autonomous Agents',
    'Policy & Governance',
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200">
      {/* Editorial Masthead Ribbon */}
      <div className="border-b border-stone-200/60 py-1.5 px-4 sm:px-8 text-[11px] text-stone-500 font-mono tracking-wider flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>VOL. VIII · ISSUE 41</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline">SAN FRANCISCO & GLOBAL</span>
          <span aria-hidden="true">·</span>
          <span>AUTONOMOUS INTELLIGENCE CHRONICLE</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSubmitTip}
            className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <Send className="w-3 h-3 text-amber-700" />
            <span>Submit Dispatch</span>
          </button>
          <span aria-hidden="true">·</span>
          <span className="text-stone-600">Updated Hourly</span>
        </div>
      </div>

      {/* Primary Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display serif face */}
        <button
          onClick={() => onSelectCategory('All')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 group-hover:text-amber-800 transition-colors">
            Neural Dispatch
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-stone-600 overflow-x-auto py-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap cursor-pointer transition-colors pb-0.5 border-b ${
                  isActive
                    ? 'text-stone-950 font-semibold border-stone-900'
                    : 'border-transparent hover:text-stone-950 hover:border-stone-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            aria-label="Search articles"
            className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenBookmarks}
            aria-label="View saved bookmarks"
            className="relative p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-mono rounded-full flex items-center justify-center font-bold">
                {bookmarkCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenNewsletter}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors rounded cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Subscribe</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Sub-Category Bar */}
      <div className="lg:hidden px-4 py-2 border-t border-stone-200/60 overflow-x-auto flex items-center gap-4 text-xs font-medium text-stone-600 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap shrink-0 pb-0.5 transition-colors ${
              activeCategory === cat
                ? 'text-stone-950 font-bold border-b border-stone-900'
                : 'hover:text-stone-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
};
