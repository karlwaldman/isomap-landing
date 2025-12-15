---
title: "What is an Isodistance Map? Complete Developer Guide [2025]"
description: "Learn how isodistance maps show equal distance zones along road networks, with API examples, use cases, and key differences from isochrone maps."
date: "2025-12-15"
keywords: "isodistance map, distance buffer, road network distance, isoline distance, GIS distance analysis, routing API"
author: "IsoMap Team"
---

# What is an Isodistance Map? Complete Developer Guide [2025]

A logistics company needs to determine which customers are within 10 kilometers of their warehouse—but not "as the crow flies." They need the actual driving distance along roads. A cycling app wants to show all bike-friendly routes within 5 kilometers of a user's location. A delivery service caps orders at 15 kilometers of network distance to ensure food quality. These scenarios require isodistance maps.

An isodistance map displays areas reachable within a specified distance along a transportation network (roads, paths, railways) from a starting point. Unlike simple circular buffers that measure straight-line distance, isodistances account for the actual routes people and vehicles must follow, creating irregular polygons that conform to network geometry.

This comprehensive guide explains what isodistance maps are, how they differ from isochrones, their technical implementation, real-world applications, and code examples for developers integrating distance-based spatial analysis into applications.

## What is an Isodistance Map?

An isodistance map, also called a network distance buffer or distance-based isoline, shows all locations accessible within a given distance measured along a transportation network from an origin point. The term combines "iso" (equal) with "distance," literally meaning "equal distance."

### Etymology and Conceptual Origins

While the concept of distance-based buffers has existed in cartography for decades, the term "isodistance" gained prominence with the rise of network analysis in GIS and routing APIs. Unlike historical distance measurements that often used straight-line Euclidean distance, modern isodistances follow the actual topology of road, rail, or path networks.

Isodistance analysis evolved from network theory in graph mathematics, where measuring "shortest path distance" along network edges became fundamental to optimization problems in transportation, logistics, and urban planning.

### Visual Characteristics

An isodistance map typically shows:

- **Colored polygons** representing areas within specific network distances (e.g., 5km, 10km, 15km)
- **Irregular shapes** that extend along highways and major roads while constrained by network topology
- **Network adherence** where the boundary follows actual routes rather than straight lines
- **Discontinuous regions** when roads or paths don't connect certain areas within the distance limit

For example, a 10-kilometer isodistance from a city center might extend 12 kilometers along a highway in one direction but only 7 kilometers along local roads in another direction, depending on road layouts and connectivity.

### Key Characteristics

**1. Network-Based Measurement**

Isodistances measure distance traveled along roads, paths, or other networks, not straight-line (Euclidean) distance:

```
Isodistance: Follow road segments to measure actual travel distance
Euclidean buffer: Draw circle based on straight-line distance
```

**2. Mode-Independent (Typically)**

Unlike isochrones which vary significantly by transportation mode due to speed differences, isodistances are generally mode-independent for the same network:

- 10km driving distance ≈ 10km cycling distance (on the same roads)
- However, mode matters when networks differ (bike paths vs. highways)

**3. Traffic-Insensitive**

Isodistances don't consider traffic, congestion, or speed. A 5km distance remains 5km regardless of whether it takes 5 minutes or 30 minutes to drive.

**4. Asymmetric Geometry**

Like isochrones, isodistance polygons are rarely circular. They conform to road network topology, creating elongated shapes along highways and constricted shapes in areas with limited connectivity.

## Isodistance vs. Isochrone: Key Differences

Understanding when to use isodistance vs. isochrone is critical for developers:

| Aspect | Isodistance | Isochrone |
|--------|-------------|-----------|
| **Metric** | Distance (km, miles) | Time (minutes, hours) |
| **Traffic sensitivity** | No | Yes |
| **Mode dependency** | Low (same network) | High (speed varies) |
| **Use case** | Distance-based pricing, vehicle range | Time-sensitive delivery, commute analysis |
| **Consistency** | Static over time | Changes with traffic patterns |
| **Example** | "10km delivery radius" | "30-minute delivery window" |

