import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types/blog';
import { ArticleVisual } from './ArticleVisual';
import {
  X,
  Heart,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Copy,
  Check,
  Quote,
  Send,
  SlidersHorizontal,
} from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onToggleBookmark: (articleId: string) => void;
  onLike: (articleId: string) => void;
  onAddComment: (articleId: string, comment: { author: string; role: string; content: string }) => void;
  isBookmarked: boolean;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onToggleBookmark,
  onLike,
  onAddComment,
  isBookmarked,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  
  // Audio Speech Simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [audioProgress, setAudioProgress] = useState(0);

  // AI Synthesis & Q&A
  const [isAiSynthesizing, setIsAiSynthesizing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [qaHistory, setQaHistory] = useState<{ q: string; a: string }[]>([]);

  // Comment input
  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentText, setCommentText] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state on article change
    setAudioProgress(0);
    setIsPlayingAudio(false);
    setAiAnalysis(null);
    setQaHistory([]);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [article?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Audio Playback simulation using Web Speech API if supported
  useEffect(() => {
    if (!article) return;

    if (!isPlayingAudio) {
      if (window.speechSynthesis) window.speechSynthesis.pause();
      return;
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. By ${article.author.name}. ${article.deck}. ${article.contentSections.map(s => s.body).join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = audioSpeed;
      utterance.onend = () => {
        setIsPlayingAudio(false);
        setAudioProgress(100);
      };
      utterance.onboundary = (e) => {
        if (textToRead.length > 0) {
          setAudioProgress(Math.min(100, Math.round((e.charIndex / textToRead.length) * 100)));
        }
      };
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback timer simulation
      const timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 100;
          }
          return prev + 1;
        });
      }, 400 / audioSpeed);
      return () => clearInterval(timer);
    }

    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [isPlayingAudio, audioSpeed, article]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const progress = Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100));
    setScrollProgress(progress);
  };

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCitation = () => {
    const bibtex = `@article{${article.slug},\n  title={${article.title}},\n  author={${article.author.name}},\n  journal={Neural Dispatch},\n  year={2026},\n  month={October}\n}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleGenerateAiBrief = () => {
    setIsAiSynthesizing(true);
    setTimeout(() => {
      setAiAnalysis(
        `Executive Impact Brief:\n1. Paradigm Shift: Moves beyond standard scaling laws into verifiable test-time deliberation.\n2. Engineering Moat: Proprietary verifier environments provide a deterministic floor that prevents hallucinations.\n3. Market Realignment: Shifts capital expenditure priority from raw parameter count to low-latency verification hardware.`
      );
      setIsAiSynthesizing(false);
    }, 800);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const q = userQuestion.trim();
    setUserQuestion('');

    let answer = `According to the analysis in "${article.title}", this fundamentally alters operating assumptions by grounding neural predictions against deterministic physical and formal constraints, avoiding failure states identified in prior architectures.`;

    if (q.toLowerCase().includes('cost') || q.toLowerCase().includes('compute')) {
      answer = `The article highlights that test-time inference compute allocates FLOPs dynamically based on problem difficulty, resulting in a 10x to 100x efficiency improvement compared to brute-force model scale.`;
    } else if (q.toLowerCase().includes('who') || q.toLowerCase().includes('author')) {
      answer = `Authored by ${article.author.name} (${article.author.role} at ${article.author.affiliation}), drawing on frontier experimental benchmarks from October 2026.`;
    }

    setQaHistory((prev) => [...prev, { q, a: answer }]);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    onAddComment(article.id, {
      author: commentName.trim(),
      role: commentRole.trim() || 'AI Researcher',
      content: commentText.trim(),
    });
    setCommentName('');
    setCommentRole('');
    setCommentText('');
  };

  const fontClass =
    fontSize === 'normal'
      ? 'text-base leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : 'text-xl leading-loose';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-sm flex justify-center">
      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-amber-700 z-60 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full max-w-4xl bg-[#FAF9F6] h-full overflow-y-auto shadow-2xl relative flex flex-col"
      >
        {/* Modal Sticky Top Controls */}
        <div className="sticky top-0 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-stone-600 font-mono">
            <span>NEURAL DISPATCH</span>
            <span aria-hidden="true">·</span>
            <span className="uppercase text-amber-800 font-semibold">{article.category}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Adjuster */}
            <div className="flex items-center border border-stone-200 rounded px-1.5 py-0.5 bg-white text-xs text-stone-600 mr-2">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'normal' ? 'font-bold text-stone-950 bg-stone-100' : 'hover:text-stone-900'}`}
                title="Normal text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'large' ? 'font-bold text-stone-950 bg-stone-100' : 'hover:text-stone-900'}`}
                title="Large text"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('larger')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'larger' ? 'font-bold text-stone-950 bg-stone-100' : 'hover:text-stone-900'}`}
                title="Editorial broadsheet size"
              >
                A++
              </button>
            </div>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded hover:bg-stone-100 transition-colors cursor-pointer ${
                isBookmarked ? 'text-amber-700' : 'text-stone-600'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-700' : ''}`} />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
              title="Copy link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-stone-200 text-stone-700 transition-colors ml-2 cursor-pointer"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Reading Body */}
        <article className="max-w-3xl mx-auto px-6 sm:px-12 py-10 flex-1">
          {/* Unboxed Metadata Line (Zero-Pills strict compliance) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-mono mb-4">
            <span className="font-semibold text-amber-800">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>Published {article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.likes} recommendations</span>
          </div>

          {/* Headline (Editorial Serif Display) */}
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-950 leading-[1.15] mb-6">
            {article.title}
          </h1>

          {/* Deck / Abstract */}
          <p className="font-editorial text-xl sm:text-2xl text-stone-700 leading-relaxed italic mb-8 border-l-2 border-amber-700 pl-4">
            {article.deck}
          </p>

          {/* Author Byline */}
          <div className="flex items-center justify-between border-y border-stone-200/80 py-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-editorial text-sm font-bold">
                {article.author.avatarInitials}
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-950">
                  {article.author.name}
                </div>
                <div className="text-xs text-stone-500">
                  {article.author.role} · {article.author.affiliation}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyCitation}
                className="text-xs text-stone-600 hover:text-stone-950 flex items-center gap-1 font-mono cursor-pointer"
              >
                {copiedCitation ? (
                  <span className="text-emerald-700 font-semibold">BibTeX Copied</span>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Cite</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Audio Narration Bar */}
          <div className="bg-stone-100/80 border border-stone-200 rounded p-3 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <div>
                <span className="font-semibold text-stone-900 block">
                  Listen to Editorial Dispatch
                </span>
                <span className="text-stone-500 text-[11px] font-mono">
                  {isPlayingAudio ? 'Speech Synthesis Playing...' : `${article.readTime} narration`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="w-24 sm:w-32 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-700 h-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>

              <div className="flex items-center gap-1 font-mono text-[11px] text-stone-600">
                <button
                  onClick={() => setAudioSpeed(1)}
                  className={`px-1 rounded ${audioSpeed === 1 ? 'font-bold text-stone-950' : ''}`}
                >
                  1x
                </button>
                <button
                  onClick={() => setAudioSpeed(1.25)}
                  className={`px-1 rounded ${audioSpeed === 1.25 ? 'font-bold text-stone-950' : ''}`}
                >
                  1.25x
                </button>
                <button
                  onClick={() => setAudioSpeed(1.5)}
                  className={`px-1 rounded ${audioSpeed === 1.5 ? 'font-bold text-stone-950' : ''}`}
                >
                  1.5x
                </button>
              </div>
            </div>
          </div>

          {/* Primary Visual Asset with Caption */}
          <div className="mb-10">
            <ArticleVisual
              type={article.visualType}
              title={article.visualTitle}
              caption={article.visualCaption}
              figureNumber={1}
              aspectRatio="16:9"
            />
          </div>

          {/* Executive Takeaways / Key Points Box */}
          <div className="bg-stone-50 border border-stone-200/90 rounded p-6 mb-10">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Executive Dispatch Takeaways</span>
            </div>
            <ul className="space-y-2.5 text-sm text-stone-800 leading-relaxed">
              {article.takeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-amber-700 mt-1 shrink-0 font-bold">
                    0{idx + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive AI Brief Synthesizer */}
          <div className="mb-10 border border-stone-200 bg-white rounded p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>AI Dispatch Synthesizer & Q&A</span>
              </div>
              <button
                onClick={handleGenerateAiBrief}
                disabled={isAiSynthesizing}
                className="text-xs bg-stone-900 text-white px-3 py-1.5 rounded hover:bg-stone-800 transition-colors cursor-pointer font-medium disabled:opacity-50"
              >
                {isAiSynthesizing ? 'Synthesizing...' : 'Generate 3-Bullet Brief'}
              </button>
            </div>

            {aiAnalysis && (
              <div className="bg-amber-50/70 border border-amber-200/60 p-4 rounded text-xs text-stone-800 font-mono whitespace-pre-line mb-4">
                {aiAnalysis}
              </div>
            )}

            {/* Q&A Thread */}
            {qaHistory.length > 0 && (
              <div className="space-y-3 mb-4">
                {qaHistory.map((qa, i) => (
                  <div key={i} className="text-xs bg-stone-50 p-3 rounded border border-stone-200/60">
                    <p className="font-semibold text-stone-900 mb-1">Q: {qa.q}</p>
                    <p className="text-stone-700 leading-relaxed">A: {qa.a}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask a technical or research question about this article..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="flex-1 text-xs border border-stone-300 rounded px-3 py-2 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-stone-900 text-white rounded text-xs hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Ask
              </button>
            </form>
          </div>

          {/* Body Prose Sections */}
          <div className={`space-y-8 text-stone-800 ${fontClass}`}>
            {article.contentSections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-stone-950 mt-8 mb-4">
                    {section.heading}
                  </h2>
                )}

                {/* Drop Cap on Opening Paragraph */}
                {idx === 0 ? (
                  <p className="first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-950">
                    {section.body}
                  </p>
                ) : (
                  <p>{section.body}</p>
                )}

                {/* Editorial Pull Quote */}
                {section.pullQuote && (
                  <div className="my-8 py-6 border-y border-stone-300">
                    <blockquote className="font-editorial italic text-xl sm:text-2xl text-stone-900 leading-relaxed text-center max-w-xl mx-auto">
                      "{section.pullQuote}"
                    </blockquote>
                    {section.pullQuoteAuthor && (
                      <cite className="block text-center text-xs font-mono text-stone-500 mt-3 not-italic">
                        — {section.pullQuoteAuthor}
                      </cite>
                    )}
                  </div>
                )}

                {/* Metrics Table / Definition Grid */}
                {section.metrics && (
                  <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-stone-200 py-6">
                    {section.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="space-y-1">
                        <div className="text-xs font-mono uppercase text-stone-500">
                          {m.label}
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-950">
                          {m.value}
                        </div>
                        {m.trend && (
                          <div className="text-xs text-amber-800 font-mono font-medium">
                            {m.trend}
                          </div>
                        )}
                        <div className="text-xs text-stone-600">
                          {m.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Code / Architecture Snippet */}
                {section.codeSnippet && (
                  <div className="my-6 rounded bg-stone-900 text-stone-100 overflow-hidden text-xs font-mono border border-stone-800">
                    <div className="px-4 py-2 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-stone-400">
                      <span>{section.codeSnippet.title}</span>
                      <span className="uppercase text-[10px]">{section.codeSnippet.language}</span>
                    </div>
                    <pre className="p-4 overflow-x-auto leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span className="font-mono text-stone-400 mr-2">INDEXED TOPICS:</span>
            {article.tags.map((tag) => (
              <span key={tag} className="text-stone-700 bg-stone-100 px-2 py-0.5 rounded text-[11px] font-mono">
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Reaction Strip */}
          <div className="my-10 p-4 bg-stone-100/70 rounded flex items-center justify-between border border-stone-200">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onLike(article.id)}
                className="flex items-center gap-2 text-xs font-medium text-stone-700 hover:text-stone-950 cursor-pointer transition-colors"
              >
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                <span>{article.likes} Found This Insightful</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(article.id)}
                className="flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-stone-950 cursor-pointer"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-700 text-amber-700' : ''}`} />
                <span>{isBookmarked ? 'Saved to Library' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Discussion / Comments Section */}
          <section className="mt-12 pt-8 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-stone-600" />
                <h3 className="font-editorial text-2xl font-bold text-stone-950">
                  Peer Discussion ({article.comments.length})
                </h3>
              </div>
            </div>

            {/* Existing Comments */}
            <div className="space-y-4 mb-8">
              {article.comments.length === 0 ? (
                <p className="text-xs text-stone-500 font-mono italic">
                  No peer commentaries posted yet. Be the first to analyze this dispatch.
                </p>
              ) : (
                article.comments.map((c) => (
                  <div key={c.id} className="p-4 bg-white border border-stone-200/80 rounded space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-950">{c.author}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-500 font-mono text-[11px]">{c.role}</span>
                      </div>
                      <span className="text-stone-400 font-mono text-[11px]">{c.timestamp}</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">{c.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="p-4 bg-stone-50 border border-stone-200 rounded space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-800 font-mono">
                Post Peer Commentary
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name / Handle"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="text-xs border border-stone-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-stone-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Title / Affiliation (e.g. AI Researcher)"
                  value={commentRole}
                  onChange={(e) => setCommentRole(e.target.value)}
                  className="text-xs border border-stone-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-stone-500"
                />
              </div>
              <textarea
                placeholder="Share your technical observation or perspective on this dispatch..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full text-xs border border-stone-300 rounded p-3 bg-white focus:outline-none focus:border-stone-500 resize-none"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>Submit Commentary</span>
                </button>
              </div>
            </form>
          </section>
        </article>

        {/* Modal Footer */}
        <div className="border-t border-stone-200 bg-stone-100/80 px-6 py-4 text-center text-xs text-stone-500 font-mono">
          NEURAL DISPATCH · JOURNALISTIC INTEGRITY & HARDWARE GROUNDING GUARANTEED
        </div>
      </div>
    </div>
  );
};
