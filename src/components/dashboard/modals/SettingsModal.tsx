import React, { useState } from 'react';
import { X, Settings, Shield, Sliders, Globe, Cpu, Check } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { addNotification } = useDashboard();
  const [region, setRegion] = useState('US-East Enterprise (Cluster 04)');
  const [slaThreshold, setSlaThreshold] = useState('20');
  const [autoScale, setAutoScale] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('https://api.enterprise.internal/v1/xai-webhook');

  if (!isOpen) return null;

  const handleSave = () => {
    addNotification('Enterprise OS Configuration Saved', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-[#0B0F14] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/30">
              <Settings size={18} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Workspace OS Settings</h3>
              <p className="text-[11px] font-mono text-gray-400">Environment & SLA Preferences</p>
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
        <div className="p-6 space-y-4 font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-gray-300 uppercase">Primary Edge Cluster Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-[#050608] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#4F8CFF]"
            >
              <option>US-East Enterprise (Cluster 04)</option>
              <option>US-West Oregon (Cluster 02)</option>
              <option>EU-Central Frankfurt (Cluster 08)</option>
              <option>AP-East Tokyo (Cluster 01)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-gray-300 uppercase">Target Latency P99 SLA Threshold (ms)</label>
            <input
              type="number"
              value={slaThreshold}
              onChange={(e) => setSlaThreshold(e.target.value)}
              className="w-full bg-[#050608] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-[#5BFFB2] focus:outline-none focus:border-[#4F8CFF]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-gray-300 uppercase">Default Action Dispatch Webhook URL</label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-[#050608] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-[#4DEEFF] focus:outline-none focus:border-[#4F8CFF]"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#050608] border border-[var(--border-subtle)]">
            <div>
              <div className="text-white font-bold">Auto-Scale GPU Tensor Nodes</div>
              <div className="text-[10px] text-gray-500">Automatically spin up replicas if queue lag exceeds 50,000 tokens</div>
            </div>
            <button
              type="button"
              onClick={() => setAutoScale(!autoScale)}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                autoScale ? 'bg-[#4F8CFF]' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  autoScale ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#4F8CFF] text-white text-xs font-mono font-bold hover:bg-[#3D78E0] transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(79,140,255,0.4)]"
          >
            <Check size={14} /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
