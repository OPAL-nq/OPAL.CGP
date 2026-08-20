"use client";

import { useEffect, useState } from "react";
import { X, Clock, ShieldCheck, Loader2, Calendar } from "lucide-react";
import { LeadData } from "@/lib/diagnostic/lead";
import { trackEvent } from "@/lib/analytics";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: LeadData | null;
  bottleneckLabel?: string;
  globalScore?: number;
}

export default function CalendlyModal({
  isOpen,
  onClose,
  lead,
  bottleneckLabel,
  globalScore,
}: CalendlyModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/maxym-nelaupe/diagnostic-opal";

  const fullName = lead ? `${lead.firstName} ${lead.lastName}`.trim() : "";
  const params = new URLSearchParams({
    hide_landing_page_details: "1",
    hide_gdpr_banner: "1",
    background_color: "ffffff",
    text_color: "0b0b0b",
    primary_color: "c8102e",
  });

  if (fullName) {
    params.set("name", fullName);
  }
  if (lead?.email) {
    params.set("email", lead.email);
  }
  if (lead?.company) {
    params.set("a1", lead.company);
  }

  const finalCalendlyUrl = `${baseUrl.split("?")[0]}?${params.toString()}`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      trackEvent("calendly_modal_opened", { globalScore, bottleneckLabel });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose, globalScore, bottleneckLabel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl border border-border shadow-premium relative my-auto overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between bg-surface-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-opal-red animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Échange Stratégique OPAL
              </span>
            </div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground mt-1">
              Analyser mon organisation avec OPAL
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-0.5">
              30 minutes avec Maxym · Sans engagement
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-muted hover:text-foreground hover:bg-surface-200 transition-colors focus-ring"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content iframe */}
        <div className="relative flex-1 overflow-y-auto min-h-[580px] sm:min-h-[640px] bg-white">
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
            title="Prise de rendez-vous Calendly OPAL"
            className="w-full h-[620px] sm:h-[680px] border-0"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-50 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-opal-red" /> 30 min en visioconférence
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-opal-red" /> Échange 100% confidentiel
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-foreground hover:text-opal-red transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
