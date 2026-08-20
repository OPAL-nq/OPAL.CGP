export type DimensionKey =
  | "structure"
  | "efficiency"
  | "capacity"
  | "visibility";

export interface AnswerOption {
  id: string;
  label: string;
  score: number; // 0 to 100 contribution
}

export interface DiagnosticQuestion {
  id: number;
  type: "single" | "sector" | "freetext";
  dimension?: DimensionKey;
  dimensionLabel?: string;
  title: string;
  subtitle?: string;
  options?: AnswerOption[];
  isHighlighted?: boolean;
  placeholder?: string;
}

export const DIMENSIONS: Record<
  DimensionKey,
  { label: string; shortLabel: string; description: string }
> = {
  structure: {
    label: "Structure & Processus",
    shortLabel: "Structure",
    description:
      "Standardisation des méthodes, documentation des processus et indépendance opérationnelle vis-à-vis des individus.",
  },
  efficiency: {
    label: "Efficacité Opérationnelle",
    shortLabel: "Efficacité",
    description:
      "Réduction de la charge administrative, fin de la dispersion des outils et élimination des tâches chronophages.",
  },
  capacity: {
    label: "Capacité d'Absorption",
    shortLabel: "Capacité",
    description:
      "Aptitude à accueillir 2× plus de clients, autonomie de l'équipe et découplage entre croissance et temps dirigeant.",
  },
  visibility: {
    label: "Visibilité & Pilotage",
    shortLabel: "Visibilité",
    description:
      "Accès instantané à l'information clé, pilotage en temps réel et suivi limpide des dossiers et de l'activité.",
  },
};

