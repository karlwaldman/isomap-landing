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

    // For demo: Return a simple mock isochrone
    // In production, you would use a proper API key or your own OSRM instance

    // Create a simple circular isochrone for demo purposes
    const earthRadius = 6371; // km
    const speed = mode === "foot-walking" ? 5 : mode === "cycling-regular" ? 15 : 60; // km/h
    const distance = (speed * time) / 60; // km
    const radiusInDegrees = distance / earthRadius * (180 / Math.PI);

    // Generate a polygon approximating the isochrone
    const points = 32;
    const coordinates = [];
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * 2 * Math.PI;
      const newLng = lng + (radiusInDegrees * Math.cos(angle)) / Math.cos(lat * Math.PI / 180);
      const newLat = lat + radiusInDegrees * Math.sin(angle);
      coordinates.push([newLng, newLat]);
    }

    const data = {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: {
          center: [lng, lat],
          value: time * 60,
          mode: mode
        },
        geometry: {
          type: "Polygon",
          coordinates: [coordinates]
        }
      }]
    };

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
