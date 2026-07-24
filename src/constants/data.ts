import { DataPoint, MetricCard, AutomationRule, AIModel, PlaygroundPreset } from '../types';

export const HERO_METRICS = [
  { label: 'INGESTION RATE', value: '14.8M', unit: 'events/sec', trend: '+24.5%' },
  { label: 'AVERAGE LATENCY', value: '14.2', unit: 'ms', trend: '-18.3%' },
  { label: 'DECISION CONFIDENCE', value: '99.84', unit: '%', trend: '+0.12%' },
  { label: 'ACTIVE AUTOMATIONS', value: '4,280', unit: 'workflows', trend: '+340 today' },
];

export const FLOW_STEPS = [
  {
    stepNumber: '01',
    title: 'Ingest Data',
    subtitle: 'Fragmented Streams & Unstructured Data',
    description: 'XAI connects directly to enterprise databases, logs, Slack messages, PDFs, APIs, and real-time Kafka topics, ingesting terabytes of raw unstructured signals without manual schema definitions.',
    badgeText: 'Sub-20ms Ingestion',
    metrics: [
      { key: 'Connected Sources', value: '248 / 250' },
      { key: 'Throughput', value: '182.4 GB/s' },
      { key: 'Noise Reduction', value: '94.2%' },
    ],
    codeSnippet: `// XAI Unified Ingest Pipeline
const stream = xai.stream.connect({
  connectors: ["snowflake", "kafka_logs", "s3_buckets", "slack_api"],
  compression: "zstd-hyper",
  deduplication: "realtime-vector-hash"
});`,
  },
  {
    stepNumber: '02',
    title: 'Analyze with AI',
    subtitle: 'Contextual Reasoning & Tensor Embedding',
    description: 'Our proprietary multi-modal neural layer parses text, telemetry, tables, and time-series vectors simultaneously. Cross-attentions correlate signals across disparate business departments.',
    badgeText: 'XAI-4 Neural Core',
    metrics: [
      { key: 'Active Parameters', value: '180 Billion' },
      { key: 'Context Window', value: '2,000,000 Tokens' },
      { key: 'Reasoning Depth', value: 'Multi-hop Graph' },
    ],
    codeSnippet: `// Contextual Tensor Inference
const intelligence = await xai.reasoning.evaluate(stream, {
  model: "xai-4-enterprise-reasoner",
  reasoningMode: "deep-reflection",
  confidenceThreshold: 0.985
});`,
  },
  {
    stepNumber: '03',
    title: 'Generate Insight',
    subtitle: 'Structured Knowledge & Anomaly Extraction',
    description: 'Unstructured noise collapses into clear JSON decision trees, pinpointing root causes, financial impacts, operational risks, and high-value growth opportunities in real time.',
    badgeText: '99.84% Confidence',
    metrics: [
      { key: 'Extracted Schema', value: 'Zero-shot JSON' },
      { key: 'Anomaly Precision', value: '99.91%' },
      { key: 'Alert Latency', value: '8ms' },
    ],
    codeSnippet: `// Structured Decision Schema Output
{
  "event_type": "SUPPLY_CHAIN_BOTTLENECK_DETECTED",
  "root_cause": "Port 42 Logistics Delay",
  "projected_cost_impact": "$142,500.00",
  "recommended_route": "Air Freight Courier #892"
}`,
  },
  {
    stepNumber: '04',
    title: 'Automation & Action',
    subtitle: 'Zero-Human In The Loop Execution',
    description: 'Execute instant actions through API webhooks, automated pull requests, ERP updates, and cloud infrastructure scaling rules with full human-in-the-loop audit logs.',
    badgeText: 'Zero-Downtime Actions',
    metrics: [
      { key: 'Executions Today', value: '412,980' },
      { key: 'Human Override Rate', value: '< 0.02%' },
      { key: 'Avg ROI Acceleration', value: '12.4x' },
    ],
    codeSnippet: `// Automated Action Trigger
await xai.automations.execute({
  ruleId: "auto_reroute_shipping_v2",
  payload: intelligence.recommendedAction,
  fallback: "escalate_to_ops_slack_channel"
});`,
  },
];

