import React from 'react';
import { Badge } from '../shared/Badge';
import { Terminal, Shield, Cpu, Globe, Check, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-void)] pt-16 pb-12 text-[var(--text-secondary)] relative overflow-hidden transition-colors duration-300">
      {/* Background soft ambient gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-t from-[#4F8CFF]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#4F8CFF] flex items-center justify-center font-mono font-bold text-white text-xs">
                XAI
              </div>
              <span className="font-bold text-[var(--text-primary)] text-base">XAI Intelligence Workspace</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              The autonomous decision engine for modern enterprise teams. Turning raw fragmented signals into real-time operational execution.
            </p>

            {/* Quick CLI snippet */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-primary)]">
                <Terminal size={14} className="text-[#4DEEFF]" />
                <span>npx xai-workspace@latest init</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[var(--text-primary)] tracking-wider font-semibold">
              Platform Architecture
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="hover:text-[var(--text-primary)] transition-colors">Neural Core v4</a></li>
              <li><a href="#flow" className="hover:text-[var(--text-primary)] transition-colors">Unified Ingest Stream</a></li>
              <li><a href="#dashboard" className="hover:text-[var(--text-primary)] transition-colors">Workspace OS</a></li>
              <li><a href="#signature" className="hover:text-[var(--text-primary)] transition-colors">Quantum Lattice 3D</a></li>
            </ul>
          </div>

          {/* Enterprise & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[var(--text-primary)] tracking-wider font-semibold">
              Enterprise Trust
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1.5"><Shield size={14} className="text-[#5BFFB2]" /> SOC-2 Type II Certified</li>
              <li className="flex items-center gap-1.5"><Check size={14} className="text-[#5BFFB2]" /> HIPAA & ISO 27001</li>
              <li className="flex items-center gap-1.5"><Cpu size={14} className="text-[#4F8CFF]" /> Air-gapped Deployment</li>
              <li className="flex items-center gap-1.5"><Globe size={14} className="text-[#4DEEFF]" /> Global Region Latency &lt; 15ms</li>
            </ul>
          </div>

          {/* Developers & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[var(--text-primary)] tracking-wider font-semibold">
              Resources & Spec
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#dashboard"
                  className="hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1"
                >
                  Live AI Playground Console <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">PROJECT_SPEC.md (Generated)</span>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">API Reference (OpenAPI 3.1)</span>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">Architecture Whitepaper</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
          <div className="flex items-center gap-3">
            <span>© 2026 XAI Systems Inc. All rights reserved.</span>
            <Badge variant="muted">PRODUCTION ENVIRONMENT</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#5BFFB2]">
              <span className="w-2 h-2 rounded-full bg-[#5BFFB2] animate-ping" />
              All Systems Operational (99.99%)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

