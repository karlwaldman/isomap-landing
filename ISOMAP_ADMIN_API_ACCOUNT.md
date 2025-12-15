# IsoMap Admin API Account for OilPriceAPI Integration

**Created:** December 15, 2025
**Purpose:** Enable enhanced tier offering combining OilPriceAPI + IsoMap isochrone mapping

---

## 🔑 Admin API Credentials

Since IsoMap uses OpenRouteService API in demo mode, here are the credentials to use for OilPriceAPI integration:

### For Development/Testing:
```
Email: admin@isomap.io
API Key: (use your existing ORS_API_KEY)
```

### For Production Integration:

Once IsoMap has paying customers and builds the production API, you'll use:

```
Service: IsoMap Isochrone API
Endpoint: https://api.isomap.io/v1/isochrone
Admin API Key: [To be generated when production API is built]
Rate Limit: Unlimited (admin tier)
```

---

## 💰 Enhanced Tier Strategy

### Bundle Offering:

**"Energy + Location Intelligence Bundle"**

| Component | Standalone Price | Notes |
|-----------|------------------|-------|
| OilPriceAPI (Unlimited) | $199/month | Your existing Pro tier |
| IsoMap Isochrones (100K/month) | $199/month | Isochrone API tier |
| **Bundle Price** | **$299/month** | **25% savings** |

### Value Proposition:

**For energy logistics companies:**
- Oil price data for procurement decisions
- Isochrone mapping for delivery route optimization
- Combined: Optimize both "what to buy" and "how to deliver"

**For energy trading firms:**
- Price data for trading decisions
- Service area mapping for market analysis
- Combined: Geographic + financial intelligence

**For field service operations:**
- Fuel cost tracking via oil prices
- Service area optimization via isochrones
- Combined: Total cost optimization

---

## 🔗 Integration Approach

### Option 1: API Key Pass-Through (Simple)

When OilPriceAPI customer wants isochrones:
1. Generate IsoMap API key for them
2. Bill them through OilPriceAPI account
3. Pass usage data between systems
4. One invoice, two services

### Option 2: Unified API (Advanced - Future)

Build a unified endpoint:
```bash
curl https://api.oilpriceapi.com/v1/intelligence \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "oil_prices": ["WTI_USD", "BRENT_USD"],
    "isochrone": {
      "lat": 40.7128,
      "lng": -74.0060,
      "time": 30,
      "mode": "driving"
    }
  }'
```

Returns both price data and isochrone in one call.

---

## 📊 Business Model

### Revenue Sharing (if IsoMap becomes separate service):

**Option A: Referral Model**
- You refer OilPriceAPI customers to IsoMap
- Receive 20% recurring commission
- They manage their own IsoMap account

**Option B: Reseller Model**
- You bundle and resell IsoMap under OilPriceAPI brand
- Buy at wholesale (\$150/month), sell at \$199/month
- 33% margin on isochrone revenue

**Option C: Acquisition Model**
- IsoMap becomes part of OilPriceAPI
- Single unified service
- No revenue sharing needed

---

## 🎯 Target Customers for Bundle

### High-Value Targets:

**1. Energy Logistics Companies**
- Use case: Fuel delivery route optimization
- Need: Oil prices + delivery area mapping
- Value: 20-30% delivery cost reduction
- Examples: Fuel distributors, propane delivery

**2. Energy Trading Firms**
- Use case: Geographic market analysis
- Need: Price data + service area mapping
- Value: Better market entry decisions
- Examples: Commodity traders with regional focus

**3. Field Service with Fleet**
- Use case: Service area + fuel cost tracking
- Need: Both APIs
- Value: Total operating cost optimization
- Examples: HVAC, plumbing, electrical services

**4. Real Estate (Energy-Dependent)**
- Use case: Property valuation in energy markets
- Need: Local energy costs + commute analysis
- Value: Better investment decisions
- Examples: Industrial real estate, logistics facilities

---

## 🚀 Go-To-Market Strategy

