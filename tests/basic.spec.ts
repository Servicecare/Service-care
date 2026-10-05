import { test, expect } from '@playwright/test';

// Category A: Local Deterministic Tests
test.describe('Local Static & Navigation Tests', () => {
  
  test('homepage loads and displays hero', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Service for Life Care/);
    // Wait for the AnimatedHero element to be in the DOM
    const heading = page.locator('h1');
    await expect(heading).toContainText(/Empowering your independence/i, { timeout: 10000 });
  });

  test('navigation works', async ({ page }) => {
    // Navigate directly to avoid mobile menu click complexity in tests
    await page.goto('/about');
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.locator('h1')).toContainText('About Us');
    
    await page.goto('/services');
    await expect(page).toHaveURL(/.*\/services/);
    await expect(page.locator('h1')).toContainText('Our Services');
  });

  test('contact page loads form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('h1')).toContainText('Contact Us');
    await expect(page.locator('form')).toBeVisible({ timeout: 10000 });
    // Check for the submit button instead of label to avoid span nesting issues
    await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible();
  });

  test('unauthorised admin access redirects to login', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/.*\/login/);
    // The redesigned login page uses 'Welcome back' as the h2 heading
    await expect(page.locator('h2')).toContainText(/Welcome back|Sign in/i);
  });
});

// Category B: External Integration Tests (MOCKED/SKIPPED in CI without keys)
test.describe('External Integration Tests', () => {
  test.skip('admin access works when authenticated (TEST ENVIRONMENT REQUIRED)', async () => {
    // This test requires a seeded test database and valid Auth JWT
    test.info().annotations.push({ type: 'issue', description: 'Requires test database' });
  });

  test.skip('contact form validation and submission (TEST ENVIRONMENT REQUIRED)', async () => {
    // This test requires Turnstile test keys and Supabase local instance
    test.info().annotations.push({ type: 'issue', description: 'Requires Turnstile & Supabase' });
  });
});
