import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  
  // Wait a moment for animations to trigger
  await page.waitForTimeout(2000);
  
  // Take screenshot of hero
  await page.screenshot({ path: 'hero_check.png' });
  
  // Scroll down to Services section
  await page.evaluate(() => {
    window.scrollBy(0, 800);
  });
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'services_check.png' });
  
  await browser.close();
})();
