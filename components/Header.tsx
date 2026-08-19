"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface HeaderProps {
  onOpenDiagnostic: () => void;
}

export default function Header({ onOpenDiagnostic }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCtaClick = () => {
    trackEvent("hero_cta_click", { source: "header" });
    onOpenDiagnostic();
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Solution", href: "#solution" },
    { label: "Le problème", href: "#probleme" },
    { label: "Les 4 Piliers", href: "#piliers" },
    { label: "Avant / Après", href: "#avant-apres" },
    { label: "Diagnostic", href: "#diagnostic" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-header py-3.5 shadow-subtle"
          : "bg-white/80 backdrop-blur-md py-5 border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-ring rounded-lg p-1"
            aria-label="OPAL.CGP Accueil"
          >
            <div className="w-8 h-8 rounded-lg bg-opal-black flex items-center justify-center text-white font-display font-bold text-sm tracking-wider border border-black/10 group-hover:scale-105 transition-transform">
              O
            </div>
            <div className="flex items-baseline">
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                OPAL
              </span>
              <span className="text-opal-red font-bold text-xl">.</span>
              <span className="font-display font-semibold text-xs tracking-widest uppercase text-muted ml-0.5 bg-surface-100 px-1.5 py-0.5 rounded border border-border/60">
                CGP
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-opal-red after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 bg-opal-red hover:bg-opal-redDark text-white px-5 py-2.5 rounded-lg text-sm font-semibold tracking-tight transition-all duration-200 shadow-sm hover:shadow-glow active:scale-[0.98] focus-ring"
            >
              <span>Évaluer mon cabinet</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleCtaClick}
              className="bg-opal-red text-white text-xs font-semibold px-3 py-2 rounded-md flex items-center gap-1"
            >
              <span>Évaluer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-surface-100 transition-colors focus-ring"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-header border-b border-border px-4 pt-4 pb-6 mt-3 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-opal-red py-2 px-3 rounded-md hover:bg-surface-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-border">
            <button
              onClick={handleCtaClick}
              className="w-full flex items-center justify-center gap-2 bg-opal-red hover:bg-opal-redDark text-white py-3 px-4 rounded-lg text-base font-semibold shadow-sm"
            >
              <span>Évaluer mon cabinet</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-muted mt-2">
              12 questions · 3 minutes · Gratuit
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
