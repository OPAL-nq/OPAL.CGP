"use client";

import { useState, useEffect } from "react";
import { QUIZ_QUESTIONS, QuizQuestion as IQuizQuestion } from "@/lib/quiz/questions";
import { calculateDiagnosticScore, DiagnosticResult, UserAnswers } from "@/lib/quiz/scoring";
import { LeadData, submitLead } from "@/lib/quiz/lead";
import { trackEvent } from "@/lib/analytics";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import LeadCapture from "./LeadCapture";
import CalculatingScreen from "./CalculatingScreen";
import ResultScreen from "./ResultScreen";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface QuizContainerProps {
  onClose?: () => void;
  isModal?: boolean;
}

type QuizFlowState = "questions" | "lead_capture" | "calculating" | "results";

export default function QuizContainer({ onClose, isModal = false }: QuizContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [flowState, setFlowState] = useState<QuizFlowState>("questions");
  const [lead, setLead] = useState<LeadData | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  useEffect(() => {
    trackEvent("quiz_started");
  }, []);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionId: string) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: optionId,
    };
    setAnswers(updatedAnswers);

    trackEvent("quiz_question_answered", {
      questionId: currentQuestion.id,
      dimension: currentQuestion.dimension,
      optionId,
    });

    // Auto advance after slight delay for tactile feedback
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Questions completed -> proceed to lead capture
        trackEvent("quiz_completed");
        setFlowState("lead_capture");
      }
    }, 220);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleLeadSubmit = async (leadData: LeadData) => {
    setIsSubmittingLead(true);
    setLead(leadData);

    const calculatedResult = calculateDiagnosticScore(answers);
    setResult(calculatedResult);

    await submitLead(leadData, answers, calculatedResult);
    trackEvent("lead_submitted", {
      firmName: leadData.firmName,
      globalScore: calculatedResult.globalScore,
    });

    setIsSubmittingLead(false);
    setFlowState("calculating");
  };

  const handleCalculationComplete = () => {
    setFlowState("results");
    trackEvent("diagnostic_viewed", {
      globalScore: result?.globalScore,
      bottleneck: result?.primaryBottleneck.dimension,
    });
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setLead(null);
    setResult(null);
    setFlowState("questions");
    trackEvent("quiz_started", { restart: true });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Modal / Flow Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-opal-black flex items-center justify-center text-white font-display font-bold text-xs">
            O
          </div>
          <span className="font-display font-bold text-sm text-foreground">
            OPAL.CGP <span className="text-muted font-normal">· Diagnostic Capacité</span>
          </span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-surface-100 transition-colors focus-ring"
            aria-label="Fermer le diagnostic"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* State 1: 12 Questions */}
      {flowState === "questions" && (
        <div className="space-y-8">
          <QuizProgress
            currentStep={currentQuestionIndex + 1}
            totalSteps={totalQuestions}
            dimensionLabel={currentQuestion.dimensionLabel}
          />

          <QuizQuestion
            question={currentQuestion}
            selectedOptionId={answers[currentQuestion.id]}
            onSelectOption={handleSelectOption}
          />

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Question précédente</span>
            </button>

            <span className="text-xs text-muted hidden sm:inline-block">
              Touches 1-4 ou A-D pour répondre rapidement
            </span>

            {answers[currentQuestion.id] && currentQuestionIndex < totalQuestions - 1 && (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-opal-red hover:bg-opal-redLight/60 transition-colors"
              >
                <span>Suivant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* State 2: Lead Capture */}
      {flowState === "lead_capture" && (
        <LeadCapture
          onSubmit={handleLeadSubmit}
          isSubmitting={isSubmittingLead}
        />
      )}

      {/* State 3: Calculation Loader */}
      {flowState === "calculating" && (
        <CalculatingScreen onComplete={handleCalculationComplete} />
      )}

      {/* State 4: Result Screen */}
      {flowState === "results" && result && (
        <ResultScreen
          result={result}
          lead={lead}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
