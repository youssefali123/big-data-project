const express = require('express');
const Page = require('../models/Page');
const router = express.Router();
const { searchWord } = require('../invertedIndex');

router.get('/', async (req, res) => {
  const query = req.query.q;
  let max = 30;
  if (!query) return res.status(400).json({ error: 'No query' });
  if(req.query.max) max = parseInt((req.query.max));
  let title = [];
  let icon = [];
  const results = searchWord(query);
  // const urls = results.map(r => r.url);
  // const pages = await Page.find({ url: { $in: urls } });
  // const finalResults = pages.map(page => {
  //   const count = results.find(r => r.url === page.url)?.count || 0;
  //   return {
  //     url: page.url,
  //     title: page.title,
  //     icon: page.icon,
  //     count: count
  //   };
  // });
  let finalResults = results.slice(0, max);

finalResults = finalResults.map(r => {
  return {
    url: r.url,
    count: r.count
  };
})
for(let i = 0; i < finalResults.length; i++){
  let page = await Page.findOne({ url: finalResults[i].url });
  if(page){
    finalResults[i].title = page.title;
    finalResults[i].icon = page.icon;
  }
}
  res.status(200).json( finalResults );
  // res.status(200).json( finalResults );
});

module.exports = router;
