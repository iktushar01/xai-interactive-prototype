import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const logs = [
    'INITIALIZING XAI KERNEL v4.2.0...',
    'CONNECTING TO REGIONAL CLUSTERS [US-EAST, US-WEST, EU-CENTRAL]...',
    'LOADING NEURAL TENSOR EMBEDDINGS (180B PARAMS)...',
    'SYNCHRONIZING ZERO-TRUST AUTOMATION PIPELINES...',
    'ESTABLISHING ENCRYPTED WEBSOCKET MESH (14.2ms P99)...',
    'XAI INTELLIGENCE WORKSPACE ONLINE.',
  ];

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(rawProgress));

      const stepIndex = Math.min(
        Math.floor((rawProgress / 100) * logs.length),
        logs.length - 1
      );
      setCurrentStep(stepIndex);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-[100] bg-[#050608] flex flex-col items-center justify-center p-6 text-white overflow-hidden font-mono"
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute w-96 h-96 bg-[#4F8CFF]/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        <div className="w-full max-w-lg space-y-8 relative z-10 text-center">
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center"
          >
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F8CFF] via-[#4DEEFF] to-[#8B7CFF] p-0.5 shadow-[0_0_40px_rgba(79,140,255,0.6)]">
              <div className="w-full h-full bg-[#050608] rounded-[14px] flex items-center justify-center">
                <span className="font-bold text-xl tracking-widest text-white">XAI</span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
              <Sparkles size={18} className="text-[#4DEEFF]" />
              XAI Intelligence Workspace
            </h1>
            <p className="text-xs text-[#9BA4B5]">Autonomous AI Operating System</p>
          </div>

          {/* Progress Bar Container */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-[#9BA4B5]">
              <span className="flex items-center gap-1.5 text-[#5BFFB2]">
                <span className="w-2 h-2 rounded-full bg-[#5BFFB2] animate-ping" />
                SYSTEM BOOT
              </span>
              <span className="text-[#4DEEFF] font-bold">{progress}%</span>
            </div>

            <div className="w-full h-2 bg-[#11151B] rounded-full overflow-hidden border border-[rgba(255,255,255,0.08)] p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4F8CFF] via-[#4DEEFF] to-[#5BFFB2] rounded-full shadow-[0_0_12px_rgba(77,238,255,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Console Log Ticker */}
          <div className="p-4 rounded-xl bg-[#0B0F14] border border-[rgba(255,255,255,0.08)] text-left h-20 flex items-center shadow-inner overflow-hidden">
            <div className="text-[11px] text-[#4DEEFF] flex items-center gap-2">
              <Terminal size={14} className="shrink-0 text-[#4F8CFF]" />
              <span className="truncate">{logs[currentStep]}</span>
            </div>
          </div>

          {/* System Certs */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-[#6B7280] uppercase tracking-wider">
            <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-[#5BFFB2]" /> ENCRYPTED</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Cpu size={12} className="text-[#4F8CFF]" /> 180B PARAMS</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Zap size={12} className="text-[#8B7CFF]" /> 14.2ms P99</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
