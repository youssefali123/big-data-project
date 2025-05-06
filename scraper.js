const axios = require('axios');
const cheerio = require('cheerio');
const Page = require('./models/Page');

const scrapePage = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $('body').text();
    const cleanText = text.replace(/\s+/g, ' ').trim();

    await Page.create({ url, content: cleanText });
    console.log(`Scraped and saved: ${url}`);
  } catch (err) {
    console.error(`Failed to scrape ${url}`, err.message);
  }
};

module.exports = scrapePage;
