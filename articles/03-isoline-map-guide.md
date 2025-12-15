---
title: "What is an Isoline Map? Complete Cartography Guide [2025]"
description: "Learn about isoline maps (isarithmic maps), how they visualize continuous data through contour lines, with examples, algorithms, and GIS applications."
date: "2025-12-15"
keywords: "isoline map, isarithmic map, contour line, isometric map, isopleth, cartography, GIS visualization"
author: "IsoMap Team"
---

# What is an Isoline Map? Complete Cartography Guide [2025]

Whether you're looking at a weather forecast showing temperature zones, a topographic map revealing elevation changes, or a travel time map displaying drive-time areas, you're viewing isoline maps. These fundamental cartographic visualizations connect points of equal value, transforming complex continuous data into intuitive visual patterns.

An isoline map (also called an isarithmic map) uses lines to connect points of equal value across a geographic area, creating a visual representation of how a variable changes across space. From ancient topographic maps to modern real-time weather visualizations and routing applications, isoline mapping remains one of the most effective methods for displaying continuous spatial phenomena.

This comprehensive guide explores the theory, types, and applications of isoline maps, with technical implementations, algorithms, and practical examples for developers and GIS professionals.

## What is an Isoline Map?

An isoline (also called an isopleth, isarithm, or contour line) is a line connecting points of equal value on a map. An isoline map displays multiple such lines to show how a continuous variable changes across geographic space.

### Etymology

The term "isoline" derives from Greek:
- **Iso**: Equal, same
- **Line**: A continuous mark or curve

The alternative term "isarithmic" comes from:
- **Iso**: Equal
- **Arithmos**: Number (Greek)

Both terms refer to the same concept: lines connecting equal numerical values.

### Historical Development

Isoline mapping has deep historical roots in cartography:

**1584**: Flemish cartographer Abraham Ortelius created one of the earliest known isoline maps, showing lines of equal magnetic declination.

**1701**: Edmond Halley published an isogonic chart (magnetic declination lines) of the Atlantic Ocean, establishing isolines as a scientific visualization tool.

**1817**: Alexander von Humboldt introduced isotherms (temperature lines), revolutionizing climate mapping and establishing the fundamental principles of isoline cartography.

**1843**: The term "isohypse" was coined for elevation contour lines, standardizing topographic mapping conventions still used today.

**Modern Era**: Digital cartography and GIS transformed isoline generation from manual drafting to automated computational processes, enabling real-time visualizations and dynamic mapping applications.

### Visual Characteristics

Isoline maps share distinctive visual features:

1. **Curved Lines**: Smooth, flowing curves connecting equal values
2. **Never Cross**: Isolines of different values never intersect (except at cliffs or discontinuities)
3. **Closed Loops**: Lines either form closed loops or extend to map boundaries
4. **Density Indicates Gradient**: Closely spaced lines show steep changes; wide spacing shows gradual changes
5. **Labeled Values**: Lines typically labeled with their represented value

**Example Visualization:**
```
      100 —————
     /           \
    /      90     \
   |       —       |
   |      / \      |
   |  80 /   \ 80  |
   |    /  70 \    |
   \   |———————|   /
    \     60      /
     \———————————/
```

### Mathematical Definition

An isoline represents a level set of a function f(x, y):

```
I(c) = {(x, y) | f(x, y) = c}
```

Where:
- I(c) is the isoline for value c
- f(x, y) is a continuous function mapping geographic coordinates to values
- c is the constant value along the isoline

## Types of Isoline Maps

Cartographers classify isoline maps into two main categories based on how data is measured:

### 1. Isometric Maps (True Point Data)

Isometric maps connect points where values are measured at specific locations. The phenomenon exists at discrete points.

**Examples:**
- **Isotherms**: Temperature measured at weather stations
- **Isobars**: Atmospheric pressure measured at specific locations
- **Elevation contours**: Elevation measured at survey points

**Characteristics:**
- Data collected at points
- Values interpolated between measurements
- Direct measurement possible at any location

**Data Structure:**
```python
# Point-based temperature data
weather_stations = [
    {'lat': 37.7749, 'lon': -122.4194, 'temp': 18},
    {'lat': 37.8044, 'lon': -122.2712, 'temp': 22},
    {'lat': 37.3382, 'lon': -121.8863, 'temp': 25},
    # ... more stations
]
```

