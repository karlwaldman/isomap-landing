# Isochrone Generation: Comprehensive Research Analysis

**Research Date:** December 15, 2025
**Project:** IsoMap.io Landing Page Demo
**Objective:** Find the best approach for generating realistic isochrones for a demo/validation landing page

---

## Executive Summary

After extensive research into open-source isochrone implementations, production algorithms, and practical deployment options, here are the key findings:

**Critical Insight:** True isochrone generation requires:
1. A road network graph (from OpenStreetMap)
2. A routing engine (OSRM, Valhalla, or GraphHopper)
3. Graph traversal algorithms (Dijkstra or Contraction Hierarchies)
4. Polygon generation algorithms (Alpha-shapes or Concave hulls)

**Recommendation for IsoMap.io Demo:**
- **Short-term (Demo):** Use OpenRouteService API (free tier: 500 isochrones/day) with client-side visualization
- **Medium-term (Production):** Self-host OSRM + osrm-isochrone library in Docker
- **Alternative:** Pre-compute isochrones for major cities and serve static GeoJSON (fastest, cheapest)

---

## Part 1: How Production Services Actually Generate Isochrones

### The Real Algorithm Stack (What Mapbox, TravelTime, Targomo Actually Do)

Production isochrone services use a multi-stage pipeline:

#### Stage 1: Road Network Graph Construction
```
OpenStreetMap Data → Graph Processing → Routable Network Graph
```

- **Input:** OSM PBF files (planet.osm.pbf or regional extracts)
- **Processing:** Extract roads, assign speeds, create nodes/edges
- **Output:** Graph with weighted edges (time = distance / speed)

**Key Technologies:**
- OSRM: Preprocesses OSM data with `osrm-extract`, `osrm-partition`, `osrm-customize`
- Valhalla: Uses tile-based graph storage
- GraphHopper: Java-based graph construction

#### Stage 2: Graph Traversal (The Core Algorithm)

**Dijkstra's Algorithm** is the foundation:

```javascript
// Pseudocode for isochrone generation
function generateIsochrone(startNode, maxTime) {
  const visited = new Set();
  const reachableNodes = [];
  const queue = new PriorityQueue();

  queue.push({ node: startNode, time: 0 });

  while (!queue.isEmpty()) {
    const { node, time } = queue.pop();

    if (time > maxTime) continue;
    if (visited.has(node)) continue;

    visited.add(node);
    reachableNodes.push({ node, time });

    // Explore neighbors
    for (const neighbor of node.neighbors) {
      const edgeTime = calculateTravelTime(node, neighbor);
      queue.push({ node: neighbor, time: time + edgeTime });
    }
  }

  return reachableNodes;
}
```

**Performance Comparison:**

| Algorithm | Query Time (Europe graph) | Preprocessing | Best For |
|-----------|---------------------------|---------------|----------|
| Dijkstra (basic) | ~100 seconds | None | Small graphs |
| Bidirectional Dijkstra | ~40 seconds | None | Medium graphs |
| A* | ~30 seconds | None | Point-to-point |
| **Contraction Hierarchies** | **0.02 seconds** | Hours | Production |

**Critical Finding:** Contraction Hierarchies are **5,000x faster** than basic Dijkstra for large graphs. This is why production services can respond in milliseconds.

#### Stage 3: Polygon Generation

Once you have a set of reachable points with travel times, convert to polygons:

**Option A: Alpha Shapes (Computational Geometry)**
```
Reachable Points → Delaunay Triangulation → Alpha Shape → Polygon
```

- **Pros:** Mathematically precise
- **Cons:** Can include unreachable areas, doesn't handle holes well

**Option B: Concave Hull (Concaveman Algorithm)**
```
Reachable Points → Convex Hull → Iterative Refinement → Concave Polygon
```

- **Pros:** Better follows actual reachability, handles irregular shapes
- **Cons:** Requires tuning (concavity parameter)
- **Used by:** Mapbox, most production services

**Option C: Grid-based Interpolation + Contouring**
```
Reachable Points → Create Grid → Interpolate Values → Generate Contours
```

- **Pros:** Smoother polygons, works well for visualization
- **Cons:** Less precise, slower
- **Used by:** Some academic implementations

**Production Choice:** Most services use **Concaveman** (Option B) because it balances accuracy with performance.

### Traffic and Real-Time Data

**How Mapbox's `depart_at` works:**
- Historical traffic data from past 90 days
- Predictions based on day-of-week and time-of-day patterns
- Adjusts edge weights in the graph based on predicted speeds

---

