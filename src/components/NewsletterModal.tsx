import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [topics, setTopics] = useState<string[]>([
    'Frontier Model Scaling',
    'Hardware & Photonic Silicon',
  ]);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('weekly');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
  };

  const allTopics = [
    'Frontier Model Scaling',
    'Embodied Robotics',
    'Hardware & Photonic Silicon',
    'Generative Biology & Chemistry',
    'Autonomous Multi-Agent Swarms',
    'AI Policy & International Treaties',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#FAF9F6] rounded-lg shadow-2xl border border-stone-200 overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-editorial text-2xl font-bold text-stone-950">
                Subscription Confirmed
              </h3>
              <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Welcome to the Neural Dispatch readership. A confirmation dispatch has been routed to{' '}
                <span className="font-semibold text-stone-900">{email}</span>. You will receive the{' '}
                {frequency} executive intelligence synthesis.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                  onClose();
                }}
                className="mt-4 px-5 py-2 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Return to Journal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono tracking-widest uppercase text-amber-800 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Intelligence Brief</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950">
                  Read What Frontier AI Researchers Read
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Every Sunday, our editorial desk curates verified breakthroughs, algorithmic derivations, and compute economics without hype or PR rewrites.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-700 uppercase mb-2">
                  Institutional / Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="colleague@institution.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-stone-300 rounded pl-10 pr-4 py-2.5 bg-white focus:outline-none focus:border-stone-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-700 uppercase mb-2">
                  Dispatch Focus (Select Interests)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allTopics.map((topic) => {
                    const isSelected = topics.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        className={`text-left text-xs p-2 rounded border transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-800/40 text-stone-900 font-medium'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <span className="truncate">{topic}</span>
                        {isSelected && <span className="text-amber-800 text-[11px] font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3 text-xs font-mono text-stone-600">
                  <span>CADENCE:</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="freq"
                      checked={frequency === 'weekly'}
                      onChange={() => setFrequency('weekly')}
                      className="text-stone-900"
                    />
                    <span>Weekly</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="freq"
                      checked={frequency === 'daily'}
                      onChange={() => setFrequency('daily')}
                      className="text-stone-900"
                    />
                    <span>Daily Wire</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 text-white rounded text-xs sm:text-sm font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Join 85,000+ Engineers & Policy Leads
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero spam. No sponsor tracking. 1-click unsubscribe.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
