import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto(`file://${__dirname}/pitch-99sec.html`, { waitUntil: 'networkidle0' });
  
  // Hide counter
  await page.evaluate(() => {
    document.querySelector('.slide-counter')?.remove();
  });

  const totalSlides = 6;
  for (let i = 1; i <= totalSlides; i++) {
    await page.screenshot({ path: `${__dirname}/slides-99sec/slide-${String(i).padStart(2, '0')}.png` });
    console.log(`Captured slide ${i}`);
    if (i < totalSlides) {
      await page.keyboard.press('ArrowRight');
      await new Promise(r => setTimeout(r, 400));
    }
  }
  
  await browser.close();
  console.log('Done!');
})();
