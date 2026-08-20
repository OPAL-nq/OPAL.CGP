import { DimensionKey } from "./questions";

export type ProfileKey = "tension" | "transition" | "structured" | "accelerate";

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

export const PROFILES: Record<ProfileKey, ProfileInfo> = {
  tension: {
    key: "tension",
    label: "Organisation sous tension",
    badge: "Indice 0–39 / 100",
    headline: "Friction opérationnelle critique — La croissance devient une charge",
    summary:
      "Votre activité peut probablement continuer à croître, mais votre organisation actuelle risque de transformer chaque nouveau palier de croissance en charge supplémentaire et désorganisation.",
    colorClass: "text-amber-700 bg-amber-50 border-amber-200",
  },
  transition: {
    key: "transition",
    label: "Organisation en transition",
    badge: "Indice 40–59 / 100",
    headline: "Bases existantes — Points de friction risquant de devenir bloquants",
    summary:
      "Votre entreprise possède déjà des bases solides, mais plusieurs points de friction risquent de devenir critiques à mesure que votre activité se développe.",
    colorClass: "text-orange-700 bg-orange-50 border-orange-200",
  },
  structured: {
    key: "structured",
    label: "Organisation structurée",
    badge: "Indice 60–79 / 100",
    headline: "Fondations solides — Levier majeur pour construire de la capacité",
    summary:
      "Votre organisation est déjà bien structurée. Votre prochain enjeu n'est probablement plus de travailler davantage, mais de construire davantage de capacité autour de votre modèle actuel.",
    colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  accelerate: {
    key: "accelerate",
    label: "Organisation prête à accélérer",
    badge: "Indice 80–100 / 100",
    headline: "Excellente maturité — Infrastructure prête pour l'accélération",
    summary:
      "Votre organisation possède les bases nécessaires pour absorber davantage de croissance. L'enjeu consiste maintenant à construire une infrastructure logicielle opérationnelle capable de suivre cette ambition.",
    colorClass: "text-opal-red bg-opal-redLight border-opal-redBorder",
  },
};

export const BOTTLENECK_DETAILS: Record<DimensionKey, BottleneckInfo> = {
  structure: {
    dimension: "structure",
    label: "Structure & Processus",
    headline: "Vos processus reposent encore trop sur les habitudes individuelles",
    description:
      "Le fonctionnement quotidien dépend fortement de la mémoire des équipes et du dirigeant. La standardisation des étapes et la documentation sont encore insuffisantes pour absorber sereinement les pics d'activité.",
    consequences: [
      "Difficulté à déléguer sans devoir constamment réexpliquer",
      "Qualité de service fluctuante selon la charge des collaborateurs",
      "Intégration lente et énergivore des nouvelles recrues",
    ],
    recommendations: [
      "Standardiser les workflows clés de traitement des dossiers",
      "Établir un environnement unique accessible et partagé par toute l'équipe",
      "Formaliser les check-lists opérationnelles à chaque étape du parcours client",
    ],
  },
  efficiency: {
    dimension: "efficiency",
    label: "Efficacité Opérationnelle",
    headline: "La charge administrative et la dispersion des outils consomment trop de temps",
    description:
      "Votre organisation semble perdre une partie significative de sa capacité dans des tâches, recherches, ressaisies et manipulations qui pourraient être davantage structurées.",
    consequences: [
      "Temps précieux soustrait aux missions à haute valeur ajoutée",
      "Multiplication des fichiers Excel et des outils non synchronisés",
      "Sensation constante de 'courir après les dossiers' au lieu d'anticiper",
    ],
    recommendations: [
      "Regrouper les données et documents dans un environnement métier unique",
      "Automatiser les relances et la collecte des pièces récurrentes",
      "Éliminer les doubles saisies entre vos différents canaux",
    ],
  },
  capacity: {
    dimension: "capacity",
    label: "Capacité d'Absorption",
    headline: "Le dirigeant reste le goulot d'étranglement de l'activité",
    description:
      "L'organisation actuelle absorbe difficilement les hausses de volume sans sursolliciter le dirigeant ou imposer des recrutements prématurés.",
    consequences: [
      "Plafond de verre sur le volume de clients accompagnés simultanément",
      "Risque d'épuisement opérationnel lors des phases d'accélération",
      "Dépendance vitale de l'entreprise à la présence quotidienne du dirigeant",
    ],
    recommendations: [
      "Découpler la croissance du chiffre d'affaires du temps passé par dossier",
      "Construire un système logiciel qui guide l'équipe de manière autonome",
      "Sanctuariser le temps stratégique et commercial du dirigeant",
    ],
  },
  visibility: {
    dimension: "visibility",
    label: "Visibilité & Pilotage",
    headline: "L'accès à l'information et le suivi temps réel manquent de fluidité",
    description:
      "La visibilité sur l'état d'avancement des dossiers, les blocages et les priorités du jour reste fragmentée, nécessitant des vérifications manuelles régulières.",
    consequences: [
      "Retards découverts tardivement sur certains dossiers clients",
      "Difficulté à prioriser les urgences avec précision",
      "Manque de métriques claires sur la fluidité des opérations",
    ],
    recommendations: [
      "Déployer un tableau de bord opérationnel centralisé",
      "Mettre en place des indicateurs visuels de blocage des dossiers",
      "Assurer un suivi transparent des statuts pour chaque collaborateur",
    ],
  },
};
