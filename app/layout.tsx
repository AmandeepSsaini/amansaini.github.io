import type { Metadata } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE = SITE_URL;
const description =
  "Amandeep Singh Saini — Tech Lead and Senior AI Engineer in Phoenix, AZ. 10+ years building full-stack platforms; now shipping LLM agent orchestration, MCP tool servers and RAG pipelines.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.short}`,
  },
  description,
  keywords: [
    "Amandeep Singh Saini", "Aman Saini", "Tech Lead", "Senior AI Engineer",
    "LLM agent orchestration", "Model Context Protocol", "MCP", "RAG",
    "React", "Vue 3", "TypeScript", "Python", "Phoenix AZ",
  ],
  authors: [{ name: profile.name, url: SITE }],
  creator: profile.name,
  alternates: { canonical: SITE },
  openGraph: {
    type: "profile",
    url: SITE,
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
    locale: "en_US",
    images: [{ url: `${SITE}/og.png`, width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
    images: [`${SITE}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');
if(!t)t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
document.documentElement.setAttribute('data-theme',t);}catch(e){
document.documentElement.setAttribute('data-theme','dark')}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Tech Lead, Senior AI Engineer",
  email: `mailto:${profile.email}`,
  url: SITE,
  address: { "@type": "PostalAddress", addressLocality: "Phoenix", addressRegion: "AZ", addressCountry: "US" },
  sameAs: [profile.linkedin, profile.github],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Washington State University" },
    { "@type": "CollegeOrUniversity", name: "Bhilai Institute of Technology, Raipur" },
  ],
  worksFor: { "@type": "Organization", name: "Thryv Inc." },
  knowsAbout: [
    "LLM agent orchestration", "Model Context Protocol", "Retrieval-Augmented Generation",
    "Front-end architecture", "React", "Vue 3", "TypeScript", "Python", "Kubernetes",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <meta name="color-scheme" content="dark light" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
