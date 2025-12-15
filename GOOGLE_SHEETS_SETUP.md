# Google Sheets Lead Capture Setup (KISS)

Two options: Simple (5 minutes) or Full Control (15 minutes)

---

## OPTION 1: Google Apps Script (RECOMMENDED - Full Control)

### Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Create new spreadsheet: "IsoMap Leads"
3. Add headers in row 1:
   - Column A: `Email`
   - Column B: `Timestamp`
   - Column C: `Source`

### Step 2: Create Apps Script Webhook

1. In your Google Sheet, click **Extensions > Apps Script**
2. Delete the default code
3. Paste this code:

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
      data.source || 'unknown'
    ]);

    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional, for debugging)
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        timestamp: new Date().toISOString(),
        source: 'test'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

4. Click **Save** (💾 icon)
5. Name it "IsoMap Lead Webhook"

### Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Configure:
   - **Description:** "IsoMap lead capture"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** if you see a warning
9. Click **Go to [project name] (unsafe)**
10. Click **Allow**
11. **COPY THE WEB APP URL** - it looks like:
    ```
    https://script.google.com/macros/s/AKfycby.../exec
    ```

### Step 4: Add to Environment Variables

1. Create `.env.local` file in your project:
   ```bash
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_URL_HERE/exec
   ```

2. For Vercel deployment, add environment variable:
   - Go to your Vercel project
   - Settings > Environment Variables
   - Add: `GOOGLE_SHEETS_WEBHOOK_URL` = (your webhook URL)

### Step 5: Test

```bash
# Test locally
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Should return: {"success":true}
# Check your Google Sheet - new row should appear!
```

---

## OPTION 2: FormSubmit.co (Zero Code, Super Simple)

### Step 1: Create Google Sheet

Same as Option 1, Step 1

### Step 2: Use FormSubmit

1. Go to https://formsubmit.co
2. Enter your email
3. Click "Get Your Code"
4. They'll send you a confirmation email
5. Click the link to verify
6. You'll get a unique endpoint like: `https://formsubmit.co/abc123`

### Step 3: Update Your Code

Replace `/api/subscribe` with direct form submission:

```typescript
// In app/page.tsx, modify handleSubmit:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("loading");

  try {
    // Use FormSubmit directly
    const response = await fetch("https://formsubmit.co/YOUR_EMAIL_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: email,
        _subject: "New IsoMap Lead!",
        _captcha: "false"
      })
    });

    if (response.ok) {
      setStatus("success");
      setMessage("Thanks! You're on the list.");
      setEmail("");
    }
  } catch (error) {
    setStatus("error");
    setMessage("Network error. Please try again.");
  }
};
```

**Pros:** Zero setup, reliable
**Cons:** Emails go to inbox (not Google Sheets), less control

---

## OPTION 3: Basin (Professional, $0-19/mo)

1. Go to https://usebasin.com
2. Create account (free tier: 100 submissions/mo)
3. Create new form
4. Get submission URL
5. Set up Google Sheets integration in Basin dashboard
6. Use Basin URL as `GOOGLE_SHEETS_WEBHOOK_URL`

**Pros:** Spam filtering, notifications, Google Sheets integration
**Cons:** Requires account, potential cost

---

## Testing Your Setup

### Test 1: Local Development

```bash
# Start dev server
npm run dev

# In another terminal
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test1@example.com"}'
```

### Test 2: Via Browser

1. Open http://localhost:3000
2. Enter email in form
3. Click "Join Waitlist"
4. Check Google Sheet for new row

### Test 3: Validation

Try these to ensure validation works:
- Empty email: Should show error
- Invalid email (no @): Should show error
- Valid email: Should show success

---

## Monitoring Leads

### View in Google Sheets

1. Open your IsoMap Leads sheet
2. Sort by timestamp (newest first)
3. Use formulas to count leads:
   ```
   =COUNTA(A2:A)  // Total leads
   =COUNTIF(A2:A,"*@gmail.com")  // Gmail leads
   ```

### Set Up Alerts

In Google Sheets:
1. Tools > Notification rules
2. "Notify me when... A user submits a form"
3. Choose: "Any changes are made"
4. Choose: "Notify me immediately"

You'll get email whenever someone signs up!

---

## Troubleshooting

### "Failed to submit to Google Sheets"

1. Check webhook URL is correct in `.env.local`
2. Make sure Apps Script is deployed as **Anyone** access
3. Check Apps Script logs: Executions tab

### "CORS error"

Apps Script web apps handle CORS automatically. If you see CORS errors:
- Make sure you deployed as "Web app" (not "API executable")
- Make sure "Who has access" is set to "Anyone"

### No data appearing in sheet

1. Check Apps Script logs for errors
2. Test the webhook directly:
   ```bash
   curl -X POST YOUR_WEBHOOK_URL \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","timestamp":"2025-12-15","source":"test"}'
   ```

### Rate limiting

Google Apps Script has quotas:
- Free: 20,000 URL fetch calls/day
- More than enough for waitlist (even 100 signups/day)

---

## Goal: 5 Emails

Once you hit 5 email signups, you've validated interest!

**Next steps after 5 signups:**
1. Email them personally
2. Ask: "What would you use IsoMap for?"
3. Gauge willingness to pay
4. If 3+ give strong positive signals → Build MVP
5. If <3 → Pivot or kill project

---

## Security Best Practices

1. **Don't commit `.env.local`** - it's in `.gitignore`
2. **Use Vercel environment variables** for production
3. **Add rate limiting** if you get spam (see `app/api/subscribe/route.ts`)
4. **Consider adding reCAPTCHA** after initial validation

---

## Next: Deploy to Vercel

See `DEPLOYMENT.md` for deployment instructions.