### When to Use Isodistance

**Appropriate scenarios:**
- Distance-based pricing (delivery fees per kilometer)
- Vehicle range analysis (electric vehicle range)
- Running/cycling route discovery
- Regulatory distance requirements (e.g., "must be within 5km of fire station")
- Maritime or aviation navigation (where time varies with weather)

**Example:** An electric scooter sharing service displays all scooters within a 2-kilometer network distance of the user's location, ensuring they can reasonably reach any shown scooter.

### When to Use Isochrone

**Appropriate scenarios:**
- Time-sensitive delivery commitments
- Commute-based real estate search
- Emergency service response areas
- Appointment scheduling and ETAs
- Rush hour vs. off-peak analysis

**Example:** A food delivery app promises 30-minute delivery, requiring isochrone analysis because traffic conditions dramatically affect delivery times during different hours.

### Combining Both Approaches

Many applications benefit from using both:

```python
# Example: Delivery zone analysis
def analyze_delivery_zone(warehouse_location):
    # Distance constraint: Don't deliver beyond 25km
    max_distance_zone = get_isodistance(warehouse_location, 25, mode='driving')

    # Time constraint: Must deliver within 45 minutes
    max_time_zone = get_isochrone(warehouse_location, 45, mode='driving')

    # Actual delivery zone is the intersection
    delivery_zone = max_distance_zone.intersection(max_time_zone)

    return delivery_zone
```

## How Isodistance Maps Work

### Algorithm and Calculation

Isodistance generation uses graph traversal algorithms similar to isochrones but with distance accumulation instead of time:

**1. Network Graph Representation**

The transportation network is modeled as a graph:
- **Nodes:** Intersections, junctions, points of interest
- **Edges:** Road segments, paths, connections
- **Weights:** Physical distance (meters, kilometers)

**2. Distance Accumulation**

Starting from the origin, the algorithm expands along network edges, tracking cumulative distance:

```python
def generate_isodistance(origin, max_distance, mode='driving'):
    """
    Generate isodistance polygon using Dijkstra's algorithm

    Args:
        origin: (lat, lon) starting point
        max_distance: Maximum network distance in meters
        mode: Transportation mode (affects allowed road types)

    Returns:
        GeoJSON polygon
    """
    visited = set()
    distances = {origin: 0}
    priority_queue = [(0, origin)]  # (distance, node)
    boundary_nodes = []

    while priority_queue:
        current_dist, current_node = heapq.heappop(priority_queue)

        if current_dist > max_distance:
            boundary_nodes.append(current_node)
            continue

        if current_node in visited:
            continue

        visited.add(current_node)

        # Explore neighbors
        for neighbor in get_road_network_neighbors(current_node, mode):
            edge_length = calculate_edge_length(current_node, neighbor)
            new_distance = current_dist + edge_length

            if new_distance <= max_distance:
                if neighbor not in distances or new_distance < distances[neighbor]:
                    distances[neighbor] = new_distance
                    heapq.heappush(priority_queue, (new_distance, neighbor))

    # Generate polygon from boundary nodes
    return create_polygon_from_nodes(boundary_nodes)
```

**3. Geodesic vs. Planar Distance**

For accuracy over large areas, algorithms use geodesic distance calculation:

```python
from math import radians, sin, cos, sqrt, atan2

def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculate great-circle distance between two points on Earth

    Returns distance in meters
    """
    R = 6371000  # Earth radius in meters

    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))

    return R * c
```

### Data Requirements

Accurate isodistance mapping requires:

1. **Road Network Data**: OpenStreetMap, proprietary maps (TomTom, HERE)
2. **Network Topology**: Connectivity information (which roads connect)
3. **Road Classifications**: To filter by mode (e.g., exclude highways for walking)
4. **Elevation Data**: (Optional) For actual distance along slopes
5. **Network Restrictions**: One-way streets, turn restrictions

