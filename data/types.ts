// ─────────────────────────────────────────────────────────────────────────────
// myWeb Portfolio — Shared TypeScript types
// Version 0.0.1
// ─────────────────────────────────────────────────────────────────────────────

// ── Project ──────────────────────────────────────────────────────────────────

export type ProjectStatus = "completed" | "in-progress" | "planned";

export type ProjectCategory =
  | "software"
  | "api"
  | "website"
  | "cloud-aws"
  | "cloud-azure"
  | "cloud-gcp"
  | "cloud-oci"
  | "data"
  | "automation"
  | "ecommerce"
  | "business"
  | "cybersecurity"
  | "mobile"
  | "other";

export type CloudPlatform = "aws" | "azure" | "gcp" | "oci" | "none";

export interface Screenshot {
  url: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  businessProblem?: string;
  solution?: string;
  category: ProjectCategory;
  technologies: string[];
  cloudPlatforms?: CloudPlatform[];
  cloudServices?: string[];
  githubUrl?: string;
  liveUrl?: string;
  websiteUrl?: string;
  screenshots?: Screenshot[];
  /** ISO date string e.g. "2026-09" — used only for sorting, not displayed */
  date: string;
  status: ProjectStatus;
  featured: boolean;
  tags: string[];
  role?: string;
  contribution?: string;
}

// ── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  employmentType?: string;
  location: string;
  /** Human-readable duration, e.g. "June 2024 — Present" */
  duration?: string;
  description?: string;
  responsibilities: string[];
  achievements?: string[];
  technologies?: string[];
  skills?: string[];
}

// ── Education ────────────────────────────────────────────────────────────────

export interface EducationEntry {
  id: string;
  institution: string;
  field: string;
  credential: string;
  /** Human-readable period, e.g. "2019 — 2022" */
  period?: string;
  location?: string;
  description?: string;
  isFormalDegree: boolean;
}

// ── Credentials / Certifications ─────────────────────────────────────────────

export type CredentialCategory = "cloud" | "software" | "data" | "project-agile-it";

export interface CredentialEntry {
  id: string;
  title: string;
  issuer?: string;
  /** ISO date string e.g. "2026-02" or human label "Aug 2025" */
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  category: CredentialCategory;
}

// ── Technical Training ───────────────────────────────────────────────────────

export interface TrainingItem {
  title: string;
  type: "Training" | "Diploma" | "Coursework" | "Certification";
  completionDate?: string;
  credentialUrl?: string;
}

export interface TrainingProvider {
  id: string;
  provider: string;
  items: TrainingItem[];
}

// ── Skills ───────────────────────────────────────────────────────────────────

export type SkillLevel = "learning" | "familiar" | "proficient";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
  note?: string;
}

// ── Contact form (shared with Lambda) ────────────────────────────────────────

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp?: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
}
