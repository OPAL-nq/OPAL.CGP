"use client";

import { useState } from "react";
import { Calendar, Clock, ShieldCheck, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { LeadData } from "@/lib/quiz/lead";
import { trackEvent } from "@/lib/analytics";

interface CalendlyCTAProps {
  lead?: LeadData | null;
  bottleneckLabel?: string;
  globalScore?: number;
}

export default function CalendlyCTA({
  lead,
  bottleneckLabel,
  globalScore,
}: CalendlyCTAProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/maxym-nelaupe/diagnostic-opal";

  // Build prefill URL with lead information if available
  const fullName = lead ? `${lead.firstName} ${lead.lastName}`.trim() : "";
  const params = new URLSearchParams({
    hide_landing_page_details: "1",
    hide_gdpr_banner: "1",
    background_color: "ffffff",
    text_color: "111111",
    primary_color: "c8102e",
  });

  if (fullName) {
    params.set("name", fullName);
  }
  if (lead?.email) {
    params.set("email", lead.email);
  }

  const finalCalendlyUrl = `${baseUrl.split("?")[0]}?${params.toString()}`;

  return (
    <div className="bg-white rounded-3xl border-2 border-opal-red/30 p-6 sm:p-8 md:p-10 shadow-premium relative overflow-hidden space-y-8">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-opal-redLight/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-opal-redLight text-opal-red text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Étape suivante : Débriefing Stratégique</span>
        </div>

        <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight leading-tight">
          Réservez votre débriefing de capacité
        </h3>

        <p className="text-sm sm:text-base text-muted leading-relaxed">
          Sélectionnez directement un créneau ci-dessous pour un échange de 30 minutes avec un{" "}
          <strong className="text-foreground font-semibold">spécialiste OPAL.CGP</strong>. Nous analyserons vos résultats en détail et modéliserons concrètement comment absorber 2× plus de clients sans surcharge.
        </p>

        {/* Value badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
          <div className="p-3 rounded-xl bg-surface-50 border border-border flex items-center gap-2.5 text-xs text-foreground font-medium">
            <CheckCircle2 className="w-4 h-4 text-opal-red flex-shrink-0" />
            <span>Audit de vos processus</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-50 border border-border flex items-center gap-2.5 text-xs text-foreground font-medium">
            <CheckCircle2 className="w-4 h-4 text-opal-red flex-shrink-0" />
            <span>Plan d&apos;action personnalisé</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-50 border border-border flex items-center gap-2.5 text-xs text-foreground font-medium">
            <CheckCircle2 className="w-4 h-4 text-opal-red flex-shrink-0" />
            <span>100% Confidentiel & Offert</span>
          </div>
        </div>
      </div>

      {/* Directly Embedded Calendly Widget */}
      <div className="relative w-full rounded-2xl border border-border bg-white overflow-hidden shadow-subtle min-h-[680px]">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-50 z-10 space-y-3">
            <Loader2 className="w-8 h-8 text-opal-red animate-spin" />
            <p className="text-xs font-semibold text-muted">
              Chargement des créneaux disponibles...
            </p>
          </div>
        )}

        <iframe
          src={finalCalendlyUrl}
          title="Prise de rendez-vous Calendly OPAL.CGP"
          className="w-full h-[680px] sm:h-[720px] border-0"
          onLoad={() => {
            setIframeLoaded(true);
            trackEvent("calendly_opened", { globalScore, bottleneckLabel });
          }}
        />
      </div>

      {/* Footer guarantees */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted pt-2 border-t border-border/80">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-opal-red" /> 30 minutes en visio
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-opal-red" /> Dirigeants & Associés de cabinets CGP
        </span>
      </div>
    </div>
  );
}
