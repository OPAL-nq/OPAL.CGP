"use client";

import { useState } from "react";
import { AlertCircle, Layers, FileText, RefreshCw, Database, Users, Check, ArrowRight } from "lucide-react";

export default function ProblemSection() {
  const [activeStage, setActiveStage] = useState(3); // Default at 100 clients

  const stages = [
    {
      count: "10",
      label: "10 clients",
      subtitle: "Démarrage maîtrisé",
      complexity: "Faible",
      complexityScore: 20,
      description:
        "Tout tient encore dans la tête du dirigeant et sur un tableur. Les dossiers sont simples et le suivi est direct.",
      tags: ["Mémoire du dirigeant", "Tableur basique", "Relances manuelles légères"],
    },
    {
      count: "30",
      label: "30 clients",
      subtitle: "Premières dispersions",
      complexity: "Modérée",
      complexityScore: 45,
      description:
        "Les premiers doublons apparaissent. On cherche des pièces dans les emails, des notes sur des blocs ou des dossiers partagés.",
      tags: ["Pièces dispersées", "Notes éparpillées", "Début des retards de relance"],
    },
    {
      count: "50",
      label: "50 clients",
      subtitle: "Frictions quotidiennes",
      complexity: "Forte",
      complexityScore: 68,
      description:
        "L'équipe s'agrandit. Chaque collaborateur adopte sa propre méthode. Le dirigeant doit valider et réexpliquer sans cesse.",
      tags: ["Processus hétérogènes", "Allers-retours constants", "Charge mentale élevée"],
    },
    {
      count: "100",
      label: "100 clients",
      subtitle: "Le dirigeant devient le goulot",
      complexity: "Critique",
      complexityScore: 88,
      description:
        "Le volume de dossiers et de relances sature les journées. Le dirigeant passe plus de temps en coordination et administratif qu'en conseil à forte valeur ajoutée.",
      tags: ["Coordination épuisante", "Suivi administratif lourd", "Plafond de capacité atteint"],
    },
    {
      count: "300+",
      label: "300+ clients",
      subtitle: "Saturation opérationnelle",
      complexity: "Rupture",
      complexityScore: 100,
      description:
        "Sans système opérationnel dédié, chaque nouvelle opportunité crée de la tension, des délais allongés et un risque pour la qualité de service.",
      tags: ["Rupture de charge", "Risque d'oubli critique", "Dépendance vitale au dirigeant"],
    },
  ];

  return (
    <section id="probleme" className="py-20 md:py-32 bg-surface-100 border-y border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-opal-red bg-opal-redLight px-3 py-1 rounded-full border border-opal-redBorder">
            Le constat opérationnel
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground text-balance">
            Le problème n&apos;est pas de trouver davantage de clients.
          </h2>
          <p className="text-lg sm:text-xl text-muted leading-relaxed text-balance">
            Le problème commence lorsque chaque nouveau client{" "}
            <span className="text-foreground font-semibold underline decoration-opal-red/40 decoration-2">
              augmente également la complexité du cabinet.
            </span>
          </p>
        </div>

        {/* Timeline Progression Controls */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Sélectionnez une étape de volume pour visualiser l&apos;escalade :
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3 p-1.5 bg-white rounded-2xl border border-border shadow-subtle">
            {stages.map((stage, idx) => (
              <button
                key={stage.count}
                onClick={() => setActiveStage(idx)}
                className={`py-3 px-2 sm:px-4 rounded-xl text-center transition-all duration-200 focus-ring ${
                  activeStage === idx
                    ? "bg-opal-black text-white shadow-md scale-[1.02]"
                    : "hover:bg-surface-50 text-foreground"
                }`}
              >
                <div className="text-sm sm:text-base font-display font-bold">
                  {stage.count}
                </div>
                <div
                  className={`text-[10px] sm:text-xs font-medium truncate ${
                    activeStage === idx ? "text-gray-300" : "text-muted"
                  }`}
                >
                  clients
                </div>
              </button>
            ))}
          </div>

          {/* Active Stage Card */}
          <div className="mt-6 bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-card relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-surface-100 text-foreground border border-border">
                    Palier {stages[activeStage].label}
                  </span>
                  <span className="text-xs font-semibold text-opal-red">
                    Friction : {stages[activeStage].complexity}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mt-2">
                  {stages[activeStage].subtitle}
                </h3>
              </div>

              {/* Progress gauge for complexity */}
              <div className="sm:text-right">
                <div className="text-xs text-muted font-medium">Index de charge</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-28 sm:w-36 h-2.5 bg-surface-100 rounded-full overflow-hidden border border-border/60">
                    <div
                      className="h-full bg-opal-red transition-all duration-500 rounded-full"
                      style={{ width: `${stages[activeStage].complexityScore}%` }}
                    />
                  </div>
                  <span className="font-display font-bold text-xs text-foreground">
                    {stages[activeStage].complexityScore}%
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed">
              {stages[activeStage].description}
            </p>

            {/* Friction Tags */}
            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/60">
              {stages[activeStage].tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-50 border border-border text-foreground"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-opal-red" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* The Core Editorial Escalation Statement */}
        <div className="mt-14 max-w-3xl mx-auto text-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-opal-red/20 shadow-premium relative">
            <div className="w-12 h-12 rounded-2xl bg-opal-redLight flex items-center justify-center mx-auto mb-5 text-opal-red">
              <Layers className="w-6 h-6" />
            </div>
            <blockquote className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground tracking-tight leading-snug">
              &ldquo;À partir d&apos;un certain volume, le dirigeant finit par devenir{" "}
              <span className="text-opal-red underline decoration-opal-red/30">
                le système qui fait tenir le cabinet.
              </span>&rdquo;
            </blockquote>
            <p className="mt-4 text-sm sm:text-base text-muted font-normal">
              Chaque nouveau client devient alors une nouvelle source de charge, au détriment du conseil et de la sérénité.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
