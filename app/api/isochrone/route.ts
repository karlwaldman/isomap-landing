import { NextRequest, NextResponse } from "next/server";
import { generateIsochroneData } from "./real-isochrone-data";

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

    // Generate isochrone using pre-computed data or approximation
    // For demo: Uses realistic road-based shapes (not simple circles)
    const data = generateIsochroneData(lat, lng, time, mode);

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
