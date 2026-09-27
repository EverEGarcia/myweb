// ─────────────────────────────────────────────────────────────────────────────
// myWeb Portfolio — Technical Training & Diplomas data
//
// IMPORTANT ACCURACY NOTES:
//   - These are training completions and diplomas, NOT official professional
//     certifications unless explicitly labeled "Certification".
//   - AZ-900 and AZ-104 entries are KodeKloud training completions.
//     They do NOT represent passing the official Microsoft exam.
//   - Do not add "Certification" type unless official exam completion is confirmed.
// ─────────────────────────────────────────────────────────────────────────────

import type { TrainingProvider } from "./types";

export const trainingProviders: TrainingProvider[] = [
  {
    id: "kodekloud",
    provider: "KodeKloud",
    items: [
      {
        title: "Azure AZ-900 Training",
        type: "Training",
        // completionDate: "[Date]",  // Add when available
      },
      {
        title: "Azure AZ-104 Training",
        type: "Training",
        // completionDate: "[Date]",
      },
    ],
  },
  {
    id: "platzi",
    provider: "Platzi",
    items: [
      {
        title: "REST APIs",
        type: "Coursework",
      },
      {
        title: "API Development",
        type: "Coursework",
      },
      {
        title: "API Concepts",
        type: "Coursework",
      },
      {
        title: "Automation with n8n",
        type: "Coursework",
      },
      {
        title: "Networking Fundamentals",
        type: "Coursework",
      },
      {
        title: "Microsoft 365",
        type: "Coursework",
      },
    ],
  },
  {
    id: "oracle",
    provider: "Oracle",
    items: [
      {
        title: "Oracle Cloud Infrastructure (OCI) Training",
        type: "Training",
      },
      {
        title: "AI Training",
        type: "Training",
      },
    ],
  },
  {
    id: "cisco",
    provider: "Cisco",
    items: [
      {
        title: "Introduction to Data Science",
        type: "Coursework",
      },
      {
        title: "Python Essentials",
        type: "Coursework",
      },
    ],
  },
  {
    id: "alura",
    provider: "Alura LATAM",
    items: [
      {
        title: "JavaScript",
        type: "Coursework",
      },
      {
        title: "Java",
        type: "Coursework",
      },
      {
        title: "Spring Boot",
        type: "Coursework",
      },
    ],
  },
  {
    id: "kodigo-training",
    provider: "Kodigo Academy",
    items: [
      {
        title: "Full Stack Developer",
        type: "Diploma",
      },
    ],
  },
];
