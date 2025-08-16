const scraper = require('./src/utils/scraper');

async function test() {
  try {
    const result = await scraper.scrapeWebsite('https://github.com');
    console.log('Scraping result:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();