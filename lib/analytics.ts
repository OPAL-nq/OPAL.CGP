export type AnalyticsEvent =
  | "landing_view"
  | "hero_cta_click"
  | "quiz_started"
  | "quiz_question_answered"
  | "quiz_completed"
  | "lead_submitted"
  | "diagnostic_viewed"
  | "calendly_opened"
  | "calendly_clicked";

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
