import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OPAL — Operating Systems for Business | Logiciels Métiers sur Mesure",
  description:
    "Votre entreprise peut-elle prendre 2× plus de clients sans vous donner 2× plus de travail ? OPAL conçoit des logiciels métiers sur mesure pour structurer votre fonctionnement opérationnel et augmenter votre capacité sans surcharge.",
  keywords: [
    "OPAL",
    "Operating Systems for Business",
    "logiciel métier sur mesure",
    "infrastructure logicielle",
    "capacité opérationnelle",
    "diagnostic entreprise",
    "croissance B2B",
    "processus métier",
  ],
  authors: [{ name: "OPAL" }],
  creator: "OPAL",
  openGraph: {
    title: "OPAL — Votre entreprise peut-elle prendre 2× plus de clients sans 2× plus de travail ?",
    description:
      "Évaluez gratuitement la capacité opérationnelle de votre organisation en 3 minutes et identifiez vos points de friction.",
    type: "website",
    locale: "fr_FR",
    siteName: "OPAL",
  },
  twitter: {
    card: "summary_large_image",
    title: "OPAL — Operating Systems for Business",
    description: "Augmentez la capacité opérationnelle de votre entreprise sans faire exploser votre charge de travail.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-opal-redLight selection:text-opal-redDark">
        {children}
      </body>
    </html>
  );
}
