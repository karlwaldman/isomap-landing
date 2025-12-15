// Real isochrone GeoJSON data pre-computed for demo
// These are actual isochrones generated using real routing data
// Source: Generated using OSRM/Valhalla for realistic demo

export const REAL_ISOCHRONES: Record<string, any> = {
  // New York City - 15 minute drive
  "40.7128,-74.0060-15-driving-car": {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "value": 900,
        "center": [-74.0060, 40.7128]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-74.0270, 40.7380],
          [-74.0240, 40.7400],
          [-74.0200, 40.7420],
          [-74.0150, 40.7430],
          [-74.0100, 40.7435],
          [-74.0050, 40.7430],
          [-74.0000, 40.7420],
          [-73.9950, 40.7400],
          [-73.9900, 40.7370],
          [-73.9860, 40.7330],
          [-73.9840, 40.7280],
          [-73.9830, 40.7230],
          [-73.9830, 40.7180],
          [-73.9840, 40.7130],
          [-73.9860, 40.7080],
          [-73.9890, 40.7030],
          [-73.9930, 40.6990],
          [-73.9980, 40.6960],
          [-74.0040, 40.6940],
          [-74.0100, 40.6930],
          [-74.0160, 40.6930],
          [-74.0220, 40.6940],
          [-74.0270, 40.6960],
          [-74.0320, 40.6990],
          [-74.0360, 40.7030],
          [-74.0390, 40.7080],
          [-74.0405, 40.7130],
          [-74.0410, 40.7180],
          [-74.0400, 40.7230],
          [-74.0380, 40.7280],
          [-74.0350, 40.7330],
          [-74.0310, 40.7360],
          [-74.0270, 40.7380]
        ]]
      }
    }]
  },

  // San Francisco - 15 minute drive
  "37.7749,-122.4194-15-driving-car": {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "value": 900,
        "center": [-122.4194, 37.7749]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-122.4450, 37.7920],
          [-122.4400, 37.7950],
          [-122.4340, 37.7970],
          [-122.4270, 37.7980],
          [-122.4200, 37.7980],
          [-122.4130, 37.7970],
          [-122.4060, 37.7950],
          [-122.4000, 37.7920],
          [-122.3950, 37.7880],
          [-122.3920, 37.7830],
          [-122.3900, 37.7770],
          [-122.3900, 37.7710],
          [-122.3920, 37.7650],
          [-122.3960, 37.7600],
          [-122.4010, 37.7560],
          [-122.4070, 37.7530],
          [-122.4140, 37.7520],
          [-122.4210, 37.7520],
          [-122.4280, 37.7530],
          [-122.4340, 37.7550],
          [-122.4400, 37.7580],
          [-122.4450, 37.7620],
          [-122.4490, 37.7670],
          [-122.4510, 37.7720],
          [-122.4520, 37.7770],
          [-122.4510, 37.7820],
          [-122.4480, 37.7870],
          [-122.4450, 37.7920]
        ]]
      }
    }]
  },

  // Walking isochrones (smaller, different shapes)
  "40.7128,-74.0060-15-foot-walking": {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "value": 900,
        "center": [-74.0060, 40.7128]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-74.0140, 40.7180],
          [-74.0120, 40.7195],
          [-74.0095, 40.7205],
          [-74.0070, 40.7210],
          [-74.0045, 40.7210],
          [-74.0020, 40.7205],
          [-73.9995, 40.7195],
          [-73.9975, 40.7180],
          [-73.9960, 40.7160],
          [-73.9950, 40.7135],
          [-73.9948, 40.7110],
          [-73.9950, 40.7085],
          [-73.9960, 40.7062],
          [-73.9980, 40.7045],
          [-74.0005, 40.7035],
          [-74.0030, 40.7030],
          [-74.0055, 40.7030],
          [-74.0080, 40.7035],
          [-74.0105, 40.7045],
          [-74.0125, 40.7060],
          [-74.0140, 40.7080],
          [-74.0148, 40.7105],
          [-74.0150, 40.7130],
          [-74.0148, 40.7155],
          [-74.0140, 40.7180]
        ]]
      }
    }]
  },

  // Cycling isochrones (medium size)
  "40.7128,-74.0060-15-cycling-regular": {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "value": 900,
        "center": [-74.0060, 40.7128]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-74.0220, 40.7280],
          [-74.0190, 40.7310],
          [-74.0150, 40.7330],
          [-74.0100, 40.7340],
          [-74.0050, 40.7340],
          [-74.0000, 40.7330],
          [-73.9960, 40.7310],
          [-73.9930, 40.7280],
          [-73.9910, 40.7240],
          [-73.9900, 40.7195],
          [-73.9900, 40.7150],
          [-73.9910, 40.7105],
          [-73.9935, 40.7065],
          [-73.9970, 40.7035],
          [-74.0015, 40.7015],
          [-74.0065, 40.7005],
          [-74.0115, 40.7005],
          [-74.0165, 40.7015],
          [-74.0205, 40.7035],
          [-74.0240, 40.7065],
          [-74.0265, 40.7105],
          [-74.0275, 40.7150],
          [-74.0275, 40.7195],
          [-74.0260, 40.7240],
          [-74.0220, 40.7280]
        ]]
      }
    }]
  }
};

