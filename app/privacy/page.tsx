export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-gray-600">Last updated: December 15, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              IsoMap ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
              This privacy policy explains how we collect, use, and protect your information when you use our website
              and beta API service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Information You Provide:</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Email Address:</strong> When you request beta access</li>
              <li><strong>Company Information:</strong> Optional information you provide in beta applications</li>
              <li><strong>API Usage Data:</strong> Request logs, timestamps, and API responses for beta users</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">Information Automatically Collected:</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Analytics Data:</strong> Page views, referral sources, browser type (via Plausible Analytics)</li>
              <li><strong>Technical Data:</strong> IP address (not stored), device type, operating system</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To provide beta access to IsoMap API</li>
              <li>To communicate about your beta participation</li>
              <li>To improve our service based on usage patterns</li>
              <li>To respond to your questions and support requests</li>
              <li>To send product updates (you can opt out anytime)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Security</h2>
            <p className="text-gray-600">
              <strong>Where We Store Data:</strong> Email addresses are stored in Google Sheets (Google Cloud, US servers).
              API usage logs are stored on DigitalOcean servers (US region).
            </p>
            <p className="text-gray-600 mt-4">
              <strong>Security Measures:</strong> We use industry-standard security measures including HTTPS encryption,
              secure authentication, and access controls. However, no internet transmission is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing</h2>
            <p className="text-gray-600">
              <strong>We do NOT sell your data.</strong> We only share data with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Service Providers:</strong> Google (email storage), DigitalOcean (hosting), Vercel (website hosting)</li>
              <li><strong>Legal Obligations:</strong> If required by law or to protect our rights</li>
            </ul>
            <p className="text-gray-600 mt-4">
              We do NOT use tracking cookies. We do NOT share data with advertisers. We do NOT use your data for AI training.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights (GDPR & CCPA)</h2>
            <p className="text-gray-600 mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails anytime</li>
              <li><strong>Object:</strong> Object to processing of your data</li>
            </ul>
            <p className="text-gray-600 mt-4">
              To exercise these rights, email us at: <a href="mailto:hello@isomap.io" className="text-primary hover:underline">hello@isomap.io</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Beta Applications:</strong> Stored until beta program ends or you request deletion</li>
              <li><strong>API Usage Logs:</strong> Retained for 90 days for debugging and analytics</li>
              <li><strong>Email Communications:</strong> Stored until you unsubscribe or request deletion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking</h2>
            <p className="text-gray-600">
              We use <strong>Plausible Analytics</strong>, a privacy-friendly analytics service that:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Does NOT use cookies</li>
              <li>Does NOT track users across websites</li>
              <li>Does NOT collect personal data</li>
              <li>Is GDPR, CCPA, and PECR compliant</li>
            </ul>
            <p className="text-gray-600 mt-4">
              No cookie banner is needed because we don't use tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600">
              IsoMap is not intended for users under 18 years old. We do not knowingly collect data from children.
              If you believe we have collected data from a child, contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy. Changes will be posted on this page with an updated "Last updated" date.
              For material changes, we'll notify beta users via email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-600">
              For privacy questions, data requests, or to exercise your rights:
            </p>
            <ul className="list-none text-gray-600 space-y-2 mt-4">
              <li><strong>Email:</strong> <a href="mailto:hello@isomap.io" className="text-primary hover:underline">hello@isomap.io</a></li>
              <li><strong>Response Time:</strong> Within 30 days (as required by GDPR)</li>
            </ul>
          </section>

          <section className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Users</h2>
            <p className="text-gray-600">
              IsoMap is operated from the United States. If you're accessing from the EU, UK, or other regions,
              your data may be transferred to and processed in the United States. By using our service, you consent
              to this transfer.
            </p>
            <p className="text-gray-600 mt-4">
              For EU users, we comply with GDPR requirements and provide all rights outlined in Section 6.
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
