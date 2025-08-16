const cheerio = require('cheerio');
const axios = require('axios');

class WebScraper {
  async scrapeWebsite(url) {
    try {
      console.log(`Scraping: ${url}`);
      
      const response = await axios.get(url, {
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      return {
        brandName: this.extractBrandName($, url),
        description: this.extractDescription($),
        title: $('title').text().trim()
      };
    } catch (error) {
      throw new Error(`Scraping failed: ${error.message}`);
    }
  }

  extractBrandName($, url) {
    // Try multiple methods
    const methods = [
      () => $('meta[property="og:site_name"]').attr('content'),
      () => $('title').text().split('-')[0].trim(),
      () => $('h1').first().text().trim(),
      () => new URL(url).hostname.replace('www.', '')
    ];

    for (const method of methods) {
      try {
        const result = method();
        if (result && result.length > 0 && result.length < 100) {
          return result;
        }
      } catch (e) {
        continue;
      }
    }
    return 'Unknown';
  }

  extractDescription($) {
    const methods = [
      () => $('meta[name="description"]').attr('content'),
      () => $('meta[property="og:description"]').attr('content'),
      () => $('p').first().text().trim()
    ];

    for (const method of methods) {
      try {
        const result = method();
        if (result && result.length > 10) {
          return result;
        }
      } catch (e) {
        continue;
      }
    }
    return 'No description available';
  }
}

module.exports = new WebScraper();