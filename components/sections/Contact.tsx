"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactSchema } from "@/lib/contactSchema";
import { profile } from "@/data/profile";
import { Mail, MessageCircle, Linkedin, Github, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Contact section
//
// Phase 1: Form submits to NEXT_PUBLIC_CONTACT_API_URL (not yet deployed).
// If the env var is absent the form renders a "not yet available" message
// rather than failing silently or making a bad request.
// ─────────────────────────────────────────────────────────────────────────────

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;
  const localApiUrl = Boolean(
    apiUrl && /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\]|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})(:\d+)?(?:\/|$)/.test(apiUrl)
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactSchema) {
    // If honeypot is populated, silently do nothing (already validated by Zod max(0))
    if (data._hp) return;

    if (!apiUrl) {
      setErrorMsg(
        "The contact form backend is not yet deployed. Please email me directly at " +
          profile.email
      );
      setFormState("error");
      return;
    }

    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          _hp: data._hp,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // Never expose server internals — use a generic message
        setErrorMsg(
          (body as { userMessage?: string }).userMessage ??
            "Something went wrong. Please try again or email me directly."
        );
        setFormState("error");
        return;
      }

      setFormState("success");
      reset();
    } catch {
      // Network error — do not expose internal details
      setErrorMsg(
        "Unable to send your message right now. Please email me directly at " +
          profile.email
      );
      setFormState("error");
    }
  }

  const hasLinkedIn = Boolean(profile.linkedin);
  const hasWhatsApp = Boolean(profile.whatsapp);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-slate-900 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left column — contact info */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Get in touch
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Have a project, opportunity, or question? I&apos;d love to hear from you.
            </p>

            <div className="mt-10 space-y-4">
              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/40 p-4 transition-colors hover:border-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-200">{profile.email}</p>
                </div>
              </a>

              {/* WhatsApp */}
              {hasWhatsApp ? (
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/40 p-4 transition-colors hover:border-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-400">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">WhatsApp</p>
                    <p className="text-sm font-medium text-slate-200">Direct message</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/20 p-4 opacity-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/40 text-slate-600">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">WhatsApp</p>
                    <p className="text-sm text-slate-600">Coming soon</p>
                  </div>
                </div>
              )}

              {/* LinkedIn */}
              {hasLinkedIn ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/40 p-4 transition-colors hover:border-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">LinkedIn</p>
                    <p className="text-sm font-medium text-slate-200">Professional profile</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/20 p-4 opacity-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/40 text-slate-600">
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">LinkedIn</p>
                    <p className="text-sm text-slate-600">Coming soon</p>
                  </div>
                </div>
              )}

              {/* GitHub */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/40 p-4 transition-colors hover:border-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/60 text-slate-300">
                  <Github className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">GitHub</p>
                  <p className="text-sm font-medium text-slate-200">View repositories</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div>
            {formState === "success" ? (
              <div
                role="alert"
                className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-16 text-center"
              >
                <CheckCircle className="mb-4 h-12 w-12 text-emerald-400" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-white">
                  {localApiUrl
                    ? "Message received locally in development mode"
                    : "Message received successfully. Thank you for reaching out."}
                </h3>
                <p className="mt-2 text-slate-400">
                  {localApiUrl
                    ? "This is a local development submission. No production email delivery is implied."
                    : "Your message was accepted by the contact service."}
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-6 rounded-lg border border-slate-700 px-5 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Contact form"
                className="space-y-5"
              >
                {/* Honeypot — hidden from real users, visible to bots */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
                >
                  <label htmlFor="contact-hp">
                    Leave this field empty
                  </label>
                  <input
                    id="contact-hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("_hp")}
                  />
                </div>

                {/* Error banner */}
                {formState === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                    <p className="text-sm text-red-400">{errorMsg}</p>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Name <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                    className={`w-full rounded-lg border bg-slate-800/60 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name
                        ? "border-red-500/60"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Email <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                    className={`w-full rounded-lg border bg-slate-800/60 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email
                        ? "border-red-500/60"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Subject <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    aria-required="true"
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    aria-invalid={Boolean(errors.subject)}
                    {...register("subject")}
                    className={`w-full rounded-lg border bg-slate-800/60 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.subject
                        ? "border-red-500/60"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                    placeholder="What is this about?"
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Message <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    aria-required="true"
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    aria-invalid={Boolean(errors.message)}
                    {...register("message")}
                    className={`w-full resize-y rounded-lg border bg-slate-800/60 px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.message
                        ? "border-red-500/60"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                    placeholder="Tell me about your project or question..."
                  />
                  {errors.message && (
                    <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-disabled={formState === "loading"}
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-600">
                  Required fields marked with{" "}
                  <span className="text-red-400" aria-label="asterisk">*</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