### 2. Isoplethic Maps (Areal Data)

Isoplethic maps show values calculated over areas rather than measured at points. The data represents ratios or densities across regions.

**Examples:**
- **Population density**: People per square kilometer
- **Rainfall per unit area**: Precipitation totals over watersheds
- **Income levels**: Average income by census tract

**Characteristics:**
- Data aggregated over areas (census tracts, counties, watersheds)
- Values are derived/calculated, not directly measured
- Interpolation creates continuous surface from areal data

**Data Structure:**
```python
# Areal population density data
census_tracts = [
    {
        'geometry': polygon1,
        'population': 15000,
        'area_sqkm': 5.2,
        'density': 15000 / 5.2  # 2884.6 people/km²
    },
    {
        'geometry': polygon2,
        'population': 8500,
        'area_sqkm': 3.1,
        'density': 8500 / 3.1  # 2741.9 people/km²
    },
    # ... more tracts
]
```

### Common Types of Isolines

Different isolines have specific names based on what they represent:

| Isoline Type | Represents | Example Use |
|--------------|-----------|-------------|
| **Isochrone** | Equal time | Travel time maps, delivery zones |
| **Isodistance** | Equal distance | Service areas, range analysis |
| **Isotherm** | Equal temperature | Climate maps, weather forecasts |
| **Isobar** | Equal pressure | Weather maps, meteorology |
| **Isohyet** | Equal precipitation | Rainfall maps, hydrology |
| **Isohypse/Contour** | Equal elevation | Topographic maps, terrain |
| **Isobath** | Equal depth | Bathymetric charts, ocean maps |
| **Isogon** | Equal angle | Magnetic declination maps |
| **Isohel** | Equal sunshine hours | Solar radiation maps |

## How Isoline Maps Work

### Data Collection

Isoline generation begins with data collection:

**1. Point Sampling**
```python
# Collect measurements at sample points
samples = []
for location in sample_locations:
    value = measure_phenomenon(location)
    samples.append({
        'x': location.lon,
        'y': location.lat,
        'z': value
    })
```

**2. Grid Generation**
```python
# Create regular grid for interpolation
import numpy as np

grid_resolution = 0.01  # degrees
lon_range = np.arange(min_lon, max_lon, grid_resolution)
lat_range = np.arange(min_lat, max_lat, grid_resolution)
grid_lon, grid_lat = np.meshgrid(lon_range, lat_range)
```

### Spatial Interpolation

Transform discrete samples into continuous surface:

#### Inverse Distance Weighting (IDW)

Simple, fast interpolation method:

```python
def idw_interpolation(points, query_point, power=2):
    """
    Inverse Distance Weighting interpolation

    Args:
        points: List of (x, y, value) tuples
        query_point: (x, y) tuple
        power: Distance decay exponent (typically 2)

    Returns:
        Interpolated value at query_point
    """
    numerator = 0
    denominator = 0

    for px, py, value in points:
        # Calculate distance
        distance = np.sqrt((px - query_point[0])**2 + (py - query_point[1])**2)

        if distance == 0:
            return value  # Exact match

        # Weight by inverse distance
        weight = 1 / (distance ** power)
        numerator += weight * value
        denominator += weight

    return numerator / denominator

# Apply to grid
grid_values = np.zeros_like(grid_lon)
for i in range(grid_lon.shape[0]):
    for j in range(grid_lon.shape[1]):
        query = (grid_lon[i, j], grid_lat[i, j])
        grid_values[i, j] = idw_interpolation(samples, query)
```

#### Kriging (Geostatistical)

More sophisticated interpolation accounting for spatial autocorrelation:

```python
from pykrige.ok import OrdinaryKriging

def kriging_interpolation(points_x, points_y, points_z, grid_x, grid_y):
    """
    Kriging interpolation for smooth, statistically optimal surfaces

    Args:
        points_x, points_y: Sample point coordinates
        points_z: Sample point values
        grid_x, grid_y: Grid coordinates for interpolation

    Returns:
        Interpolated grid values
    """
    # Create kriging object
    OK = OrdinaryKriging(
        points_x,
        points_y,
        points_z,
        variogram_model='spherical',
        verbose=False,
        enable_plotting=False
    )

    # Interpolate
    z_grid, ss = OK.execute('grid', grid_x, grid_y)

    return z_grid
```

