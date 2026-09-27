// ─────────────────────────────────────────────────────────────────────────────
// myWeb Portfolio — Professional Experience
//
// ACCURACY: Only verified information is included.
// For the complete career timeline, visit the LinkedIn profile.
// ─────────────────────────────────────────────────────────────────────────────

import type { ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    id: "functionary",
    company: "The Functionary",
    position: "Technical Support Analyst — B2B",
    employmentType: "Freelance Contractor",
    location: "Remote",
    duration: "June 2024 — Present",
    description:
      "Provided technical support for a cloud-based SaaS platform, assisting B2B clients " +
      "with account setup, password resets, role and permission issues, and login failures while maintaining consistent service quality across a high-volume environment. Resolved user access and authentication issues including account lockouts, incorrect permissions, and MFA-related login problems, gaining hands-on experience with identity and access management in SaaS environments.",
    responsibilities: [
      "Resolved user access and authentication issues including account lockouts, incorrect permissions, and MFA-related login problems",
      "Assisted B2B clients with account setup, password resets, and role management",
      "Gained hands-on experience with identity and access management in SaaS environments",
      "Maintained service quality and response standards in a high-volume support environment",
    ],
    skills: [
      "SaaS Technical Support",
      "Identity & Access Management",
      "B2B Client Support",
      "Authentication Troubleshooting",
      "MFA",
    ],
  },
  {
    id: "octa-concept",
    company: "Octa Concept El Salvador",
    position: "Brand Development Manager",
    employmentType: "Self-Employed",
    location: "El Salvador",
    duration: "January 2018 — December 2025",
    description:
      "Developed and supported brand identity strategies for companies in the entertainment sector, " +
      "focusing on positioning, audience engagement, and market visibility. Created and executed marketing and promotional campaigns for events, aligning brand messaging with customer experience goals. Collaborated with creative and marketing teams to ensure consistent brand communication across live events and digital channels. Analyzed market positioning and competitive trends.",
    responsibilities: [
      "Developed brand identity strategies for entertainment sector clients",
      "Created and executed marketing and promotional campaigns for live events",
      "Aligned brand messaging with customer experience goals",
      "Collaborated with creative and marketing teams to ensure consistent brand communication across live events and digital channels",
      "Analyzed market positioning and competitive trends",
    ],
    skills: [
      "Brand Strategy",
      "Marketing Campaigns",
      "Event Marketing",
      "Market Analysis",
      "Creative Collaboration",
    ],
  },
  {
    id: "foundever",
    company: "Foundever",
    position: "Customer Care Professional — Team Lead Support",
    location: "El Salvador",
    duration: "January 2022 — June 2023",
    description:
      "Led a frontline customer service team in a high-volume environment, coaching agents on communication quality, empathy, and issue resolution. Monitored team performance using KPIs such as FCR, AHT, and escalation rates to identify gaps and improve service consistency. Acted as escalation point for complex or sensitive customer cases, ensuring timely resolution and professional handling of customer concerns.",
    responsibilities: [
      "Coached agents on communication quality, empathy, and issue resolution",
      "Monitored team performance using KPIs including FCR, AHT, and escalation rates",
      "Identified performance gaps and implemented improvements to service consistency",
      "Acted as escalation point for complex or sensitive customer cases",
      "Ensured timely resolution and professional handling of customer concerns",
    ],
    skills: [
      "Team Leadership",
      "Performance Coaching",
      "KPI Monitoring",
      "Escalation Management",
      "Customer Experience",
    ],
  },
];
