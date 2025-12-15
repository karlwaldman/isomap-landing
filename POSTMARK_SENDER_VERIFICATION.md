# Postmark Sender Verification Required

## Issue Found ❌

**Error:** `The 'From' address you supplied (hello@isomap.io) is not a Sender Signature on your account.`

**Cause:** You need to verify hello@isomap.io as a sender in Postmark before emails can be sent.

---

## Solution: Verify Sender Email/Domain

You have two options:

### Option 1: Verify Individual Email (Fastest - 5 minutes)

1. **Go to Postmark Dashboard:** https://account.postmarkapp.com
2. **Navigate to:** Your Server → "Sender Signatures"
3. **Click:** "Add Sender Signature"
4. **Enter:** hello@isomap.io
5. **Submit** - Postmark will send a verification email to hello@isomap.io
6. **Check your email** and click the verification link
7. **Done!** - You can now send from hello@isomap.io

**Pros:**
- Very fast (5 minutes)
- No DNS changes needed
- Works immediately after verification

**Cons:**
- Only verifies one email address
- If you want to use other addresses (e.g., support@isomap.io), you'll need to verify each one

---

### Option 2: Verify Entire Domain (Recommended - 30 minutes)

This verifies ALL email addresses @isomap.io (hello@, support@, etc.)

1. **Go to Postmark Dashboard:** https://account.postmarkapp.com
2. **Navigate to:** Your Server → "Sender Signatures"
3. **Click:** "Add Domain"
4. **Enter:** isomap.io
5. **Add DNS Records** - Postmark will show you DNS records to add:

   **DKIM Record (TXT):**
   ```
   Host: [value from Postmark, usually like: 20241215._domainkey]
   Value: [long value from Postmark]
   ```

   **Return-Path Record (CNAME):**
   ```
   Host: pm-bounces
   Value: [value from Postmark]
   ```

6. **Add DNS Records to Your Domain:**
   - Go to your DNS provider (likely Vercel, Cloudflare, or domain registrar)
   - Add the two DNS records shown by Postmark
   - Wait 5-10 minutes for DNS propagation

7. **Verify in Postmark:**
   - Click "Verify" button in Postmark
   - If DNS records are correct, domain will be verified

8. **Done!** - You can now send from ANY @isomap.io email address

**Pros:**
- Works for all @isomap.io addresses
- Better email deliverability
- Professional setup
- One-time setup

**Cons:**
- Requires DNS access
- Takes 30 minutes (mostly waiting for DNS)

---

## Quick Fix for Testing: Use Your Personal Email

If you want to test RIGHT NOW while waiting for verification:

1. **Go to Postmark** → Sender Signatures
2. **Add your personal email** (e.g., karl.waldman@gmail.com)
3. **Verify it** (check your inbox, click link)
4. **Update code temporarily:**

```bash
# Update .env.local for testing
POSTMARK_FROM_EMAIL="karl.waldman@gmail.com"

# Update Vercel env var
echo "karl.waldman@gmail.com" | vercel env add POSTMARK_FROM_EMAIL production --force
```

5. **Test again** - Should work immediately
6. **Switch back to hello@isomap.io** once domain is verified

---

## Recommended Approach

**For immediate testing:**
1. Verify your personal Gmail address (5 minutes)
2. Test that emails are sending
3. Confirm automation is working

**For production:**
1. Verify the entire isomap.io domain (30 minutes)
2. Switch FROM email back to hello@isomap.io
3. Update Vercel environment variable
4. Deploy

---

## DNS Records for isomap.io Domain Verification

**Where to add DNS records:**
- If domain is on Vercel: Vercel Dashboard → Your Domain → DNS
- If domain is elsewhere (Cloudflare, GoDaddy, etc.): Your DNS provider

**Steps:**
1. Login to Postmark
2. Go to Sender Signatures → Add Domain → isomap.io
3. Copy the exact DNS records shown
4. Add them to your DNS provider
5. Wait 5-10 minutes
6. Click "Verify" in Postmark

---

## After Verification

Once verified, test the API again:

```bash
curl -X POST https://isomap.io/api/beta-signup \
  -H "Content-Type: application/json" \
  -d '{"email": "karl.waldman@gmail.com"}'
```

You should receive the welcome email within seconds!

---

## Need Help?

**Postmark Documentation:**
- https://postmarkapp.com/support/article/1046-how-do-i-verify-a-domain

**Can't access DNS?**
- Use Option 1 (verify individual email address)
- Contact whoever manages your DNS

**Emails still not sending?**
- Check Postmark Activity dashboard for errors
- Verify the token is correct
- Check that FROM email exactly matches verified signature
