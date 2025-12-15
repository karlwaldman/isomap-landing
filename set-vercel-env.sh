#!/bin/bash

# Script to set Vercel environment variable via dashboard
# Run this to open the Vercel dashboard in your browser

echo "🔧 Setting up Vercel environment variable..."
echo ""
echo "✅ Local .env.local is already configured"
echo ""
echo "📝 TO DO: Add to Vercel dashboard manually (takes 1 minute):"
echo ""
echo "1. Open: https://vercel.com/karl-waldmans-projects/isomap-landing/settings/environment-variables"
echo ""
echo "2. Click 'Add New'"
echo ""
echo "3. Enter:"
echo "   Key: ORS_API_KEY"
echo "   Value: eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImIzZDc2OGFjY2I5OTQyYjA5NDFmNjViODAyNzNmOGVjIiwiaCI6Im11cm11cjY0In0="
echo "   Environments: ✅ Production, ✅ Preview, ✅ Development"
echo ""
echo "4. Click 'Save'"
echo ""
echo "5. Redeploy:"
echo "   vercel --prod"
echo ""
echo "That's it! 🚀"
