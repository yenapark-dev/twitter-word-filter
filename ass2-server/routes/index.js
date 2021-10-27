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

// This section will change for Cloud Services
const redisClient = redis.createClient();
// const redisClient = redis.createClient(6379, 'elastichache endpoint string', {
//   no_ready_check: true,
// });

// Print redis errors to the console
redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

// Initialise AWS S3
var AWS = require('aws-sdk');
const bucketName = 'yenapark-tweet-store';

router.post('/twitter', async (req, res) => {
  // Should be from user query
  const userInput = req.body[0];
  let tags;

  try {
    // Get corpus - large array of random strings
    const corpus = await nlp.preprocess();
    // Get tags
    tags = nlp.getTags(userInput, corpus);
  } catch (error) {
    // return res.status(error)
    console.log(error);
    return res.status(400).send('Error fetching corpous and tags');
  }

  const result = await Promise.all(
    tags.map(async (query) => {
      const { term } = query;
      const s3Key = `tweet-${term}`;
      const redisKey = `tweet:${term}`;
      const params = { Bucket: bucketName, Key: s3Key };

      const serviceObject = new AWS.S3();

      const S3promisified = util
        .promisify(serviceObject.getObject)
        .bind(serviceObject);

      const redisPromisified = util
        .promisify(redisClient.get)
        .bind(redisClient);

      // Check Redis cache first
      const redisResult = await redisPromisified(redisKey);

      if (redisResult) {
        // fetch it from Redis cache
        const resultJSON = await twitterService.getTweets(term);

        return JSON.parse(redisResult);
      } else {
        try {
          // Check S3
          const result = await S3promisified(params);

          // Store it in Redis cache
          redisClient.setex(
            redisKey,
            60,
            JSON.stringify([{ source: 'Redis Cache' }, ...resultJSON])
          );

          return JSON.parse(result.Body);
        } catch (error) {
          // fetch from Twitter API
          const resultJSON = await twitterService.getTweets(term);

          // Store it in S3
          const body = JSON.stringify([{ source: 'S3 bucket' }, ...resultJSON]);
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

          // Store it in Redis cache
          redisClient.setex(
            redisKey,
            60,
            JSON.stringify([{ source: 'Redis Cache' }, ...resultJSON])
          );
          return [{ source: 'Twitter API' }, ...resultJSON];
        }
      }
    })
  );
  res.send(result);
});

module.exports = router;
