"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FinalCTAProps {
  onOpenDiagnostic: () => void;
}

export default function FinalCTA({ onOpenDiagnostic }: FinalCTAProps) {
  const handleCta = () => {
    trackEvent("hero_cta_click", { source: "final_cta" });
    onOpenDiagnostic();
  };

  return (
    <section className="py-24 md:py-32 bg-opal-black text-white relative overflow-hidden">
      {/* Subtle red glow in the background */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-opal-red/20 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        {/* Brand Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-opal-red font-display font-extrabold text-xl shadow-inner">
          O
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.12] text-balance">
          Plus de clients ne devraient pas signifier{" "}
          <span className="text-opal-red">plus de chaos.</span>
        </h2>

        <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto text-balance">
          Votre cabinet doit pouvoir grandir sans que votre charge de travail grandisse au même rythme.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCta}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-opal-red hover:bg-opal-redDark text-white px-8 py-4.5 rounded-xl text-base sm:text-lg font-bold tracking-tight shadow-glow transition-all duration-200 active:scale-[0.98] group focus-ring"
          >
            <span>ÉVALUER LA CAPACITÉ DE MON CABINET</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Diagnostic gratuit en 3 minutes · Confidentiel
        </p>
      </div>
    </section>
  );
}
