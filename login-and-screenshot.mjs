import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Navigating to login page...');
  await page.goto('http://localhost:3001/login');
  
  console.log('Filling out credentials...');
  await page.fill('input[type="email"]', 'admin@lifecare.com');
  await page.fill('input[type="password"]', 'admin123');
  
  console.log('Clicking login button...');
  await Promise.all([
    page.waitForURL('http://localhost:3001/admin'),
    page.click('button[type="submit"]')
  ]);
  
  console.log('Arrived at admin dashboard. Taking screenshot...');
  // Wait a moment for any client-side rendering to finish
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: 'admin_dashboard_actual.png', fullPage: true });
  
  await browser.close();
  console.log('Admin dashboard screenshot generated successfully!');
})();
