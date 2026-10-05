/**
 * Rate Limiter for Server Actions
 * 
 * IMPORTANT FOR PRODUCTION (VERCEL):
 * This implementation uses an in-memory Map for LOCAL DEVELOPMENT ONLY.
 * In production, rate limiting is handled at the Edge via Vercel WAF.
 * (See docs/rate-limiting.md for WAF configuration details).
 * 
 * Local Mock Configuration:
 * - Limit: 5 requests
 * - Window: 60 seconds (60000ms)
 * - Storage Mechanism: In-memory Map
 * - Failure Response: { success: false }
 */

const rateLimits = new Map<string, { count: number; timestamp: number }>();

const WINDOW_MS = 60000;
const MAX_REQUESTS = 5;

export async function rateLimit(action: string, identifier: string): Promise<{ success: boolean }> {
  const key = `${action}:${identifier}`;
  const now = Date.now();
  const record = rateLimits.get(key);

  if (!record) {
    rateLimits.set(key, { count: 1, timestamp: now });
    return { success: true };
  }

  if (now - record.timestamp > WINDOW_MS) {
    rateLimits.set(key, { count: 1, timestamp: now });
    return { success: true };
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false };
  }

  record.count += 1;
  return { success: true };
}