### Mathematical Foundation

An isodistance represents a level set of the network distance function:

```
D(d) = {p ∈ Space | NetworkDistance(origin, p) ≤ d}
```

Where `NetworkDistance(origin, p)` is the shortest path distance from origin to point p measured along the transportation network.

For a graph G = (V, E) with edge lengths L(e):

```
NetworkDistance(u, v) = min Σ L(e) for all paths from u to v
```

## Use Cases & Applications

### Logistics and Delivery

**Distance-Based Delivery Pricing**

Many delivery services charge by network distance rather than time:

```
Delivery Fee = Base Fee + (Distance in km × Per-km Rate)
```

**Example:** A courier service charges:
- $5 base fee
- $0.75 per kilometer of network distance

For a 12km delivery:
```
Total = $5 + (12 × $0.75) = $14.00
```

Isodistance zones help visualize pricing tiers on a map, letting customers understand delivery costs before ordering.

**Fleet Range Analysis**

Electric delivery vehicles have limited range. Isodistance analysis determines operational coverage:

```python
def calculate_delivery_coverage(depot, vehicle_range_km):
    """
    Calculate how many customers can be served given vehicle range

    Assumes vehicle must return to depot (round-trip)
    """
    max_one_way = vehicle_range_km / 2  # Must return to depot

    coverage_zone = get_isodistance(depot, max_one_way * 1000, mode='driving')

    customers_in_zone = count_points_in_polygon(
        customers_db.all(),
        coverage_zone
    )

    return {
        'coverage_zone': coverage_zone,
        'customers_served': customers_in_zone,
        'coverage_area_sqkm': coverage_zone.area / 1e6
    }
```

**ROI:** Electric vehicle adoption with 200km range serving 85% of customers within 40km delivery zone, reducing fuel costs by $45,000/year.

### Fitness and Recreation

**Running and Cycling Route Discovery**

Fitness apps show routes within a specified distance:

- "Show me all 5km running routes from my location"
- "Find bike trails within 10km that I can access"

**Example:** A trail running app generates 5km, 10km, and 15km isodistances, then overlays trail data to highlight accessible routes within each distance band.

**Event Planning**

Race organizers use isodistances to plan courses:

```python
# Generate a 21.1km half-marathon route
start_finish = (40.7580, -73.9855)  # Central Park

# Find all points ~10.5km away (half the race distance)
turnaround_zone = get_isodistance(start_finish, 10500, mode='walking')

# Course must start, reach turnaround_zone, and return
```

### Real Estate and Urban Planning

**Walkability Analysis**

Urban planners evaluate pedestrian access to amenities:

```python
def calculate_walkability_score(address):
    """
    Calculate walkability based on amenities within walking distance
    """
    location = geocode(address)

    # 15-minute walk ≈ 1.2km at average speed
    walk_zone = get_isodistance(location, 1200, mode='walking')

    amenities = {
        'grocery_stores': count_pois_in_zone(walk_zone, 'grocery'),
        'restaurants': count_pois_in_zone(walk_zone, 'restaurant'),
        'parks': count_pois_in_zone(walk_zone, 'park'),
        'transit_stops': count_pois_in_zone(walk_zone, 'transit'),
        'schools': count_pois_in_zone(walk_zone, 'school')
    }

    # Weighted scoring
    score = (
        amenities['grocery_stores'] * 15 +
        amenities['restaurants'] * 10 +
        amenities['parks'] * 12 +
        amenities['transit_stops'] * 20 +
        amenities['schools'] * 18
    )

    return min(score, 100)  # Cap at 100
```

**Zoning Regulations**

Many jurisdictions have distance-based requirements:

- "Liquor stores must be 500m from schools"
- "New development must be within 800m of public transit"
- "Food deserts: areas > 1.6km from grocery stores"

Isodistance analysis helps verify compliance and identify gaps.

### Electric Vehicle Planning

**Charging Station Coverage**

