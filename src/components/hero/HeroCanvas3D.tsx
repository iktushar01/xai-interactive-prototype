import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroCanvas3DProps {
  stageIndex: number; // 0: Raw Data, 1: AI Understanding, 2: Structured Matrix, 3: Actionable Core
  speedMultiplier?: number;
  showWireframe?: boolean;
}

interface PipelineNode {
  id: string;
  name: string;
  stage: number; // 0: Ingest, 1: Vector, 2: AI Core, 3: Knowledge Graph, 4: Action Dispatch
  x: number;
  y: number;
  z: number;
  category: string;
  type: string;
  metric: string;
  status: 'ONLINE' | 'PROCESSING' | 'STREAMING';
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({
  stageIndex,
  speedMultiplier = 1,
  showWireframe = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const [hoveredNode, setHoveredNode] = useState<PipelineNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [activeMetrics, setActiveMetrics] = useState({
    throughput: '14.8M',
    latency: '1.2ms',
    vectors: '1.52M/s',
    accuracy: '99.98%',
    activeNodes: 24,
    eventStream: '8.4 GB/s',
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ------------------------------------------------------------------------
    // 1. Scene, Camera, Renderer Setup
    // ------------------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070c, 0.018);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 27);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ------------------------------------------------------------------------
    // 2. Enterprise Neural Nodes & Knowledge Graph Data Pipeline
    // ------------------------------------------------------------------------
    const nodes: PipelineNode[] = [
      // Stage 0: Raw Ingress Sources (Far Left)
      { id: 'ingest_s3', name: 'S3 Data Lake', stage: 0, x: -16, y: 6.5, z: -2, category: 'INGRESS', type: 'OBJECT_STORE', metric: '4.2 GB/s', status: 'STREAMING' },
      { id: 'ingest_kafka', name: 'Kafka Event Bus', stage: 0, x: -16, y: 2.2, z: 1, category: 'INGRESS', type: 'PUBSUB_STREAM', metric: '8.4M msg/s', status: 'STREAMING' },
      { id: 'ingest_sql', name: 'PostgreSQL CDC', stage: 0, x: -16, y: -2.2, z: -1, category: 'INGRESS', type: 'RELATIONAL_CDC', metric: '1.2M row/s', status: 'STREAMING' },
      { id: 'ingest_api', name: 'REST & Webhooks', stage: 0, x: -16, y: -6.5, z: 2, category: 'INGRESS', type: 'HTTP_INGEST', metric: '940k req/s', status: 'STREAMING' },

      // Stage 1: Vector Embeddings & Attention Matrix (Mid Left)
      { id: 'vec_1536', name: '1536d Embedding', stage: 1, x: -8.5, y: 5.2, z: 1.5, category: 'VECTOR', type: 'DENSE_EMBED', metric: '1.5M vec/s', status: 'PROCESSING' },
      { id: 'vec_attn', name: 'Cross-Attention', stage: 1, x: -8.5, y: 1.5, z: -1.5, category: 'VECTOR', type: 'ATTN_HEADS', metric: '32 Heads', status: 'ONLINE' },
      { id: 'vec_idx', name: 'HNSW Vector Index', stage: 1, x: -8.5, y: -2.5, z: 2, category: 'VECTOR', type: 'ANN_INDEX', metric: '99.4% Recall', status: 'ONLINE' },
      { id: 'vec_tensor', name: 'FP16 Tensor Core', stage: 1, x: -8.5, y: -6.2, z: -1, category: 'VECTOR', type: 'GPU_CLUSTER', metric: '1.2 PFLOPS', status: 'ONLINE' },

      // Stage 2: Central AI Reasoning Core (Center Cluster)
      { id: 'core_main', name: 'Neural Engine Core', stage: 2, x: 0, y: 0, z: 0, category: 'AI CORE', type: 'ORCHESTRATOR', metric: '14.8M OPS/S', status: 'ONLINE' },
      { id: 'core_top', name: 'Consensus Evaluator', stage: 2, x: 0, y: 4.8, z: -1.2, category: 'AI CORE', type: 'EVALUATOR', metric: 'Zero Bias', status: 'ONLINE' },
      { id: 'core_bot', name: 'Policy Guardrail', stage: 2, x: 0, y: -4.8, z: 1.2, category: 'AI CORE', type: 'FIREWALL', metric: 'SOC2 Enforced', status: 'ONLINE' },

      // Stage 3: Knowledge Graph & Neural Memory (Mid Right)
      { id: 'kg_entity', name: 'Entity Graph', stage: 3, x: 8.5, y: 5.5, z: -1, category: 'GRAPH', type: 'GNN_EDGES', metric: '842k Edges', status: 'ONLINE' },
      { id: 'kg_context', name: 'Context Window', stage: 3, x: 8.5, y: 1.8, z: 2, category: 'GRAPH', type: 'TOKEN_MEM', metric: '128k Tokens', status: 'ONLINE' },
      { id: 'kg_rag', name: 'RAG Store', stage: 3, x: 8.5, y: -2.2, z: -2, category: 'GRAPH', type: 'RETRIEVAL', metric: 'Sub-ms Fetch', status: 'ONLINE' },
      { id: 'kg_mem', name: 'Persistent Memory', stage: 3, x: 8.5, y: -6.0, z: 1, category: 'GRAPH', type: 'STATE_STORE', metric: 'Persistent', status: 'ONLINE' },

      // Stage 4: Automated Decision & Action Dispatch (Far Right)
      { id: 'act_crm', name: 'CRM Sync Gateway', stage: 4, x: 16, y: 6.5, z: 1, category: 'ACTION', type: 'DISPATCH', metric: 'Auto Trigger', status: 'ONLINE' },
      { id: 'act_erp', name: 'ERP Payload Dispatch', stage: 4, x: 16, y: 2.2, z: -1, category: 'ACTION', type: 'PAYLOAD', metric: 'Verified', status: 'ONLINE' },
      { id: 'act_guard', name: 'Policy Enforcer', stage: 4, x: 16, y: -2.2, z: 2, category: 'ACTION', type: 'POLICY', metric: '100% Pass', status: 'ONLINE' },
      { id: 'act_telemetry', name: 'Audit Stream', stage: 4, x: 16, y: -6.5, z: -2, category: 'ACTION', type: 'AUDIT_LOG', metric: '0.00ms Lag', status: 'ONLINE' },
    ];

    // Pipeline Connections (Stage to Stage Graph)
    const connections: { from: number; to: number; weight: number }[] = [
      // Stage 0 -> Stage 1
      { from: 0, to: 4, weight: 1.0 }, { from: 0, to: 5, weight: 0.8 },
      { from: 1, to: 5, weight: 1.0 }, { from: 1, to: 6, weight: 0.9 },
      { from: 2, to: 6, weight: 1.0 }, { from: 2, to: 7, weight: 0.7 },
      { from: 3, to: 5, weight: 0.8 }, { from: 3, to: 7, weight: 1.0 },

      // Stage 1 -> Stage 2 (AI Core)
      { from: 4, to: 8, weight: 1.0 }, { from: 4, to: 9, weight: 0.8 },
      { from: 5, to: 8, weight: 1.0 },
      { from: 6, to: 8, weight: 0.9 }, { from: 6, to: 10, weight: 1.0 },
      { from: 7, to: 10, weight: 0.8 },

      // Core Internal Connections
      { from: 9, to: 8, weight: 1.0 }, { from: 10, to: 8, weight: 1.0 },

      // Stage 2 -> Stage 3 (Knowledge Graph)
      { from: 8, to: 11, weight: 1.0 }, { from: 8, to: 12, weight: 1.0 },
      { from: 8, to: 13, weight: 0.9 }, { from: 8, to: 14, weight: 0.8 },
      { from: 9, to: 11, weight: 0.7 }, { from: 10, to: 14, weight: 0.8 },

      // Stage 3 -> Stage 4 (Action Dispatch)
      { from: 11, to: 15, weight: 1.0 }, { from: 12, to: 16, weight: 1.0 },
      { from: 13, to: 17, weight: 0.9 }, { from: 14, to: 18, weight: 1.0 },
      { from: 11, to: 16, weight: 0.7 }, { from: 13, to: 18, weight: 0.8 },
    ];

    // ------------------------------------------------------------------------
    // 3. LAYER 1: Background Spatial Coordinate Grid & Floating Particles
    // ------------------------------------------------------------------------
    const gridGroup = new THREE.Group();
    scene.add(gridGroup);

    // Deep Spatial Technical Grid
    const gridHelper = new THREE.GridHelper(60, 30, 0x1a2942, 0x0c1322);
    gridHelper.position.y = -10;
    (gridHelper.material as THREE.Material).opacity = 0.28;
    (gridHelper.material as THREE.Material).transparent = true;
    gridGroup.add(gridHelper);

    // Top subtle ceiling grid
    const topGridHelper = new THREE.GridHelper(60, 30, 0x1a2942, 0x080e1a);
    topGridHelper.position.y = 12;
    (topGridHelper.material as THREE.Material).opacity = 0.15;
    (topGridHelper.material as THREE.Material).transparent = true;
    gridGroup.add(topGridHelper);

    // Drifting Matrix Nodes / Dust Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 65;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 36;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 28 - 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      color: 0x4deeff,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const bgParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(bgParticles);

    // ------------------------------------------------------------------------
    // 4. LAYER 2: Neural Nodes & Connected Edges
    // ------------------------------------------------------------------------
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // Create High-Precision Canvas Textures for Glowing Nodes
    const createGlowTexture = (coreColor: string, outerColor: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.2, coreColor);
        grad.addColorStop(0.6, outerColor);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const cyanGlowTexture = createGlowTexture('#4DEEFF', 'rgba(77,238,255,0.25)');
    const blueGlowTexture = createGlowTexture('#4F8CFF', 'rgba(79,140,255,0.25)');
    const emeraldGlowTexture = createGlowTexture('#5BFFB2', 'rgba(91,255,178,0.25)');

    const nodeMeshes: THREE.Mesh[] = [];
    const nodeGlowSprites: THREE.Sprite[] = [];

    nodes.forEach((node) => {
      const isCore = node.stage === 2;
      const isCoreMain = node.id === 'core_main';

      // Sphere Geometry
      const radius = isCoreMain ? 1.5 : isCore ? 0.85 : 0.42;
      const sphereGeo = new THREE.SphereGeometry(radius, 24, 24);

      let nodeColor = 0x4f8cff;
      if (isCore) nodeColor = 0x4deeff;
      if (node.stage === 4) nodeColor = 0x5bffb2;

      const sphereMat = new THREE.MeshBasicMaterial({
        color: nodeColor,
        wireframe: showWireframe && isCore,
        transparent: true,
        opacity: 0.95,
      });

      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(node.x, node.y, node.z);
      mesh.userData = { nodeData: node };
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);

      // Node Outer Ring Collar
      const ringCollarGeo = new THREE.RingGeometry(radius * 1.3, radius * 1.45, 24);
      const ringCollarMat = new THREE.MeshBasicMaterial({
        color: nodeColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const ringCollar = new THREE.Mesh(ringCollarGeo, ringCollarMat);
      mesh.add(ringCollar);

      // Node Sprite Glow
      let glowMap = blueGlowTexture;
      if (isCore) glowMap = cyanGlowTexture;
      if (node.stage === 4) glowMap = emeraldGlowTexture;

      const spriteMat = new THREE.SpriteMaterial({
        map: glowMap,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: isCoreMain ? 0.95 : 0.65,
      });
      const sprite = new THREE.Sprite(spriteMat);
      const scale = isCoreMain ? 7.5 : isCore ? 4.2 : 2.5;
      sprite.scale.set(scale, scale, 1);
      mesh.add(sprite);
      nodeGlowSprites.push(sprite);
    });

    // Central AI Engine Rotating Rings
    const coreHub = new THREE.Group();
    coreHub.position.set(0, 0, 0);
    scene.add(coreHub);

    // Inner Torus Ring
    const innerRingGeo = new THREE.TorusGeometry(2.8, 0.035, 16, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x4deeff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    coreHub.add(innerRing);

    // Middle Torus Ring
    const midRingGeo = new THREE.TorusGeometry(3.9, 0.025, 16, 64);
    const midRingMat = new THREE.MeshBasicMaterial({
      color: 0x4f8cff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    midRing.rotation.x = Math.PI / 3;
    coreHub.add(midRing);

    // Outer Precision Orbital Ring with Tick Markers
    const outerRingGeo = new THREE.TorusGeometry(5.2, 0.02, 16, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x8b7cff,
      transparent: true,
      opacity: 0.35,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.y = Math.PI / 4;
    coreHub.add(outerRing);

    // Expanding Inference Pulse Wave Rings
    interface WavePulse {
      mesh: THREE.Mesh;
      scale: number;
      opacity: number;
    }
    const wavePulses: WavePulse[] = [];
    const waveGeo = new THREE.RingGeometry(0.5, 0.58, 48);

    for (let i = 0; i < 3; i++) {
      const waveMat = new THREE.MeshBasicMaterial({
        color: 0x4deeff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const waveMesh = new THREE.Mesh(waveGeo, waveMat);
      waveMesh.rotation.x = Math.PI / 2;
      scene.add(waveMesh);
      wavePulses.push({
        mesh: waveMesh,
        scale: 1 + i * 4,
        opacity: 0,
      });
    }

    // Network Edge Connections (Line Segments)
    const edgePositions: number[] = [];
    connections.forEach((conn) => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      edgePositions.push(fromNode.x, fromNode.y, fromNode.z);
      edgePositions.push(toNode.x, toNode.y, toNode.z);
    });

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x4f8cff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edgeLines);

    // ------------------------------------------------------------------------
    // 5. LAYER 3: Flowing Glowing Data Packets & Signal Propagation
    // ------------------------------------------------------------------------
    const packetCount = 60;
    interface DataPacket {
      connIndex: number;
      progress: number;
      speed: number;
      mesh: THREE.Mesh;
      sprite: THREE.Sprite;
    }

    const packets: DataPacket[] = [];
    const packetSphereGeo = new THREE.SphereGeometry(0.16, 12, 12);
    const packetSphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < packetCount; i++) {
      const connIndex = Math.floor(Math.random() * connections.length);
      const mesh = new THREE.Mesh(packetSphereGeo, packetSphereMat);

      const packetSpriteMat = new THREE.SpriteMaterial({
        map: cyanGlowTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.9,
      });
      const sprite = new THREE.Sprite(packetSpriteMat);
      sprite.scale.set(1.4, 1.4, 1);
      mesh.add(sprite);

      scene.add(mesh);

      packets.push({
        connIndex,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
        mesh,
        sprite,
      });
    }

    // ------------------------------------------------------------------------
    // 6. Raycasting & Interaction (Node Hovering)
    // ------------------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
      mouseRef.current = { x, y, rawX: e.clientX, rawY: e.clientY };
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      // Update Raycaster
      mouseVector.set(x, y);
      raycaster.setFromCamera(mouseVector, camera);

      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const hitObj = intersects[0].object as THREE.Mesh;
        const nodeData = hitObj.userData.nodeData as PipelineNode;
        if (nodeData) {
          setHoveredNode(nodeData);
        }
      } else {
        setHoveredNode(null);
      }
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // ------------------------------------------------------------------------
    // 7. Animation Loop
    // ------------------------------------------------------------------------
    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.012 * speedMultiplier;

      // Rotate AI Core Rings
      innerRing.rotation.z += 0.012 * speedMultiplier;
      innerRing.rotation.x += 0.006 * speedMultiplier;
      midRing.rotation.y -= 0.009 * speedMultiplier;
      midRing.rotation.z -= 0.005 * speedMultiplier;
      outerRing.rotation.x += 0.004 * speedMultiplier;

      coreHub.visible = showWireframe;

      // Pulsate Central AI Core Node
      const coreNodeMesh = nodeMeshes[8]; // core_main
      if (coreNodeMesh) {
        const pulse = 1 + Math.sin(clock * 3.5) * 0.07;
        coreNodeMesh.scale.set(pulse, pulse, pulse);
      }

      // Expand Inference Wave Rings
      wavePulses.forEach((pulse, idx) => {
        pulse.scale += 0.08 * speedMultiplier;
        pulse.opacity = Math.max(0, 0.5 - pulse.scale / 18);
        if (pulse.scale > 18) {
          pulse.scale = 0.5;
        }
        pulse.mesh.scale.set(pulse.scale, pulse.scale, 1);
        (pulse.mesh.material as THREE.MeshBasicMaterial).opacity = pulse.opacity;
      });

      // Animate Flowing Data Packets
      packets.forEach((packet) => {
        packet.progress += packet.speed * speedMultiplier;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.connIndex = Math.floor(Math.random() * connections.length);
        }

        const conn = connections[packet.connIndex];
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        // Position interpolation
        packet.mesh.position.x = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
        packet.mesh.position.y = fromNode.y + (toNode.y - fromNode.y) * packet.progress;
        packet.mesh.position.z = fromNode.z + (toNode.z - fromNode.z) * packet.progress;
      });

      // Highlight nodes & stage morphing
      nodeMeshes.forEach((mesh, idx) => {
        const nodeData = nodes[idx];
        const isSelectedStage = nodeData.stage === stageIndex;

        // Gentle float rotation
        mesh.rotation.y += 0.005;

        // Stage-based pulse scaling
        if (isSelectedStage) {
          mesh.scale.setScalar(1.15 + Math.sin(clock * 4 + idx) * 0.05);
        } else {
          mesh.scale.setScalar(1.0);
        }
      });

      // Drift background particles
      bgParticles.rotation.y += 0.00025 * speedMultiplier;
      gridGroup.rotation.y = Math.sin(clock * 0.2) * 0.02;

      // Camera Parallax Depth Effect
      camera.position.x += (mouseRef.current.x * 2.5 - camera.position.x) * 0.035;
      camera.position.y += (mouseRef.current.y * 2.5 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      // Periodically update active telemetry metrics
      if (Math.floor(clock * 10) % 35 === 0) {
        const ops = (14.7 + Math.sin(clock * 1.2) * 0.35).toFixed(1);
        const lat = (1.1 + Math.cos(clock * 1.8) * 0.18).toFixed(1);
        const vec = (1.5 + Math.sin(clock * 2) * 0.04).toFixed(2);
        setActiveMetrics({
          throughput: `${ops}M`,
          latency: `${lat}ms`,
          vectors: `${vec}M/s`,
          accuracy: '99.98%',
          activeNodes: 24,
          eventStream: `${(8.3 + Math.sin(clock) * 0.3).toFixed(1)} GB/s`,
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      gridHelper.dispose();
      topGridHelper.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      packetSphereGeo.dispose();
      packetSphereMat.dispose();
      cyanGlowTexture.dispose();
      blueGlowTexture.dispose();
      emeraldGlowTexture.dispose();
      waveGeo.dispose();
      renderer.dispose();
    };
  }, [stageIndex, speedMultiplier, showWireframe]);

  return (
    <div ref={mountRef} className="w-full h-full min-h-[260px] sm:min-h-[400px] relative overflow-hidden select-none">
      {/* Background Noise & Glass Glow Frame */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#4DEEFF]/5 via-transparent to-black/40 rounded-2xl" />

      {/* Precision Micro Technical HUD Indicators Overlay */}
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between font-mono text-[10px] text-gray-400">
        {/* Top Indicators */}
        <div className="flex flex-wrap items-center justify-between z-10 gap-2">
          <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-white/90 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEFF] animate-ping" />
            <span className="text-[#4DEEFF] font-bold">[REALTIME INGESTION]</span>
            <span className="text-gray-300 font-semibold">{activeMetrics.eventStream}</span>
          </div>

          <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-white/90 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5BFFB2]" />
            <span className="text-[#5BFFB2] font-bold">[DECISION ENGINE]</span>
            <span className="text-gray-300 font-semibold">{activeMetrics.latency} SLA</span>
          </div>
        </div>

        {/* Center Blueprint Stage Guidelines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl flex justify-between items-center px-6 opacity-30 pointer-events-none hidden md:flex">
          <div className="text-[9px] text-[#4F8CFF] font-mono border-l-2 border-[#4F8CFF] pl-2 space-y-0.5">
            <div className="font-bold">VECTOR INDEXING</div>
            <div>1536d CROSS-ATTN</div>
          </div>
          <div className="text-[9px] text-[#5BFFB2] font-mono border-r-2 border-[#5BFFB2] pr-2 text-right space-y-0.5">
            <div className="font-bold">KNOWLEDGE GRAPH</div>
            <div>842K ACTIVE EDGES</div>
          </div>
        </div>

        {/* Floating Tooltip when Hovering over a 3D Node */}
        {hoveredNode && (
          <div
            className="absolute z-30 pointer-events-none bg-black/90 backdrop-blur-md border border-[#4DEEFF]/50 rounded-lg p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.8)] font-mono text-xs space-y-1"
            style={{
              left: Math.min(mousePos.x + 15, 300),
              top: Math.min(mousePos.y + 15, 380),
            }}
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-1 text-[#4DEEFF] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DEEFF] animate-pulse" />
              <span>{hoveredNode.name}</span>
            </div>
            <div className="text-[10px] text-gray-300 space-y-0.5">
              <div>Type: <strong className="text-white">{hoveredNode.type}</strong></div>
              <div>Category: <span className="text-[#8B7CFF]">{hoveredNode.category}</span></div>
              <div>Metric: <strong className="text-[#5BFFB2]">{hoveredNode.metric}</strong></div>
              <div>Status: <span className="text-[#5BFFB2] font-bold">• {hoveredNode.status}</span></div>
            </div>
          </div>
        )}

        {/* Bottom Status Indicators Bar */}
        <div className="flex items-center justify-between z-10 gap-2 flex-wrap">
          <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-2">
            <span className="text-gray-500">SYSTEM:</span>
            <span className="text-white font-bold">XAI_NEURAL_CORE_01</span>
            <span className="text-[#5BFFB2] font-semibold">• ONLINE</span>
          </div>

          <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-3">
            <span>ACCURACY: <strong className="text-white">{activeMetrics.accuracy}</strong></span>
            <span>THROUGHPUT: <strong className="text-[#4DEEFF]">{activeMetrics.throughput} OPS/S</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCanvas3D;

