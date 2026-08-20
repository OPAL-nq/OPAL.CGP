"use client";

import { FolderKanban, Network, Sliders, TrendingUp, Sparkles, Check, Cpu, Building2 } from "lucide-react";

export default function PositioningSection() {
  const pillars = [
    {
      number: "01",
      title: "STRUCTURER",
      tagline: "Des méthodes claires & reproductibles",
      description:
        "Transformer les processus dispersés en un environnement logiciel structuré où chaque collaborateur sait exactement quoi faire, quand et comment.",
      icon: Network,
      details: [
        "Workflows standardisés adaptés à votre façon réelle de travailler",
        "Autonomie renforcée des équipes sans sollicitation constante",
        "Indépendance opérationnelle vis-à-vis de la mémoire des individus",
      ],
    },
    {
      number: "02",
      title: "CENTRALISER",
      tagline: "L'information opérationnelle unifiée",
      description:
        "Réunir les informations, dossiers, documents, historiques et opérations au même endroit pensé pour votre métier.",
      icon: FolderKanban,
      details: [
        "Vue dossier unique et centralisée accessible en 1 clic",
        "Fin de la dispersion entre 5 outils, emails et tableurs",
        "Historique complet et vision partagée en temps réel",
      ],
    },
    {
      number: "03",
      title: "SIMPLIFIER",
      tagline: "Moins de frictions, plus de fluidité",
      description:
        "Réduire les manipulations inutiles, les ressaisies manuelles et les tâches répétitives qui ralentissent l'exécution.",
      icon: Sliders,
      details: [
        "Suivi limpide des statuts et détection des blocages",
        "Relances et collecte de pièces fluides",
        "Suppression des goulots d'étranglement administratifs",
      ],
    },
    {
      number: "04",
      title: "AUGMENTER LA CAPACITÉ",
      tagline: "Absorption de volume sans surcharge",
      description:
        "Permettre à votre entreprise d'absorber davantage d'activité et de clients sans augmenter proportionnellement la charge de travail.",
      icon: TrendingUp,
      details: [
        "Croissance découplée du temps de travail du dirigeant",
        "Intégration d'IA ciblée là où elle apporte une réelle valeur",
        "Capacité d'accueil multipliée avec un service irréprochable",
      ],
    },
  ];

  return (
    <section id="comment-ca-marche" className="py-24 md:py-32 bg-white border-b border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-opal-red bg-opal-redLight px-3.5 py-1.5 rounded-full border border-opal-redBorder">
            Ce qu&apos;OPAL fait concrètement
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground text-balance">
            Nous construisons l&apos;infrastructure opérationnelle derrière votre croissance.
          </h2>
          <p className="text-lg sm:text-xl text-muted leading-relaxed text-balance">
            OPAL conçoit des logiciels métiers autour de votre façon réelle de travailler —{" "}
            <strong className="text-foreground font-semibold">
              et non l&apos;inverse.
            </strong>
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="bg-surface-50 rounded-3xl border border-border p-8 shadow-card hover:bg-white hover:shadow-premium hover:border-opal-red/30 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-border group-hover:bg-opal-redLight group-hover:border-opal-red/20 flex items-center justify-center text-foreground group-hover:text-opal-red transition-colors shadow-subtle">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display font-black text-3xl text-border group-hover:text-opal-red/40 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-opal-red">
                      {pillar.tagline}
                    </div>
                    <h3 className="font-display font-bold text-2xl text-foreground mt-1 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5 pt-6 border-t border-border/70">
                  {pillar.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground font-medium">
                      <span className="w-4 h-4 rounded-full bg-opal-redLight text-opal-red flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Studio DNA Reassurance Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-surface-100 border border-border shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-border flex items-center justify-center text-opal-red flex-shrink-0 shadow-subtle">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-foreground">
                Studio de création de logiciels métiers
              </h4>
              <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed max-w-xl">
                Ni CRM générique, ni agence web, ni usine à gaz. Nous concevons l&apos;environnement logiciel dont vos équipes ont besoin pour travailler avec plus de structure, plus de visibilité et plus de capacité.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white border border-border text-foreground whitespace-nowrap shadow-subtle">
            Approche Métier Sur Mesure
          </span>
        </div>
      </div>
    </section>
  );
}
