import React, { useState, useEffect } from 'react';
import { Search, Terminal, Cpu, Sparkles, Layers, Activity, ArrowRight, X } from 'lucide-react';
import { PLAYGROUND_PRESETS } from '../../constants/data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (presetId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { id: 'hero', title: 'Jump to System Core (Hero)', category: 'Navigation', icon: <Cpu size={14} className="text-[#4F8CFF]" /> },
    { id: 'flow', title: 'Jump to Intelligence Flow Steps', category: 'Navigation', icon: <Sparkles size={14} className="text-[#4DEEFF]" /> },
    { id: 'dashboard', title: 'Open Workspace OS Dashboard', category: 'Navigation', icon: <Layers size={14} className="text-[#5BFFB2]" /> },
    { id: 'signature', title: 'Inspect Quantum Core 3D Lattice', category: 'Navigation', icon: <Activity size={14} className="text-[#8B7CFF]" /> },
  ];

  const handleAction = (id: string) => {
    if (id.startsWith('preset-')) {
      onSelectPreset(id);
      const el = document.getElementById('dashboard');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#0B0F14] rounded-2xl border border-[rgba(255,255,255,0.12)] shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden max-h-[85vh] flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <Search size={18} className="text-[#4F8CFF] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, run AI presets, or jump to section..."
            className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none font-mono"
            autoFocus
          />
          <span className="inline-block w-2 h-4 bg-[#4DEEFF] animate-pulse ml-1 mr-2" />
          <button
            onClick={onClose}
            className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Live System Activity Bar inside Palette */}
        <div className="px-4 py-2 bg-[var(--bg-void)] border-b border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono">
          <span className="text-[var(--text-muted)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5BFFB2] animate-ping" />
            Live Suggestions:
          </span>
          <span className="text-[#4DEEFF] truncate max-w-[300px]">
            npx xai-workspace run --preset supply-chain
          </span>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-4">
          {/* Section Jumps */}
          <div>
            <div className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider px-3 mb-2">
              Quick Navigation
            </div>
            <div className="space-y-1">
              {quickActions
                .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
                .map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#11151B] text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {action.icon}
                      <span className="text-sm text-white font-medium">{action.title}</span>
                    </div>
                    <ArrowRight size={14} className="text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
            </div>
          </div>

          {/* AI Playground Presets */}
          <div>
            <div className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider px-3 mb-2">
              Trigger AI Playground Presets
            </div>
            <div className="space-y-1">
              {PLAYGROUND_PRESETS.filter(
                (p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
              ).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleAction(preset.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#11151B] text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Terminal size={14} className="text-[#4DEEFF]" />
                    <div>
                      <div className="text-sm text-white font-medium">{preset.title}</div>
                      <div className="text-xs text-[#9BA4B5]">{preset.category}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#4F8CFF] bg-[#4F8CFF]/10 px-2 py-0.5 rounded border border-[#4F8CFF]/20">
                    Run Preset
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2.5 bg-[#050608] border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#6B7280] font-mono">
          <span>
            Tip: Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-white">ESC</kbd> to exit
          </span>
          <span>XAI OS Command Palette</span>
        </div>
      </div>
    </div>
  );
};
