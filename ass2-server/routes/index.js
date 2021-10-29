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
// const redisClient = redis.createClient();
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
      const s3Key = `tweet-${term}`;
      const redisKey = `tweet:${term}`;
      const params = { Bucket: bucketName, Key: s3Key };

      const serviceObject = new AWS.S3({ apiVersion: '2006-03-01' });

      const S3promisified = util
        .promisify(serviceObject.getObject)
        .bind(serviceObject);

      const redisPromisified = util
        .promisify(redisClient.get)
        .bind(redisClient);

      // Check Redis cache first
      const redisResult = await redisPromisified(redisKey);
      // fetch it from Redis cache
      if (redisResult) {
        const resultJSON = JSON.parse(redisResult);
        return resultJSON;
      } else {
        // Check S3
        try {
          console.log(params, 'param');
          const result = await S3promisified(params);
          const s3Result = JSON.parse(result.Body);

          // Store it in Redis cache
          redisClient.setex(
            redisKey,
            300,
            JSON.stringify([{ source: 'Redis Cache' }, ...s3Result])
          );
          return JSON.parse(result.Body);
        } catch (err) {
          try {
            // fetch from Twitter API
            const resultJSON = await twitterService.getTweets(term);

            // Store it in Redis cache
            redisClient.setex(
              redisKey,
              300,
              JSON.stringify([{ source: 'Redis Cache' }, ...resultJSON])
            );

            // Store it in S3
            const body = JSON.stringify([
              { source: 'S3 bucket' },
              ...resultJSON,
            ]);
            const objectParams = {
              Bucket: bucketName,
              Key: s3Key,
              Body: body,
            };
            const uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' })
              .putObject(objectParams)
              .promise();
            uploadPromise.then(function () {
              console.log(
                'Successfully uploaded data to ' + bucketName + '/' + s3Key
              );
            });

            return [{ source: 'Twitter API' }, ...resultJSON];
          } catch (error) {}
        }
      }
    })
  );
  res.send(result);
});

module.exports = router;
