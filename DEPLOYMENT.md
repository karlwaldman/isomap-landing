# Deploy IsoMap Landing Page to Vercel

**Goal:** Get isomap.io live in 10 minutes

---

## Prerequisites

- ✅ Domain isomap.io purchased
- ✅ Google Sheets webhook set up (see `GOOGLE_SHEETS_SETUP.md`)
- ✅ Vercel account (free tier is fine)

---

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

---

## Step 2: Deploy

```bash
# From the isomap-landing directory
cd /home/kwaldman/code/isomap-landing

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# When prompted:
# - Set up and deploy? Y
# - Which scope? [Your account]
# - Link to existing project? N
# - Project name? isomap-landing
# - Directory? ./
# - Override settings? N
```

This will deploy to a preview URL like: `https://isomap-landing-xyz.vercel.app`

---

## Step 3: Add Environment Variable

```bash
# Add Google Sheets webhook URL
vercel env add GOOGLE_SHEETS_WEBHOOK_URL

# When prompted:
# - What's the value? [Paste your Google Sheets webhook URL]
# - Environment? Production
# - Also add to Preview? Y
# - Also add to Development? Y
```

---

## Step 4: Deploy to Production

```bash
# Deploy to production
vercel --prod

# This will give you a production URL
```

---

## Step 5: Connect Custom Domain

### Option A: Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Select your project (`isomap-landing`)
3. Go to **Settings > Domains**
4. Click **Add**
5. Enter: `isomap.io`
6. Click **Add**

Vercel will show you DNS records to add.

### Option B: Via CLI

```bash
vercel domains add isomap.io --project isomap-landing
```

---

## Step 6: Configure DNS

Go to where you bought the domain (Porkbun, Namecheap, etc.)

### If using Porkbun:

1. Go to https://porkbun.com/account/domainsSpeedy
2. Click isomap.io
3. Click "DNS Records"
4. Add these records (Vercel will tell you the exact values):

**For apex domain (isomap.io):**
```
Type: A
Host: @ (or blank)
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

### DNS Propagation

- Usually takes 5-30 minutes
- Can take up to 24 hours
- Check status: https://dnschecker.org

---

## Step 7: Verify Deployment

```bash
# Wait 5-10 minutes, then test
curl https://isomap.io

# Should return HTML
```

Visit in browser: https://isomap.io

---

## Step 8: Test Lead Capture

1. Go to https://isomap.io
2. Enter your email in the form
3. Click "Join Waitlist"
4. Check your Google Sheet - should see new row!

---

## Troubleshooting

### "Domain verification pending"

- DNS changes take time
- Check DNS propagation: https://dnschecker.org/#A/isomap.io
- Wait 30 minutes, try again

### "GOOGLE_SHEETS_WEBHOOK_URL not configured"

```bash
# Add it
vercel env add GOOGLE_SHEETS_WEBHOOK_URL

# Redeploy
vercel --prod
```

### "Failed to submit to Google Sheets"

1. Check Apps Script deployment is public ("Anyone" can access)
2. Test webhook directly:
   ```bash
   curl -X POST YOUR_WEBHOOK_URL \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

### SSL Certificate Issues

- Vercel auto-provisions SSL via Let's Encrypt
- Can take 10-30 minutes after DNS is configured
- Check: https://www.ssllabs.com/ssltest/analyze.html?d=isomap.io

---

## Monitoring

### Vercel Analytics (Free)

1. Go to your project in Vercel dashboard
2. Click **Analytics**
3. See pageviews, unique visitors, etc.

### Google Sheets (Lead Count)

Add this formula to cell E1:
```
=COUNTA(A2:A)
```

This shows total number of leads.

---

## Updates

To deploy changes:

```bash
# Make your changes
# Commit to git (optional but recommended)

# Deploy
vercel --prod

# Done! Changes live in ~30 seconds
```

---

## Cost

**Vercel Free Tier:**
- ✅ Unlimited websites
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ 100GB bandwidth/month
- ✅ More than enough for validation

**Paid ($20/mo) only needed if:**
- >100GB bandwidth
- >1000 GB-hours serverless functions
- Advanced analytics

For landing page validation, **free tier is perfect**.

---

## Next Steps After Deployment

1. ✅ Test lead capture (submit your own email)
2. ✅ Share on Twitter/LinkedIn/HackerNews
3. ✅ Send to potential customers for feedback
4. ✅ Goal: 5 emails = validation success!
5. ✅ If 5+ signups → Proceed to customer interviews

---

## Quick Reference

```bash
# Deploy preview
vercel

# Deploy production
vercel --prod

# View logs
vercel logs

# Check environment variables
vercel env ls

# Remove deployment
vercel remove [deployment-url]
```

---

**Deployment should take 10-15 minutes total.**

**Once live, your URL: https://isomap.io**
