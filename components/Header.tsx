"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
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
    trackEvent("header_cta_click");
    onOpenDiagnostic();
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Pourquoi OPAL", href: "#probleme" },
    { label: "Comment ça fonctionne", href: "#comment-ca-marche" },
    { label: "Avant / Après", href: "#avant-apres" },
    { label: "Diagnostic", href: "#diagnostic" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md py-3.5 shadow-subtle border-b border-border/80"
          : "bg-white/60 backdrop-blur-sm py-5 border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-ring rounded-lg p-1"
            aria-label="OPAL Accueil"
          >
            <div className="w-8 h-8 rounded-xl bg-opal-black flex items-center justify-center text-white font-display font-black text-sm tracking-wider shadow-sm group-hover:scale-105 transition-transform">
              O
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-foreground leading-none">
                OPAL
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-muted mt-0.5 hidden sm:block">
                Operating Systems
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
              className="inline-flex items-center gap-2 bg-opal-red hover:bg-opal-redDark text-white px-5 py-2.5 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 shadow-sm hover:shadow-glow active:scale-[0.98] focus-ring"
            >
              <span>Faire mon diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleCtaClick}
              className="bg-opal-red text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-sm"
            >
              <span>Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-foreground hover:bg-surface-100 transition-colors focus-ring"
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
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-border px-4 pt-4 pb-6 mt-3 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-opal-red py-2 px-3 rounded-xl hover:bg-surface-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-border">
            <button
              onClick={handleCtaClick}
              className="w-full flex items-center justify-center gap-2 bg-opal-red hover:bg-opal-redDark text-white py-3.5 px-4 rounded-xl text-base font-bold shadow-sm"
            >
              <span>Faire mon diagnostic</span>
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
