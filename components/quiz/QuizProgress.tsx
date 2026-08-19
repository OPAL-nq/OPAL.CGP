interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  dimensionLabel: string;
}

export default function QuizProgress({
  currentStep,
  totalSteps,
  dimensionLabel,
}: QuizProgressProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-foreground">
            {String(currentStep).padStart(2, "0")}{" "}
            <span className="text-muted font-normal">/ {totalSteps}</span>
          </span>
          <span className="text-border">•</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-opal-redLight text-opal-red border border-opal-redBorder">
            {dimensionLabel}
          </span>
        </div>
        <span className="text-xs font-semibold text-muted">
          {percentage}% complété
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden border border-border/60">
        <div
          className="h-full bg-opal-red transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
