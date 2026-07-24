import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Activity, BarChart2, ShieldAlert, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from '../../shared/Button';
import { Badge } from '../../shared/Badge';
import { MetricCard } from '../../../types';
import { playUiSound } from '../../../utils/sfx';

interface MetricInspectorModalProps {
  metric: MetricCard | null;
  onClose: () => void;
}

export const MetricInspectorModal: React.FC<MetricInspectorModalProps> = ({ metric, onClose }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!metric) return null;

  const handleRefresh = () => {
    playUiSound('synth');
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[var(--bg-void)] border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 text-[#4F8CFF]">
                <Activity size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{metric.label} Telemetry Audit</h3>
                  <Badge variant="green" dot>LIVE AUDIT</Badge>
                </div>
                <p className="text-xs font-mono text-[var(--text-secondary)]">Real-Time Metric Deep Dive & Regional Verification</p>
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
          <div className="p-6 space-y-6 font-mono text-xs">
            {/* Main Value Banner */}
            <div className="p-5 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <div className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider">Current Metric Reading</div>
                <div className="text-3xl font-bold text-[var(--text-primary)] mt-1 flex items-baseline gap-2">
                  <span>{metric.value}</span>
                  <span className="text-sm text-[#4DEEFF] font-normal">{metric.unit}</span>
                </div>
                <div className="text-[#5BFFB2] text-[11px] mt-1">{metric.trend} compared to SLA baseline</div>
              </div>

              <button
                onClick={handleRefresh}
                className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[#4DEEFF] hover:bg-white/5 cursor-pointer transition-transform"
              >
                <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Sparkline Visual Simulation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <BarChart2 size={14} className="text-[#4F8CFF]" /> 24-Hour Continuous Telemetry Stream
                </span>
                <span className="text-[#5BFFB2]">99.999% SLA Compliant</span>
              </div>

              <div className="h-24 w-full bg-[var(--bg-void)] border border-[var(--border-subtle)] rounded-xl p-3 flex items-end gap-1.5 overflow-hidden">
                {[65, 78, 82, 70, 95, 88, 76, 92, 85, 99, 94, 89, 92, 98, 100, 91, 87, 96, 99, 95].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div
                      className="w-full bg-[#4F8CFF]/60 group-hover:bg-[#4DEEFF] rounded-t transition-all duration-300"
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Cluster Verification Breakdown */}
            <div className="space-y-2">
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Multi-Region Verification Logs</div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-3 rounded-lg bg-[var(--bg-void)] border border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">US-East Primary</span>
                  <span className="text-[#5BFFB2] flex items-center gap-1"><CheckCircle2 size={12} /> VERIFIED</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-void)] border border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">EU-Central Secondary</span>
                  <span className="text-[#5BFFB2] flex items-center gap-1"><CheckCircle2 size={12} /> VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 bg-[var(--bg-void)] border-t border-[var(--border-subtle)] flex items-center justify-between">
            <button
              onClick={() => {
                playUiSound('success');
                alert(`Exporting telemetry report for ${metric.label}...`);
              }}
              className="flex items-center gap-1.5 text-xs font-mono text-[#4DEEFF] hover:underline cursor-pointer"
            >
              <Download size={14} /> Export Audit Log (.CSV)
            </button>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                playUiSound('click');
                onClose();
              }}
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
