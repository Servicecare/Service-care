# Google OAuth Configuration

To enable the secure Admin portal, follow these exact steps to configure Google Sign-In via Supabase.

## 1. Google Cloud Console
1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or use an existing one).
3. Go to **APIs & Services -> Credentials**.
4. Click **Create Credentials** -> **OAuth client ID**.
5. Application type: **Web application**.
6. **Authorized JavaScript origins**:
   - `https://your-production-domain.com.au`
   - `http://localhost:3000` (for local development)
7. **Authorized redirect URIs**:
   - Get the OAuth Callback URL from your Supabase Dashboard (`Authentication -> URL Configuration -> Callback URL`).
   - It usually looks like: `https://[PROJECT-ID].supabase.co/auth/v1/callback`
8. Save and note the **Client ID** and **Client Secret**.

## 2. Supabase Dashboard
1. Go to **Authentication -> Providers**.
2. Enable the **Google** provider.
3. Paste the **Client ID** and **Client Secret**.
4. Ensure the **Callback URL** matches exactly what you entered in Google Cloud.

## 3. Allowed Domains (Vercel)
Ensure that your Vercel production domain is added to Supabase under **Authentication -> URL Configuration -> Site URL**.

## Status
- Structural Code: **PASS** (`/login` page and `/auth/callback` route are fully implemented using `@supabase/ssr`).
- End-to-End Test: **PARTIAL / CREDENTIALS REQUIRED** (Waiting for final keys to test).
