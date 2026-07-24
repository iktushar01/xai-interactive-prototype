import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, ShieldCheck, Zap, Server, GitBranch, CheckCircle2 } from 'lucide-react';
import { Button } from '../../shared/Button';
import { Badge } from '../../shared/Badge';
import { playUiSound } from '../../../utils/sfx';

interface ReleaseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReleaseNotesModal: React.FC<ReleaseNotesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-3xl bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[var(--bg-void)] border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 text-[#4F8CFF]">
                <Cpu size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Enterprise AI OS v4.2 Architecture</h3>
                  <Badge variant="cyan" dot>STABLE PRODUCTION</Badge>
                </div>
                <p className="text-xs font-mono text-[var(--text-secondary)]">Build #9204-XAI-QUANTUM-RELEASE</p>
              </div>
            </div>
            <button
              onClick={() => {
                playUiSound('click');
                onClose();
              }}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 font-sans">
            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
                <div className="text-[var(--text-muted)] flex items-center gap-1.5">
                  <Zap size={12} className="text-[#4DEEFF]" /> INGESTION SLA
                </div>
                <div className="text-lg font-bold text-[var(--text-primary)]">14.8M OPS/S</div>
                <div className="text-[10px] text-[#5BFFB2]">+34% vs v4.1</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
                <div className="text-[var(--text-muted)] flex items-center gap-1.5">
                  <Server size={12} className="text-[#4F8CFF]" /> LATENCY FLOOR
                </div>
                <div className="text-lg font-bold text-[var(--text-primary)]">9.2 ms P99</div>
                <div className="text-[10px] text-[#5BFFB2]">Zero Bottlenecking</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
                <div className="text-[var(--text-muted)] flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-[#8B7CFF]" /> PRIVACY SLA
                </div>
                <div className="text-lg font-bold text-[var(--text-primary)]">SOC2 / HIPAA</div>
                <div className="text-[10px] text-[#5BFFB2]">Zero Data Leaks</div>
              </div>
            </div>

            {/* Architecture Upgrades */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                <GitBranch size={14} className="text-[#4F8CFF]" /> Core OS Enhancements
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  {
                    title: 'Quantum Mesh Parallel Ingestion Engine',
                    desc: 'Native streaming cross-attention transformer layer capable of parsing Kafka, S3, and SQL streams concurrently at line rate.',
                  },
                  {
                    title: 'Self-Correcting Hallucination Shield (0.02% Error Rate)',
                    desc: 'Real-time multi-agent consensus validation across fine-tuned domain models before downstream tool execution.',
                  },
                  {
                    title: 'Autonomous Graph Neural Network Memory',
                    desc: 'Persists context vector trees across multi-turn workflows with automatic cold-storage eviction.',
                  },
                  {
                    title: 'One-Click Enterprise Deployment Target',
                    desc: 'Deployable on AWS ECS, GCP Cloud Run, Azure AKS, or isolated air-gapped on-prem Kubernetes clusters.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[var(--bg-void)]/60 border border-[var(--border-subtle)] flex items-start gap-3 hover:border-[#4F8CFF]/40 transition-colors"
                  >
                    <CheckCircle2 size={16} className="text-[#5BFFB2] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[var(--text-primary)]">{item.title}</div>
                      <div className="text-[var(--text-secondary)] text-[11px] mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 bg-[var(--bg-void)] border-t border-[var(--border-subtle)] flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--text-muted)]">
              System Health: <span className="text-[#5BFFB2]">100% Operational</span>
            </span>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                playUiSound('click');
                onClose();
              }}
            >
              Close Architecture View
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
