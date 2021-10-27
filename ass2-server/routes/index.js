// Import librabries
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter');
const { googleTrends } = require('../services/google');
const nlp = require('../services/nlp');

router.post('/twitter', async (req, res) => {
  // Should be from user query
  const userInput = req.body[0];

  let twitterRes;
  try {
    const corpus = await nlp.preprocess();
    const tags = nlp.getTags(userInput, corpus);
    twitterRes = await Promise.all(
      tags.map(async (query) => {
        const { term } = query;
        const res = await twitterService.getTweets(term);
        const trends = await googleTrends(term);
        console.log(trends);
        return res;
      })
    );
  } catch (error) {
    console.log(error);
  }

  res.send(twitterRes);
});

module.exports = router;
