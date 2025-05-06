const axios = require('axios');
const cheerio = require('cheerio');
const Page = require('./models/Page');
const { URL } = require('url');

const visited = new Set();

const isValidUrl = (url) => {
  return url.startsWith('http');
};

const crawl = async (startUrl, maxPages = 2000) => {
  const queue = [startUrl];

  while (queue.length > 0 && visited.size < maxPages) {
    const currentUrl = queue.shift();

    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);

    console.log(`⛏️ Crawling: ${currentUrl}`);

    try {
      const { data } = await axios.get(currentUrl, { timeout: 9000 });
      const $ = cheerio.load(data);
      $('script, style').remove();
      const text = $('body').text().replace(/\s+/g, ' ').trim();
      let title = $('title').text().replace(/\s+/g, ' ').trim();
      let icon = $('link[rel="icon"]').attr('href');
      if (icon) {
        try {
          icon = new URL(icon, currentUrl).toString();
        } catch (e) {
          icon = '';
        }
      }

      if (title.length === 0) {
        title = 'No Title';
      }
      // خزن الصفحة
      const exists = await Page.findOne({ url: currentUrl });
      if (exists) {
        exists.content = text;
        await exists.save();
        continue;
      }
      await Page.create({ url: currentUrl, content: text, title: title, icon: icon });

      // استخرج كل الروابط
      $('a').each((_, el) => {
        let href = $(el).attr('href');

        if (!href) return;

        // لو الرابط نسبي، حوله لرابط مطلق
        try {
          href = new URL(href, currentUrl).toString();
        } catch (e) {
          return;
        }

        if (isValidUrl(href) && !visited.has(href)) {
          queue.push(href);
        }
      });

    } catch (err) {
      console.warn(`❌ Failed to crawl ${currentUrl}: ${err.message}`);
    }
  }

  console.log('✅ Crawling complete.');
};

module.exports = crawl;
