export type AnalyticsEvent =
  | "landing_view"
  | "header_cta_click"
  | "hero_cta_click"
  | "hero_scroll_click"
  | "problem_section_cta_click"
  | "problem_stage_clicked"
  | "diagnostic_section_cta_click"
  | "final_cta_click"
  | "diagnostic_started"
  | "diagnostic_restarted"
  | "diagnostic_question_answered"
  | "diagnostic_freetext_submitted"
  | "diagnostic_questions_completed"
  | "lead_submitted"
  | "diagnostic_result_viewed"
  | "result_cta_click"
  | "calendly_modal_opened"
  | "calendly_opened"
  | "calendly_clicked"
  // Legacy events support
  | "quiz_started"
  | "quiz_question_answered"
  | "quiz_completed"
  | "diagnostic_viewed";

export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, unknown>
) {
  if (typeof window !== "undefined") {
    // Dispatch custom DOM event for external trackers (GTM, Meta, etc.)
    const customEvent = new CustomEvent("opal_analytics", {
      detail: { event, properties, timestamp: Date.now() },
    });
    window.dispatchEvent(customEvent);

    if (process.env.NODE_ENV === "development") {
      console.log(`[OPAL Analytics] ${event}:`, properties || {});
    }
  }
}
