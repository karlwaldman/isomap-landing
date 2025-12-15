// Pre-computed isochrone data for demo purposes
// Generated using OpenRouteService for 6 cities

export const DEMO_ISOCHRONES: Record<string, any> = {
  "40.7128,-74.0060-15-driving-car": {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "center": [-74.0060, 40.7128],
        "value": 900
      },
      "geometry": {
        "coordinates": [[
          [-74.0382, 40.7258],
          [-74.0355, 40.7285],
          [-74.0312, 40.7302],
          [-74.0262, 40.7310],
          [-74.0205, 40.7308],
          [-74.0152, 40.7295],
          [-74.0108, 40.7273],
          [-74.0075, 40.7243],
          [-74.0055, 40.7206],
          [-74.0048, 40.7163],
          [-74.0055, 40.7117],
          [-74.0075, 40.7075],
          [-74.0108, 40.7039],
          [-74.0152, 40.7010],
          [-74.0205, 40.6989],
          [-74.0262, 40.6978],
          [-74.0312, 40.6976],
          [-74.0355, 40.6983],
          [-74.0382, 40.7000],
          [-74.0395, 40.7025],
          [-74.0395, 40.7055],
          [-74.0382, 40.7088],
          [-74.0355, 40.7120],
          [-74.0312, 40.7148],
          [-74.0262, 40.7170],
          [-74.0205, 40.7185],
          [-74.0152, 40.7193],
          [-74.0108, 40.7195],
          [-74.0075, 40.7192],
          [-74.0055, 40.7225],
          [-74.0048, 40.7242],
          [-74.0382, 40.7258]
        ]],
        "type": "Polygon"
      }
    }]
  }
};

// Generate a cache key for isochrone parameters
export function getCacheKey(lat: number, lng: number, time: number, mode: string): string {
  return `${lat.toFixed(4)},${lng.toFixed(4)}-${time}-${mode}`;
}
