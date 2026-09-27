import { credentials, getCredentialsByCategory } from "@/data/credentials";
import type { CredentialCategory } from "@/data/types";
import { Award, ExternalLink } from "lucide-react";

const categoryConfig: Record<CredentialCategory, { label: string; colorClass: string }> = {
  cloud:             { label: "Cloud",                  colorClass: "bg-blue-600/10 text-blue-400 ring-blue-500/20"     },
  software:          { label: "Software Development",   colorClass: "bg-emerald-600/10 text-emerald-400 ring-emerald-500/20" },
  data:              { label: "Data & Analytics",        colorClass: "bg-violet-600/10 text-violet-400 ring-violet-500/20"   },
  "project-agile-it":{ label: "Project / Agile / IT",   colorClass: "bg-amber-600/10 text-amber-400 ring-amber-500/20"       },
};

const orderedCategories: CredentialCategory[] = ["cloud", "software", "data", "project-agile-it"];

export default function Credentials() {
  return (
    <section
      id="training"
      aria-labelledby="credentials-heading"
      className="bg-slate-950 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Credentials & Training
          </p>
          <h2
            id="credentials-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Certifications &amp; completed training
          </h2>
          <p className="mt-4 text-slate-400">
            A curated selection of verified credentials across cloud, software development,
            data analytics, and IT/project management.
            Credential evidence and supporting documentation available upon request.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {orderedCategories.map((cat) => {
            const items = getCredentialsByCategory(cat);
            if (items.length === 0) return null;
            const cfg = categoryConfig[cat];

            return (
              <div key={cat}>
                <h3 className="mb-6 flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${cfg.colorClass}`}>
                    {cfg.label}
                  </span>
                  <span className="h-px flex-1 bg-slate-800" aria-hidden="true" />
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((cred) => (
                    <div
                      key={cred.id}
                      className="flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
                    >
                      <div className="flex items-start gap-3">
                        <Award className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-snug text-white">{cred.title}</p>
                          {cred.issuer && (
                            <p className="mt-1 text-xs text-slate-500">{cred.issuer}</p>
                          )}
                          {cred.date && (
                            <p className="mt-0.5 text-xs text-slate-600">{cred.date}</p>
                          )}
                          {cred.credentialId && (
                            <p className="mt-1 break-all font-mono text-[10px] text-slate-700">
                              ID: {cred.credentialId}
                            </p>
                          )}
                        </div>
                      </div>

                      {cred.credentialUrl && (
                        <a
                          href={cred.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-7 inline-flex items-center gap-1 text-xs text-blue-400 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                          aria-label={`Verify credential: ${cred.title}`}
                        >
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          Verify
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-xs text-slate-600">
          Total credentials shown: {credentials.length}.
          Full credential list with supporting documentation available upon request.
        </p>
      </div>
    </section>
  );
}
