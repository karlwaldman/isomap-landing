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

    // For now, we'll store in the Google Form as a fallback
    // This maintains the existing workflow while adding server-side tracking
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScfDgITcsXwg4TtLneLU4Ti6Xm2yPWaE4lpiQwEMnGZiKJA6Q/formResponse';

    // Google Forms entry ID (you'll need to find this by inspecting the form)
    // For now, we'll just log the email server-side and return success
    console.log(`[Beta Signup] ${new Date().toISOString()} - ${email}`);

    // TODO: Add Google Sheets API integration
    // const sheets = google.sheets({ version: 'v4', auth });
    // await sheets.spreadsheets.values.append({
    //   spreadsheetId: process.env.GOOGLE_SHEET_ID,
    //   range: 'Sheet1!A:B',
    //   valueInputOption: 'USER_ENTERED',
    //   requestBody: {
    //     values: [[new Date().toISOString(), email]],
    //   },
    // });

    // TODO: Send welcome email via Postmark
    // await fetch('https://api.postmarkapp.com/email', {
    //   method: 'POST',
    //   headers: {
    //     'X-Postmark-Server-Token': process.env.POSTMARK_API_TOKEN!,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     From: 'hello@isomap.io',
    //     To: email,
    //     Subject: 'Welcome to IsoMap Beta!',
    //     TextBody: 'Thanks for your interest...',
    //   }),
    // });

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
