import React from 'react';
import { DashboardTab } from '../../types';
import { Sidebar } from './Sidebar';
import { OverviewPanel } from './OverviewPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import { ModelsPanel } from './ModelsPanel';
import { AutomationsPanel } from './AutomationsPanel';
import { LivePlayground } from './LivePlayground';
import { Badge } from '../shared/Badge';
import { Search, Sparkles, Bell, RefreshCw, Download, Settings, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { DashboardProvider, useDashboard } from '../../context/DashboardContext';
import { EventDetailsModal } from './modals/EventDetailsModal';
import { CreateWorkflowModal } from './modals/CreateWorkflowModal';
import { ModelInspectorModal } from './modals/ModelInspectorModal';
import { SettingsModal } from './modals/SettingsModal';
import { ExportModal } from './modals/ExportModal';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardPreviewProps {
  initialPresetId?: string;
  onOpenCommandPalette: () => void;
}

const DashboardInnerContent: React.FC<DashboardPreviewProps> = ({
  initialPresetId,
  onOpenCommandPalette,
}) => {
  const {
    activeTab,
    setActiveTab,
    syncWorkspace,
    isSyncing,
    setIsExportOpen,
    setIsSettingsOpen,
    notifications,
    removeNotification,
    selectedEvent,
    setSelectedEvent,
    selectedModelInspector,
    setSelectedModelInspector,
    isCreateWorkflowOpen,
    setIsCreateWorkflowOpen,
    isSettingsOpen,
    isExportOpen,
  } = useDashboard();

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col lg:flex-row min-h-[680px] transition-colors duration-300 relative">
      {/* Toast Notifications Layer */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-3 rounded-xl border shadow-xl backdrop-blur-md pointer-events-auto flex items-center justify-between gap-3 text-xs font-mono ${
                notif.type === 'success'
                  ? 'bg-[#5BFFB2]/10 border-[#5BFFB2]/40 text-[#5BFFB2]'
                  : notif.type === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-[#4F8CFF]/10 border-[#4F8CFF]/40 text-[#4DEEFF]'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{notif.message}</span>
              </div>
              <button
                onClick={() => removeNotification(notif.id)}
                className="hover:opacity-100 opacity-60 cursor-pointer"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Right Main Content Panel */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[var(--bg-void)]/80 space-y-6 overflow-y-auto">
        {/* Top Header Bar inside Dashboard Window */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-muted)]">Workspace /</span>
            <span className="text-sm font-bold text-[var(--text-primary)] capitalize">{activeTab}</span>
          </div>

          {/* Interactive Global Buttons */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {/* Sync Workspace Button */}
            <button
              onClick={syncWorkspace}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[#5BFFB2] hover:bg-[#5BFFB2]/10 transition-colors cursor-pointer"
              title="Trigger global state sync across cluster edge nodes"
            >
              <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
              <span>{isSyncing ? 'SYNCING...' : 'SYNCED'}</span>
            </button>

            {/* Export Data Button */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="p-1.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white border border-[var(--border-subtle)] hover:border-[#4F8CFF] transition-colors cursor-pointer"
              title="Export Telemetry & Logs"
            >
              <Download size={14} />
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white border border-[var(--border-subtle)] hover:border-[#4F8CFF] transition-colors cursor-pointer"
              title="OS Workspace Settings"
            >
              <Settings size={14} />
            </button>
          </div>
        </div>

        {/* Workspace Content with Shared AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewPanel />}
            {activeTab === 'ingestion' && <AnalyticsPanel />}
            {activeTab === 'models' && <ModelsPanel />}
            {activeTab === 'automations' && <AutomationsPanel />}
            {activeTab === 'playground' && (
              <LivePlayground selectedPresetId={initialPresetId} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Modals */}
      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <CreateWorkflowModal
        isOpen={isCreateWorkflowOpen}
        onClose={() => setIsCreateWorkflowOpen(false)}
      />

      <ModelInspectorModal
        model={selectedModelInspector}
        onClose={() => setSelectedModelInspector(null)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  initialPresetId,
  onOpenCommandPalette,
}) => {
  return (
    <DashboardProvider>
      <section id="dashboard" className="py-16 sm:py-24 bg-[var(--bg-void)] relative border-t border-[var(--border-subtle)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="blue" dot>PRODUCT EXPERIENCE</Badge>
              <h2 className="text-fluid-title font-bold tracking-tight text-[var(--text-primary)]">
                The Enterprise AI Operating System.
              </h2>
              <p className="text-[var(--text-secondary)] text-sm max-w-xl">
                Real-time monitoring, model inference, zero-trust automations, and live AI console.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#4F8CFF] transition-all cursor-pointer shadow-sm group"
              >
                <Search size={14} className="text-[#4F8CFF] group-hover:scale-110 transition-transform" />
                <span>Search Workspace</span>
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded text-gray-400">⌘K</kbd>
              </button>
            </div>
          </div>

          {/* Render Dashboard Content */}
          <DashboardInnerContent
            initialPresetId={initialPresetId}
            onOpenCommandPalette={onOpenCommandPalette}
          />
        </div>
      </section>
    </DashboardProvider>
  );
};
