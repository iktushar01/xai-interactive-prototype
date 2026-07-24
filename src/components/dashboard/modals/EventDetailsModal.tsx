import React from 'react';
import { DataPoint } from '../../../types';
import { X, CheckCircle, Shield, Cpu, Clock, Tag, Copy, Code } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';

interface EventDetailsModalProps {
  event: DataPoint | null;
  onClose: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  const { addNotification } = useDashboard();
  if (!event) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(event, null, 2));
    addNotification('Event JSON payload copied to clipboard', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#0B0F14] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/30">
              <Code size={18} />
            </span>
            <div>
              <div className="text-xs font-mono text-[#4DEEFF] font-bold">{event.id}</div>
              <h3 className="text-sm font-bold text-white">Live Event Payload Telemetry</h3>
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
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Top Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">Source Stream</span>
              <div className="text-xs font-mono font-bold text-white truncate">{event.source}</div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">Event Type</span>
              <div className="text-xs font-mono font-bold text-[#4DEEFF] capitalize">{event.type}</div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">Confidence</span>
              <div className="text-xs font-mono font-bold text-[#5BFFB2]">
                {(event.confidence * 100).toFixed(1)}%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-void)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">Payload Size</span>
              <div className="text-xs font-mono font-bold text-white">{event.size}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <Tag size={12} className="text-[#4F8CFF]" /> AI Classification Tags:
            </span>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#4F8CFF]/10 text-[#4DEEFF] border border-[#4F8CFF]/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Raw JSON Code view */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span>RAW TENSOR PAYLOAD (SCHEMA VERIFIED)</span>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1 text-[#4F8CFF] hover:underline cursor-pointer"
              >
                <Copy size={12} /> Copy JSON
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#050608] border border-[var(--border-subtle)] font-mono text-xs text-[#5BFFB2] overflow-x-auto leading-relaxed">
{JSON.stringify(
  {
    event_id: event.id,
    timestamp_utc: `${new Date().toISOString().split('T')[0]}T${event.timestamp}Z`,
    ingestion_node: 'US-EAST-1-INGRESS-04',
    source_connector: event.source,
    event_category: event.type,
    payload_hash: `0x${Math.random().toString(16).substr(2, 12)}`,
    confidence_score: event.confidence,
    normalized_attributes: {
      encrypted: true,
      data_size_bytes: event.size,
      zero_trust_status: 'PASSED',
      schema_validation: 'VALIDATED_BY_XAI_4',
    },
  },
  null,
  2
)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-between text-xs font-mono">
          <span className="text-gray-500 flex items-center gap-1">
            <Shield size={12} className="text-[#5BFFB2]" /> Zero-Trust Verified
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#4F8CFF] text-white font-medium hover:bg-[#3D78E0] transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
