import React from 'react';
import { Card } from './Card';
import { MetricCard } from '../../types';
import { LiveMetricValue } from './LiveMetricValue';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatWidgetProps {
  metric: MetricCard;
}

export const StatWidget: React.FC<StatWidgetProps> = ({ metric }) => {
  return (
    <Card className="p-5 flex flex-col justify-between relative group overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[var(--text-secondary)] tracking-wider uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5BFFB2] animate-pulse" />
          {metric.label}
        </span>
        <div
          className={`flex items-center gap-1 text-xs font-mono font-medium ${
            metric.isPositive ? 'text-[#5BFFB2]' : 'text-red-400'
          }`}
        >
          {metric.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {metric.change}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
          <LiveMetricValue baseValue={metric.value} />
        </span>
      </div>

      {/* Mini SVG Trendline */}
      <div className="mt-4 h-10 w-full flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${metric.label.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M 0 30 ${metric.history
              .map((val, idx) => {
                const x = (idx / (metric.history.length - 1)) * 100;
                const min = Math.min(...metric.history);
                const max = Math.max(...metric.history);
                const y = 30 - ((val - min) / (max - min || 1)) * 25;
                return `L ${x} ${y}`;
              })
              .join(' ')} L 100 30 Z`}
            fill={`url(#grad-${metric.label.replace(/\s+/g, '-')})`}
          />
          <path
            d={metric.history
              .map((val, idx) => {
                const x = (idx / (metric.history.length - 1)) * 100;
                const min = Math.min(...metric.history);
                const max = Math.max(...metric.history);
                const y = 30 - ((val - min) / (max - min || 1)) * 25;
                return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="#4F8CFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Card>
  );
};

