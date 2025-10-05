const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './chrome-profile' // persist login
  });
  const page = await browser.newPage();
  
  // Go to login first
  await page.goto('https://substack.com/sign-in');
  
  // Wait for manual login (or automate it)
  console.log('Log in manually, then press Enter...');
  await new Promise(r => process.stdin.once('data', r));
  
  // Now go to library
  await page.goto('https://substack.com/library', {waitUntil: 'networkidle0'});
  
  // Wait for subscriptions to load
  await page.waitForSelector('a[href*=".substack.com"]', {timeout: 10000});
  
  const html = await page.content();
  require('fs').writeFileSync('library.html', html);
  
  console.log('Saved to library.html');
  await browser.close();
})();
