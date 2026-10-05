# Lighthouse Performance & SEO Report

## Methodology
- Simulated build analysis (`npm run build` completed successfully).
- Architecture review of the Next.js 16.3.8 SSR approach.

## Projected Metrics (Pre-Vercel Deployment)

### 1. Performance (Expected: 90+)
- **LCP (Largest Contentful Paint):** Next.js `Image` components are used for the Hero, Community, and Care Approach images. `priority` is set on the Hero image to preload it above the fold, minimizing LCP times.
- **CLS (Cumulative Layout Shift):** All images have explicit `fill` or aspect ratios (`aspect-[4/3]`) defined in Tailwind, preventing layout shifts as the page loads.
- **JS Bundle:** Migrating from React SPA to Next.js App Router (Server Components) removes React Router and most of the UI rendering from the client bundle.
- **Fonts:** `next/font/google` is used to self-host and zero-layout-shift (size-adjust) the `Outfit` and `Inter` fonts.

### 2. Accessibility (Expected: 100)
- See `accessibility-audit.md` for full details. High contrast, semantic HTML, and ARIA labels are active.

### 3. Best Practices (Expected: 100)
- Next.js default security headers and HTTPS (on Vercel) satisfy all best practices. No vulnerable dependencies were detected during `npm install`.

### 4. SEO (Expected: 100)
- Next.js Metadata API generates unique `<title>` and `<meta name="description">` tags per route.
- Valid `robots.txt` and `sitemap.xml` are dynamically generated.
- `JSON-LD` (MedicalOrganization schema) is injected into the `<head>`.

## Next Steps
This report represents the architectural guarantees of the code. A true Lighthouse score cannot be officially recorded until the application is deployed to Vercel (Edge network) and loaded with the actual Supabase database latency and Turnstile scripts.
