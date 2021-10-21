// Import librabries
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter');

router.post('/twitter', async (req, res) => {
  // Should be from user query
  const rules = req.body;
  console.log(req.body);

  let currentRules;
  try {
    // Get all stream rules
    currentRules = await twitterService.getRules();
    // Delete all stream rules
    await twitterService.deleteRules(currentRules);
    // Set rules based on array above
    await twitterService.setRules(rules);
    currentRules = await twitterService.getRules();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  twitterService.streamTweets();

  return (res.status = 200);
});

module.exports = router;
