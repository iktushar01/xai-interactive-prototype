import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SignatureCanvas3DProps {
  progress: number; // 0.0 to 1.0 (scroll or manual slider driven)
  matrixMode: boolean;
}

export const SignatureCanvas3D: React.FC<SignatureCanvas3DProps> = ({
  progress,
  matrixMode,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.02);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Generate Quantum Sphere -> Explode -> Hyper Cube -> Unfolded Planes
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 800 : 1600;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const sphereTarget = new Float32Array(particleCount * 3);
    const explodedTarget = new Float32Array(particleCount * 3);
    const cubeTarget = new Float32Array(particleCount * 3);
    const planesTarget = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x4f8cff);
    const colorCyan = new THREE.Color(0x4deeff);
    const colorSuccess = new THREE.Color(0x5bffb2);
    const colorPurple = new THREE.Color(0x8b7cff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Stage 0: Sphere
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const rSphere = 10;
      sphereTarget[i3] = rSphere * Math.cos(theta) * Math.sin(phi);
      sphereTarget[i3 + 1] = rSphere * Math.sin(theta) * Math.sin(phi);
      sphereTarget[i3 + 2] = rSphere * Math.cos(phi);

      // Stage 1: Exploded Orbit
      const rExplode = 20 + Math.random() * 12;
      explodedTarget[i3] = rExplode * Math.cos(theta * 1.5) * Math.sin(phi);
      explodedTarget[i3 + 1] = rExplode * Math.sin(theta * 1.5) * Math.sin(phi);
      explodedTarget[i3 + 2] = rExplode * Math.cos(phi * 1.5);

      // Stage 2: Quantum Hyper Cube
      const side = Math.cbrt(particleCount);
      const ix = i % side;
      const iy = Math.floor(i / side) % side;
      const iz = Math.floor(i / (side * side));
      const cubeScale = 1.6;
      cubeTarget[i3] = (ix - side / 2) * cubeScale;
      cubeTarget[i3 + 1] = (iy - side / 2) * cubeScale;
      cubeTarget[i3 + 2] = (iz - side / 2) * cubeScale;

      // Stage 3: Unfolded 3D Workspace Planes
      const planeIndex = i % 3;
      const uPlane = (i / particleCount) * 24 - 12;
      const vPlane = ((i % 100) / 100) * 16 - 8;
      if (planeIndex === 0) {
        planesTarget[i3] = uPlane;
        planesTarget[i3 + 1] = vPlane;
        planesTarget[i3 + 2] = -8;
      } else if (planeIndex === 1) {
        planesTarget[i3] = uPlane;
        planesTarget[i3 + 1] = vPlane;
        planesTarget[i3 + 2] = 0;
      } else {
        planesTarget[i3] = uPlane;
        planesTarget[i3 + 1] = vPlane;
        planesTarget[i3 + 2] = 8;
      }

      positions[i3] = sphereTarget[i3];
      positions[i3 + 1] = sphereTarget[i3 + 1];
      positions[i3 + 2] = sphereTarget[i3 + 2];

      const col = i % 4 === 0 ? colorBlue : i % 4 === 1 ? colorCyan : i % 4 === 2 ? colorSuccess : colorPurple;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(77,238,255,0.8)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Inner wireframe lattice
    const latticeGeo = new THREE.BoxGeometry(14, 14, 14);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x4deeff,
      wireframe: true,
      transparent: true,
      opacity: matrixMode ? 0.4 : 0.1,
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    scene.add(latticeMesh);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.02;

      // Interpolate targets depending on scroll progress (0.0 to 1.0)
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const currentPos = posAttr.array as Float32Array;

      let target1 = sphereTarget;
      let target2 = explodedTarget;
      let factor = 0;

      if (progress < 0.33) {
        target1 = sphereTarget;
        target2 = explodedTarget;
        factor = progress / 0.33;
      } else if (progress < 0.66) {
        target1 = explodedTarget;
        target2 = cubeTarget;
        factor = (progress - 0.33) / 0.33;
      } else {
        target1 = cubeTarget;
        target2 = planesTarget;
        factor = (progress - 0.66) / 0.34;
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const wave = Math.sin(time + i * 0.12) * 0.06;
        const waveY = Math.cos(time * 0.8 + i * 0.08) * 0.06;

        const destX = target1[i3] + (target2[i3] - target1[i3]) * factor + wave;
        const destY = target1[i3 + 1] + (target2[i3 + 1] - target1[i3 + 1]) * factor + waveY;
        const destZ = target1[i3 + 2] + (target2[i3 + 2] - target1[i3 + 2]) * factor;

        currentPos[i3] += (destX - currentPos[i3]) * 0.08;
        currentPos[i3 + 1] += (destY - currentPos[i3 + 1]) * 0.08;
        currentPos[i3 + 2] += (destZ - currentPos[i3 + 2]) * 0.08;
      }
      posAttr.needsUpdate = true;

      pointCloud.rotation.y += 0.003;
      pointCloud.rotation.x += 0.001;
      latticeMesh.rotation.y -= 0.005;

      const breathe = 1 + Math.sin(time * 1.5) * 0.04;
      latticeMesh.scale.set(breathe, breathe, breathe);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [progress, matrixMode]);

  return <div ref={mountRef} className="w-full h-full min-h-[300px] sm:min-h-[450px]" />;
};
