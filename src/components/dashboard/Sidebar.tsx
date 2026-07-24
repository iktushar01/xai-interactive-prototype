import React from 'react';
import { DashboardTab } from '../../types';
import { LayoutDashboard, Radio, Cpu, Workflow, Terminal, ShieldCheck, Settings, Sparkles, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { useDashboard } from '../../context/DashboardContext';

interface SidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const { cpuLoad, gpuLoad, setIsSettingsOpen, actionQueue } = useDashboard();

  const pendingQueueCount = actionQueue.filter((a) => a.status === 'analyzing' || a.status === 'executing').length;

  const menuItems: { id: DashboardTab; label: string; icon: React.ReactNode; badge?: string; badgeColor?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { id: 'ingestion', label: 'Live Ingestion', icon: <Radio size={16} />, badge: 'LIVE', badgeColor: 'bg-[#5BFFB2]/20 text-[#5BFFB2]' },
    { id: 'models', label: 'Neural Models', icon: <Cpu size={16} /> },
    { id: 'automations', label: 'Automations', icon: <Workflow size={16} />, badge: '4,280', badgeColor: 'bg-[#4DEEFF]/20 text-[#4DEEFF]' },
    { id: 'playground', label: 'AI Console', icon: <Terminal size={16} />, badge: 'INTERACTIVE', badgeColor: 'bg-[#8B7CFF]/20 text-[#8B7CFF]' },
  ];

  return (
    <aside className="w-full lg:w-64 bg-[var(--bg-surface)] border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] p-3 sm:p-4 flex flex-col lg:justify-between shrink-0 transition-colors duration-300 relative z-20">
      <div className="space-y-4 lg:space-y-6">
        {/* Workspace Environment Header (Interactive) */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[#4F8CFF] flex items-center justify-between transition-all cursor-pointer group text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#5BFFB2] animate-pulse" />
            <div>
              <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[#4F8CFF] transition-colors flex items-center gap-1">
                US-East Enterprise
              </div>
              <div className="text-[10px] font-mono text-[var(--text-muted)]">Production • Cluster 04</div>
            </div>
          </div>
          <Settings size={15} className="text-[var(--text-muted)] group-hover:text-[#4F8CFF] group-hover:rotate-90 transition-all" />
        </button>

        {/* Menu Navigation - Horizontal Scroll on mobile, Vertical list on desktop */}
        <div className="space-y-1">
          <div className="hidden lg:flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2">
            <span>WORKSPACE NAVIGATION</span>
            {pendingQueueCount > 0 && (
              <span className="text-[#8B7CFF] bg-[#8B7CFF]/10 px-1.5 py-0.5 rounded font-bold animate-pulse">
                {pendingQueueCount} QUEUED
              </span>
            )}
          </div>

          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 lg:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] ${
                    isActive ? 'text-white font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  {/* Shared Layout Active Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#4F8CFF] rounded-xl shadow-[0_0_16px_rgba(79,140,255,0.4)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-2.5">
                    <span className={`transition-transform duration-200 ${isActive ? 'scale-110 text-white' : ''}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`relative z-10 ml-2 text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                        isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-white/10 text-[#4DEEFF]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Live Hardware Engine Telemetry - Desktop Only */}
      <div className="hidden lg:block pt-4 border-t border-[var(--border-subtle)] space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1 text-[var(--text-muted)]">
              <Activity size={12} className="text-[#5BFFB2]" /> CPU LOAD
            </span>
            <span className="text-[#5BFFB2] font-bold">{cpuLoad}%</span>
          </div>
          <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#5BFFB2] h-full transition-all duration-500 rounded-full"
              style={{ width: `${cpuLoad}%` }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1 text-[var(--text-muted)]">
              <Cpu size={12} className="text-[#4DEEFF]" /> GPU TENSOR
            </span>
            <span className="text-[#4DEEFF] font-bold">{gpuLoad}%</span>
          </div>
          <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#4DEEFF] h-full transition-all duration-500 rounded-full"
              style={{ width: `${gpuLoad}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
