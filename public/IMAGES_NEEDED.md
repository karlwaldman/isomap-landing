# Images Needed for Launch

## Favicon (favicon.ico)
**Dimensions:** 32x32px (also provide 16x16, 64x64 for multi-resolution)
**Format:** ICO file
**Design:** Simple "I" lettermark in primary blue (#2563eb)
**Tool:** Use https://realfavicongenerator.net/ to generate from SVG

## Open Graph Image (og-image.png)
**Dimensions:** 1200x630px (Facebook/Twitter standard)
**Format:** PNG
**Design Ideas:**
- Background: Gradient from primary blue to teal
- Text: "IsoMap API" in large white font
- Subtext: "Developer-First Isochrone Mapping"
- Visual: Simple isochrone visualization (concentric irregular polygons)

**Tool:** Canva, Figma, or Adobe Express

## How to Add:
1. Generate favicon.ico → place in `/public/favicon.ico`
2. Create og-image.png → place in `/public/og-image.png`
3. Metadata already configured in app/layout.tsx
4. Test social shares on https://www.opengraph.xyz/

## Priority: HIGH
Without these, site looks unprofessional in:
- Browser tabs (broken icon)
- Social media shares (no preview image)
- Bookmarks (no icon)
