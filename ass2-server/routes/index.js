// Import librabries
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitter');
const googleTrends = require('../services/google');
const randomText = require('../services/randomText');
const nlp = require('../services/nlp');
// const s3 = require('../services/s3')
var AWS = require("aws-sdk");
const { restart } = require('nodemon');
const bucketName = "yenapark-tweet-store";

router.post('/twitter', async (req, res) => {
  console.log("userinput")
  // Should be from user query
  const userInput = req.body[0];

  let twitterRes;
  try {
    const corpus = await nlp.preprocess();
    const tags = nlp.getTags(userInput, corpus);
    console.log("tags-----------")
    console.log(tags)
    let resultJSON = null; 
    twitterRes = await Promise.all(
      tags.map(async (query) => {
        console.log(query, "QUERY----------")
        const { term } = query;
        const s3Key = `tweet-${term}`;

        // Check S3
        const params = { Bucket: bucketName, Key: s3Key };
        return new AWS.S3({ apiVersion: '2006-03-01' }).getObject(
          params,
          async (err, result) => {
            
            if (result) {
              resultJSON = JSON.parse(result.Body);
              // return res.status(200).json(resultJSON);
            } else {
              console.log("twitter api")
              // Serve from Twitter API and store in S3
              // try {
                resultJSON= await twitterService.getTweets(term);
                const body = JSON.stringify({source: 'S3 bucket', ...tweetData});
                  const objectParams = { Bucket: bucketName, Key: s3Key, Body: body };
                  console.log(body)
                  const uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' })
                    .putObject(objectParams)
                    .promise();
                  uploadPromise.then(function (data) {
                    console.log(
                      'Successfully uploaded data to ' + bucketName + '/' + s3Key
                    );
                  });
                  return resultJSON
              // } catch (error) {
              //   console.log("store to S3 error",error)
              //   return error
              // }
              
            }
          }
        );
        
      })
 
    );
  } catch (error) {
    // return res.status(error)
    console.log(error);
  }

  // res.send(twitterRes);
});

module.exports = router;