EV charging networks analyze coverage using isodistance:

```python
def analyze_charging_coverage(station_locations, average_ev_range=400):
    """
    Determine if charging network provides adequate coverage

    Assumes drivers need charging station within half their range
    """
    safety_margin = 0.7  # 70% of range for safety
    max_distance = (average_ev_range / 2) * safety_margin

    coverage_zones = []
    for station in station_locations:
        zone = get_isodistance(station, max_distance * 1000, mode='driving')
        coverage_zones.append(zone)

    # Merge all coverage zones
    total_coverage = unary_union(coverage_zones)

    # Compare to major highway network
    highway_network = load_highway_network()
    coverage_percentage = (
        highway_network.intersection(total_coverage).length /
        highway_network.length * 100
    )

    return {
        'highway_coverage_pct': coverage_percentage,
        'coverage_area_sqkm': total_coverage.area / 1e6,
        'gaps': highway_network.difference(total_coverage)
    }
```

**ROI:** Charging network achieves 94% highway coverage with 250 stations, reducing range anxiety and increasing EV adoption by 23%.

### Emergency Services

**Response Area Definition**

Fire departments, ambulances, and police often define service areas by distance:

```python
def map_emergency_response_areas(fire_stations):
    """
    Map fire station coverage (typically 5km response area)
    """
    coverage_maps = []

    for station in fire_stations:
        # Primary response area: 5km
        primary = get_isodistance(station['location'], 5000, mode='driving')

        # Extended response area: 10km
        extended = get_isodistance(station['location'], 10000, mode='driving')

        coverage_maps.append({
            'station_id': station['id'],
            'station_name': station['name'],
            'primary_zone': primary,
            'extended_zone': extended
        })

    # Identify gaps in coverage
    city_boundary = load_city_boundary()
    all_primary = unary_union([m['primary_zone'] for m in coverage_maps])
    coverage_gaps = city_boundary.difference(all_primary)

    return coverage_maps, coverage_gaps
```

## Tools & APIs

### Commercial APIs with Isodistance Support

#### Geoapify Isoline API

**Capabilities:**
- Distance-based isolines (isodistances)
- Up to 60 kilometers
- Multiple transport modes
- GeoJSON output

**Example Request:**

```bash
curl -X GET "https://api.geoapify.com/v1/isoline?lat=51.5&lon=-0.1&range=5000&type=distance&mode=drive&apiKey=YOUR_KEY"
```

**Response:**
```json
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "mode": "drive",
      "range": 5000,
      "range_type": "distance"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [...]
    }
  }]
}
```

**Pricing:** Free tier: 3,000 requests/day; Business plans from $299/month

#### GraphHopper API

**Capabilities:**
- Distance-based isochrones
- Multiple profiles (car, bike, foot, motorcycle)
- Custom routing profiles
- Self-hosted option available

**Example Request:**

```bash
curl "https://graphhopper.com/api/1/isochrone?point=51.131,12.414&distance_limit=10000&vehicle=car&key=YOUR_KEY"
```

**Pricing:** Free tier: 500 requests/day; Premium from $99/month

#### Mapbox Isochrone API (with distance parameter)

While primarily time-based, Mapbox supports distance through custom parameters:

