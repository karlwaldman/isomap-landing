"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the demo to avoid SSR issues with Leaflet
const IsochroneDemo = dynamic(
  () => import("./components/IsochroneDemo"),
  { ssr: false }
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Google Form (opens in new tab)
    window.open("https://docs.google.com/forms/d/e/1FAIpQLScfDgITcsXwg4TtLneLU4Ti6Xm2yPWaE4lpiQwEMnGZiKJA6Q/viewform?usp=dialog", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-8 text-center lg:pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Isochrone API</span>
            <span className="block text-primary">For Developers Who Hate Enterprise Sales</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Drive-time mapping API with transparent pricing and 5-minute setup. No sales calls, no surprises.
            Perfect for field service software, real estate platforms, and logistics tools.
          </p>

          {/* Email Capture Form */}
          <div className="mx-auto mt-10 max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Request Beta Access"}
                </button>
              </div>
              {status === "success" && (
                <p className="text-sm text-secondary">{message}</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">{message}</p>
              )}
            </form>
            <p className="mt-3 text-sm text-gray-500">
              Limited beta spots. We'll personally review each application and reach out within 48 hours.
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600">
            <svg className="h-5 w-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Beta launching January 2025 • 20 spots available</span>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mt-16">
          <IsochroneDemo />
        </div>

        {/* Visual Example */}
        <div className="mt-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
          <div className="mx-auto max-w-3xl">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-gray-600">
              Simple API Call
            </h3>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-900 p-6 text-sm text-green-400">
              <code>{`curl https://api.isomap.io/v1/isochrone \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "location": { "lat": 40.7128, "lng": -74.0060 },
    "times": [5, 10, 15, 30],
    "mode": "driving"
  }'

# Returns GeoJSON polygons showing areas reachable
# within 5, 10, 15, and 30 minutes from NYC`}</code>
            </pre>
          </div>
        </div>

        {/* Problem Section */}
        <div className="mt-24 border-t border-gray-200 pt-24">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            The Problem with Current Solutions
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="text-4xl">💸</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Enterprise Sales Games</h3>
              <p className="mt-2 text-gray-600">
                Need volume pricing? "Contact sales." Want to upgrade? "Schedule a call." Pricing changes with no notice.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="text-4xl">🛠️</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Too Complex</h3>
              <p className="mt-2 text-gray-600">
                Setting up Mapbox isochrone API takes 2+ days. Multiple SDKs, tokens, and configs.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="text-4xl">🐌</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Too Slow</h3>
              <p className="mt-2 text-gray-600">
                Enterprise solutions like TravelTime cost $300+/mo and require sales calls.
              </p>
            </div>
          </div>
        </div>

        {/* What is an Isochrone - Educational Content */}
        <div className="mt-24 bg-gray-50 -mx-4 px-4 py-16 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900">
              What is an Isochrone Map?
            </h2>
            <div className="mt-8 space-y-6 text-lg text-gray-600">
              <p>
                An <strong>isochrone map</strong> (from Greek: "iso" = equal, "chronos" = time) shows
                all locations reachable within a specific travel time from a starting point.
              </p>
              <p>
                Unlike simple radius circles (which ignore roads, traffic, and topography), isochrones
                calculate actual drive time or walk time along real road networks.
              </p>
              <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">
                  Radius Circle vs. Isochrone
                </h3>
                <ul className="mt-4 space-y-3 text-base">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span><strong>Radius Circle:</strong> Draws a perfect circle (5-mile radius). Ignores rivers, highways, mountains. Inaccurate for real-world planning.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span><strong>Isochrone:</strong> Calculates actual 15-minute drive time. Accounts for road speed limits, one-way streets, traffic patterns. Accurate for real decisions.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Who Uses Isochrone APIs?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold text-gray-900">🏠 Real Estate Platforms</h3>
              <p className="mt-2 text-gray-600">
                Show home buyers "all homes within 20 minutes of downtown" or "within 30 minutes of your office."
                Helps agents close deals faster by focusing on realistic commute times.
              </p>
              <p className="mt-4 text-sm font-medium text-primary">
                Example: Zillow, Realtor.com clones
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold text-gray-900">🚚 Logistics Software</h3>
              <p className="mt-2 text-gray-600">
                Calculate service coverage areas, delivery zones, and driver territories. Optimize routes by
                understanding actual travel time constraints.
              </p>
              <p className="mt-4 text-sm font-medium text-primary">
                Example: Onfleet, Route4Me competitors
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold text-gray-900">🔧 Field Service Apps</h3>
              <p className="mt-2 text-gray-600">
                Show customers your service area ("We serve all areas within 45 minutes"). Dispatch technicians
                to jobs within their coverage zone.
              </p>
              <p className="mt-4 text-sm font-medium text-primary">
                Example: ServiceTitan, Housecall Pro add-ons
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold text-gray-900">🏪 Retail Site Selection</h3>
              <p className="mt-2 text-gray-600">
                Analyze potential store locations by mapping customer reachability. "How many people can reach
                this location in 10 minutes?"
              </p>
              <p className="mt-4 text-sm font-medium text-primary">
                Example: Site selection consultants
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold text-gray-900">🏥 Healthcare Access</h3>
              <p className="mt-2 text-gray-600">
                Map healthcare deserts by showing areas more than 30 minutes from nearest hospital. Plan
                clinic locations to maximize coverage.
              </p>
              <p className="mt-4 text-sm font-medium text-primary">
                Example: Public health dashboards
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold text-gray-900">🍕 Food Delivery</h3>
              <p className="mt-2 text-gray-600">
                Define delivery zones based on actual drive time (not crow-flies distance). "We deliver within
                20 minutes" with accurate coverage maps.
              </p>
              <p className="mt-4 text-sm font-medium text-primary">
                Example: Ghost kitchens, restaurant chains
              </p>
            </div>
          </div>
        </div>

        {/* Why IsoMap */}
        <div className="mt-24 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 p-12">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Why IsoMap API?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">🎯 Simple Integration</h3>
              <p className="mt-2 text-gray-600">
                One API endpoint. Pass coordinates and time intervals. Get GeoJSON back.
                No complex SDKs, no multi-step setup. 5 minutes from signup to first map.
              </p>
              <pre className="mt-4 text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// That's it. One fetch call.
const response = await fetch(
  'https://api.isomap.io/v1/isochrone',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      location: { lat: 40.7128, lng: -74.0060 },
      times: [15, 30],
      mode: 'driving'
    })
  }
);
const geojson = await response.json();`}
              </pre>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">💰 Transparent Pricing</h3>
              <p className="mt-2 text-gray-600">
                Usage-based pricing that scales with you. No surprises. No sales calls.
                Beta testers get 30 days free to test, then simple monthly plans.
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-white rounded">
                  <span className="font-medium">Beta Access</span>
                  <span className="text-gray-600">30 days free</span>
                </div>
                <div className="flex justify-between p-3 bg-white rounded">
                  <span className="font-medium">Startup</span>
                  <span className="text-gray-600">$49/mo (10K requests)</span>
                </div>
                <div className="flex justify-between p-3 bg-white rounded">
                  <span className="font-medium">Growth</span>
                  <span className="text-gray-600">$199/mo (100K requests)</span>
                </div>
                <div className="flex justify-between p-3 bg-white rounded">
                  <span className="font-medium">Enterprise</span>
                  <span className="text-gray-600">Custom (unlimited)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">⚡ Blazing Fast</h3>
              <p className="mt-2 text-gray-600">
                Optimized routing engine built on OSRM (Open Source Routing Machine).
                Average response time under 200ms for most requests.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Global CDN for low latency
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Pre-computed routing graphs
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Intelligent caching layer
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  99.9% uptime SLA
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">🛠️ Developer-Friendly</h3>
              <p className="mt-2 text-gray-600">
                Built by developers, for developers. Comprehensive docs, code examples in 5+ languages,
                and responsive support.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Interactive API playground
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  npm, pip, gem packages
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Postman collection
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Discord community
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Deep Dive */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900">
            How It Works: The Technical Details
          </h2>
          <div className="mt-8 space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">1. Road Network Data</h3>
              <p className="mt-2">
                We use OpenStreetMap (OSM) data, which includes detailed information about roads, highways,
                paths, and restrictions. This data is continuously updated by thousands of contributors worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">2. Routing Algorithm</h3>
              <p className="mt-2">
                Our engine builds on OSRM (Open Source Routing Machine), which implements the
                Contraction Hierarchies algorithm. This preprocesses the road network into a hierarchical structure,
                enabling sub-second routing queries even for continental-scale maps.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">3. Isochrone Generation</h3>
              <p className="mt-2">
                Starting from your location, we explore the road network in all directions, tracking cumulative
                travel time. We find all road segments reachable within your specified time intervals (e.g., 5, 10, 15 minutes).
                These segments are then converted into polygon boundaries using computational geometry algorithms.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">4. GeoJSON Output</h3>
              <p className="mt-2">
                The API returns standard GeoJSON format, making it compatible with every major mapping library
                (Leaflet, Mapbox GL, Google Maps, etc.). Each isochrone is a Polygon or MultiPolygon feature with
                travel time as a property.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">Example GeoJSON Response</h3>
            <pre className="mt-4 overflow-x-auto rounded bg-gray-900 p-4 text-xs text-green-400">
{`{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "time": 15,
        "mode": "driving"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-74.0060, 40.7128],
          [-74.0050, 40.7200],
          // ... more coordinates
        ]]
      }
    }
  ]
}`}
            </pre>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            IsoMap vs. Competitors
          </h2>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="border border-gray-200 px-6 py-4 text-center text-sm font-semibold text-primary">
                    IsoMap
                  </th>
                  <th className="border border-gray-200 px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Mapbox
                  </th>
                  <th className="border border-gray-200 px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    TravelTime
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">
                    Pricing Model
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm font-semibold text-primary">
                    Transparent, no surprises
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    Complex tiers, contact sales
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    Fixed fee, sales required
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">
                    Beta Access
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm">
                    <span className="text-secondary">✓</span> 30 days free
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    First 100K free
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    Trial only
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">
                    Setup Time
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm font-semibold text-primary">
                    5 minutes
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    2+ days
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    Sales call required
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">
                    Response Time
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm">
                    <span className="text-secondary">✓</span> &lt;200ms
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    ~300ms
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    ~400ms
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">
                    Code Examples
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm">
                    <span className="text-secondary">✓</span> 5+ languages
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    JS only
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    Limited
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">
                    Support
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm">
                    <span className="text-secondary">✓</span> &lt;1 hour
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    24-48 hours
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
                    Enterprise only
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                How accurate are the isochrones?
              </h3>
              <p className="mt-2 text-gray-600">
                Our isochrones use OpenStreetMap data and account for road types, speed limits, and
                turn restrictions. Accuracy is typically within 5-10% of actual travel time. For
                real-time traffic, we offer an optional add-on (+$50/mo).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                What travel modes are supported?
              </h3>
              <p className="mt-2 text-gray-600">
                Currently: driving, walking, and cycling. We're adding public transit in Q2 2025.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Can I use this for commercial projects?
              </h3>
              <p className="mt-2 text-gray-600">
                Yes! All plans include commercial usage rights. No attribution required.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                What geographic regions are covered?
              </h3>
              <p className="mt-2 text-gray-600">
                Global coverage. We support all countries with OpenStreetMap data (which is virtually
                everywhere). Some remote areas may have limited road network data.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Do you offer bulk/enterprise pricing?
              </h3>
              <p className="mt-2 text-gray-600">
                Yes. For &gt;1M requests/month or custom SLAs, contact us for enterprise pricing.
                We offer volume discounts and dedicated support.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                How is this different from radius circles?
              </h3>
              <p className="mt-2 text-gray-600">
                Radius circles are geometrically perfect but ignore real-world constraints like roads,
                rivers, and mountains. Isochrones show actual reachability along road networks,
                making them far more accurate for planning and analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 rounded-2xl bg-gradient-to-r from-primary to-blue-700 px-6 py-16 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Build with IsoMap?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Request beta access. Get 30 days free to test the API. Limited to 20 developers with strong use cases.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-lg bg-white px-6 py-3 font-semibold text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Request Beta Access"}
                </button>
              </div>
              {status === "success" && (
                <p className="text-sm text-white">{message}</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-200">{message}</p>
              )}
            </form>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-24 border-t border-gray-200 pt-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              About IsoMap
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                IsoMap started when I was building a field service management app and realized that existing isochrone APIs required enterprise sales calls (TravelTime, Targomo) or had complex, opaque pricing structures that changed without notice.
              </p>
              <p>
                After analyzing the market, I found that most developers need simple, affordable drive-time mapping for common use cases: service areas, real estate search, delivery zones. They don't need enterprise features, they just need it to work.
              </p>
              <p>
                So I'm building IsoMap: a developer-first isochrone API with transparent pricing, excellent docs, and no sales calls. Built on open-source routing technology (OSRM + OpenStreetMap), optimized for speed and cost.
              </p>
              <p>
                <strong>Why now?</strong> I'm validating demand before building. If you're interested, request beta access above. If I get 5+ committed users with strong use cases, I'll build the production API in 6 weeks. If not, I'll pivot.
              </p>
              <p>
                <strong>My background:</strong> Full-stack developer with 10+ years building B2B SaaS. Previously built APIs serving millions of requests/month. I know how to build reliable infrastructure at scale.
              </p>
              <p className="text-base italic border-l-4 border-primary pl-4">
                "Build what developers actually need, not what enterprise sales teams want to sell." - My philosophy
              </p>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-700 font-medium">Questions? Feedback?</p>
              <p className="text-gray-600 mt-2">
                Email me:{" "}
                <a
                  href="mailto:hello@isomap.io"
                  className="text-primary hover:underline font-medium"
                >
                  hello@isomap.io
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-gray-200 py-12 text-center text-sm text-gray-600">
          <p>© 2025 IsoMap. All rights reserved.</p>
          <p className="mt-2">
            Built with <span className="text-red-500">♥</span> for developers
          </p>
        </footer>
      </div>
    </div>
  );
}
