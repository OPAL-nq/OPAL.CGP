export type DimensionKey =
  | "commercialCapacity"
  | "organization"
  | "operationalEfficiency"
  | "growthCapacity";

export interface AnswerOption {
  id: string;
  label: string;
  score: number; // 0 to 100 scale contribution
}

export interface QuizQuestion {
  id: number;
  dimension: DimensionKey;
  dimensionLabel: string;
  question: string;
  options: AnswerOption[];
}

export const DIMENSIONS: Record<
  DimensionKey,
  { label: string; shortLabel: string; description: string }
> = {
  commercialCapacity: {
    label: "Capacité commerciale",
    shortLabel: "Commercial",
    description: "Capacité à convertir et délivrer du conseil à forte valeur ajoutée sans blocage initial.",
  },
  organization: {
    label: "Organisation & Centralisation",
    shortLabel: "Organisation",
    description: "Structure documentaire, fluidité d'accès aux données et standardisation des méthodes.",
  },
  operationalEfficiency: {
    label: "Efficacité opérationnelle",
    shortLabel: "Efficacité",
    description: "Allègement des tâches administratives, réactivité des relances et pilotage temps réel.",
  },
  growthCapacity: {
    label: "Capacité de croissance",
    shortLabel: "Croissance",
    description: "Aptitude à absorber +50% à 2x de volume et déléguer sans surcharger le dirigeant.",
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // DIMENSION 1 — CAPACITÉ COMMERCIALE (Q1 - Q3)
  {
    id: 1,
    dimension: "commercialCapacity",
    dimensionLabel: "Capacité commerciale",
    question:
      "Si vous receviez demain 20 nouveaux prospects qualifiés, pourriez-vous réellement les absorber sans modifier votre organisation actuelle ?",
    options: [
      { id: "q1_a", label: "Sans problème", score: 100 },
      { id: "q1_b", label: "Oui, mais avec quelques ajustements", score: 70 },
      { id: "q1_c", label: "Ce serait compliqué", score: 35 },
      { id: "q1_d", label: "Non, notre organisation ne le permettrait pas", score: 10 },
    ],
  },
  {
    id: 2,
    dimension: "commercialCapacity",
    dimensionLabel: "Capacité commerciale",
    question:
      "Quelle proportion de votre semaine est aujourd'hui consacrée à des rendez-vous à forte valeur ajoutée plutôt qu'à la préparation, au suivi ou à l'administratif ?",
    options: [
      { id: "q2_a", label: "La majorité", score: 100 },
      { id: "q2_b", label: "Environ la moitié", score: 65 },
      { id: "q2_c", label: "Moins de la moitié", score: 35 },
      { id: "q2_d", label: "Une faible partie", score: 10 },
    ],
  },
  {
    id: 3,
    dimension: "commercialCapacity",
    dimensionLabel: "Capacité commerciale",
    question:
      "Votre cabinet pourrait-il augmenter significativement le nombre de rendez-vous clients sans augmenter proportionnellement les heures de travail de l'équipe ?",
    options: [
      { id: "q3_a", label: "Oui clairement", score: 100 },
      { id: "q3_b", label: "Probablement", score: 70 },
      { id: "q3_c", label: "Difficilement", score: 35 },
      { id: "q3_d", label: "Non", score: 10 },
    ],
  },

  // DIMENSION 2 — ORGANISATION (Q4 - Q6)
  {
    id: 4,
    dimension: "organization",
    dimensionLabel: "Organisation",
    question:
      "Lorsqu'un collaborateur reprend un dossier, peut-il comprendre rapidement où en est le client, ce qui manque et ce qui doit être fait ?",
    options: [
      { id: "q4_a", label: "Oui, immédiatement", score: 100 },
      { id: "q4_b", label: "Généralement", score: 70 },
      { id: "q4_c", label: "Cela dépend du dossier", score: 35 },
      { id: "q4_d", label: "Non, il faut souvent demander", score: 10 },
    ],
  },
  {
    id: 5,
    dimension: "organization",
    dimensionLabel: "Organisation",
    question:
      "Combien d'endroits différents utilisez-vous actuellement pour retrouver les informations nécessaires à un dossier client ?",
    options: [
      { id: "q5_a", label: "1 à 2", score: 100 },
      { id: "q5_b", label: "3 à 4", score: 65 },
      { id: "q5_c", label: "5 à 6", score: 35 },
      { id: "q5_d", label: "Plus de 6", score: 10 },
    ],
  },
  {
    id: 6,
    dimension: "organization",
    dimensionLabel: "Organisation",
    question:
      "Vos processus clés sont-ils réellement standardisés ou reposent-ils encore largement sur les habitudes de chaque collaborateur ?",
    options: [
      { id: "q6_a", label: "Très standardisés", score: 100 },
      { id: "q6_b", label: "Plutôt standardisés", score: 70 },
      { id: "q6_c", label: "Partiellement", score: 35 },
      { id: "q6_d", label: "Principalement dépendants des personnes", score: 10 },
    ],
  },

  // DIMENSION 3 — EFFICACITÉ OPÉRATIONNELLE (Q7 - Q9)
  {
    id: 7,
    dimension: "operationalEfficiency",
    dimensionLabel: "Efficacité opérationnelle",
    question:
      "Combien de temps votre équipe consacre-t-elle chaque semaine aux relances, à la récupération de pièces et au suivi administratif des dossiers ?",
    options: [
      { id: "q7_a", label: "Très peu", score: 100 },
      { id: "q7_b", label: "Quelques heures", score: 70 },
      { id: "q7_c", label: "Une demi-journée ou plus", score: 35 },
      { id: "q7_d", label: "Une part importante de la semaine", score: 10 },
    ],
  },
  {
    id: 8,
    dimension: "operationalEfficiency",
    dimensionLabel: "Efficacité opérationnelle",
    question:
      "Combien d'allers-retours sont généralement nécessaires avant qu'un dossier client soit réellement complet ?",
    options: [
      { id: "q8_a", label: "Très peu", score: 100 },
      { id: "q8_b", label: "Quelques-uns", score: 70 },
      { id: "q8_c", label: "Régulièrement beaucoup", score: 30 },
      { id: "q8_d", label: "Cela varie fortement selon les dossiers", score: 25 },
    ],
  },
  {
    id: 9,
    dimension: "operationalEfficiency",
    dimensionLabel: "Efficacité opérationnelle",
    question:
      "Lorsque plusieurs dossiers avancent simultanément, avez-vous une vision immédiate de ceux qui nécessitent votre attention ?",
    options: [
      { id: "q9_a", label: "Oui", score: 100 },
      { id: "q9_b", label: "Généralement", score: 70 },
      { id: "q9_c", label: "Partiellement", score: 35 },
      { id: "q9_d", label: "Non", score: 10 },
    ],
  },

  // DIMENSION 4 — CAPACITÉ DE CROISSANCE (Q10 - Q12)
  {
    id: 10,
    dimension: "growthCapacity",
    dimensionLabel: "Capacité de croissance",
    question:
      "Si votre nombre de clients augmentait de 50 % dans les 12 prochains mois, votre organisation actuelle pourrait-elle suivre ?",
    options: [
      { id: "q10_a", label: "Oui", score: 100 },
      { id: "q10_b", label: "Probablement", score: 70 },
      { id: "q10_c", label: "Difficilement", score: 35 },
      { id: "q10_d", label: "Non", score: 10 },
    ],
  },
  {
    id: 11,
    dimension: "growthCapacity",
    dimensionLabel: "Capacité de croissance",
    question:
      "Votre cabinet peut-il intégrer un nouveau collaborateur sans que vous deviez personnellement lui transmettre une grande partie du fonctionnement du cabinet ?",
    options: [
      { id: "q11_a", label: "Oui", score: 100 },
      { id: "q11_b", label: "Avec quelques explications", score: 70 },
      { id: "q11_c", label: "Difficilement", score: 35 },
      { id: "q11_d", label: "Non", score: 10 },
    ],
  },
  {
    id: 12,
    dimension: "growthCapacity",
    dimensionLabel: "Capacité de croissance",
    question:
      "Qu'est-ce qui limite aujourd'hui le plus votre capacité à développer votre cabinet ?",
    options: [
      { id: "q12_time", label: "Le temps", score: 40 },
      { id: "q12_org", label: "L'organisation", score: 30 },
      { id: "q12_followup", label: "Le suivi des dossiers", score: 35 },
      { id: "q12_admin", label: "L'administratif", score: 30 },
      { id: "q12_vis", label: "Le manque de visibilité", score: 35 },
      { id: "q12_team", label: "Le manque de collaborateurs", score: 50 },
      { id: "q12_other", label: "Autre", score: 50 },
    ],
  },
];
