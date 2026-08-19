import { FolderKanban, Network, Sliders, TrendingUp, Sparkles, Check } from "lucide-react";

export default function PositioningSection() {
  const pillars = [
    {
      number: "01",
      title: "CENTRALISER",
      tagline: "L'information opérationnelle unifiée",
      description:
        "Retrouvez au même endroit les informations et éléments opérationnels dont votre équipe a besoin pour faire avancer les dossiers.",
      icon: FolderKanban,
      details: [
        "Vue dossier unique et historique clair",
        "Fin des recherches dispersées dans 5 outils",
        "Accès immédiat pour tous les collaborateurs",
      ],
    },
    {
      number: "02",
      title: "STRUCTURER",
      tagline: "Des processus clairs & reproductibles",
      description:
        "Transformez vos méthodes de travail en processus clairs, reproductibles et visibles par toute l'équipe.",
      icon: Network,
      details: [
        "Étapes standardisées d'onboarding et de révision",
        "Autonomie renforcée de l'équipe",
        "Le fonctionnement ne repose plus sur la mémoire",
      ],
    },
    {
      number: "03",
      title: "SIMPLIFIER",
      tagline: "Moins de friction, plus de fluidité",
      description:
        "Réduisez les frictions, les allers-retours et les tâches administratives qui ralentissent inutilement le quotidien.",
      icon: Sliders,
      details: [
        "Suivi limpide des pièces manquantes",
        "Visibilité directe sur les dossiers bloqués",
        "Moins d'interruptions quotidiennes",
      ],
    },
    {
      number: "04",
      title: "AUGMENTER",
      tagline: "Capacité décuplée & IA ciblée",
      description:
        "Libérez de la capacité pour accueillir davantage de clients, réaliser davantage de rendez-vous et consacrer davantage de temps au conseil.",
      icon: TrendingUp,
      details: [
        "Temps dirigeant recentré sur le conseil stratégique",
        "Assistance IA là où elle accélère réellement l'exécution",
        "Absorption de la croissance sans surmenage",
      ],
    },
  ];

  return (
    <section id="piliers" className="py-24 md:py-32 bg-surface-100 border-b border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-opal-red bg-opal-redLight px-3.5 py-1.5 rounded-full border border-opal-redBorder">
            L&apos;Approche OPAL
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground text-balance">
            OPAL ne cherche pas à remplacer votre cabinet.
          </h2>
          <p className="text-lg sm:text-xl text-muted leading-relaxed text-balance">
            OPAL lui donne la structure nécessaire pour{" "}
            <strong className="text-foreground font-semibold">
              accueillir davantage de croissance sans perdre le contrôle.
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
                className="bg-white rounded-2xl border border-border p-8 shadow-card hover:shadow-premium hover:border-opal-red/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-100 border border-border group-hover:bg-opal-redLight group-hover:border-opal-red/20 flex items-center justify-center text-foreground group-hover:text-opal-red transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-display font-bold text-3xl text-border group-hover:text-opal-red/40 transition-colors">
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
                  <p className="mt-3 text-base text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-2.5 pt-6 border-t border-border/70">
                  {pillar.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground font-medium">
                      <span className="w-4 h-4 rounded-full bg-opal-redLight text-opal-red flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-border shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-100 border border-border flex items-center justify-center text-opal-red flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">
                L&apos;IA comme amplificateur opérationnel
              </h4>
              <p className="text-xs text-muted mt-0.5">
                Une assistance ciblée pour synthétiser, classer et préparer — jamais pour remplacer le conseil humain du CGP.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-surface-100 border border-border text-foreground whitespace-nowrap">
            Architecture B2B Sobre
          </span>
        </div>
      </div>
    </section>
  );
}