```javascript
const response = await fetch(
  `https://api.mapbox.com/isochrone/v1/mapbox/driving/-122.4194,37.7749?` +
  `contours_meters=5000,10000,15000&polygons=true&access_token=${token}`
);
```

#### IsoMap API

**Capabilities:**
- High-performance isodistance generation
- Global road network coverage
- Both distance and time-based isolines
- WebSocket support for real-time updates

```javascript
const response = await fetch('https://api.isomap.io/v1/isodistance', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    origin: { lat: 37.7749, lon: -122.4194 },
    mode: 'driving',
    distances: [5000, 10000, 15000],  // meters
    units: 'metric'
  })
});
```

### Open-Source Solutions

#### OSRM (Open Source Routing Machine)

Self-hosted routing with isodistance capabilities:

```bash
# Build distance table
curl "http://localhost:5000/table/v1/driving/-122.42,37.78;-122.45,37.77;-122.40,37.76?annotations=distance"
```

#### Valhalla

Open-source routing engine with isochrone/isodistance support:

```json
{
  "locations": [{"lat": 40.7128, "lon": -74.0060}],
  "costing": "auto",
  "contours": [
    {"distance": 5},
    {"distance": 10}
  ],
  "distance_units": "km"
}
```

### GIS Platform Tools

#### PostGIS pgRouting

Database-level routing and distance analysis:

```sql
-- Generate isodistance using pgRouting
SELECT ST_ConvexHull(ST_Collect(the_geom)) AS isodistance_polygon
FROM (
  SELECT v.the_geom
  FROM pgr_drivingDistance(
    'SELECT id, source, target, cost FROM roads',
    (SELECT id FROM nodes WHERE geom = ST_SetSRID(ST_MakePoint(-122.4194, 37.7749), 4326)),
    10000,  -- 10km distance limit
    false
  ) AS route
  JOIN nodes AS v ON route.node = v.id
) AS reachable_nodes;
```

## Code Examples

### JavaScript: Interactive Isodistance Map

```javascript
// Create interactive isodistance map with Leaflet
class IsodistanceMap {
  constructor(mapElementId, apiKey) {
    this.map = L.map(mapElementId).setView([37.7749, -122.4194], 12);
    this.apiKey = apiKey;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.distanceLayers = [];
  }

  async generateIsodistances(lat, lon, distances = [5000, 10000, 15000]) {
    // Clear existing layers
    this.distanceLayers.forEach(layer => this.map.removeLayer(layer));
    this.distanceLayers = [];

    const colors = ['#4CAF50', '#FFC107', '#F44336'];

    // Generate isodistance for each distance
    for (let i = 0; i < distances.length; i++) {
      const response = await fetch('https://api.isomap.io/v1/isodistance', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin: { lat, lon },
          mode: 'driving',
          distances: [distances[i]],
          units: 'metric'
        })
      });

      const geojson = await response.json();

      const layer = L.geoJSON(geojson, {
        style: {
          fillColor: colors[i],
          fillOpacity: 0.2,
          color: colors[i],
          weight: 2
        }
      }).bindPopup(`${distances[i] / 1000}km zone`);

      layer.addTo(this.map);
      this.distanceLayers.push(layer);
    }

    // Add marker at origin
    L.marker([lat, lon]).addTo(this.map)
      .bindPopup('Origin')
      .openPopup();
  }

  // Allow user to click map to set new origin
  enableClickToGenerate() {
    this.map.on('click', (e) => {
      this.generateIsodistances(e.latlng.lat, e.latlng.lng);
    });
  }
}

// Usage
const isoMap = new IsodistanceMap('map', 'YOUR_API_KEY');
isoMap.enableClickToGenerate();

// Generate default isodistances
isoMap.generateIsodistances(37.7749, -122.4194, [3000, 6000, 9000]);
```

### Python: Delivery Zone Optimization

```python
import requests
import geopandas as gpd
from shapely.geometry import Point, shape
from shapely.ops import unary_union

