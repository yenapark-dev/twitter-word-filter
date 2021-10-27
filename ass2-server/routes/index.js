// Import librabries
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter');
const googleTrends = require('../services/google');
const randomText = require('../services/ramdomText');
const nlp = require('../services/nlp');

router.post('/twitter', async (req, res) => {
  // Should be from user query
  const userInput = req.body[0];
  console.log(userInput);
  let twitterRes;
  try {
    const corpus = await nlp.preprocess();
    const tags = nlp.getTags(userInput, corpus);
    console.log(tags);
    twitterRes = await Promise.all(
      tags.map(async (query) => {
        const { term } = query;
        const res = await twitterService.getTweets(term);
        return res;
      })
    );
  } catch (error) {
    console.log(error);
  }

  res.send(twitterRes);
});

module.exports = router;