### Phase 1: Soft Launch (Week 1-2)
1. Email existing OilPriceAPI Pro customers
2. Offer bundle at early adopter price (\$249/month)
3. Get 2-3 pilot customers
4. Gather feedback on integration needs

### Phase 2: Official Launch (Week 3-4)
1. Create bundle tier in Stripe
2. Add to OilPriceAPI pricing page
3. Announce via email + social media
4. Target logistics segment specifically

### Phase 3: Scale (Month 2+)
1. Create case studies from pilot customers
2. Content marketing (blog posts on use cases)
3. Sales outreach to energy logistics companies
4. Partner with industry associations

---

## 📝 Implementation Checklist

### Immediate (This Week):
- [ ] Create "Energy + Location Bundle" Stripe product
- [ ] Update OilPriceAPI pricing page with bundle option
- [ ] Write email to Pro tier customers about bundle
- [ ] Set up IsoMap API key for testing

### Short-term (Next 2 Weeks):
- [ ] Build simple pass-through integration
- [ ] Create internal docs on how to provision both APIs
- [ ] Design unified billing/invoicing
- [ ] Get 1-2 pilot customers

### Long-term (Month 2-3):
- [ ] Decide on revenue model (referral vs reseller vs acquisition)
- [ ] Build unified API endpoint (if going that route)
- [ ] Create bundle-specific documentation
- [ ] Develop case studies

---

## 🔐 Security Considerations

### API Key Management:
- Store IsoMap API keys encrypted in OilPriceAPI database
- Use separate keys per customer for tracking
- Rotate keys on customer churn
- Log all isochrone API calls for billing

### Rate Limiting:
- Enforce combined limits across both APIs
- Track usage separately for billing
- Alert customers approaching limits
- Graceful degradation if one API is down

---

## 💡 Marketing Messaging

### Email Subject:
"New: Energy + Location Intelligence Bundle - Save 25%"

### Email Body:
```
Hi [Name],

We're launching something new that I think you'll find valuable.

Many of our OilPriceAPI customers told us they also need location
intelligence - specifically isochrone mapping for delivery route
optimization and service area analysis.

So we partnered with IsoMap to offer a bundle:

• OilPriceAPI (Unlimited) - $199/month value
• IsoMap Isochrones (100K/month) - $199/month value
• Bundle Price: $299/month (save $99/month)

Perfect for:
- Fuel delivery route optimization
- Service area mapping for energy services
- Geographic market analysis for trading

Interested? Reply to this email and I'll set you up.

Best,
Karl
```

---

## 📊 Success Metrics

### Month 1 Goals:
- 2-3 bundle customers
- \$600-900 MRR from bundles
- Validate integration works smoothly

### Month 3 Goals:
- 10 bundle customers
- \$3,000 MRR from bundles
- Case study published
- <5% churn rate

### Month 6 Goals:
- 25 bundle customers
- \$7,500 MRR from bundles
- 20% of Pro customers upgraded to bundle
- Clear ROI data

---

## 🎯 Next Steps

**For OilPriceAPI Integration:**

1. **Add Bundle to Stripe** (30 minutes)
   ```ruby
   # In Rails console:
   Stripe::Price.create({
     product: 'prod_oil_isomap_bundle',
     unit_amount: 29900,
     currency: 'usd',
     recurring: {interval: 'month'},
     nickname: 'Energy + Location Bundle'
   })
   ```

2. **Update Pricing Page** (1 hour)
   - Add bundle tier
   - Highlight 25% savings
   - List combined features

3. **Email Pro Customers** (30 minutes)
   - Use template above
   - Personalize for top 10 customers
   - Include limited-time discount

4. **Set Up Test Account** (15 minutes)
   - Create test user with bundle
   - Verify both APIs work
   - Test billing flow

**Total time: ~3 hours to launch bundle offering**

---

## 📞 Support

For technical integration questions:
- Email: karl.waldman@gmail.com
- IsoMap Demo: https://isomap.io
- OilPriceAPI Docs: https://docs.oilpriceapi.com

---

**Ready to launch the bundle? Let me know and I can help with the Stripe setup and email campaign.** 🚀
