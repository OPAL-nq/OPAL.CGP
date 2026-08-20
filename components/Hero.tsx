"use client";

import { ArrowRight, Clock, ShieldCheck, Zap, ChevronDown, Sparkles } from "lucide-react";
import HeroEngineVisual from "./HeroEngineVisual";
import { trackEvent } from "@/lib/analytics";

interface HeroProps {
  onOpenDiagnostic: () => void;
}

export default function Hero({ onOpenDiagnostic }: HeroProps) {
  const handleCtaClick = () => {
    trackEvent("hero_cta_click", { source: "hero_primary" });
    onOpenDiagnostic();
  };

  const handleScrollToProblem = () => {
    trackEvent("hero_scroll_click");
    const el = document.getElementById("probleme");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="solution" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-radial-subtle">
      {/* Ambient background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-b from-opal-redLight/50 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-100 border border-border text-xs font-semibold uppercase tracking-widest text-foreground shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-opal-red animate-pulse" />
            <span>OPAL — OPERATING SYSTEMS FOR BUSINESS</span>
          </div>

          {/* Main Hero Headline with Graphic Tension */}
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[66px] tracking-tight text-foreground leading-[1.08] text-balance">
            Votre entreprise peut-elle prendre{" "}
            <span className="relative inline-block text-opal-red px-2 py-0.5 rounded-xl bg-opal-redLight/70 border border-opal-redBorder shadow-sm">
              2× PLUS DE CLIENTS
            </span>{" "}
            sans vous donner{" "}
            <span className="relative inline-block text-foreground underline decoration-opal-red decoration-[3px] underline-offset-8">
              2× PLUS DE TRAVAIL ?
            </span>
          </h1>

          {/* Subtitle */}
          <div className="space-y-3 max-w-3xl mx-auto text-balance">
            <p className="text-lg sm:text-xl text-muted font-normal leading-relaxed">
              La plupart des entreprises ne manquent pas de clients. Elles finissent par{" "}
              <strong className="text-foreground font-semibold">
                manquer de capacité opérationnelle
              </strong>{" "}
              pour les servir correctement.
            </p>
            <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed bg-surface-50/90 p-4 rounded-2xl border border-border/80 shadow-subtle">
              <strong>OPAL</strong> conçoit des logiciels métiers sur mesure qui structurent votre fonctionnement, centralisent vos opérations et augmentent votre capacité —{" "}
              <span className="text-opal-red font-semibold">
                pour que votre croissance ne se transforme pas en surcharge.
              </span>
            </p>
          </div>

          {/* Primary CTA & Secondary Scroll Button */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleCtaClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-opal-red hover:bg-opal-redDark text-white px-8 py-4.5 rounded-xl text-base sm:text-lg font-bold tracking-tight shadow-card hover:shadow-glow transition-all duration-200 active:scale-[0.98] group focus-ring"
            >
              <span>Faire mon diagnostic</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleScrollToProblem}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-50 hover:bg-surface-100 text-foreground px-6 py-4.5 rounded-xl text-sm sm:text-base font-semibold border border-border transition-colors focus-ring"
            >
              <span>Voir comment OPAL fonctionne</span>
              <ChevronDown className="w-4 h-4 text-muted" />
            </button>
          </div>

          {/* Microcopy */}
          <div className="flex items-center justify-center gap-6 text-xs text-muted font-medium pt-1">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-opal-red" />
              12 questions
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-opal-red" />
              3 minutes
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-opal-red" />
              Gratuit & sans engagement
            </span>
          </div>
        </div>

        {/* Visualizer Container */}
        <div className="mt-12 sm:mt-16">
          <HeroEngineVisual />
        </div>
      </div>
    </section>
  );
}
