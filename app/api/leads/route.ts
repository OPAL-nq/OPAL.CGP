import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead, answers, result, submittedAt } = body;

    if (!lead || !lead.email || !lead.firstName) {
      return NextResponse.json(
        { error: "Données de contact incomplètes" },
        { status: 400 }
      );
    }

    // If Supabase is configured, insert lead in database
    if (supabase) {
      const { data, error } = await supabase.from("opal_leads").insert([
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
          created_at: submittedAt || new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("[Supabase Error inserting lead]:", error);
        return NextResponse.json(
          { success: true, savedToSupabase: false, message: error.message },
          { status: 200 }
        );
      }

      return NextResponse.json({
        success: true,
        savedToSupabase: true,
        data,
      });
    }

    // Supabase not configured yet -> return success (client keeps localStorage backup)
    return NextResponse.json({
      success: true,
      savedToSupabase: false,
      note: "Supabase credentials not set. Lead saved locally.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur interne";
    console.error("[API leads error]:", err);
    return NextResponse.json(
      { error: message, success: false },
      { status: 500 }
    );
  }
}
