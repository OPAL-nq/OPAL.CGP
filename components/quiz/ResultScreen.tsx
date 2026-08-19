"use client";

import { useEffect, useState } from "react";
import { DiagnosticResult } from "@/lib/quiz/scoring";
import { LeadData } from "@/lib/quiz/lead";
import CalendlyCTA from "./CalendlyCTA";
import {
  RotateCcw,
  Sparkles,
  Printer,
  Shield,
} from "lucide-react";

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

    // Confetti effect if good score
    if (result.globalScore >= 60 && typeof window !== "undefined") {
      import("canvas-confetti")
        .then((module) => {
          const confettiFn = module.default || module;
          if (typeof confettiFn === "function") {
            confettiFn({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 },
              colors: ["#C8102E", "#111111", "#FCEBED"],
            });
          }
        })
        .catch(() => {});
    }

    return () => clearInterval(timer);
  }, [result.globalScore]);

  const dimensionItems = [
    {
      label: "Capacité commerciale",
      score: result.dimensions.commercialCapacity,
      desc: "Prise en charge des prospects & temps de conseil",
    },
    {
      label: "Organisation & Données",
      score: result.dimensions.organization,
      desc: "Centralisation des pièces & standardisation",
    },
    {
      label: "Efficacité opérationnelle",
      score: result.dimensions.operationalEfficiency,
      desc: "Relances, charge administrative & réactivité",
    },
    {
      label: "Capacité de croissance",
      score: result.dimensions.growthCapacity,
      desc: "Absorption de volume & scalabilité d'équipe",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Top Banner with Lead Firm Name */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100 border border-border text-xs font-bold uppercase tracking-wider text-foreground">
          <Sparkles className="w-3.5 h-3.5 text-opal-red" />
          <span>Diagnostic Finalisé · {lead?.firmName || "Votre Cabinet"}</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight text-balance">
          Votre Indice de Capacité Opérationnelle
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-xl mx-auto">
          Analyse de la capacité de votre cabinet à absorber 2× plus de clients sans générer 2× plus de charge.
        </p>
      </div>

      {/* Main Score & Profile Card */}
      <div className="bg-white rounded-3xl border border-border p-8 sm:p-10 shadow-premium">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Score Gauge Circle */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-6 bg-surface-50 rounded-2xl border border-border/80 relative">
            <span className="text-xs font-bold uppercase tracking-widest text-muted mb-2">
              OPAL CAPACITY SCORE
            </span>

            <div className="relative w-40 h-40 flex items-center justify-center">
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
                Le potentiel de votre cabinet est réel. L&apos;enjeu est d&apos;éliminer les frictions opérationnelles avant qu&apos;une hausse d&apos;activité ne sature vos journées.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Dimensions Detailed Progress Bars */}
      <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h4 className="font-display font-bold text-lg text-foreground">
            Détail des 4 Dimensions Opérationnelles
          </h4>
          <span className="text-xs text-muted">Échelle 0 à 100%</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {dimensionItems.map((dim, idx) => {
            const isLowest = dim.score === Math.min(...dimensionItems.map((d) => d.score));

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isLowest
                    ? "bg-red-50/30 border-opal-red/30 shadow-sm"
                    : "bg-surface-50 border-border/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-foreground">
                    {dim.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {isLowest && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-opal-red bg-opal-redLight px-2 py-0.5 rounded">
                        Point de friction
                      </span>
                    )}
                    <span className="font-display font-bold text-base text-foreground">
                      {dim.score}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted mt-1 mb-3">{dim.desc}</p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-border/60">
                  <div
                    className={`h-full transition-all duration-700 rounded-full ${
                      isLowest ? "bg-opal-red" : "bg-foreground/80"
                    }`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendly Booking Directly Embedded */}
      <CalendlyCTA
        lead={lead}
        bottleneckLabel={result.primaryBottleneck.label}
        globalScore={result.globalScore}
      />

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
