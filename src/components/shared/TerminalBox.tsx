import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface TerminalBoxProps {
  code: string;
  title?: string;
  language?: string;
}

export const TerminalBox: React.FC<TerminalBoxProps> = ({
  code,
  title = 'bash',
  language = 'javascript',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0B0F14] overflow-hidden font-mono text-xs shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#11151B] border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="ml-2 text-[#9BA4B5] text-xs flex items-center gap-1.5">
            <Terminal size={12} className="text-[#4F8CFF]" />
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[#9BA4B5] hover:text-white transition-colors cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} className="text-[#5BFFB2]" />
              <span className="text-[#5BFFB2]">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="p-4 overflow-x-auto leading-relaxed text-[#D0D7DE]">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