export const SECTOR_OPTIONS = [
  { id: "cgp", label: "Conseil en gestion de patrimoine / CGP" },
  { id: "immo", label: "Immobilier / Agence immobilière" },
  { id: "assurance", label: "Assurance" },
  { id: "courtage", label: "Courtage" },
  { id: "avocat", label: "Droit / Avocat / Cabinet juridique" },
  { id: "notaire", label: "Notariat / Notaire" },
  { id: "comptabilite", label: "Expertise-comptable / Comptabilité" },
  { id: "conseil", label: "Conseil / Société de services" },
  { id: "autre", label: "Mon secteur n'est pas dans la liste" },
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // QUESTION 1 — SECTEUR D'ACTIVITÉ
  {
    id: 1,
    type: "sector",
    title: "Dans quel secteur évolue votre entreprise ?",
    subtitle:
      "Cette information nous permet de contextualiser immédiatement votre diagnostic opérationnel.",
  },

  // QUESTION 2 — CROISSANCE (DIMENSION: CAPACITÉ)
  {
    id: 2,
    type: "single",
    dimension: "capacity",
    dimensionLabel: "Capacité & Croissance",
    title: "Si votre nombre de clients augmentait de 50 % demain, que se passerait-il ?",
    subtitle: "Sélectionnez la situation qui décrit le mieux votre réalité.",
    options: [
      { id: "q2_fluid", label: "Aucun changement majeur, notre organisation l'absorberait de manière fluide", score: 100 },
      { id: "q2_manageable", label: "Une charge supplémentaire, mais gérable avec quelques ajustements", score: 75 },
      { id: "q2_recruit", label: "Nous devrions impérativement recruter pour absorber le volume", score: 45 },
      { id: "q2_tension", label: "Notre organisation serait rapidement sous tension et désorganisée", score: 20 },
      { id: "q2_block", label: "Nous aurions de grandes difficultés à absorber ce volume sans dégrader notre service", score: 5 },
    ],
  },

  // QUESTION 3 — OUTILS (DIMENSION: EFFICACITÉ)
  {
    id: 3,
    type: "single",
    dimension: "efficiency",
    dimensionLabel: "Efficacité & Outils",
    title: "Aujourd'hui, où se trouve l'information dont votre équipe a besoin pour travailler ?",
    subtitle: "Évaluation de la centralisation de vos données métier.",
    options: [
      { id: "q3_one", label: "Principalement réunie dans un seul environnement métier structuré", score: 100 },
      { id: "q3_few_synced", label: "Dans quelques logiciels spécialisés qui fonctionnent correctement ensemble", score: 75 },
      { id: "q3_tools_sheets", label: "Dans plusieurs logiciels différents + des fichiers Excel / Google Sheets", score: 45 },
      { id: "q3_many_scattered", label: "Dans beaucoup d'outils différents, boîtes mail et dossiers réseau", score: 20 },
      { id: "q3_people_memory", label: "Une grande partie de l'information clé repose encore sur la mémoire des personnes", score: 5 },
    ],
  },

  // QUESTION 4 — PROCESSUS (DIMENSION: STRUCTURE)
  {
    id: 4,
    type: "single",
    dimension: "structure",
    dimensionLabel: "Structure & Processus",
    title: "À quel point vos processus métier sont-ils réellement standardisés ?",
    subtitle: "Transmission du savoir-faire et reproductibilité des opérations.",
    options: [
      { id: "q4_high", label: "Très standardisés : un nouveau collaborateur est autonome rapidement grâce aux workflows", score: 100 },
      { id: "q4_documented", label: "Les principaux processus sont documentés, mais certaines exceptions subsistent", score: 75 },
      { id: "q4_partial", label: "Certaines choses sont bien structurées, d'autres reposent sur l'habitude", score: 45 },
      { id: "q4_habits", label: "Beaucoup de processus reposent sur la façon de faire individuelle de chacun", score: 20 },
      { id: "q4_feeling", label: "Une grande partie fonctionne encore 'au feeling' et à l'expérience orale", score: 5 },
    ],
  },

  // QUESTION 5 — ADMINISTRATIF (DIMENSION: EFFICACITÉ)
  {
    id: 5,
    type: "single",
    dimension: "efficiency",
    dimensionLabel: "Efficacité & Charge",
    title: "Quelle part du temps de votre équipe est consacrée à des tâches administratives et répétitives ?",
    subtitle: "Recherche de pièces, ressaisie de données, relances manuelles...",
    options: [
      { id: "q5_very_low", label: "Très peu : les tâches périphériques sont automatisées ou ultra-fluides", score: 100 },
      { id: "q5_few_hours", label: "Quelques heures par semaine et par personne", score: 75 },
      { id: "q5_half_day", label: "Une demi-journée par semaine environ par collaborateur", score: 45 },
      { id: "q5_significant", label: "Plusieurs heures par jour consacrées à des manipulations administratives", score: 20 },
      { id: "q5_massive", label: "Une part majeure de notre temps de travail est absorbée par l'administratif", score: 5 },
    ],
  },

  // QUESTION 6 — DOSSIERS / CLIENTS (DIMENSION: STRUCTURE)
  {
    id: 6,
    type: "single",
    dimension: "structure",
    dimensionLabel: "Structure des Dossiers",
    title: "Lorsque le volume de dossiers augmente, qu'est-ce qui devient généralement le plus difficile ?",
    subtitle: "Comportement du système face à la densification des opérations.",
    options: [
      { id: "q6_smooth", label: "Tout reste fluide grâce à nos statuts et étapes standardisées", score: 100 },
      { id: "q6_minor_friction", label: "Le suivi demande un peu plus d'attention mais reste sous contrôle", score: 75 },
      { id: "q6_coordination", label: "La coordination de l'équipe et le suivi des pièces deviennent plus complexes", score: 45 },
      { id: "q6_constant_check", label: "Il faut constamment vérifier où en sont les dossiers pour éviter les retards", score: 20 },
      { id: "q6_bottleneck", label: "Les dossiers s'accumulent et créent un véritable goulot d'étranglement", score: 5 },
    ],
  },

  // QUESTION 7 — DIRIGEANT (DIMENSION: CAPACITY)
  {
    id: 7,
    type: "single",
    dimension: "capacity",
    dimensionLabel: "Rôle du Dirigeant",
    title: "Combien de sujets opérationnels nécessitent encore directement votre intervention ?",
    subtitle: "Niveau d'indépendance de l'organisation vis-à-vis du dirigeant.",
    options: [
      { id: "q7_strategic", label: "Mon rôle est quasi-exclusivement stratégique et commercial", score: 100 },
      { id: "q7_some", label: "J'interviens uniquement sur certains dossiers clés ou arbitrages complexes", score: 75 },
      { id: "q7_regular", label: "Je dois régulièrement débloquer des situations et répondre aux questions de l'équipe", score: 45 },
      { id: "q7_many", label: "Une grande majorité des décisions et validations passent encore par moi", score: 20 },
      { id: "q7_central", label: "Sans moi au quotidien, l'activité et le traitement des dossiers ralentissent fortement", score: 5 },
    ],
  },

  // QUESTION 8 — EXPÉRIENCE CLIENT (DIMENSION: STRUCTURE)
  {
    id: 8,
    type: "single",
    dimension: "structure",
    dimensionLabel: "Expérience & Qualité",
    title: "Votre niveau de qualité et d'expérience client reste-t-il identique en forte hausse d'activité ?",
    subtitle: "Régularité du service délivré sous pression.",
    options: [
      { id: "q8_identical", label: "L'expérience reste strictement identique quelle que soit la charge", score: 100 },
      { id: "q8_minor", label: "Quelques légers délais peuvent apparaître mais la qualité reste stable", score: 75 },
      { id: "q8_followup_hard", label: "Le suivi devient plus difficile et les délais de réponse s'allongent", score: 45 },
      { id: "q8_variable", label: "La qualité commence à varier selon la charge de chaque collaborateur", score: 20 },
      { id: "q8_degraded", label: "Nous risquons de dégrader l'expérience client et de générer de l'insatisfaction", score: 5 },
    ],
  },

  // QUESTION 9 — VISIBILITÉ (DIMENSION: VISIBILITÉ)
  {
    id: 9,
    type: "single",
    dimension: "visibility",
    dimensionLabel: "Visibilité & Pilotage",
    title: "À quel point est-il facile aujourd'hui d'obtenir une vision claire de ce qui se passe dans votre entreprise ?",
    subtitle: "État d'avancement des dossiers, priorités du jour, blocages.",
    options: [
      { id: "q9_immediate", label: "Immédiat : un tableau de bord consolidé nous donne la vue en temps réel", score: 100 },
      { id: "q9_good", label: "Bonne visibilité, même si nous devons parfois recouper 2 ou 3 sources", score: 75 },
      { id: "q9_fragmented", label: "Correcte mais dispersée : il faut poser des questions pour savoir où en sont les choses", score: 45 },
      { id: "q9_hard", label: "Difficile : nous manquons de visibilité sur les dossiers en souffrance", score: 20 },
      { id: "q9_blind", label: "Nous naviguons à vue et découvrons souvent les problèmes a posteriori", score: 5 },
    ],
  },

  // QUESTION 10 — CROISSANCE FUTURE (CENTRAL QUESTION - EMPHASE FORTE)
  {
    id: 10,
    type: "single",
    dimension: "capacity",
    dimensionLabel: "Capacité d'Absorption Future",
    isHighlighted: true,
    title: "Si vous deviez doubler votre nombre de clients dans les 12 prochains mois, pourriez-vous le faire sans doubler votre charge de travail ?",
    subtitle: "La question centrale d'OPAL.",
    options: [
      { id: "q10_yes", label: "Oui, clairement : notre infrastructure absorberait ce volume sans explosion de charge", score: 100 },
      { id: "q10_prob", label: "Probablement, avec quelques ajustements de processus", score: 70 },
      { id: "q10_recruit", label: "Difficilement : nous serions obligés de recruter massivement pour suivre", score: 40 },
      { id: "q10_prob_not", label: "Probablement pas : notre organisation actuelle atteindrait vite sa limite", score: 15 },
      { id: "q10_no", label: "Absolument pas : nous serions complètement submergés par l'opérationnel", score: 5 },
    ],
  },

  // QUESTION 11 — PRIORITÉ (QUALITATIF / DÉSIR PRINCIPAL)
  {
    id: 11,
    type: "single",
    dimensionLabel: "Levier Prioritaire",
    title: "Si vous pouviez résoudre un seul problème opérationnel demain, lequel choisiriez-vous ?",
    subtitle: "Votre priorité stratégique immédiate.",
    options: [
      { id: "q11_time", label: "Gagner du temps sur mes journées et celles de mon équipe", score: 0 },
      { id: "q11_structure", label: "Structurer et standardiser mes processus pour rendre l'équipe plus autonome", score: 0 },
      { id: "q11_centralize", label: "Centraliser toutes mes informations et dossiers dans un seul environnement", score: 0 },
      { id: "q11_admin", label: "Réduire drastiquement la charge administrative et les manipulations inutiles", score: 0 },
      { id: "q11_client", label: "Améliorer le suivi et la réactivité auprès de mes clients", score: 0 },
      { id: "q11_scale", label: "Pouvoir doubler mon activité sans devoir recruter immédiatement", score: 0 },
      { id: "q11_visibility", label: "Avoir une visibilité limpide et en temps réel sur toute l'activité", score: 0 },
    ],
  },

  // QUESTION 12 — INTENTION LIBRE
  {
    id: 12,
    type: "freetext",
    title: "Si vous pouviez supprimer un seul frein opérationnel dans votre entreprise aujourd'hui, lequel serait-il ?",
    subtitle:
      "Expliquez en une ou deux phrases ce qui vous ralentit le plus au quotidien. Cette réponse nous permettra de préparer une analyse concrète lors de notre échange.",
    placeholder:
      "Ex: Les relances incessantes par email, la ressaisie des informations client dans plusieurs outils, le manque de visibilité sur les dossiers en attente...",
  },
];
