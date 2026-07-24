import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, RotateCcw, Activity, Cpu, Database, CheckCircle2, Zap, Terminal } from 'lucide-react';
import { Button } from '../../shared/Button';
import { Badge } from '../../shared/Badge';
import { playUiSound } from '../../../utils/sfx';

interface FlowPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlowPlayerModal: React.FC<FlowPlayerModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const steps = [
    {
      title: '01. High-Speed Data Ingestion',
      node: 'Kafka / S3 Stream',
      icon: <Database size={16} className="text-[#4F8CFF]" />,
      detail: 'Streaming 1.4GB/s unstructured JSON payloads into memory buffer...',
      status: 'COMPLETED',
      latency: '1.2ms',
    },
    {
      title: '02. XAI Transformer Vectorization',
      node: 'Embedding Tensor Core',
      icon: <Cpu size={16} className="text-[#4DEEFF]" />,
      detail: 'Generating 1536-dim semantic embeddings with cross-attention graph mapping...',
      status: 'COMPLETED',
      latency: '4.8ms',
    },
    {
      title: '03. Consensus & Hallucination Guard',
      node: 'Agentic Verifier',
      icon: <Zap size={16} className="text-[#8B7CFF]" />,
      detail: 'Cross-verifying inference result against enterprise policy constraint matrix...',
      status: 'PROCESSING',
      latency: '3.1ms',
    },
    {
      title: '04. Actionable Decision Dispatch',
      node: 'Automated API Gateway',
      icon: <CheckCircle2 size={16} className="text-[#5BFFB2]" />,
      detail: 'Dispatching verified execution payload to Salesforce & ERP Webhook target.',
      status: 'READY',
      latency: '1.5ms',
    },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length;
        playUiSound('synth');
        setLogMessages((logs) => [
          `[${new Date().toLocaleTimeString()}] Pipeline Step ${next + 1}: Executed ${steps[next].node} (${steps[next].latency})`,
          ...logs.slice(0, 5),
        ]);
        return next;
      });
    }, 2400 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackSpeed]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[var(--bg-void)] border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#4DEEFF]/10 border border-[#4DEEFF]/30 text-[#4DEEFF]">
                <Activity size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Live Intelligence Flow Simulation</h3>
                  <Badge variant="cyan" dot>REAL-TIME DEMO</Badge>
                </div>
                <p className="text-xs font-mono text-[var(--text-secondary)]">Visualizing End-to-End Autonomous Processing Cycle</p>
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
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Visual Pipeline Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      playUiSound('click');
                      setActiveStep(idx);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isActive
                        ? 'bg-[#4DEEFF]/10 border-[#4DEEFF] shadow-[0_0_20px_rgba(77,238,255,0.25)] scale-[1.02]'
                        : isPassed
                        ? 'bg-[var(--bg-void)] border-[#5BFFB2]/40 text-[var(--text-primary)]'
                        : 'bg-[var(--bg-void)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/10">{step.icon}</div>
                      <span className="text-[10px] font-mono text-[#4DEEFF]">{step.latency}</span>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)]">{step.title}</div>
                      <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">{step.node}</div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-[#4DEEFF] animate-ping' : isPassed ? 'bg-[#5BFFB2]' : 'bg-gray-600'
                        }`}
                      />
                      <span>{isActive ? 'ACTIVE INFERENCE' : isPassed ? 'PASS' : 'QUEUED'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Step Details Panel */}
            <div className="p-4 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs text-[#4DEEFF]">
                <span className="font-bold">{steps[activeStep].title}</span>
                <span>Latency: {steps[activeStep].latency}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{steps[activeStep].detail}</p>
            </div>

            {/* Live Terminal Log Feed */}
            <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-[#5BFFB2] space-y-2">
              <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-[#4DEEFF]" /> PIPELINE EXECUTION TELEMETRY
                </span>
                <span>SPEED: {playbackSpeed}X</span>
              </div>
              <div className="space-y-1 max-h-28 overflow-y-auto">
                {logMessages.length === 0 ? (
                  <div className="text-gray-600 italic">Starting telemetry stream...</div>
                ) : (
                  logMessages.map((log, i) => <div key={i}>{log}</div>)
                )}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-3.5 bg-[var(--bg-void)] border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playUiSound('click');
                  setIsPlaying(!isPlaying);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4F8CFF] text-white hover:bg-[#4F8CFF]/80 cursor-pointer font-bold"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? 'Pause Flow' : 'Play Flow'}
              </button>

              <button
                onClick={() => {
                  playUiSound('click');
                  setActiveStep(0);
                  setLogMessages([]);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white cursor-pointer"
              >
                <RotateCcw size={14} /> Reset
              </button>

              <div className="flex items-center gap-1 ml-2 text-[var(--text-muted)]">
                <span>Speed:</span>
                {[1, 2, 4].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      playUiSound('click');
                      setPlaybackSpeed(spd);
                    }}
                    className={`px-2 py-1 rounded text-[10px] cursor-pointer ${
                      playbackSpeed === spd ? 'bg-[#4DEEFF] text-black font-bold' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                playUiSound('click');
                onClose();
              }}
            >
              Done
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
