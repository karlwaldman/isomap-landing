import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    console.log(`[Beta Signup] ${timestamp} - ${email}`);

    // Save to Google Sheets if configured
    if (process.env.GOOGLE_SPREADSHEET_ID &&
        process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
        process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      try {
        await saveToGoogleSheets(email, timestamp);
        console.log(`[Beta Signup] Saved to Google Sheets: ${email}`);
      } catch (error) {
        console.error('[Beta Signup] Google Sheets error:', error);
        // Continue anyway - don't fail signup if sheets fails
      }
    }

    // Send welcome email via Postmark if configured
    if (process.env.POSTMARK_API_TOKEN && process.env.POSTMARK_FROM_EMAIL) {
      try {
        await sendWelcomeEmail(email);
        console.log(`[Beta Signup] Welcome email sent to: ${email}`);
      } catch (error) {
        console.error('[Beta Signup] Postmark error:', error);
        // Continue anyway - don't fail signup if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thanks! We\'ll review your application and reach out within 48 hours.'
    });

  } catch (error) {
    console.error('[Beta Signup Error]', error);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    );
  }
}

// Save email to Google Sheets
async function saveToGoogleSheets(email: string, timestamp: string) {
  const { google } = require('googleapis');

  // Create auth from service account
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Append row to spreadsheet
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: 'Beta Signups!A:C',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[timestamp, email, 'Pending']],
    },
  });
}

// Send welcome email via Postmark
async function sendWelcomeEmail(email: string) {
  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'X-Postmark-Server-Token': process.env.POSTMARK_API_TOKEN!,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      From: process.env.POSTMARK_FROM_EMAIL,
      To: email,
      Subject: 'Welcome to IsoMap Beta - Next Steps',
      TextBody: `Hi there!

Thanks for requesting beta access to IsoMap!

I'm Karl, and I built IsoMap because I was frustrated with the enterprise sales friction of existing isochrone APIs. Transparent pricing, no sales calls, just a simple API that works.

WHAT'S NEXT:
I'm personally reviewing all beta applications to ensure a good fit. I'll reach out within 48 hours with:
- Your beta API key (30 days free)
- Documentation and quick start guide
- Direct line to me for any questions

In the meantime, feel free to explore the demo at https://isomap.io

Questions? Just reply to this email.

Best,
Karl

---
IsoMap API
https://isomap.io
hello@isomap.io`,
      HtmlBody: `<p>Hi there!</p>

<p>Thanks for requesting beta access to IsoMap!</p>

<p>I'm Karl, and I built IsoMap because I was frustrated with the enterprise sales friction of existing isochrone APIs. Transparent pricing, no sales calls, just a simple API that works.</p>

<p><strong>WHAT'S NEXT:</strong><br>
I'm personally reviewing all beta applications to ensure a good fit. I'll reach out within 48 hours with:</p>
<ul>
  <li>Your beta API key (30 days free)</li>
  <li>Documentation and quick start guide</li>
  <li>Direct line to me for any questions</li>
</ul>

<p>In the meantime, feel free to explore the <a href="https://isomap.io">demo</a>.</p>

<p>Questions? Just reply to this email.</p>

<p>Best,<br>
Karl</p>

<hr>
<p style="color: #666; font-size: 12px;">
IsoMap API<br>
<a href="https://isomap.io">https://isomap.io</a><br>
hello@isomap.io
</p>`,
      MessageStream: 'outbound',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Postmark error: ${response.status} - ${error}`);
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
