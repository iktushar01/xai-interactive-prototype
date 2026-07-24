import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '../shared/Badge';
import { Button } from '../shared/Button';
import { LiveMetricValue } from '../shared/LiveMetricValue';
import { Command, Cpu, Sparkles, Activity, Layers, Terminal, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  activeSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'System Core', icon: <Cpu size={14} /> },
    { id: 'flow', label: 'Intelligence Flow', icon: <Sparkles size={14} /> },
    { id: 'dashboard', label: 'Workspace OS', icon: <Layers size={14} /> },
    { id: 'signature', label: 'Quantum Core', icon: <Activity size={14} /> },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#050608]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] py-3 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] rounded-lg p-1 shrink-0"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && scrollToSection('hero')}
          aria-label="XAI Workspace - Return to top"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F8CFF] to-[#4DEEFF] p-0.5 flex items-center justify-center shadow-[0_0_16px_rgba(79,140,255,0.4)] group-hover:shadow-[0_0_24px_rgba(79,140,255,0.6)] transition-all shrink-0">
            <div className="w-full h-full bg-[#050608] rounded-[6px] flex items-center justify-center font-mono font-bold text-white text-xs tracking-tighter">
              XAI
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap">
              XAI Workspace
              <span className="hidden sm:inline-block text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-white/10 text-[#4DEEFF]">v4.2</span>
            </span>
            <span className="hidden sm:block text-[10px] font-mono text-[#9BA4B5]">Intelligence Engine</span>
          </div>
        </div>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-[#11151B]/80 backdrop-blur-md p-1 rounded-full border border-[rgba(255,255,255,0.08)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] ${
                  isActive
                    ? 'bg-[#4F8CFF] text-white shadow-[0_0_12px_rgba(79,140,255,0.4)]'
                    : 'text-[#9BA4B5] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#11151B] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] text-[#9BA4B5] text-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF]"
            aria-label="Open Command Palette"
          >
            <Command size={13} className="text-[#4F8CFF]" />
            <span className="hidden lg:inline">Search or trigger</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded text-[#D0D7DE]">
              ⌘K
            </kbd>
          </button>

          {/* System Status Indicator */}
          <Badge variant="success" dot className="hidden xl:inline-flex">
            <LiveMetricValue baseValue="14.8M" /> OPS/S
          </Badge>

          {/* CTA Button */}
          <div className="hidden xs:block">
            <Button
              size="sm"
              variant="primary"
              magnetic
              glow
              onClick={() => scrollToSection('dashboard')}
              icon={<Terminal size={14} />}
            >
              <span className="hidden sm:inline">Launch OS</span>
              <span className="sm:hidden">OS</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#11151B] border border-[rgba(255,255,255,0.1)] text-[#9BA4B5] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#0B0F14]/98 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.1)] overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                        isActive
                          ? 'bg-[#4F8CFF] text-white shadow-[0_0_16px_rgba(79,140,255,0.4)]'
                          : 'bg-[#11151B] text-[#9BA4B5] hover:text-white hover:bg-white/5 border border-[rgba(255,255,255,0.05)]'
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="pt-2 grid grid-cols-2 gap-2 border-t border-[rgba(255,255,255,0.08)]">
                <Button
                  size="md"
                  variant="primary"
                  glow
                  onClick={() => scrollToSection('dashboard')}
                  icon={<Terminal size={14} />}
                  className="w-full justify-center"
                >
                  Launch OS
                </Button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#11151B] border border-[rgba(255,255,255,0.08)] text-xs text-[#9BA4B5] hover:text-white"
                >
                  <Command size={14} className="text-[#4DEEFF]" />
                  <span>Search (⌘K)</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#6B7280] pt-1">
                <span>SYSTEM STATUS</span>
                <span className="text-[#5BFFB2] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5BFFB2] animate-ping" />
                  14.2M OPS/S
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
