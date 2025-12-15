const fs = require('fs');
const path = require('path');

// Helper to generate approximate isochrone polygon
function generateApproximateIsochrone(lat, lng, timeMinutes, mode) {
  // Speed estimates in km/h
  const speeds = {
    'driving-car': 50,  // Urban driving
    'foot-walking': 5,   // Walking
    'cycling-regular': 15 // Cycling
  };

  const speed = speeds[mode] || 50;
  const radiusKm = (speed * timeMinutes) / 60; // Distance = speed × time

  // Convert km to degrees (rough approximation)
  const latDegPerKm = 1 / 111; // 1 degree latitude ≈ 111km
  const lngDegPerKm = 1 / (111 * Math.cos(lat * Math.PI / 180)); // Adjust for latitude

  const radiusLat = radiusKm * latDegPerKm;
  const radiusLng = radiusKm * lngDegPerKm;

  // Generate irregular polygon (not perfect circle)
  const points = 32; // Number of vertices
  const coordinates = [];

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI;

    // Add irregularity based on road network patterns
    const irregularity = 0.7 + (Math.random() * 0.6); // 0.7 to 1.3
    const asymmetry = 1 + (Math.sin(angle * 2) * 0.2); // Elongate certain directions

    const r = radiusKm * irregularity * asymmetry;
    const rLat = r * latDegPerKm;
    const rLng = r * lngDegPerKm;

    const pointLng = lng + (rLng * Math.cos(angle));
    const pointLat = lat + (rLat * Math.sin(angle));

    coordinates.push([pointLng, pointLat]);
  }

  // Close the polygon
  coordinates.push(coordinates[0]);

  // Calculate approximate area (km²)
  const area = Math.PI * radiusKm * radiusKm * 1000000; // Convert to m²

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordinates]
        },
        properties: {
          group_index: 0,
          value: timeMinutes * 60, // seconds
          center: [lng, lat],
          area: Math.round(area),
          reachfactor: 0.5 + (Math.random() * 0.3), // 0.5-0.8
          total_pop: Math.round(Math.random() * 100000), // Mock population
          mode: mode,
          time_minutes: timeMinutes,
          _note: "Approximate isochrone generated mathematically for demo purposes"
        }
      }
    ],
    bbox: [
      lng - radiusLng,
      lat - radiusLat,
      lng + radiusLng,
      lat + radiusLat
    ],
    metadata: {
      attribution: "Approximate isochrone (demo only)",
      service: "mock",
      timestamp: Date.now(),
      query: {
        locations: [[lng, lat]],
        range: [timeMinutes * 60],
        range_type: "time",
        mode: mode
      },
      engine: {
        version: "mock-1.0",
        build_date: new Date().toISOString().split('T')[0]
      }
    }
  };
}

async function completeIsochrones() {
  console.log('🔧 Completing isochrone data with approximate calculations...\n');

  // Load existing data
  const inputPath = path.join(__dirname, '..', 'public', 'precalculated-isochrones.json');
  let data;

  try {
    data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    console.log('✓ Loaded existing precalculated data');
  } catch (error) {
    console.log('⚠️  No existing data found, creating from scratch');
    data = {};
  }

  const DEMO_LOCATIONS = [
    { name: "New York, NY", lat: 40.7128, lng: -74.0060 },
    { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
    { name: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
    { name: "Austin, TX", lat: 30.2672, lng: -97.7431 },
    { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
    { name: "London, UK", lat: 51.5074, lng: -0.1278 },
  ];

  const TRAVEL_MODES = ["driving-car", "foot-walking", "cycling-regular"];
  const TRAVEL_TIMES = [5, 10, 15, 30, 60];

  let generated = 0;
  let skipped = 0;

  for (const location of DEMO_LOCATIONS) {
    if (!data[location.name]) {
      data[location.name] = {};
    }

    for (const mode of TRAVEL_MODES) {
      if (!data[location.name][mode]) {
        data[location.name][mode] = {};
      }

      for (const time of TRAVEL_TIMES) {
        // Skip if already exists and is valid
        if (data[location.name][mode][time] && !data[location.name][mode][time].error) {
          skipped++;
          continue;
        }

        // Generate approximate isochrone
        data[location.name][mode][time] = generateApproximateIsochrone(
          location.lat,
          location.lng,
          time,
          mode
        );
        generated++;
      }
    }
  }

  // Save completed data
  const outputPath = path.join(__dirname, '..', 'public', 'precalculated-isochrones.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\n✅ Complete!`);
  console.log(`   Generated: ${generated} approximate isochrones`);
  console.log(`   Kept: ${skipped} real API isochrones`);
  console.log(`   Total: ${generated + skipped}/90 isochrones`);
  console.log(`📁 Saved to: public/precalculated-isochrones.json`);
  console.log(`📦 File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
}

completeIsochrones().catch(error => {
  console.error('\n❌ Error:', error);
  process.exit(1);
});
