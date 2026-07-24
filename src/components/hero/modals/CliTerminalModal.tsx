import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal, CornerDownLeft, Play, Sparkles } from 'lucide-react';
import { playUiSound } from '../../../utils/sfx';

interface CliTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CliTerminalModal: React.FC<CliTerminalModalProps> = ({ isOpen, onClose }) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: 'xai status',
      output: (
        <div className="space-y-1 text-xs">
          <div className="text-[#5BFFB2] font-bold">XAI Quantum Enterprise OS v4.2</div>
          <div>Cluster Health: 100% Operational (4 Multi-Region Nodes)</div>
          <div>Ingestion Throughput: 14.8M OPS/S</div>
          <div>Inference SLA: 9.2 ms (P99)</div>
          <div className="text-[#4DEEFF]">Type 'help' to see all available XAI CLI commands.</div>
        </div>
      ),
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    playUiSound('terminal');
    const trimmed = command.trim().toLowerCase();
    let responseOutput: React.ReactNode = null;

    if (trimmed === 'help') {
      responseOutput = (
        <div className="space-y-1 text-xs text-gray-300">
          <div className="text-[#4DEEFF] font-bold">Available Commands:</div>
          <div><span className="text-white font-mono">xai status</span> - View real-time cluster health and metrics</div>
          <div><span className="text-white font-mono">xai benchmark</span> - Run an instant tensor throughput test</div>
          <div><span className="text-white font-mono">xai ingest --dataset=logs</span> - Simulate raw log ingestion</div>
          <div><span className="text-white font-mono">xai trace --id=node-89</span> - Inspect neural trace graph</div>
          <div><span className="text-white font-mono">clear</span> - Clear terminal buffer</div>
        </div>
      );
    } else if (trimmed === 'xai status') {
      responseOutput = (
        <div className="text-xs text-[#5BFFB2]">
          <div>[OK] Regional Cluster US-East-1: ACTIVE (6.2M ops/s)</div>
          <div>[OK] Regional Cluster US-West-2: ACTIVE (4.8M ops/s)</div>
          <div>[OK] Regional Cluster EU-Frankfurt: ACTIVE (2.4M ops/s)</div>
          <div>[OK] Regional Cluster AP-Tokyo: ACTIVE (1.4M ops/s)</div>
        </div>
      );
    } else if (trimmed === 'xai benchmark') {
      responseOutput = (
        <div className="text-xs text-[#4DEEFF] space-y-1">
          <div>Executing Quantum Tensor Benchmark...</div>
          <div>- Batch Size: 4096 tokens</div>
          <div>- Warmup Latency: 4.1 ms</div>
          <div>- Sustained Throughput: 18.2M tokens/sec</div>
          <div className="text-[#5BFFB2] font-bold">Benchmark Passed: Exceeds Enterprise SLA requirement.</div>
        </div>
      );
    } else if (trimmed.startsWith('xai ingest')) {
      responseOutput = (
        <div className="text-xs text-[#5BFFB2]">
          <div>Ingesting sample unstructured dataset...</div>
          <div>- Processed 128,000 JSON records in 11.2ms</div>
          <div>- Vectorized into 1536-dim embeddings</div>
          <div>- Zero schema errors detected.</div>
        </div>
      );
    } else if (trimmed === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    } else {
      responseOutput = (
        <div className="text-xs text-red-400">
          Command not recognized: '{trimmed}'. Type <span className="text-white font-mono">'help'</span> for usage.
        </div>
      );
    }

    setHistory((prev) => [...prev, { cmd: command, output: responseOutput }]);
    setCommand('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl bg-[#090C10] rounded-2xl border border-[var(--border-subtle)] shadow-[0_24px_64px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col h-[520px]"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-[#11161D] border-b border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-white">
              <Terminal size={16} className="text-[#4DEEFF]" />
              <span className="font-bold">xai-cli --interactive-terminal</span>
              <span className="text-gray-500">|</span>
              <span className="text-[#5BFFB2] text-[10px]">CONNECTED</span>
            </div>
            <button
              onClick={() => {
                playUiSound('click');
                onClose();
              }}
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Terminal Quick Command Chips */}
          <div className="px-4 py-2 bg-[#0B0E14] border-b border-[var(--border-subtle)] flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-gray-400">
            <span className="shrink-0 text-gray-500">Quick Commands:</span>
            {['xai status', 'xai benchmark', 'xai ingest', 'help'].map((cmdItem) => (
              <button
                key={cmdItem}
                onClick={() => {
                  playUiSound('click');
                  setCommand(cmdItem);
                }}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:border-[#4DEEFF] text-gray-300 hover:text-white cursor-pointer shrink-0"
              >
                {cmdItem}
              </button>
            ))}
          </div>

          {/* Terminal Output Body */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4 font-mono text-xs">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#4DEEFF]">
                  <span>xai@enterprise-cluster:~$</span>
                  <span className="text-white font-bold">{item.cmd}</span>
                </div>
                <div className="pl-4 border-l border-white/10">{item.output}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Command Form */}
          <form onSubmit={handleRunCommand} className="p-3 bg-[#11161D] border-t border-[var(--border-subtle)] flex items-center gap-2">
            <span className="text-[#4DEEFF] font-mono text-xs font-bold pl-2">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Type command (e.g., 'xai benchmark', 'xai status')..."
              className="flex-1 bg-transparent text-xs font-mono text-white placeholder-gray-500 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-[#4F8CFF] text-white text-xs font-mono font-bold flex items-center gap-1 hover:bg-[#4F8CFF]/80 cursor-pointer"
            >
              Run <CornerDownLeft size={12} />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
