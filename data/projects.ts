// ─────────────────────────────────────────────────────────────────────────────
// myWeb Portfolio — Projects
//
// HOW TO ADD A PROJECT: Add an entry to the array below.
// The UI is data-driven — no component changes are required.
//
// URL POLICY: Only use verified URLs. Never invent live demo links.
// ─────────────────────────────────────────────────────────────────────────────

import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "quality-workshop",
    name: "Quality Workshop Project",
    shortDescription:
      "A Python data-processing project calculating sales metrics from structured data, " +
      "with professional project organization, documentation, and automated testing.",
    description:
      "Focuses on calculating sales metrics from structured data while applying " +
      "professional project organization, documentation, and automated testing practices.",
    category: "software",
    technologies: ["Python", "Pandas", "pytest", "Unit Testing", "Data Processing", "Git"],
    githubUrl: "https://github.com/EverEGarcia/taller_calidad_semana15",
    date: "2025-01",
    status: "completed",
    featured: true,
    tags: ["Python", "Data Processing", "Testing", "Software Quality"],
    role: "Developer",
    contribution: "Full implementation, testing, and documentation.",
  },
  {
    id: "random-cats",
    name: "Random Cats",
    shortDescription:
      "A responsive web app integrating The Cat API to discover, search, and save favorite cat images — " +
      "demonstrating async API interaction, browser storage, accessibility, and error handling.",
    description:
      "Demonstrates browser storage, asynchronous API interaction, responsive UI, " +
      "accessibility, and error handling using vanilla web technologies.",
    category: "website",
    technologies: ["HTML5", "CSS3", "JavaScript", "Fetch API", "REST API", "LocalStorage", "Accessibility"],
    githubUrl: "https://github.com/EverEGarcia/random-cats",
    liveUrl: "https://everegarcia.github.io/random-cats",
    date: "2025-03",
    status: "completed",
    featured: true,
    tags: ["JavaScript", "REST API", "Responsive UI", "Accessibility"],
    role: "Developer",
    contribution: "Full design and development.",
  },
  {
    id: "urban-mobility",
    name: "Urban Mobility & Logistics Engine",
    shortDescription:
      "A Python data processing and geospatial analysis project using urban delivery telemetry, " +
      "transforming geographic data, and generating interactive visualizations.",
    description:
      "Designed to process urban delivery telemetry, transform geographic data, " +
      "analyze performance, and generate interactive data visualizations.",
    category: "data",
    technologies: ["Python", "NumPy", "GeoPandas", "Seaborn", "Plotly", "Geospatial Analysis", "Data Processing", "Performance Profiling"],
    githubUrl: "https://github.com/EverEsli/PROYECTO_BOOTCAMP_M1",
    date: "2025-06",
    status: "completed",
    featured: true,
    tags: ["Python", "Data Processing", "Geospatial", "Data Visualization"],
    role: "Developer",
    contribution: "Full data pipeline design, analysis, and visualization.",
  },
  {
    id: "portfolio-v001",
    name: "Personal Portfolio Website",
    shortDescription:
      "This portfolio — a responsive Next.js static site with data-driven sections, " +
      "shared Zod validation, and a local-only contact handler for Phase 1.",
    description:
      "Professional portfolio built with Next.js, TypeScript, and Tailwind CSS. " +
      "Configured for static export; production contact delivery is not implemented.",
    category: "website",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Zod", "React Hook Form"],
    date: "2026-09",
    status: "in-progress",
    featured: false,
    tags: ["Next.js", "TypeScript", "Static Export", "Security"],
    role: "Designer and Developer",
    contribution: "Full design, frontend development, and documentation.",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