class DeliveryZoneOptimizer:
    """Optimize delivery zones using isodistance analysis"""

    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://api.isomap.io/v1/isodistance'

    def get_isodistance(self, lat, lon, distance_meters, mode='driving'):
        """Fetch isodistance polygon from API"""
        response = requests.post(
            self.base_url,
            headers={'Authorization': f'Bearer {self.api_key}'},
            json={
                'origin': {'lat': lat, 'lon': lon},
                'mode': mode,
                'distances': [distance_meters],
                'units': 'metric'
            }
        )

        if response.status_code == 200:
            geojson = response.json()
            return shape(geojson['features'][0]['geometry'])
        else:
            raise Exception(f"API error: {response.status_code}")

    def optimize_hub_locations(self, candidate_hubs, max_delivery_distance,
                                customers_gdf):
        """
        Select optimal hub locations to maximize customer coverage

        Args:
            candidate_hubs: List of (lat, lon, cost) tuples
            max_delivery_distance: Maximum delivery distance in meters
            customers_gdf: GeoDataFrame with customer locations

        Returns:
            Selected hubs and coverage analysis
        """
        hub_analysis = []

        for lat, lon, cost in candidate_hubs:
            # Generate isodistance
            coverage = self.get_isodistance(lat, lon, max_delivery_distance)

            # Count customers in coverage
            customers_in_zone = customers_gdf[
                customers_gdf.geometry.within(coverage)
            ]

            # Calculate metrics
            hub_analysis.append({
                'location': (lat, lon),
                'cost': cost,
                'coverage_area_sqkm': coverage.area / 1e6,
                'customers_covered': len(customers_in_zone),
                'revenue_potential': customers_in_zone['avg_order_value'].sum(),
                'cost_per_customer': cost / max(len(customers_in_zone), 1),
                'polygon': coverage
            })

        # Sort by ROI (revenue potential / cost)
        hub_analysis.sort(
            key=lambda x: x['revenue_potential'] / x['cost'],
            reverse=True
        )

        return hub_analysis

    def find_coverage_gaps(self, selected_hubs, max_distance, service_area):
        """Find areas not covered by any hub"""
        all_coverage = []

        for lat, lon in selected_hubs:
            coverage = self.get_isodistance(lat, lon, max_distance)
            all_coverage.append(coverage)

        total_coverage = unary_union(all_coverage)
        gaps = service_area.difference(total_coverage)

        return gaps

# Example usage
optimizer = DeliveryZoneOptimizer('YOUR_API_KEY')

# Candidate warehouse locations
candidates = [
    (37.7749, -122.4194, 50000),  # San Francisco, $50k/month
    (37.8044, -122.2712, 35000),  # Oakland, $35k/month
    (37.3382, -121.8863, 40000),  # San Jose, $40k/month
]

# Load customer data
customers = gpd.read_file('customers.geojson')

# Analyze hubs
results = optimizer.optimize_hub_locations(
    candidates,
    max_delivery_distance=15000,  # 15km
    customers_gdf=customers
)

# Print results
for i, hub in enumerate(results, 1):
    print(f"\nHub {i}: {hub['location']}")
    print(f"  Cost: ${hub['cost']:,}/month")
    print(f"  Customers: {hub['customers_covered']:,}")
    print(f"  Revenue potential: ${hub['revenue_potential']:,.2f}/month")
    print(f"  ROI: {hub['revenue_potential'] / hub['cost']:.2f}x")
    print(f"  Cost per customer: ${hub['cost_per_customer']:.2f}")
```

### Output Example

```
Hub 1: (37.8044, -122.2712)
  Cost: $35,000/month
  Customers: 4,523
  Revenue potential: $156,820.50/month
  ROI: 4.48x
  Cost per customer: $7.74

Hub 2: (37.7749, -122.4194)
  Cost: $50,000/month
  Customers: 5,891
  Revenue potential: $187,450.25/month
  ROI: 3.75x
  Cost per customer: $8.49
```

## Best Practices

### Choosing the Right Distance Metric

**Network Distance** (recommended for most use cases)
- Follows actual roads and paths
- Represents realistic travel distance
- Best for: Delivery, cycling routes, urban planning

**Euclidean Distance** (straight-line)
- Ignores obstacles and networks
- Useful for: Rough estimates, flight paths, theoretical analysis

**Geodesic Distance** (great-circle)
- Accounts for Earth's curvature
- Essential for: Long distances, maritime navigation, aviation

```python
# Example: Compare distance metrics
from geopy.distance import geodesic
from shapely.geometry import Point

origin = (37.7749, -122.4194)
destination = (34.0522, -118.2437)

