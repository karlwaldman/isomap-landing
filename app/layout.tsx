import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "IsoMap API - Isochrone Mapping API for Developers",
  description: "Developer-first isochrone API with transparent pricing and 5-minute setup. Drive-time mapping for field service, real estate, and logistics software. No enterprise sales friction.",
  keywords: "isochrone API, drive time map, travel time API, isochrone mapping, routing API, field service API, real estate API",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "IsoMap API - Isochrone Mapping API for Developers",
    description: "Developer-first isochrone API with transparent pricing and 5-minute setup. No enterprise sales friction.",
    url: "https://isomap.io",
    siteName: "IsoMap",
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IsoMap API - Developer-First Isochrone Mapping',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IsoMap API - Isochrone Mapping API",
    description: "Developer-first isochrone API with transparent pricing and 5-minute setup. No enterprise sales friction.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Plausible Analytics - Privacy-friendly, GDPR-compliant, no cookies */}
        <Script
          defer
          data-domain="isomap.io"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
