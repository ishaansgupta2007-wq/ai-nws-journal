import React from 'react';
import { NewsFlash } from '../types/blog';
import { X, Zap, ExternalLink, Clock, Building2 } from 'lucide-react';

interface NewsFlashModalProps {
  flash: NewsFlash | null;
  onClose: () => void;
}

export const NewsFlashModal: React.FC<NewsFlashModalProps> = ({ flash, onClose }) => {
  if (!flash) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#FAF9F6] rounded-lg shadow-2xl border border-stone-200 overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-semibold uppercase">
            <Zap className="w-4 h-4 fill-amber-700" />
            <span>WIRE DISPATCH BREAKING · {flash.impactLevel.toUpperCase()} IMPACT</span>
          </div>

          <h3 className="font-editorial text-2xl font-bold text-stone-950 leading-tight">
            {flash.headline}
          </h3>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-500 border-y border-stone-200 py-2.5">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-stone-400" />
              <span>Source: {flash.source}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{flash.timeAgo}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-800 font-semibold">{flash.category}</span>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed font-sans">
            {flash.summary}
          </p>

          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Close Wire Brief
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