# Euclidean (planar) - WRONG for lat/lon
euclidean = Point(origin).distance(Point(destination)) * 111  # rough km conversion

# Geodesic (great-circle) - correct straight-line distance
geodesic_dist = geodesic(origin, destination).kilometers

# Network distance (via routing API)
network_dist = get_route_distance(origin, destination, mode='driving')

print(f"Euclidean: {euclidean:.2f} km")        # ~559 km (incorrect)
print(f"Geodesic: {geodesic_dist:.2f} km")     # ~559 km (correct straight-line)
print(f"Network: {network_dist:.2f} km")        # ~615 km (actual driving distance)
```

### Performance Optimization

**1. Batch Processing**

Generate multiple isodistances in parallel:

```python
import asyncio
import aiohttp

async def fetch_isodistance(session, lat, lon, distance):
    async with session.post(
        'https://api.isomap.io/v1/isodistance',
        headers={'Authorization': f'Bearer {API_KEY}'},
        json={'origin': {'lat': lat, 'lon': lon}, 'distances': [distance]}
    ) as response:
        return await response.json()

async def batch_isodistances(locations, distance):
    async with aiohttp.ClientSession() as session:
        tasks = [
            fetch_isodistance(session, lat, lon, distance)
            for lat, lon in locations
        ]
        return await asyncio.gather(*tasks)

# Generate 100 isodistances in parallel
locations = [(lat, lon) for lat, lon in warehouse_locations]
results = asyncio.run(batch_isodistances(locations, 10000))
```

**2. Caching Strategy**

Isodistances are static (don't change over time like isochrones):

```python
import hashlib
import json

def get_cached_isodistance(lat, lon, distance, mode, cache_backend):
    """Cache isodistance results indefinitely (they don't change)"""
    cache_key = hashlib.md5(
        f"isodist:{lat}:{lon}:{distance}:{mode}".encode()
    ).hexdigest()

    # Check cache
    cached = cache_backend.get(cache_key)
    if cached:
        return json.loads(cached)

    # Generate
    result = api_get_isodistance(lat, lon, distance, mode)

    # Cache permanently (no expiration)
    cache_backend.set(cache_key, json.dumps(result))

    return result
```

**3. Simplification**

Reduce polygon complexity for faster rendering:

```javascript
import { simplify } from '@turf/simplify';

// Simplify isodistance polygon
const simplified = simplify(isodistancePolygon, {
  tolerance: 0.001,  // Adjust based on zoom level
  highQuality: true
});

// File size reduction: 60-80% typical
```

### Accuracy Considerations

**1. Network Data Quality**

Isodistance accuracy depends entirely on road network data quality:

```python
# Validate network completeness
def validate_network_coverage(area_polygon, road_network):
    """Check if road network adequately covers the area"""

    # Calculate road density
    total_area = area_polygon.area / 1e6  # km²
    total_road_length = road_network.length / 1000  # km

    road_density = total_road_length / total_area  # km/km²

    # Typical urban areas: 8-15 km/km²
    # Suburban: 3-8 km/km²
    # Rural: 0.5-3 km/km²

    if road_density < 0.5:
        print("WARNING: Very low road density. Isodistances may be inaccurate.")

    return road_density
