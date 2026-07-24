import React, { useState, useEffect } from 'react';
import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import { useDashboard } from '../../context/DashboardContext';
import { Workflow, Play, CheckCircle2, ShieldCheck, ArrowRight, Plus, Pause, Zap, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export const AutomationsPanel: React.FC = () => {
  const {
    automations,
    toggleAutomationStatus,
    testRunWorkflow,
    setIsCreateWorkflowOpen,
  } = useDashboard();

  const [activeNodeStep, setActiveNodeStep] = useState(0);

  // Cycle active workflow node highlight
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodeStep((prev) => (prev + 1) % 5);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const workflowPipelineSteps = [
    { title: '1. Trigger Ingest', detail: 'Real-Time Event Ingestion', color: 'border-[#4F8CFF] text-[#4F8CFF]' },
    { title: '2. Zero-Trust Filter', detail: 'Condition & Policy Gate', color: 'border-[#4DEEFF] text-[#4DEEFF]' },
    { title: '3. Neural Reasoning', detail: 'XAI-4 Model Evaluation', color: 'border-[#8B7CFF] text-[#8B7CFF]' },
    { title: '4. Action Execution', detail: 'API Webhook Dispatch', color: 'border-[#5BFFB2] text-[#5BFFB2]' },
    { title: '5. Audit & Notif', detail: 'Slack & SOC Audit Trail', color: 'border-[#4F8CFF] text-[#4F8CFF]' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Workflow size={20} className="text-[#5BFFB2]" />
            Zero-Trust Autonomous Execution Workflows
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Zero-human-in-the-loop actions triggered automatically by real-time neural signals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success">{automations.length} Active Rules</Badge>
          <button
            onClick={() => setIsCreateWorkflowOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-mono font-bold hover:bg-[#3D78E0] transition-colors flex items-center gap-1.5 cursor-pointer shadow-[0_0_16px_rgba(79,140,255,0.4)]"
          >
            <Plus size={14} /> Create Workflow
          </button>
        </div>
      </div>

      {/* Visual Workflow Execution Path Node Graph */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity size={16} className="text-[#4DEEFF]" />
            Live Execution Signal Flow
          </h4>
          <span className="text-xs font-mono text-[#5BFFB2] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5BFFB2] animate-ping" />
            Execution Path Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 py-2 relative">
          {workflowPipelineSteps.map((step, idx) => {
            const isCurrent = activeNodeStep === idx;
            return (
              <motion.div
                key={idx}
                animate={{ scale: isCurrent ? 1.04 : 1 }}
                className={`p-3.5 rounded-xl bg-[var(--bg-void)] border transition-all space-y-1 relative ${
                  isCurrent
                    ? `${step.color} shadow-[0_0_18px_rgba(91,255,178,0.25)] font-bold`
                    : 'border-[var(--border-subtle)]'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-gray-500">STAGE 0{idx + 1}</div>
                <div className="text-xs font-mono text-white">{step.title}</div>
                <div className="text-[10px] font-mono text-gray-400">{step.detail}</div>

                {idx < workflowPipelineSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-600">
                    <ArrowRight size={14} className={isCurrent ? 'text-[#5BFFB2] animate-pulse' : ''} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((rule) => (
          <Card key={rule.id} className="p-5 space-y-4 group hover:border-[#4F8CFF] transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 flex items-center justify-center shrink-0">
                  <Workflow size={20} className="text-[#4F8CFF]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#4F8CFF] font-bold">{rule.id}</span>
                    <h4 className="text-sm font-bold text-white">{rule.name}</h4>
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    Executed {rule.executionsToday} times today • Last run: {rule.lastRun} • Success Rate: {rule.successRate}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={rule.status === 'active' ? 'success' : 'purple'}>
                  {rule.status.toUpperCase()}
                </Badge>

                <button
                  onClick={() => testRunWorkflow(rule.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/30 text-xs font-mono font-bold hover:bg-[#4F8CFF]/20 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Test Fire Execution"
                >
                  <Play size={12} /> Test Run
                </button>

                <button
                  onClick={() => toggleAutomationStatus(rule.id)}
                  className="p-1.5 rounded-lg bg-[var(--bg-void)] border border-[var(--border-subtle)] text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {rule.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>
            </div>

            {/* Trigger -> Condition -> Action Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#050608] border border-[var(--border-subtle)] space-y-1">
                <span className="text-gray-500 block text-[10px] uppercase">WHEN TRIGGER FIRES</span>
                <span className="text-white font-medium">{rule.trigger}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#050608] border border-[var(--border-subtle)] space-y-1">
                <span className="text-gray-500 block text-[10px] uppercase">AND CONDITION MET</span>
                <span className="text-[#4DEEFF] font-medium">{rule.condition}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#050608] border border-[var(--border-subtle)] space-y-1">
                <span className="text-gray-500 block text-[10px] uppercase">THEN EXECUTE ACTION</span>
                <span className="text-[#5BFFB2] font-medium">{rule.action}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
