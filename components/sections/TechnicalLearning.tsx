import { trainingProviders } from "@/data/training";
import type { TrainingItem } from "@/data/types";
import { BookOpen, Award, Layers } from "lucide-react";

const typeConfig: Record<TrainingItem["type"], { label: string; className: string }> = {
  Training: {
    label: "Training",
    className: "bg-blue-600/10 text-blue-400 ring-blue-500/20",
  },
  Diploma: {
    label: "Diploma",
    className: "bg-emerald-600/10 text-emerald-400 ring-emerald-500/20",
  },
  Coursework: {
    label: "Coursework",
    className: "bg-slate-600/20 text-slate-400 ring-slate-500/20",
  },
  Certification: {
    label: "Certification",
    className: "bg-amber-600/10 text-amber-400 ring-amber-500/20",
  },
};

const currentlyLearningAreas = [
  { name: "AWS", detail: "Amazon Web Services — architecture, core services, and deployment" },
  { name: "Microsoft Azure", detail: "Azure fundamentals and administration" },
  { name: "Google Cloud Platform", detail: "GCP core services and architecture" },
  { name: "Cybersecurity", detail: "Secure application development, web security, cloud security" },
];

export default function TechnicalLearning() {
  return (
    <section
      id="training"
      aria-labelledby="training-heading"
      className="bg-slate-950 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Technical Learning & Training
          </p>
          <h2
            id="training-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Coursework, training & diplomas
          </h2>
          <p className="mt-4 text-slate-400">
            The items below represent completed training programs, coursework, and diplomas.
            These are not official professional certifications unless explicitly labeled as such.
          </p>
        </div>

        {/* Currently learning highlight */}
        <div className="mt-12 rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-400" aria-hidden="true" />
            <h3 className="text-base font-semibold text-white">Currently Learning</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currentlyLearningAreas.map((area) => (
              <div key={area.name} className="flex items-start gap-2">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
                  aria-hidden="true"
                />
                <div>
                  <span className="text-sm font-medium text-slate-200">{area.name}</span>
                  <p className="text-xs text-slate-500">{area.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Provider cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainingProviders.map((provider) => (
            <div
              key={provider.id}
              className="rounded-xl border border-slate-800 bg-slate-800/40 p-6 transition-colors hover:border-slate-700"
            >
              {/* Provider header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700/60 text-slate-300">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-white">{provider.provider}</h3>
              </div>

              {/* Items */}
              <ul className="space-y-3" aria-label={`Training items from ${provider.provider}`}>
                {provider.items.map((item, i) => {
                  const config = typeConfig[item.type];
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <Award
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600"
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-slate-300">{item.title}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ring-1 ring-inset ${config.className}`}
                          >
                            {config.label}
                          </span>
                          {item.completionDate && (
                            <span className="text-xs text-slate-500">
                              {item.completionDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Accuracy disclaimer */}
        <p className="mt-8 text-xs text-slate-600">
          AZ-900 and AZ-104 entries represent KodeKloud training completions, not official Microsoft certification exams.
          Certification labels will only be added when official exam results are confirmed.
        </p>
      </div>
    </section>
  );
}
