import React from 'react';
import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import { useDashboard } from '../../context/DashboardContext';
import { Cpu, Zap, Layers, Activity, Play, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ModelsPanel: React.FC = () => {
  const {
    models,
    runModelBenchmark,
    benchmarkingModelId,
    benchmarkResults,
    setSelectedModelInspector,
    gpuLoad,
    memoryLoad,
  } = useDashboard();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu size={20} className="text-[#4F8CFF]" />
            Neural Model Orchestration & Catalog
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Active proprietary model weights deployed across GPU tensor clusters.
          </p>
        </div>
        <Badge variant="cyan">{models.length} Models Deployed</Badge>
      </div>

      {/* Hardware Telemetry Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <Card className="p-4 space-y-2">
          <div className="flex justify-between text-gray-400">
            <span>TOTAL CLUSTER GPU VRAM</span>
            <span className="text-[#4DEEFF] font-bold">{gpuLoad}% UTILIZED</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-[#4DEEFF] h-full transition-all duration-500" style={{ width: `${gpuLoad}%` }} />
          </div>
          <div className="text-[10px] text-gray-500">96 GB / 128 GB Nvidia H100 Tensor Memory</div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex justify-between text-gray-400">
            <span>INFERENCE QUEUE LAG</span>
            <span className="text-[#5BFFB2] font-bold">0 PENDING TOKENS</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-[#5BFFB2] h-full w-[4%]" />
          </div>
          <div className="text-[10px] text-gray-500">Sub-15ms queue clearance SLA</div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex justify-between text-gray-400">
            <span>FINE-TUNING PIPELINE</span>
            <span className="text-[#8B7CFF] font-bold">EPOCH 42 / 50</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-[#8B7CFF] h-full w-[84%]" />
          </div>
          <div className="text-[10px] text-gray-500">RLHF Alignment running in background</div>
        </Card>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((model) => {
          const isBenchmarking = benchmarkingModelId === model.id;
          const benchmark = benchmarkResults[model.id];

          return (
            <Card
              key={model.id}
              className="p-6 space-y-4 group hover:border-[#4F8CFF] transition-all relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Cpu size={18} className="text-[#4F8CFF] group-hover:rotate-12 transition-transform" />
                    <h4 className="text-base font-bold text-white group-hover:text-[#4F8CFF] transition-colors">
                      {model.name}
                    </h4>
                  </div>
                  <div className="text-xs font-mono text-gray-400 mt-0.5">
                    ID: {model.id} • Version: {model.version}
                  </div>
                </div>
                <Badge variant={model.status === 'optimal' ? 'success' : 'purple'}>
                  {model.status.toUpperCase()}
                </Badge>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono">
                <div className="p-3 rounded-xl bg-[#050608] border border-[var(--border-subtle)] space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase">Architecture</span>
                  <div className="text-xs font-bold text-white">{model.type}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#050608] border border-[var(--border-subtle)] space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase">Context Window</span>
                  <div className="text-xs font-bold text-[#4DEEFF]">{model.contextWindow}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#050608] border border-[var(--border-subtle)] space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase">Inference Latency</span>
                  <div className="text-xs font-bold text-[#5BFFB2]">{model.latencyMs} ms</div>
                </div>

                <div className="p-3 rounded-xl bg-[#050608] border border-[var(--border-subtle)] space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase">Throughput</span>
                  <div className="text-xs font-bold text-white">{model.throughputTps} tps</div>
                </div>
              </div>

              {/* Benchmark Result Box if run */}
              {benchmark && (
                <div className="p-3 rounded-xl bg-[#5BFFB2]/10 border border-[#5BFFB2]/30 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
                  <span className="text-[#5BFFB2] font-bold flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 size={14} /> Benchmark Score:
                  </span>
                  <span className="text-white text-right">{benchmark.latencyMs}ms / {benchmark.tps} tps ({benchmark.accuracy}% Accuracy)</span>
                </div>
              )}

              {/* Card Footer Controls */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => setSelectedModelInspector(model)}
                  className="text-gray-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye size={14} /> Inspect Layers
                </button>

                <button
                  onClick={() => runModelBenchmark(model.id)}
                  disabled={isBenchmarking}
                  className="px-3 py-1.5 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/30 font-bold hover:bg-[#4F8CFF]/20 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {isBenchmarking ? <Zap size={14} className="animate-spin" /> : <Play size={14} />}
                  <span>{isBenchmarking ? 'Testing...' : 'Run Benchmark'}</span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
