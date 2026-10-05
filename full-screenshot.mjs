import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  
  // Set the admin_bypass cookie to access the protected admin dashboard
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: 'admin_bypass',
      value: 'true',
      domain: 'localhost',
      path: '/',
    }
  ]);
  
  const page = await context.newPage();
  
  const routes = [
    { path: '/admin', filename: 'admin_full_visible.png' }
  ];

  for (const route of routes) {
    console.log(`Taking screenshot for ${route.path}...`);
    await page.goto(`http://localhost:3001${route.path}`);
    
    // Wait a moment for animations to trigger
    await page.waitForTimeout(2000);
    
    // Scroll through the page slowly
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let i = 0; i < height; i += 500) {
      await page.evaluate(`window.scrollTo(0, ${i})`);
      await page.waitForTimeout(200);
    }
    // Scroll back to top
    await page.evaluate('window.scrollTo(0, 0)');
    await page.waitForTimeout(500);

    // Take a full page screenshot
    await page.screenshot({ path: route.filename, fullPage: true });
  }
  
  await browser.close();
  console.log('Admin screenshot generated successfully!');
})();
