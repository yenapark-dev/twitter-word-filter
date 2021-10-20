// Import librabries
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter');

router.get('/stream', async (req, res) => {
  // Should be from user query
  const rules = [{ value: 'giveaway' }, { value: 'coding' }];

  let currentRules;

  try {
    // Get all stream rules
    currentRules = await getRules();
    // Delete all stream rules
    await deleteRules(currentRules);
    // Set rules based on array above
    await setRules(rules);
    currentRules = await getRules();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  streamTweets();

  res.render('streaming');
});

module.exports = router;
