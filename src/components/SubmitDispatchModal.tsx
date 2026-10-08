import React, { useState } from 'react';
import { X, Send, CheckCircle2, FileText } from 'lucide-react';
import { ArticleCategory, VisualType } from '../types/blog';

interface SubmitDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitDispatch: (newArticle: {
    title: string;
    deck: string;
    category: ArticleCategory;
    authorName: string;
    affiliation: string;
    content: string;
    visualType: VisualType;
  }) => void;
}

export const SubmitDispatchModal: React.FC<SubmitDispatchModalProps> = ({
  isOpen,
  onClose,
  onSubmitDispatch,
}) => {
  const [title, setTitle] = useState('');
  const [deck, setDeck] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('Frontier Models');
  const [authorName, setAuthorName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [content, setContent] = useState('');
  const [visualType, setVisualType] = useState<VisualType>('neural-network');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deck.trim() || !content.trim() || !authorName.trim()) return;

    onSubmitDispatch({
      title: title.trim(),
      deck: deck.trim(),
      category,
      authorName: authorName.trim(),
      affiliation: affiliation.trim() || 'Independent AI Researcher',
      content: content.trim(),
      visualType,
    });

    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setTitle('');
    setDeck('');
    setContent('');
    setAuthorName('');
    setAffiliation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#FAF9F6] rounded-lg shadow-2xl border border-stone-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSuccess ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-editorial text-2xl font-bold text-stone-950">
                Dispatch Published to Journal Feed
              </h3>
              <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Your research dispatch has been peer-indexed and appended directly to the live Neural Dispatch catalog.
              </p>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-5 py-2 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                View Live in Feed
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Research Submissions Desk</span>
                </div>
                <h3 className="font-editorial text-2xl font-bold text-stone-950">
                  Submit an AI Breakthrough Dispatch
                </h3>
                <p className="text-xs text-stone-600">
                  Submit technical papers, open-source model releases, hardware benchmarks, or investigative policy findings.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-700 uppercase mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Tree-Search Convergence in Quantum-Assisted Emulation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-stone-300 rounded p-2.5 bg-white focus:outline-none focus:border-stone-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-stone-700 uppercase mb-1">
                    Category Domain
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                    className="w-full text-xs border border-stone-300 rounded p-2.5 bg-white focus:outline-none"
                  >
                    <option value="Frontier Models">Frontier Models</option>
                    <option value="Embodied AI">Embodied AI</option>
                    <option value="Silicon & Compute">Silicon & Compute</option>
                    <option value="Bio & Science">Bio & Science</option>
                    <option value="Autonomous Agents">Autonomous Agents</option>
                    <option value="Policy & Governance">Policy & Governance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-700 uppercase mb-1">
                    Visual Schematic Type
                  </label>
                  <select
                    value={visualType}
                    onChange={(e) => setVisualType(e.target.value as VisualType)}
                    className="w-full text-xs border border-stone-300 rounded p-2.5 bg-white focus:outline-none"
                  >
                    <option value="neural-network">Neural Lattice Graph</option>
                    <option value="robotics">Kinematic Robotics</option>
                    <option value="silicon">Photonic Silicon Wafer</option>
                    <option value="biology">De Novo Biomolecule</option>
                    <option value="agents">Agent Swarm Consensus</option>
                    <option value="vision">Spatial 3D Vision</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-stone-700 uppercase mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Alexis Chen"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded p-2.5 bg-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone-700 uppercase mb-1">
                    Affiliation / Lab
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stanford AI Lab"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded p-2.5 bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-700 uppercase mb-1">
                  Lead Abstract / Deck (1-2 sentences)
                </label>
                <textarea
                  placeholder="Summarize the core experimental result or policy development..."
                  value={deck}
                  onChange={(e) => setDeck(e.target.value)}
                  rows={2}
                  className="w-full text-xs border border-stone-300 rounded p-2.5 bg-white focus:outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-700 uppercase mb-1">
                  Full Dispatch Analysis Body
                </label>
                <textarea
                  placeholder="Detail the technical methodology, benchmarks, empirical results, and broader implications..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full text-xs border border-stone-300 rounded p-2.5 bg-white focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Dispatch to Journal</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