## Part 2: Top 5 Open Source Libraries/Tools

### 1. **OSRM (Open Source Routing Machine)**

**Repository:** https://github.com/Project-OSRM/osrm-backend
**Stars:** 6,100+
**Language:** C++ (with Node.js bindings)
**Isochrone Library:** https://github.com/mapbox/osrm-isochrone

**How It Works:**
```bash
# 1. Download OSM data
wget http://download.geofabrik.de/north-america/us/california-latest.osm.pbf

# 2. Preprocess for routing
osrm-extract california-latest.osm.pbf -p profiles/car.lua
osrm-partition california-latest.osrm
osrm-customize california-latest.osrm

# 3. Start routing server
osrm-routed --algorithm mld california-latest.osrm
```

**JavaScript Usage:**
```javascript
const isochrone = require('osrm-isochrone');

const options = {
  resolution: 25,        // sample resolution
  maxspeed: 70,         // max speed in units/hour
  unit: 'miles',        // or 'kilometers'
  network: './california.osrm'
};

isochrone([-122.4194, 37.7749], 1800, options, (err, geojson) => {
  if (err) throw err;
  // geojson contains the isochrone polygon
});
```

**Pros:**
- ✅ **Blazingly fast** - "super fast, especially for very short routes (>1k rps on a single core)"
- ✅ Production-grade (used by Mapbox internally)
- ✅ Excellent documentation
- ✅ Docker images available
- ✅ Truly free and open source (BSD license)

**Cons:**
- ❌ Requires preprocessing OSM data (can take hours for large regions)
- ❌ High memory requirements (8GB+ for US-sized regions)
- ❌ No built-in isochrone endpoint (need mapbox/osrm-isochrone wrapper)
- ❌ C++ compilation required for custom modifications

**Best For:** Self-hosted production deployments where you control the infrastructure.

**Confidence Level:** 95% - OSRM is battle-tested and widely used.

---

### 2. **Valhalla**

**Repository:** https://github.com/valhalla/valhalla
**Stars:** 4,300+
**Language:** C++
**License:** MIT

**How It Works:**
```bash
# Using Docker (easiest)
docker run -dt \
  -v $PWD/custom_files:/custom_files \
  -p 8002:8002 \
  ghcr.io/gis-ops/docker-valhalla/valhalla:latest
```

**API Usage:**
```bash
curl http://localhost:8002/isochrone \
  --data '{
    "locations": [{"lat": 37.7749, "lon": -122.4194}],
    "costing": "auto",
    "contours": [{"time": 15}, {"time": 30}],
    "polygons": true
  }'
```

**Pros:**
- ✅ **Feature-rich** - includes isochrones, matrix, elevation, map-matching
- ✅ Multiple transport modes (car, bike, pedestrian, multimodal transit)
- ✅ Built-in isochrone API (no wrapper needed)
- ✅ Public demo server: https://valhalla.openstreetmap.de
- ✅ Active development and community

**Cons:**
- ❌ Larger memory footprint than OSRM
- ❌ More complex setup than OSRM
- ❌ Docker is almost required (complex to build manually)
- ❌ Tile-based architecture can be confusing

**Best For:** Projects needing multiple routing features beyond just isochrones.

**Confidence Level:** 90% - Very capable but slightly more complex than OSRM.

---

### 3. **GraphHopper**

**Repository:** https://github.com/graphhopper/graphhopper
**Stars:** 5,100+
**Language:** Java
**License:** Apache 2.0

**How It Works:**
```bash
# Download and run
wget https://github.com/graphhopper/graphhopper/releases/download/9.0/graphhopper-web-9.0.jar

# Start server
java -Xmx4g -jar graphhopper-web-9.0.jar \
  --input california.osm.pbf
```

**API Usage:**
```bash
curl "http://localhost:8989/isochrone?point=37.7749,-122.4194&time_limit=1800&vehicle=car"
```

**JavaScript Client:**
```javascript
import { GraphHopper } from 'graphhopper-js-api-client';

const gh = new GraphHopper({ key: 'your-key', host: 'http://localhost:8989' });
const isochrone = await gh.isochrone({
  point: [37.7749, -122.4194],
  time_limit: 1800,
  buckets: 3
});
```

**Pros:**
- ✅ **Easiest to set up** - single JAR file
- ✅ Isochrone module is fully open source (since 2018)
- ✅ Built-in JavaScript client
- ✅ Cross-platform (runs anywhere with Java)
- ✅ Good documentation

