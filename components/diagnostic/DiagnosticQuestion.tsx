"use client";

import { useEffect, useState } from "react";
import {
  DiagnosticQuestion as IDiagnosticQuestion,
  SECTOR_OPTIONS,
} from "@/lib/diagnostic/questions";
import { Check, ArrowRight, Sparkles, Building2 } from "lucide-react";

interface DiagnosticQuestionProps {
  question: IDiagnosticQuestion;
  selectedOptionId?: string;
  customSectorText?: string;
  freeTextAnswer?: string;
  onSelectOption: (optionId: string, customSector?: string) => void;
  onSubmitFreeText: (text: string) => void;
}

export default function DiagnosticQuestion({
  question,
  selectedOptionId,
  customSectorText = "",
  freeTextAnswer = "",
  onSelectOption,
  onSubmitFreeText,
}: DiagnosticQuestionProps) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const [localCustomSector, setLocalCustomSector] = useState(customSectorText);
  const [localFreeText, setLocalFreeText] = useState(freeTextAnswer);

  // Keyboard navigation for single choice questions
  useEffect(() => {
    if (question.type === "freetext") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      const numKey = parseInt(e.key, 10);
      const optionsList =
        question.type === "sector" ? SECTOR_OPTIONS : question.options || [];

      if (numKey >= 1 && numKey <= optionsList.length) {
        const opt = optionsList[numKey - 1];
        if (question.type === "sector" && opt.id === "autre") {
          onSelectOption("autre", localCustomSector);
        } else {
          onSelectOption(opt.id);
        }
      } else {
        const letterIdx = letters.indexOf(key);
        if (letterIdx >= 0 && letterIdx < optionsList.length) {
          const opt = optionsList[letterIdx];
          if (question.type === "sector" && opt.id === "autre") {
            onSelectOption("autre", localCustomSector);
          } else {
            onSelectOption(opt.id);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question, onSelectOption, letters, localCustomSector]);

  // Handle Sector custom submission
  const handleSectorSubmit = () => {
    onSelectOption("autre", localCustomSector.trim() || "Autre profession");
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Question Headline */}
      <div className="space-y-2.5">
        {question.isHighlighted && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-opal-redLight text-opal-red border border-opal-redBorder text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Question Centrale OPAL</span>
          </div>
        )}

        <h3
          className={`font-display font-extrabold tracking-tight leading-snug text-foreground ${
            question.isHighlighted
              ? "text-2xl sm:text-3xl md:text-4xl text-foreground"
              : "text-xl sm:text-2xl md:text-3xl"
          }`}
        >
          {question.title}
        </h3>

        {question.subtitle && (
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {question.subtitle}
          </p>
        )}
      </div>

      {/* 1. SECTOR QUESTION (Q1) */}
      {question.type === "sector" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SECTOR_OPTIONS.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              const letter = letters[idx] || String(idx + 1);

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (option.id === "autre") {
                      onSelectOption("autre", localCustomSector);
                    } else {
                      onSelectOption(option.id);
                    }
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 group focus-ring ${
                    isSelected
                      ? "bg-opal-redLight/50 border-opal-red shadow-sm scale-[1.01]"
                      : "bg-white border-border hover:border-opal-red/40 hover:bg-surface-50 shadow-subtle"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs flex-shrink-0 transition-colors ${
                        isSelected
                          ? "bg-opal-red text-white"
                          : "bg-surface-100 text-muted group-hover:bg-opal-redLight group-hover:text-opal-red border border-border"
                      }`}
                    >
                      {letter}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-medium leading-snug ${
                        isSelected
                          ? "text-foreground font-semibold"
                          : "text-foreground/90"
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? "bg-opal-red text-white scale-100"
                        : "border border-border opacity-0 group-hover:opacity-40"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded input when "Autre" is selected */}
          {selectedOptionId === "autre" && (
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-50 border border-opal-red/30 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 mt-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                Précisez votre métier ou secteur :
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  autoFocus
                  value={localCustomSector}
                  onChange={(e) => setLocalCustomSector(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && localCustomSector.trim()) {
                      handleSectorSubmit();
                    }
                  }}
                  placeholder="Ex : Architecte, Bureau d'études, Courtier en énergie..."
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground focus-ring"
                />
                <button
                  onClick={handleSectorSubmit}
                  disabled={!localCustomSector.trim()}
                  className="inline-flex items-center justify-center gap-2 bg-opal-red hover:bg-opal-redDark text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm disabled:opacity-40 transition-colors focus-ring"
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. SINGLE CHOICE QUESTIONS (Q2 to Q11) */}
      {question.type === "single" && question.options && (
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const letter = letters[idx] || String(idx + 1);

            return (
              <button
                key={option.id}
                onClick={() => onSelectOption(option.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-4 group focus-ring ${
                  isSelected
                    ? "bg-opal-redLight/50 border-opal-red shadow-sm scale-[1.008]"
                    : "bg-white border-border hover:border-opal-red/40 hover:bg-surface-50 shadow-subtle"
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs sm:text-sm flex-shrink-0 transition-colors ${
                      isSelected
                        ? "bg-opal-red text-white"
                        : "bg-surface-100 text-muted group-hover:bg-opal-redLight group-hover:text-opal-red border border-border"
                    }`}
                  >
                    {letter}
                  </span>
                  <span
                    className={`text-sm sm:text-base font-medium leading-normal ${
                      isSelected
                        ? "text-foreground font-semibold"
                        : "text-foreground/90"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected
                      ? "bg-opal-red text-white scale-100"
                      : "border border-border opacity-0 group-hover:opacity-40"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. FREE TEXT QUESTION (Q12) */}
      {question.type === "freetext" && (
        <div className="space-y-4">
          <textarea
            autoFocus
            rows={4}
            value={localFreeText}
            onChange={(e) => setLocalFreeText(e.target.value)}
            placeholder={
              question.placeholder ||
              "Ex : Les relances incessantes par email, la ressaisie manuelle des dossiers, la dépendance au dirigeant..."
            }
            className="w-full p-4 sm:p-5 rounded-2xl border border-border bg-white text-sm sm:text-base text-foreground focus-ring leading-relaxed shadow-subtle resize-none"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-muted">
              Appuyez sur Continuer pour valider vos réponses.
            </span>
            <button
              onClick={() => onSubmitFreeText(localFreeText)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-opal-red hover:bg-opal-redDark text-white px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-card hover:shadow-glow transition-all active:scale-[0.98] focus-ring"
            >
              <span>Continuer vers mon diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
