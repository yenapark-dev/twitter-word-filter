// Import librabries
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter');

router.post('/twitter', async (req, res) => {
  // Should be from user query
  const keys = req.body;
  console.log(keys);
  let twitterRes;
  try {
    twitterRes = await Promise.all(
      keys.map(async (query) => {
        const res = await twitterService.getTweets(query);
        return res;
      })
    );
  } catch (error) {}
  res.send(twitterRes);
});

module.exports = router;
