'use strict';

import puppeteer from 'puppeteer';
import fs from 'fs';

async function main() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const [page] = await browser.pages();

    await page.goto('https://en.wikipedia.org/wiki/MHTML');

    const cdp = await page.target().createCDPSession();
    const { data } = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });
    fs.writeFileSync('page.mhtml', data);

    await browser.close();
  } catch (err) {
    console.error(err);
  }
}
main()