import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { DataPoint, MetricCard, AutomationRule, AIModel, PlaygroundPreset, DashboardTab } from '../types';
import { MOCK_DATA_POINTS, MOCK_METRICS, MOCK_AUTOMATIONS, MOCK_MODELS, PLAYGROUND_PRESETS } from '../constants/data';

export interface ActionQueueItem {
  id: string;
  title: string;
  status: 'pending' | 'analyzing' | 'executing' | 'completed' | 'archived';
  impact: string;
  target: string;
  progress: number;
  etaSeconds: number;
  badge: string;
  badgeColor: 'blue' | 'cyan' | 'purple' | 'success' | 'warning';
  timestamp: string;
  sourceEventId?: string;
  reasoningTrace?: string[];
}

export interface AIInsight {
  id: string;
  title: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impactValue: string;
  summary: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'dismissed';
}

export interface RegionCluster {
  id: string;
  name: string;
  code: string;
  opsPerSec: number;
  latencyMs: number;
  loadPct: number;
  status: 'healthy' | 'degraded' | 'scaling';
}

interface DashboardContextType {
  // Navigation
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;

  // Live Stream
  dataPoints: DataPoint[];
  isLiveStreaming: boolean;
  setIsLiveStreaming: (live: boolean) => void;
  streamSpeed: number;
  setStreamSpeed: (speed: number) => void;
  streamSearchQuery: string;
  setStreamSearchQuery: (q: string) => void;
  selectedSourceFilter: string;
  setSelectedSourceFilter: (source: string) => void;
  triggerManualEvent: () => void;
  clearStream: () => void;

  // Action Queue
  actionQueue: ActionQueueItem[];
  approveAction: (id: string) => void;
  overrideAction: (id: string) => void;
  retryAction: (id: string) => void;
  archiveAction: (id: string) => void;
  createActionItem: (title: string, impact: string, target: string) => void;

  // Live Metrics & Regional Stats
  metrics: MetricCard[];
  cpuLoad: number;
  gpuLoad: number;
  memoryLoad: number;
  networkThroughput: number;
  regionalClusters: RegionCluster[];

  // Automations & Workflows
  automations: AutomationRule[];
  toggleAutomationStatus: (id: string) => void;
  testRunWorkflow: (id: string) => void;
  addAutomationRule: (rule: Omit<AutomationRule, 'id' | 'executionsToday' | 'lastRun' | 'successRate'>) => void;

  // Neural Models
  models: AIModel[];
  benchmarkingModelId: string | null;
  runModelBenchmark: (modelId: string) => Promise<void>;
  benchmarkResults: Record<string, { latencyMs: number; tps: number; accuracy: number }>;

  // AI Insights
  insights: AIInsight[];
  generateNewInsight: () => void;
  resolveInsight: (id: string) => void;

  // Modals & Inspector Drawer State
  selectedEvent: DataPoint | null;
  setSelectedEvent: (event: DataPoint | null) => void;
  selectedModelInspector: AIModel | null;
  setSelectedModelInspector: (model: AIModel | null) => void;
  isCreateWorkflowOpen: boolean;
  setIsCreateWorkflowOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isExportOpen: boolean;
  setIsExportOpen: (open: boolean) => void;

  // Global Toast Notifications
  notifications: Array<{ id: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; timestamp: string }>;
  addNotification: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;

  // Global Actions
  syncWorkspace: () => void;
  isSyncing: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(MOCK_DATA_POINTS);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [streamSpeed, setStreamSpeed] = useState(1);
  const [streamSearchQuery, setStreamSearchQuery] = useState('');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('ALL');

  // Monotonic counters to guarantee 100% unique IDs across time
  const dpCounterRef = useRef(9020);
  const actCounterRef = useRef(8905);
  const insCounterRef = useRef(103);
  const notifCounterRef = useRef(100);

