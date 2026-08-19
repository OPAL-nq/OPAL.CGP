import { DimensionKey, QUIZ_QUESTIONS } from "./questions";

export interface UserAnswers {
  [questionId: number]: string; // questionId -> optionId
}

export type ProfileKey =
  | "tension"
  | "transition"
  | "structured"
  | "accelerate";

export interface ProfileInfo {
  key: ProfileKey;
  label: string;
  badge: string;
  headline: string;
  summary: string;
  colorClass: string;
}

export interface BottleneckInfo {
  dimension: DimensionKey;
  label: string;
  headline: string;
  description: string;
  consequences: string[];
  recommendations: string[];
}

export interface DiagnosticResult {
  globalScore: number;
  dimensions: {
    commercialCapacity: number;
    organization: number;
    operationalEfficiency: number;
    growthCapacity: number;
  };
  profile: ProfileInfo;
  primaryBottleneck: BottleneckInfo;
  observations: string[];
}

export const PROFILES: Record<ProfileKey, ProfileInfo> = {
  tension: {
    key: "tension",
    label: "Cabinet sous tension",
    badge: "Indice 0–39 / 100",
    headline: "Friction opérationnelle critique — Croissance bloquante",
    summary:
      "Votre cabinet fonctionne à flux tendu. La quasi-totalité du développement commercial génère immédiatement une charge disproportionnée pour le dirigeant et l'équipe.",
    colorClass: "text-amber-700 bg-amber-50 border-amber-200",
  },
  transition: {
    key: "transition",
    label: "Cabinet en transition",
    badge: "Indice 40–59 / 100",
    headline: "Capacité limitée par la structure et la dispersion",
    summary:
      "Votre cabinet possède une réelle valeur de conseil et une bonne traction, mais l'organisation actuelle absorbe une part trop importante de votre énergie dans le suivi administratif.",
    colorClass: "text-orange-700 bg-orange-50 border-orange-200",
  },
  structured: {
    key: "structured",
    label: "Cabinet structuré",
    badge: "Indice 60–79 / 100",
    headline: "Fondations solides — Fort levier d'optimisation",
    summary:
      "Votre cabinet est bien géré mais des goulets d'étranglement précis limitent encore la fluidité lors des montées en charge. Une standardisation ciblée vous permettra de doubler sans friction.",
    colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  accelerate: {
    key: "accelerate",
    label: "Cabinet prêt à accélérer",
    badge: "Indice 80–100 / 100",
    headline: "Excellente maturité — Capacité d'absorption maximale",
    summary:
      "Votre cabinet dispose d'une organisation très robuste. Vous êtes dans les conditions idéales pour accélérer votre acquisition client et vos encours sans dégrader votre qualité de conseil.",
    colorClass: "text-red-700 bg-red-50 border-red-200",
  },
};

export const BOTTLENECK_DETAILS: Record<DimensionKey, BottleneckInfo> = {
  commercialCapacity: {
    dimension: "commercialCapacity",
    label: "Capacité commerciale & Conseil",
    headline: "Votre temps de conseil est absorbé par la gestion amont",
    description:
      "Votre cabinet peine à libérer du temps pour les rendez-vous à haute valeur ajoutée car la préparation et la charge périphérique consomment une part excessive de votre semaine.",
    consequences: [
      "Plafond de verre sur le nombre de clients suivis personnellement",
      "Perte d'opportunités de conseil et de développement d'encours",
      "Sensation de courir après les dossiers plutôt que d'anticiper",
    ],
    recommendations: [
      "Sanctuariser les plages de conseil en automatisant la préparation documentaire",
      "Établir une fiche de synthèse client standardisée accessible en 1 clic",
    ],
  },
  organization: {
    dimension: "organization",
    label: "Organisation & Centralisation",
    headline: "L'information est dispersée et dépend trop des personnes",
    description:
      "Les données clients, pièces et historiques sont fragmentés entre plusieurs outils. La reprise d'un dossier par un collaborateur exige des explications orales ou des recherches chronophages.",
    consequences: [
      "Dépendance extrême à la présence et à la mémoire du dirigeant",
      "Temps perdu à chercher des pièces et vérifier l'état d'avancement",
      "Difficulté à intégrer rapidement de nouveaux collaborateurs",
    ],
    recommendations: [
      "Centraliser le dossier opérationnel unique du cabinet",
      "Standardiser les check-lists d'onboarding et de révision patrimoniale",
    ],
  },
  operationalEfficiency: {
    dimension: "operationalEfficiency",
    label: "Efficience opérationnelle & Relances",
    headline: "Les relances et allers-retours administratifs freinent vos dossiers",
    description:
      "Une part substantielle du temps de l'équipe est absorbée par la récupération de pièces manquantes et les relances manuelles auprès des clients et partenaires.",
    consequences: [
      "Allongement des délais de finalisation des dossiers",
      "Charge mentale continue sur le statut des pièces en attente",
      "Friction perçue par le client face à des demandes répétées",
    ],
    recommendations: [
      "Structurer le suivi des pièces avec vue directe sur les blocages",
      "Fluidifier les points de contact clients avec un suivi visuel des étapes",
    ],
  },
  growthCapacity: {
    dimension: "growthCapacity",
    label: "Capacité de croissance & Scalabilité",
    headline: "Le cabinet absorbe difficilement les hausses de volume",
    description:
      "L'infrastructure actuelle ne permet pas d'accueillir +50% de dossiers sans créer de tensions immédiates sur la charge de travail et la qualité d'exécution.",
    consequences: [
      "Risque de dégradation de la qualité de service en cas d'afflux de clients",
      "Le dirigeant devient le goulot d'étranglement de toute l'activité",
      "Incapacité à déléguer sereinement sans contrôle permanent",
    ],
    recommendations: [
      "Rendre les processus indépendants des individus grâce à des workflows clairs",
      "Découpler la croissance du chiffre d'affaires du temps de travail du dirigeant",
    ],
  },
};

export function calculateDiagnosticScore(answers: UserAnswers): DiagnosticResult {
  const dimensionScores: Record<DimensionKey, { total: number; count: number }> = {
    commercialCapacity: { total: 0, count: 0 },
    organization: { total: 0, count: 0 },
    operationalEfficiency: { total: 0, count: 0 },
    growthCapacity: { total: 0, count: 0 },
  };

  const observations: string[] = [];

  for (const q of QUIZ_QUESTIONS) {
    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        dimensionScores[q.dimension].total += option.score;
        dimensionScores[q.dimension].count += 1;

        // Custom observations for significant friction points
        if (q.id === 5 && (selectedOptionId === "q5_c" || selectedOptionId === "q5_d")) {
          observations.push("L'information client est dispersée sur 5 outils ou plus, créant une friction constante.");
        }
        if (q.id === 7 && (selectedOptionId === "q7_c" || selectedOptionId === "q7_d")) {
          observations.push("Une demi-journée ou plus est engloutie chaque semaine dans la récupération de pièces et relances.");
        }
        if (q.id === 11 && (selectedOptionId === "q11_c" || selectedOptionId === "q11_d")) {
          observations.push("La transmission du savoir-faire repose quasi-exclusivement sur le dirigeant.");
        }
        if (q.id === 1 && (selectedOptionId === "q1_c" || selectedOptionId === "q1_d")) {
          observations.push("Un afflux soudain de prospects mettrait immédiatement l'organisation sous tension.");
        }
      }
    }
  }

  const computeAvg = (dim: DimensionKey): number => {
    const { total, count } = dimensionScores[dim];
    return count > 0 ? Math.round(total / count) : 50;
  };

  const commercialCapacity = computeAvg("commercialCapacity");
  const organization = computeAvg("organization");
  const operationalEfficiency = computeAvg("operationalEfficiency");
  const growthCapacity = computeAvg("growthCapacity");

  const globalScore = Math.round(
    (commercialCapacity + organization + operationalEfficiency + growthCapacity) / 4
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

  // Primary bottleneck: Dimension with lowest score
  const dims: { key: DimensionKey; score: number }[] = [
    { key: "organization", score: organization },
    { key: "operationalEfficiency", score: operationalEfficiency },
    { key: "commercialCapacity", score: commercialCapacity },
    { key: "growthCapacity", score: growthCapacity },
  ];

  dims.sort((a, b) => a.score - b.score);
  const primaryBottleneckKey = dims[0].key;
  const primaryBottleneck = BOTTLENECK_DETAILS[primaryBottleneckKey];

  // Default observations if none triggered
  if (observations.length === 0) {
    observations.push("Votre organisation actuelle est opérationnelle mais possède des marges de standardisation.");
    observations.push("Les processus peuvent être fluidifiés pour réduire la dépendance aux relances manuelles.");
    observations.push("Une centralisation unifiée permettrait d'absorber une hausse d'activité sans surcoût.");
  }

  return {
    globalScore,
    dimensions: {
      commercialCapacity,
      organization,
      operationalEfficiency,
      growthCapacity,
    },
    profile,
    primaryBottleneck,
    observations: observations.slice(0, 3),
  };
}
