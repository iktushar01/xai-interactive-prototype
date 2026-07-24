import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HeroCanvas3D } from './HeroCanvas3D';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { LiveMetricValue } from '../shared/LiveMetricValue';
import CursorGrid from '../shared/CursorGrid';
import { HERO_METRICS } from '../../constants/data';
import { MetricCard } from '../../types';
import {
  ArrowRight,
  Play,
  Terminal,
  Cpu,
  Database,
  Activity,
  GitCommit,
  Volume2,
  VolumeX,
  Gauge,
  Layers,
  Sparkles,
  Zap,
  Maximize2,
  Info,
  ShieldCheck,
  Check
} from 'lucide-react';
import { playUiSound } from '../../utils/sfx';
import { ReleaseNotesModal } from './modals/ReleaseNotesModal';
import { FlowPlayerModal } from './modals/FlowPlayerModal';
import { CliTerminalModal } from './modals/CliTerminalModal';
import { MetricInspectorModal } from './modals/MetricInspectorModal';

export const HeroSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(3); // Default to Actionable Core
  const [selectedMode, setSelectedMode] = useState<'autonomous' | 'supervised' | 'quantum'>('autonomous');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [showWireframe, setShowWireframe] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);
  const [isCliModalOpen, setIsCliModalOpen] = useState(false);
  const [inspectedMetric, setInspectedMetric] = useState<MetricCard | null>(null);

  const stageButtons = [
    { index: 0, label: '01 Raw Data', icon: <Database size={13} />, desc: 'Ingesting unstructured event streams' },
    { index: 1, label: '02 AI Understanding', icon: <Cpu size={13} />, desc: '1536-dim vector cross-attention' },
    { index: 2, label: '03 Structured Matrix', icon: <GitCommit size={13} />, desc: 'Graph neural network entity linking' },
    { index: 3, label: '04 Actionable Core', icon: <Activity size={13} />, desc: 'Autonomous execution payload' },
  ];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playUiSound('synth');
    triggerToast(next ? 'HUD SFX Synthesizer: Enabled' : 'HUD SFX Synthesizer: Muted');
  };

  const scrollTo = (id: string) => {
    if (soundEnabled) playUiSound('click');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[var(--bg-void)] transition-colors duration-300">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[#4DEEFF]/40 shadow-[0_12px_32px_rgba(0,0,0,0.8)] text-xs font-mono text-[#4DEEFF] flex items-center gap-2"
        >
          <Sparkles size={14} className="animate-spin" />
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Interactive Cursor Grid Background */}
      <CursorGrid
        cellSize={60}
        color={selectedMode === 'quantum' ? '#8B7CFF' : selectedMode === 'supervised' ? '#4F8CFF' : '#4DEEFF'}
        radius={160}
        falloff="smooth"
        holdTime={500}
        fadeDuration={900}
        lineWidth={1.2}
        maxOpacity={0.5}
        fillOpacity={0.04}
        gridOpacity={0.02}
        cellRadius={4}
        clickPulse={true}
        pulseSpeed={700}
      />

      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
          selectedMode === 'quantum'
            ? 'bg-[#8B7CFF]/15'
            : selectedMode === 'supervised'
            ? 'bg-[#4F8CFF]/15'
            : 'bg-[#4DEEFF]/15'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
          {/* Left Column: Headline & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Top Interactive System Pills & Badges */}
            <div className="flex flex-wrap items-center gap-2 max-w-full">
              <button
                onClick={() => {
                  if (soundEnabled) playUiSound('click');
                  setIsReleaseModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[#4DEEFF] text-xs font-mono text-[var(--text-secondary)] hover:text-white cursor-pointer transition-all shadow-sm"
              >
                <Badge variant="cyan" dot>ENTERPRISE AI OS</Badge>
                <span className="text-[var(--text-primary)] font-bold">v4.2 Release</span>
                <Info size={12} className="text-[#4DEEFF]" />
              </button>

              <button
                onClick={() => {
                  if (soundEnabled) playUiSound('terminal');
                  setIsCliModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[#4F8CFF] text-[11px] font-mono text-[var(--text-secondary)] hover:text-[#4DEEFF] cursor-pointer transition-all"
              >
                <Terminal size={12} className="text-[#4F8CFF]" />
                <span>xai-cli</span>
              </button>

              <button
                onClick={handleSoundToggle}
                className="p-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[#4DEEFF] cursor-pointer"
                title="Toggle HUD Audio Synthesizer"
              >
                {soundEnabled ? <Volume2 size={13} className="text-[#4DEEFF]" /> : <VolumeX size={13} />}
              </button>
            </div>

            {/* Mode Switcher Bar */}
            <div className="p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] inline-flex items-center gap-1 text-xs font-mono">
              {[
                { id: 'autonomous', label: 'AUTONOMOUS', color: '#4DEEFF' },
                { id: 'supervised', label: 'SUPERVISED', color: '#4F8CFF' },
                { id: 'quantum', label: 'QUANTUM PARALLEL', color: '#8B7CFF' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    if (soundEnabled) playUiSound('synth');
                    setSelectedMode(m.id as any);
                    triggerToast(`Switched Operating Mode to: ${m.label}`);
                  }}
                  className={`px-2.5 py-1.2 rounded-lg transition-all cursor-pointer ${
                    selectedMode === m.id
                      ? 'bg-black text-white font-bold shadow-sm border border-white/20'
                      : 'text-[var(--text-muted)] hover:text-white'
                  }`}
                  style={{
                    color: selectedMode === m.id ? m.color : undefined,
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Main Title */}
            <h1 className="text-fluid-hero font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
              The Enterprise <br />
              <span className="bg-gradient-to-r from-[#4F8CFF] via-[#4DEEFF] to-[#8B7CFF] bg-clip-text text-transparent">
                AI Operating System.
              </span>
            </h1>

            {/* Dynamic Product Narrative Subtext */}
            <p className="text-fluid-body text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
              {selectedMode === 'autonomous' &&
                'Continuous self-correcting neural engine ingesting multi-modal enterprise data streams with zero human latency bottlenecks.'}
              {selectedMode === 'supervised' &&
                'Human-in-the-loop governance matrix enforcing deterministic policy guardrails and audit-ready execution traces.'}
              {selectedMode === 'quantum' &&
                'Hyper-parallelized vector lattice processing 14.8M operations per second across distributed edge nodes.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                variant="primary"
                magnetic
                glow
                onClick={() => scrollTo('dashboard')}
                icon={<ArrowRight size={16} />}
              >
                Explore Platform
              </Button>

              <Button
                size="lg"
                variant="glass"
                magnetic
                onClick={() => {
                  if (soundEnabled) playUiSound('synth');
                  setIsFlowModalOpen(true);
                }}
                icon={<Play size={14} className="fill-current text-[#4DEEFF]" />}
              >
                Watch Intelligence Flow
              </Button>

              <button
                onClick={() => {
                  if (soundEnabled) playUiSound('terminal');
                  setIsCliModalOpen(true);
                }}
                className="px-3.5 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-white hover:border-[#4DEEFF] transition-all cursor-pointer flex items-center gap-2"
              >
                <Terminal size={14} className="text-[#4DEEFF]" />
                <span>Launch Console</span>
              </button>
            </div>

            {/* Interactive Stage Selector for 3D System */}
            <div className="pt-6 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">
                <span>3D Neural Morph State:</span>
                <span className="text-[#4DEEFF] lowercase">{stageButtons[activeStage].desc}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {stageButtons.map((btn) => (
                  <button
                    key={btn.index}
                    onClick={() => {
                      if (soundEnabled) playUiSound('synth');
                      setActiveStage(btn.index);
                    }}
                    className={`flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl text-[11px] sm:text-xs font-mono transition-all cursor-pointer border truncate ${
                      activeStage === btn.index
                        ? 'bg-[#4F8CFF]/15 border-[#4F8CFF] text-[var(--text-primary)] shadow-[0_0_20px_rgba(79,140,255,0.35)] scale-[1.02]'
                        : 'bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
                    }`}
                  >
                    {btn.icon}
                    <span className="truncate">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Three.js Living System Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative h-[380px] sm:h-[480px] lg:h-[560px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-md overflow-hidden shadow-[var(--shadow-card)] flex items-center justify-center group"
          >
            {/* Top Bar overlay */}
            <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5BFFB2] animate-pulse" />
                <span className="text-[var(--text-primary)] font-bold">Enterprise AI Pipeline Engine</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Speed Controls */}
                <button
                  onClick={() => {
                    if (soundEnabled) playUiSound('click');
                    const nextSpeed = speedMultiplier === 1 ? 2 : speedMultiplier === 2 ? 3 : 1;
                    setSpeedMultiplier(nextSpeed);
                  }}
                  className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] text-[#4DEEFF] hover:border-[#4DEEFF] cursor-pointer flex items-center gap-1"
                >
                  <Gauge size={11} /> {speedMultiplier}x Speed
                </button>

                {/* Wireframe Toggle */}
                <button
                  onClick={() => {
                    if (soundEnabled) playUiSound('click');
                    setShowWireframe(!showWireframe);
                  }}
                  className={`px-2 py-0.5 rounded border text-[10px] cursor-pointer ${
                    showWireframe
                      ? 'bg-[#4F8CFF]/20 border-[#4F8CFF] text-white'
                      : 'bg-black/60 border-white/10 text-gray-400'
                  }`}
                >
                  Core: {showWireframe ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* 3D Canvas */}
            <HeroCanvas3D
              stageIndex={activeStage}
              speedMultiplier={speedMultiplier}
              showWireframe={showWireframe}
            />

            {/* Bottom floating telemetry chip */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <Terminal size={13} className="text-[#4F8CFF]" />
                Pipeline Network: Drag Cursor to Orbit Graph
              </span>
              <button
                onClick={() => {
                  if (soundEnabled) playUiSound('synth');
                  setIsFlowModalOpen(true);
                }}
                className="text-[#5BFFB2] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles size={12} /> Live Knowledge Graph
              </button>
            </div>
          </motion.div>
        </div>

        {/* Hero Bottom Metric Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HERO_METRICS.map((m, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (soundEnabled) playUiSound('click');
                setInspectedMetric(m);
              }}
              className="space-y-1 border-l-2 border-[#4F8CFF]/40 pl-4 cursor-pointer group hover:border-[#4DEEFF] transition-colors p-1.5 rounded-r-xl hover:bg-white/5"
            >
              <div className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider group-hover:text-[#4DEEFF] transition-colors flex items-center justify-between">
                <span>{m.label}</span>
                <Info size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                  <LiveMetricValue baseValue={m.value} />
                </span>
                <span className="text-xs text-[#4DEEFF] font-mono">{m.unit}</span>
              </div>
              <div className="text-xs text-[#5BFFB2] font-mono">{m.trend} vs baseline</div>
            </div>
          ))}
        </div>
      </div>

      {/* Render Modals */}
      <ReleaseNotesModal
        isOpen={isReleaseModalOpen}
        onClose={() => setIsReleaseModalOpen(false)}
      />

      <FlowPlayerModal
        isOpen={isFlowModalOpen}
        onClose={() => setIsFlowModalOpen(false)}
      />

      <CliTerminalModal
        isOpen={isCliModalOpen}
        onClose={() => setIsCliModalOpen(false)}
      />

      <MetricInspectorModal
        metric={inspectedMetric}
        onClose={() => setInspectedMetric(null)}
      />
    </section>
  );
};

