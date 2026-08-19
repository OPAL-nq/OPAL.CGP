"use client";

import { useState } from "react";
import { Users, Briefcase, Calendar, TrendingUp, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

export default function HeroCapacityVisual() {
  const [mode, setMode] = useState<"opal" | "traditional">("opal");

  return (
    <div className="w-full bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-premium relative overflow-hidden">
      {/* Background glow */}
      <div
        className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
          mode === "opal" ? "bg-opal-red/10 opacity-100" : "bg-amber-500/10 opacity-70"
        }`}
      />

      {/* Header of Visualizer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-100 border border-border text-foreground">
              <Sparkles className="w-3 h-3 text-opal-red" /> Modélisation de Capacité
            </span>
            <span className="text-xs text-muted">Cabinet de 3 à 15 pers.</span>
          </div>
          <h3 className="font-display font-bold text-lg text-foreground mt-1 tracking-tight">
            Trajectoire de Croissance vs Charge Opérationnelle
          </h3>
        </div>

        {/* Toggle Controls */}
        <div className="inline-flex p-1 bg-surface-100 rounded-xl border border-border self-start sm:self-auto">
          <button
            onClick={() => setMode("opal")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              mode === "opal"
                ? "bg-white text-opal-red shadow-sm border border-border/60"
                : "text-muted hover:text-foreground"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-opal-red" />
            Avec OPAL.CGP
          </button>
          <button
            onClick={() => setMode("traditional")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              mode === "traditional"
                ? "bg-white text-foreground shadow-sm border border-border/60"
                : "text-muted hover:text-foreground"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Sans Structure (Traditionnel)
          </button>
        </div>
      </div>

      {/* Main Dynamic Graphic */}
      <div className="py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Chart SVG */}
          <div className="lg:col-span-8 relative">
            <div className="h-64 sm:h-72 w-full relative">
              <svg
                viewBox="0 0 500 280"
                className="w-full h-full overflow-visible"
                aria-label="Courbe de capacité"
              >
                <defs>
                  <linearGradient id="opalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C8102E" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#C8102E" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="chaosGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="40" y1="40" x2="480" y2="40" stroke="#F0F0EC" strokeDasharray="4" />
                <line x1="40" y1="100" x2="480" y2="100" stroke="#F0F0EC" strokeDasharray="4" />
                <line x1="40" y1="160" x2="480" y2="160" stroke="#F0F0EC" strokeDasharray="4" />
                <line x1="40" y1="220" x2="480" y2="220" stroke="#E5E5E0" strokeWidth="1.5" />
                <line x1="40" y1="30" x2="40" y2="220" stroke="#E5E5E0" strokeWidth="1.5" />

                {/* Y Axis Labels */}
                <text x="32" y="45" textAnchor="end" className="text-[10px] fill-muted font-medium">
                  2×
                </text>
                <text x="32" y="105" textAnchor="end" className="text-[10px] fill-muted font-medium">
                  1.5×
                </text>
                <text x="32" y="165" textAnchor="end" className="text-[10px] fill-muted font-medium">
                  1.2×
                </text>
                <text x="32" y="224" textAnchor="end" className="text-[10px] fill-muted font-medium">
                  1×
                </text>

                {/* X Axis Labels */}
                <text x="50" y="245" className="text-[10px] fill-muted font-medium">
                  50 clients
                </text>
                <text x="180" y="245" className="text-[10px] fill-muted font-medium">
                  120 clients
                </text>
                <text x="310" y="245" className="text-[10px] fill-muted font-medium">
                  200 clients
                </text>
                <text x="440" y="245" className="text-[10px] fill-muted font-medium font-bold text-foreground">
                  300+ clients (2×)
                </text>

                {/* Client Growth Line (Always Climbing 2x) */}
                <path
                  d="M 50 210 Q 250 120, 460 50"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Trajectory 1: Traditional (Without OPAL) */}
                {mode === "traditional" ? (
                  <>
                    <path
                      d="M 50 210 Q 220 180, 460 30"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="3.5"
                      className="transition-all duration-700"
                    />
                    <path
                      d="M 50 210 Q 220 180, 460 30 L 460 220 L 50 220 Z"
                      fill="url(#chaosGradient)"
                      className="transition-all duration-700"
                    />
                    {/* Pulsing point of saturation */}
                    <circle cx="460" cy="30" r="6" fill="#DC2626" />
                    <circle cx="460" cy="30" r="12" fill="#DC2626" opacity="0.2" className="animate-ping" />
                  </>
                ) : (
                  <>
                    {/* Trajectory 2: With OPAL (Controlled load, absorption capacity) */}
                    <path
                      d="M 50 210 Q 250 200, 460 170"
                      fill="none"
                      stroke="#C8102E"
                      strokeWidth="3.5"
                      className="transition-all duration-700"
                    />
                    <path
                      d="M 50 210 Q 250 200, 460 170 L 460 220 L 50 220 Z"
                      fill="url(#opalGradient)"
                      className="transition-all duration-700"
                    />
                    {/* Controlled load point */}
                    <circle cx="460" cy="170" r="6" fill="#C8102E" />
                    <circle cx="460" cy="170" r="10" fill="#C8102E" opacity="0.25" />
                  </>
                )}
              </svg>

              {/* In-chart annotation badges */}
              <div
                className={`absolute right-4 top-2 sm:right-6 sm:top-4 transition-all duration-500 rounded-xl p-3 border shadow-sm max-w-[210px] ${
                  mode === "opal"
                    ? "bg-white/95 border-opal-red/20 text-foreground"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                <div className="flex items-center gap-1.5 font-display font-bold text-xs">
                  {mode === "opal" ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-opal-red" />
                      <span>Capacité OPAL</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                      <span>Surcharge opérationnelle</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed mt-1 text-muted">
                  {mode === "opal"
                    ? "Volume client ×2 avec une charge opérationnelle quasi stable (+15%)."
                    : "Chaque nouveau dossier multiplie le temps de relance et sature l'équipe."}
                </p>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs text-muted pt-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-foreground inline-block" />
                <span>Croissance clientèle (×2)</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-4 h-1 rounded inline-block ${
                    mode === "opal" ? "bg-opal-red" : "bg-red-600"
                  }`}
                />
                <span className="font-medium text-foreground">
                  {mode === "opal" ? "Charge maîtrisée avec OPAL" : "Charge subie sans structure"}
                </span>
              </div>
            </div>
          </div>

          {/* Metric KPI Cards on Right */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 rounded-xl bg-surface-50 border border-border/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted uppercase tracking-wider">
                  <Users className="w-4 h-4 text-opal-red" />
                  <span>Clients actifs</span>
                </div>
                <span className="text-xs font-bold text-opal-red bg-opal-redLight px-2 py-0.5 rounded-full">
                  +100%
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-display font-bold text-foreground">2×</span>
                <span className="text-xs text-muted">capacité d&apos;accueil</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-50 border border-border/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted uppercase tracking-wider">
                  <Briefcase className="w-4 h-4 text-opal-red" />
                  <span>Friction par dossier</span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    mode === "opal"
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-red-700 bg-red-50"
                  }`}
                >
                  {mode === "opal" ? "Divisée par 3" : "Multipliée"}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-display font-bold text-foreground">
                  {mode === "opal" ? "-65%" : "+80%"}
                </span>
                <span className="text-xs text-muted">
                  {mode === "opal" ? "de temps perdu en recherche" : "de charge administrative"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-50 border border-border/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-opal-red" />
                  <span>Temps de conseil</span>
                </div>
                <span className="text-xs font-bold text-opal-red bg-opal-redLight px-2 py-0.5 rounded-full">
                  Priorité
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-display font-bold text-foreground">
                  {mode === "opal" ? "+75%" : "-30%"}
                </span>
                <span className="text-xs text-muted">disponibilité dirigeant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
