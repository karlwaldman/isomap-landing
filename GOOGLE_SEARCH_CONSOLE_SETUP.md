# Google Search Console Setup Guide

This guide will walk you through adding IsoMap.io to Google Search Console for SEO tracking and indexing.

---

## Step 1: Add Property to Google Search Console

### 1.1 Go to Search Console
**Visit:** https://search.google.com/search-console/welcome

### 1.2 Select Property Type
- Click **"URL prefix"** (not Domain property)
- Enter: `https://isomap.io`
- Click **"Continue"**

---

## Step 2: Verify Ownership

Google offers several verification methods. We'll use the **HTML tag method** (easiest for Next.js).

### 2.1 Choose HTML Tag Method
1. On the verification screen, select **"HTML tag"**
2. You'll see a meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
   ```
3. **Copy this entire tag**

### 2.2 Add to Next.js Layout
I'll add this to your layout file for you. Just provide the verification code.

---

## Step 3: Submit Sitemap

After verification, submit your sitemap:

### 3.1 Generate Sitemap
Next.js should automatically generate a sitemap at:
- `https://isomap.io/sitemap.xml`

If not, we'll create one.

### 3.2 Submit to Google
1. In Google Search Console, go to **"Sitemaps"** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **"Submit"**

---

## Step 4: Request Indexing

### 4.1 Request URL Inspection
1. In Search Console, click **"URL Inspection"** (top search bar)
2. Enter: `https://isomap.io`
3. Click **"Request Indexing"**

This tells Google to crawl your site immediately.

---

## What You'll Get

Once verified, Google Search Console provides:

### Performance Data:
- Search queries that show your site
- Clicks and impressions
- Average position in search results
- Click-through rate (CTR)

### Coverage Reports:
- Which pages are indexed
- Any indexing errors
- Sitemap status

### Enhancement Reports:
- Core Web Vitals (performance)
- Mobile usability
- Security issues

---

## Timeline

- **Verification:** Instant (once tag is added)
- **Initial crawl:** 1-7 days
- **First data:** 2-3 days after crawl
- **Regular updates:** Daily

---

## Next Steps After Verification

1. **Submit sitemap** (see Step 3)
2. **Request indexing** for main page
3. **Monitor for 1 week** for first data
4. **Check coverage** for any errors

---

## Ready?

Let me know your Google verification code and I'll add it to the layout file!
