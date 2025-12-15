# IsoMap.io Launch Checklist

**Status:** ✅ Landing page built and ready to deploy
**Goal:** Capture 5 emails to validate market interest

---

## ✅ COMPLETED

### 1. Landing Page Built
- ✅ Professional design with deep educational content
- ✅ 2,000+ words of educational content about isochrone APIs
- ✅ Multiple email capture forms (hero + footer)
- ✅ Mobile responsive
- ✅ SEO optimized (meta tags, Open Graph, Twitter Cards)
- ✅ Fast performance (Next.js 15 + Tailwind)
- ✅ Build verified (no errors)

### 2. Content Created
- ✅ "What is an Isochrone Map?" - 500-word explainer
- ✅ 6 detailed use cases (real estate, logistics, field service, retail, healthcare, food delivery)
- ✅ Technical deep dive (how it works)
- ✅ Comparison table (vs Mapbox, TravelTime)
- ✅ FAQ section (6 questions)
- ✅ Code examples (API calls, responses)
- ✅ Pricing preview (transparent, no sales calls)

### 3. Lead Capture System
- ✅ API endpoint built (`/api/subscribe`)
- ✅ Google Sheets integration guide created
- ✅ Validation (email format)
- ✅ Error handling
- ✅ Success/error messaging

### 4. Documentation
- ✅ `README.md` - Project overview
- ✅ `GOOGLE_SHEETS_SETUP.md` - Lead capture setup (3 options)
- ✅ `DEPLOYMENT.md` - Vercel deployment guide
- ✅ `LAUNCH_CHECKLIST.md` - This file

---

## 🚀 NEXT STEPS (30 minutes)

### Step 1: Set Up Google Sheets (5 minutes)

1. Create Google Sheet "IsoMap Leads"
2. Add headers: Email | Timestamp | Source
3. Follow `GOOGLE_SHEETS_SETUP.md` Option 1
4. Copy webhook URL

### Step 2: Configure Environment (2 minutes)

```bash
cd /home/kwaldman/code/isomap-landing

# Create .env.local
echo "GOOGLE_SHEETS_WEBHOOK_URL=YOUR_WEBHOOK_URL_HERE" > .env.local
```

### Step 3: Test Locally (3 minutes)

```bash
# Start dev server
npm run dev

# Open browser: http://localhost:3000
# Enter test email
# Check Google Sheet for new row
```

### Step 4: Deploy to Vercel (10 minutes)

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts, then add environment variable:
vercel env add GOOGLE_SHEETS_WEBHOOK_URL
```

### Step 5: Configure Domain (10 minutes)

1. Go to Vercel dashboard
2. Add domain: isomap.io
3. Copy DNS records
4. Add to Porkbun:
   - Type: A, Host: @, Answer: 76.76.21.21
   - Type: CNAME, Host: www, Answer: cname.vercel-dns.com
5. Wait 10-30 minutes for DNS propagation

### Step 6: Verify (5 minutes)

```bash
# Check DNS
curl https://isomap.io

# Test lead capture
# 1. Visit https://isomap.io
# 2. Enter email
# 3. Check Google Sheet
```

---

## 📊 VALIDATION METRICS

### Goal: 5 Email Signups

**Success Criteria:**
- 5+ email signups in first 2 weeks
- 3+ respond to follow-up email
- 2+ express willingness to pay $49-199/mo

**If Success:**
- ✅ Email all 5 personally
- ✅ Ask: "What would you use IsoMap for?"
- ✅ Gauge willingness to pay
- ✅ Schedule interviews
- ✅ Proceed to MVP development

**If Fail (<5 signups):**
- Consider pivot (service area mapping, delivery zones)
- Or kill project (wrong market)

---

## 🎯 DISTRIBUTION STRATEGY

Where to share the landing page:

### Week 1: Soft Launch

**Developer Communities:**
- HackerNews (Show HN: Isochrone API landing page)
- Reddit r/webdev, r/entrepreneur, r/SaaS
- Dev.to (write article linking to landing page)
- Indie Hackers (post in "Show" section)

**Direct Outreach:**
- Email 20 potential customers (field service SaaS founders)
- LinkedIn posts in developer groups
- Twitter thread about isochrones

### Week 2: Expand

**If getting traction:**
- Product Hunt launch
- More Reddit communities (r/realestate, r/logistics)
- HN "Ask HN: What do you use for drive-time mapping?"
- Cold email to real estate platforms

---

## 💡 FOLLOW-UP EMAIL TEMPLATE

When you get signups, email them:

```
Subject: Quick question about IsoMap API

