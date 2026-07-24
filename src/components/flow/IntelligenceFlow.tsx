import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FLOW_STEPS } from '../../constants/data';
import { Badge } from '../shared/Badge';
import { Card } from '../shared/Card';
import { TerminalBox } from '../shared/TerminalBox';
import { Sparkles, Database, Cpu, CheckCircle2, ArrowRight, Zap, ShieldAlert, Workflow } from 'lucide-react';

export const IntelligenceFlow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = FLOW_STEPS[activeStepIndex];

  const stepIcons = [
    <Database size={18} className="text-[#4F8CFF]" />,
    <Cpu size={18} className="text-[#4DEEFF]" />,
    <Sparkles size={18} className="text-[#8B7CFF]" />,
    <Workflow size={18} className="text-[#5BFFB2]" />,
  ];

  return (
    <section id="flow" className="py-24 bg-[var(--bg-surface)] relative border-t border-[var(--border-subtle)] transition-colors duration-300">
      {/* Ambient background light beam */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#4DEEFF]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <Badge variant="blue" dot>NARRATIVE PIPELINE</Badge>
          <h2 className="text-fluid-title font-bold tracking-tight text-[var(--text-primary)]">
            From Raw Entropy to Autonomous Execution.
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Every piece of enterprise data undergoes four continuous transformations. Explore each stage of the XAI decision lifecycle.
          </p>
        </div>

        {/* Step Scrubber Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {FLOW_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? 'bg-[var(--bg-card)] border-[#4F8CFF] shadow-[var(--shadow-glow)]'
                    : 'bg-[var(--bg-void)]/60 border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)]/50'
                }`}
              >
                {/* Active Top Progress Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeFlowIndicator"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F8CFF] to-[#4DEEFF]"
                  />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#4F8CFF] font-bold">
                    STEP {step.stepNumber}
                  </span>
                  {stepIcons[idx]}
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)] mb-1 group-hover:text-[#4DEEFF] transition-colors">
                  {step.title}
                </div>
                <div className="text-xs text-[var(--text-muted)] truncate">
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Card: Explanation, Metrics & Details */}
            <Card className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="cyan">{activeStep.badgeText}</Badge>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Stage {activeStep.stepNumber} of 04</span>
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  {activeStep.title}: <span className="text-[var(--text-secondary)] font-normal">{activeStep.subtitle}</span>
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {activeStep.description}
                </p>

                {/* Key Metrics Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[var(--border-subtle)]">
                  {activeStep.metrics.map((m, i) => (
                    <div key={i} className="bg-[var(--bg-void)] p-3 rounded-lg border border-[var(--border-subtle)]">
                      <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase truncate">
                        {m.key}
                      </div>
                      <div className="text-sm font-mono font-bold text-[var(--text-primary)] mt-1">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Step Actions */}
              <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ← Previous Step
                </button>

                <div className="flex items-center gap-1.5">
                  {FLOW_STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeStepIndex === i ? 'bg-[#4F8CFF] w-6' : 'bg-[var(--border-hover)]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={activeStepIndex === FLOW_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(FLOW_STEPS.length - 1, prev + 1))}
                  className="text-xs font-mono text-[#4F8CFF] hover:text-[#4DEEFF] flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Next Stage</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </Card>


            {/* Right Card: Code Execution & Visual Synapse Diagram */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              {/* Terminal Code Box */}
              <TerminalBox
                title={`xai_pipeline_step_${activeStep.stepNumber}.ts`}
                code={activeStep.codeSnippet}
              />

              {/* Interactive Neural Synapse SVG Graphic */}
              <Card className="p-4 sm:p-6 relative overflow-hidden flex items-center justify-center min-h-[180px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF]/5 via-transparent to-[#4DEEFF]/5 pointer-events-none" />

                <div className="w-full flex items-center justify-around relative z-10 px-2">
                  {/* Node 1 */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF] flex items-center justify-center shadow-[0_0_16px_rgba(79,140,255,0.3)]">
                      <Database size={18} className="text-[#4F8CFF]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#9BA4B5]">Kafka / S3</span>
                  </div>

                  {/* Connecting Animated Line 1 */}
                  <div className="flex-1 max-w-[60px] sm:max-w-[120px] relative px-1 sm:px-2">
                    <div className="h-0.5 w-full bg-[var(--border-subtle)] relative overflow-hidden">
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#4DEEFF] to-transparent"
                      />
                    </div>
                    {/* Glowing travelling packet dot */}
                    <motion.div
                      animate={{ left: ['0%', '100%'], opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                      className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-[#4DEEFF] shadow-[0_0_8px_#4DEEFF]"
                    />
                    <Zap size={10} className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[#4DEEFF]" />
                  </div>

                  {/* Node 2 */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#4DEEFF]/10 border border-[#4DEEFF] flex items-center justify-center shadow-[0_0_16px_rgba(77,238,255,0.3)] animate-pulse">
                      <Cpu size={18} className="text-[#4DEEFF]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[var(--text-secondary)]">XAI Engine</span>
                  </div>

                  {/* Connecting Animated Line 2 */}
                  <div className="flex-1 max-w-[60px] sm:max-w-[120px] relative px-1 sm:px-2">
                    <div className="h-0.5 w-full bg-[var(--border-subtle)] relative overflow-hidden">
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear', delay: 0.4 }}
                        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#5BFFB2] to-transparent"
                      />
                    </div>
                    {/* Glowing travelling packet dot 2 */}
                    <motion.div
                      animate={{ left: ['0%', '100%'], opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.4 }}
                      className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-[#5BFFB2] shadow-[0_0_8px_#5BFFB2]"
                    />
                  </div>

                  {/* Node 3 */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#5BFFB2]/10 border border-[#5BFFB2] flex items-center justify-center shadow-[0_0_16px_rgba(91,255,178,0.3)]">
                      <CheckCircle2 size={18} className="text-[#5BFFB2]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#9BA4B5]">Executed</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