### Contour Generation

Extract isolines from interpolated grid using marching squares algorithm:

```python
def marching_squares(grid, contour_levels):
    """
    Generate contour lines using marching squares algorithm

    Args:
        grid: 2D array of interpolated values
        contour_levels: List of isoline values to extract

    Returns:
        List of contour line coordinates for each level
    """
    contours = {}

    for level in contour_levels:
        lines = []

        # Scan grid in 2x2 cells
        for i in range(grid.shape[0] - 1):
            for j in range(grid.shape[1] - 1):
                # Get cell corner values
                cell = [
                    grid[i, j],     # Bottom-left
                    grid[i, j+1],   # Bottom-right
                    grid[i+1, j+1], # Top-right
                    grid[i+1, j]    # Top-left
                ]

                # Determine cell configuration (16 possible cases)
                cell_type = 0
                for k, val in enumerate(cell):
                    if val > level:
                        cell_type |= (1 << k)

                # Extract line segment based on cell type
                segment = get_line_segment(cell_type, cell, level, i, j)
                if segment:
                    lines.append(segment)

        # Connect segments into continuous lines
        contours[level] = connect_segments(lines)

    return contours

def get_line_segment(cell_type, values, level, row, col):
    """Get line segment for marching squares cell"""
    # Lookup table for 16 possible configurations
    # ... implementation details
    pass
```

### Smoothing and Styling

Post-process isolines for visual clarity:

```python
from scipy.interpolate import make_interp_spline

def smooth_contour(contour_points, smoothing_factor=0.5):
    """Apply spline smoothing to contour lines"""
    if len(contour_points) < 4:
        return contour_points  # Too few points to smooth

    # Extract x, y coordinates
    x = [p[0] for p in contour_points]
    y = [p[1] for p in contour_points]

    # Parameter t along curve
    t = np.arange(len(x))

    # Create spline interpolations
    t_smooth = np.linspace(0, len(x)-1, int(len(x) * (1 + smoothing_factor)))
    x_spline = make_interp_spline(t, x, k=3)
    y_spline = make_interp_spline(t, y, k=3)

    # Generate smooth curve
    smooth_x = x_spline(t_smooth)
    smooth_y = y_spline(t_smooth)

    return list(zip(smooth_x, smooth_y))
```

## Creating Isoline Maps: Practical Examples

### Example 1: Temperature Isotherm Map

```python
import matplotlib.pyplot as plt
import numpy as np
from scipy.interpolate import griddata

# Weather station data (lat, lon, temperature)
stations = [
    (37.7749, -122.4194, 18),  # San Francisco
    (37.8044, -122.2712, 22),  # Oakland
    (37.3382, -121.8863, 25),  # San Jose
    (37.5585, -122.2711, 20),  # Redwood City
    (37.6879, -122.4702, 17),  # Pacifica
    (37.9577, -122.3477, 21),  # Berkeley
]

# Extract coordinates and values
lats = [s[0] for s in stations]
lons = [s[1] for s in stations]
temps = [s[2] for s in stations]

# Create grid
grid_lat = np.linspace(min(lats) - 0.1, max(lats) + 0.1, 100)
grid_lon = np.linspace(min(lons) - 0.1, max(lons) + 0.1, 100)
grid_lon_mesh, grid_lat_mesh = np.meshgrid(grid_lon, grid_lat)

# Interpolate
grid_temp = griddata(
    (lons, lats),
    temps,
    (grid_lon_mesh, grid_lat_mesh),
    method='cubic'
)

# Create contour map
fig, ax = plt.subplots(figsize=(10, 8))

# Filled contours (temperature zones)
contourf = ax.contourf(
    grid_lon_mesh,
    grid_lat_mesh,
    grid_temp,
    levels=np.arange(16, 27, 1),
    cmap='RdYlBu_r',
    alpha=0.7
)

# Contour lines (isotherms)
contours = ax.contour(
    grid_lon_mesh,
    grid_lat_mesh,
    grid_temp,
    levels=np.arange(16, 27, 2),
    colors='black',
    linewidths=1.5
)

# Label contours
ax.clabel(contours, inline=True, fontsize=10, fmt='%d°C')

# Plot station locations
ax.scatter(lons, lats, c='red', s=50, zorder=5, label='Weather Stations')

# Styling
ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')
ax.set_title('Temperature Isotherm Map - Bay Area')
ax.legend()
plt.colorbar(contourf, label='Temperature (°C)')
plt.show()
```

