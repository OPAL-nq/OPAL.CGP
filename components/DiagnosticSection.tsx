"use client";

import { ArrowRight, BarChart3, Clock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface DiagnosticSectionProps {
  onOpenDiagnostic: () => void;
}

export default function DiagnosticSection({ onOpenDiagnostic }: DiagnosticSectionProps) {
  const handleStart = () => {
    trackEvent("diagnostic_section_cta_click");
    onOpenDiagnostic();
  };

  const dimensions = [
    {
      title: "Structure",
      desc: "Standardisation des processus & indépendance vis-à-vis des personnes",
    },
    {
      title: "Efficacité",
      desc: "Allègement administratif & élimination de la dispersion des outils",
    },
    {
      title: "Capacité",
      desc: "Aptitude à accueillir 2× plus de clients sans surcharge du dirigeant",
    },
    {
      title: "Visibilité",
      desc: "Accès instantané aux données clés & pilotage en temps réel",
    },
  ];

  return (
    <section id="diagnostic" className="py-24 md:py-36 bg-opal-black text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-opal-red/20 blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-opal-redDark/30 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 shadow-premium backdrop-blur-md text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-opal-red/20 border border-opal-red/40 text-xs font-bold uppercase tracking-widest text-white mb-6">
            <Sparkles className="w-3.5 h-3.5 text-opal-red" />
            <span>DIAGNOSTIC DE CAPACITÉ OPÉRATIONNELLE</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white text-balance max-w-3xl mx-auto leading-tight">
            Votre organisation peut-elle absorber votre prochaine étape de croissance ?
          </h2>

          {/* Subtitle */}
          <div className="mt-5 space-y-2 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed text-balance">
            <p>
              Répondez à 12 questions sur votre fonctionnement actuel.
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              OPAL identifie vos principaux points de friction opérationnels et vous indique où votre organisation risque de ralentir votre croissance.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-white">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              <BarChart3 className="w-4 h-4 text-opal-red" />
              <span>12 questions ciblées</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-opal-red" />
              <span>3 minutes chrono</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-opal-red" />
              <span>100% Confidentiel & Gratuit</span>
            </div>
          </div>

          {/* 4 Dimension Previews */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {dimensions.map((dim, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-opal-red">
                    Dimension 0{idx + 1}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white mt-1">
                    {dim.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {dim.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="mt-12 space-y-4">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-opal-red hover:bg-opal-redDark text-white px-10 py-5 rounded-2xl text-base sm:text-xl font-display font-extrabold tracking-tight shadow-glow transition-all duration-200 active:scale-[0.98] group focus-ring"
            >
              <span>Faire mon diagnostic</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="space-y-1 pt-1">
              <p className="text-xs text-gray-400 font-medium">
                3 minutes · Gratuit · Sans engagement
              </p>
              <p className="text-[11px] text-gray-400 max-w-md mx-auto">
                À la fin, vous pourrez également réserver un échange de 30 minutes avec Maxym pour analyser votre situation en détail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
