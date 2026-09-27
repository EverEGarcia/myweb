import { experience } from "@/data/experience";
import { ChevronRight, MapPin, Clock } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-slate-950 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Professional Experience
          </p>
          <h2
            id="experience-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Work history
          </h2>
          <p className="mt-4 text-slate-400">
            For complete career history and timeline, visit{" "}
            <a
              href="https://www.linkedin.com/in/ever-esli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              LinkedIn
            </a>
            . Credential evidence available upon request.
          </p>
        </div>

        <div className="mt-16 space-y-0">
          {experience.map((entry, index) => {
            const isLast = index === experience.length - 1;
            return (
              <div key={entry.id} className="relative flex gap-6">
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-blue-500 bg-slate-950" />
                  {!isLast && (
                    <div className="mt-1 w-px flex-1 bg-slate-800" aria-hidden="true" />
                  )}
                </div>

                <div className="mb-8 min-w-0 flex-1 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="rounded-full bg-blue-600/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                      {entry.position}
                    </span>
                    {entry.employmentType && (
                      <span className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                        {entry.employmentType}
                      </span>
                    )}
                    {entry.duration && (
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {entry.duration}
                      </span>
                    )}
                    {entry.location && entry.location !== "[Location]" && (
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {entry.location}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-white">{entry.company}</h3>

                  {entry.description && (
                    <p className="mt-2 text-slate-400">{entry.description}</p>
                  )}

                  {entry.responsibilities.length > 0 && (
                    <ul className="mt-4 space-y-1.5" aria-label="Responsibilities">
                      {entry.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-slate-400">
                          <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" aria-hidden="true" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.skills && entry.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
