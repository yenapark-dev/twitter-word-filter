// Import librabries
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter');
const googleTrends = require('../services/google');
const randomText = require('../services/randomText');
const nlp = require('../services/nlp');
// const s3 = require('../services/s3')
const { restart } = require('nodemon');

const util = require('util');

var AWS = require('aws-sdk');
const bucketName = 'yenapark-tweet-store';

router.post('/twitter', async (req, res) => {
  // Should be from user query
  const userInput = req.body[0];
  let twitterRes = [];
  let resultJSON = null;
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

      // Check S3
      const params = { Bucket: bucketName, Key: s3Key };

      const serviceObject = new AWS.S3();

      const promisified = util
        .promisify(serviceObject.getObject)
        .bind(serviceObject);

      try {
        const result = await promisified(params);
        return JSON.parse(result.Body);
      } catch (err) {
        // fetch from Twitter API and store in S3
        const resultJSON = await twitterService.getTweets(term);
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
        return resultJSON;
      }
    })
  );
  res.send(result);
});

module.exports = router;
