"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { href: "#about",      label: "About"       },
  { href: "#skills",     label: "Skills"      },
  { href: "#projects",   label: "Projects"    },
  { href: "#experience", label: "Experience"  },
  { href: "#education",  label: "Education"   },
  { href: "#languages",  label: "Languages"   },
  { href: "#training",   label: "Credentials" },
  { href: "#contact",    label: "Contact"     },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-slate-800 bg-slate-950/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo / wordmark */}
        <Link
          href="#hero"
          className="flex items-center gap-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
          aria-label="Ever Eslí — back to top"
          onClick={closeMenu}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Code2 className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold text-white">Ever Eslí</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="#contact"
          className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 lg:block"
        >
          Hire Me
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-800 bg-slate-950/95 backdrop-blur-md lg:hidden"
        >
          <ul className="space-y-1 px-6 py-4" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="#contact"
                onClick={closeMenu}
                className="block rounded-lg bg-blue-600 px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                Hire Me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
