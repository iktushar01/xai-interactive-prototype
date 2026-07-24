import React from 'react';
import { AIModel } from '../../../types';
import { X, Cpu, Zap, Activity, ShieldCheck, Play, Layers } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';

interface ModelInspectorModalProps {
  model: AIModel | null;
  onClose: () => void;
}

export const ModelInspectorModal: React.FC<ModelInspectorModalProps> = ({ model, onClose }) => {
  const { runModelBenchmark, benchmarkingModelId, benchmarkResults } = useDashboard();
  if (!model) return null;

  const isBenchmarking = benchmarkingModelId === model.id;
  const result = benchmarkResults[model.id];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#0B0F14] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/30">
              <Cpu size={18} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">{model.name}</h3>
              <p className="text-[11px] font-mono text-gray-400">ID: {model.id} • Version {model.version}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Key Metric Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">Latency (P99)</span>
              <div className="text-sm font-mono font-bold text-[#5BFFB2]">{model.latencyMs} ms</div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">Throughput</span>
              <div className="text-sm font-mono font-bold text-[#4DEEFF]">{model.throughputTps} tps</div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">Context Window</span>
              <div className="text-sm font-mono font-bold text-white">{model.contextWindow}</div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">Status</span>
              <div className="text-sm font-mono font-bold text-[#5BFFB2] uppercase">{model.status}</div>
            </div>
          </div>

          {/* Architecture Breakdown */}
          <div className="p-4 rounded-xl bg-[#050608] border border-[var(--border-subtle)] space-y-3 font-mono text-xs">
            <span className="text-gray-400 font-bold block text-[10px] uppercase">Tensor Core Specifications</span>
            <div className="grid grid-cols-2 gap-3 text-gray-300">
              <div>• Precision: <span className="text-white font-bold">FP16 / INT8 Quantized</span></div>
              <div>• Model Type: <span className="text-[#4DEEFF] font-bold">{model.type}</span></div>
              <div>• GPU Memory VRAM: <span className="text-white font-bold">18.4 GB / 24 GB</span></div>
              <div>• Cost / 1k Tokens: <span className="text-[#5BFFB2] font-bold">$0.0004</span></div>
            </div>
          </div>

          {/* Benchmark Runner Box */}
          <div className="p-4 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#4DEEFF]">Live Model Benchmark Runner</span>
                <p className="text-[11px] text-gray-400">Dispatch 1,000 synthetic test tokens to measure real-time latency.</p>
              </div>
              <button
                onClick={() => runModelBenchmark(model.id)}
                disabled={isBenchmarking}
                className="px-3.5 py-1.5 rounded-lg bg-[#4F8CFF] text-white font-mono text-xs font-bold hover:bg-[#3D78E0] transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                {isBenchmarking ? (
                  <Zap size={14} className="animate-spin" />
                ) : (
                  <Play size={14} />
                )}
                <span>{isBenchmarking ? 'Testing...' : 'Run Benchmark'}</span>
              </button>
            </div>

            {result && (
              <div className="p-3 rounded-lg bg-[#050608] border border-[var(--border-subtle)] grid grid-cols-3 gap-2 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 block">TEST LATENCY</span>
                  <span className="text-[#5BFFB2] font-bold">{result.latencyMs} ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">THROUGHPUT</span>
                  <span className="text-[#4DEEFF] font-bold">{result.tps} tps</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">ACCURACY SCORE</span>
                  <span className="text-white font-bold">{result.accuracy}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-between text-xs font-mono">
          <span className="text-gray-500 flex items-center gap-1">
            <ShieldCheck size={14} className="text-[#5BFFB2]" /> Zero-Downtime Hot Swapping Ready
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
