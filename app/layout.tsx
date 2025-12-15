import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "IsoMap API - Isochrone Mapping API for Developers",
  description: "Drive-time mapping API 50% cheaper than Mapbox. Simple, fast, affordable isochrone API for field service, real estate, and logistics software.",
  keywords: "isochrone API, drive time map, travel time API, isochrone mapping, routing API, field service API, real estate API",
  openGraph: {
    title: "IsoMap API - Isochrone Mapping API for Developers",
    description: "50% cheaper than Mapbox. Simple drive-time mapping API for developers.",
    url: "https://isomap.io",
    siteName: "IsoMap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IsoMap API - Isochrone Mapping API",
    description: "50% cheaper than Mapbox. Simple drive-time mapping API.",
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
