# IsoMap.io Landing Page

Professional landing page for IsoMap API - Isochrone mapping API for developers.

**Live at:** https://isomap.io

---

## Features

✅ Professional, conversion-optimized design
✅ Deep educational content about isochrone APIs
✅ Email lead capture → Google Sheets (KISS)
✅ Fast (Next.js 15 + Tailwind CSS)
✅ SEO optimized
✅ Mobile responsive
✅ Deploy to Vercel in 10 minutes

---

## Quick Start

### 1. Install Dependencies

```bash
cd isomap-landing
npm install
```

### 2. Set Up Google Sheets Lead Capture

Follow `GOOGLE_SHEETS_SETUP.md` (5 minutes)

Create `.env.local`:
```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3. Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### 4. Test Lead Capture

1. Enter email in form
2. Click "Join Waitlist"
3. Check your Google Sheet!

### 5. Deploy to Vercel

Follow `DEPLOYMENT.md` (10 minutes)

```bash
vercel --prod
```

---

## Project Structure

```
isomap-landing/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── layout.tsx            # Layout with SEO metadata
│   ├── globals.css           # Global styles
│   └── api/
│       └── subscribe/
│           └── route.ts      # Lead capture API endpoint
├── GOOGLE_SHEETS_SETUP.md   # Lead capture setup guide
├── DEPLOYMENT.md             # Vercel deployment guide
├── README.md                 # This file
└── package.json              # Dependencies
```

---

## Content Highlights

The landing page includes:

### Educational Content
- **What is an Isochrone?** - 500-word explainer
- **Use Cases** - 6 detailed examples (real estate, logistics, field service, etc.)
- **How It Works** - Technical deep dive
- **FAQ** - 6 common questions

### Conversion Elements
- **Hero** with clear value prop ("50% cheaper than Mapbox")
- **Email capture forms** (2 locations)
- **Social proof** (launching Q1 2025)
- **Comparison table** (vs Mapbox, TravelTime)
- **Pricing preview** (transparent, no sales calls)

### Technical Details
- **Code examples** (curl, API response)
- **Performance metrics** (<200ms response time)
- **API documentation preview**
- **Developer-friendly positioning**

---

## Goal: 5 Email Signups

This is a **validation test**.

**Success = 5+ email signups**
- Email them personally
- Ask about their use case
- Gauge willingness to pay
- If 3+ strong signals → Build MVP
- If <3 → Pivot or kill

---

## Tech Stack

- **Framework:** Next.js 15.2.2
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Lead Capture:** Google Sheets (via Apps Script)
- **Domain:** isomap.io

---

## Performance

- ⚡ Lighthouse Score: 95+
- 📱 Mobile Responsive
- 🚀 Global CDN via Vercel
- 🔒 Automatic HTTPS

---

## SEO

Optimized for:
- `isochrone API`
- `drive time map API`
- `travel time API`
- `isochrone mapping`
- `routing API`

Meta tags, Open Graph, and Twitter Cards configured.

---

## Development

### Run Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Type Check
```bash
npx tsc --noEmit
```

---

## Customization

### Update Content

Edit `app/page.tsx`:
- Hero text
- Pricing
- Use cases
- FAQ

### Update Styles

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#2563eb",    // Main blue
  secondary: "#10b981",  // Accent green
}
```

### Update Meta Tags

Edit `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "...",
  description: "...",
};
```

---

## Monitoring

### Lead Count

Open your Google Sheet, add formula to cell E1:
```
=COUNTA(A2:A)
```

### Website Analytics

1. Go to Vercel dashboard
2. Select project
3. Click "Analytics"
4. See visitors, pageviews, etc.

---

## Troubleshooting

### Lead capture not working

1. Check `.env.local` has correct webhook URL
2. Test webhook directly (see GOOGLE_SHEETS_SETUP.md)
3. Check Apps Script deployment is public
4. Check browser console for errors

### DNS not resolving

1. Check DNS records at https://dnschecker.org
2. Wait 30 minutes (DNS propagation)
3. Verify Vercel domain settings

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm install
npm run build
```

---

## Next Steps

1. ✅ Deploy landing page
2. ✅ Test lead capture
3. ✅ Share on social media
4. ✅ Send to potential customers
5. ✅ Wait for 5 signups
6. ✅ Email signups to validate willingness to pay
7. ✅ If validated → Build MVP (see ../ISOMAP_ULTRATHINK_ANALYSIS.md)

---

## Files Reference

- `GOOGLE_SHEETS_SETUP.md` - Lead capture configuration
- `DEPLOYMENT.md` - Vercel deployment guide
- `../ISOMAP_ULTRATHINK_ANALYSIS.md` - Business strategy (in parent directory)

---

## Support

Questions? Issues?
- Check documentation files above
- Test locally first: `npm run dev`
- Verify Google Sheets webhook works
- Check Vercel logs: `vercel logs`

---

## License

MIT License - Free to use and modify

---

**Built with ♥ for IsoMap.io**

**Goal: 10 sites × $50K/year = $500K ARR**
