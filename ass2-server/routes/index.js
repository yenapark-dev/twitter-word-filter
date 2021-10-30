// Import librabries
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter');
const googleTrends = require('../services/google');
const randomText = require('../services/randomText');
const nlp = require('../services/nlp');
const redis = require('redis');
const util = require('util');
const { restart } = require('nodemon');

// Initialise AWS S3
const AWS = require('aws-sdk');

// This section will change for Cloud Services
const redisClient = redis.createClient();
// const redisClient = redis.createClient(
//   6379,
//   'yenapark-assignment2-redis.km2jzi.0001.apse2.cache.amazonaws.com',
//   {
//     no_ready_check: true,
//   }
// );

// Print redis errors to the console
redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

const bucketName = 'yenapark-tweet-store';

router.post('/twitter', async (req, res) => {
  // Should be from user query
  const { data: userInput } = req.body || {};
  console.log('received request');
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
  console.log(tags, 'received request');

  const result = await Promise.all(
    tags.map(async (query) => {
      return twitterService.getTweets(query);
    })
  );
  res.send(result);
});

module.exports = router;
