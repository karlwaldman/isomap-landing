# IsoMap Beta Signup Setup Guide

This guide explains how to configure the automated email capture and welcome email system.

---

## Quick Start

The beta signup system automatically:
1. **Saves emails to Google Sheets** - Persistent storage and easy review
2. **Sends welcome emails via Postmark** - Automated onboarding
3. **Logs all signups** - Console logging for monitoring

Both integrations are **optional**. The signup will work without them (basic logging only).

---

## Google Sheets Setup

### 1. Create Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing project
3. Enable **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name: `isomap-beta-signups`
   - Click "Create and Continue"
   - Skip optional steps, click "Done"

5. Generate Key:
   - Click on your new service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the JSON file

### 2. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet
3. Name it: `IsoMap Beta Signups`
4. Create sheet named: `Beta Signups` (exact name)
5. Add header row:
   - A1: `Timestamp`
   - B1: `Email`
   - C1: `Status`

6. Share with Service Account:
   - Click "Share" button
   - Add the service account email from your JSON file
   - Example: `isomap-beta-signups@your-project.iam.gserviceaccount.com`
   - Give "Editor" permission
   - Uncheck "Notify people"
   - Click "Share"

7. Copy Spreadsheet ID:
   - Look at URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part

### 3. Configure Environment Variables

Add to `.env.local` (create if doesn't exist):

```bash
GOOGLE_SPREADSHEET_ID="your_spreadsheet_id_here"
GOOGLE_SHEETS_CLIENT_EMAIL="isomap-beta-signups@your-project.iam.gserviceaccount.com"
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**IMPORTANT**: The private key must include `\n` for newlines. Copy exactly from the JSON file.

---

## Postmark Setup

### 1. Create Postmark Account

1. Go to [Postmark](https://postmarkapp.com)
2. Sign up for free account
3. Create new Server:
   - Name: `IsoMap Beta`
   - Click "Create Server"

### 2. Verify Sender Domain

1. Go to "Sender Signatures" or "Verified Domains"
2. Add `isomap.io` domain
3. Add DNS records to your domain:
   - DKIM record (for authentication)
   - Return-Path record (for bounces)
4. Wait for verification (usually <10 minutes)

**Alternative**: Use verified email address instead of domain if you prefer.

### 3. Get API Token

1. Go to server settings
2. Copy "Server API token"
3. Keep this secret!

### 4. Configure Environment Variables

Add to `.env.local`:

```bash
POSTMARK_API_TOKEN="your_postmark_api_token_here"
POSTMARK_FROM_EMAIL="hello@isomap.io"
```

**IMPORTANT**: The `FROM` email must be verified in Postmark (either domain or individual email).

---

## Vercel Deployment Setup

### Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" > "Environment Variables"
4. Add each variable:
   - `GOOGLE_SPREADSHEET_ID`
   - `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `GOOGLE_SHEETS_PRIVATE_KEY`
   - `POSTMARK_API_TOKEN`
   - `POSTMARK_FROM_EMAIL`

5. For each variable:
   - Set environment: "Production", "Preview", and "Development" (all three)
   - Click "Add"

6. Redeploy:
   ```bash
   vercel --prod
   ```

---

## Testing

### Local Testing

1. Start development server:
   ```bash
   npm run dev
   ```

2. Test signup:
   ```bash
   curl -X POST http://localhost:3000/api/beta-signup \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'
   ```

3. Check:
   - ✅ Console shows log: `[Beta Signup] Saved to Google Sheets: test@example.com`
   - ✅ Console shows log: `[Beta Signup] Welcome email sent to: test@example.com`
   - ✅ Google Sheet has new row
   - ✅ Email received in inbox

### Production Testing

1. Visit https://isomap.io
2. Scroll to beta signup form
3. Enter your email
4. Click "Join Beta"
5. Check Google Sheet and email inbox

---

## Customization

### Change Welcome Email

Edit `/app/api/beta-signup/route.ts`, function `sendWelcomeEmail()`:

```typescript
Subject: 'Welcome to IsoMap Beta - Next Steps',
TextBody: `Your custom welcome message...`,
HtmlBody: `<p>Your custom HTML message...</p>`,
```

### Change Google Sheet Structure

Edit `/app/api/beta-signup/route.ts`, function `saveToGoogleSheets()`:

```typescript
await sheets.spreadsheets.values.append({
  range: 'Beta Signups!A:C',  // Change column range
  requestBody: {
    values: [[timestamp, email, 'Pending']],  // Change row data
  },
});
```

---

## Monitoring

### Check Logs

**Local development:**
```bash
npm run dev
# Watch console for [Beta Signup] logs
```

**Production (Vercel):**
1. Go to Vercel Dashboard
2. Select project
3. Go to "Deployments"
4. Click latest deployment
5. Go to "Functions" tab
6. Click `api/beta-signup`
7. View real-time logs

### Check Google Sheet

- Real-time view: https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
- All signups appear instantly with timestamp and email
- Status column defaults to "Pending"

### Check Postmark

- Dashboard: https://account.postmarkapp.com
- Go to "Activity" to see all sent emails
- Bounces and errors appear in "Message Streams"

---

## Troubleshooting

### Google Sheets Error: "Authentication failed"

**Problem**: Invalid service account credentials

**Fix:**
1. Check `GOOGLE_SHEETS_CLIENT_EMAIL` matches JSON file
2. Check `GOOGLE_SHEETS_PRIVATE_KEY` has `\n` newlines
3. Verify service account has Editor access to sheet

### Google Sheets Error: "Range not found"

**Problem**: Sheet name doesn't match

**Fix:**
1. Ensure sheet is named exactly `Beta Signups` (case-sensitive)
2. Or change code to match your sheet name

### Postmark Error: "Sender signature not verified"

**Problem**: Sending from unverified email/domain

**Fix:**
1. Go to Postmark "Sender Signatures"
2. Verify the domain or email address
3. Update `POSTMARK_FROM_EMAIL` to match verified sender

### Postmark Error: 401 Unauthorized

**Problem**: Invalid API token

**Fix:**
1. Check `POSTMARK_API_TOKEN` is correct
2. Get fresh token from Postmark server settings
3. Ensure token is for the correct server

### Emails Not Sending (No Error)

**Problem**: Environment variables not configured

**Fix:**
1. Check `.env.local` exists and has correct variables
2. For Vercel: Check environment variables are set in dashboard
3. Redeploy after adding variables

---

## Security Notes

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Keep API tokens secret** - Don't share or expose
3. **Rotate keys if exposed** - Generate new keys immediately
4. **Use environment variables** - Never hardcode credentials
5. **Verify email senders** - Prevents spam/phishing concerns

---

## Cost

### Google Sheets API
- **Free tier**: 60 requests/minute, 500 requests/100 seconds
- **Enough for**: ~30,000 signups/month
- **Cost**: $0 (free forever for this use case)

### Postmark
- **Free tier**: 100 emails/month
- **Paid**: $15/month for 10,000 emails
- **Enough for**: 100 beta signups/month free

---

## Support

**Questions?**
- Email: hello@isomap.io
- Issues: https://github.com/yourusername/isomap-landing/issues

---

## Summary

✅ **Google Sheets**: Stores all signups with timestamp
✅ **Postmark**: Sends automated welcome emails
✅ **Optional**: Both work independently, graceful degradation
✅ **Logs**: Console logging even without integrations
✅ **Secure**: Environment variables, no hardcoded credentials

**Total setup time**: ~30 minutes (one-time)