Hi [Name],

Thanks for joining the IsoMap API waitlist! I'm [Your Name], building this.

Quick question: What would you use an isochrone mapping API for?

I'm trying to understand the most important use cases so I can build the right product.

Also curious: What do you use today for drive-time mapping? (Mapbox, TravelTime, custom solution?)

Would love to hear your thoughts!

Best,
[Your Name]
```

**Track responses in Google Sheet (add columns):**
- Use Case
- Current Solution
- Willingness to Pay (Low/Med/High)
- Notes

---

## 🔍 WHAT TO MONITOR

### Daily (First Week)

- **Lead count** - Check Google Sheet
- **Traffic** - Vercel Analytics
- **Engagement** - Where are people dropping off?
- **Email responses** - Reply within 24 hours

### Weekly

- **Total signups** - Are we on track for 5?
- **Response rate** - % who reply to follow-up
- **Feedback themes** - Common use cases mentioned
- **Decision point** - Hit 5 signups? Proceed or pivot

---

## ⚠️ COMMON ISSUES

### "Not getting traffic"

**Solutions:**
- Post on more platforms (HN, Reddit, Twitter)
- Cold email potential customers
- Engage in relevant forums
- Write blog post explaining isochrones

### "Traffic but no signups"

**Solutions:**
- Check email form works
- Simplify messaging
- Add social proof
- Make CTA more prominent

### "Signups but no responses"

**Solutions:**
- Email same day they sign up
- Make email personal (not template-y)
- Ask specific question
- Offer incentive (free credits)

---

## 🎉 SUCCESS LOOKS LIKE

**Day 1:**
- ✅ Landing page live at isomap.io
- ✅ Lead capture working
- ✅ First test email in Google Sheet

**Week 1:**
- ✅ 2-3 signups from HN/Reddit
- ✅ 1-2 respond to follow-up
- ✅ Positive feedback on positioning

**Week 2:**
- ✅ 5 total signups (goal reached!)
- ✅ 3+ engaged in conversation
- ✅ 2+ express willingness to pay

**Week 3:**
- ✅ Make GO/NO-GO decision
- ✅ If GO: Start MVP development
- ✅ If NO-GO: Pivot or kill

---

## 📝 FILES REFERENCE

All documentation in `/home/kwaldman/code/isomap-landing/`:

- `README.md` - Project overview
- `GOOGLE_SHEETS_SETUP.md` - Lead capture setup
- `DEPLOYMENT.md` - Vercel deployment
- `LAUNCH_CHECKLIST.md` - This file

Business strategy:
- `../ISOMAP_ULTRATHINK_ANALYSIS.md` - Full business analysis

---

## 🚨 CRITICAL REMINDERS

1. **Don't skip validation** - 5 emails = minimum viable signal
2. **Email signups immediately** - Same day, personal, specific question
3. **Track everything** - Use Google Sheet columns for notes
4. **Make GO/NO-GO decision** - After 2 weeks, decide based on data
5. **Don't build yet** - Validate willingness to pay first

---

## 🎯 YOUR IMMEDIATE TODO

**Right now (30 minutes):**
1. [ ] Set up Google Sheets (5 min)
2. [ ] Add webhook URL to .env.local (1 min)
3. [ ] Test locally (3 min)
4. [ ] Deploy to Vercel (10 min)
5. [ ] Configure domain DNS (10 min)
6. [ ] Test live site (1 min)

**Tomorrow:**
7. [ ] Post on HackerNews
8. [ ] Post on Reddit r/webdev
9. [ ] Share on Twitter/LinkedIn
10. [ ] Email 10 potential customers

**This Week:**
11. [ ] Monitor daily for signups
12. [ ] Email each signup same day
13. [ ] Track responses
14. [ ] Aim for 5 total signups

**Next Week:**
15. [ ] Review data
16. [ ] Make GO/NO-GO decision
17. [ ] If GO: Schedule customer interviews
18. [ ] If NO-GO: Pivot strategy or kill project

---

**You're ready to launch! Deploy and start collecting validation data.**

**Remember: Goal is 5 emails, not perfection. Ship it! 🚀**