  const [metrics, setMetrics] = useState<MetricCard[]>(MOCK_METRICS);
  const [cpuLoad, setCpuLoad] = useState(18.4);
  const [gpuLoad, setGpuLoad] = useState(42.1);
  const [memoryLoad, setMemoryLoad] = useState(31.8);
  const [networkThroughput, setNetworkThroughput] = useState(184.1);

  const [regionalClusters, setRegionalClusters] = useState<RegionCluster[]>([
    { id: 'us-east', name: 'US-East (N. Virginia)', code: 'US-EAST-1', opsPerSec: 6.2, latencyMs: 9, loadPct: 78, status: 'healthy' },
    { id: 'us-west', name: 'US-West (Oregon)', code: 'US-WEST-2', opsPerSec: 4.8, latencyMs: 12, loadPct: 62, status: 'healthy' },
    { id: 'eu-central', name: 'EU-Central (Frankfurt)', code: 'EU-CENT-1', opsPerSec: 2.4, latencyMs: 14, loadPct: 45, status: 'healthy' },
    { id: 'ap-east', name: 'AP-East (Tokyo)', code: 'AP-EAST-1', opsPerSec: 1.4, latencyMs: 18, loadPct: 38, status: 'healthy' },
  ]);

  const [actionQueue, setActionQueue] = useState<ActionQueueItem[]>([
    {
      id: 'ACT-8902',
      title: 'Rerouted 400 Air Freight units to bypass Rotterdam Port Bottleneck',
      status: 'completed',
      impact: 'Saved $1.8M line downtime penalty',
      target: 'Supply Chain Logistics Hub',
      progress: 100,
      etaSeconds: 0,
      badge: 'Auto-Executed',
      badgeColor: 'success',
      timestamp: '10:18:22',
      reasoningTrace: ['Detected vessel delay signal', 'Evaluated inventory buffer (22h left)', 'Simulated cost delta ($18k vs $1.8M)', 'Dispatched Lufthansa Air Freight API'],
    },
    {
      id: 'ACT-8903',
      title: 'Applied WAF JA3 IP Block against Tor credential stuffing node',
      status: 'executing',
      impact: 'Threat Mitigated: 4,000 requests/min',
      target: 'Cloudflare Edge Gateway',
      progress: 68,
      etaSeconds: 4,
      badge: 'In Progress',
      badgeColor: 'cyan',
      timestamp: '10:19:05',
      reasoningTrace: ['Flagged 1,420 rapid auth token attempts', 'Matched JA3 TLS fingerprint', 'Generated WAF Firewall rule', 'Deploying to 285 Edge PoPs'],
    },
    {
      id: 'ACT-8904',
      title: 'MSA Liability Clause Redline generated for Enterprise Client Renewal',
      status: 'analyzing',
      impact: 'Target: Legal Team Slack Notification',
      target: 'Slack Legal Channel (#legal-ops)',
      progress: 35,
      etaSeconds: 12,
      badge: 'Awaiting Review',
      badgeColor: 'purple',
      timestamp: '10:19:30',
      reasoningTrace: ['Parsed uploaded contract PDF', 'Identified $50k indemnity cap variance', 'Synthesized standard corporate redline draft'],
    },
  ]);

