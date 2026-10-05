# Rate Limiting Configuration

## Architecture Decision
Following Vercel's deprecation of Vercel KV for new projects, this application utilizes **Option A: Vercel WAF (Web Application Firewall) Rate Limiting** for production. 

This approach enforces limits at the CDN edge before requests even reach our Serverless Functions, providing superior DDOS protection and eliminating cold-start redis latency.

## Production Configuration (Vercel Dashboard)
In the Vercel Project Dashboard (`Security -> WAF -> Rate Limiting`), the following rule must be applied:

- **Target Paths:** `/actions/contact`, `/actions/referral` (and any other Server Action endpoints)
- **Algorithm:** Fixed Window
- **Window:** 60 seconds
- **Limit:** 5 requests per IP
- **Action:** Deny (Returns 429 Too Many Requests)
- **Failure Response:** 
  ```json
  { "success": false, "error": "Too many requests. Please try again later." }
  ```

## Local Development Mock
For local development, `src/lib/rate-limit.ts` implements a basic in-memory Map to simulate the failure responses and allow testing of the frontend error state. This in-memory mock is safely ignored in production because the Vercel WAF catches abusers before the code executes.
