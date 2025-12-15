import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "IsoMap API - Isochrone Mapping API for Developers",
  description: "Developer-first isochrone API with transparent pricing and 5-minute setup. Drive-time mapping for field service, real estate, and logistics software. No enterprise sales friction.",
  keywords: "isochrone API, drive time map, travel time API, isochrone mapping, routing API, field service API, real estate API",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  openGraph: {
    title: "IsoMap API - Isochrone Mapping API for Developers",
    description: "Developer-first isochrone API with transparent pricing and 5-minute setup. No enterprise sales friction.",
    url: "https://isomap.io",
    siteName: "IsoMap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IsoMap API - Isochrone Mapping API",
    description: "Developer-first isochrone API with transparent pricing and 5-minute setup. No enterprise sales friction.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
