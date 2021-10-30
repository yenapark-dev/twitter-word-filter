const axios = require('axios');
const redis = require('redis');
const util = require('util');
// Initialise AWS S3
const AWS = require('aws-sdk');
const baseURL = 'https://api.twitter.com/1.1';

// Get Twiiter bearer token
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

// S3 bucket
const bucketName = 'yenapark-tweet-store';

// This section will change for Cloud Services
const redisClient = redis.createClient();

const fetchTweet = async (twitterQuery) => {
  const twitterURL = `${baseURL}/search/tweets.json?q=${twitterQuery}&count=100&lang=en&result_type=popular`;
  return new Promise((resolve, reject) => {
    axios
      .get(twitterURL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then(function (rsp) {
        tweetData = rsp.data.statuses;
        const finalData = tweetData.map((tweet) => {
          const {
            text,
            retweet_count: retweet,
            favorite_count: favorite,
          } = tweet || {};
          const values = {
            keyword: twitterQuery,
            text,
            retweet,
            favorite,
          };
          return values;
        });
        resolve(finalData);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const getTweets = async (twitterQuery) => {
  const s3Key = `tweet-${twitterQuery}`;
  const redisKey = `tweet:${twitterQuery}`;
  const params = { Bucket: bucketName, Key: s3Key };

  const serviceObject = new AWS.S3({ apiVersion: '2006-03-01' });

  const S3promisified = util
    .promisify(serviceObject.getObject)
    .bind(serviceObject);

  const redisPromisified = util.promisify(redisClient.get).bind(redisClient);

  // Check Redis cache first
  const redisResult = await redisPromisified(redisKey);
  // fetch it from Redis cache
  if (redisResult) {
    const resultJSON = JSON.parse(redisResult);
    return resultJSON;
  } else {
    // Check S3
    try {
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
        const resultJSON = await fetchTweet(twitterQuery);

        // Store it in Redis cache
        redisClient.setex(
          redisKey,
          300,
          JSON.stringify([{ source: 'Redis Cache' }, ...resultJSON])
        );

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

        return [{ source: 'Twitter API' }, ...resultJSON];
      } catch (error) {}
    }
  }
};

module.exports = {
  getTweets,
};
