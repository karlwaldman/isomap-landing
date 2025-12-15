# DNS Configuration for isomap.io

## ✅ Vercel Setup Complete

- Project deployed: https://isomap-landing-iugr4ous1-karl-waldmans-projects.vercel.app
- Status: ✅ Production deployment successful
- Domains added: isomap.io, www.isomap.io

## 🔧 DNS Configuration Required

**IMPORTANT**: Your domain is using **Cloudflare nameservers**, not Porkbun DNS.

### Cloudflare Configuration

1. **Go to Cloudflare DNS Settings:**
   - Login to Cloudflare: https://dash.cloudflare.com
   - Select domain: `isomap.io`
   - Go to: **DNS > Records**

2. **Add A Record for apex domain:**
   ```
   Type: A
   Name: @
   IPv4 address: 76.76.21.21
   Proxy status: DNS only (gray cloud, not proxied)
   TTL: Auto
   ```

3. **Add A Record for www:**
   ```
   Type: A
   Name: www
   IPv4 address: 76.76.21.21
   Proxy status: DNS only (gray cloud, not proxied)
   TTL: Auto
   ```

### Alternative: Use CNAME for www (recommended)

Instead of A record for www, you can use CNAME:
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (gray cloud, not proxied)
TTL: Auto
```

## ⚠️ Important Notes

1. **Disable Cloudflare Proxy**: Make sure the cloud icon is **gray** (DNS only), not orange (proxied). Vercel needs direct access to configure SSL.

2. **Propagation Time**: DNS changes take 5-30 minutes to propagate globally.

3. **Verification**: Vercel will automatically verify DNS and issue SSL certificates once records are detected.

## 🧪 Testing

After adding DNS records, wait 10-15 minutes and test:

```bash
# Check DNS propagation
dig isomap.io
dig www.isomap.io

# Should show: 76.76.21.21

# Test in browser
curl https://isomap.io
curl https://www.isomap.io
```

## 📧 Email Notification

Vercel will send you an email when:
- DNS is verified
- SSL certificates are issued
- Domain is ready

## Current Status

- [x] Vercel project deployed
- [x] Domains added to Vercel
- [ ] DNS A record for @
- [ ] DNS A/CNAME record for www
- [ ] DNS verification complete
- [ ] SSL certificates issued

## Next Steps

1. Configure DNS in Cloudflare (5 minutes)
2. Wait for DNS propagation (10-30 minutes)
3. Verify site loads at https://isomap.io
4. Set up Google Sheets webhook
5. Add GOOGLE_SHEETS_WEBHOOK_URL environment variable
6. Test email capture form
7. Launch!

---

**Deployment URL (temporary):** https://isomap-landing-iugr4ous1-karl-waldmans-projects.vercel.app
**Production URL (once DNS configured):** https://isomap.io
