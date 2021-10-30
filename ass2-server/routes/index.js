// Import librabries
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter');
const nlp = require('../services/nlp');
const redis = require('redis');

// Initialise AWS S3
const AWS = require('aws-sdk');
const bucketName = 'yenapark-tweet-store';

// This section will change for Cloud Services
const redisClient = redis.createClient(
  6379,
  'yenapark-assignment2-redis.km2jzi.0001.apse2.cache.amazonaws.com',
  {
    no_ready_check: true,
  }
);

// Print redis errors to the console
redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

router.post('/twitter', async (req, res) => {
  // Should be from user query
  const { data: userInput } = req.body || {};
  let tags;

  try {
    // Get corpus - large array of random strings
    const corpus = await nlp.preprocess();

    // Get tags
    tags = nlp.getTags(userInput, corpus);
  } catch (error) {
    return res.status(400).send('Error fetching corpous and tags');
  }

  const result = await Promise.all(
    tags.map(async (query) => {
      const { term } = query;
      return twitterService.getTweets(term);
    })
  );
  res.send(result);
});

router.post('/twitter-hashtag', async (req, res) => {
  // Should be from user query
  const tags = req.body;

  const result = await Promise.all(
    tags.map(async (query) => {
      return twitterService.getTweets(query);
    })
  );
  res.send(result);
});

module.exports = router;
