"use client";

import { useState } from "react";
import { Play, Clock, ArrowRight, Shield } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FounderVideoProps {
  onOpenDiagnostic: () => void;
}

export default function FounderVideo({ onOpenDiagnostic }: FounderVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCtaClick = () => {
    trackEvent("hero_cta_click", { source: "founder_video" });
    onOpenDiagnostic();
  };

  return (
    <section className="py-20 md:py-28 bg-surface-100 border-b border-border relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted bg-white px-3 py-1 rounded-full border border-border">
            Note du fondateur
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight text-foreground">
            Pourquoi OPAL.CGP existe
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed text-balance">
            Les cabinets ne manquent pas nécessairement de clients. Ils manquent souvent de
            capacité opérationnelle pour absorber leur croissance.
          </p>
        </div>

        {/* Video Player Frame */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="relative aspect-video rounded-2xl bg-opal-black border border-black/10 overflow-hidden shadow-premium group">
            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-black/90 via-black/50 to-black/30">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-opal-red" />
                  <span>1 min 24</span>
                </div>

                {/* Founder Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-opal-red" />
                  <span>Message de Maxym · Fondateur</span>
                </div>

                {/* Play Button Trigger */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-opal-red hover:bg-opal-redDark text-white flex items-center justify-center shadow-glow transition-all duration-300 transform group-hover:scale-110 active:scale-95 focus-ring"
                  aria-label="Lancer la vidéo de présentation (1 min 24)"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </button>

                <div className="mt-6 max-w-md">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                    Comprendre le plafond de verre des cabinets
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    Comment découpler votre temps de travail du volume d&apos;encours gérés.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-8 text-center">
                <div className="max-w-md space-y-4">
                  <div className="w-12 h-12 rounded-full bg-opal-red/20 text-opal-red flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg">Emplacement Vidéo Prêt</h4>
                  <p className="text-xs text-gray-400">
                    Le lecteur est configuré pour intégrer directement la vidéo MP4/Loom/Vimeo de Maxym dès publication.
                  </p>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="text-xs text-opal-red hover:underline font-semibold"
                  >
                    Revenir à l&apos;aperçu
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Under video CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 text-sm font-bold text-opal-red hover:text-opal-redDark transition-colors group"
            >
              <span>Faire mon diagnostic maintenant</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
