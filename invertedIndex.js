const Page = require('./models/Page');

let invertedIndex = {};

const buildIndex = async () => {
  invertedIndex = {}; // Reset the index

  const pages = await Page.find();

  pages.forEach(page => {
    const words = page.content.toLowerCase().split(/\W+/);
    const freq = {};

    words.forEach(word => {
      if (!word) return;

      freq[word] = (freq[word] || 0) + 1;
    });

    Object.entries(freq).forEach(([word, count]) => {
      if (!(invertedIndex[word])) {
        invertedIndex[word] = {};
      }
      invertedIndex[word][page.url] = count; // عدد مرات تكرار الكلمة في الصفحة
    });
  });
};

const searchWord = (word) => {
  const lowercaseWord = word.toLowerCase();
  const results = invertedIndex[lowercaseWord];

  if (!results) return [];

  // ترتيب الروابط حسب عدد التكرار (تنازليًا)
  return Object.entries(results)
    .sort((a, b) => b[1] - a[1]) // sort by count
    .map(([url, count]) => ({ url, count }));
};

module.exports = { buildIndex, searchWord };
