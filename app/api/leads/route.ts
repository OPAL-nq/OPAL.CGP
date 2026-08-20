import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      sector,
      sectorOther,
      answers,
      scores,
      globalScore,
      profile,
      bottleneck,
      bottleneckScore,
      freeTextAnswer,
      createdAt,
      // Legacy payload support
      lead,
      result,
      submittedAt,
    } = body;

    const leadFirstName = firstName || lead?.firstName;
    const leadLastName = lastName || lead?.lastName;
    const leadEmail = email || lead?.email;
    const leadCompany = company || lead?.company || lead?.firmName;
    const leadPhone = phone || lead?.phone || "";
    const leadSector = sector || lead?.sector || "Non spécifié";
    const leadSectorOther = sectorOther || lead?.sectorOther || "";
    const finalGlobalScore = globalScore !== undefined ? globalScore : result?.globalScore;
    const finalCreatedAt = createdAt || submittedAt || new Date().toISOString();

    if (!leadEmail || !leadFirstName) {
      return NextResponse.json(
        { error: "Données de contact professionnelles incomplètes" },
        { status: 400 }
      );
    }

    // If Supabase is configured, insert lead in database
    if (supabase) {
      const { data, error } = await supabase.from("opal_leads").insert([
        {
          first_name: leadFirstName,
          last_name: leadLastName,
          email: leadEmail,
          phone: leadPhone,
          company: leadCompany,
          firm_name: leadCompany, // backwards compatibility
          sector: leadSector,
          sector_other: leadSectorOther,
          global_score: finalGlobalScore || null,
          structure_score: scores?.structure ?? result?.dimensions?.organization ?? null,
          efficiency_score: scores?.efficiency ?? result?.dimensions?.operationalEfficiency ?? null,
          capacity_score: scores?.capacity ?? result?.dimensions?.commercialCapacity ?? null,
          visibility_score: scores?.visibility ?? result?.dimensions?.growthCapacity ?? null,
          profile_key: profile?.key || result?.profile?.key || null,
          profile_label: profile?.label || result?.profile?.label || null,
          bottleneck: bottleneck || result?.primaryBottleneck?.dimension || null,
          bottleneck_score: bottleneckScore || null,
          free_text_answer: freeTextAnswer || null,
          answers: answers || {},
          created_at: finalCreatedAt,
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

    // Supabase credentials not set yet -> return success (client keeps localStorage backup)
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