**Cons:**
- ❌ Slower than OSRM/Valhalla (2-3x slower on large graphs)
- ❌ Requires Java runtime
- ❌ Higher memory usage than OSRM
- ❌ Commercial features can be confusing (but isochrones are free)

**Best For:** Developers comfortable with Java or wanting the easiest self-hosted setup.

**Confidence Level:** 85% - Solid choice but performance lags behind OSRM.

---

### 4. **OpenRouteService (ORS)**

**Repository:** https://github.com/GIScience/openrouteservice
**API:** https://openrouteservice.org
**Stars:** 1,400+
**Language:** Java
**License:** GPL 3.0

**API Usage (Free Tier):**
```javascript
import { Openrouteservice } from 'openrouteservice-js';

const ors = new Openrouteservice({ api_key: 'your-key' });

const isochrones = await ors.isochrones({
  locations: [[-122.4194, 37.7749]],
  profile: 'driving-car',
  range: [600, 1200, 1800],
  range_type: 'time'
});
```

**Free Tier Limits:**
- 500 isochrones per day
- 20 isochrones per minute
- Max 5 locations
- Max 10 intervals
- Max ranges: 120km distance, 1 hour driving, 5 hours cycling

**Pros:**
- ✅ **Zero setup required** - API-based
- ✅ Official JavaScript/Python libraries
- ✅ Generous free tier for demos
- ✅ Can self-host if needed
- ✅ Excellent Leaflet plugins

**Cons:**
- ❌ Rate limits prevent production use on free tier
- ❌ GPL license complicates commercial use
- ❌ Self-hosted version has similar complexity to Valhalla
- ❌ API dependency for free tier

**Best For:** Rapid prototyping and demos where 500/day is sufficient.

**Confidence Level:** 95% - Perfect for demo/validation use cases like IsoMap.io.

---

### 5. **Client-Side: TurfJS + API Combo**

**Repository:** https://github.com/Turfjs/turf
**Stars:** 9,000+
**Language:** JavaScript
**License:** MIT

**Important Limitation:** TurfJS alone **cannot** generate realistic isochrones. It can only create simple buffers that don't account for road networks.

**How To Use It Properly:**

```javascript
import * as turf from '@turf/turf';
import concaveman from 'concaveman';

// 1. Get reachable points from a routing API
const response = await fetch('https://api.openrouteservice.org/v2/isochrones/driving-car', {
  method: 'POST',
  headers: {
    'Authorization': apiKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    locations: [[-122.4194, 37.7749]],
    range: [1800]
  })
});

const isochroneGeoJSON = await response.json();

// 2. Use TurfJS for post-processing
// Simplify the polygon
const simplified = turf.simplify(isochroneGeoJSON, {
  tolerance: 0.001,
  highQuality: true
});

// Union multiple isochrones
const union = turf.union(isochrone1, isochrone2);

// Calculate area
const area = turf.area(isochroneGeoJSON);

// Buffer the isochrone (for visualization)
const buffered = turf.buffer(isochroneGeoJSON, 0.1, { units: 'kilometers' });
```

**Pros:**
- ✅ **Pure JavaScript** - runs in browser
- ✅ Perfect for post-processing API results
- ✅ Huge library with 100+ geospatial functions
- ✅ Very well documented
- ✅ No server required

**Cons:**
- ❌ **Cannot generate true isochrones alone**
- ❌ Simple buffers ignore road networks
- ❌ Still requires a routing API or engine
- ❌ Not a complete solution

**Best For:** Post-processing isochrones from APIs, client-side geospatial operations.

**Confidence Level:** 100% for what it does, but it's not a standalone isochrone solution.

---

## Part 3: Algorithm Deep Dive

### The Mathematics of Isochrone Generation

#### Dijkstra's Algorithm (Simplified)

```javascript
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
    this.items.sort((a, b) => a.time - b.time);
  }

  pop() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

function dijkstraIsochrone(graph, startNodeId, maxTime) {
  const distances = new Map();
  const visited = new Set();
  const queue = new PriorityQueue();

  distances.set(startNodeId, 0);
  queue.push({ nodeId: startNodeId, time: 0 });

  while (!queue.isEmpty()) {
    const { nodeId, time } = queue.pop();

    if (visited.has(nodeId)) continue;
    if (time > maxTime) continue;

    visited.add(nodeId);

    const node = graph.getNode(nodeId);

    for (const edge of node.edges) {
      const neighborId = edge.targetNode;
      const edgeWeight = edge.time; // travel time in seconds
      const newTime = time + edgeWeight;

      if (!distances.has(neighborId) || newTime < distances.get(neighborId)) {
        distances.set(neighborId, newTime);
        queue.push({ nodeId: neighborId, time: newTime });
      }
    }
  }

  // Convert visited nodes to array of {point, time}
  const reachablePoints = [];
  for (const nodeId of visited) {
    const node = graph.getNode(nodeId);
    reachablePoints.push({
      coordinates: [node.lon, node.lat],
      time: distances.get(nodeId)
    });
  }

  return reachablePoints;
}
```

