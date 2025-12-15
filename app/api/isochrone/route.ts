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

    // Map our mode names to OpenRouteService profile names
    const modeMap: Record<string, string> = {
      "driving-car": "driving-car",
      "foot-walking": "foot-walking",
      "cycling-regular": "cycling-regular",
    };

    const profile = modeMap[mode] || "driving-car";

    // Call OpenRouteService API from backend (no CORS issues)
    const apiKey = "5b3ce3597851110001cf6248a1b8e4c6d7d04f8fa5e0e6a5e1e1c1c1"; // Demo key
    const url = `https://api.openrouteservice.org/v2/isochrones/${profile}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        locations: [[lng, lat]],
        range: [time * 60], // Convert minutes to seconds
        range_type: "time",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouteService error:", response.status, errorText);
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

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
