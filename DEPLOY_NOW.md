# Deploy IsoMap.io NOW - 15 Minutes Total

**Status:** ✅ Git repo created: https://github.com/karlwaldman/isomap-landing
**Next:** Connect to Vercel and configure Google Sheets

---

## Step 1: Google Sheets Webhook (5 min) - DO THIS FIRST

### Quick Steps:

1. **Create Sheet:**
   - Go to: https://sheets.google.com
   - Click **Blank** to create new sheet
   - Name it: "IsoMap Leads"

2. **Add Headers (Row 1):**
   - A1: `Email`
   - B1: `Timestamp`
   - C1: `Source`

3. **Create Webhook:**
   - Click **Extensions > Apps Script**
   - Delete the default `function myFunction() {}`
   - Open `/home/kwaldman/code/isomap-landing/GOOGLE_SHEETS_SCRIPT.js`
   - Copy ALL the code
   - Paste into Apps Script editor
   - Click **💾 Save**
   - Name it: "IsoMap Webhook"

4. **Deploy:**
   - Click **Deploy > New deployment**
   - Click the **⚙️ gear icon** next to "Select type"
   - Choose **Web app**
   - Configure:
     - Description: "IsoMap lead capture"
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Click **Deploy**

5. **Authorize:**
   - Click **Authorize access**
   - Choose your Google account
   - If you see a warning, click **Advanced**
   - Click **Go to [project name] (unsafe)**
   - Click **Allow**

6. **COPY THE URL:**
   - It looks like: `https://script.google.com/macros/s/AKfycby...xxxxxxxxxxx/exec`
   - **SAVE THIS - YOU'LL NEED IT IN STEP 2!**

### Test It (Optional):
```bash
curl -X POST "YOUR_WEBHOOK_URL_HERE" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","timestamp":"2025-12-15","source":"test"}'

# Should return: {"success":true}
# Check your Google Sheet - new row should appear!
```

---

## Step 2: Deploy to Vercel (5 min)

### Option A: Vercel Dashboard (Easiest)

1. **Connect GitHub:**
   - Go to: https://vercel.com/new
   - Click **Import Git Repository**
   - Select: `karlwaldman/isomap-landing`
   - Click **Import**

2. **Configure:**
   - Framework Preset: **Next.js** (should auto-detect)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Add Environment Variable:**
   - Click **Environment Variables** (before deploying)
   - Name: `GOOGLE_SHEETS_WEBHOOK_URL`
   - Value: **PASTE YOUR WEBHOOK URL FROM STEP 1**
   - Check all environments: Production, Preview, Development
   - Click **Add**

4. **Deploy:**
   - Click **Deploy**
   - Wait 2-3 minutes
   - You'll get a URL like: `https://isomap-landing-xyz.vercel.app`

### Option B: Vercel CLI (Alternative)

```bash
cd /home/kwaldman/code/isomap-landing

# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variable
vercel env add GOOGLE_SHEETS_WEBHOOK_URL
# Paste your webhook URL
# Select: Production, Preview, Development (all)
```

---

## Step 3: Connect Domain (5 min)

### In Vercel Dashboard:

1. **Add Domain:**
   - Go to your project: https://vercel.com/dashboard
   - Select `isomap-landing` project
   - Click **Settings** (top nav)
   - Click **Domains** (left sidebar)
   - Click **Add**
   - Enter: `isomap.io`
   - Click **Add**

2. **Also add www:**
   - Click **Add** again
   - Enter: `www.isomap.io`
   - Click **Add**

Vercel will show you DNS records to add.

### In Porkbun:

1. **Go to DNS Settings:**
   - https://porkbun.com/account/domainsSpeedy
   - Find `isomap.io`
   - Click **DNS** button

2. **Add A Record (for apex domain):**
   - Type: **A**
   - Host: **(leave blank)**
   - Answer: **76.76.21.21**
   - TTL: **600**
   - Click **Add**

3. **Add CNAME Record (for www):**
   - Type: **CNAME**
   - Host: **www**
   - Answer: **cname.vercel-dns.com**
   - TTL: **600**
   - Click **Add**

4. **Save:**
   - Click **Submit** or **Save**

---

## Step 4: Wait & Test (5-30 min)

### DNS Propagation

DNS changes take 5-30 minutes (sometimes up to 24 hours, but usually quick).

