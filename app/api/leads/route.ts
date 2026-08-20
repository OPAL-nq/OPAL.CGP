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

    let savedToSupabase = false;

    // 1. If Supabase is configured, insert lead in database
    if (supabase) {
      const { data, error } = await supabase.from("opal_leads").insert([
        {
          first_name: leadFirstName,
          last_name: leadLastName,
          email: leadEmail,
          phone: leadPhone,
          company: leadCompany,
          firm_name: leadCompany,
          sector: leadSector,
          sector_other: leadSectorOther,
          global_score: finalGlobalScore || null,
          structure_score: scores?.structure ?? result?.dimensions?.structure ?? null,
          efficiency_score: scores?.efficiency ?? result?.dimensions?.efficiency ?? null,
          capacity_score: scores?.capacity ?? result?.dimensions?.capacity ?? null,
          visibility_score: scores?.visibility ?? result?.dimensions?.visibility ?? null,
          profile_key: profile?.key || result?.profile?.key || null,
          profile_label: profile?.label || result?.profile?.label || null,
          bottleneck: bottleneck || result?.primaryBottleneck?.dimension || null,
          bottleneck_score: bottleneckScore || null,
          free_text_answer: freeTextAnswer || null,
          answers: answers || {},
          created_at: finalCreatedAt,
        },
      ]);

      if (!error) {
        savedToSupabase = true;
      } else {
        console.error("[Supabase Error inserting lead]:", error);
      }
    }

    // 2. Optional Webhook notification (Slack, Discord, Zapier, Make, Telegram)
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `🎯 **Nouveau Lead OPAL Diagnostic !**\n**Nom :** ${leadFirstName} ${leadLastName}\n**Email :** ${leadEmail}\n**Entreprise :** ${leadCompany}\n**Téléphone :** ${leadPhone || "Non renseigné"}\n**Secteur :** ${leadSector} ${leadSectorOther ? `(${leadSectorOther})` : ""}\n**Score :** ${finalGlobalScore}/100 (${profile?.label || ""})\n**Bottleneck :** ${bottleneck || ""}\n**Frein principal :** ${freeTextAnswer || "N/A"}`,
            lead: {
              firstName: leadFirstName,
              lastName: leadLastName,
              email: leadEmail,
              phone: leadPhone,
              company: leadCompany,
              sector: leadSector,
              sectorOther: leadSectorOther,
              globalScore: finalGlobalScore,
              profile: profile?.label,
              bottleneck,
              freeTextAnswer,
              createdAt: finalCreatedAt,
            },
          }),
        });
      } catch (webhookErr) {
        console.warn("[Webhook Notification Error]:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      savedToSupabase,
      note: savedToSupabase
        ? "Lead enregistré dans Supabase."
        : "Supabase non configuré. Lead sauvegardé localement.",
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
