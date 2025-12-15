# Quick Deploy to Vercel - 10 Minutes

## Step 1: Google Sheets Setup (5 minutes)

### Create Sheet
1. Go to https://sheets.google.com
2. Create new sheet: "IsoMap Leads"
3. Add headers in row 1:
   - A1: `Email`
   - B1: `Timestamp`
   - C1: `Source`

### Create Webhook
1. In sheet, click **Extensions > Apps Script**
2. Delete default code
3. Copy from `GOOGLE_SHEETS_SCRIPT.js` (in this folder)
4. Paste into Apps Script editor
5. Click **Save** (💾 icon)
6. Click **Deploy > New deployment**
7. Click ⚙️ gear → Select **Web app**
8. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Click **Deploy**
10. Click **Authorize access** → Choose account → **Allow**
11. **COPY THE URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

---

## Step 2: Deploy to Vercel (5 minutes)

### Option A: Vercel CLI (Recommended)

```bash
cd /home/kwaldman/code/isomap-landing

# Install Vercel CLI
npm install -g vercel

# Login (opens browser)
vercel login

# Deploy
vercel

# When prompted:
# - Set up and deploy? Y
# - Which scope? [Your account]
# - Link to existing project? N
# - Project name? isomap-landing
# - Directory? ./
# - Override settings? N

# You'll get a preview URL
# Example: https://isomap-landing-abc123.vercel.app

# Add your Google Sheets webhook URL
vercel env add GOOGLE_SHEETS_WEBHOOK_URL
# Paste: YOUR_WEBHOOK_URL_FROM_STEP_1
# Environment: Production, Preview, Development (select all)

# Deploy to production
vercel --prod
```

### Option B: GitHub + Vercel (Automatic)

```bash
cd /home/kwaldman/code/isomap-landing

# Initialize git
git init
git add .
git commit -m "Initial commit - IsoMap landing page"

# Create GitHub repo
gh repo create isomap-landing --public --source=. --remote=origin --push

# Connect to Vercel:
# 1. Go to https://vercel.com/new
# 2. Import from GitHub
# 3. Select isomap-landing repo
# 4. Click Deploy
# 5. After deploy, add environment variable:
#    Settings → Environment Variables
#    Name: GOOGLE_SHEETS_WEBHOOK_URL
#    Value: YOUR_WEBHOOK_URL
```

---

## Step 3: Connect Domain (10 minutes)

### In Vercel Dashboard

1. Go to your project: https://vercel.com/dashboard
2. Select `isomap-landing` project
3. Go to **Settings > Domains**
4. Click **Add**
5. Enter: `isomap.io`
6. Click **Add**

Vercel will show DNS records to add.

### In Porkbun

1. Go to https://porkbun.com/account/domainsSpeedy
2. Find `isomap.io`
3. Click **DNS**
4. Add these records:

**For apex domain:**
```
Type: A
Host: (leave blank or @)
Answer: 76.76.21.21
TTL: 600
```

**For www:**
```
Type: CNAME
Host: www
Answer: cname.vercel-dns.com
TTL: 600
```

5. Click **Save**

### Also add www subdomain

Back in Vercel dashboard:
- Click **Add** again
- Enter: `www.isomap.io`
- Click **Add**

---

## Step 4: Test (2 minutes)

```bash
# Wait 5-10 minutes for DNS propagation

# Check DNS
curl https://isomap.io

# Should return HTML

# Test in browser
open https://isomap.io

# Test lead capture:
# 1. Enter email in form
# 2. Click "Join Waitlist"
# 3. Check Google Sheet for new row!
```

---

## Troubleshooting

### "Domain not found" error
- Wait 30 minutes for DNS to propagate
- Check: https://dnschecker.org/#A/isomap.io
- Make sure A record is `76.76.21.21`

### Lead capture not working
```bash
# Test webhook directly
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","timestamp":"2025-12-15","source":"test"}'

# Should return: {"success":true}
# Check Google Sheet for new row
```

### Need to update webhook URL
```bash
# If you need to change it later
vercel env rm GOOGLE_SHEETS_WEBHOOK_URL
vercel env add GOOGLE_SHEETS_WEBHOOK_URL
# Enter new URL
vercel --prod
```

---

## ✅ Success Checklist

- [ ] Google Sheet created with headers
- [ ] Apps Script deployed as web app
- [ ] Webhook URL copied
- [ ] Vercel CLI installed and logged in
- [ ] Project deployed to Vercel
- [ ] Environment variable added
- [ ] Production deployment complete
- [ ] Domain `isomap.io` added to Vercel
- [ ] DNS A record added at Porkbun
- [ ] DNS CNAME record added at Porkbun
- [ ] Site accessible at https://isomap.io
- [ ] Lead capture tested and working

---

## 🎉 YOU'RE LIVE!

**Your site:** https://isomap.io

**Next steps:**
1. Test the email form yourself
2. Share on HackerNews (Show HN)
3. Post on Reddit r/webdev
4. Tweet about it
5. Email 10 potential customers

**Goal: 5 email signups in 2 weeks = validated opportunity!**
