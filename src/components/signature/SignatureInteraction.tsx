import React, { useState } from 'react';
import { SignatureCanvas3D } from './SignatureCanvas3D';
import { Badge } from '../shared/Badge';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { Cpu, Activity, Sliders, Layers, Sparkles, Box, ShieldCheck } from 'lucide-react';

export const SignatureInteraction: React.FC = () => {
  const [scrubberValue, setScrubberValue] = useState<number>(0.66); // Default Hyper-Cube
  const [matrixMode, setMatrixMode] = useState<boolean>(true);

  const stages = [
    { threshold: 0.0, label: '01 Point Cloud Sphere', desc: 'Raw Quantum Entropy' },
    { threshold: 0.33, label: '02 Particle Explosion', desc: 'Neural Orbital Dispersion' },
    { threshold: 0.66, label: '03 Hyper-Cube Lattice', desc: 'Structured Geometric Core' },
    { threshold: 1.0, label: '04 Unfolded Workspace', desc: '3D Operational Planes' },
  ];

  return (
    <section id="signature" className="py-24 bg-[var(--bg-void)] relative border-t border-[var(--border-subtle)] overflow-hidden transition-colors duration-300">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8B7CFF]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="purple" dot>SIGNATURE INTERACTION</Badge>
          <h2 className="text-fluid-title font-bold tracking-tight text-[var(--text-primary)]">
            The Hyper-Dimensional Core.
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Drag the scrub controller below to witness how XAI morphs raw multi-modal entropy into structured hyper-cube lattices and unfolded operational planes in 3D space.
          </p>
        </div>

        {/* 3D Canvas Showcase Box */}
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-md overflow-hidden shadow-[var(--shadow-card)] h-[380px] sm:h-[520px]">
          {/* Top Floating HUD Bar */}
          <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8B7CFF] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Quantum Lattice Engine
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMatrixMode(!matrixMode)}
                className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-mono transition-colors cursor-pointer border ${
                  matrixMode
                    ? 'bg-[#8B7CFF]/20 border-[#8B7CFF] text-[var(--text-primary)]'
                    : 'bg-[var(--bg-void)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                {matrixMode ? 'Wireframe: ON' : 'Wireframe: OFF'}
              </button>
            </div>
          </div>

          {/* 3D Canvas */}
          <SignatureCanvas3D progress={scrubberValue} matrixMode={matrixMode} />

          {/* Bottom Floating Telemetry Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-subtle)]">
            <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5 text-[#5BFFB2]">
                <ShieldCheck size={14} />
                1,600 Active Vectors
              </span>
              <span className="hidden sm:inline text-[var(--text-muted)]">|</span>
              <span className="text-[var(--text-primary)]">
                Core State: {scrubberValue < 0.25 ? 'Sphere' : scrubberValue < 0.5 ? 'Orbit' : scrubberValue < 0.8 ? 'Hyper-Cube' : 'Unfolded Planes'}
              </span>
            </div>

            <div className="text-xs font-mono text-[#4DEEFF]">
              Phase Coefficient: {(scrubberValue * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Interactive Scrub Controller */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#4F8CFF] font-bold uppercase tracking-wider flex items-center gap-2">
              <Sliders size={16} />
              Interactive Dimension Scrubber
            </span>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              Drag to morph 3D quantum state
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={scrubberValue}
            onChange={(e) => setScrubberValue(parseFloat(e.target.value))}
            className="w-full accent-[#4F8CFF] h-2 bg-[var(--bg-void)] rounded-lg cursor-pointer"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stages.map((st, idx) => (
              <button
                key={idx}
                onClick={() => setScrubberValue(st.threshold)}
                className={`p-3 rounded-lg text-left font-mono text-xs transition-all cursor-pointer border ${
                  Math.abs(scrubberValue - st.threshold) < 0.15
                    ? 'bg-[#4F8CFF]/15 border-[#4F8CFF] text-[var(--text-primary)]'
                    : 'bg-[var(--bg-void)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <div className="font-bold text-[var(--text-primary)] mb-0.5">{st.label}</div>
                <div className="text-[10px] text-[var(--text-secondary)]">{st.desc}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </section>

  );
};
