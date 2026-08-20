"use client";

import { useState } from "react";
import { AlertCircle, Layers, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ProblemSectionProps {
  onOpenDiagnostic: () => void;
}

export default function ProblemSection({ onOpenDiagnostic }: ProblemSectionProps) {
  const [activeStage, setActiveStage] = useState(1); // Default on Croissance

  const stages = [
    {
      id: 0,
      range: "5 à 20 clients",
      title: "Démarrage maîtrisé",
      subtitle: "Tout est encore simple",
      description:
        "Quelques outils, quelques fichiers et la mémoire du dirigeant suffisent. Le suivi est direct et l'activité reste fluide.",
      status: "Charge gérable",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      frictionLevel: "20%",
    },
    {
      id: 1,
      range: "50 à 100 clients",
      title: "Montée en charge",
      subtitle: "Les premières frictions s'installent",
      description:
        "L'équipe grandit. Les outils et fichiers se multiplient. Les collaborateurs passent de plus en plus de temps à chercher, vérifier et coordonner.",
      status: "Frictions quotidiennes",
      statusColor: "text-amber-700 bg-amber-50 border-amber-200",
      frictionLevel: "65%",
    },
    {
      id: 2,
      range: "200+ clients",
      title: "Saturation opérationnelle",
      subtitle: "Le dirigeant devient le point de passage",
      description:
        "Sans infrastructure logicielle adaptée, chaque nouveau client alourdit la charge. Le dirigeant passe ses journées à débloquer des situations au lieu de conseiller.",
      status: "Saturation critique",
      statusColor: "text-red-700 bg-red-50 border-red-200",
      frictionLevel: "95%",
    },
  ];

  const handleCta = () => {
    trackEvent("problem_section_cta_click");
    onOpenDiagnostic();
  };

  return (
    <section id="probleme" className="py-20 md:py-32 bg-surface-100 border-y border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-opal-red bg-opal-redLight px-3.5 py-1.5 rounded-full border border-opal-redBorder">
            Le Constat Opérationnel
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground text-balance">
            Plus votre entreprise grandit, plus son fonctionnement devient complexe.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed text-balance">
            Le problème n&apos;est pas de trouver des clients. Le problème est que chaque nouveau client{" "}
            <strong className="text-foreground font-semibold">
              augmente également la charge opérationnelle de l&apos;entreprise.
            </strong>
          </p>
        </div>

        {/* 3 Clear Visual Steps */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStage(stage.id);
                  trackEvent("problem_stage_clicked", { stage: stage.range });
                }}
                className={`p-6 sm:p-7 rounded-3xl text-left border transition-all duration-200 flex flex-col justify-between relative overflow-hidden focus-ring ${
                  isActive
                    ? "bg-white border-opal-red shadow-premium scale-[1.02] ring-1 ring-opal-red/30"
                    : "bg-surface-50 border-border hover:bg-white hover:border-border shadow-subtle"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/80">
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-muted">
                      {stage.range}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${stage.statusColor}`}
                    >
                      {stage.status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mt-4">
                    {stage.subtitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Friction Indicator Bar */}
                <div className="mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between text-[11px] font-bold text-muted mb-1.5">
                    <span>Index de friction</span>
                    <span className="text-foreground">{stage.frictionLevel}</span>
                  </div>
                  <div className="w-full h-2 bg-surface-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stage.id === 0
                          ? "bg-emerald-600"
                          : stage.id === 1
                          ? "bg-amber-500"
                          : "bg-opal-red shadow-glow"
                      }`}
                      style={{ width: stage.frictionLevel }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* The Core Editorial Escalation Statement */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-opal-red/20 shadow-premium relative">
            <div className="w-12 h-12 rounded-2xl bg-opal-redLight flex items-center justify-center mx-auto mb-5 text-opal-red shadow-inner">
              <Layers className="w-6 h-6" />
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight leading-snug text-balance">
              À un certain stade, le dirigeant devient lui-même le système.
            </h3>

            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-xl mx-auto text-balance">
              Les informations sont dispersées, les processus dépendent des personnes, et chaque nouveau client ajoute une couche supplémentaire.
            </p>

            <div className="mt-6 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCta}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-opal-red hover:bg-opal-redDark text-white px-7 py-4 rounded-xl font-display font-bold text-sm sm:text-base shadow-sm hover:shadow-glow transition-all active:scale-[0.98] focus-ring"
              >
                <span>Voir où se situe mon principal frein</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
