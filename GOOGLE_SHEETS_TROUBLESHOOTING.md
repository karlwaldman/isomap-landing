# Google Sheets Authorization Troubleshooting

## Problem: "This app is blocked"

When you try to authorize the Apps Script, Google shows a warning that the app is blocked.

---

## Solution: Bypass the Security Warning

### Step-by-Step:

1. **When you see the authorization screen**, you'll see:
   - "Google hasn't verified this app"
   - "This app is blocked"

2. **Click "Advanced"** (small text at bottom left)

3. **Click "Go to IsoMap Webhook (unsafe)"** or "Go to [project name] (unsafe)"
   - This appears after clicking Advanced
   - This is safe because YOU created the script

4. **Click "Allow"** on the next screen

5. **Done!** Your script is now authorized

---

## Alternative: Use Different Google Account

If the above doesn't work, your Google account might have organization restrictions.

### Try with a personal Gmail account:

1. **Sign out** of your current Google account
2. **Sign in** with a personal Gmail account (not work/school account)
3. **Repeat the deployment process**

---

## Alternative Method: Skip Authorization for Now

If you can't get past the authorization:

### Use a simpler webhook service instead:

**Option 1: Use Tally Forms (Free, No Code)**
1. Go to: https://tally.so
2. Create free account
3. Create a form with one field: "Email"
4. Get the form embed code
5. Replace the email form in your landing page with Tally embed

**Option 2: Use Google Forms**
1. Create a Google Form with email field
2. Link responses to a Google Sheet
3. Embed the form on your landing page

**Option 3: Use Airtable (Free tier)**
1. Go to: https://airtable.com
2. Create a base with Email, Timestamp columns
3. Use Airtable's REST API
4. Much easier authorization process

---

## Still Having Issues?

### Check These:

**1. Are you using a work/school Google account?**
- Work/school accounts often have restrictions
- Use a personal Gmail account instead

**2. Is the script saved?**
- Make sure you clicked the Save icon (💾)
- The project should have a name

**3. Did you deploy it correctly?**
- Deploy > New deployment
- Select "Web app" (not "Add-on" or other types)
- Execute as: **Me** (not "User accessing the web app")
- Who has access: **Anyone** (not "Only myself")

**4. Are you in the right Google account?**
- Apps Script and Sheet should be in same account
- Check top-right corner for account email

---

## Quick Test: Simpler Approach

Let's test if it's a script issue or authorization issue:

### Simple Test Script:

1. In Apps Script editor, replace ALL code with this simpler version:

```javascript
function doGet() {
  return ContentService.createTextOutput('Webhook is working!');
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var email = '';

  try {
    var data = JSON.parse(e.postData.contents);
    email = data.email;
  } catch(err) {
    email = 'Error: ' + err.toString();
  }

  sheet.appendRow([email, new Date()]);

  return ContentService.createTextOutput(JSON.stringify({success: true}));
}
```

2. Save it
3. Try deploying again
4. This simpler version might authorize more easily

---

## Screenshots of What You Should See:

### Step 1: Click "Advanced"
```
Google hasn't verified this app
                                   [Advanced]
```

### Step 2: Click "Go to [project] (unsafe)"
```
Advanced
This app hasn't been verified by Google yet.
Go to IsoMap Webhook (unsafe)
```

### Step 3: Grant Permissions
```
IsoMap Webhook wants to access your Google Account

This will allow IsoMap Webhook to:
✓ See, edit, create, and delete your spreadsheets

[Cancel]  [Allow]
```

---

## If Nothing Works: Use This Emergency Workaround

### Emergency Option: Use a Public Google Form

This takes 2 minutes and requires ZERO authorization:

1. **Create Google Form:**
   - Go to: https://forms.google.com
   - Click **Blank**
   - Add question: "Email address" (Short answer, required)

2. **Link to Sheet:**
   - Click **Responses** tab
   - Click green Sheets icon
   - Create new spreadsheet "IsoMap Leads"

3. **Get Form Link:**
   - Click **Send** button
   - Copy the form link

4. **Update Landing Page:**
   - Instead of custom form, use an iframe embed of Google Form
   - Or just link to the form: "Join Waitlist" → Google Form

**This works immediately, no authorization needed!**

---

## My Recommendation:

Try the "Advanced" → "Go to unsafe" approach first.

If that doesn't work in 2 tries, use the **Google Forms workaround** above to launch quickly. You can always migrate to a proper webhook later once you have signups.

**The goal is to launch and get 5 emails, not to have perfect infrastructure!**

---

**Need help?** Let me know which error message you're seeing and I can help troubleshoot.