### Example 2: GeoJSON Isoline Output

```python
def generate_isoline_geojson(grid_x, grid_y, grid_values, levels):
    """
    Generate isoline map as GeoJSON for web mapping

    Returns GeoJSON FeatureCollection
    """
    import matplotlib.pyplot as plt
    from shapely.geometry import LineString, mapping

    # Generate contours using matplotlib
    fig, ax = plt.subplots()
    cs = ax.contour(grid_x, grid_y, grid_values, levels=levels)
    plt.close(fig)

    # Convert to GeoJSON
    features = []

    for level_idx, level in enumerate(cs.levels):
        for collection in cs.collections[level_idx].get_paths():
            for path in collection.to_polygons():
                if len(path) > 1:
                    # Create LineString geometry
                    line = LineString(path)

                    feature = {
                        'type': 'Feature',
                        'properties': {
                            'value': float(level),
                            'level_index': level_idx
                        },
                        'geometry': mapping(line)
                    }
                    features.append(feature)

    geojson = {
        'type': 'FeatureCollection',
        'features': features
    }

    return geojson

# Usage
levels = [10, 15, 20, 25, 30]
geojson_output = generate_isoline_geojson(
    grid_lon_mesh,
    grid_lat_mesh,
    grid_temp,
    levels
)

# Save to file
import json
with open('isotherms.geojson', 'w') as f:
    json.dump(geojson_output, f, indent=2)
```

### Example 3: Interactive Web Map

```javascript
// Display isoline GeoJSON with Mapbox GL JS
mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-122.4, 37.7],
  zoom: 9
});

map.on('load', () => {
  // Load isoline GeoJSON
  map.addSource('isotherms', {
    type: 'geojson',
    data: 'isotherms.geojson'
  });

  // Add isoline layers
  map.addLayer({
    id: 'isotherm-lines',
    type: 'line',
    source: 'isotherms',
    paint: {
      'line-color': [
        'interpolate',
        ['linear'],
        ['get', 'value'],
        16, '#2c7bb6',
        20, '#ffffbf',
        26, '#d7191c'
      ],
      'line-width': 2
    }
  });

  // Add labels
  map.addLayer({
    id: 'isotherm-labels',
    type: 'symbol',
    source: 'isotherms',
    layout: {
      'symbol-placement': 'line',
      'text-field': ['concat', ['get', 'value'], '°C'],
      'text-size': 12
    },
    paint: {
      'text-color': '#000',
      'text-halo-color': '#fff',
      'text-halo-width': 2
    }
  });
});
```

## Use Cases & Applications

### Meteorology and Climate

**Weather Forecasting**

Isoline maps are fundamental to weather visualization:
- Isotherms show temperature patterns
- Isobars reveal pressure systems and wind patterns
- Isohyets display precipitation distribution

**Climate Analysis**

Long-term climate patterns use isolines:
```python
# Annual average temperature map
def create_climate_normal_map(historical_data):
    """Create 30-year climate normal isotherm map"""

    # Calculate 30-year averages
    climate_normals = {}
    for station_id, records in historical_data.items():
        # Filter to 1991-2020 period
        period_records = [r for r in records if 1991 <= r.year <= 2020]

        avg_temp = np.mean([r.temperature for r in period_records])
        climate_normals[station_id] = {
            'lat': records[0].lat,
            'lon': records[0].lon,
            'avg_temp': avg_temp
        }

    # Generate isotherm map
    return generate_isoline_map(climate_normals, levels=range(-20, 41, 5))
```

### Topographic Mapping

**Elevation Contours**

The most common isoline application:

```python
import elevation
import rasterio

def create_topographic_map(bounds, contour_interval=100):
    """
    Generate topographic contour map from DEM data

    Args:
        bounds: (min_lon, min_lat, max_lon, max_lat)
        contour_interval: Meters between contour lines
    """
    # Download SRTM elevation data
    dem_path = 'elevation.tif'
    elevation.clip(bounds=bounds, output=dem_path)

    # Read elevation grid
    with rasterio.open(dem_path) as src:
        elevation_data = src.read(1)
        transform = src.transform

    # Generate contours
    from rasterio.features import shapes
    from shapely.geometry import shape

    min_elev = int(elevation_data.min() / contour_interval) * contour_interval
    max_elev = int(elevation_data.max() / contour_interval) * contour_interval

    contour_levels = range(min_elev, max_elev, contour_interval)

    # Create contour map...
    return generate_contours(elevation_data, contour_levels)
```

