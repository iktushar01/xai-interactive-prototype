/**
 * XAI - Intelligence Workspace Type Definitions
 */

export type AIStage = 'raw' | 'analyzing' | 'structured' | 'actionable' | 'automated';

export interface DataPoint {
  id: string;
  source: string;
  type: 'document' | 'stream' | 'telemetry' | 'signal' | 'api';
  status: 'ingesting' | 'normalizing' | 'analyzed' | 'routed';
  timestamp: string;
  size: string;
  confidence: number;
  tags: string[];
}

export interface MetricCard {
  label: string;
  value: string;
  numericValue: number;
  unit?: string;
  change: string;
  isPositive: boolean;
  history: number[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  status: 'active' | 'paused' | 'testing';
  executionsToday: number;
  lastRun: string;
  successRate: number;
}

export interface AIModel {
  id: string;
  name: string;
  version: string;
  type: 'Multimodal' | 'Reasoning' | 'Code-Neural' | 'Realtime Vision';
  latencyMs: number;
  throughputTps: number;
  contextWindow: string;
  status: 'optimal' | 'high_load' | 'standby';
}

export interface PlaygroundPreset {
  id: string;
  title: string;
  category: string;
  inputData: string;
  simulatedOutput: {
    summary: string;
    classification: string;
    confidenceScore: number;
    extractedEntities: Record<string, string>;
    recommendedAction: string;
    executionLatencyMs: number;
    tokensProcessed: number;
  };
}

export type DashboardTab = 'overview' | 'ingestion' | 'models' | 'automations' | 'playground';
