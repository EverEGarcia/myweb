import type { Metadata } from "next";
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

// ─────────────────────────────────────────────────────────────────────────────
// SEO & Open Graph metadata
//
// DOMAIN NOTE: siteUrl defaults to the GitHub Pages URL.
// armonicolat.com is a separate business domain — not used here.
// Update NEXT_PUBLIC_SITE_URL in .env.local after deployment.
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Ever Eslí — Portfolio",
    template: "%s | Ever Eslí",
  },
  description: profile.metaDescription,
  keywords: [
    "Ever Eslí",
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
  authors: [{ name: "Ever Eslí" }],
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
    locale: "en_US",
    title: "Ever Eslí — Portfolio",
    description: profile.metaDescription,
    siteName: "Ever Eslí Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ever Eslí — Portfolio",
    description: profile.metaDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body
        className="flex min-h-full flex-col bg-slate-950 text-slate-50"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