**Time Complexity:** O((V + E) log V) where V = nodes, E = edges

#### Concave Hull Generation (Concaveman)

```javascript
import concaveman from 'concaveman';

function generateIsochronePolygon(reachablePoints, maxTime) {
  // 1. Filter points within time threshold
  const pointsWithinTime = reachablePoints
    .filter(p => p.time <= maxTime)
    .map(p => p.coordinates);

  // 2. Generate concave hull
  const polygon = concaveman(pointsWithinTime, {
    concavity: 2.5,      // higher = more concave
    lengthThreshold: 0   // edge length threshold
  });

  // 3. Convert to GeoJSON
  return {
    type: 'Feature',
    properties: { time: maxTime },
    geometry: {
      type: 'Polygon',
      coordinates: [polygon]
    }
  };
}
```

#### Performance Optimizations

**1. Spatial Indexing**
```javascript
// Use R-tree for fast spatial queries
import RBush from 'rbush';

const tree = new RBush();
const items = reachablePoints.map(p => ({
  minX: p.coordinates[0],
  minY: p.coordinates[1],
  maxX: p.coordinates[0],
  maxY: p.coordinates[1],
  time: p.time
}));
tree.load(items);

// Fast range query
const nearbyPoints = tree.search({
  minX: bbox[0],
  minY: bbox[1],
  maxX: bbox[2],
  maxY: bbox[3]
});
```

**2. Grid-based Approximation**
```javascript
function gridBasedIsochrone(reachablePoints, resolution = 0.01) {
  // Create grid
  const bounds = getBounds(reachablePoints);
  const grid = [];

  for (let x = bounds.minX; x <= bounds.maxX; x += resolution) {
    for (let y = bounds.minY; y <= bounds.maxY; y += resolution) {
      // Find nearest reachable point
      const nearest = findNearest([x, y], reachablePoints);
      if (nearest.distance < resolution * 2) {
        grid.push({ point: [x, y], time: nearest.time });
      }
    }
  }

  // Generate contours using marching squares
  return generateContours(grid, [600, 1200, 1800]);
}
```

---

## Part 4: Recommended Implementation Approach for IsoMap.io

### Strategy 1: API-Based (Recommended for Demo)

**Best for:** Quick validation, demos, low traffic

```javascript
// app/api/isochrone/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';

const ORS_API_KEY = process.env.ORS_API_KEY;

export async function POST(request: NextRequest) {
  const { lat, lon, time, profile } = await request.json();

  try {
    const response = await fetch('https://api.openrouteservice.org/v2/isochrones/' + profile, {
      method: 'POST',
      headers: {
        'Authorization': ORS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locations: [[lon, lat]],
        range: [time],
        range_type: 'time'
      })
    });

    if (!response.ok) {
      throw new Error('ORS API error');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate isochrone' },
      { status: 500 }
    );
  }
}
```

**Frontend Implementation:**
```typescript
// components/IsochroneMap.tsx
'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function IsochroneMap() {
  const [isochrone, setIsochrone] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateIsochrone = async (lat: number, lon: number) => {
    setLoading(true);

    try {
      const response = await fetch('/api/isochrone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat,
          lon,
          time: 1800, // 30 minutes
          profile: 'driving-car'
        })
      });

      const data = await response.json();
      setIsochrone(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={12} style={{ height: '600px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {isochrone && (
        <GeoJSON
          data={isochrone}
          style={{
            fillColor: '#3388ff',
            fillOpacity: 0.3,
            color: '#3388ff',
            weight: 2
          }}
        />
      )}

      <Marker
        position={[37.7749, -122.4194]}
        eventHandlers={{
          click: (e) => {
            const { lat, lng } = e.latlng;
            generateIsochrone(lat, lng);
          }
        }}
      />
    </MapContainer>
  );
}
```

**Pros:**
- ✅ Zero infrastructure setup
- ✅ Works immediately
- ✅ 500 isochrones/day is enough for a demo
- ✅ Free tier

**Cons:**
- ❌ Rate limits
- ❌ API dependency
- ❌ Not suitable for production scale

