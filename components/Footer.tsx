import Link from "next/link";
import { Mail, Github, Linkedin, MessageCircle, Code2, ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

const navLinks = [
  { href: "#about",      label: "About"      },
  { href: "#skills",     label: "Skills"     },
  { href: "#projects",   label: "Projects"   },
  { href: "#experience", label: "Experience" },
  { href: "#education",  label: "Education"  },
  { href: "#languages",  label: "Languages"  },
  { href: "#training",   label: "Credentials" },
  { href: "#contact",    label: "Contact"    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-slate-800 bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand column */}
          <div>
            <Link
              href="#hero"
              className="inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              aria-label="Ever Eslí — back to top"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Code2 className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-white">Ever Eslí</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Business Administrator with experience in software development, data
              analytics, cloud learning, and technical support.
            </p>
            <p className="mt-4 text-xs text-slate-600">
              v0.0.1 · Built with Next.js + TypeScript
            </p>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Navigation
            </h3>
            <ul className="space-y-2.5" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Contact
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
                  {profile.email}
                </a>
              </li>

              {profile.linkedin ? (
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    <Linkedin className="h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
                    LinkedIn
                  </a>
                </li>
              ) : (
                <li className="flex items-center gap-2.5">
                  <Linkedin className="h-4 w-4 shrink-0 text-slate-700" aria-hidden="true" />
                  <span className="text-sm text-slate-700">LinkedIn — coming soon</span>
                </li>
              )}

              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <Github className="h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
                  GitHub
                </a>
              </li>

              {profile.whatsapp ? (
                <li>
                  <a
                    href={`https://wa.me/${profile.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
                    WhatsApp
                  </a>
                </li>
              ) : (
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4 shrink-0 text-slate-700" aria-hidden="true" />
                  <span className="text-sm text-slate-700">WhatsApp — coming soon</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">
            &copy; {year} Ever Eslí. Personal portfolio — for professional
            reference only.
          </p>
          <Link
            href="#hero"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-1.5 text-xs text-slate-500 transition-colors hover:border-slate-700 hover:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            aria-label="Back to top of page"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
