"use client";

import { useEffect, useState } from "react";
import { DiagnosticResult } from "@/lib/diagnostic/scoring";
import { LeadData } from "@/lib/diagnostic/lead";
import {
  RotateCcw,
  Sparkles,
  Printer,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Loader2,
  Calendar,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ResultScreenProps {
  result: DiagnosticResult;
  lead?: LeadData | null;
  onRestart: () => void;
}

export default function ResultScreen({
  result,
  lead,
  onRestart,
}: ResultScreenProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Calendly configuration & prefilling
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
    // Score count up animation
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = result.globalScore / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= result.globalScore) {
        setAnimatedScore(result.globalScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    // Subtle celebration confetti if good score
    if (result.globalScore >= 60 && typeof window !== "undefined") {
      import("canvas-confetti")
        .then((module) => {
          const confettiFn = module.default || module;
          if (typeof confettiFn === "function") {
            confettiFn({
              particleCount: 40,
              spread: 50,
              origin: { y: 0.6 },
              colors: ["#C8102E", "#0B0B0B", "#FCEBED"],
            });
          }
        })
        .catch(() => {});
    }

    return () => clearInterval(timer);
  }, [result.globalScore]);

  const dimensionItems = [
    {
      key: "structure",
      label: "Structure & Processus",
      score: result.dimensions.structure,
      desc: "Standardisation des étapes, documentation & reproductibilité",
    },
    {
      key: "efficiency",
      label: "Efficacité Opérationnelle",
      score: result.dimensions.efficiency,
      desc: "Allègement administratif, fin des tâches répétitives & dispersion",
    },
    {
      key: "capacity",
      label: "Capacité d'Absorption",
      score: result.dimensions.capacity,
      desc: "Absorption de nouveaux clients sans explosion du temps dirigeant",
    },
    {
      key: "visibility",
      label: "Visibilité & Pilotage",
      score: result.dimensions.visibility,
      desc: "Accès immédiat à l'information clé & suivi temps réel",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Top Banner with Lead Firm Name */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100 border border-border text-xs font-bold uppercase tracking-wider text-foreground">
          <Sparkles className="w-3.5 h-3.5 text-opal-red" />
          <span>DIAGNOSTIC OPAL · {lead?.company || "Votre Entreprise"}</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight text-balance">
          Votre Indice de Capacité Opérationnelle
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
          Analyse de la capacité de votre organisation à absorber 2× plus d&apos;activité sans générer 2× plus de charge opérationnelle.
        </p>
      </div>

      {/* Main Score & Profile Card */}
      <div className="bg-white rounded-3xl border border-border p-8 sm:p-10 shadow-premium">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Score Gauge Circle */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-6 bg-surface-50 rounded-2xl border border-border/80 relative">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted mb-1">
              OPAL CAPACITY SCORE
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-opal-red mb-3">
              Votre entreprise obtient
            </span>

            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="#EAEAEA"
                  strokeWidth="9"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="#C8102E"
                  strokeWidth="9"
                  strokeDasharray={326.7}
                  strokeDashoffset={326.7 - (326.7 * animatedScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-black text-4xl sm:text-5xl text-foreground tracking-tighter">
                  {animatedScore}
                </span>
                <span className="text-xs text-muted font-bold tracking-wider">/ 100</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-opal-red mt-1">
                  Capacité Opérationnelle
                </span>
              </div>
            </div>

            <div className="mt-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${result.profile.colorClass}`}>
                {result.profile.label}
              </span>
            </div>
          </div>

          {/* Right: Synthesis & Profile Summary */}
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-opal-red">
              {result.profile.badge}
            </span>
            <h3 className="font-display font-bold text-2xl text-foreground tracking-tight leading-snug">
              {result.profile.headline}
            </h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {result.profile.summary}
            </p>

            <div className="p-4 rounded-xl bg-surface-100/80 border border-border/80 text-xs text-foreground font-medium flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-opal-red flex-shrink-0 mt-0.5" />
              <span>
                Le potentiel de votre entreprise est réel. L&apos;enjeu est d&apos;éliminer les frictions opérationnelles avant qu&apos;une hausse d&apos;activité ne sature vos journées.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Dimensions Detailed Progress Bars */}
      <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h4 className="font-display font-bold text-lg text-foreground">
              Détail des 4 Dimensions Opérationnelles
            </h4>
            <p className="text-xs text-muted">Échelle de 0 à 100%</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-surface-100 border border-border text-foreground">
            4 Axes Analysés
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {dimensionItems.map((dim) => {
            const isLowest = dim.key === result.primaryBottleneck.dimension;

            return (
              <div
                key={dim.key}
                className={`p-5 rounded-2xl border transition-all ${
                  isLowest
                    ? "bg-red-50/40 border-opal-red/40 shadow-sm"
                    : "bg-surface-50 border-border/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-foreground">
                    {dim.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {isLowest && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-opal-red bg-opal-redLight px-2 py-0.5 rounded border border-opal-redBorder">
                        Point de friction
                      </span>
                    )}
                    <span className="font-display font-bold text-base text-foreground">
                      {dim.score}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted mt-1 mb-3 leading-relaxed">{dim.desc}</p>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-border/60">
                  <div
                    className={`h-full transition-all duration-700 rounded-full ${
                      isLowest ? "bg-opal-red shadow-glow" : "bg-foreground/80"
                    }`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Bottleneck Detailed Card */}
      <div className="bg-white rounded-3xl border-2 border-opal-red/30 p-6 sm:p-8 shadow-premium space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-opal-redLight/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-opal-redLight text-opal-red text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Votre principal point de friction</span>
            </div>
            <h4 className="font-display font-extrabold text-xl sm:text-2xl text-foreground mt-3 tracking-tight">
              {result.primaryBottleneck.label.toUpperCase()}
            </h4>
            <p className="text-sm sm:text-base font-semibold text-opal-redDark mt-1">
              {result.primaryBottleneck.headline}
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-muted leading-relaxed">
          {result.primaryBottleneck.description}
        </p>

        {/* Free text intention reminder if provided */}
        {result.freeTextAnswer && (
          <div className="p-4 rounded-xl bg-surface-50 border border-border text-xs sm:text-sm text-foreground">
            <span className="font-bold text-muted block mb-1">Votre principal frein déclaré :</span>
            <p className="italic text-foreground/90">&ldquo;{result.freeTextAnswer}&rdquo;</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/80">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              Conséquences observées :
            </span>
            <ul className="space-y-1.5">
              {result.primaryBottleneck.consequences.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-foreground font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-opal-red">
              Leviers recommandés OPAL :
            </span>
            <ul className="space-y-1.5">
              {result.primaryBottleneck.recommendations.map((r, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-opal-red mt-0.5 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Directly Embedded Calendly Booking Section */}
      <div className="bg-white rounded-3xl border-2 border-opal-red/30 p-6 sm:p-8 md:p-10 shadow-premium relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-opal-redLight/50 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-opal-redLight text-opal-red text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Étape Suivante : Débriefing Stratégique</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight leading-tight">
            Réserver mon analyse de capacité avec Maxym
          </h3>

          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Sélectionnez directement un créneau de 30 minutes ci-dessous. Nous analyserons ensemble vos résultats, identifierons vos points de friction et modéliserons concrètement comment absorber 2× plus de clients sans surcharge.
          </p>

          {/* Reassurance value badges */}
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

        {/* Embedded Calendly Widget Frame */}
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
            title="Prise de rendez-vous Calendly OPAL"
            className="w-full h-[680px] sm:h-[720px] border-0"
            onLoad={() => {
              setIframeLoaded(true);
              trackEvent("calendly_opened", {
                globalScore: result.globalScore,
                bottleneck: result.primaryBottleneck.dimension,
              });
            }}
          />
        </div>

        {/* Footer info */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted pt-2 border-t border-border/80">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-opal-red" /> 30 minutes en visioconférence
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-opal-red" /> Sans engagement · Directement avec Maxym
          </span>
        </div>
      </div>

      {/* Footer Controls: Restart or Print */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-muted border-t border-border">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 hover:text-foreground font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Recommencer le diagnostic</span>
        </button>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 hover:text-foreground font-medium transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimer la synthèse</span>
        </button>
      </div>
    </div>
  );
}
