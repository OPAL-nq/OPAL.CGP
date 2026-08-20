"use client";

import { useState } from "react";
import { XCircle, CheckCircle2, Sparkles, SlidersHorizontal } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isHovered, setIsHovered] = useState(false);
  const [mobileTab, setMobileTab] = useState<"both" | "before" | "after">("both");

  const comparisonItems = [
    {
      title: "Gestion de l'information",
      before: "Informations dispersées entre emails, disques partagés, blocs-notes et tableurs.",
      after: "Environnement métier unique où chaque donnée et pièce est centralisée en 1 clic.",
    },
    {
      title: "Exécution des processus",
      before: "Méthodes hétérogènes dépendant des habitudes individuelles et de la mémoire de chacun.",
      after: "Processus standardisés, visibles et reproductibles sans devoir constamment réexpliquer.",
    },
    {
      title: "Suivi des dossiers & relances",
      before: "Suivi manuel chronophage, incertitude sur l'état d'avancement des pièces en attente.",
      after: "Statuts transparents, détection immédiate des blocages et relances automatisées.",
    },
    {
      title: "Visibilité & Pilotage",
      before: "Visibilité partielle : le dirigeant doit intervenir sur chaque cas particulier pour arbitrer.",
      after: "Vision globale en temps réel : priorités claires et intervention ciblée uniquement sur la valeur.",
    },
    {
      title: "Rôle du Dirigeant",
      before: "Le dirigeant est sollicité en permanence et devient le goulot d'étranglement de l'entreprise.",
      after: "Équipes autonomes : le dirigeant se recentre sur la stratégie, le conseil et le commerce.",
    },
    {
      title: "Impact de la Croissance",
      before: "Chaque nouveau client alourdit la charge opérationnelle et rapproche l'équipe de la saturation.",
      after: "L'organisation absorbe 2× plus d'activité sans faire exploser sa charge de travail.",
    },
  ];

  return (
    <section id="avant-apres" className="py-24 md:py-32 bg-surface-100 border-b border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-muted bg-white px-3.5 py-1.5 rounded-full border border-border">
            Comparatif Opérationnel
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground text-balance">
            Ce que change concrètement une véritable infrastructure logicielle
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed text-balance">
            Pas de promesses magiques de &ldquo;tout automatique&rdquo; — simplement la fin du chaos et une capacité opérationnelle démultipliée.
          </p>
        </div>

        {/* Mobile View Switcher */}
        <div className="mt-10 flex justify-center lg:hidden">
          <div className="inline-flex p-1 bg-white rounded-2xl border border-border shadow-subtle">
            <button
              onClick={() => setMobileTab("both")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                mobileTab === "both" ? "bg-surface-100 text-foreground shadow-sm" : "text-muted"
              }`}
            >
              Vue complète
            </button>
            <button
              onClick={() => setMobileTab("before")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                mobileTab === "before" ? "bg-red-50 text-red-700 shadow-sm" : "text-muted"
              }`}
            >
              Avant OPAL
            </button>
            <button
              onClick={() => setMobileTab("after")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                mobileTab === "after" ? "bg-opal-redLight text-opal-red shadow-sm" : "text-muted"
              }`}
            >
              Avec OPAL
            </button>
          </div>
        </div>

        {/* Desktop Header Row */}
        <div className="hidden lg:grid grid-cols-12 gap-6 px-6 py-4 mt-12 font-display font-bold text-xs uppercase tracking-wider text-muted border-b border-border bg-white rounded-2xl mb-4 shadow-subtle">
          <div className="col-span-3">Dimension Métier</div>
          <div className="col-span-4 text-red-700 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span>AVANT OPAL (Friction & Surcharge)</span>
          </div>
          <div className="col-span-5 text-opal-red flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-opal-red" />
            <span>AVEC OPAL (Structure & Capacité)</span>
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="space-y-3 sm:space-y-4">
          {comparisonItems.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 p-5 sm:p-6 rounded-3xl bg-white border border-border shadow-subtle hover:shadow-card hover:border-opal-red/20 transition-all duration-200"
            >
              {/* Title */}
              <div className="lg:col-span-3 flex items-center">
                <span className="font-display font-bold text-sm sm:text-base text-foreground">
                  {item.title}
                </span>
              </div>

              {/* Before */}
              {(mobileTab === "both" || mobileTab === "before") && (
                <div className="lg:col-span-4 flex items-start gap-3 p-4 rounded-2xl bg-red-50/40 border border-red-100 lg:bg-transparent lg:border-none lg:p-0">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {item.before}
                  </p>
                </div>
              )}

              {/* After */}
              {(mobileTab === "both" || mobileTab === "after") && (
                <div className="lg:col-span-5 flex items-start gap-3 p-4 rounded-2xl bg-opal-redLight/40 border border-opal-red/20 lg:bg-transparent lg:border-none lg:p-0">
                  <CheckCircle2 className="w-4 h-4 text-opal-red flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                    {item.after}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Synthesis Bottom Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-border text-center max-w-2xl mx-auto shadow-card">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-opal-red uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>La Règle Fondamentale</span>
          </div>
          <p className="font-display font-bold text-lg sm:text-xl text-foreground">
            Moins de friction opérationnelle = Plus de capacité pour vos clients et votre croissance.
          </p>
        </div>
      </div>
    </section>
  );
}
