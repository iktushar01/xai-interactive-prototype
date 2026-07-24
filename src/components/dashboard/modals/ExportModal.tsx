import React from 'react';
import { X, Download, FileText, Code, Check } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { dataPoints, actionQueue, automations, addNotification } = useDashboard();

  if (!isOpen) return null;

  const handleDownloadJSON = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      cluster: 'US-East Enterprise Cluster 04',
      eventsCount: dataPoints.length,
      actionQueue,
      automations,
      events: dataPoints,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xai-workspace-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification('Telemetry & Action Logs exported to JSON', 'success');
    onClose();
  };

  const handleDownloadCSV = () => {
    const headers = ['Event ID', 'Source Stream', 'Type', 'Confidence', 'Status', 'Timestamp'];
    const rows = dataPoints.map((dp) => [dp.id, dp.source, dp.type, dp.confidence, dp.status, dp.timestamp]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xai-ingestion-stream-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification('Ingestion Stream exported to CSV', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-[#0B0F14] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#5BFFB2]/10 text-[#5BFFB2] border border-[#5BFFB2]/30">
              <Download size={18} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Export Telemetry & Logs</h3>
              <p className="text-[11px] font-mono text-gray-400">Download audit trail</p>
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
        <div className="p-6 space-y-4">
          <button
            onClick={handleDownloadJSON}
            className="w-full p-4 rounded-xl bg-[#050608] border border-[var(--border-subtle)] hover:border-[#4F8CFF] transition-all flex items-center gap-4 group cursor-pointer text-left"
          >
            <div className="p-2.5 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF] group-hover:scale-110 transition-transform">
              <Code size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-white group-hover:text-[#4F8CFF]">Full Workspace JSON Payload</div>
              <div className="text-xs font-mono text-gray-400">Includes Ingestion Stream, AI Queue, and Active Workflows</div>
            </div>
          </button>

          <button
            onClick={handleDownloadCSV}
            className="w-full p-4 rounded-xl bg-[#050608] border border-[var(--border-subtle)] hover:border-[#5BFFB2] transition-all flex items-center gap-4 group cursor-pointer text-left"
          >
            <div className="p-2.5 rounded-lg bg-[#5BFFB2]/10 text-[#5BFFB2] group-hover:scale-110 transition-transform">
              <FileText size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-white group-hover:text-[#5BFFB2]">Ingestion Stream CSV Report</div>
              <div className="text-xs font-mono text-gray-400">CSV formatted table of {dataPoints.length} recent stream events</div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