**Check DNS status:**
- https://dnschecker.org/#A/isomap.io
- Should show: `76.76.21.21`
- When it's green in multiple locations, you're good!

### Test Your Site

```bash
# Wait 10 minutes, then try
curl https://isomap.io

# Should return HTML
```

**Visit in browser:**
- https://isomap.io
- Should load your landing page!

### Test Lead Capture

1. Go to https://isomap.io
2. Scroll to email form
3. Enter your email
4. Click "Join Waitlist"
5. Should see success message
6. **Check your Google Sheet** - new row should appear!

---

## ✅ CHECKLIST

**Google Sheets:**
- [ ] Created "IsoMap Leads" sheet
- [ ] Added headers: Email, Timestamp, Source
- [ ] Copied Apps Script code
- [ ] Deployed as web app
- [ ] Authorized access
- [ ] Copied webhook URL
- [ ] Tested webhook (optional)

**Vercel:**
- [ ] Connected GitHub repo
- [ ] Added environment variable
- [ ] Deployed successfully
- [ ] Got production URL

**Domain:**
- [ ] Added isomap.io to Vercel
- [ ] Added www.isomap.io to Vercel
- [ ] Added A record at Porkbun
- [ ] Added CNAME record at Porkbun
- [ ] Waited for DNS propagation
- [ ] Site loads at https://isomap.io

**Testing:**
- [ ] Tested email capture form
- [ ] Verified email appeared in Google Sheet
- [ ] Site looks good on mobile
- [ ] All links work

---

## 🎉 YOU'RE LIVE!

**Your site:** https://isomap.io

**Monitor leads:**
- Check Google Sheet daily
- Add formula to cell D1: `=COUNTA(A2:A)` (shows total leads)

---

## 🚀 NEXT STEPS

### Immediate (Today):

1. **Test yourself:**
   - Submit your own email
   - Verify it appears in sheet
   - Take screenshot for sharing

2. **Share on HackerNews:**
   - Go to: https://news.ycombinator.com/submit
   - Title: "Show HN: IsoMap – Isochrone mapping API, 50% cheaper than Mapbox"
   - URL: https://isomap.io
   - Post it!

3. **Share on Twitter/X:**
   ```
   Just launched IsoMap.io – an isochrone mapping API for developers 🗺️

   ✅ 50% cheaper than Mapbox
   ✅ 5-minute setup
   ✅ Usage-based pricing

   Perfect for real estate, logistics, and field service apps.

   Join the waitlist: https://isomap.io

   #buildinpublic #indiehackers #devtools
   ```

4. **Post on Reddit:**
   - r/webdev
   - r/SaaS
   - r/entrepreneur
   - Title: "Launched an isochrone mapping API - feedback welcome!"

### This Week:

5. **Email 10 potential customers**
   - Field service SaaS founders
   - Real estate tech companies
   - Logistics software companies
   - Ask: "Would you use this?"

6. **Monitor daily:**
   - Check Google Sheet for signups
   - Reply to any feedback on HN/Reddit
   - Email each signup within 24 hours

### Week 2:

7. **Make GO/NO-GO decision:**
   - If 5+ signups + strong signals → Build MVP
   - If <5 or weak signals → Pivot or kill

---

## 🐛 Troubleshooting

### "DNS not resolving"
- Wait 30 minutes
- Check https://dnschecker.org
- Verify A record is `76.76.21.21` at Porkbun

### "Lead capture not working"
```bash
# Test webhook directly
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com"}'

# Should return: {"success":true}
```

Check:
- [ ] Webhook URL is correct in Vercel environment variables
- [ ] Apps Script is deployed as "Anyone" can access
- [ ] Google Sheet is not deleted or moved

### "Environment variable not found"

If you see "GOOGLE_SHEETS_WEBHOOK_URL not configured":

```bash
vercel env add GOOGLE_SHEETS_WEBHOOK_URL
# Paste your webhook URL
# Redeploy:
vercel --prod
```

---

## 📞 QUICK COMMANDS

```bash
# Redeploy
vercel --prod

# View logs
vercel logs

# Check environment variables
vercel env ls

# Open Vercel dashboard
vercel
```

---

**GO DEPLOY NOW! Everything is ready. Follow Step 1, 2, 3, 4 above. 🚀**

**Time estimate: 15 minutes total**
