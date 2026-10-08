import React from 'react';
import { Article } from '../types/blog';
import { X, Bookmark, Trash2, ArrowRight, Download, BookOpen } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handleExportReadingList = () => {
    const markdown = `# Neural Dispatch — Curated Reading List\n\nGenerated on ${new Date().toLocaleDateString()}\n\n` +
      bookmarkedArticles
        .map(
          (a, i) =>
            `${i + 1}. **${a.title}**\n   - Category: ${a.category}\n   - Author: ${a.author.name} (${a.author.role})\n   - Date: ${a.publishedAt}\n   - Abstract: ${a.deck}\n`
        )
        .join('\n');

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neural-dispatch-reading-list-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col border-l border-stone-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-800 fill-amber-800" />
            <h2 className="font-editorial text-xl font-bold text-stone-950">
              Personal Reading Library
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500 border-b border-stone-200 pb-2">
            <span>SAVED DISPATCHES ({bookmarkedArticles.length})</span>
            {bookmarkedArticles.length > 0 && (
              <button
                onClick={onClearAll}
                className="hover:text-rose-700 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {bookmarkedArticles.length === 0 ? (
            <div className="py-16 text-center text-stone-500 space-y-3">
              <BookOpen className="w-8 h-8 mx-auto text-stone-400 stroke-1" />
              <p className="font-editorial text-lg text-stone-700">
                Your reading list is empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Bookmark dispatches, technical deep dives, and research papers to review at your convenience.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 bg-white border border-stone-200 rounded hover:border-stone-400 transition-colors group relative"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1.5">
                  <span className="text-amber-800 font-semibold">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="font-editorial text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer leading-snug line-clamp-2"
                >
                  {article.title}
                </h3>

                <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                  {article.deck}
                </p>

                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    By {article.author.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveBookmark(article.id)}
                      className="p-1 text-stone-400 hover:text-rose-700 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="text-xs font-medium text-stone-900 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
            <button
              onClick={handleExportReadingList}
              className="w-full py-2.5 px-4 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Reading List (.md)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
