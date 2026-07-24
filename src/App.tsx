/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';
import { CustomCursor } from './components/layout/CustomCursor';
import { BootSequence } from './components/layout/BootSequence';
import { HeroSection } from './components/hero/HeroSection';
import { IntelligenceFlow } from './components/flow/IntelligenceFlow';
import { DashboardPreview } from './components/dashboard/DashboardPreview';
import { SignatureInteraction } from './components/signature/SignatureInteraction';
import { AnimatedText } from './components/shared/AnimatedText';
import { Button } from './components/shared/Button';
import { Badge } from './components/shared/Badge';
import RippleGrid from './components/shared/RippleGrid';
import { ArrowRight, Terminal, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'flow', 'dashboard', 'signature'];
      const scrollPos = window.scrollY + 300;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] selection:bg-[#4F8CFF]/30 font-sans antialiased relative overflow-x-hidden transition-colors duration-300">
      {/* OS Boot Sequence */}
      {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}

      {/* Decorative Grain Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.025] contrast-125 brightness-125 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Floating Header Navbar */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: Intelligence Flow */}
        <IntelligenceFlow />

        {/* Section 3: Dashboard Preview (Enterprise OS) */}
        <DashboardPreview
          initialPresetId={selectedPresetId}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Section 4: Signature Interaction (Hyper-Dimensional Core) */}
        <SignatureInteraction />

        {/* Section 5: Final CTA */}
        <section className="py-20 sm:py-28 bg-[var(--bg-surface)] relative border-t border-[var(--border-subtle)] overflow-hidden transition-colors duration-300">
          {/* RippleGrid Background */}
          <RippleGrid
            enableRainbow={false}
            gridColor="#4DEEFF"
            rippleIntensity={0.06}
            gridSize={12}
            gridThickness={12}
            fadeDistance={1.8}
            vignetteStrength={1.8}
            glowIntensity={0.15}
            mouseInteraction={true}
            mouseInteractionRadius={1.2}
            opacity={0.35}
          />

          {/* Animated Background Grid & Beams */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[800px] h-[180px] sm:h-[300px] bg-gradient-to-r from-[#4F8CFF]/10 via-[#4DEEFF]/10 to-[#8B7CFF]/10 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
            <Badge variant="cyan" dot>DEPLOY XAI WORKSPACE</Badge>

            <div className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              <AnimatedText text="Ready to turn data into" as="h2" />
              <br />
              <span className="bg-gradient-to-r from-[#4F8CFF] via-[#4DEEFF] to-[#5BFFB2] bg-clip-text text-transparent">
                intelligent decisions?
              </span>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Join enterprise engineering teams deploying XAI to process petabytes of unstructured knowledge into automated operational decisions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
              <Button
                size="lg"
                variant="primary"
                magnetic
                glow
                onClick={() => scrollToSection('dashboard')}
                icon={<ArrowRight size={18} />}
              >
                Start Exploring
              </Button>

              <Button
                size="lg"
                variant="glass"
                magnetic
                onClick={() => setIsCommandPaletteOpen(true)}
                icon={<BookOpen size={16} className="text-[#4DEEFF]" />}
              >
                View Command Palette
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Enterprise Footer */}
      <Footer />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectPreset={handleSelectPreset}
      />
    </div>
  );
}