```

**2. Mode-Specific Networks**

Different modes should use appropriate road networks:

```python
# Filter network by mode
def get_mode_specific_network(full_network, mode):
    """Filter road network by transportation mode"""

    filters = {
        'driving': ['motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'residential'],
        'cycling': ['cycleway', 'primary', 'secondary', 'tertiary', 'residential', 'path'],
        'walking': ['footway', 'path', 'pedestrian', 'residential', 'living_street']
    }

    allowed_types = filters.get(mode, filters['driving'])

    return full_network[full_network['highway'].isin(allowed_types)]
```

### Common Pitfalls

**1. Confusing Distance Types**

```python
# ❌ WRONG: Using Euclidean distance for isodistance
buffer = origin.buffer(10 / 111)  # 10km as degrees

# ✅ CORRECT: Using network distance
isodistance = api.get_isodistance(origin, 10000, mode='driving')
```

**2. Ignoring One-Way Streets**

Network distance calculations must respect one-way restrictions:

```python
# Correct: Distance A→B may differ from B→A
distance_a_to_b = get_network_distance(a, b)
distance_b_to_a = get_network_distance(b, a)

assert distance_a_to_b != distance_b_to_a  # May be true with one-ways
```

**3. Not Accounting for Disconnected Networks**

Some areas may be inaccessible:

```python
def handle_disconnected_regions(isodistance_result):
    """Handle cases where isodistance returns multiple polygons"""

    if isodistance_result['geometry']['type'] == 'MultiPolygon':
        # Multiple disconnected regions
        polygons = isodistance_result['geometry']['coordinates']
        print(f"Warning: {len(polygons)} disconnected regions found")

        # Option 1: Keep only the largest
        largest = max(polygons, key=lambda p: Polygon(p[0]).area)

        # Option 2: Keep all (MultiPolygon)
        return MultiPolygon(polygons)
```

## Try IsoMap API

Ready to add isodistance mapping to your application? IsoMap provides fast, accurate distance-based isolines with global coverage.

**Get started:**

```javascript
// Sign up for free at isomap.io
const response = await fetch('https://api.isomap.io/v1/isodistance', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    origin: { lat: 37.7749, lon: -122.4194 },
    mode: 'driving',
    distances: [5000, 10000, 15000],  // 5, 10, 15km
    units: 'metric'
  })
});

const isodistances = await response.json();
```

**Features:**
- Global road network coverage
- Multiple transportation modes
- GeoJSON output
- Sub-second response times
- Unlimited caching (isodistances don't expire)

Visit [isomap.io](https://isomap.io) for API documentation and free tier access (1,000 requests/month).

## Frequently Asked Questions

### What's the difference between isodistance and isochrone?

Isodistance measures areas within a specified distance (e.g., 10km) along a network, while isochrone measures areas within a specified time (e.g., 30 minutes). Isodistances are static and traffic-independent; isochrones vary with traffic conditions and transportation mode speeds.

### Can I use isodistance for walking and cycling?

Yes. Isodistance works for any mode with a defined network. For walking, use pedestrian paths and sidewalk networks. For cycling, include bike lanes and bike-friendly roads. The distance remains constant regardless of mode, but the accessible area changes based on which network segments are allowed for that mode.

### How accurate are isodistances from APIs?

Accuracy depends on road network data quality. In urban areas with comprehensive OpenStreetMap coverage, accuracy is typically 95-98%. In rural or less-mapped regions, accuracy may drop to 80-90% due to incomplete network data or outdated road information.

### Why would I choose isodistance over isochrone?

Choose isodistance when:
- You have distance-based pricing or policies
- Analyzing vehicle range (electric vehicles, fuel range)
- Traffic conditions are irrelevant to your use case
- You need consistent results regardless of time of day
- Regulatory requirements specify distance (e.g., "within 5km of hospital")

### Can isodistances cross water or other obstacles?

Only if the network includes connections across those features. For example, if a bridge or ferry crosses water and is in the road network, the isodistance will extend across it. Otherwise, water bodies create natural boundaries. Some APIs offer "marine isodistance" for nautical applications.

---

**Sources:**
- [Geoapify Isoline API Documentation](https://www.geoapify.com/isoline-api/)
- [Geography Realm: Isodistance and Isochrone Maps](https://www.geographyrealm.com/isodistance-isochrone-maps/)
- [GraphHopper Isochrone API](https://docs.graphhopper.com/openapi/isochrones)
- [Medium: All Things Being Iso](https://medium.com/geospatial-analytics/all-things-being-iso-ec824a7812f9)
- [IGIS Map: Isodistance and Isochrone API](https://www.igismap.com/isodistance-and-isochrone-map-api/)