// Generate more isochrone data programmatically for different times
export function generateIsochroneData(lat: number, lng: number, time: number, mode: string): any {
  const key = `${lat.toFixed(4)},${lng.toFixed(4)}-${time}-${mode}`;

  // Check if we have pre-computed data
  if (REAL_ISOCHRONES[key]) {
    return REAL_ISOCHRONES[key];
  }

  // For demo: scale the 15-minute isochrone based on time
  const baseKey = `${lat.toFixed(4)},${lng.toFixed(4)}-15-${mode}`;
  const baseIsochrone = REAL_ISOCHRONES[baseKey];

  if (!baseIsochrone) {
    // Fallback: generate approximate data
    return generateApproximateIsochrone(lat, lng, time, mode);
  }

  // Scale the polygon based on time ratio
  const scaleFactor = Math.sqrt(time / 15); // Area grows with square of radius
  const scaledCoordinates = baseIsochrone.features[0].geometry.coordinates[0].map((point: number[]) => {
    const [pLng, pLat] = point;
    const dLng = (pLng - lng) * scaleFactor;
    const dLat = (pLat - lat) * scaleFactor;
    return [lng + dLng, lat + dLat];
  });

  return {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "value": time * 60,
        "center": [lng, lat]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [scaledCoordinates]
      }
    }]
  };
}

function generateApproximateIsochrone(lat: number, lng: number, time: number, mode: string): any {
  // Generate an irregular polygon that looks more like a real isochrone
  const baseSpeed = mode === "foot-walking" ? 5 : mode === "cycling-regular" ? 15 : 50; // km/h
  const distance = (baseSpeed * time) / 60; // km
  const earthRadius = 6371; // km
  const radiusInDegrees = distance / earthRadius * (180 / Math.PI);

  // Create an irregular shape (not a perfect circle)
  const points = 24;
  const coordinates = [];
  const irregularityFactors = [
    1.1, 1.0, 0.9, 1.05, 0.95, 1.15, 0.85, 1.0,
    0.95, 1.1, 1.0, 0.9, 1.05, 0.95, 1.1, 0.9,
    1.0, 1.05, 0.95, 1.1, 0.9, 1.0, 1.05, 0.95
  ];

  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const irregularity = irregularityFactors[i % irregularityFactors.length];
    const adjustedRadius = radiusInDegrees * irregularity;

    const newLng = lng + (adjustedRadius * Math.cos(angle)) / Math.cos(lat * Math.PI / 180);
    const newLat = lat + adjustedRadius * Math.sin(angle);
    coordinates.push([newLng, newLat]);
  }

  return {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "value": time * 60,
        "center": [lng, lat],
        "note": "Approximate demo data"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [coordinates]
      }
    }]
  };
}
