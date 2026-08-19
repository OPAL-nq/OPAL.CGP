"use client";

import { ArrowRight, CheckCircle2, Clock, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface DiagnosticSectionProps {
  onOpenDiagnostic: () => void;
}

export default function DiagnosticSection({ onOpenDiagnostic }: DiagnosticSectionProps) {
  const handleStart = () => {
    trackEvent("hero_cta_click", { source: "diagnostic_section" });
    onOpenDiagnostic();
  };

  const evaluatedAreas = [
    { title: "Capacité commerciale", desc: "Absorption des prospects & temps consacré au conseil" },
    { title: "Organisation", desc: "Centralisation des données & standardisation des processus" },
    { title: "Efficacité opérationnelle", desc: "Suivi des pièces, relances & visibilité temps réel" },
    { title: "Capacité de croissance", desc: "Délégation, intégration d'équipe & tenue de charge" },
  ];

  return (
    <section id="diagnostic" className="py-24 md:py-36 bg-surface-100 border-b border-border relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-opal-redLight/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 md:p-16 shadow-premium relative text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-opal-redLight border border-opal-redBorder text-xs font-bold uppercase tracking-widest text-opal-red mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC OPAL CAPACITY SCORE</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground text-balance max-w-3xl mx-auto leading-tight">
            Votre cabinet est-il réellement capable de doubler sa clientèle ?
          </h2>

          {/* Subheadline */}
          <p className="mt-5 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed text-balance">
            Répondez à 12 questions sur votre organisation actuelle et obtenez votre{" "}
            <strong className="text-foreground font-semibold">
              OPAL Capacity Score
            </strong>{" "}
            avec l&apos;identification de votre principal goulot d&apos;étranglement.
          </p>

          {/* Feature Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-foreground">
            <div className="flex items-center gap-2 bg-surface-50 px-4 py-2 rounded-xl border border-border">
              <BarChart3 className="w-4 h-4 text-opal-red" />
              <span>12 questions ciblées</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-50 px-4 py-2 rounded-xl border border-border">
              <Clock className="w-4 h-4 text-opal-red" />
              <span>3 minutes chrono</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-50 px-4 py-2 rounded-xl border border-border">
              <ShieldCheck className="w-4 h-4 text-opal-red" />
              <span>Diagnostic 100% personnalisé</span>
            </div>
          </div>

          {/* 4 Evaluated Dimensions preview */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {evaluatedAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface-50 border border-border/70 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-opal-red">
                    Dimension 0{idx + 1}
                  </span>
                  <h4 className="font-display font-bold text-sm text-foreground mt-1">
                    {area.title}
                  </h4>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="mt-12">
            <button
              onClick={handleStart}
              className="inline-flex items-center justify-center gap-3 bg-opal-red hover:bg-opal-redDark text-white px-9 py-4.5 rounded-xl text-base sm:text-lg font-bold tracking-tight shadow-card hover:shadow-glow transition-all duration-200 active:scale-[0.98] group focus-ring"
            >
              <span>FAIRE MON DIAGNOSTIC</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-3 text-xs text-muted">
              Résultat immédiat · Aucun engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