**Implementation Time:** 2-4 hours

---

### Strategy 2: Self-Hosted OSRM + Docker (Recommended for Production)

**Best for:** Production use, unlimited requests, full control

```yaml
# docker-compose.yml
version: '3'
services:
  osrm:
    image: ghcr.io/project-osrm/osrm-backend
    ports:
      - "5000:5000"
    volumes:
      - ./osrm-data:/data
    command: osrm-routed --algorithm mld /data/california.osrm

  isochrone-api:
    build: .
    ports:
      - "3001:3001"
    depends_on:
      - osrm
    environment:
      - OSRM_URL=http://osrm:5000
```

**API Implementation:**
```javascript
// api/server.js
import express from 'express';
import isochrone from 'osrm-isochrone';

const app = express();
app.use(express.json());

app.post('/isochrone', async (req, res) => {
  const { lat, lon, time, profile } = req.body;

  const options = {
    resolution: 25,
    maxspeed: profile === 'driving' ? 70 : profile === 'cycling' ? 15 : 3,
    unit: 'miles',
    network: `/data/${profile}.osrm`
  };

  isochrone([lon, lat], time, options, (err, geojson) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(geojson);
  });
});

app.listen(3001, () => {
  console.log('Isochrone API running on port 3001');
});
```

**Setup Steps:**
```bash
# 1. Download OSM data
mkdir osrm-data
cd osrm-data
wget http://download.geofabrik.de/north-america/us/california-latest.osm.pbf

# 2. Preprocess data
docker run -t -v $(pwd):/data ghcr.io/project-osrm/osrm-backend \
  osrm-extract -p /opt/car.lua /data/california-latest.osm.pbf

docker run -t -v $(pwd):/data ghcr.io/project-osrm/osrm-backend \
  osrm-partition /data/california-latest.osrm

docker run -t -v $(pwd):/data ghcr.io/project-osrm/osrm-backend \
  osrm-customize /data/california-latest.osrm

# 3. Start services
docker-compose up -d
```

**Pros:**
- ✅ Unlimited requests
- ✅ No API dependencies
- ✅ Fast response times (<100ms)
- ✅ Full customization

**Cons:**
- ❌ Infrastructure required (DigitalOcean, AWS, etc.)
- ❌ Storage requirements (10-50GB depending on region)
- ❌ Memory requirements (4-8GB RAM)
- ❌ Maintenance overhead

**Implementation Time:** 1-2 days
**Monthly Cost:** ~$20-40 (DigitalOcean droplet)

---

### Strategy 3: Pre-computed Static GeoJSON (Fastest for Demos)

**Best for:** Fixed locations, fastest performance, zero cost

```javascript
// scripts/precompute-isochrones.js
import fs from 'fs';
import { Openrouteservice } from 'openrouteservice-js';

const ors = new Openrouteservice({ api_key: process.env.ORS_API_KEY });

const cities = [
  { name: 'san-francisco', lat: 37.7749, lon: -122.4194 },
  { name: 'new-york', lat: 40.7128, lon: -74.0060 },
  { name: 'london', lat: 51.5074, lon: -0.1278 },
  { name: 'tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'paris', lat: 48.8566, lon: 2.3522 }
];

const times = [600, 1200, 1800]; // 10, 20, 30 minutes

async function precomputeAll() {
  for (const city of cities) {
    for (const time of times) {
      const result = await ors.isochrones({
        locations: [[city.lon, city.lat]],
        profile: 'driving-car',
        range: [time]
      });

      const filename = `public/isochrones/${city.name}-${time}.json`;
      fs.writeFileSync(filename, JSON.stringify(result, null, 2));

      console.log(`Generated ${filename}`);

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}

precomputeAll();
```

**Usage:**
```typescript
// app/page.tsx
import sanFrancisco30min from '@/public/isochrones/san-francisco-1800.json';

export default function Home() {
  return (
    <IsochroneMap precomputedIsochrone={sanFrancisco30min} />
  );
}
```

**Pros:**
- ✅ **Instant loading** - no API calls
- ✅ Zero runtime cost
- ✅ Works offline
- ✅ No rate limits

**Cons:**
- ❌ Fixed locations only
- ❌ Can't handle dynamic queries
- ❌ Larger bundle size if many cities
- ❌ Less impressive as a demo

**Implementation Time:** 4-8 hours (including precomputation)

---

## Part 5: Code Examples

### Complete Example: Interactive Isochrone Map with React + Leaflet

