// ─────────────────────────────────────────────────────────────────────────────
// myWeb Portfolio — Personal profile / site configuration
// Owner: Ever Eslí  |  Contact: everesliga@gmail.com
//
// NEXT_PUBLIC_* vars are inlined at build time by Next.js static export.
// Non-prefixed vars are server-side only and must NOT appear here.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Ever Eslí",
  title: "Business Administration · Software Development · Data & Cloud Enthusiast",
  tagline:
    "Business Administration · Software Development · Data Analytics · Cloud Enthusiast · Technical Support",
  email: "everesliga@gmail.com",

  // Canonical LinkedIn — verified URL
  linkedin: "https://www.linkedin.com/in/ever-esli",

  // Canonical GitHub profile
  github: "https://github.com/EverEGarcia",

  // No public WhatsApp number is configured.
  whatsapp: "",

  // Scheduling CTA — falls back to #contact scroll if empty
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL ?? "",

  // Profile headshot — verified present at public/ProfilePic_3_2026.png
  avatarUrl: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/ProfilePic_3_2026.png`,

  about: [
    "I am a Business Administrator with foundational expertise in software development, " +
      "data analytics, and an active interest in cloud technologies. Business Administration " +
      "is the foundation of my professional " +
      "background, complemented by technical capabilities and hands-on projects. " +
      "My career spans customer-facing technical SaaS support, brand and marketing " +
      "management, team leadership, and hands-on technical projects.",

    "I hold a Bachelor of Business Administration from Bircham International University, " +
      "an Associate's Degree in Computer Software Technology from ESIT El Salvador, " +
      "and a Full Stack Developer diploma from Kodigo Academy. I continue to expand my cloud " +
      "capabilities and actively pursue certifications across AWS, Azure, and GCP, alongside " +
      "continued learning in data analytics and cybersecurity.",

    "I believe that combining business understanding with technical depth is a genuine " +
      "advantage when building software that solves real problems and delivers real value.",
  ],

  linkedInStatement:
    "For complete professional history and career timeline, visit LinkedIn. " +
    "Credential evidence and supporting documentation are available upon request.",

  currentlyLearning: [
    "AWS (Amazon Web Services)",
    "Microsoft Azure",
    "Google Cloud Platform (GCP)",
    "Cybersecurity Fundamentals",
    "Cloud Security",
    "Secure Application Development",
    "Data Analytics & Processing",
    "Modern Web Application Development",
  ],

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://everegarcia.github.io/myweb",

  metaDescription:
    "Portfolio of Ever Eslí, a Business Administrator with foundational expertise in software " +
    "development and data analytics, and an active Cloud Enthusiast pursuing cloud certifications.",
} as const;

export type Profile = typeof profile;
