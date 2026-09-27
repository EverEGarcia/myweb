// ─────────────────────────────────────────────────────────────────────────────
// myWeb Portfolio — Verified Credentials
//
// ACCURACY RULE: Only verified credentials are listed here.
// Do NOT invent issuing organizations, credential IDs, or dates.
// ─────────────────────────────────────────────────────────────────────────────

import type { CredentialEntry } from "./types";

export const credentials: CredentialEntry[] = [
  // ── Cloud ──────────────────────────────────────────────────────────────────
  {
    id: "az900",
    title: "AZ-900: Microsoft Azure Fundamentals",
    issuer: "KodeKloud",
    date: "Feb 2026",
    credentialId: "3d0aa4e5-6cc5-41e6-8364-9978e3599f7c",
    category: "cloud",
  },
  {
    id: "az104",
    title: "AZ-104: Microsoft Azure Administrator",
    issuer: "KodeKloud",
    date: "Feb 2026",
    credentialId: "a17da707-c2df-4e1f-af70-6b504ce50301",
    category: "cloud",
  },
  {
    id: "aws-fundamentals",
    title: "Fundamentals of Cloud Management with Amazon Web Services (AWS)",
    issuer: "Secretaría de Innovación de la Presidencia",
    date: "Aug 2024",
    category: "cloud",
  },
  {
    id: "oci-foundations",
    title: "Oracle Cloud Infrastructure 2023 Certified Foundations Associate",
    issuer: "Oracle",
    date: "Sep 2023",
    category: "cloud",
  },

  // ── Software Development ───────────────────────────────────────────────────
  {
    id: "kodigo-fullstack",
    title: "Full Stack Developer Junior",
    issuer: "KODIGO",
    date: "Jan 2025",
    category: "software",
  },
  {
    id: "alura-java-springboot",
    title: "Java / Spring Boot / React / JavaScript / Git",
    issuer: "Alura Latam",
    category: "software",
  },

  // ── Data & Analytics ───────────────────────────────────────────────────────
  {
    id: "junior-data-analyst",
    title: "Junior Data Analyst",
    date: "Aug 2025",
    category: "data",
  },
  {
    id: "data-viz-tec",
    title: "Best Practices for Data Visualization",
    issuer: "Tecnológico de Monterrey",
    date: "Aug 2025",
    category: "data",
  },
  {
    id: "dax-analytics",
    title: "Data Analysis with DAX and Analytics Tools",
    issuer: "INCAF",
    date: "Apr 2025",
    category: "data",
  },
  {
    id: "data-modeling",
    title: "Data Modeling and Cleaning",
    issuer: "INCAF",
    date: "Jan 2025",
    category: "data",
  },
  {
    id: "data-governance",
    title: "Data Governance and Management",
    issuer: "Secretaría de Innovación de la Presidencia",
    date: "Aug 2024",
    category: "data",
  },
  {
    id: "big-data-fundamentals",
    title: "Fundamentals of Big Data",
    issuer: "Secretaría de Innovación de la Presidencia",
    date: "Aug 2024",
    category: "data",
  },
  {
    id: "cisco-ds",
    title: "Introduction to Data Science",
    issuer: "Cisco",
    date: "Nov 2023",
    category: "data",
  },
  {
    id: "cisco-python",
    title: "Python Essentials 1",
    issuer: "Cisco",
    date: "Aug 2023",
    category: "data",
  },

  // ── Project / Agile / IT ───────────────────────────────────────────────────
  {
    id: "comptia-project-plus",
    title: "CompTIA Project+",
    issuer: "INCAF",
    date: "Jun 2025",
    credentialId: "5d71d2f8-f491-49fc-8c8e-9c9958cb26b7",
    category: "project-agile-it",
  },
  {
    id: "agile-scrum",
    title: "Agile Project Management Methodologies — Scrum Product Owner",
    issuer: "Secretaría de Innovación de la Presidencia",
    date: "Aug 2024",
    category: "project-agile-it",
  },
  {
    id: "qa-testing",
    title: "Software Quality Assurance Testing Management and Automation",
    issuer: "Secretaría de Innovación de la Presidencia",
    date: "Aug 2024",
    category: "project-agile-it",
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Fundamentals of Cybersecurity (CompTIA Security+)",
    issuer: "Secretaría de Innovación de la Presidencia",
    date: "Aug 2024",
    category: "project-agile-it",
  },
  {
    id: "itil-governance",
    title: "ITIL Standards / IT Governance",
    issuer: "Secretaría de Innovación de la Presidencia",
    date: "Aug 2024",
    category: "project-agile-it",
  },
];

export function getCredentialsByCategory(cat: CredentialEntry["category"]): CredentialEntry[] {
  return credentials.filter((c) => c.category === cat);
}
