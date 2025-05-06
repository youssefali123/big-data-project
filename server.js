const express = require('express');
const connectDB = require('./db');
const scrapePage = require('./scraper');
const crawl = require('./crawler');
const { buildIndex } = require('./invertedIndex');
const searchRoute = require('./routes/search');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.static('public'));

connectDB().then(async () => {
  // Scrape some pages (can be static for now)
  // await crawl('https://yalla--shoot.today/');
  // await crawl('https://wikipedia.org');
  // await crawl('https://www.filgoal.com/');
  // await crawl('https://wecima.film/');
  // await crawl('https://www.mozilla.org/');
  // await crawl('https://www.w3schools.com/');
  // await crawl('https://www.google.com/');
  // await crawl('https://www.facebook.com/');
  // await crawl('https://www.instagram.com/');
  // await crawl('https://twitter.com/');
  // await crawl('https://www.linkedin.com/');
  // await crawl('https://www.youtube.com/');
  // await crawl('https://www.tiktok.com/');
  // await crawl('https://www.snapchat.com/');
  // await crawl('https://www.reddit.com/');
  // await crawl('https://www.pinterest.com/');
  // await crawl('https://www.quora.com/');
  // await crawl("https://www.youm7.com/");
  // await crawl("https://www.aljazeera.net/");
  // await crawl("https://www.almotaher.com/");
  // await crawl("https://www.imdb.com/")
  // await crawl("https://www.bbc.com/");
  // await crawl("https://www.cnn.com/");
  // await crawl("https://www.nbcnews.com/");
  // await crawl("https://www.msn.com/");
  // await crawl("https://www.foxnews.com/");
  // await crawl("https://www.cbsnews.com/");

  // Build the index
  await buildIndex();
});

app.use('/search', searchRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
