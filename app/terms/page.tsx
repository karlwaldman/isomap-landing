export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          <p className="mt-2 text-gray-600">Last updated: December 15, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing or using IsoMap ("the Service"), you agree to be bound by these Terms of Service
              ("Terms"). If you do not agree to these Terms, do not use the Service.
            </p>
            <p className="text-gray-600 mt-4">
              <strong>Beta Status:</strong> IsoMap is currently in beta. The Service may change, and features may
              be added or removed without notice. By participating in the beta, you acknowledge these limitations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600">
              IsoMap provides an API for generating isochrone maps (drive-time polygons) for developers.
              The Service includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>REST API for isochrone calculations</li>
              <li>Documentation and code examples</li>
              <li>Beta access and support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Beta Program Terms</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Beta Access</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Free Trial Period:</strong> 30 days free access for beta participants</li>
              <li><strong>After Trial:</strong> $99/month for 50,000 requests (if you choose to continue)</li>
              <li><strong>Cancellation:</strong> You may cancel anytime during or after the trial period</li>
              <li><strong>No Automatic Billing:</strong> We will not charge you without explicit consent</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Beta Limitations</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Service may be unavailable or unstable during beta</li>
              <li>Features may change without notice</li>
              <li>No uptime SLA during beta period</li>
              <li>API rate limits may be adjusted</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
            <p className="text-gray-600 mb-2">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Exceed your allocated API request limits</li>
              <li>Use the Service for illegal purposes</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Resell or redistribute API access without permission</li>
              <li>Use the Service to spam, harass, or harm others</li>
              <li>Attempt to overwhelm our servers (DDoS attacks)</li>
              <li>Scrape or crawl the Service beyond normal API usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. API Keys and Security</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Confidentiality:</strong> Keep your API keys secure and confidential</li>
              <li><strong>Responsibility:</strong> You are responsible for all activity under your API key</li>
              <li><strong>Breach Notification:</strong> Immediately notify us if your API key is compromised</li>
              <li><strong>Revocation:</strong> We may revoke API keys if misused or for security reasons</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Rights</h3>
            <p className="text-gray-600">
              IsoMap and the Service are owned by us. This includes the API, documentation, website design,
              and branding. You receive a limited license to use the Service, but do not acquire ownership.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Your Rights</h3>
            <p className="text-gray-600">
              You retain all rights to the applications and products you build using IsoMap API.
              The GeoJSON data returned by the API is licensed under OpenStreetMap's ODbL license.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Attribution</h3>
            <p className="text-gray-600">
              Commercial use does NOT require attribution to IsoMap. However, you must include
              OpenStreetMap attribution as required by the ODbL license (e.g., "© OpenStreetMap contributors").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Payment Terms (Post-Beta)</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Billing Cycle:</strong> Monthly, billed in advance</li>
              <li><strong>Payment Method:</strong> Credit card via Stripe</li>
              <li><strong>Refunds:</strong> Pro-rated refunds available within 14 days of billing</li>
              <li><strong>Failed Payments:</strong> Service suspended after 7 days of failed payment</li>
              <li><strong>Price Changes:</strong> 30 days notice for price increases</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Service Availability</h2>
            <p className="text-gray-600">
              <strong>Beta Disclaimer:</strong> During beta, we do NOT guarantee service availability.
              The Service may be modified, suspended, or discontinued at any time.
            </p>
            <p className="text-gray-600 mt-4">
              <strong>Maintenance:</strong> We may perform maintenance that temporarily interrupts service.
              We'll provide notice when possible but may perform emergency maintenance without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
            <p className="text-gray-600">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              WE DO NOT WARRANT THAT:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>The Service will be uninterrupted or error-free</li>
              <li>Isochrone calculations will be perfectly accurate</li>
              <li>The Service will meet your specific requirements</li>
              <li>Defects will be corrected</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Isochrone accuracy depends on OpenStreetMap data quality and may not reflect real-world
              conditions (traffic, road closures, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-600">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Service interruptions or data loss</li>
              <li>Errors in isochrone calculations</li>
            </ul>
            <p className="text-gray-600 mt-4">
              <strong>Maximum Liability:</strong> Our total liability is limited to the amount you paid
              in the past 12 months (or $100 if you're on the free beta).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Indemnification</h2>
            <p className="text-gray-600">
              You agree to indemnify and hold us harmless from claims arising from:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your application or product built using the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">By You</h3>
            <p className="text-gray-600">
              You may terminate your account anytime by emailing hello@isomap.io.
              Prepaid fees are pro-rated and refunded within 14 days.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">By Us</h3>
            <p className="text-gray-600">
              We may suspend or terminate your access if you:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Violate these Terms</li>
              <li>Fail to pay (after 7-day grace period)</li>
              <li>Use the Service in a harmful way</li>
              <li>Provide false information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Modifications to Terms</h2>
            <p className="text-gray-600">
              We may modify these Terms at any time. Material changes will be notified via email at least
              30 days before taking effect. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law</h2>
            <p className="text-gray-600">
              These Terms are governed by the laws of the United States and the Commonwealth of Massachusetts,
              without regard to conflict of law principles.
            </p>
            <p className="text-gray-600 mt-4">
              Any disputes will be resolved in the courts of Massachusetts. You consent to personal
              jurisdiction in these courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Entire Agreement</h2>
            <p className="text-gray-600">
              These Terms, together with our Privacy Policy, constitute the entire agreement between
              you and IsoMap regarding the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact</h2>
            <p className="text-gray-600">
              Questions about these Terms? Contact us at:
            </p>
            <ul className="list-none text-gray-600 space-y-2 mt-4">
              <li><strong>Email:</strong> <a href="mailto:hello@isomap.io" className="text-primary hover:underline">hello@isomap.io</a></li>
            </ul>
          </section>

          <section className="border-t border-gray-200 pt-8 mt-8">
            <p className="text-gray-600 italic">
              <strong>Beta Acknowledgment:</strong> By requesting beta access, you acknowledge that IsoMap
              is a beta service under active development. Features, pricing, and availability may change.
              We appreciate your participation and feedback during this phase.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a href="/" className="text-primary hover:underline">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}
