import { Languages as LanguagesIcon } from "lucide-react";
import { languages } from "@/data/languages";

export default function Languages() {
  return (
    <section
      id="languages"
      aria-labelledby="languages-heading"
      className="bg-slate-950 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Languages
          </p>
          <h2
            id="languages-heading"
            className="mt-2 flex items-center gap-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            <LanguagesIcon className="h-7 w-7 shrink-0 text-blue-400" aria-hidden="true" />
            Communication
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {languages.map((language, index) => (
            <article
              key={language.name}
              className="group rounded-2xl border border-slate-700/50 bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{language.name}</h3>
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                  {language.level}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {language.description}
              </p>
              <p className="mt-6 font-mono text-xs text-slate-600" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}