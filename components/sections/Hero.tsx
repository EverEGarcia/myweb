"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  CalendarDays,
} from "lucide-react";
import { profile } from "@/data/profile";

export default function Hero() {
  const hasWhatsApp = Boolean(profile.whatsapp);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");

    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScheduleClick = () => {
    if (profile.schedulingUrl) {
      window.open(
        profile.schedulingUrl,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleContactClick = () => {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
      contactForm.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.setTimeout(() => {
        document
          .getElementById("contact-name")
          ?.focus({ preventScroll: true });
      }, 500);

      return;
    }

    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-950"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-28 lg:px-8 lg:py-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Profile photo */}
          <div className="mx-auto w-full max-w-[340px] lg:mx-0 lg:w-[38%] lg:max-w-none">
            <div className="group relative">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Ever Eslí's LinkedIn profile"
                className="relative mx-auto flex aspect-[4/5] w-full max-w-[340px] cursor-pointer items-end justify-center overflow-hidden rounded-2xl bg-transparent transition-all duration-300 group-hover:scale-[1.02] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[18%] z-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.55),rgba(37,99,235,0.18)_48%,transparent_72%)] opacity-50 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 motion-safe:animate-pulse"
                />

                <Image
                  src={profile.avatarUrl}
                  alt="Ever Eslí"
                  fill
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 38vw"
                  className="z-10 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>

            <div className="mt-4 space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-blue-500/10">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"
                  aria-hidden="true"
                />
                Entrepreneur &amp; Startup Catalyst
              </div>

              <div className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-200">
                <span>• Major Tech Venture</span>

                <span className="shrink-0 rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-normal text-blue-400">
                  Coming Soon
                </span>
              </div>

              <div className="pt-1">
                <span className="mb-2 block text-xs font-medium text-slate-400">
                  Active Focus Areas:
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Cloud (AWS, Azure, GCP)",
                    "Cybersecurity",
                    "Automation",
                    "AI & Machine Learning",
                    "Data Analytics",
                  ].map((area) => (
                    <span
                      key={area}
                      className="rounded-md border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
              • Business Administration · Software Development · Data &amp;
              Cloud Enthusiast
            </p>

            {/* Name */}
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Ever Eslí
            </h1>

            {/* Tagline */}
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
              Business Administrator with foundational expertise in{" "}
              <span className="text-slate-200">software development</span>,{" "}
              <span className="text-slate-200">data analytics</span>, and an
              active interest in{" "}
              <span className="text-slate-200">cloud technologies</span>.
              Actively expanding cloud capabilities and pursuing
              certifications across{" "}
              <span className="text-blue-400">AWS</span>,{" "}
              <span className="text-blue-400">Azure</span>, and{" "}
              <span className="text-blue-400">GCP</span>.
            </p>

            {/* Currently learning badges */}
            <div
              className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
              aria-label="Currently learning"
            >
              {["AWS", "Azure", "GCP", "Data Analytics", "Cybersecurity"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-sm text-slate-300"
                  >
                    Learning · {item}
                  </span>
                ),
              )}
            </div>

            {/* Primary CTAs */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              {/* Projects */}
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                View Projects
              </Link>

              {/* Schedule a conversation */}
              <button
                type="button"
                onClick={handleScheduleClick}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-transparent px-6 py-3 text-base font-semibold text-slate-200 transition-colors hover:border-slate-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Schedule a conversation
              </button>

              {/* Contact form */}
              <button
                type="button"
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-transparent px-6 py-3 text-base font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact Me
              </button>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile of Ever Eslí"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile of Ever Eslí"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>

              {hasWhatsApp ? (
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp direct contact"
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </a>
              ) : (
                <span
                  className="cursor-default rounded-lg p-2 text-slate-700"
                  aria-label="WhatsApp — coming soon"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
            </div>

            {/* LinkedIn statement */}
            <p className="mt-6 max-w-lg text-center text-xs leading-relaxed text-slate-600 lg:text-left">
              {profile.linkedInStatement}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        aria-label="Scroll to About section"
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce cursor-pointer rounded-full p-2 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-blue-500/10 hover:text-blue-300 hover:shadow-[0_0_24px_rgba(59,130,246,0.45)] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        <ArrowDown className="h-6 w-6" aria-hidden="true" />
      </button>
    </section>
  );
}
