# Supabase Setup Guide

This document outlines the exact final setup instructions to provision the production Supabase environment.

## 1. Project Creation
- Create a new project in the Supabase Dashboard.
- Note the **Project URL** and **API Keys** located in `Project Settings -> API`.

## 2. Required Environment Variables
You must place the following keys into your Vercel production environment variables.

### Public Client Variables (Safe for Browser)
- `NEXT_PUBLIC_SUPABASE_URL`: The full URL to your Supabase project (e.g. `https://your-project.supabase.co`).
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: The official "anon / public" key provided by Supabase. This allows the Next.js client and server to communicate securely with Supabase endpoints. The RLS policies prevent unauthorized data access regardless of this key being public.

### Server-Only Secret Variables (NEVER EXPOSE)
- `SUPABASE_SERVICE_ROLE_KEY`: The "service_role" secret key provided by Supabase. **Never prefix this with `NEXT_PUBLIC_`**. It bypasses RLS policies and is required exclusively for server-side operations if needed. Our architecture primarily uses the authenticated user's token, but this key is reserved for background tasks or administrative overrides on the server.

## 3. Google OAuth Setup (Auth Provider)
1. Go to `Authentication -> Providers` in Supabase.
2. Enable **Google**.
3. Input your `Google Client ID` and `Google Client Secret`.
4. Add the exact production callback URL `https://your-production-domain.com.au/auth/callback` to the redirect allowlist in both Google Cloud Console and Supabase `Authentication -> URL Configuration`.

## Next Steps
Once these keys are stored in your `.env` (local) or Vercel Environment Variables, proceed to apply the Database Migrations (see `database-migration-guide.md`).
