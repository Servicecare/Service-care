# Vercel Deployment Guide

## Pre-Deployment Verification
- [x] Application successfully builds (`npm run build`).
- [x] Security headers and CSP configured in `next.config.ts`.
- [x] Server Actions correctly validate data using Zod.
- [x] Edge-compatible proxy handling auth cookies (`proxy.ts`).
- [x] `sitemap.xml` and `robots.txt` dynamically generated.

## Deployment Steps
1. Push the final codebase to GitHub.
2. In Vercel, import the repository.
3. Configure the following Environment Variables in Vercel before the first deployment:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `CLOUDFLARE_TURNSTILE_SECRET_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
4. Deploy the project.
5. Setup **Vercel WAF (Web Application Firewall)** Rate Limiting targeting the `/actions/*` routes (See `rate-limiting.md`).

## Post-Deployment Verification
- Test Turnstile widget rendering on the live domain.
- Test Google OAuth callback against the live domain.
- Run Lighthouse from Vercel's Edge network.