  const [automations, setAutomations] = useState<AutomationRule[]>(MOCK_AUTOMATIONS);
  const [models, setModels] = useState<AIModel[]>(MOCK_MODELS);
  const [benchmarkingModelId, setBenchmarkingModelId] = useState<string | null>(null);
  const [benchmarkResults, setBenchmarkResults] = useState<Record<string, { latencyMs: number; tps: number; accuracy: number }>>({});

  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: 'INS-101',
      title: 'Cross-Tenant Kafka Signal Anomaly',
      category: 'Data Engineering',
      severity: 'medium',
      impactValue: '+18.2% throughput burst',
      summary: 'Automated buffer scaling prevented consumer lag escalation across Cluster 04.',
      timestamp: 'Just now',
      status: 'active',
    },
    {
      id: 'INS-102',
      title: 'Sub-20ms SLA Optimization Achieved',
      category: 'Model Inference',
      severity: 'low',
      impactValue: 'P99 Latency: 12.4ms',
      summary: 'FP16 TensorRT quantization reduced reasoning latency across all regional clusters.',
      timestamp: '12 mins ago',
      status: 'active',
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<DataPoint | null>(null);
  const [selectedModelInspector, setSelectedModelInspector] = useState<AIModel | null>(null);
  const [isCreateWorkflowOpen, setIsCreateWorkflowOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; timestamp: string }>>([]);

  const addNotification = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = `notif-${Date.now()}-${notifCounterRef.current++}`;
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setNotifications((prev) => [{ id, message, type, timestamp }, ...prev.slice(0, 4)]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Sync workspace button handler
  const syncWorkspace = useCallback(() => {
    setIsSyncing(true);
    addNotification('Synchronizing neural tensor state with global edge nodes...', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      addNotification('Workspace synchronized across all 4 regional clusters', 'success');
    }, 1200);
  }, [addNotification]);

  // 1. Live Ingestion Event Stream Interval
  useEffect(() => {
    if (!isLiveStreaming) return;

    const baseIntervalMs = 2800 / streamSpeed;

    const interval = setInterval(() => {
      const sources = [
        'Kafka-US-East', 'Snowflake-Transactions', 'Salesforce-PDFs', 'Datadog-Metrics',
        'AWS-CloudTrail', 'Slack-Ops-Feed', 'Redis-Session-Cluster', 'OpenAI-Embeddings-Log',
        'Claude-Enterprise-Stream', 'VectorDB-Milvus', 'Postgres-Main-DB', 'S3-Contracts-Bucket'
      ];
      const types: DataPoint['type'][] = ['stream', 'document', 'telemetry', 'signal', 'api'];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const tagOptions = [
        ['Auto-Routed', 'Zero Anomaly'],
        ['Latency Spike', 'P99 Guard'],
        ['Security Hash', 'JA3 Verified'],
        ['LLM Reasoning', 'Token Pass'],
        ['High Priority', 'Zero-Trust'],
        ['Schema Extraction', 'JSON Validated']
      ];
      const randomTags = tagOptions[Math.floor(Math.random() * tagOptions.length)];

      const nextId = `DP-${dpCounterRef.current++}`;

      const newPoint: DataPoint = {
        id: nextId,
        source: randomSource,
        type: randomType,
        status: 'analyzed',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        size: `${(Math.random() * 18 + 0.2).toFixed(1)} MB`,
        confidence: Number((0.982 + Math.random() * 0.017).toFixed(3)),
        tags: randomTags,
      };

      setDataPoints((prev) => {
        const cleaned = prev.filter((item) => item.id !== newPoint.id);
        return [newPoint, ...cleaned.slice(0, 39)];
      });

      // Occasionally trigger notification for high value events
      if (Math.random() > 0.85) {
        addNotification(`New signal ingested from ${randomSource} (${newPoint.size})`, 'info');
      }
    }, baseIntervalMs);

    return () => clearInterval(interval);
  }, [isLiveStreaming, streamSpeed, addNotification]);

  // 2. Continuous Metric Interpolation
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluructure CPU, Memory, GPU
      setCpuLoad((prev) => Number(Math.min(48, Math.max(12, prev + (Math.random() - 0.49) * 1.8)).toFixed(1)));
      setGpuLoad((prev) => Number(Math.min(85, Math.max(25, prev + (Math.random() - 0.48) * 2.4)).toFixed(1)));
      setMemoryLoad((prev) => Number(Math.min(65, Math.max(20, prev + (Math.random() - 0.5) * 1.2)).toFixed(1)));
      setNetworkThroughput((prev) => Number((prev + (Math.random() - 0.48) * 0.4).toFixed(1)));

      // Regional loads
      setRegionalClusters((prev) =>
        prev.map((c) => ({
          ...c,
          opsPerSec: Number(Math.max(0.5, c.opsPerSec + (Math.random() - 0.48) * 0.1).toFixed(1)),
          loadPct: Math.min(95, Math.max(20, Math.round(c.loadPct + (Math.random() - 0.48) * 3))),
        }))
      );

      // Fluctuate Metric cards smoothly
      setMetrics((prev) =>
        prev.map((m) => {
          const lastVal = m.history[m.history.length - 1];
          const delta = (Math.random() - 0.48) * (lastVal * 0.02);
          const newVal = Math.max(5, lastVal + delta);
          const newHistory = [...m.history.slice(1), newVal];

          let formattedVal = m.value;
          if (m.unit === 'GB/s') formattedVal = `${(newVal / 60).toFixed(2)} GB/s`;
          else if (m.unit === 'k tps' || m.label.includes('Throughput')) formattedVal = `${newVal.toFixed(1)}`;
          else if (m.unit === '%') formattedVal = `${Math.min(99.9, newVal).toFixed(2)}%`;
          else if (m.unit === 'ms') formattedVal = `${Math.max(8, newVal / 8).toFixed(1)} ms`;

          return {
            ...m,
            value: formattedVal,
            history: newHistory,
          };
        })
      );
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // 3. AI Action Queue Auto Progression
  useEffect(() => {
    const interval = setInterval(() => {
      setActionQueue((prev) => {
        let changed = false;
        const updated = prev.map((item) => {
          if (item.status === 'executing' || item.status === 'analyzing') {
            changed = true;
            const newProgress = Math.min(100, item.progress + Math.floor(Math.random() * 18 + 12));
            const newEta = Math.max(0, item.etaSeconds - 2);

            if (newProgress >= 100) {
              const nextStatus = item.status === 'analyzing' ? 'executing' : 'completed';
              return {
                ...item,
                progress: nextStatus === 'completed' ? 100 : 25,
                status: nextStatus,
                etaSeconds: nextStatus === 'completed' ? 0 : 6,
                badge: nextStatus === 'completed' ? 'Auto-Executed' : 'In Progress',
                badgeColor: nextStatus === 'completed' ? 'success' : 'cyan',
              };
            }
            return { ...item, progress: newProgress, etaSeconds: newEta };
          }
          return item;
        });

        if (changed) return updated;

        // If all items completed, periodically insert a new intelligent action
        if (Math.random() > 0.8) {
          const actionTemplates = [
            { title: 'Isolated anomalous Redis cache eviction cluster in AP-East', target: 'Redis Cluster 02', impact: 'Saved 280ms database query overhead' },
            { title: 'Scaled Kubernetes GPU Pod Replicas from 8 to 16', target: 'AWS EKS Cluster', impact: 'Drained 42,000 pending inference tokens' },
            { title: 'Generated Automated Post-Mortem for Snowflake Ingestion Dip', target: 'Datadog & PagerDuty', impact: 'Auto-reported to DevOps Lead' },
            { title: 'Re-balanced Vector Index Quantization in Milvus DB', target: 'Vector Engine', impact: 'Recall Rate boosted to 99.94%' }
          ];
          const template = actionTemplates[Math.floor(Math.random() * actionTemplates.length)];
          const newId = `ACT-${actCounterRef.current++}`;
          if (!prev.some((a) => a.id === newId)) {
            const newItem: ActionQueueItem = {
              id: newId,
              title: template.title,
              target: template.target,
              impact: template.impact,
              status: 'analyzing',
              progress: 15,
              etaSeconds: 10,
              badge: 'Analyzing',
              badgeColor: 'purple',
              timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
              reasoningTrace: ['Flagged telemetry variance', 'Evaluating risk thresholds', 'Preparing execution strategy'],
            };
            addNotification(`AI Action Queue: New task generated ${newId}`, 'info');
            return [newItem, ...prev.slice(0, 5)];
          }
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [addNotification]);

  // Handlers for Stream
  const triggerManualEvent = useCallback(() => {
    const nextId = `DP-MANUAL-${dpCounterRef.current++}`;
    const newPoint: DataPoint = {
      id: nextId,
      source: 'User-Console-Trigger',
      type: 'api',
      status: 'analyzed',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      size: '1.2 MB',
      confidence: 0.999,
      tags: ['Manual Test', 'Console-Injected'],
    };
    setDataPoints((prev) => {
      const cleaned = prev.filter((item) => item.id !== newPoint.id);
      return [newPoint, ...cleaned];
    });
    addNotification('Manual telemetry event injected into pipeline', 'success');
  }, [addNotification]);

  const clearStream = useCallback(() => {
    setDataPoints([]);
    addNotification('Ingestion stream cache cleared', 'warning');
  }, [addNotification]);

  // Handlers for Action Queue
  const approveAction = useCallback((id: string) => {
    setActionQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: 'executing', progress: 50, badge: 'In Progress', badgeColor: 'cyan', etaSeconds: 4 }
          : item
      )
    );
    addNotification(`Action ${id} approved by user. Executing workflow...`, 'success');
  }, [addNotification]);

  const overrideAction = useCallback((id: string) => {
    setActionQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: 'archived', badge: 'User Overridden', badgeColor: 'warning' }
          : item
      )
    );
    addNotification(`Action ${id} overridden by user`, 'warning');
  }, [addNotification]);

  const retryAction = useCallback((id: string) => {
    setActionQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: 'analyzing', progress: 10, badge: 'Analyzing', badgeColor: 'purple', etaSeconds: 8 }
          : item
      )
    );
    addNotification(`Retrying action ${id}...`, 'info');
  }, [addNotification]);

  const archiveAction = useCallback((id: string) => {
    setActionQueue((prev) => prev.filter((item) => item.id !== id));
    addNotification(`Action ${id} archived`, 'info');
  }, [addNotification]);

  const createActionItem = useCallback((title: string, impact: string, target: string) => {
    const id = `ACT-CUSTOM-${actCounterRef.current++}`;
    const newItem: ActionQueueItem = {
      id,
      title,
      impact,
      target,
      status: 'analyzing',
      progress: 10,
      etaSeconds: 8,
      badge: 'Custom Task',
      badgeColor: 'blue',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      reasoningTrace: ['Custom user rule created', 'Validating syntax', 'Running dry-run simulation'],
    };
    setActionQueue((prev) => [newItem, ...prev]);
    addNotification(`Action ${id} added to execution queue`, 'success');
  }, [addNotification]);

  // Handlers for Automations
  const toggleAutomationStatus = useCallback((id: string) => {
    setAutomations((prev) =>
      prev.map((rule) => {
        if (rule.id === id) {
          const nextStatus = rule.status === 'active' ? 'paused' : 'active';
          addNotification(`Workflow ${id} is now ${nextStatus.toUpperCase()}`, nextStatus === 'active' ? 'success' : 'warning');
          return { ...rule, status: nextStatus };
        }
        return rule;
      })
    );
  }, [addNotification]);

  const testRunWorkflow = useCallback((id: string) => {
    addNotification(`Test firing workflow ${id}...`, 'info');
    setTimeout(() => {
      setAutomations((prev) =>
        prev.map((rule) =>
          rule.id === id
            ? { ...rule, executionsToday: rule.executionsToday + 1, lastRun: 'Just now' }
            : rule
        )
      );
      addNotification(`Workflow ${id} executed successfully (0.0ms delay)`, 'success');
    }, 1000);
  }, [addNotification]);

  const addAutomationRule = useCallback((rule: Omit<AutomationRule, 'id' | 'executionsToday' | 'lastRun' | 'successRate'>) => {
    const id = `AUT-00${automations.length + 1}`;
    const newRule: AutomationRule = {
      ...rule,
      id,
      executionsToday: 0,
      lastRun: 'Never',
      successRate: 100,
    };
    setAutomations((prev) => [newRule, ...prev]);
    addNotification(`New Automation Workflow ${id} created`, 'success');
  }, [automations.length, addNotification]);

  // Handlers for Models
  const runModelBenchmark = useCallback(async (modelId: string) => {
    setBenchmarkingModelId(modelId);
    addNotification(`Running live benchmark on ${modelId}...`, 'info');
    await new Promise((resolve) => setTimeout(resolve, 1800));
    
    const latencyMs = Number((8 + Math.random() * 10).toFixed(1));
    const tps = Math.floor(250 + Math.random() * 300);
    const accuracy = Number((99.2 + Math.random() * 0.7).toFixed(2));

    setBenchmarkResults((prev) => ({
      ...prev,
      [modelId]: { latencyMs, tps, accuracy },
    }));
    setBenchmarkingModelId(null);
    addNotification(`Benchmark complete for ${modelId}: ${latencyMs}ms / ${tps} tps`, 'success');
  }, [addNotification]);

  // Handlers for Insights
  const generateNewInsight = useCallback(() => {
    const topics = [
      { title: 'Zero-Trust Policy Enforced across 400 API Endpoints', category: 'Security', impact: '100% Policy Pass Rate', summary: 'All unauthenticated telemetry requests automatically redirected to isolation vault.' },
      { title: 'Predictive GPU Memory Scaling Activated', category: 'Infra', impact: 'Saved $42,000 monthly compute', summary: 'Model weights auto-sharded across idle tensor cores during low-traffic windows.' },
      { title: 'Automated SLA Redline Agreement Verified', category: 'Legal', impact: '99.98% Accuracy', summary: 'Contract analysis engine identified zero non-compliant liability terms.' },
      { title: 'Supply Chain Shipping Re-routing Executed', category: 'Logistics', impact: 'Saved 48h Transit Time', summary: 'Air courier dispatched prior to port closure escalation.' },
    ];
    const picked = topics[Math.floor(Math.random() * topics.length)];
    const id = `INS-${insCounterRef.current++}`;
    const newInsight: AIInsight = {
      id,
      title: picked.title,
      category: picked.category,
      severity: 'medium',
      impactValue: picked.impact,
      summary: picked.summary,
      timestamp: 'Just now',
      status: 'active',
    };
    setInsights((prev) => [newInsight, ...prev]);
    addNotification(`AI Insight Generated: ${picked.title}`, 'success');
  }, [addNotification]);

  const resolveInsight = useCallback((id: string) => {
    setInsights((prev) => prev.filter((i) => i.id !== id));
    addNotification(`Insight ${id} resolved and archived`, 'info');
  }, [addNotification]);

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        dataPoints,
        isLiveStreaming,
        setIsLiveStreaming,
        streamSpeed,
        setStreamSpeed,
        streamSearchQuery,
        setStreamSearchQuery,
        selectedSourceFilter,
        setSelectedSourceFilter,
        triggerManualEvent,
        clearStream,
        actionQueue,
        approveAction,
        overrideAction,
        retryAction,
        archiveAction,
        createActionItem,
        metrics,
        cpuLoad,
        gpuLoad,
        memoryLoad,
        networkThroughput,
        regionalClusters,
        automations,
        toggleAutomationStatus,
        testRunWorkflow,
        addAutomationRule,
        models,
        benchmarkingModelId,
        runModelBenchmark,
        benchmarkResults,
        insights,
        generateNewInsight,
        resolveInsight,
        selectedEvent,
        setSelectedEvent,
        selectedModelInspector,
        setSelectedModelInspector,
        isCreateWorkflowOpen,
        setIsCreateWorkflowOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isExportOpen,
        setIsExportOpen,
        notifications,
        addNotification,
        removeNotification,
        syncWorkspace,
        isSyncing,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
