import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 800 });

  for (let i = 1; i <= 3; i++) {
    await page.goto(`file://${__dirname}/logo${i}.html`, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: `${__dirname}/logo${i}.png`, omitBackground: false });
    console.log(`Captured logo${i}.png`);
  }
  
  await browser.close();
  console.log('Done!');
})();
