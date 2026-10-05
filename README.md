# Service for Life Care

A premium Australian disability and aged care provider web application, built with modern React architecture.

## Overview
This repository contains the production application for **Service for Life Care** (ABN: 78125096974). 
It serves as the digital front door for the business, offering information on core services (In-Home Support, Community Access, Capacity Building), and provides secure, spam-protected form endpoints for inquiries and referrals.

## Technology Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI/Styling:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/) PostgreSQL + @supabase/ssr
- **Security:** Cloudflare Turnstile (Bot protection), Vercel WAF (Rate Limiting)
- **Forms:** React Hook Form + Zod validation
- **Emails:** [Resend API](https://resend.com/)

## Environment Variables
Create a `.env` file based on `.env.example`. 

**Public Variables (Safe for Client):**
- `NEXT_PUBLIC_SITE_URL`: Application base URL
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Supabase Anon Key
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Turnstile Client Key

**Server Secrets (NEVER EXPOSE):**
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase admin bypass (for webhooks/migrations)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: Supabase Auth Provider settings
- `CLOUDFLARE_TURNSTILE_SECRET_KEY`: Turnstile Server verification
- `RESEND_API_KEY`: Email delivery

## Setup & Deployment
1. **Install Dependencies:** `npm install`
2. **Local Development:** `npm run dev`
3. **Database Migration:** 
   Connect to your Supabase project via the CLI:
   `supabase link --project-ref <your-project-id>`
   `supabase db push`
4. **Build for Production:** `npm run build`
5. **Deployment:** The application is optimized for Vercel Edge deployment. 

## Testing
- E2E Tests: `npx playwright test`
- Accessibility: Validated for WCAG 2.2 AA compliance using `axe-core`.

## Documentation
Additional architectural and deployment guides are available in the `/docs` directory.
