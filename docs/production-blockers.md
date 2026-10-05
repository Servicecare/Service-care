# Production Blockers

| BLOCKER | WHY | REQUIRED INPUT | WHERE TO ADD IT | HOW TO VERIFY | IMPACT |
|---------|-----|----------------|-----------------|---------------|--------|
| Supabase Project | Needed for PostgreSQL database & Auth | 1. Project URL<br>2. Publishable Key<br>3. Service Role Key | `.env` variables | Dashboard loads | Forms/Admin fail |
| Google OAuth | Needed to restrict admin access | 4. Google Client ID<br>5. Google Client Secret | Supabase Auth Settings | `/login` redirects | Admin inaccessible |
| Turnstile Keys | Needed to prevent bot spam | 6. Site Key<br>7. Secret Key | `.env` variables | Forms submit | Spam submissions |
| Resend API | Needed for transactional emails | 8. API Key | `.env` variables | Emails arrive | No notifications |
| Production Domain | Needed for OAuth redirects, Sitemap, and CORS | 9. Final URL | `NEXT_PUBLIC_SITE_URL` | Auth completes | Broken Auth & SEO |
| NDIS Number | Legal/Trust requirement | 10. Provider Number | `src/config/business.ts` | Badge displays | Missing trust sig |
| Service List | Content Accuracy | 11. Final List | `src/config/business.ts` | Menu updates | Incorrect info |
| Legal Approval | Compliance | 12. Approved Copy | `/privacy`, `/terms` etc. | Review label removed| Non-compliant |
