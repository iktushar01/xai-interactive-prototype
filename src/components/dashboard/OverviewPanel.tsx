import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatWidget } from '../shared/StatWidget';
import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, Pause, RefreshCw, CheckCircle2, AlertTriangle, ArrowUpRight,
  Plus, Zap, Eye, RotateCcw, Check, X, ShieldAlert, Sparkles, Activity, Layers, Filter
} from 'lucide-react';

export const OverviewPanel: React.FC = () => {
  const {
    metrics,
    dataPoints,
    isLiveStreaming,
    setIsLiveStreaming,
    actionQueue,
    approveAction,
    overrideAction,
    retryAction,
    archiveAction,
    insights,
    generateNewInsight,
    resolveInsight,
    setSelectedEvent,
    triggerManualEvent,
    setIsCreateWorkflowOpen,
    cpuLoad,
    gpuLoad,
    memoryLoad,
    regionalClusters,
  } = useDashboard();

  const [searchFilter, setSearchFilter] = useState('');
  const [expandedTraceId, setExpandedTraceId] = useState<string | null>(null);

  const filteredDataPoints = dataPoints.filter((dp) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      dp.id.toLowerCase().includes(q) ||
      dp.source.toLowerCase().includes(q) ||
      dp.type.toLowerCase().includes(q) ||
      dp.tags.some((t) => t.toLowerCase().includes(q))
    );
  }).slice(0, 7);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Executive KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <StatWidget key={i} metric={m} />
        ))}
      </div>

      {/* Main Split Grid: Live Event Stream Table & AI Action Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8/12): Live Ingestion Stream Table */}
        <Card className="lg:col-span-8 p-5 sm:p-6 space-y-4 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <Badge variant="cyan" dot>LIVE INGESTION STREAM</Badge>
              <span className="text-xs font-mono text-[var(--text-secondary)]">
                {isLiveStreaming ? 'Streaming @ 14.8M events/s' : 'Stream Paused'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter events..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-[var(--bg-void)] border border-[var(--border-subtle)] text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#4F8CFF] w-28 sm:w-36"
              />

              <button
                onClick={triggerManualEvent}
                className="px-2.5 py-1 rounded-lg bg-[#4F8CFF]/10 text-[#4DEEFF] border border-[#4F8CFF]/30 text-xs font-mono hover:bg-[#4F8CFF]/20 transition-colors flex items-center gap-1 cursor-pointer"
                title="Inject synthetic test event"
              >
                <Plus size={12} /> Inject Event
              </button>

              <button
                onClick={() => setIsLiveStreaming(!isLiveStreaming)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--bg-void)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
              >
                {isLiveStreaming ? <Pause size={12} /> : <Play size={12} />}
                <span>{isLiveStreaming ? 'Pause' : 'Resume'}</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 text-[10px] uppercase">
                  <th className="pb-2 font-normal">EVENT ID</th>
                  <th className="pb-2 font-normal">SOURCE STREAM</th>
                  <th className="pb-2 font-normal">TYPE</th>
                  <th className="pb-2 font-normal">CONFIDENCE</th>
                  <th className="pb-2 font-normal">STATUS</th>
                  <th className="pb-2 font-normal text-right">TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <AnimatePresence initial={false}>
                  {filteredDataPoints.map((dp) => (
                    <motion.tr
                      key={dp.id}
                      initial={{ opacity: 0, x: -12, backgroundColor: 'rgba(79, 140, 255, 0.15)' }}
                      animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.35 }}
                      onClick={() => setSelectedEvent(dp)}
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="py-2.5 font-bold text-[#4DEEFF] group-hover:underline flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEFF] group-hover:scale-125 transition-transform" />
                        {dp.id}
                      </td>
                      <td className="py-2.5 text-white font-medium">{dp.source}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[var(--text-secondary)] capitalize text-[10px]">
                          {dp.type}
                        </span>
                      </td>
                      <td className="py-2.5 text-[#5BFFB2] font-bold">
                        {(dp.confidence * 100).toFixed(1)}%
                      </td>
                      <td className="py-2.5">
                        <span className="inline-flex items-center gap-1 text-[#5BFFB2] text-[11px]">
                          <CheckCircle2 size={12} className="text-[#5BFFB2]" />
                          Analyzed
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-[var(--text-muted)]">{dp.timestamp}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right Column (4/12): Live AI Action Queue */}
        <Card className="lg:col-span-4 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle size={16} className="text-[#8B7CFF]" />
              AI Action Queue
            </h4>
            <Badge variant="purple">{actionQueue.length} Active</Badge>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout">
              {actionQueue.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className={`p-3.5 rounded-xl bg-[var(--bg-void)] border transition-all space-y-2.5 ${
                    item.status === 'executing'
                      ? 'border-[#4DEEFF]/40 shadow-[0_0_12px_rgba(77,238,255,0.15)]'
                      : item.status === 'analyzing'
                      ? 'border-[#8B7CFF]/40'
                      : 'border-[var(--border-subtle)] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#4F8CFF] font-bold">{item.id}</span>
                    <Badge variant={item.badgeColor}>
                      {item.badge}
                    </Badge>
                  </div>

                  <div className="text-xs text-white font-medium leading-snug">{item.title}</div>

                  <div className="text-[11px] text-[var(--text-muted)] font-mono flex items-center justify-between">
                    <span className="truncate max-w-[200px]">{item.impact}</span>
                    {item.etaSeconds > 0 && <span className="text-[#4DEEFF]">ETA: {item.etaSeconds}s</span>}
                  </div>

                  {/* Animated Progress Bar if executing or analyzing */}
                  {(item.status === 'executing' || item.status === 'analyzing') && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${item.status === 'executing' ? 'bg-[#4DEEFF]' : 'bg-[#8B7CFF]'}`}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button Controls */}
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono">
                    <button
                      onClick={() => setExpandedTraceId(expandedTraceId === item.id ? null : item.id)}
                      className="text-[var(--text-secondary)] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Eye size={12} /> {expandedTraceId === item.id ? 'Hide Trace' : 'View Trace'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      {item.status === 'analyzing' && (
                        <button
                          onClick={() => approveAction(item.id)}
                          className="px-2 py-0.5 rounded bg-[#5BFFB2]/20 text-[#5BFFB2] hover:bg-[#5BFFB2]/30 cursor-pointer flex items-center gap-1"
                        >
                          <Check size={10} /> Approve
                        </button>
                      )}
                      {item.status === 'executing' && (
                        <button
                          onClick={() => overrideAction(item.id)}
                          className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer flex items-center gap-1"
                        >
                          <X size={10} /> Stop
                        </button>
                      )}
                      {item.status === 'completed' && (
                        <button
                          onClick={() => archiveAction(item.id)}
                          className="px-2 py-0.5 rounded bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Reasoning Trace Drawer */}
                  {expandedTraceId === item.id && item.reasoningTrace && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-2.5 rounded-lg bg-[#050608] border border-white/10 text-[10px] font-mono space-y-1 text-[#4DEEFF]"
                    >
                      <span className="text-gray-500 block uppercase font-bold">XAI Multi-Hop Trace:</span>
                      {item.reasoningTrace.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="text-gray-600">[{idx + 1}]</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </div>

      {/* Bottom Grid: AI Executive Insights & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Executive AI Insights Feed (7/12) */}
        <Card className="lg:col-span-7 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-[#4DEEFF]" />
              Executive AI Insights
            </h4>
            <button
              onClick={generateNewInsight}
              className="px-3 py-1 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/30 text-xs font-mono font-bold hover:bg-[#4F8CFF]/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={12} /> Generate Insight
            </button>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {insights.map((ins) => (
                <motion.div
                  key={ins.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] hover:border-[#4F8CFF]/40 transition-all space-y-2 relative"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#4DEEFF] font-bold">{ins.title}</span>
                    <span className="text-[10px] text-gray-500">{ins.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{ins.summary}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                    <span className="text-[#5BFFB2] font-bold">Impact: {ins.impactValue}</span>
                    <button
                      onClick={() => resolveInsight(ins.id)}
                      className="text-gray-500 hover:text-white text-[10px] underline cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* Global Regional Density & Health (5/12) */}
        <Card className="lg:col-span-5 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity size={16} className="text-[#5BFFB2]" />
              Regional Edge Density
            </h4>
            <Badge variant="success">4 Edge Clusters</Badge>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {regionalClusters.map((cluster) => (
              <div key={cluster.id} className="p-3 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{cluster.name}</span>
                  <span className="text-[#5BFFB2] text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5BFFB2] animate-ping" />
                    {cluster.opsPerSec}M ops/s
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>P99 Latency: {cluster.latencyMs}ms</span>
                  <span>Cluster Load: {cluster.loadPct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#5BFFB2] transition-all duration-500"
                    style={{ width: `${cluster.loadPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
