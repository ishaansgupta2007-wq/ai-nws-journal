import React, { useState, useMemo } from 'react';
import { TopNav } from './components/TopNav';
import { NewsTicker } from './components/NewsTicker';
import { ArticleVisual } from './components/ArticleVisual';
import { ArticleModal } from './components/ArticleModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SearchModal } from './components/SearchModal';
import { NewsletterModal } from './components/NewsletterModal';
import { SubmitDispatchModal } from './components/SubmitDispatchModal';
import { NewsFlashModal } from './components/NewsFlashModal';
import { INITIAL_ARTICLES, INITIAL_NEWS_FLASHES } from './data/articles';
import { Article, ArticleCategory, NewsFlash, VisualType } from './types/blog';
import {
  Bookmark,
  Heart,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  Send,
  Mail,
  ChevronRight,
  Cpu,
  Bot,
  Dna,
  BrainCircuit,
} from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [newsFlashes, setNewsFlashes] = useState<NewsFlash[]>(INITIAL_NEWS_FLASHES);
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedFlash, setSelectedFlash] = useState<NewsFlash | null>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isSubmitTipOpen, setIsSubmitTipOpen] = useState(false);

  // Bookmarked articles tracking
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    new Set(['lead-reasoning-frontiers', 'sec-silicon-photonic'])
  );

  // Sorting
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'in-depth'>('latest');

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleLike = (id: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
    );
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const handleAddComment = (
    articleId: string,
    commentData: { author: string; role: string; content: string }
  ) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: commentData.author,
      role: commentData.role,
      avatarInitials: commentData.author.slice(0, 2).toUpperCase(),
      timestamp: 'Just now',
      content: commentData.content,
      likes: 0,
    };

    setArticles((prev) =>
      prev.map((a) =>
        a.id === articleId ? { ...a, comments: [newComment, ...a.comments] } : a
      )
    );

    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle((prev) =>
        prev ? { ...prev, comments: [newComment, ...prev.comments] } : null
      );
    }
  };

  const handleSubmitDispatch = (newPost: {
    title: string;
    deck: string;
    category: ArticleCategory;
    authorName: string;
    affiliation: string;
    content: string;
    visualType: VisualType;
  }) => {
    const article: Article = {
      id: `user-${Date.now()}`,
      slug: newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newPost.title,
      deck: newPost.deck,
      category: newPost.category,
      publishedAt: 'October 7, 2026',
      readTime: '5 min read',
      tier: 'secondary',
      author: {
        name: newPost.authorName,
        role: 'Research Contributor',
        affiliation: newPost.affiliation,
        avatarInitials: newPost.authorName.slice(0, 2).toUpperCase(),
      },
      visualType: newPost.visualType,
      visualTitle: 'Submitted Research Schematic',
      visualCaption: `Fig. ${articles.length + 1} — Computational modeling submitted by ${newPost.authorName} (${newPost.affiliation}).`,
      tags: [newPost.category, 'Peer Submitted', 'Frontier AI'],
      likes: 1,
      takeaways: [
        'Experimental validation of community-submitted hypotheses in AI research.',
        'Continuous integration of independent laboratory findings into the journal ledger.',
      ],
      contentSections: [
        {
          heading: 'Methodology & Observation',
          body: newPost.content,
        },
      ],
      comments: [],
    };

    setArticles((prev) => [article, ...prev]);
  };

  // Filter & sort articles
  const filteredArticles = useMemo(() => {
    return articles
      .filter((a) => {
        if (activeCategory !== 'All' && a.category !== activeCategory) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            a.title.toLowerCase().includes(q) ||
            a.deck.toLowerCase().includes(q) ||
            a.author.name.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.likes - a.likes;
        if (sortBy === 'in-depth') {
          const numA = parseInt(a.readTime) || 0;
          const numB = parseInt(b.readTime) || 0;
          return numB - numA;
        }
        return 0; // Default order
      });
  }, [articles, activeCategory, searchQuery, sortBy]);

  // Lead story (Tier 1)
  const leadArticle = useMemo(() => {
    if (activeCategory !== 'All') {
      return filteredArticles[0] || null;
    }
    return articles.find((a) => a.tier === 'lead') || articles[0];
  }, [articles, activeCategory, filteredArticles]);

  // Secondary stories (Tier 2)
  const secondaryArticles = useMemo(() => {
    if (activeCategory !== 'All') {
      return filteredArticles.slice(1, 4);
    }
    return articles.filter((a) => a.tier === 'secondary');
  }, [articles, activeCategory, filteredArticles]);

  // Dispatches / Archive feed (Tier 3)
  const dispatchArticles = useMemo(() => {
    if (activeCategory !== 'All') {
      return filteredArticles.slice(4);
    }
    return articles.filter((a) => a.tier === 'dispatch');
  }, [articles, activeCategory, filteredArticles]);

  const bookmarkedArticlesList = useMemo(() => {
    return articles.filter((a) => bookmarkedIds.has(a.id));
  }, [articles, bookmarkedIds]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col font-sans">
      {/* Editorial Top Navigation */}
      <TopNav
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        onOpenSubmitTip={() => setIsSubmitTipOpen(true)}
        bookmarkCount={bookmarkedIds.size}
      />

      {/* Breaking Wire Ticker */}
      <NewsTicker
        flashes={newsFlashes}
        onSelectFlash={(flash) => setSelectedFlash(flash)}
      />

      {/* Main Editorial Content Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        {/* Curatorial Header & Filter Controls */}
        <section className="mb-8 pb-6 border-b border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono tracking-widest text-stone-500 uppercase mb-1">
                DISPATCH CATALOG · {activeCategory.toUpperCase()}
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-950">
                Frontier Intelligence & Research Analysis
              </h1>
            </div>

            {/* Filter Controls (Allowed functional button tabs) */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded border border-stone-200 text-xs">
                <button
                  onClick={() => setSortBy('latest')}
                  className={`px-3 py-1 font-medium rounded transition-colors cursor-pointer ${
                    sortBy === 'latest'
                      ? 'bg-white text-stone-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Latest
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`px-3 py-1 font-medium rounded transition-colors cursor-pointer ${
                    sortBy === 'popular'
                      ? 'bg-white text-stone-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Most Discussed
                </button>
                <button
                  onClick={() => setSortBy('in-depth')}
                  className={`px-3 py-1 font-medium rounded transition-colors cursor-pointer ${
                    sortBy === 'in-depth'
                      ? 'bg-white text-stone-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Long-Form
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3-TIER SALIENCE EDITORIAL GRID */}

        {/* TIER 1: LEAD STORY (Dominant visual weight and headline) */}
        {leadArticle && (
          <section className="mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-6 sm:p-8 rounded-lg border border-stone-200/90 shadow-xs hover:border-stone-300 transition-colors">
              {/* Left Column: Lead Graphic Visual */}
              <div
                onClick={() => setSelectedArticle(leadArticle)}
                className="lg:col-span-7 cursor-pointer"
              >
                <ArticleVisual
                  type={leadArticle.visualType}
                  title={leadArticle.visualTitle}
                  caption={leadArticle.visualCaption}
                  figureNumber={1}
                  aspectRatio="16:9"
                />
              </div>

              {/* Right Column: Editorial Lead Copy */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                <div>
                  {/* Clean unboxed metadata with separators (NO PILLS) */}
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-3">
                    <span className="font-semibold text-amber-800 uppercase">
                      {leadArticle.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{leadArticle.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{leadArticle.readTime}</span>
                  </div>

                  <h2
                    onClick={() => setSelectedArticle(leadArticle)}
                    className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-950 hover:text-amber-900 transition-colors cursor-pointer leading-[1.2]"
                  >
                    {leadArticle.title}
                  </h2>

                  <p className="font-editorial text-base sm:text-lg text-stone-700 leading-relaxed mt-4">
                    {leadArticle.deck}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-editorial text-xs font-bold">
                      {leadArticle.author.avatarInitials}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900">
                        {leadArticle.author.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {leadArticle.author.affiliation}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleBookmark(leadArticle.id)}
                      className={`p-2 rounded hover:bg-stone-100 transition-colors cursor-pointer ${
                        bookmarkedIds.has(leadArticle.id) ? 'text-amber-800' : 'text-stone-500'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarkedIds.has(leadArticle.id) ? 'fill-amber-800' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => setSelectedArticle(leadArticle)}
                      className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Read Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TIER 2: SECONDARY FEATURES (3 Structured visual cards) */}
        {secondaryArticles.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
              <h2 className="font-editorial text-2xl font-bold text-stone-950">
                Frontier Inquiries & Hardware Breakthroughs
              </h2>
              <span className="text-xs font-mono text-stone-500">
                {secondaryArticles.length} ARTICLES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {secondaryArticles.map((article, idx) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:border-stone-300 transition-colors shadow-xs group"
                >
                  <div
                    onClick={() => setSelectedArticle(article)}
                    className="cursor-pointer"
                  >
                    <ArticleVisual
                      type={article.visualType}
                      title={article.visualTitle}
                      caption={article.visualCaption}
                      figureNumber={idx + 2}
                      aspectRatio="4:3"
                    />

                    <div className="p-5">
                      {/* Clean unboxed metadata (NO PILLS) */}
                      <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500 mb-2">
                        <span className="text-amber-800 font-semibold uppercase">
                          {article.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-editorial text-xl font-bold text-stone-950 group-hover:text-amber-900 transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-stone-600 mt-2.5 line-clamp-3 leading-relaxed">
                        {article.deck}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 mt-auto border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-500">
                      By {article.author.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleBookmark(article.id)}
                        className={`p-1.5 rounded hover:bg-stone-100 transition-colors cursor-pointer ${
                          bookmarkedIds.has(article.id) ? 'text-amber-800' : 'text-stone-500'
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            bookmarkedIds.has(article.id) ? 'fill-amber-800' : ''
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="text-stone-900 hover:text-amber-800 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>Examine</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* TIER 3: TEXT-LED DISPATCHES & ARCHIVE WIRE STREAM */}
        {dispatchArticles.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
              <h2 className="font-editorial text-2xl font-bold text-stone-950">
                Dispatches & Policy Chronology
              </h2>
              <span className="text-xs font-mono text-stone-500">ARCHIVAL STREAM</span>
            </div>

            <div className="divide-y divide-stone-200 bg-white rounded-lg border border-stone-200/90 overflow-hidden">
              {dispatchArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="p-5 sm:p-6 hover:bg-stone-50/60 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                      <span className="text-amber-800 font-semibold uppercase">
                        {article.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.publishedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-950 group-hover:text-amber-900 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-1">
                      {article.deck}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:self-center">
                    <span className="text-xs text-stone-500 font-sans hidden md:inline">
                      {article.author.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBookmark(article.id);
                      }}
                      className={`p-1.5 rounded hover:bg-stone-200 transition-colors cursor-pointer ${
                        bookmarkedIds.has(article.id) ? 'text-amber-800' : 'text-stone-400'
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarkedIds.has(article.id) ? 'fill-amber-800' : ''
                        }`}
                      />
                    </button>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INLINE EDITORIAL NEWSLETTER BANNER */}
        <section className="bg-stone-900 text-stone-100 rounded-lg p-8 sm:p-12 mb-12 border border-stone-800">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="text-xs font-mono tracking-widest uppercase text-amber-400 font-semibold">
              ACADEMIC & ENTERPRISE INTELLIGENCE
            </div>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-white leading-tight">
              Direct Weekly Syntheses from the Frontier AI Research Labs
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
              Join 85,000+ research scientists, semiconductor architects, and policy advisors who rely on Neural Dispatch every Sunday morning.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setIsNewsletterOpen(true)}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs sm:text-sm rounded transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Subscribe to Weekly Intelligence Brief</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER (Restrained editorial BroadSheet footer) */}
      <footer className="border-t border-stone-300 bg-[#F4F1EA] py-12 px-4 sm:px-8 text-stone-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div className="space-y-3 md:col-span-1">
            <span className="font-editorial text-xl font-bold text-stone-950 block">
              Neural Dispatch
            </span>
            <p className="text-stone-600 leading-relaxed font-sans text-xs">
              An independent journal of artificial intelligence, computational architecture, and sovereign technological policy.
            </p>
            <div className="text-[11px] font-mono text-stone-500">
              ISSN 2994-1049 · EST. 2026
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-mono uppercase font-semibold text-stone-900 text-[11px] tracking-wider">
              Research Desks
            </div>
            <ul className="space-y-1.5 text-stone-600">
              <li>
                <button
                  onClick={() => setActiveCategory('Frontier Models')}
                  className="hover:text-stone-950 cursor-pointer"
                >
                  Frontier Foundation Models
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveCategory('Embodied AI')}
                  className="hover:text-stone-950 cursor-pointer"
                >
                  Embodied Robotics & Kinematics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveCategory('Silicon & Compute')}
                  className="hover:text-stone-950 cursor-pointer"
                >
                  Photonic Silicon & Datacenters
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveCategory('Bio & Science')}
                  className="hover:text-stone-950 cursor-pointer"
                >
                  De Novo Molecular Biology
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-mono uppercase font-semibold text-stone-900 text-[11px] tracking-wider">
              Reader Utilities
            </div>
            <ul className="space-y-1.5 text-stone-600">
              <li>
                <button
                  onClick={() => setIsBookmarksOpen(true)}
                  className="hover:text-stone-950 cursor-pointer"
                >
                  Saved Library ({bookmarkedIds.size})
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:text-stone-950 cursor-pointer"
                >
                  Search Dispatches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSubmitTipOpen(true)}
                  className="hover:text-stone-950 cursor-pointer"
                >
                  Submit Research Tip
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsNewsletterOpen(true)}
                  className="hover:text-stone-950 cursor-pointer"
                >
                  Intelligence Brief
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-mono uppercase font-semibold text-stone-900 text-[11px] tracking-wider">
              Verification Standards
            </div>
            <p className="text-stone-600 leading-relaxed text-xs">
              Every quantitative claim, theorem citation, and benchmark in Neural Dispatch is checked against deterministic code compilers, peer archives, and open-weights reproductions.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-stone-300 text-stone-500 text-[11px] font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2026 Neural Dispatch Journal Inc. All rights reserved.
          </div>
          <div>
            Published in San Francisco, Cambridge & Zurich
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onToggleBookmark={handleToggleBookmark}
        onLike={handleLike}
        onAddComment={handleAddComment}
        isBookmarked={selectedArticle ? bookmarkedIds.has(selectedArticle.id) : false}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticlesList}
        onSelectArticle={(article) => setSelectedArticle(article)}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={() => setBookmarkedIds(new Set())}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={(article) => setSelectedArticle(article)}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      <SubmitDispatchModal
        isOpen={isSubmitTipOpen}
        onClose={() => setIsSubmitTipOpen(false)}
        onSubmitDispatch={handleSubmitDispatch}
      />

      <NewsFlashModal
        flash={selectedFlash}
        onClose={() => setSelectedFlash(null)}
      />
    </div>
  );
}
