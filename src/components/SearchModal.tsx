import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types/blog';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredArticles = query.trim()
    ? articles.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.deck.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  const suggestedQueries = [
    'Test-Time Compute',
    'Humanoid Robots',
    'Photonic Interconnects',
    'Synthetic Biology',
    'Autonomous Swarms',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-[#FAF9F6] rounded-lg shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search AI dispatches, research papers, researchers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-stone-900 placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono text-stone-500 hover:text-stone-900 px-2 py-1 rounded bg-stone-100"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-4 overflow-y-auto flex-1">
          {query.trim() === '' ? (
            <div className="py-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                Suggested Research Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded transition-colors cursor-pointer font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-stone-500 space-y-2">
              <p className="font-editorial text-lg text-stone-800">
                No matching dispatches found
              </p>
              <p className="text-xs">
                Try searching for broader terms like "reasoning", "chips", or "robotics".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-mono text-stone-500 pb-1 border-b border-stone-200">
                FOUND {filteredArticles.length} ARTICLES
              </div>
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="p-3 bg-white rounded border border-stone-200/80 hover:border-stone-400 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500 mb-1">
                    <span className="text-amber-800 font-semibold">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="font-editorial text-base font-bold text-stone-950 group-hover:text-amber-800 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-1 mt-1">
                    {article.deck}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