### Transportation and Routing

**Travel Time Isolines (Isochrones)**

Already covered in depth in our [isochrone map guide](/articles/isochrone-map-complete-guide), but worth mentioning as a specialized isoline type:

```python
# Generate travel time isolines
def create_isochrone_map(origin, time_intervals=[15, 30, 45]):
    """Travel time isoline map"""
    isolines = []

    for minutes in time_intervals:
        # API call to routing service
        isochrone = get_isochrone(origin, minutes)
        isolines.append(isochrone)

    return isolines
```

### Environmental Science

**Pollution Dispersion**

Air quality isolines show contamination spread:

```python
def model_pollution_dispersion(source, pollutant_data):
    """
    Create pollution concentration isolines

    Uses Gaussian plume model for atmospheric dispersion
    """
    def gaussian_plume(x, y, source_x, source_y, emission_rate, wind_speed):
        """Simplified Gaussian plume equation"""
        # ... atmospheric dispersion calculations
        pass

    # Create grid
    grid = create_grid(source, radius_km=10)

    # Calculate concentrations
    for point in grid:
        concentration = gaussian_plume(
            point.x,
            point.y,
            source.x,
            source.y,
            emission_rate=pollutant_data['rate'],
            wind_speed=pollutant_data['wind_speed']
        )
        point.value = concentration

    # Generate isolines at regulatory thresholds
    levels = [10, 25, 50, 100, 250]  # μg/m³
    return generate_isoline_map(grid, levels)
```

### Business Intelligence

**Market Penetration Analysis**

Visualize market share or sales density:

```python
def create_sales_density_map(sales_data, regions):
    """
    Create isopleth map of sales density

    Args:
        sales_data: Sales by region
        regions: GeoDataFrame with region geometries
    """
    # Calculate density
    regions['sales_density'] = regions.apply(
        lambda row: sales_data[row['region_id']] / row.geometry.area,
        axis=1
    )

    # Interpolate to continuous surface
    # (converting areal data to point data at centroids)
    points = regions.geometry.centroid
    values = regions['sales_density']

    grid_density = interpolate_surface(points, values)

    # Generate isolines
    levels = np.percentile(values, [10, 25, 50, 75, 90])
    return generate_isoline_map(grid_density, levels)
```

## Best Practices

### Choosing Contour Intervals

**Rule of Thumb: 5-7 Isolines**

Too few lines lose detail; too many create clutter:

```python
def calculate_optimal_levels(data_values, target_count=6):
    """
    Calculate optimal isoline levels for visualization

    Args:
        data_values: Array of data values
        target_count: Desired number of isolines

    Returns:
        List of contour levels
    """
    min_val = np.min(data_values)
    max_val = np.max(data_values)
    range_val = max_val - min_val

    # Calculate nice interval
    rough_interval = range_val / target_count
    magnitude = 10 ** np.floor(np.log10(rough_interval))

    # Round to nearest nice number
    nice_intervals = [1, 2, 5, 10]
    normalized = rough_interval / magnitude
    nice_interval = min(nice_intervals, key=lambda x: abs(x - normalized))

    actual_interval = nice_interval * magnitude

    # Generate levels
    start = np.ceil(min_val / actual_interval) * actual_interval
    end = np.floor(max_val / actual_interval) * actual_interval

    return np.arange(start, end + actual_interval, actual_interval)

# Example
temperature_data = np.array([16.5, 18.2, 22.7, 24.1, 19.8, 21.3])
levels = calculate_optimal_levels(temperature_data)
# Returns: [18, 20, 22, 24] - clean, even intervals
```

### Interpolation Method Selection

| Method | Best For | Pros | Cons |
|--------|----------|------|------|
| **IDW** | Quick visualizations | Fast, simple | Can create bulls-eyes around points |
| **Kriging** | Scientific analysis | Statistically optimal, smooth | Slow, complex |
| **Spline** | Smooth surfaces | Very smooth results | Can overshoot data range |
| **Nearest Neighbor** | Categorical data | Preserves exact values | Blocky, unrealistic |

