// ─────────────────────────────────────────────────────────────────────────────
// myWeb Portfolio — Education
// ─────────────────────────────────────────────────────────────────────────────

import type { EducationEntry } from "./types";

export const education: EducationEntry[] = [
  {
    id: "bircham",
    institution: "Bircham International University",
    field: "Business Administration and Management, General",
    credential: "Bachelor of Business Administration (BBA)",
    period: "2019 — 2022",
    location: "Distance Learning",
    description:
      "Business Administration and Management — covering organizational behavior, " +
      "business strategy, operations management, and leadership principles.",
    isFormalDegree: true,
  },
  {
    id: "esit",
    institution: "ESIT Escuela Superior de Innovación y Tecnología",
    field: "Computer Software Technology",
    credential: "Associate's Degree in Computer Software Technology / Technician Software Development",
    period: "2023 — 2025",
    location: "El Salvador",
    description:
      "Technical education in software development fundamentals, computing, " +
      "and technology applications.",
    isFormalDegree: true,
  },
  {
    id: "kodigo",
    institution: "Kodigo Academy",
    field: "Full Stack Development",
    credential: "Full Stack Developer Junior — Diploma",
    period: "2024 — 2025",
    location: "El Salvador",
    description:
      "Intensive full stack developer program covering frontend and backend " +
      "development, modern frameworks, databases, and professional software practices.",
    isFormalDegree: false,
  },
];
