// ─────────────────────────────────────────────────────────────────────────────
// myWeb Portfolio — Skills data
// ─────────────────────────────────────────────────────────────────────────────

import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "software-dev",
    category: "Software Development",
    skills: [
      { name: "JavaScript", level: "proficient" },
      { name: "TypeScript", level: "familiar" },
      { name: "Java", level: "familiar" },
      { name: "Spring Boot", level: "familiar" },
      { name: "Python", level: "familiar" },
      { name: "Full Stack Development", level: "familiar" },
      { name: "React", level: "familiar" },
      { name: "Next.js", level: "familiar" },
      { name: "HTML / CSS", level: "proficient" },
    ],
  },
  {
    id: "apis-automation",
    category: "APIs & Automation",
    skills: [
      { name: "REST APIs", level: "proficient" },
      { name: "API Design", level: "familiar" },
      { name: "API Development", level: "familiar" },
      { name: "n8n Automation", level: "familiar" },
      { name: "Workflow Automation", level: "familiar" },
    ],
  },
  {
    id: "cloud",
    category: "Cloud Technologies",
    skills: [
      { name: "AWS", level: "learning" },
      { name: "Microsoft Azure", level: "learning" },
      { name: "Google Cloud Platform", level: "learning" },
      { name: "Oracle Cloud Infrastructure", level: "learning" },
    ],
    note: "Currently learning cloud technologies through hands-on projects and structured training.",
  },
  {
    id: "data",
    category: "Data",
    skills: [
      { name: "Python", level: "familiar" },
      { name: "Introduction to Data Science", level: "learning" },
      { name: "Data Analysis Fundamentals", level: "learning" },
    ],
    note: "Actively developing data skills through coursework and project work.",
  },
  {
    id: "technical-support",
    category: "Technical Support & Operations",
    skills: [
      { name: "Technical Support Level 1", level: "proficient" },
      { name: "Technical Support Level 2", level: "proficient" },
      { name: "Troubleshooting", level: "proficient" },
      { name: "Hardware Diagnostics", level: "proficient" },
      { name: "Software Diagnostics", level: "proficient" },
      { name: "Microsoft 365", level: "familiar" },
      { name: "Networking Fundamentals", level: "familiar" },
    ],
  },
  {
    id: "business",
    category: "Business & Leadership",
    skills: [
      { name: "Business Administration", level: "proficient" },
      { name: "Team Leadership", level: "proficient" },
      { name: "Operations Management", level: "proficient" },
      { name: "Process Optimization", level: "familiar" },
      { name: "Business Communication", level: "proficient" },
      { name: "Technical Communication", level: "familiar" },
    ],
  },
  {
    id: "cybersecurity",
    category: "Cybersecurity",
    skills: [
      { name: "Secure Application Development", level: "learning" },
      { name: "Web Application Security", level: "learning" },
      { name: "Cloud Security Fundamentals", level: "learning" },
      { name: "Authentication & Authorization", level: "learning" },
      { name: "Security Best Practices", level: "learning" },
    ],
    note: "Currently learning cybersecurity concepts and secure development practices.",
  },
];
