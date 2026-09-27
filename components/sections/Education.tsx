import { education } from "@/data/education";
import { GraduationCap, BookOpen } from "lucide-react";

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="bg-slate-900 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Education
          </p>
          <h2
            id="education-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Academic &amp; technical education
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((entry) => {
            const Icon = entry.isFormalDegree ? GraduationCap : BookOpen;
            return (
              <div
                key={entry.id}
                className="flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      entry.isFormalDegree
                        ? "bg-blue-600/10 text-blue-400 ring-blue-500/20"
                        : "bg-emerald-600/10 text-emerald-400 ring-emerald-500/20"
                    }`}
                  >
                    {entry.isFormalDegree ? "Degree" : "Technical Training"}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white">{entry.institution}</h3>
                <p className="mt-1 text-sm font-medium text-blue-400">{entry.field}</p>
                <p className="mt-1 text-sm text-slate-400">{entry.credential}</p>

                <p className="mt-2 text-xs text-slate-500">
                  {entry.period && <span>{entry.period}</span>}
                  {entry.period && entry.location && " · "}
                  {entry.location && <span>{entry.location}</span>}
                </p>

                {entry.description && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{entry.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
