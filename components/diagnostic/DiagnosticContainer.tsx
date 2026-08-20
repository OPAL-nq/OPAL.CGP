"use client";

import { useState, useEffect } from "react";
import {
  DIAGNOSTIC_QUESTIONS,
  DiagnosticQuestion as IDiagnosticQuestion,
} from "@/lib/diagnostic/questions";
import {
  calculateDiagnosticScore,
  DiagnosticResult,
  UserAnswers,
} from "@/lib/diagnostic/scoring";
import { LeadData, submitLead } from "@/lib/diagnostic/lead";
import { trackEvent } from "@/lib/analytics";
import DiagnosticProgress from "./DiagnosticProgress";
import DiagnosticQuestion from "./DiagnosticQuestion";
import LeadCapture from "./LeadCapture";
import CalculatingScreen from "./CalculatingScreen";
import ResultScreen from "./ResultScreen";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface DiagnosticContainerProps {
  onClose?: () => void;
  isModal?: boolean;
}

type DiagnosticFlowState =
  | "questions"
  | "lead_capture"
  | "calculating"
  | "results";

export default function DiagnosticContainer({
  onClose,
  isModal = false,
}: DiagnosticContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [sector, setSector] = useState<string>("cgp");
  const [sectorOther, setSectorOther] = useState<string>("");
  const [freeTextAnswer, setFreeTextAnswer] = useState<string>("");
  const [flowState, setFlowState] = useState<DiagnosticFlowState>("questions");
  const [lead, setLead] = useState<LeadData | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  useEffect(() => {
    trackEvent("diagnostic_started");
  }, []);

  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];
  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;

  const handleSelectOption = (optionId: string, customSectorText?: string) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: optionId,
    };
    setAnswers(updatedAnswers);

    if (currentQuestion.type === "sector") {
      setSector(optionId);
      if (customSectorText) {
        setSectorOther(customSectorText);
      }
    }

    trackEvent("diagnostic_question_answered", {
      questionId: currentQuestion.id,
      dimension: currentQuestion.dimension || "sector",
      optionId,
    });

    // Auto advance after slight delay for tactile feedback
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        trackEvent("diagnostic_questions_completed");
        setFlowState("lead_capture");
      }
    }, 220);
  };

  const handleFreeTextSubmit = (text: string) => {
    setFreeTextAnswer(text);
    const updatedAnswers = {
      ...answers,
      [12]: text,
    };
    setAnswers(updatedAnswers);

    trackEvent("diagnostic_freetext_submitted");
    setFlowState("lead_capture");
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleLeadSubmit = async (leadData: LeadData) => {
    setIsSubmittingLead(true);
    setLead(leadData);

    const calculatedResult = calculateDiagnosticScore(
      answers,
      { sector: leadData.sector, sectorOther: leadData.sectorOther },
      freeTextAnswer || answers[12] || ""
    );
    setResult(calculatedResult);

    await submitLead(leadData, answers, calculatedResult);
    trackEvent("lead_submitted", {
      company: leadData.company,
      sector: leadData.sector,
      globalScore: calculatedResult.globalScore,
    });

    setIsSubmittingLead(false);
    setFlowState("calculating");
  };

  const handleCalculationComplete = () => {
    setFlowState("results");
    trackEvent("diagnostic_result_viewed", {
      globalScore: result?.globalScore,
      bottleneck: result?.primaryBottleneck.dimension,
    });
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSector("cgp");
    setSectorOther("");
    setFreeTextAnswer("");
    setLead(null);
    setResult(null);
    setFlowState("questions");
    trackEvent("diagnostic_restarted");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Flow Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-opal-black flex items-center justify-center text-white font-display font-bold text-xs tracking-wider">
            O
          </div>
          <span className="font-display font-bold text-sm text-foreground">
            OPAL <span className="text-muted font-normal">· Diagnostic de Capacité Opérationnelle</span>
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
          <DiagnosticProgress
            currentStep={currentQuestionIndex + 1}
            totalSteps={totalQuestions}
            dimensionLabel={currentQuestion.dimensionLabel}
          />

          <DiagnosticQuestion
            question={currentQuestion}
            selectedOptionId={answers[currentQuestion.id]}
            customSectorText={sectorOther}
            freeTextAnswer={freeTextAnswer}
            onSelectOption={handleSelectOption}
            onSubmitFreeText={handleFreeTextSubmit}
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
              Touches 1-9 ou A-I pour répondre rapidement
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
          initialSector={sector}
          initialSectorOther={sectorOther}
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
