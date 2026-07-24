import React, { useState, useEffect } from 'react';
import { PLAYGROUND_PRESETS } from '../../constants/data';
import { PlaygroundPreset } from '../../types';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { useDashboard } from '../../context/DashboardContext';
import {
  Terminal, Play, Sparkles, CheckCircle2, Zap, RotateCcw, Copy, Send,
  Sliders, MessageSquare, Code, Database, ChevronDown, ChevronUp, Share2, Layers, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  reasoningSteps?: string[];
  toolOutputs?: {
    type: 'code' | 'sql' | 'vector';
    title: string;
    content: string;
  }[];
  confidence?: number;
  tokens?: number;
  latencyMs?: number;
}

export const LivePlayground: React.FC<LivePlaygroundProps> = ({ selectedPresetId }) => {
  const { addNotification } = useDashboard();
  const initialPreset = PLAYGROUND_PRESETS.find((p) => p.id === selectedPresetId) || PLAYGROUND_PRESETS[0];

  const [activePreset, setActivePreset] = useState<PlaygroundPreset>(initialPreset);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [temperature, setTemperature] = useState(0.2);
  const [systemPrompt, setSystemPrompt] = useState('You are XAI-4 Enterprise Reasoner, enforcing zero-trust data schema and automated risk mitigation.');
  const [showSettings, setShowSettings] = useState(false);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: initialPreset.inputData,
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      text: initialPreset.simulatedOutput.summary,
      confidence: initialPreset.simulatedOutput.confidenceScore,
      latencyMs: initialPreset.simulatedOutput.executionLatencyMs,
      tokens: initialPreset.simulatedOutput.tokensProcessed,
      reasoningSteps: [
        'Ingested raw signal payload',
        'Evaluated cross-attention tensor weights',
        'Validated schema against enterprise policy',
        'Formulated recommended mitigation action',
      ],
      toolOutputs: [
        {
          type: 'code',
          title: 'Automated Webhook Payload (Python)',
          content: `import requests\n\nresponse = requests.post(\n    "https://api.lufthansa.com/v1/cargo/book",\n    json={\n        "vessel_delay_id": "ROTTERDAM_SECTOR_4",\n        "priority_units": 400,\n        "destination": "DETROIT_AUTO_FACILITY_2"\n    }\n)\nprint("Booking Status:", response.status_code)`,
        },
      ],
    },
  ]);

  const reasoningPhases = [
    'Parsing raw input stream tensor...',
    'Evaluating cross-attention vector weights...',
    'Performing multi-hop Graph Neural Network search...',
    'Synthesizing JSON decision tree & confidence score...',
    'Formulating automated action dispatch payload...',
  ];

  const [currentThinkingStep, setCurrentThinkingStep] = useState(reasoningPhases[0]);

  const handleSelectPreset = (preset: PlaygroundPreset) => {
    setActivePreset(preset);
    setInputText(preset.inputData);
    setChatHistory([
      { id: `msg-${Date.now()}-u`, sender: 'user', text: preset.inputData },
      {
        id: `msg-${Date.now()}-a`,
        sender: 'assistant',
        text: preset.simulatedOutput.summary,
        confidence: preset.simulatedOutput.confidenceScore,
        latencyMs: preset.simulatedOutput.executionLatencyMs,
        tokens: preset.simulatedOutput.tokensProcessed,
        reasoningSteps: [
          'Ingested unstructured payload',
          'Evaluated risk parameters',
          'Synthesized action proposal',
        ],
        toolOutputs: [
          {
            type: 'code',
            title: 'Action Trigger Payload',
            content: `// Automated XAI Action Payload\n{\n  "action": "${preset.simulatedOutput.recommendedAction}",\n  "confidence": ${preset.simulatedOutput.confidenceScore}\n}`,
          },
        ],
      },
    ]);
  };

  const handleSendPrompt = () => {
    if (!inputText.trim() || isProcessing) return;

    const userMsgText = inputText;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    let stepIdx = 0;
    setCurrentThinkingStep(reasoningPhases[0]);

    const interval = setInterval(() => {
      stepIdx += 1;
      if (stepIdx < reasoningPhases.length) {
        setCurrentThinkingStep(reasoningPhases[stepIdx]);
      } else {
        clearInterval(interval);
        setIsProcessing(false);

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `Analysis complete. Neural model evaluated query with high confidence. Root cause identified and recommended automated response generated.`,
          confidence: 0.994,
          latencyMs: 14.8,
          tokens: 1280,
          reasoningSteps: [
            'Embedded input text into 1,536-dimensional tensor space',
            'Cross-matched with 10M historic enterprise log vectors',
            'Verified compliance with zero-trust SLA boundaries',
          ],
          toolOutputs: [
            {
              type: 'sql',
              title: 'Executed Vector Search Query',
              content: `SELECT event_id, similarity_score \nFROM xai_vector_index \nWHERE cosine_distance(embedding, $1) < 0.05 \nLIMIT 5;`,
            },
          ],
        };

        setChatHistory((prev) => [...prev, aiMsg]);
        addNotification('AI Console output generated successfully', 'success');
      }
    }, 380);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addNotification('Text copied to clipboard', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[var(--border-subtle)]">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal size={20} className="text-[#8B7CFF]" />
            Enterprise AI Console & Multi-Modal Query Engine
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Interactive terminal interface for XAI-4 reasoning and tool execution.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="purple" dot>XAI-4 REASONER ACTIVE</Badge>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 rounded-lg bg-[var(--bg-void)] border border-[var(--border-subtle)] text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Console Settings"
          >
            <Sliders size={14} />
          </button>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-gray-500 mr-1">Enterprise Presets:</span>
        {PLAYGROUND_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectPreset(p)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
              activePreset.id === p.id
                ? 'bg-[#4F8CFF] text-white border-[#4F8CFF] shadow-[0_0_12px_rgba(79,140,255,0.4)]'
                : 'bg-[var(--bg-card)] text-gray-400 border-[var(--border-subtle)] hover:text-white'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Settings Drawer if open */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 font-mono text-xs"
        >
          <div className="space-y-1">
            <label className="text-gray-400 uppercase">System Prompt Persona</label>
            <input
              type="text"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full bg-[var(--bg-void)] border border-[var(--border-subtle)] rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-[#4F8CFF]"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Temperature</span>
                <span className="text-[#4DEEFF]">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#4F8CFF] cursor-pointer"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Chat Messages Log Window */}
      <Card className="p-5 space-y-4 min-h-[420px] max-h-[520px] overflow-y-auto flex flex-col justify-between">
        <div className="space-y-4">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                <span>{msg.sender === 'user' ? 'USER INPUT' : 'XAI-4 REASONER'}</span>
                {msg.confidence && (
                  <span className="text-[#5BFFB2] font-bold">{(msg.confidence * 100).toFixed(1)}% Confidence</span>
                )}
              </div>

              <div
                className={`p-3.5 sm:p-4 rounded-2xl w-full max-w-[92%] sm:max-w-2xl font-mono text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 text-white rounded-tr-none'
                    : 'bg-[#050608] border border-[var(--border-subtle)] text-[#D0D7DE] rounded-tl-none space-y-3'
                }`}
              >
                <div>{msg.text}</div>

                {/* Reasoning Steps */}
                {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
                  <div className="pt-2 border-t border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-500">Reasoning Trace:</span>
                    {msg.reasoningSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#4DEEFF]">
                        <span>•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tool Outputs */}
                {msg.toolOutputs &&
                  msg.toolOutputs.map((tool, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1.5 font-mono">
                      <div className="flex items-center justify-between text-[10px] text-[#5BFFB2]">
                        <span className="flex items-center gap-1">
                          <Code size={12} /> {tool.title}
                        </span>
                        <button
                          onClick={() => handleCopy(tool.content)}
                          className="hover:underline text-gray-400 cursor-pointer"
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="text-[11px] text-gray-300 overflow-x-auto whitespace-pre-wrap">
                        {tool.content}
                      </pre>
                    </div>
                  ))}

                {msg.tokens && (
                  <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-white/5">
                    <span>Latency: {msg.latencyMs}ms</span>
                    <span>Tokens: {msg.tokens}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex flex-col items-start space-y-2">
              <div className="p-4 rounded-2xl bg-[#050608] border border-[#4DEEFF]/40 font-mono text-xs text-[#4DEEFF] flex items-center gap-2">
                <Zap size={14} className="animate-spin text-[#4DEEFF]" />
                <span className="animate-pulse">{currentThinkingStep}</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
              placeholder="Query XAI OS console or paste unstructured telemetry..."
              className="flex-1 bg-[var(--bg-void)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-[#4F8CFF]"
            />

            <button
              onClick={handleSendPrompt}
              disabled={isProcessing || !inputText.trim()}
              className="px-5 py-3 rounded-xl bg-[#4F8CFF] text-white font-mono text-xs font-bold hover:bg-[#3D78E0] disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(79,140,255,0.4)]"
            >
              <Send size={14} /> Send
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface LivePlaygroundProps {
  selectedPresetId?: string;
}
