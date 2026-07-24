import React, { useState, useEffect } from 'react';
import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import { LiveMetricValue } from '../shared/LiveMetricValue';
import { useDashboard } from '../../context/DashboardContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity, BarChart3, Globe, Cpu, Zap, Play, Pause, Plus, Trash2, Search,
  ArrowRight, Radio, Server, Database, ShieldCheck, CheckCircle2, Layers
} from 'lucide-react';

export const AnalyticsPanel: React.FC = () => {
  const {
    dataPoints,
    isLiveStreaming,
    setIsLiveStreaming,
    streamSpeed,
    setStreamSpeed,
    triggerManualEvent,
    clearStream,
    setSelectedEvent,
    networkThroughput,
    regionalClusters,
  } = useDashboard();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('ALL');
  const [packetIndex, setPacketIndex] = useState(0);

  // Animate packet movement across pipeline nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketIndex((prev) => (prev + 1) % 5);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const filteredDataPoints = dataPoints.filter((dp) => {
    const matchesSearch =
      !searchTerm ||
      dp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dp.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypeFilter === 'ALL' || dp.type === selectedTypeFilter;
    return matchesSearch && matchesType;
  });

  const pipelineNodes = [
    { name: 'Data Sources', sub: '248 Connected', icon: <Database size={16} className="text-[#4F8CFF]" /> },
    { name: 'Ingress Engine', sub: 'Sub-20ms Buffer', icon: <Radio size={16} className="text-[#4DEEFF]" /> },
    { name: 'Normalization', sub: 'Zero-Trust Clean', icon: <ShieldCheck size={16} className="text-[#5BFFB2]" /> },
    { name: 'Neural Vectorizer', sub: 'FP16 Embeddings', icon: <Cpu size={16} className="text-[#8B7CFF]" /> },
    { name: 'Router & Sink', sub: 'Auto-Dispatched', icon: <Server size={16} className="text-[#4F8CFF]" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Stat Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 space-y-2 relative overflow-hidden group hover:border-[#4F8CFF]/50 transition-all">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-ping" />
              TOTAL SIGNALS INGESTED TODAY
            </span>
            <Activity size={14} className="text-[#4F8CFF]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
            <LiveMetricValue baseValue="1,482,910,800" />
          </div>
          <div className="text-xs text-[#5BFFB2] font-mono">+18.4% real-time throughput velocity</div>
        </Card>

        <Card className="p-5 space-y-2 relative overflow-hidden group hover:border-[#4DEEFF]/50 transition-all">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEFF] animate-pulse" />
              INGRESS PIPELINE LATENCY
            </span>
            <Zap size={14} className="text-[#4DEEFF]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
            <LiveMetricValue baseValue="11.8" /> ms
          </div>
          <div className="text-xs text-[#5BFFB2] font-mono">P99 SLA: &lt; 20ms guaranteed</div>
        </Card>

        <Card className="p-5 space-y-2 relative overflow-hidden group hover:border-[#5BFFB2]/50 transition-all">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5BFFB2] animate-pulse" />
              BANDWIDTH THROUGHPUT
            </span>
            <Globe size={14} className="text-[#5BFFB2]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--text-primary)]">
            {networkThroughput} GB/s
          </div>
          <div className="text-xs text-[#5BFFB2] font-mono">Multi-region edge redundancy active</div>
        </Card>
      </div>

      {/* Interactive Visual Neural Ingestion Pipeline */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Radio size={16} className="text-[#4DEEFF]" />
            Real-Time Visual Pipeline Architecture
          </h4>
          <Badge variant="cyan" dot>ACTIVE STREAM PACKETS</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative py-4">
          {pipelineNodes.map((node, i) => {
            const isActive = packetIndex === i;
            return (
              <div
                key={i}
                className={`p-4 rounded-xl bg-[var(--bg-void)] border transition-all space-y-2 relative ${
                  isActive
                    ? 'border-[#4DEEFF] shadow-[0_0_20px_rgba(77,238,255,0.25)] scale-105'
                    : 'border-[var(--border-subtle)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-lg bg-white/5">{node.icon}</span>
                  <span className="text-[10px] font-mono text-gray-500">STAGE 0{i + 1}</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">{node.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono">{node.sub}</div>
                </div>

                {/* Connecting Pulse Beam Arrow */}
                {i < pipelineNodes.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#4DEEFF]">
                    <ArrowRight size={16} className={isActive ? 'animate-pulse text-[#5BFFB2]' : 'text-gray-600'} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Event Stream Filter & Live Table */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <Badge variant="blue" dot>INGESTION STREAM LOGS</Badge>
            <span className="text-xs font-mono text-gray-400">
              Showing {filteredDataPoints.length} active events
            </span>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {/* Speed Selector */}
            <div className="flex items-center bg-[var(--bg-void)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
              {[1, 2, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setStreamSpeed(s)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                    streamSpeed === s ? 'bg-[#4F8CFF] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-[var(--bg-void)] border border-[var(--border-subtle)] text-xs font-mono text-white focus:outline-none focus:border-[#4F8CFF]"
            >
              <option value="ALL">All Types</option>
              <option value="stream">Stream</option>
              <option value="telemetry">Telemetry</option>
              <option value="document">Document</option>
              <option value="signal">Signal</option>
              <option value="api">API</option>
            </select>

            <button
              onClick={triggerManualEvent}
              className="px-3 py-1 rounded-lg bg-[#4F8CFF] text-white font-bold hover:bg-[#3D78E0] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus size={12} /> Inject Event
            </button>

            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className="px-3 py-1 rounded-lg bg-[var(--bg-void)] border border-[var(--border-subtle)] text-gray-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              {isLiveStreaming ? <Pause size={12} /> : <Play size={12} />}
              <span>{isLiveStreaming ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={clearStream}
              className="p-1.5 rounded-lg bg-[var(--bg-void)] border border-[var(--border-subtle)] text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Clear Log"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stream by ID, connector source name..."
            className="w-full bg-[var(--bg-void)] border border-[var(--border-subtle)] rounded-xl pl-9 pr-4 py-2 font-mono text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
          />
        </div>

        {/* Live Stream Table */}
        <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-[var(--border-subtle)] pb-2 text-[10px] uppercase sticky top-0 bg-[var(--bg-surface)] z-10">
                <th className="pb-2 font-normal">EVENT ID</th>
                <th className="pb-2 font-normal">SOURCE CONNECTOR</th>
                <th className="pb-2 font-normal">TYPE</th>
                <th className="pb-2 font-normal">PAYLOAD SIZE</th>
                <th className="pb-2 font-normal">CONFIDENCE</th>
                <th className="pb-2 font-normal text-right">TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <AnimatePresence initial={false}>
                {filteredDataPoints.map((dp) => (
                  <motion.tr
                    key={dp.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedEvent(dp)}
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5 font-bold text-[#4DEEFF] group-hover:underline">{dp.id}</td>
                    <td className="py-2.5 text-white">{dp.source}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 capitalize text-[10px]">
                        {dp.type}
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-400">{dp.size}</td>
                    <td className="py-2.5 text-[#5BFFB2] font-bold">
                      {(dp.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 text-right text-gray-500">{dp.timestamp}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
