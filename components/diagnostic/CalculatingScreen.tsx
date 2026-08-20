"use client";

import { useEffect, useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface CalculatingScreenProps {
  onComplete: () => void;
}

export default function CalculatingScreen({ onComplete }: CalculatingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    "Analyse de votre organisation...",
    "Analyse de la structure...",
    "Analyse de l'efficacité...",
    "Analyse de la capacité...",
    "Analyse de la visibilité...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return prev;
        }
      });
    }, 380);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="py-12 sm:py-16 text-center space-y-8 max-w-md mx-auto animate-in fade-in duration-300">
      {/* Animated Icon */}
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-opal-redLight border-t-opal-red animate-spin" />
        <div className="w-14 h-14 rounded-full bg-opal-redLight flex items-center justify-center text-opal-red shadow-inner">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground">
          Calcul de votre diagnostic OPAL
        </h3>
        <p className="text-xs sm:text-sm text-muted">
          Modélisation de votre indice de capacité opérationnelle et identification de vos points de friction.
        </p>
      </div>

      {/* Progress Steps List */}
      <div className="bg-white p-5 rounded-2xl border border-border space-y-3 text-left shadow-card">
        {steps.map((text, idx) => {
          const isDone = idx < stepIndex;
          const isCurrent = idx === stepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs sm:text-sm transition-opacity duration-300 ${
                isDone || isCurrent ? "opacity-100 font-medium" : "opacity-30"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-opal-red flex-shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-opal-red border-t-transparent animate-spin flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-border flex-shrink-0" />
              )}
              <span className={isCurrent ? "text-foreground font-semibold" : "text-muted"}>
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
