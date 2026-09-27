"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/types";
import { Github, ExternalLink, Globe, Tag, Clock } from "lucide-react";

const categoryLabels: Record<ProjectCategory, string> = {
  software:        "Software",
  api:             "APIs",
  website:         "Websites",
  "cloud-aws":     "AWS",
  "cloud-azure":   "Azure",
  "cloud-gcp":     "GCP",
  "cloud-oci":     "OCI",
  data:            "Data",
  automation:      "Automation",
  ecommerce:       "E-Commerce",
  business:        "Business Apps",
  cybersecurity:   "Cybersecurity",
  mobile:          "Mobile",
  other:           "Other",
};

const statusConfig = {
  completed:     { label: "Completed",    className: "bg-emerald-600/10 text-emerald-400 ring-emerald-500/20" },
  "in-progress": { label: "In Progress",  className: "bg-amber-600/10  text-amber-400  ring-amber-500/20"  },
  planned:       { label: "Planned",      className: "bg-slate-600/10  text-slate-400  ring-slate-500/20"  },
};

const comingSoonCategories = [
  "Business Websites",
  "E-commerce Applications",
  "SaaS Applications",
  "Cloud Applications",
  "Data Analytics Projects",
  "Automation Tools",
  "Additional Software Projects",
];

function getFilterCategories(items: Project[]): ProjectCategory[] {
  const seen = new Set<ProjectCategory>();
  items.forEach((p) => seen.add(p.category));
  return Array.from(seen);
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");

  const filterCategories = getFilterCategories(projects);
  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-slate-950 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Projects
          </p>
          <h2
            id="projects-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            What I&apos;ve built
          </h2>
          <p className="mt-4 text-slate-400">
            Selected projects demonstrating practical skills across software development,
            data processing, analytics, and web applications.
          </p>
        </div>

        {/* Filters */}
        {filterCategories.length > 1 && (
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            <button
              onClick={() => setActiveFilter("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 ${
                activeFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
              aria-pressed={activeFilter === "all"}
            >
              All
            </button>
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  activeFilter === cat
                    ? "bg-blue-600 text-white"
                    : "border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                }`}
                aria-pressed={activeFilter === cat}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        )}

        {/* Project grid */}
        {filtered.length === 0 ? (
          <p className="mt-16 text-slate-500">No projects in this category yet.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Coming Soon */}
        <div className="mt-16 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-8">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-slate-500" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-slate-400">Coming Soon</h3>
          </div>
          <p className="mb-5 text-sm text-slate-500">
            More projects coming soon — including websites, e-commerce applications,
            SaaS concepts, and additional software and data projects.
          </p>
          <div className="flex flex-wrap gap-2">
            {comingSoonCategories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-slate-700 bg-slate-800/40 px-3 py-1 text-xs text-slate-600"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-800/40 to-slate-900/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${status.className}`}>
          {status.label}
        </span>
        <span className="rounded-full border border-slate-700 px-2.5 py-0.5 text-xs text-slate-500">
          {categoryLabels[project.category]}
        </span>
      </div>

      <h3 className="text-base font-semibold text-white">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
        {project.shortDescription}
      </p>

      {project.technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 rounded-md border border-slate-700/50 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:border-blue-400/40"
            >
              <Tag className="h-2.5 w-2.5 text-slate-500" aria-hidden="true" />
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded-md bg-slate-700/60 px-2 py-0.5 text-xs text-slate-500">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>
      )}

      {/* Links — only rendered when URL actually exists */}
      <div className="mt-5 flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 shadow-md transition-all duration-200 hover:scale-[1.03] hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            aria-label={`View ${project.name} source code on GitHub`}
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/10 px-3 py-1.5 text-xs font-medium text-blue-400 shadow-md ring-1 ring-inset ring-blue-500/20 transition-all duration-200 hover:scale-[1.03] hover:bg-blue-600 hover:text-white hover:shadow-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            aria-label={`View ${project.name} live demo`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Live Demo
          </a>
        )}
        {project.websiteUrl && !project.liveUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/10 px-3 py-1.5 text-xs font-medium text-blue-400 shadow-md ring-1 ring-inset ring-blue-500/20 transition-all duration-200 hover:scale-[1.03] hover:bg-blue-600 hover:text-white hover:shadow-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            aria-label={`Visit ${project.name} website`}
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            Website
          </a>
        )}
      </div>
      </div>
    </article>
  );
}
