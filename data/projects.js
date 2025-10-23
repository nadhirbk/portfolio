// Base de données de tous les projets
export const projects = [
  {
    id: 1,
    slug: "projet-dev-web-1",
    title: "Projet Dev Web 1",
    category: "dev",
    shortDescription: "Application web développée avec React et Next.js",
    fullDescription:
      "Une application web complète développée avec les technologies modernes. Ce projet démontre ma maîtrise de React, Next.js et Tailwind CSS pour créer des interfaces utilisateur performantes et élégantes.",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    role: "Développeur Full Stack",
    duration: "3 mois",
    year: "2024",
    challenges:
      "Optimisation des performances, gestion d'état complexe, et création d'une interface responsive.",
    results:
      "Application déployée avec succès, temps de chargement réduit de 40%, excellente expérience utilisateur.",
    // Pour l'instant, pas d'images - on mettra des placeholders
    images: [],
    liveUrl: "#", // Lien vers le site en ligne
    githubUrl: "https://github.com/nadhirbk", // Ton GitHub
  },
  {
    id: 2,
    slug: "projet-dev-web-2",
    title: "Projet Dev Web 2",
    category: "dev",
    shortDescription: "Dashboard interactif avec visualisation de données",
    fullDescription:
      "Dashboard moderne permettant de visualiser et analyser des données en temps réel. Interface intuitive avec graphiques interactifs et système de filtrage avancé.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Chart.js"],
    role: "Développeur Frontend",
    duration: "2 mois",
    year: "2024",
    challenges:
      "Affichage de grandes quantités de données, mise à jour en temps réel, création de graphiques personnalisés.",
    results:
      "Interface fluide même avec des milliers de données, feedback très positif des utilisateurs.",
    images: [],
    liveUrl: "#",
    githubUrl: "https://github.com/nadhirbk",
  },
  {
    id: 3,
    slug: "projet-uiux-1",
    title: "Projet UI/UX 1",
    category: "design",
    shortDescription: "Design system complet et prototypage sur Figma",
    fullDescription:
      "Création d'un design system complet pour une application mobile, incluant tous les composants réutilisables, la palette de couleurs, la typographie et les guidelines d'utilisation.",
    technologies: ["Figma", "Design System", "Prototyping", "User Research"],
    role: "UI/UX Designer",
    duration: "4 mois",
    year: "2024",
    challenges:
      "Créer un système cohérent et scalable, assurer l'accessibilité, tester avec de vrais utilisateurs.",
    results:
      "Design system adopté par toute l'équipe, réduction du temps de design de 50%, amélioration de la cohérence visuelle.",
    images: [],
    liveUrl: "#", // Lien Figma ou Behance
    githubUrl: null, // Pas de GitHub pour un projet design
  },
  {
    id: 4,
    slug: "projet-dev-web-3",
    title: "Projet Dev Web 3",
    category: "dev",
    shortDescription: "Site e-commerce moderne avec panier et paiement",
    fullDescription:
      "Plateforme e-commerce complète avec gestion de produits, panier d'achat, système de paiement sécurisé et interface d'administration.",
    technologies: ["Next.js", "React", "Stripe", "MongoDB"],
    role: "Développeur Full Stack",
    duration: "4 mois",
    year: "2024",
    challenges:
      "Intégration de paiement sécurisé, gestion des stocks, optimisation SEO pour les fiches produits.",
    results:
      "Site déployé avec succès, conversion augmentée de 30%, excellent référencement naturel.",
    images: [],
    liveUrl: "#",
    githubUrl: "https://github.com/nadhirbk",
  },
  {
    id: 5,
    slug: "projet-uiux-2",
    title: "Projet UI/UX 2",
    category: "design",
    shortDescription: "Refonte UX d'une application existante",
    fullDescription:
      "Analyse et refonte complète de l'expérience utilisateur d'une application mobile, basée sur des tests utilisateurs et des metrics d'utilisation.",
    technologies: ["Figma", "User Testing", "Wireframing", "Prototyping"],
    role: "UX Designer",
    duration: "3 mois",
    year: "2024",
    challenges:
      "Comprendre les pain points des utilisateurs, simplifier les parcours, améliorer la rétention.",
    results:
      "Satisfaction utilisateur augmentée de 45%, temps de complétion des tâches réduit de 35%.",
    images: [],
    liveUrl: "#",
    githubUrl: null,
  },
  {
    id: 6,
    slug: "projet-dev-web-4",
    title: "Projet Dev Web 4",
    category: "dev",
    shortDescription: "Application de gestion de projet collaborative",
    fullDescription:
      "Outil de gestion de projet en temps réel permettant la collaboration entre équipes avec système de tâches, messagerie intégrée et suivi de progression.",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    role: "Développeur Full Stack",
    duration: "5 mois",
    year: "2024",
    challenges:
      "Synchronisation en temps réel, gestion des permissions, notifications push, performance avec données volumineuses.",
    results:
      "Adoption par 5 équipes internes, productivité augmentée de 25%, feedback très positif.",
    images: [],
    liveUrl: "#",
    githubUrl: "https://github.com/nadhirbk",
  },
];

// Fonction pour récupérer un projet par son slug
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

// Fonction pour récupérer tous les projets
export function getAllProjects() {
  return projects;
}

// Fonction pour récupérer les projets par catégorie
export function getProjectsByCategory(category) {
  if (category === "all") return projects;
  return projects.filter((project) => project.category === category);
}
