import {
  DiagnosticQuestion,
  DimensionKey,
  DIAGNOSTIC_QUESTIONS,
} from "./questions";
import {
  BottleneckInfo,
  BOTTLENECK_DETAILS,
  ProfileInfo,
  PROFILES,
} from "./profiles";

export interface UserAnswers {
  [questionId: number]: string; // questionId -> optionId or custom text
}

export interface DiagnosticResult {
  globalScore: number;
  dimensions: {
    structure: number;
    efficiency: number;
    capacity: number;
    visibility: number;
  };
  profile: ProfileInfo;
  primaryBottleneck: BottleneckInfo;
  bottleneckScore: number;
  sector: string;
  sectorOther?: string;
  freeTextAnswer?: string;
  observations: string[];
}

export function calculateDiagnosticScore(
  answers: UserAnswers,
  sectorData?: { sector: string; sectorOther?: string },
  freeTextAnswer?: string
): DiagnosticResult {
  const dimensionScores: Record<
    DimensionKey,
    { total: number; count: number }
  > = {
    structure: { total: 0, count: 0 },
    efficiency: { total: 0, count: 0 },
    capacity: { total: 0, count: 0 },
    visibility: { total: 0, count: 0 },
  };

  const observations: string[] = [];

  for (const q of DIAGNOSTIC_QUESTIONS) {
    if (q.type !== "single" || !q.dimension || !q.options) {
      continue;
    }

    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        dimensionScores[q.dimension].total += option.score;
        dimensionScores[q.dimension].count += 1;

        // Custom observations based on critical choices
        if (q.id === 2 && (selectedOptionId === "q2_tension" || selectedOptionId === "q2_block")) {
          observations.push("Une hausse d'activité soudaine mettrait immédiatement l'organisation sous tension critique.");
        }
        if (q.id === 3 && (selectedOptionId === "q3_tools_sheets" || selectedOptionId === "q3_many_scattered" || selectedOptionId === "q3_people_memory")) {
          observations.push("L'information opérationnelle est dispersée sur de multiples outils, créant des pertes de temps chronophages.");
        }
        if (q.id === 5 && (selectedOptionId === "q5_significant" || selectedOptionId === "q5_massive")) {
          observations.push("Une part majeure du temps de travail de l'équipe est absorbée par des tâches administratives sans valeur ajoutée.");
        }
        if (q.id === 7 && (selectedOptionId === "q7_many" || selectedOptionId === "q7_central")) {
          observations.push("Le dirigeant reste le point de passage obligé et le principal goulot d'étranglement de l'entreprise.");
        }
        if (q.id === 10 && (selectedOptionId === "q10_prob_not" || selectedOptionId === "q10_no")) {
          observations.push("Doubler votre nombre de clients aujourd'hui ferait exploser proportionnellement votre charge de travail.");
        }
      }
    }
  }

  const computeAvg = (dim: DimensionKey): number => {
    const { total, count } = dimensionScores[dim];
    return count > 0 ? Math.round(total / count) : 50;
  };

  const structure = computeAvg("structure");
  const efficiency = computeAvg("efficiency");
  const capacity = computeAvg("capacity");
  const visibility = computeAvg("visibility");

  // Weighted global score: Capacity and Efficiency are primary operational drivers
  const globalScore = Math.round(
    structure * 0.25 + efficiency * 0.25 + capacity * 0.3 + visibility * 0.2
  );

  // Profile determination
  let profile: ProfileInfo;
  if (globalScore < 40) {
    profile = PROFILES.tension;
  } else if (globalScore < 60) {
    profile = PROFILES.transition;
  } else if (globalScore < 80) {
    profile = PROFILES.structured;
  } else {
    profile = PROFILES.accelerate;
  }

  // Primary bottleneck: Dimension with the lowest score
  const dims: { key: DimensionKey; score: number }[] = [
    { key: "structure", score: structure },
    { key: "efficiency", score: efficiency },
    { key: "capacity", score: capacity },
    { key: "visibility", score: visibility },
  ];

  dims.sort((a, b) => a.score - b.score);
  const primaryBottleneckKey = dims[0].key;
  const primaryBottleneck = BOTTLENECK_DETAILS[primaryBottleneckKey];
  const bottleneckScore = dims[0].score;

  // Default observations fallback if none triggered
  if (observations.length === 0) {
    observations.push("Votre organisation est opérationnelle mais recèle d'importantes marges de structuration.");
    observations.push("La centralisation des données permettrait de libérer du temps pour les missions stratégiques.");
    observations.push("Une infrastructure logicielle adaptée permettra d'absorber une hausse d'activité sans surcharge.");
  }

  return {
    globalScore,
    dimensions: {
      structure,
      efficiency,
      capacity,
      visibility,
    },
    profile,
    primaryBottleneck,
    bottleneckScore,
    sector: sectorData?.sector || answers[1] || "Non spécifié",
    sectorOther: sectorData?.sectorOther,
    freeTextAnswer: freeTextAnswer || answers[12] || "",
    observations: observations.slice(0, 3),
  };
}
