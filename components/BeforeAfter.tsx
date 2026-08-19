"use client";

import { useState } from "react";
import { XCircle, CheckCircle2, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

export default function BeforeAfter() {
  const [view, setView] = useState<"comparison" | "avant" | "apres">("comparison");

  const items = [
    {
      domain: "Centralisation des données",
      before: "Informations dispersées entre emails, disques réseau, blocs-notes et tableurs.",
      after: "Dossier opérationnel centralisé accessible en 1 clic pour toute l'équipe.",
    },
    {
      domain: "Exécution des processus",
      before: "Méthodes hétérogènes dépendant des habitudes individuelles et de la mémoire de chacun.",
      after: "Processus standardisés, visibles et reproductibles sans réexplications continues.",
    },
    {
      domain: "Suivi des dossiers & pièces",
      before: "Relances manuelles chronophages, incertitude sur l'état d'avancement des pièces.",
      after: "Suivi structuré des statuts, détection immédiate des blocages et relances cadrées.",
    },
    {
      domain: "Visibilité & Pilotage",
      before: "Manque de visibilité d'ensemble : le dirigeant doit intervenir sur chaque cas particulier.",
      after: "Vision globale limpide : priorités claires et intervention ciblée uniquement sur la valeur.",
    },
    {
      domain: "Impact de la croissance",
      before: "Chaque nouveau client alourdit la charge de travail et rapproche le cabinet du burn-out.",
      after: "Le cabinet absorbe 2× plus de clients avec une charge opérationnelle maîtrisée.",
    },
  ];

  return (
    <section id="avant-apres" className="py-24 md:py-32 bg-white border-b border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-muted bg-surface-100 px-3.5 py-1.5 rounded-full border border-border">
            Transformation Opérationnelle
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground text-balance">
            Ce que change concrètement une vraie structure
          </h2>
          <p className="text-lg text-muted leading-relaxed text-balance">
            Pas de promesses magiques de &ldquo;tout automatique&rdquo; — simplement la fin du chaos et une capacité démultipliée.
          </p>
        </div>

        {/* View Switcher on Mobile/Tablet */}
        <div className="mt-12 flex justify-center lg:hidden">
          <div className="inline-flex p-1 bg-surface-100 rounded-xl border border-border">
            <button
              onClick={() => setView("comparison")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                view === "comparison" ? "bg-white text-foreground shadow-sm" : "text-muted"
              }`}
            >
              Vue comparative
            </button>
            <button
              onClick={() => setView("avant")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                view === "avant" ? "bg-white text-amber-700 shadow-sm" : "text-muted"
              }`}
            >
              Sans OPAL
            </button>
            <button
              onClick={() => setView("apres")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                view === "apres" ? "bg-white text-opal-red shadow-sm" : "text-muted"
              }`}
            >
              Avec OPAL
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table / Cards */}
        <div className="mt-10 lg:mt-16 space-y-4">
          {/* Desktop Headers */}
          <div className="hidden lg:grid grid-cols-12 gap-6 px-6 py-3 font-display font-bold text-xs uppercase tracking-wider text-muted border-b border-border">
            <div className="col-span-3">Dimension du cabinet</div>
            <div className="col-span-4 text-amber-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              AVANT OPAL (Friction & Surcharge)
            </div>
            <div className="col-span-5 text-opal-red flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-opal-red" />
              AVEC OPAL.CGP (Capacité & Maîtrise)
            </div>
          </div>

          {/* Rows */}
          {items.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 p-5 sm:p-6 rounded-2xl bg-surface-50 border border-border/80 hover:bg-white hover:shadow-card hover:border-border transition-all duration-200"
            >
              {/* Domain */}
              <div className="lg:col-span-3 flex items-center">
                <span className="font-display font-bold text-sm text-foreground">
                  {item.domain}
                </span>
              </div>

              {/* Before */}
              {(view === "comparison" || view === "avant") && (
                <div className="lg:col-span-4 flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-red-100 lg:bg-transparent lg:border-none lg:p-0">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {item.before}
                  </p>
                </div>
              )}

              {/* After */}
              {(view === "comparison" || view === "apres") && (
                <div className="lg:col-span-5 flex items-start gap-3 p-3.5 rounded-xl bg-opal-redLight/40 border border-opal-red/20 lg:bg-transparent lg:border-none lg:p-0">
                  <CheckCircle2 className="w-4 h-4 text-opal-red flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                    {item.after}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Synthesis bottom card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-surface-100 border border-border text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-opal-red uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Le Principe Fondateur</span>
          </div>
          <p className="font-display font-bold text-lg sm:text-xl text-foreground">
            Moins de friction opérationnelle = Plus de temps pour le conseil et les clients.
          </p>
        </div>
      </div>
    </section>
  );
}
