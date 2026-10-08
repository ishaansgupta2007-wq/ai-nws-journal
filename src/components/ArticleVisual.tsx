import React from 'react';
import { VisualType } from '../types/blog';

interface ArticleVisualProps {
  type: VisualType;
  title: string;
  caption?: string;
  figureNumber?: number;
  aspectRatio?: '16:9' | '4:3' | '3:2';
  className?: string;
  showCaption?: boolean;
}

export const ArticleVisual: React.FC<ArticleVisualProps> = ({
  type,
  title,
  caption,
  figureNumber = 1,
  aspectRatio = '16:9',
  className = '',
  showCaption = true,
}) => {
  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4:3'
      ? 'aspect-[4/3]'
      : 'aspect-[3/2]';

  const renderGraphic = () => {
    switch (type) {
      case 'neural-network':
        return (
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="nn-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="50%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>
              <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect width="800" height="450" fill="url(#nn-bg)" />

            {/* Subtle Coordinate Grid */}
            <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1">
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="450" />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 90} x2="800" y2={i * 90} />
              ))}
            </g>

            {/* Neural Lattice Connections */}
            <g stroke="url(#beam)" strokeWidth="1.2" strokeOpacity="0.35">
              <path d="M 120 110 Q 250 80 400 180 T 680 140" fill="none" />
              <path d="M 120 225 Q 300 240 400 180 T 680 290" fill="none" />
              <path d="M 120 340 Q 260 380 400 180 T 680 220" fill="none" />
              <path d="M 120 110 Q 280 200 400 320 T 680 290" fill="none" strokeDasharray="4 4" />
              <path d="M 120 340 Q 280 280 400 320 T 680 140" fill="none" strokeDasharray="3 3" />
              <path d="M 260 140 Q 400 60 540 180" fill="none" strokeWidth="2" strokeOpacity="0.6" />
              <path d="M 260 300 Q 400 380 540 260" fill="none" strokeWidth="2" strokeOpacity="0.6" />
            </g>

            {/* High-Dimensional Latent Clusters */}
            <ellipse cx="400" cy="225" rx="140" ry="85" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.4" />
            <ellipse cx="400" cy="225" rx="80" ry="45" fill="#4f46e5" fillOpacity="0.12" stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.6" />

            {/* Active Nodes */}
            {[
              { x: 120, y: 110, r: 6, c: '#38bdf8' },
              { x: 120, y: 225, r: 8, c: '#38bdf8' },
              { x: 120, y: 340, r: 6, c: '#38bdf8' },
              { x: 260, y: 140, r: 7, c: '#818cf8' },
              { x: 260, y: 300, r: 7, c: '#818cf8' },
              { x: 400, y: 180, r: 11, c: '#a855f7', glow: true },
              { x: 400, y: 320, r: 9, c: '#c084fc' },
              { x: 540, y: 180, r: 7, c: '#818cf8' },
              { x: 540, y: 260, r: 8, c: '#818cf8' },
              { x: 680, y: 140, r: 6, c: '#38bdf8' },
              { x: 680, y: 220, r: 8, c: '#38bdf8' },
              { x: 680, y: 290, r: 6, c: '#38bdf8' },
            ].map((node, i) => (
              <g key={i}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r * 2.2}
                  fill={node.c}
                  fillOpacity="0.18"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={node.c}
                  filter={node.glow ? 'url(#glow)' : undefined}
                />
                <circle cx={node.x} cy={node.y} r={node.r * 0.4} fill="#ffffff" />
              </g>
            ))}

            {/* Editorial Technical Inset */}
            <g transform="translate(40, 390)">
              <text fill="#94a3b8" fontSize="11" fontFamily="monospace" letterSpacing="1">
                TOPOLOGY: RECURSIVE LATENT SEARCH · COMPUTE BUDGET: 1.4×10²⁵ FLOP
              </text>
            </g>
          </svg>
        );

      case 'robotics':
        return (
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="robot-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#18181b" />
                <stop offset="60%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>
              <radialGradient id="actuator-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="450" fill="url(#robot-bg)" />

            {/* Engineering Blueprint Grid */}
            <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.8">
              {Array.from({ length: 16 }).map((_, i) => (
                <line key={`rg-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`rgh-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
              ))}
            </g>

            {/* Robot Chassis & Articulated Kinematic Limb */}
            <g transform="translate(180, 40)">
              {/* Torso Base Outline */}
              <path
                d="M 120 40 L 260 40 L 290 140 L 240 280 L 140 280 L 90 140 Z"
                fill="#27272a"
                stroke="#52525b"
                strokeWidth="2"
              />
              <path d="M 140 80 L 240 80 L 220 180 L 160 180 Z" fill="#3f3f46" stroke="#71717a" strokeWidth="1.2" />

              {/* Shoulder Rotary Actuator */}
              <circle cx="280" cy="90" r="32" fill="#18181b" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="280" cy="90" r="14" fill="#f59e0b" fillOpacity="0.3" />
              <circle cx="280" cy="90" r="6" fill="#fbbf24" />

              {/* Upper Arm Carbon Truss */}
              <path d="M 290 100 L 410 180 L 390 205 L 270 115 Z" fill="#3f3f46" stroke="#71717a" strokeWidth="2" />
              <line x1="285" y1="108" x2="400" y2="192" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Elbow Joint */}
              <circle cx="400" cy="192" r="24" fill="#18181b" stroke="#e4e4e7" strokeWidth="2" />
              <circle cx="400" cy="192" r="8" fill="#f59e0b" />

              {/* Forearm & Sensor Bus */}
              <path d="M 410 185 L 510 130 L 520 150 L 418 202 Z" fill="#27272a" stroke="#71717a" strokeWidth="1.8" />

              {/* Dexterous Hand Actuator */}
              <circle cx="515" cy="140" r="16" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
              <path d="M 525 130 L 570 105 L 585 112 L 545 138 Z" fill="#52525b" stroke="#a1a1aa" strokeWidth="1.5" />
              <path d="M 530 142 L 590 135 L 598 145 L 540 152 Z" fill="#52525b" stroke="#a1a1aa" strokeWidth="1.5" />
              <path d="M 525 152 L 575 168 L 565 178 L 520 160 Z" fill="#52525b" stroke="#a1a1aa" strokeWidth="1.5" />

              {/* Kinematic Arc Indicator */}
              <path
                d="M 280 30 A 60 60 0 0 1 340 90"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />
              <text x="350" y="60" fill="#f59e0b" fontSize="10" fontFamily="monospace">
                Δθ = 142.4°
              </text>
            </g>

            {/* Telemetry Annotation Box */}
            <g transform="translate(60, 390)">
              <text fill="#a1a1aa" fontSize="11" fontFamily="monospace" letterSpacing="0.8">
                KINEMATICS: 28-DOF ANTHROPOMORPHIC HAND · TACTILE LATENCY: 2.8ms
              </text>
            </g>
          </svg>
        );

      case 'silicon':
        return (
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="chip-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0c181f" />
                <stop offset="60%" stopColor="#082f49" />
                <stop offset="100%" stopColor="#030712" />
              </linearGradient>
              <linearGradient id="gold-trace" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="photon-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
            </defs>
            <rect width="800" height="450" fill="url(#chip-bg)" />

            {/* Wafer Ring & Die Layout */}
            <circle cx="400" cy="225" r="195" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="8 6" />

            {/* Central Compute Die */}
            <rect x="250" y="105" width="300" height="240" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.6" />

            {/* Silicon Photonic Optical Waveguides */}
            <g stroke="url(#photon-wave)" strokeWidth="1.8" fill="none">
              <path d="M 120 160 L 250 160 L 320 200 L 480 200 L 550 160 L 680 160" />
              <path d="M 120 225 L 250 225 L 300 225 L 500 225 L 550 225 L 680 225" strokeWidth="2.5" />
              <path d="M 120 290 L 250 290 L 320 250 L 480 250 L 550 290 L 680 290" />

              {/* Mach-Zehnder Optical Modulators */}
              <path d="M 340 180 Q 370 160 400 180 T 460 180" stroke="#f43f5e" strokeWidth="1.5" />
              <path d="M 340 270 Q 370 290 400 270 T 460 270" stroke="#f43f5e" strokeWidth="1.5" />
            </g>

            {/* Core Array Tiles */}
            <g fill="#1e293b" stroke="#0284c7" strokeWidth="1">
              {Array.from({ length: 4 }).map((_, r) =>
                Array.from({ length: 6 }).map((_, c) => (
                  <rect
                    key={`tile-${r}-${c}`}
                    x={280 + c * 40}
                    y={130 + r * 50}
                    width="32"
                    height="38"
                    rx="2"
                    fillOpacity="0.6"
                  />
                ))
              )}
            </g>

            {/* Gold Wire-Bond Interconnects */}
            <g stroke="url(#gold-trace)" strokeWidth="1.5" strokeOpacity="0.8">
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={`wb-${i}`}>
                  <line x1={265 + i * 22} y1="105" x2={265 + i * 22} y2="60" />
                  <circle cx={265 + i * 22} cy="60" r="3" fill="#fbbf24" />
                  <line x1={265 + i * 22} y1="345" x2={265 + i * 22} y2="390" />
                  <circle cx={265 + i * 22} cy="390" r="3" fill="#fbbf24" />
                </g>
              ))}
            </g>

            <g transform="translate(50, 410)">
              <text fill="#38bdf8" fontSize="11" fontFamily="monospace" letterSpacing="0.8">
                ARCH: CO-PACKAGED OPTICS (CPO) · BANDWIDTH DENSITY: 128 Tbps/mm²
              </text>
            </g>
          </svg>
        );

      case 'biology':
        return (
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="bio-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#042f2e" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
              <linearGradient id="helix-a" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#6ee7b7" />
              </linearGradient>
              <linearGradient id="helix-b" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            <rect width="800" height="450" fill="url(#bio-bg)" />

            {/* Protein Folding Ribbons (Alpha Helices & Beta Sheets) */}
            <g fill="none" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
              {/* Strand 1 */}
              <path
                d="M 100 320 Q 220 120 340 240 T 560 140 Q 660 100 720 260"
                stroke="url(#helix-a)"
                strokeOpacity="0.8"
              />
              {/* Strand 2 */}
              <path
                d="M 120 180 Q 260 360 420 180 T 640 280 Q 700 340 740 180"
                stroke="url(#helix-b)"
                strokeOpacity="0.8"
              />
            </g>

            {/* Hydrogen Bond Connectors */}
            <g stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6">
              <line x1="200" y1="210" x2="220" y2="280" />
              <line x1="310" y1="210" x2="330" y2="250" />
              <line x1="420" y1="180" x2="440" y2="210" />
              <line x1="510" y1="160" x2="540" y2="230" />
              <line x1="620" y1="210" x2="640" y2="270" />
            </g>

            {/* Catalytic Active Site / Substrate Cavity */}
            <g transform="translate(390, 210)">
              <circle cx="0" cy="0" r="42" fill="#065f46" fillOpacity="0.4" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="-12" cy="-8" r="8" fill="#f43f5e" />
              <circle cx="14" cy="-12" r="7" fill="#fbbf24" />
              <circle cx="2" cy="16" r="9" fill="#38bdf8" />
              <line x1="-12" y1="-8" x2="14" y2="-12" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="14" y1="-12" x2="2" y2="16" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="-12" y1="-8" x2="2" y2="16" stroke="#ffffff" strokeWidth="1.2" />
            </g>

            <g transform="translate(50, 410)">
              <text fill="#6ee7b7" fontSize="11" fontFamily="monospace" letterSpacing="0.8">
                DE NOVO CATALYSIS: PDB_ID: 9XQR · ROOT-MEAN-SQUARE DEVIATION (RMSD): 0.62Å
              </text>
            </g>
          </svg>
        );

      case 'agents':
        return (
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="agent-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="60%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
            </defs>
            <rect width="800" height="450" fill="url(#agent-bg)" />

            {/* Hierarchical Swarm DAG */}
            <g stroke="#93c5fd" strokeWidth="1.5" strokeOpacity="0.4">
              <line x1="400" y1="90" x2="240" y2="190" />
              <line x1="400" y1="90" x2="400" y2="190" />
              <line x1="400" y1="90" x2="560" y2="190" />

              <line x1="240" y1="190" x2="160" y2="300" />
              <line x1="240" y1="190" x2="270" y2="300" />
              <line x1="400" y1="190" x2="370" y2="300" />
              <line x1="400" y1="190" x2="450" y2="300" />
              <line x1="560" y1="190" x2="530" y2="300" />
              <line x1="560" y1="190" x2="640" y2="300" />

              {/* Cross-agent consensus arcs */}
              <path d="M 160 300 Q 400 370 640 300" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="4 4" />
            </g>

            {/* Master Orchestrator Node */}
            <g transform="translate(400, 90)">
              <circle cx="0" cy="0" r="28" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
              <circle cx="0" cy="0" r="10" fill="#c7d2fe" />
            </g>

            {/* Mid-tier Specialist Nodes */}
            {[240, 400, 560].map((x, i) => (
              <g key={`mid-${i}`} transform={`translate(${x}, 190)`}>
                <rect x="-20" y="-20" width="40" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.8" />
                <circle cx="0" cy="0" r="6" fill="#38bdf8" />
              </g>
            ))}

            {/* Worker Execution Pods */}
            {[160, 270, 370, 450, 530, 640].map((x, i) => (
              <g key={`leaf-${i}`} transform={`translate(${x}, 300)`}>
                <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="4" fill="#d8b4fe" />
              </g>
            ))}

            <g transform="translate(50, 410)">
              <text fill="#cbd5e1" fontSize="11" fontFamily="monospace" letterSpacing="0.8">
                TOPOLOGY: HIERARCHICAL COGNITIVE CONSENSUS · PROTOCOL: AGENT-JSON-RPC v2.4
              </text>
            </g>
          </svg>
        );

      case 'vision':
      default:
        return (
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="vis-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#18181b" />
                <stop offset="50%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>
            </defs>
            <rect width="800" height="450" fill="url(#vis-bg)" />

            {/* 3D Perspective Grid */}
            <g stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1">
              <line x1="400" y1="180" x2="0" y2="450" />
              <line x1="400" y1="180" x2="160" y2="450" />
              <line x1="400" y1="180" x2="320" y2="450" />
              <line x1="400" y1="180" x2="480" y2="450" />
              <line x1="400" y1="180" x2="640" y2="450" />
              <line x1="400" y1="180" x2="800" y2="450" />

              <line x1="200" y1="240" x2="600" y2="240" />
              <line x1="120" y1="300" x2="680" y2="300" />
              <line x1="50" y1="370" x2="750" y2="370" />
            </g>

            {/* Bounding Volumes and Physics World Vectors */}
            <g transform="translate(400, 180)">
              {/* Vanishing Point Core */}
              <circle cx="0" cy="0" r="16" fill="#f59e0b" fillOpacity="0.4" stroke="#fbbf24" strokeWidth="2" />
              <circle cx="0" cy="0" r="6" fill="#ffffff" />
            </g>

            {/* Holographic Wireframe Cube in 3D Space */}
            <g stroke="#38bdf8" strokeWidth="1.8" fill="#38bdf8" fillOpacity="0.12">
              <polygon points="260,240 360,200 440,240 340,285" />
              <polygon points="260,240 340,285 340,360 260,310" />
              <polygon points="440,240 340,285 340,360 440,310" />
            </g>

            {/* Depth Map Color Ramp */}
            <g transform="translate(50, 410)">
              <text fill="#a1a1aa" fontSize="11" fontFamily="monospace" letterSpacing="0.8">
                MODALITY: SPATIAL WORLD MODEL · ZERO-SHOT 3D COHERENCE: 99.4%
              </text>
            </g>
          </svg>
        );
    }
  };

  return (
    <figure className={`group overflow-hidden rounded-md border border-stone-200/80 bg-stone-900 shadow-sm ${className}`}>
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-stone-950`}>
        {renderGraphic()}

        {/* Minimal Editorial Watermark Badge (Non-pill, clean borderless text) */}
        <div className="absolute top-3 left-3 bg-stone-950/75 backdrop-blur-sm px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase text-stone-300 border border-stone-800">
          Fig. {figureNumber} · {title}
        </div>
      </div>

      {showCaption && caption && (
        <figcaption className="p-3 bg-stone-50 border-t border-stone-200/60 text-xs text-stone-600 font-editorial italic leading-relaxed">
          <span className="font-sans font-medium text-stone-800 not-italic mr-1.5">
            Fig. {figureNumber}:
          </span>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
