"use client";

import { useEffect } from "react";
import { QuizQuestion as IQuizQuestion } from "@/lib/quiz/questions";
import { Check } from "lucide-react";

interface QuizQuestionProps {
  question: IQuizQuestion;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export default function QuizQuestion({
  question,
  selectedOptionId,
  onSelectOption,
}: QuizQuestionProps) {
  const letters = ["A", "B", "C", "D", "E", "F", "G"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow 1-9 or A-G selection
      const key = e.key.toUpperCase();
      const numKey = parseInt(e.key, 10);

      if (numKey >= 1 && numKey <= question.options.length) {
        onSelectOption(question.options[numKey - 1].id);
      } else {
        const letterIdx = letters.indexOf(key);
        if (letterIdx >= 0 && letterIdx < question.options.length) {
          onSelectOption(question.options[letterIdx].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question, onSelectOption, letters]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Question Headline */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-opal-red">
          {question.dimensionLabel}
        </span>
        <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-foreground tracking-tight leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Answer Cards List */}
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
                  ? "bg-opal-redLight/40 border-opal-red shadow-sm scale-[1.005]"
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
                    isSelected ? "text-foreground font-semibold" : "text-foreground/90"
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
    </div>
  );
}
