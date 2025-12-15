"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Popular cities to demo
const DEMO_LOCATIONS = [
  { name: "New York, NY", lat: 40.7128, lng: -74.0060 },
  { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
  { name: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
  { name: "Austin, TX", lat: 30.2672, lng: -97.7431 },
  { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278 },
];

const TRAVEL_MODES = [
  { value: "driving-car", label: "🚗 Drive", color: "#2563eb" },
  { value: "foot-walking", label: "🚶 Walk", color: "#10b981" },
  { value: "cycling-regular", label: "🚴 Bike", color: "#f59e0b" },
];

const TRAVEL_TIMES = [5, 10, 15, 30, 60];

export default function IsochroneDemo() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isochroneLayerRef = useRef<L.GeoJSON | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [selectedLocation, setSelectedLocation] = useState(DEMO_LOCATIONS[0]);
  const [selectedMode, setSelectedMode] = useState(TRAVEL_MODES[0]);
  const [selectedTime, setSelectedTime] = useState(15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [showCode, setShowCode] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(
      [selectedLocation.lat, selectedLocation.lng],
      12
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add marker for selected location
    const marker = L.marker([selectedLocation.lat, selectedLocation.lng], {
      icon: L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    }).addTo(map);

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map when location changes
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;

    mapRef.current.setView([selectedLocation.lat, selectedLocation.lng], 12);
    markerRef.current.setLatLng([selectedLocation.lat, selectedLocation.lng]);
  }, [selectedLocation]);

  const generateIsochrone = async () => {
    if (!mapRef.current) return;

    setLoading(true);
    setError(null);
    setResponseData(null);

    try {
      // Call our backend proxy API (no CORS issues)
      const response = await fetch("/api/isochrone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          time: selectedTime,
          mode: selectedMode.value,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      setResponseData(data);

      // Remove existing isochrone layer
      if (isochroneLayerRef.current) {
        mapRef.current.removeLayer(isochroneLayerRef.current);
      }

      // Add new isochrone layer
      const geoJsonLayer = L.geoJSON(data, {
        style: {
          fillColor: selectedMode.color,
          fillOpacity: 0.2,
          color: selectedMode.color,
          weight: 2,
        },
      }).addTo(mapRef.current);

      isochroneLayerRef.current = geoJsonLayer;

      // Fit map to isochrone bounds
      const bounds = geoJsonLayer.getBounds();
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate isochrone");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCodeExample = (language: string) => {
    const examples: Record<string, string> = {
      curl: `curl https://api.isomap.io/v1/isochrone \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "location": {
      "lat": ${selectedLocation.lat},
      "lng": ${selectedLocation.lng}
    },
    "time": ${selectedTime},
    "mode": "${selectedMode.value.replace("driving-car", "drive").replace("foot-walking", "walk").replace("cycling-regular", "bike")}"
  }'`,
      javascript: `const response = await fetch('https://api.isomap.io/v1/isochrone', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    location: { lat: ${selectedLocation.lat}, lng: ${selectedLocation.lng} },
    time: ${selectedTime},
    mode: '${selectedMode.value.replace("driving-car", "drive").replace("foot-walking", "walk").replace("cycling-regular", "bike")}'
  })
});

const geojson = await response.json();
console.log(geojson);`,
      python: `import requests

response = requests.post(
    'https://api.isomap.io/v1/isochrone',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'location': {'lat': ${selectedLocation.lat}, 'lng': ${selectedLocation.lng}},
        'time': ${selectedTime},
        'mode': '${selectedMode.value.replace("driving-car", "drive").replace("foot-walking", "walk").replace("cycling-regular", "bike")}'
    }
)

geojson = response.json()
print(geojson)`,
    };

    return examples[language] || examples.curl;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Map */}
        <div className="relative">
          <div
            ref={mapContainerRef}
            className="h-[500px] w-full"
            style={{ zIndex: 0 }}
          />
          {loading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-sm text-gray-600">Generating isochrone...</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Try It Live
          </h3>
          <p className="text-gray-600 mb-6">
            Select a location, travel time, and mode to see real isochrones generated on the map.
          </p>

          <div className="space-y-4 flex-1">
            {/* Location Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={selectedLocation.name}
                onChange={(e) => {
                  const loc = DEMO_LOCATIONS.find((l) => l.name === e.target.value);
                  if (loc) setSelectedLocation(loc);
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {DEMO_LOCATIONS.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TRAVEL_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setSelectedMode(mode)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                      selectedMode.value === mode.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Time: {selectedTime} minutes
              </label>
              <div className="flex gap-2">
                {TRAVEL_TIMES.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`flex-1 px-3 py-2 rounded-lg border-2 font-medium transition-colors ${
                      selectedTime === time
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {time}m
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateIsochrone}
              disabled={loading}
              className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Isochrone"}
            </button>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {responseData && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {showCode ? "Hide" : "Show"} Code
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(responseData, null, 2))}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Copy JSON
                  </button>
                </div>

                {showCode && (
                  <div className="space-y-2">
                    <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto max-h-40">
                      <code>{getCodeExample("curl")}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Demo uses simplified circular approximation. Production API will use OSRM for accurate road-based isochrones.
          </p>
        </div>
      </div>
    </div>
  );
}
