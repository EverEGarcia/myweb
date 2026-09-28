import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Ever Esli — Portafolio",
    template: "%s | Ever Esli",
  },
  description: profile.metaDescription,
  keywords: [
    "Ever Esli",
    "Business Administrator",
    "Cloud",
    "Data Analytics",
    "REST APIs",
    "AWS",
    "Azure",
    "Full Stack",
    "Technical Support",
    "Business Administration",
    "El Salvador",
  ],
  authors: [{ name: "Ever Esli" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_SV",
    title: "Ever Esli — Portafolio",
    description: profile.metaDescription,
    siteName: "Ever Esli Portafolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ever Esli — Portafolio",
    description: profile.metaDescription,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <meta charSet="utf-8" />
      </head>
      <body
        className="flex min-h-full flex-col bg-slate-950 text-slate-50"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}