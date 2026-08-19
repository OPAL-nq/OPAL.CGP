import { DiagnosticResult, UserAnswers } from "./scoring";
import { supabase } from "@/lib/supabase";

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  firmName: string;
}

export interface LeadSubmissionPayload {
  lead: LeadData;
  answers: UserAnswers;
  result: DiagnosticResult;
  submittedAt: string;
}

/**
 * Submit lead with diagnostic results.
 * Persists locally and syncs with Supabase (both via API route and direct client fallback).
 */
export async function submitLead(
  lead: LeadData,
  answers: UserAnswers,
  result: DiagnosticResult
): Promise<{ success: boolean; id: string; savedToSupabase?: boolean }> {
  const payload: LeadSubmissionPayload = {
    lead,
    answers,
    result,
    submittedAt: new Date().toISOString(),
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

  // 2. Sync to Supabase
  let savedToSupabase = false;

  // Try API route first
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

  // Direct client-side Supabase insertion fallback (runs in browser)
  if (!savedToSupabase && supabase && typeof window !== "undefined") {
    try {
      const { error } = await supabase.from("opal_leads").insert([
        {
          first_name: lead.firstName,
          last_name: lead.lastName,
          email: lead.email,
          firm_name: lead.firmName,
          global_score: result?.globalScore || null,
          commercial_score: result?.dimensions?.commercialCapacity || null,
          organization_score: result?.dimensions?.organization || null,
          efficiency_score: result?.dimensions?.operationalEfficiency || null,
          growth_score: result?.dimensions?.growthCapacity || null,
          profile_key: result?.profile?.key || null,
          profile_label: result?.profile?.label || null,
          bottleneck: result?.primaryBottleneck?.dimension || null,
          answers: answers || {},
          created_at: payload.submittedAt,
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
