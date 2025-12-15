# IsoMap.io - Quick Start (Do This Now!)

## Step 1: Configure DNS in Cloudflare (2 minutes)

### Open Cloudflare Dashboard:
1. Go to: https://dash.cloudflare.com
2. Login with your Cloudflare account
3. Click on domain: **isomap.io**
4. Click **DNS** in the left sidebar
5. Click **Records** tab

### Add DNS Records:

**Record 1 - Apex Domain (@):**
```
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: Click the orange cloud to turn it GRAY (DNS only)
TTL: Auto
```
Click **Save**

**Record 2 - WWW Subdomain:**
```
Type: A
Name: www
IPv4 address: 76.76.21.21
Proxy status: Click the orange cloud to turn it GRAY (DNS only)
TTL: Auto
```
Click **Save**

**CRITICAL:** Make sure both clouds are **GRAY**, not orange. Vercel needs direct DNS access.

---

## Step 2: Set Up Google Sheets Webhook (5 minutes)

### Create the Sheet:

1. **Open Google Sheets:**
   - Go to: https://sheets.google.com
   - Click **Blank** to create new sheet

2. **Name it:**
   - Click "Untitled spreadsheet" at top
   - Type: **IsoMap Leads**

3. **Add Headers (Row 1):**
   - Cell A1: `Email`
   - Cell B1: `Timestamp`
   - Cell C1: `Source`

### Create the Webhook:

4. **Open Apps Script:**
   - In your sheet, click **Extensions** menu
   - Click **Apps Script**
   - You'll see a code editor with default code

5. **Copy the Webhook Code:**
   - Delete all the default code in the editor
   - Copy this entire code:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Append the new row
    sheet.appendRow([
      data.email,
      data.timestamp || new Date().toISOString(),
      data.source || 'landing_page'
    ]);

    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

6. **Save the Script:**
   - Click the **💾 Save** icon (or Ctrl+S)
   - Name it: **IsoMap Webhook**

7. **Deploy as Web App:**
   - Click **Deploy** button (top right)
   - Select **New deployment**
   - Click the **⚙️ gear icon** next to "Select type"
   - Choose **Web app**
   - Configure:
     - Description: `IsoMap lead capture`
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Click **Deploy**

8. **Authorize Access:**
   - Click **Authorize access**
   - Choose your Google account
   - You might see "Google hasn't verified this app"
   - Click **Advanced**
   - Click **Go to IsoMap Webhook (unsafe)**
   - Click **Allow**

9. **COPY THE WEBHOOK URL:**
   - You'll see a URL like: `https://script.google.com/macros/s/AKfycby...xxxxxxxxxxx/exec`
   - **COPY THIS URL** - you need it for the next step!
   - Paste it somewhere safe (notepad, etc.)

### Test the Webhook (Optional but Recommended):

10. **Test with curl:**
```bash
curl -X POST "YOUR_WEBHOOK_URL_HERE" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","timestamp":"2025-12-15","source":"test"}'
```

Expected response: `{"success":true}`

Check your Google Sheet - you should see a new row with the test email!

---

## Step 3: Add Webhook URL to Vercel (2 minutes)

Once you have your webhook URL from Step 2:

```bash
cd /home/kwaldman/code/isomap-landing

# Add the environment variable
vercel env add GOOGLE_SHEETS_WEBHOOK_URL

# When prompted:
# - Paste your webhook URL
# - Select: Production, Preview, Development (all 3)
# - Press Enter

# Redeploy with the new environment variable
vercel --prod
```

---

## Step 4: Wait and Test (10-30 minutes)

### Wait for DNS Propagation:

After adding DNS records in Step 1, wait 10-30 minutes.

**Check DNS status:**
```bash
# Check if DNS is working
dig isomap.io

# Should show: 76.76.21.21
```

Or use online checker: https://dnschecker.org/#A/isomap.io

### Test Your Live Site:

Once DNS shows 76.76.21.21 globally:

1. **Visit:** https://isomap.io
2. **Scroll to email form**
3. **Enter your email**
4. **Click "Join Waitlist"**
5. **Check your Google Sheet** - should see new row!

---

## ✅ Success Checklist

- [ ] DNS A record added for @ → 76.76.21.21
- [ ] DNS A record added for www → 76.76.21.21
- [ ] Both records are GRAY cloud (not orange)
- [ ] Google Sheet "IsoMap Leads" created
- [ ] Headers added to sheet
- [ ] Apps Script deployed as web app
- [ ] Webhook URL copied
- [ ] Webhook URL added to Vercel
- [ ] Redeployed to Vercel
- [ ] Waited 10-30 minutes for DNS
- [ ] Site loads at https://isomap.io
- [ ] Email form tested and working
- [ ] Email appears in Google Sheet

---

## 🎉 You're Live!

Once all checkboxes are complete, you're ready to:

1. **Test yourself:** Submit your own email, verify it appears in sheet
2. **Share on HackerNews:** Post "Show HN: IsoMap – Isochrone API, 50% cheaper than Mapbox"
3. **Tweet:** "Just launched IsoMap.io 🗺️ - isochrone mapping API for developers"
4. **Reddit:** Post on r/webdev, r/SaaS
5. **Email 10 potential customers**

**Goal:** 5 email signups in 2 weeks = validated opportunity!

---

## 🐛 Troubleshooting

### DNS not working?
- Make sure clouds are GRAY in Cloudflare (not orange)
- Wait full 30 minutes
- Clear your browser cache
- Try incognito mode

### Email capture not working?
- Check webhook URL is correct in Vercel env vars
- Test webhook directly with curl command above
- Check Google Sheet permissions (should be "Anyone" can access)
- Check Vercel deployment logs for errors

### Need help?
- Check DEPLOYMENT_STATUS.md for current status
- See DNS_CONFIGURATION.md for detailed DNS help
- See GOOGLE_SHEETS_SETUP.md for detailed webhook help

---

**Let's go! 🚀**
