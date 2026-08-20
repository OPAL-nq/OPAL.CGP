"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

export default function HeroEngineVisual() {
  const [mode, setMode] = useState<"opal" | "without">("opal");

  return (
    <div className="w-full bg-white rounded-3xl border border-border p-6 sm:p-8 md:p-10 shadow-premium relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className={`absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
          mode === "opal" ? "bg-opal-redLight/60 opacity-100" : "bg-amber-500/10 opacity-70"
        }`}
      />

      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100 border border-border text-xs font-bold text-foreground">
            <span
              className={`w-2 h-2 rounded-full ${
                mode === "opal" ? "bg-opal-red animate-pulse" : "bg-amber-500"
              }`}
            />
            <span>SIMULATION DE CROISSANCE OPÉRATIONNELLE</span>
          </div>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground tracking-tight">
            Comment votre organisation absorbe la croissance
          </h3>
        </div>

        {/* Toggle Mode */}
        <div className="inline-flex p-1 bg-surface-100 rounded-2xl border border-border self-start sm:self-auto shadow-subtle">
          <button
            onClick={() => setMode("opal")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
              mode === "opal"
                ? "bg-white text-opal-red shadow-sm border border-border/60"
                : "text-muted hover:text-foreground"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-opal-red" />
            <span>Avec OPAL (Capacité ×2)</span>
          </button>
          <button
            onClick={() => setMode("without")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
              mode === "without"
                ? "bg-white text-amber-800 shadow-sm border border-border/60"
                : "text-muted hover:text-foreground"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Sans Structure (Surcharge)</span>
          </button>
        </div>
      </div>

      {/* Main Comparative Visual Matrix */}
      <div className="py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left / Center: Interactive Dynamic Graph & Flow */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-surface-50 border border-border relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Trajectoire : Volume Clients vs Charge de Travail
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  mode === "opal"
                    ? "bg-opal-redLight text-opal-red border-opal-redBorder"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {mode === "opal" ? "Croissance Découplée" : "Surcharge Exponentielle"}
              </span>
            </div>

            {/* SVG Visual Curves */}
            <div className="h-56 sm:h-64 w-full relative">
              <svg viewBox="0 0 500 240" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="opalCurveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C8102E" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#C8102E" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="chaosCurveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="30" y1="30" x2="470" y2="30" stroke="#EAEAE5" strokeDasharray="4" />
                <line x1="30" y1="90" x2="470" y2="90" stroke="#EAEAE5" strokeDasharray="4" />
                <line x1="30" y1="150" x2="470" y2="150" stroke="#EAEAE5" strokeDasharray="4" />
                <line x1="30" y1="200" x2="470" y2="200" stroke="#D1D1CB" strokeWidth="1.5" />

                {/* X Axis Labels */}
                <text x="40" y="222" className="text-[11px] fill-muted font-medium">
                  50 clients
                </text>
                <text x="220" y="222" className="text-[11px] fill-muted font-medium">
                  150 clients
                </text>
                <text x="400" y="222" className="text-[11px] fill-foreground font-bold">
                  300+ clients (2×)
                </text>

                {/* Growth Client Line (Always Climbs 2x) */}
                <path
                  d="M 40 190 Q 240 110, 450 40"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Trajectory Curve based on mode */}
                {mode === "without" ? (
                  <>
                    <path
                      d="M 40 190 Q 220 160, 450 25"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="3.5"
                      className="transition-all duration-700"
                    />
                    <path
                      d="M 40 190 Q 220 160, 450 25 L 450 200 L 40 200 Z"
                      fill="url(#chaosCurveGrad)"
                      className="transition-all duration-700"
                    />
                    <circle cx="450" cy="25" r="6" fill="#DC2626" />
                    <circle cx="450" cy="25" r="14" fill="#DC2626" opacity="0.2" className="animate-ping" />
                  </>
                ) : (
                  <>
                    <path
                      d="M 40 190 Q 240 180, 450 155"
                      fill="none"
                      stroke="#C8102E"
                      strokeWidth="3.5"
                      className="transition-all duration-700"
                    />
                    <path
                      d="M 40 190 Q 240 180, 450 155 L 450 200 L 40 200 Z"
                      fill="url(#opalCurveGrad)"
                      className="transition-all duration-700"
                    />
                    <circle cx="450" cy="155" r="6" fill="#C8102E" />
                    <circle cx="450" cy="155" r="12" fill="#C8102E" opacity="0.25" />
                  </>
                )}
              </svg>

              {/* Floating Dynamic Annotation */}
              <div
                className={`absolute right-4 top-2 sm:right-6 sm:top-3 p-3.5 rounded-2xl border shadow-sm max-w-[230px] transition-all duration-500 ${
                  mode === "opal"
                    ? "bg-white border-opal-red/30 text-foreground"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                <div className="flex items-center gap-1.5 font-display font-bold text-xs">
                  {mode === "opal" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-opal-red" />
                      <span>Capacité OPAL</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Saturation Dirigeant</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed mt-1 text-muted">
                  {mode === "opal"
                    ? "Le volume client double sans multiplier vos heures de travail."
                    : "Chaque nouveau client alourdit la coordination et sature le dirigeant."}
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs text-muted pt-3 gap-3 border-t border-border/70 mt-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-foreground inline-block" />
                <span>Croissance clientèle (2×)</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-4 h-1 rounded inline-block ${
                    mode === "opal" ? "bg-opal-red" : "bg-red-600"
                  }`}
                />
                <span className="font-semibold text-foreground">
                  {mode === "opal" ? "Charge maîtrisée avec OPAL" : "Charge subie sans structure"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: 3 Clear Impact Cards */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 border border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Volume Clients
                </span>
                <span className="text-xs font-bold text-opal-red bg-opal-redLight px-2 py-0.5 rounded-full">
                  +100%
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display font-black text-3xl text-foreground">2×</span>
                <span className="text-xs text-muted">capacité d&apos;accueil</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 border border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Friction Opérationnelle
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    mode === "opal"
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-red-700 bg-red-50"
                  }`}
                >
                  {mode === "opal" ? "Divisée" : "Explose"}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display font-black text-3xl text-foreground">
                  {mode === "opal" ? "-65%" : "+90%"}
                </span>
                <span className="text-xs text-muted">
                  {mode === "opal" ? "de temps perdu en recherche" : "de charge administrative"}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 border border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Disponibilité Dirigeant
                </span>
                <span className="text-xs font-bold text-opal-red bg-opal-redLight px-2 py-0.5 rounded-full">
                  Recentré
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display font-black text-3xl text-foreground">
                  {mode === "opal" ? "+75%" : "-40%"}
                </span>
                <span className="text-xs text-muted">temps de conseil & stratégie</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-opal-red" />
          <span>Logiciel métier sur mesure · Infrastructure centralisée · Équipes autonomes</span>
        </div>
        <span className="font-semibold text-foreground">
          Studio de création logicielle OPAL
        </span>
      </div>
    </div>
  );
}