export const MOCK_DATA_POINTS: DataPoint[] = [
  { id: 'DP-9012', source: 'Kafka-Cluster-US-East', type: 'stream', status: 'analyzed', timestamp: '10:19:42', size: '2.4 MB', confidence: 0.998, tags: ['Latency Spikes', 'API Gateway'] },
  { id: 'DP-9013', source: 'Salesforce-Contracts-Bucket', type: 'document', status: 'routed', timestamp: '10:19:38', size: '14.8 MB', confidence: 0.989, tags: ['Legal Renewal', 'Enterprise Tier'] },
  { id: 'DP-9014', source: 'Snowflake-Transactions-DB', type: 'telemetry', status: 'analyzed', timestamp: '10:19:35', size: '820 KB', confidence: 0.995, tags: ['Fraud Detection', 'High Priority'] },
  { id: 'DP-9015', source: 'Slack-Ops-Channel-Feed', type: 'signal', status: 'ingesting', timestamp: '10:19:30', size: '124 KB', confidence: 0.974, tags: ['Incidents', 'Tier-1 Alert'] },
  { id: 'DP-9016', source: 'Datadog-Metric-Collector', type: 'telemetry', status: 'normalizing', timestamp: '10:19:22', size: '4.1 MB', confidence: 0.999, tags: ['CPU Spike', 'K8s Cluster 04'] },
];

export const MOCK_METRICS: MetricCard[] = [
  { label: 'Real-time Signal Ingestion', value: '1.42 GB/s', numericValue: 1.42, unit: 'GB/s', change: '+14.2%', isPositive: true, history: [40, 52, 58, 65, 72, 85, 94] },
  { label: 'Inference Throughput', value: '184.2 tps', numericValue: 184.2, unit: 'k tps', change: '+22.8%', isPositive: true, history: [110, 125, 140, 155, 172, 184] },
  { label: 'Automated Resolutions', value: '98.4%', numericValue: 98.4, unit: '%', change: '+1.1%', isPositive: true, history: [92, 94, 95, 96, 97, 98.4] },
  { label: 'Decision Latency (P99)', value: '12.4 ms', numericValue: 12.4, unit: 'ms', change: '-15.4%', isPositive: true, history: [22, 19, 17, 15, 13.5, 12.4] },
];

export const MOCK_AUTOMATIONS: AutomationRule[] = [
  { id: 'AUT-001', name: 'Auto-Reroute Supply Chain Bottlenecks', trigger: 'Port Delay Signal > 4 hrs', condition: 'Estimated Impact > $10,000', action: 'Dispatch Air Freight Courier via API', status: 'active', executionsToday: 142, lastRun: '2 mins ago', successRate: 99.8 },
  { id: 'AUT-002', name: 'Instant Security Incident Containment', trigger: 'Unrecognized JWT Auth Pattern', condition: 'Risk Score > 0.95', action: 'Revoke Access Token & Notify SOC', status: 'active', executionsToday: 89, lastRun: '12 mins ago', successRate: 100 },
  { id: 'AUT-003', name: 'Cloud Infrastructure Auto-Scale', trigger: 'Kafka Lag > 50,000 msg', condition: 'CPU Utilization > 80%', action: 'Spin Up 16 GPU Node Replicas', status: 'active', executionsToday: 312, lastRun: '1 min ago', successRate: 99.9 },
  { id: 'AUT-004', name: 'Enterprise Contract SLA Risk Alert', trigger: 'Renewal Contract PDF Uploaded', condition: 'Liability Clause Variance > 5%', action: 'Highlight Risk & Flag Legal Team', status: 'testing', executionsToday: 18, lastRun: '45 mins ago', successRate: 95.0 },
];

export const MOCK_MODELS: AIModel[] = [
  { id: 'MOD-X4E', name: 'XAI-4 Enterprise Reasoner', version: 'v4.2.1-nitro', type: 'Reasoning', latencyMs: 14, throughputTps: 340, contextWindow: '2,000,000 tokens', status: 'optimal' },
  { id: 'MOD-X4V', name: 'XAI Vision-3 Spatial Matrix', version: 'v3.8.0', type: 'Realtime Vision', latencyMs: 18, throughputTps: 190, contextWindow: '500,000 frames', status: 'optimal' },
  { id: 'MOD-X4C', name: 'XAI Code-Neural Synthesizer', version: 'v2.9.4', type: 'Code-Neural', latencyMs: 11, throughputTps: 420, contextWindow: '1,000,000 lines', status: 'optimal' },
  { id: 'MOD-X4M', name: 'XAI Multimodal Stream Core', version: 'v1.4.0', type: 'Multimodal', latencyMs: 24, throughputTps: 150, contextWindow: '5,000,000 events', status: 'high_load' },
];

