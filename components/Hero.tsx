"use client";

import { ArrowRight, Clock, ShieldCheck, Zap } from "lucide-react";
import HeroCapacityVisual from "./HeroCapacityVisual";
import { trackEvent } from "@/lib/analytics";

interface HeroProps {
  onOpenDiagnostic: () => void;
}

export default function Hero({ onOpenDiagnostic }: HeroProps) {
  const handleCtaClick = () => {
    trackEvent("hero_cta_click", { source: "hero_primary" });
    onOpenDiagnostic();
  };

  return (
    <section id="solution" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-radial-subtle">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-opal-redLight/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100 border border-border text-xs font-semibold uppercase tracking-widest text-foreground">
            <span className="w-2 h-2 rounded-full bg-opal-red animate-pulse" />
            <span>OPAL.CGP — L&apos;OS Opérationnel des Cabinets de Gestion de Patrimoine</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[64px] tracking-tighter text-foreground leading-[1.08] text-balance">
            VOTRE CABINET PEUT-IL PRENDRE{" "}
            <span className="relative inline-block text-opal-red underline decoration-opal-red/30 underline-offset-8">
              2× PLUS DE CLIENTS
            </span>{" "}
            SANS VOUS DONNER{" "}
            <span className="relative inline-block text-opal-redDark underline decoration-opal-redDark/30 underline-offset-8">
              2× PLUS DE TRAVAIL ?
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted font-normal leading-relaxed max-w-3xl mx-auto text-balance">
            Développer un cabinet de gestion de patrimoine ne devrait pas signifier
            multiplier les dossiers, les relances, les tâches administratives et les heures de
            travail au même rythme que votre clientèle.
          </p>

          {/* Value Proposition Statement */}
          <p className="text-sm sm:text-base text-foreground font-medium max-w-2xl mx-auto leading-relaxed bg-surface-50/80 p-4 rounded-xl border border-border/80">
            <strong>OPAL.CGP</strong> centralise, structure et simplifie l&apos;organisation
            opérationnelle de votre cabinet pour augmenter sa capacité —{" "}
            <span className="text-opal-red font-semibold">
              sans transformer sa croissance en surcharge.
            </span>
          </p>

          {/* Primary CTA & Microcopy */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleCtaClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-opal-red hover:bg-opal-redDark text-white px-8 py-4 rounded-xl text-base sm:text-lg font-bold tracking-tight shadow-card hover:shadow-glow transition-all duration-200 active:scale-[0.98] group focus-ring"
            >
              <span>ÉVALUER LA CAPACITÉ DE MON CABINET</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

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
              Diagnostic personnalisé & confidentiel
            </span>
          </div>
        </div>

        {/* Visualizer container */}
        <div className="mt-12 sm:mt-16">
          <HeroCapacityVisual />
        </div>
      </div>
    </section>
  );
}
