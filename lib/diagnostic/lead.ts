import { DiagnosticResult, UserAnswers } from "./scoring";
import { supabase } from "@/lib/supabase";

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  sector: string;
  sectorOther?: string;
}

export interface LeadSubmissionPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  sector: string;
  sectorOther?: string;
  answers: UserAnswers;
  scores: {
    structure: number;
    efficiency: number;
    capacity: number;
    visibility: number;
  };
  globalScore: number;
  profile: {
    key: string;
    label: string;
    badge: string;
  };
  bottleneck: string;
  bottleneckScore: number;
  freeTextAnswer?: string;
  createdAt: string;
}

/**
 * Submit lead with diagnostic results.
 * Persists locally in localStorage and syncs with Supabase API route.
 */
export async function submitLead(
  lead: LeadData,
  answers: UserAnswers,
  result: DiagnosticResult
): Promise<{ success: boolean; id: string; savedToSupabase?: boolean }> {
  const payload: LeadSubmissionPayload = {
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone || "",
    company: lead.company,
    sector: lead.sector,
    sectorOther: lead.sectorOther || "",
    answers,
    scores: result.dimensions,
    globalScore: result.globalScore,
    profile: {
      key: result.profile.key,
      label: result.profile.label,
      badge: result.profile.badge,
    },
    bottleneck: result.primaryBottleneck.dimension,
    bottleneckScore: result.bottleneckScore,
    freeTextAnswer: result.freeTextAnswer || answers[12] || "",
    createdAt: new Date().toISOString(),
  };

  // 1. Local storage backup
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem("opal_leads") || "[]");
      existing.push(payload);
      localStorage.setItem("opal_leads", JSON.stringify(existing));
      localStorage.setItem("opal_current_lead", JSON.stringify(payload));
    } catch (e) {
      console.warn("Could not save lead to localStorage", e);
    }
  }

  // 2. Sync to Supabase via API route
  let savedToSupabase = false;

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      savedToSupabase = !!data.savedToSupabase;
    }
  } catch (err) {
    console.warn("API route sync attempt:", err);
  }

  // 3. Fallback direct client-side insertion if supabase is initialized and API didn't save
  if (!savedToSupabase && supabase && typeof window !== "undefined") {
    try {
      const { error } = await supabase.from("opal_leads").insert([
        {
          first_name: payload.firstName,
          last_name: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          company: payload.company,
          firm_name: payload.company, // backwards compatibility
          sector: payload.sector,
          sector_other: payload.sectorOther,
          global_score: payload.globalScore,
          structure_score: payload.scores.structure,
          efficiency_score: payload.scores.efficiency,
          capacity_score: payload.scores.capacity,
          visibility_score: payload.scores.visibility,
          profile_key: payload.profile.key,
          profile_label: payload.profile.label,
          bottleneck: payload.bottleneck,
          bottleneck_score: payload.bottleneckScore,
          free_text_answer: payload.freeTextAnswer,
          answers: payload.answers,
          created_at: payload.createdAt,
        },
      ]);
      if (!error) {
        savedToSupabase = true;
      }
    } catch (clientErr) {
      console.warn("Client Supabase insertion attempt:", clientErr);
    }
  }

  return {
    success: true,
    savedToSupabase,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  };
}
