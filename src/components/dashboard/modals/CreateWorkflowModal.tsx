import React, { useState } from 'react';
import { X, Workflow, Plus, Sparkles, ShieldCheck } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';

interface CreateWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWorkflowModal: React.FC<CreateWorkflowModalProps> = ({ isOpen, onClose }) => {
  const { addAutomationRule } = useDashboard();
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('Kafka Lag > 10,000 msg');
  const [condition, setCondition] = useState('Anomalous Risk Score > 0.90');
  const [action, setAction] = useState('Dispatch Webhook to PagerDuty API');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addAutomationRule({
      name,
      trigger,
      condition,
      action,
      status: 'active',
    });

    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-[#0B0F14] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#5BFFB2]/10 text-[#5BFFB2] border border-[#5BFFB2]/30">
              <Workflow size={18} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Create Zero-Trust Workflow Rule</h3>
              <p className="text-[11px] text-gray-400">Autonomous execution node</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-300 uppercase">Workflow Rule Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Auto-Scale GPU Nodes on High Token Lag"
              className="w-full bg-[#050608] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#4F8CFF]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-300 uppercase">1. Trigger Event (WHEN)</label>
            <input
              type="text"
              required
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="w-full bg-[#050608] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#4F8CFF]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-300 uppercase">2. AI Condition Filter (AND)</label>
            <input
              type="text"
              required
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full bg-[#050608] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#4DEEFF] focus:outline-none focus:border-[#4F8CFF]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-300 uppercase">3. Automated Execution Action (THEN)</label>
            <input
              type="text"
              required
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full bg-[#050608] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#5BFFB2] focus:outline-none focus:border-[#4F8CFF]"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[11px] font-mono text-[#4DEEFF] flex items-center gap-2">
            <ShieldCheck size={16} className="shrink-0" />
            <span>Zero-human-in-the-loop audit logs enabled automatically for this rule.</span>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#4F8CFF] text-white text-xs font-mono font-bold hover:bg-[#3D78E0] transition-all shadow-[0_0_16px_rgba(79,140,255,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <Plus size={14} /> Deploy Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
