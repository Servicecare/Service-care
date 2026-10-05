-- 1. Remove the dangerous public insert policies that could allow bots to spam the DB directly
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit referrals" ON public.referrals;

-- 2. (Optional but recommended) Re-create them securely if you ever need them, 
-- but since we are using Service Role Key on the Next.js backend to bypass RLS entirely 
-- after verifying Cloudflare Turnstile, no INSERT policies are needed for public/anon at all!
-- The database is now fully locked down.