```typescript
// app/components/InteractiveIsochroneMap.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface IsochroneMapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
}

export default function InteractiveIsochroneMap({
  initialCenter = [37.7749, -122.4194],
  initialZoom = 12
}: IsochroneMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [loading, setLoading] = useState(false);
  const [isochroneLayer, setIsochroneLayer] = useState<L.GeoJSON | null>(null);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || map) return;

    const newMap = L.map(mapRef.current).setView(initialCenter, initialZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(newMap);

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  // Handle map click
  useEffect(() => {
    if (!map) return;

    const handleClick = async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      // Update marker
      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        const newMarker = L.marker([lat, lng]).addTo(map);
        setMarker(newMarker);
      }

      // Generate isochrone
      await generateIsochrone(lat, lng);
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map, marker]);

  const generateIsochrone = async (lat: number, lon: number) => {
    setLoading(true);

    try {
      const response = await fetch('/api/isochrone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat,
          lon,
          time: 1800,
          profile: 'driving-car'
        })
      });

      const data = await response.json();

      // Remove old isochrone
      if (isochroneLayer && map) {
        map.removeLayer(isochroneLayer);
      }

      // Add new isochrone
      if (map) {
        const newLayer = L.geoJSON(data, {
          style: {
            fillColor: '#3388ff',
            fillOpacity: 0.3,
            color: '#3388ff',
            weight: 2
          }
        }).addTo(map);

        setIsochroneLayer(newLayer);

        // Fit map to isochrone bounds
        map.fitBounds(newLayer.getBounds());
      }
    } catch (error) {
      console.error('Error generating isochrone:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div ref={mapRef} className="h-[600px] w-full rounded-lg shadow-lg" />

      {loading && (
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded shadow">
          Generating isochrone...
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white p-4 rounded shadow">
        <p className="text-sm font-medium">Click anywhere to generate a 30-minute drive-time isochrone</p>
      </div>
    </div>
  );
}
```

### Advanced: Multi-Profile Isochrones

```typescript
// app/components/MultiProfileIsochroneMap.tsx
'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

const profiles = [
  { id: 'driving-car', label: 'Driving', color: '#3388ff', maxSpeed: 70 },
  { id: 'cycling-regular', label: 'Cycling', color: '#33ff88', maxSpeed: 15 },
  { id: 'foot-walking', label: 'Walking', color: '#ff8833', maxSpeed: 3 }
];

const times = [600, 1200, 1800]; // 10, 20, 30 minutes

export default function MultiProfileIsochroneMap() {
  const [isochrones, setIsochrones] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState('driving-car');
  const [selectedTime, setSelectedTime] = useState(1800);
  const [loading, setLoading] = useState(false);

  const generateIsochrone = async (lat: number, lon: number) => {
    setLoading(true);

    try {
      // Generate isochrones for all profiles
      const results = await Promise.all(
        profiles.map(async (profile) => {
          const response = await fetch('/api/isochrone', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lat,
              lon,
              time: selectedTime,
              profile: profile.id
            })
          });

          const data = await response.json();

          return {
            profile: profile.id,
            color: profile.color,
            data
          };
        })
      );

      setIsochrones(results);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <select
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>

        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(Number(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          {times.map((t) => (
            <option key={t} value={t}>{t / 60} minutes</option>
          ))}
        </select>
      </div>

      <MapContainer center={[37.7749, -122.4194]} zoom={12} style={{ height: '600px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {isochrones.map((iso, idx) => (
          <GeoJSON
            key={idx}
            data={iso.data}
            style={{
              fillColor: iso.color,
              fillOpacity: 0.2,
              color: iso.color,
              weight: 2
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
```

---

## Part 6: Realistic Implementation Timeline

### **Option 1: API-Based Demo (Recommended for IsoMap.io)**

**Total Time: 1 day**

| Task | Time | Details |
|------|------|---------|
| Set up ORS account + API key | 15 min | Free signup at openrouteservice.org |
| Create Next.js API route | 1 hour | `/api/isochrone/route.ts` |
| Implement Leaflet map component | 2 hours | React + Leaflet integration |
| Add loading states + error handling | 1 hour | UX improvements |
| Style and polish | 2 hours | Tailwind styling |
| Test with multiple cities | 1 hour | QA |

**Deliverables:**
- ✅ Working demo with unlimited test locations
- ✅ 500 requests/day (sufficient for demo)
- ✅ Professional-looking visualization
- ✅ Mobile-responsive

**Limitations:**
- Max 500 isochrones/day on free tier
- Requires API key
- Network dependency

---

### **Option 2: Self-Hosted OSRM**

**Total Time: 3-4 days**