export const PLAYGROUND_PRESETS: PlaygroundPreset[] = [
  {
    id: 'preset-supply-chain',
    title: 'Supply Chain Delay Anomaly',
    category: 'Logistics & Operations',
    inputData: `[RAW STREAM EVENT #89412]
Source: Port_Rotterdam_AIS_Radar
Signal: Vessel 'Ever Precision' delayed by 18.5 hours due to extreme weather condition in Sector 4.
Cargo Manifest: 1,400 units Silicon Microcontrollers for Auto Production Facility #2 (Detroit, MI).
Current Inventory Buffer: 22 hours remaining before line shutdown penalty ($250k/hr).`,
    simulatedOutput: {
      summary: 'Critical inventory depletion predicted within 22 hours due to Rotterdam port delay.',
      classification: 'HIGH_SEVERITY_OPERATIONAL_RISK',
      confidenceScore: 0.996,
      extractedEntities: {
        Vessel: 'Ever Precision',
        Location: 'Port Rotterdam Sector 4',
        Cargo: '1,400 Silicon Microcontrollers',
        TargetFacility: 'Auto Production Facility #2 (Detroit)',
        RiskPenalty: '$250,000 / hour',
      },
      recommendedAction: 'Execute auto-booking for 400 priority air freight units via Lufthansa Cargo Flight #LH-902. Total mitigation cost: $18,400 (saves $1.8M downtime penalty).',
      executionLatencyMs: 14.2,
      tokensProcessed: 1420,
    },
  },
  {
    id: 'preset-cyber-sec',
    title: 'Zero-Day Authentication Anomaly',
    category: 'Cybersecurity Telemetry',
    inputData: `[SYSLOG INGEST #4019]
IP: 185.220.101.5 (Tor Exit Node)
Attempt: 1,420 rapid API requests to /api/v2/auth/oauth-token
Header Payload: Synthetic User-Agent with spoofed TLS Fingerprint (JA3 match).
Behavior: Testing 4,000 rotated OAuth refresh tokens against enterprise SSO tenant.`,
    simulatedOutput: {
      summary: 'Distributed credential stuffing attack detected targeting Enterprise SSO OAuth endpoint.',
      classification: 'CRITICAL_CYBER_ATTACK',
      confidenceScore: 0.999,
      extractedEntities: {
        AttackerIP: '185.220.101.5',
        NetworkType: 'Tor Anonymizer Node',
        TargetEndpoint: '/api/v2/auth/oauth-token',
        Method: 'JA3 Spoofed Fingerprint Rotation',
      },
      recommendedAction: 'Apply immediate Cloudflare WAF ip_block rule, invalidate affected session hashes, and require FIDO2 hardware key re-auth for impacted tenant.',
      executionLatencyMs: 8.9,
      tokensProcessed: 890,
    },
  },
  {
    id: 'preset-financial-legal',
    title: 'Enterprise PDF Contract Audit',
    category: 'Legal & Finance',
    inputData: `[DOCUMENT PARSE: Master_Services_Agreement_V4_Final.pdf]
Section 14.2 (Indemnification Variance):
"Contractor liability shall be capped at $50,000 total cumulative, notwithstanding intentional breach, data loss, or gross negligence on third-party cloud infrastructure."
Standard Corporate SLA Threshold: Unlimited liability for gross negligence & zero cap on data breaches.`,
    simulatedOutput: {
      summary: 'High-risk clause detected in Section 14.2 violating enterprise standard risk exposure bounds.',
      classification: 'CONTRACT_LEGAL_VARIANCE',
      confidenceScore: 0.988,
      extractedEntities: {
        DocumentName: 'Master_Services_Agreement_V4_Final.pdf',
        Clause: 'Section 14.2 - Indemnification Variance',
        CurrentCap: '$50,000',
        RequiredCap: 'Unlimited for Gross Negligence',
      },
      recommendedAction: 'Generate counter-clause redline amendment via XAI Legal Engine and send approval request to General Counsel via Slack.',
      executionLatencyMs: 22.1,
      tokensProcessed: 3120,
    },
  },
];
