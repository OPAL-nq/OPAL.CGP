"use client";

interface DiagnosticProgressProps {
  currentStep: number;
  totalSteps: number;
  dimensionLabel?: string;
}

export default function DiagnosticProgress({
  currentStep,
  totalSteps,
  dimensionLabel,
}: DiagnosticProgressProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const formattedStep = String(currentStep).padStart(2, "0");
  const formattedTotal = String(totalSteps).padStart(2, "0");

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <span className="font-display font-bold text-foreground text-sm sm:text-base">
            {formattedStep}{" "}
            <span className="text-muted font-normal text-xs sm:text-sm">
              / {formattedTotal}
            </span>
          </span>
          {dimensionLabel && (
            <>
              <span className="text-border">•</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-opal-redLight text-opal-red border border-opal-redBorder">
                {dimensionLabel}
              </span>
            </>
          )}
        </div>
        <span className="text-xs font-semibold text-muted">
          {percentage}% complété
        </span>
      </div>

      {/* Thin Red Progress Bar */}
      <div className="w-full h-1.5 bg-surface-200 rounded-full overflow-hidden border border-border/40">
        <div
          className="h-full bg-opal-red transition-all duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(200,16,46,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
