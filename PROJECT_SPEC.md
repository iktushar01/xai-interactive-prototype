# XAI — Intelligence Workspace Specifications

## 1. Product Story & Narrative
XAI solves the enterprise data fragmentation bottleneck. In modern organizations, information lives scattered across Kafka logs, Snowflake tables, Slack conversations, PDF contracts, and third-party APIs. Traditional BI tools present static charts without contextual understanding or execution power. 

XAI operates as an **Autonomous Intelligence Engine**:
1. **Raw Data Ingestion**: Continuously ingests unstructured signals at sub-20ms latency without rigid schema requirements.
2. **AI Understanding**: Synthesizes cross-departmental context using multi-modal neural tensor embeddings (`XAI-4 Enterprise Reasoner`).
3. **Structured Intelligence**: Collapses unstructured noise into zero-shot JSON knowledge schemas and high-confidence anomaly metrics.
4. **Actionable Decisions**: Automatically executes operational triggers across cloud infrastructure, ERPs, WAF firewalls, and air freight logistics with full human-in-the-loop auditability.

---

## 2. User Journey
1. **Discovery (Hero Section)**: The user arrives at an immersive 100vh canvas. The 3D particle system communicates intelligence through continuous state transformations (Raw Chaos → Synaptic Network → Grid Matrix → Crystal Core).
2. **Understanding (Intelligence Flow)**: An interactive narrative scrubber guides the user step-by-step through Ingestion, AI Analysis, Insight Generation, and Automated Execution with real-time code snippets and synapse node visuals.
3. **Product Evaluation (Workspace OS Dashboard)**: The user interacts with a fully functional enterprise workspace. They can monitor live streaming event logs, inspect regional cluster latency, browse neural model specs, audit automated rules, and run live enterprise queries in the interactive AI Console.
4. **Emotional Signature (The Hyper-Dimensional Core)**: A interactive 3D 1,600-vector quantum lattice that morphs between Point-Cloud Sphere, Particle Explosion, Hyper-Cube, and Unfolded 3D Workspace Planes via a precision slider or scroll.
5. **Action (Command Palette & CTA)**: Immediate access to `npx xai-workspace@latest init`, interactive command search (`⌘K`), and instant deployment entrypoints.

---

## 3. Design System & Aesthetics

### Color System
- **Canvas / Primary Background**: `#050608` (Deep void black with 3% warmth)
- **Secondary Background**: `#0B0F14` (Dark titanium surface)
- **Cards & Containers**: `#11151B` (Framed by `rgba(255,255,255,0.08)` hairline borders)
- **Electric Blue**: `#4F8CFF` (Primary interactive highlight & shadows)
- **Cyan Accent**: `#4DEEFF` (Telemetry indicators & data streams)
- **Success Green**: `#5BFFB2` (Health metrics & active statuses)
- **Purple Accent**: `#8B7CFF` (Neural reasoning depth & signature core)
- **Primary Text**: `#FFFFFF`
- **Secondary Text**: `#9BA4B5`
- **Muted Label Text**: `#6B7280`

### Typography & Spacing
- **Font Stack**: Inter / System UI with JetBrains Mono / SF Mono for technical metrics and code blocks.
- **Hierarchy**: Tight mathematical scale (1.25 ratio). Headlines utilize tight tracking (`letter-spacing: -0.02em`) with bold display weights.
- **Spacing System**: Strict 8pt grid (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`). Generous breathing room prevents visual overcrowding.

---

## 4. Motion Philosophy & Architecture
- **Purpose-Driven Motion**: Every animation explains product state or spatial depth. No decorative bounce or gratuitous floating.
- **Physics & Momentum**: Three.js WebGL particle clouds utilize cubic lerp velocity (`lerp(current, target, 0.04)`) and camera mouse parallax tilt.
- **Micro-Interactions**:
  - `useMagnetic`: Buttons and interactive badges pull toward the cursor within an 80px radius.
  - `useMouseTilt`: Cards tilt in 3D perspective based on relative cursor position (`perspective: 1000px`).
  - `useCountUp`: Hardware-accelerated count-up transitions for enterprise metrics.
  - `CustomCursor`: Ambient radial halo ring with precision center dot providing subtle hover state feedback.

---

## 5. Component Breakdown

| Component | Directory | Description |
|---|---|---|
| `Navbar` | `components/layout/Navbar.tsx` | Floating header with live ops ticker, search trigger (`⌘K`), and section links. |
| `CommandPalette` | `components/layout/CommandPalette.tsx` | Global search modal with section shortcuts and preset execution triggers. |
| `HeroSection` | `components/hero/HeroSection.tsx` | 100vh centerpiece with headline, CTAs, live metric counters, and 3D Canvas. |
| `HeroCanvas3D` | `components/hero/HeroCanvas3D.tsx` | Three.js particle system featuring 1,200 vertices morphing across 4 geometric states. |
| `IntelligenceFlow` | `components/flow/IntelligenceFlow.tsx` | Interactive 4-step pipeline scrubber with code snippets and synapse node visuals. |
| `DashboardPreview` | `components/dashboard/DashboardPreview.tsx` | Enterprise OS containing Overview, Live Ingestion, Models, Automations, and AI Console. |
| `LivePlayground` | `components/dashboard/LivePlayground.tsx` | Interactive AI console executing real-time simulated JSON extractions and action logs. |
| `SignatureInteraction` | `components/signature/SignatureInteraction.tsx` | 3D Hyper-Dimensional Quantum Core with dimension scrubber and matrix wireframe mode. |
| `Footer` | `components/layout/Footer.tsx` | Enterprise status diagnostics, SOC-2 certifications, and CLI quickstart snippet. |

---

## 6. Engineering Architecture & Performance
- **Framework**: React 19 + TypeScript + Vite + Tailwind CSS v4.
- **WebGL Rendering**: Three.js instance initialized inside container refs with custom canvas textures, additive blending, and GPU particle buffer attributes.
- **State Management**: Zero global store boilerplate; lightweight React hooks (`useState`, `useCallback`, `useEffect`, `useRef`).
- **60 FPS Performance**:
  - Animation frames managed via `requestAnimationFrame` with proper cleanup.
  - WebGL geometries and materials explicitly disposed on unmount to prevent memory leaks.
  - Mouse event listeners debounced or throttled using direct ref mutations to avoid state re-render loops.

---

## 7. Accessibility & Responsive Strategy
- **WCAG AA Compliance**: High contrast ratios across dark canvas surfaces (text on `#050608` exceeds 7:1 ratio).
- **Keyboard Navigation**: Full `⌘K` command palette support with keyboard shortcuts and focus trapping.
- **Mobile Fluidity**: Mobile-first grid layouts (`sm:`, `md:`, `lg:` breakpoints) ensuring full usability down to 320px screens.
