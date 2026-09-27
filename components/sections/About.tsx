import { profile } from "@/data/profile";
import { Briefcase, Code2, Cloud, ShieldCheck, BarChart3, GraduationCap } from "lucide-react";

const pillars = [
  {
    icon: GraduationCap,
    title: "Business Administration",
    description:
      "BBA from Bircham International University — operations, management, strategy, and organizational behavior.",
  },
  {
    icon: Code2,
    title: "Software Development",
    description:
      "Full stack development — JavaScript, TypeScript, Java, Spring Boot, Python, React, Next.js, REST APIs.",
  },
  {
    icon: Cloud,
    title: "Cloud & IT Administration",
    description:
      "Hands-on learning in AWS, Azure, GCP, and Oracle Cloud. Practical IT administration and SaaS platform support.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description:
      "Data analysis, visualization, geospatial data workflows, Python data stack, and business intelligence tools.",
  },
  {
    icon: Briefcase,
    title: "Technical SaaS Support",
    description:
      "B2B SaaS technical support, identity and access management, authentication troubleshooting, and client success.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Learner",
    description:
      "Developing knowledge in secure application development, CompTIA Security+ fundamentals, ITIL, and cloud security.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-slate-900 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            About Me
          </p>
          <h2
            id="about-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Business Administration · Software Development · Data & Cloud Enthusiast
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Narrative */}
          <div className="space-y-5">
            {profile.about.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-slate-400">
                {paragraph}
              </p>
            ))}

            {/* Currently learning */}
            <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
                Currently Learning
              </p>
              <ul className="space-y-1.5" aria-label="Current learning areas">
                {profile.currentlyLearning.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-300">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* LinkedIn statement */}
            <p className="text-sm text-slate-500 italic">{profile.linkedInStatement}</p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-white">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
