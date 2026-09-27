import { skillCategories } from "@/data/skills";
import type { SkillLevel } from "@/data/types";

const levelConfig: Record<SkillLevel, { label: string; badgeClass: string; dotClass: string; width: string; value: number }> = {
  proficient: { label: "Proficient", badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20", dotClass: "bg-blue-500", width: "w-full", value: 100 },
  familiar:   { label: "Familiar", badgeClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20", dotClass: "bg-cyan-400", width: "w-2/3", value: 66 },
  learning:   { label: "Learning", badgeClass: "bg-amber-500/10 text-amber-300 border-amber-500/20", dotClass: "bg-amber-400", width: "w-1/3", value: 33 },
};

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-slate-900 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Skills
          </p>
          <h2
            id="skills-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Technical &amp; professional skills
          </h2>
          <p className="mt-4 text-slate-400">
            Skills across software development, APIs, cloud, technical support,
            and business. Levels reflect honest self-assessment.
          </p>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4" aria-label="Skill level legend">
          {(["proficient", "familiar", "learning"] as SkillLevel[]).map((level) => {
            const cfg = levelConfig[level];
            return (
              <div key={level} className="flex items-center gap-2">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${cfg.dotClass}`}
                  aria-hidden="true"
                />
                <span className="text-xs text-slate-400">{cfg.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-blue-400">
                {cat.category}
              </h3>

              <ul className="space-y-3">
                {cat.skills.map((skill) => {
                  const cfg = levelConfig[skill.level];
                  return (
                    <li key={skill.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm text-slate-300">{skill.name}</span>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${cfg.badgeClass}`}>
                          {cfg.label}
                        </span>
                      </div>
                      {/* Accessible progress bar */}
                      <div
                        className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700"
                        role="progressbar"
                        aria-label={`${skill.name}: ${cfg.label}`}
                        aria-valuenow={cfg.value}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className={`skill-progress-fill h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] ${cfg.width}`}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              {cat.note && (
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  {cat.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
