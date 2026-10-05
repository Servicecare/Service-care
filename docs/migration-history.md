# Migration History

This document records the architectural migration from the original repository stack to the final production architecture.

## Original Project State
- **Frontend:** React 18, Vite, React Router, Tailwind CSS.
- **Backend:** Express.js server (`server.js`, `server/applicationRoutes.js`, `server/emailRoutes.js`).
- **Database:** MongoDB with Prisma.
- **Authentication:** Custom admin login checking email against `process.env.ADMIN_EMAIL` and password using `bcrypt.compare`.
- **Email:** Nodemailer with SMTP.
- **Security:** No bot protection (Turnstile), basic form endpoints, no RLS, no robust session management.
- **Deployment:** Netlify (`netlify.toml`).

## Final Architecture
- **Framework:** Next.js 16 (App Router) with React 19.
- **Frontend:** Tailwind v4, accessible UI components.
- **Database:** Supabase PostgreSQL with strict Row Level Security (RLS).
- **Authentication:** Supabase Auth + Google OAuth for Admin access.
- **Email:** Resend API for transactional notifications.
- **Security:** Cloudflare Turnstile bot protection, Zod validation, Vercel WAF rate limiting.
- **Testing:** Playwright E2E testing.
- **Deployment:** Vercel edge network.

*All legacy dependencies (Express, Prisma, MongoDB, bcrypt, Nodemailer, Vite, React Router) and associated codebase files were completely removed during the rebrand and migration phase.*