| Task | Time | Details |
|------|------|---------|
| Set up DigitalOcean droplet (4GB RAM) | 30 min | $20/month |
| Download OSM data (California) | 1 hour | ~500MB download |
| Preprocess with OSRM | 2-4 hours | CPU-intensive |
| Set up Docker Compose | 2 hours | OSRM + custom API |
| Build Node.js isochrone API | 4 hours | Using osrm-isochrone library |
| Deploy and configure | 2 hours | NGINX, SSL, etc. |
| Integration with Next.js frontend | 2 hours | Update API endpoints |
| Testing and optimization | 4 hours | Performance tuning |

**Deliverables:**
- ✅ Unlimited requests
- ✅ <100ms response time
- ✅ Full control over infrastructure
- ✅ Can cover entire US or global

**Ongoing Costs:**
- $20-40/month for hosting
- Occasional data updates

---

### **Option 3: Pre-computed Static Data**

**Total Time: 1-2 days**

| Task | Time | Details |
|------|------|---------|
| Identify top 50 cities | 1 hour | Research target markets |
| Write precomputation script | 2 hours | Node.js + ORS API |
| Run precomputation (with rate limiting) | 6-8 hours | Automated overnight |
| Organize GeoJSON files | 1 hour | File structure |
| Build city selector UI | 2 hours | Dropdown or map |
| Integrate with Leaflet | 2 hours | Load static GeoJSON |
| Testing | 2 hours | Verify all cities work |

**Deliverables:**
- ✅ Instant loading (no API calls)
- ✅ Works offline
- ✅ Zero runtime costs
- ✅ 50 cities × 3 times × 3 profiles = 450 pre-rendered isochrones

**Limitations:**
- Fixed locations only
- No dynamic queries
- Larger initial bundle size

---

## Part 7: Final Recommendation for IsoMap.io

### **Phase 1: Demo/Validation (Now - Week 1)**

**Use:** OpenRouteService API + Next.js API Routes + Leaflet

**Why:**
1. ✅ **Fastest to implement** - Working demo in 1 day
2. ✅ **Free tier is sufficient** - 500/day plenty for validation
3. ✅ **Professional appearance** - Real routing data, not mock
4. ✅ **Fully interactive** - Users can test any location
5. ✅ **Zero infrastructure** - Focus on product-market fit

**Implementation:**
```bash
# 1. Sign up for ORS API key
https://openrouteservice.org/dev/#/signup

# 2. Create API route
# /app/api/isochrone/route.ts (see code examples above)

# 3. Build Leaflet component
# /app/components/IsochroneMap.tsx

# 4. Deploy to Vercel
vercel --prod
```

**Expected Results:**
- Working demo within 8 hours
- Can generate isochrones for any location globally
- 500 daily requests = ~15,000/month (plenty for validation)

---

### **Phase 2: Paid Beta (Month 2-3)**

**Use:** Self-hosted OSRM in Docker (DigitalOcean)

**Why:**
1. ✅ **Remove API limits** - Unlimited requests
2. ✅ **Faster response** - <100ms vs ~500ms API
3. ✅ **Better reliability** - No external dependencies
4. ✅ **Cost-effective** - $20-40/month vs metered pricing

**Setup:**
```bash
# DigitalOcean droplet specs
- 4GB RAM / 2 vCPUs
- 50GB SSD
- $24/month

# Coverage options
Option A: US-only (10GB data)
Option B: North America (15GB data)
Option C: Global (40GB data, 8GB RAM recommended)
```

---

### **Phase 3: Production Scale (Month 4+)**

**Use:** Multiple OSRM instances + CDN + Caching

**Architecture:**
```
User Request
  → Cloudflare (caching layer)
  → Load Balancer
  → OSRM Instance 1 (US West)
  → OSRM Instance 2 (US East)
  → OSRM Instance 3 (Europe)
```

**Estimated Costs:**
- 3x DigitalOcean droplets: $72/month
- Cloudflare CDN: $20/month
- Load balancer: $12/month
- **Total: ~$100/month** for global coverage

---

## Appendix: Additional Resources

### Academic Papers
- "Fast Computation of Continental-Sized Isochrones" - https://escholarship.org/content/qt71h533kp/qt71h533kp_noSplash_20421591513f53387b748d32ffc5f519.pdf
- "Scalable Computation of Isochrones with Network Expiration" - Springer

