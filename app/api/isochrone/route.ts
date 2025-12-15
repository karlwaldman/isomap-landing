import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lat, lng, time, mode } = body;

    // Validate inputs
    if (!lat || !lng || !time || !mode) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Check for ORS API key
    const apiKey = process.env.ORS_API_KEY;
    if (!apiKey) {
      console.error("ORS_API_KEY not configured");
      return NextResponse.json(
        { error: "API not configured. Please set ORS_API_KEY environment variable." },
        { status: 500 }
      );
    }

    // Map our mode names to ORS profile names
    const profileMap: Record<string, string> = {
      "driving-car": "driving-car",
      "foot-walking": "foot-walking",
      "cycling-regular": "cycling-regular",
    };

    const profile = profileMap[mode] || "driving-car";

    // Call OpenRouteService API
    const orsResponse = await fetch(
      `https://api.openrouteservice.org/v2/isochrones/${profile}`,
      {
        method: "POST",
        headers: {
          "Authorization": apiKey,
          "Content-Type": "application/json",
          "Accept": "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        },
        body: JSON.stringify({
          locations: [[lng, lat]], // ORS uses [lng, lat] order
          range: [time * 60], // Convert minutes to seconds
          range_type: "time",
          attributes: ["area", "reachfactor", "total_pop"],
        }),
      }
    );

    if (!orsResponse.ok) {
      const errorText = await orsResponse.text();
      console.error("ORS API error:", orsResponse.status, errorText);

      // Handle rate limiting
      if (orsResponse.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again in a moment." },
          { status: 429 }
        );
      }

      // Handle quota exceeded
      if (orsResponse.status === 403) {
        return NextResponse.json(
          { error: "API quota exceeded. Please check your ORS account limits." },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: `API error: ${orsResponse.status}` },
        { status: 500 }
      );
    }

    const data = await orsResponse.json();

    // Return with CORS headers
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Isochrone API error:", error);
    return NextResponse.json(
      { error: "Failed to generate isochrone" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
