# Google Search Console - Quick Start (5 Minutes)

Everything is ready for Google Search Console. Follow these 5 simple steps:

---

## ✅ Step 1: Add Property (1 minute)

1. **Go to:** https://search.google.com/search-console/welcome

2. **Click "URL prefix"** (not Domain)

3. **Enter:** `https://isomap.io`

4. **Click "Continue"**

---

## ✅ Step 2: Get Verification Code (1 minute)

1. **Select "HTML tag" method**

2. **You'll see:**
   ```html
   <meta name="google-site-verification" content="ABC123XYZ789..." />
   ```

3. **Copy ONLY the code** (the part after `content="`):
   ```
   ABC123XYZ789...
   ```
   (Example - yours will be different)

---

## ✅ Step 3: Add to Environment (2 minutes)

### Local (.env.local):
```bash
# Add this line:
NEXT_PUBLIC_GOOGLE_VERIFICATION=ABC123XYZ789...
```

### Vercel Production:
```bash
# Add to Vercel:
echo "ABC123XYZ789..." | vercel env add NEXT_PUBLIC_GOOGLE_VERIFICATION production preview development
```

Or via dashboard:
1. Go to: https://vercel.com/karl-waldmans-projects/isomap-landing/settings/environment-variables
2. Add new: `NEXT_PUBLIC_GOOGLE_VERIFICATION` = `ABC123XYZ789...`
3. Select: Production, Preview, Development
4. Save

---

## ✅ Step 4: Redeploy (1 minute)

```bash
vercel --prod
```

Wait ~30 seconds for deployment.

---

## ✅ Step 5: Verify in Google Search Console (30 seconds)

1. **Go back to Google Search Console**

2. **Click "Verify"**

3. **You'll see:** ✅ "Ownership verified"

4. **Click "Go to property"**

---

## 🎯 Submit Sitemap (Bonus - 1 minute)

Once verified:

1. **In Search Console, click "Sitemaps"** (left sidebar)

2. **Enter:** `sitemap.xml`

3. **Click "Submit"**

4. **Status:** ✅ "Success" (may take a few hours to process)

---

## 📊 What You Get

After 2-3 days, you'll start seeing:

### Performance Data:
- Search queries showing your site
- Clicks and impressions
- Average position
- Click-through rate (CTR)

### Coverage:
- Which pages are indexed
- Any indexing errors

### Core Web Vitals:
- Performance metrics
- Mobile usability
- Security issues

---

## ✅ Already Configured

Your site already has:
- ✅ **Sitemap:** https://isomap.io/sitemap.xml
- ✅ **Robots.txt:** https://isomap.io/robots.txt
- ✅ **Verification tag:** Ready (just needs your code)
- ✅ **SEO metadata:** Title, description, keywords
- ✅ **Open Graph:** Social media sharing
- ✅ **Security headers:** Grade A

All you need is to add your verification code!

---

## 🚀 Quick Commands

```bash
# 1. Add verification code to .env.local
echo "NEXT_PUBLIC_GOOGLE_VERIFICATION=ABC123XYZ789..." >> .env.local

# 2. Add to Vercel (choose one method)
# Method A: CLI
echo "ABC123XYZ789..." | vercel env add NEXT_PUBLIC_GOOGLE_VERIFICATION production

# Method B: Dashboard
# Go to Vercel dashboard and add manually

# 3. Redeploy
vercel --prod

# 4. Verify in Google Search Console
# Click "Verify" button

# Done!
```

---

## 📚 Additional Resources

- **Google Search Console:** https://search.google.com/search-console
- **Sitemap Guide:** https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- **Verification Methods:** https://support.google.com/webmasters/answer/9008080

---

**Your site is already optimized for Google. Just add the verification code and you're done!** 🎉