```python
# Example: Compare interpolation methods
from scipy.interpolate import griddata

methods = ['nearest', 'linear', 'cubic']
for method in methods:
    grid = griddata(points, values, (grid_x, grid_y), method=method)
    plot_isoline_map(grid, title=f'Interpolation: {method}')
```

### Avoiding Common Mistakes

**1. Inappropriate Data for Isolines**

Don't use isolines for categorical or discrete data:

```python
# ❌ WRONG: Categorical data
# Land use types: 1=residential, 2=commercial, 3=industrial
create_isoline_map(land_use_data)  # Meaningless!

# ✅ CORRECT: Use choropleth or classified symbols instead
create_choropleth_map(land_use_data)
```

**2. Ignoring Edge Effects**

Interpolation quality degrades at map edges:

```python
# Add buffer zone beyond map extent
buffer_distance = 0.1  # degrees

extended_bounds = (
    min_lon - buffer_distance,
    min_lat - buffer_distance,
    max_lon + buffer_distance,
    max_lat + buffer_distance
)

# Interpolate over extended area, then crop to desired extent
```

**3. Over-smoothing**

Excessive smoothing removes real features:

```python
# Validate smoothing doesn't remove real patterns
def validate_smoothing(original_contours, smoothed_contours, tolerance=0.05):
    """Ensure smoothing preserves spatial patterns"""

    original_area = sum([c.area for c in original_contours])
    smoothed_area = sum([c.area for c in smoothed_contours])

    area_change = abs(smoothed_area - original_area) / original_area

    if area_change > tolerance:
        print(f"WARNING: Smoothing changed area by {area_change:.1%}")

    return area_change <= tolerance
```

## Try IsoMap API for Travel Time Isolines

While traditional isolines show temperature, elevation, or other physical phenomena, modern applications increasingly need travel time and distance isolines (isochrones and isodistances). IsoMap provides developer-friendly APIs for these specialized isoline types.

**Generate isochrones (travel time isolines):**

```javascript
const response = await fetch('https://api.isomap.io/v1/isochrone', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
  body: JSON.stringify({
    origin: { lat: 37.7749, lon: -122.4194 },
    mode: 'driving',
    intervals: [900, 1800, 2700],  // 15, 30, 45 minute isolines
  })
});
```

Visit [isomap.io](https://isomap.io) to explore isochrone and isodistance mapping APIs.

## Frequently Asked Questions

### When should I use isolines vs. choropleth maps?

Use isolines for continuous phenomena (temperature, elevation, travel time) where values change smoothly across space. Use choropleths for data tied to administrative boundaries (population by county, election results by state) or categorical data.

### How many sample points do I need for accurate isolines?

Minimum 20-30 evenly distributed points for simple areas; 100+ for complex terrain or phenomena. Point density should match the spatial variability of your phenomenon—highly variable phenomena require denser sampling.

### Can isolines ever cross each other?

No, except at cliffs or discontinuities. If isolines cross, either your data contains errors, or you're mapping a discontinuous phenomenon that's inappropriate for isoline representation.

### What's the difference between isolines and heatmaps?

Isolines use discrete lines to show specific value boundaries. Heatmaps use continuous color gradients without distinct boundaries. Isolines provide precise value readings; heatmaps emphasize overall patterns. Often used together: colored zones between isolines create a hybrid visualization.

### How do I create isolines from raster data (satellite imagery, DEMs)?

Extract values from raster cells, treat as point data, and generate contours directly or re-interpolate to your desired resolution. Most GIS software has built-in contour generation from raster layers.

---

**Sources:**
- [Caliper: What is an Isoline Map](https://www.caliper.com/glossary/what-is-an-isoline-map.htm)
- [Wikipedia: Contour Line](https://en.wikipedia.org/wiki/Contour_line)
- [Geoapify: What is an Isoline Map](https://www.geoapify.com/what-is-an-isoline-map/)
- [FasterCapital: Isarithmic Maps](https://fastercapital.com/content/Visualization-Techniques--Isarithmic-Maps---Representing-Data-Smoothly-with-Isarithmic-Maps.html)
- [Fiveable: Isopleth Mapping](https://library.fiveable.me/key-terms/geospatial-engineering/isopleth-mapping)
- [GITTA: Isoline Maps](http://www.gitta.info/ThematicCart/en/html/TypogrDesign_learningObject7.html)
