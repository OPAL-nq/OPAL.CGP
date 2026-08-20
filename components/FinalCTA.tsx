"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FinalCTAProps {
  onOpenDiagnostic: () => void;
}

export default function FinalCTA({ onOpenDiagnostic }: FinalCTAProps) {
  const handleCta = () => {
    trackEvent("final_cta_click");
    onOpenDiagnostic();
  };

  return (
    <section className="py-20 md:py-28 bg-white border-t border-border relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Brand Badge */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-opal-black text-white font-display font-extrabold text-xl shadow-card mx-auto">
          O
        </div>

        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.12] text-balance">
          Plus de clients ne devraient pas signifier{" "}
          <span className="text-opal-red">plus de chaos.</span>
        </h2>

        <p className="text-base sm:text-lg text-muted font-normal leading-relaxed max-w-2xl mx-auto text-balance">
          Votre entreprise doit pouvoir grandir sans que votre charge de travail grandisse au même rythme.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCta}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-opal-red hover:bg-opal-redDark text-white px-8 py-4.5 rounded-xl text-base sm:text-lg font-bold tracking-tight shadow-card hover:shadow-glow transition-all duration-200 active:scale-[0.98] group focus-ring"
          >
            <span>Faire mon diagnostic opérationnel</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-xs text-muted">
          12 questions · 3 minutes · 100% Confidentiel
        </p>
      </div>
    </section>
  );
}