### Tools and Libraries
- **OSRM Backend:** https://github.com/Project-OSRM/osrm-backend
- **mapbox/osrm-isochrone:** https://github.com/mapbox/osrm-isochrone
- **Valhalla:** https://github.com/valhalla/valhalla
- **GraphHopper:** https://github.com/graphhopper/graphhopper
- **OpenRouteService:** https://github.com/GIScience/openrouteservice
- **Leaflet.Reachability:** https://github.com/traffordDataLab/leaflet.reachability
- **TurfJS:** https://github.com/Turfjs/turf
- **Concaveman:** https://github.com/mapbox/concaveman

### API Documentation
- **Mapbox Isochrone API:** https://docs.mapbox.com/api/navigation/isochrone/
- **OpenRouteService API:** https://openrouteservice.org/dev/#/api-docs/v2/isochrones
- **Targomo API:** https://www.targomo.com/developers/apis/isochrone/
- **TravelTime API:** https://docs.traveltime.com/api/reference/isochrones/

### Demo Servers
- **Valhalla Public Demo:** https://valhalla.openstreetmap.de
- **OSRM Public Demo:** https://map.project-osrm.org
- **GraphHopper Public Demo:** https://graphhopper.com/maps/

### Community Resources
- **OSM Wiki - Isochrone:** https://wiki.openstreetmap.org/wiki/Isochrone
- **GraphHopper Forum:** https://discuss.graphhopper.com/c/graphhopper/isochrone/17
- **OpenRouteService Forum:** https://ask.openrouteservice.org/c/isochrones

---

## Sources

### Technical Implementation & Algorithms
- [Targomo Intro to Isochrones](https://github.com/targomo/intro-to-isochrones/blob/main/intro-to-isochrones.md)
- [Mapbox Isochrone API Documentation](https://docs.mapbox.com/api/navigation/isochrone/)
- [Creating Isochrones: What is the Optimal Way?](https://medium.com/@arthur.dolmajian/creating-isochrones-what-is-the-optimal-way-dfc77a2ca13a)
- [Generating Isochrones Using Dijkstra's Algorithm](https://medium.com/@niharrm.2001/generating-isochrones-using-dijkstras-algorithm-and-openstreetmap-data-in-node-js-78f66254c4f3)
- [Isochrone - OpenStreetMap Wiki](https://wiki.openstreetmap.org/wiki/Isochrone)

### Open Source Libraries
- [OSRM Backend Repository](https://github.com/Project-OSRM/osrm-backend)
- [Mapbox OSRM-Isochrone](https://github.com/mapbox/osrm-isochrone)
- [Valhalla Routing Engine](https://github.com/valhalla/valhalla)
- [GraphHopper Repository](https://github.com/graphhopper/graphhopper)
- [OpenRouteService JavaScript Library](https://github.com/GIScience/openrouteservice-js)
- [Leaflet.Reachability Plugin](https://github.com/traffordDataLab/leaflet.reachability)

### Performance & Algorithms
- [Fast Computation of Continental-Sized Isochrones](https://escholarship.org/content/qt71h533kp/qt71h533kp_noSplash_20421591513f53387b748d32ffc5f519.pdf)
- [Alpha Shapes and Concave Hulls](https://alastaira.wordpress.com/2011/03/22/alpha-shapes-and-concave-hulls/)
- [Concaveman Algorithm](https://github.com/mapbox/concaveman)
- [cppRouting - Graph Routing Algorithms](https://github.com/vlarmet/cppRouting)

### API Services & Documentation
- [OpenRouteService](https://openrouteservice.org/)
- [OpenRouteService API Restrictions](https://openrouteservice.org/restrictions/)
- [Valhalla Documentation](https://valhalla.github.io/valhalla/)
- [GraphHopper Isochrone API](https://docs.graphhopper.com/openapi/isochrones)

### Data & Tools
- [OpenStreetMap Data Downloads](https://wiki.openstreetmap.org/wiki/Downloading_data)
- [Overpass Turbo](https://overpass-turbo.eu/)
- [Geofabrik OSM Downloads](http://download.geofabrik.de/)

### Comparison & Benchmarks
- [OSRM vs Valhalla Comparison](https://stackshare.io/stackups/osrm-vs-valhalla)
- [GraphHopper vs OSRM Performance](https://www.magicwise.org/informatique/graphhopper-vs-osrm-le-comparatif-performance-latence-memoire-scalabilite-avec-tests-reels/)
- [Routing Engine Comparison on Hacker News](https://news.ycombinator.com/item?id=17001422)

---

**Document Version:** 1.0
**Last Updated:** December 15, 2025
**Author:** Research Analysis for IsoMap.io
**Next Review:** After Phase 1 implementation
