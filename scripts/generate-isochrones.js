const fs = require('fs');
const path = require('path');

// Demo locations
const DEMO_LOCATIONS = [
  { name: "New York, NY", lat: 40.7128, lng: -74.0060 },
  { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
  { name: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
  { name: "Austin, TX", lat: 30.2672, lng: -97.7431 },
  { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278 },
];

const TRAVEL_MODES = ["driving-car", "foot-walking", "cycling-regular"];
const TRAVEL_TIMES = [5, 10, 15, 30, 60]; // minutes

// Check for ORS API key
const ORS_API_KEY = process.env.ORS_API_KEY;
if (!ORS_API_KEY) {
  console.error('❌ Error: ORS_API_KEY environment variable not set');
  console.error('   Please set your OpenRouteService API key:');
  console.error('   export ORS_API_KEY="your_key_here"');
  console.error('   Get a free key at: https://openrouteservice.org/');
  process.exit(1);
}

// Sleep function to avoid rate limiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateIsochrone(location, mode, time) {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/isochrones/${mode}`,
      {
        method: "POST",
        headers: {
          "Authorization": ORS_API_KEY,
          "Content-Type": "application/json",
          "Accept": "application/json, application/geo+json",
        },
        body: JSON.stringify({
          locations: [[location.lng, location.lat]], // ORS uses [lng, lat] order
          range: [time * 60], // Convert minutes to seconds
          range_type: "time",
          attributes: ["area", "reachfactor"],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`  ❌ Failed: ${location.name}, ${mode}, ${time}min - ${error.message}`);
    throw error;
  }
}

async function generateAllIsochrones() {
  console.log('🗺️  Generating precalculated isochrones...\n');
  console.log(`📊 Total calculations: ${DEMO_LOCATIONS.length} cities × ${TRAVEL_TIMES.length} times × ${TRAVEL_MODES.length} modes = ${DEMO_LOCATIONS.length * TRAVEL_TIMES.length * TRAVEL_MODES.length}\n`);

  const results = {};
  let completed = 0;
  const total = DEMO_LOCATIONS.length * TRAVEL_MODES.length * TRAVEL_TIMES.length;

  for (const location of DEMO_LOCATIONS) {
    console.log(`\n📍 ${location.name}`);
    results[location.name] = {};

    for (const mode of TRAVEL_MODES) {
      results[location.name][mode] = {};
      const modeLabel = mode.replace('driving-car', '🚗 Drive').replace('foot-walking', '🚶 Walk').replace('cycling-regular', '🚴 Bike');
      console.log(`  ${modeLabel}`);

      for (const time of TRAVEL_TIMES) {
        try {
          const data = await generateIsochrone(location, mode, time);
          results[location.name][mode][time] = data;
          completed++;
          console.log(`    ✓ ${time}min (${completed}/${total})`);

          // Rate limiting: wait between requests
          await sleep(1500); // 1.5 seconds between requests (ORS free tier limit)
        } catch (error) {
          console.error(`    ✗ ${time}min - FAILED`);
          // Store error marker
          results[location.name][mode][time] = {
            error: true,
            message: error.message
          };
        }
      }
    }
  }

  // Save to JSON file
  const outputPath = path.join(__dirname, '..', 'public', 'precalculated-isochrones.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log(`\n✅ Complete! Generated ${completed}/${total} isochrones`);
  console.log(`📁 Saved to: public/precalculated-isochrones.json`);
  console.log(`📦 File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);

  const failed = total - completed;
  if (failed > 0) {
    console.log(`⚠️  Warning: ${failed} isochrones failed to generate`);
  }
}

// Run the generation
console.log('Starting isochrone generation...');
console.log('This will take about 2-3 minutes due to rate limiting.\n');

generateAllIsochrones().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
