const axios = require('axios');

const baseURL = 'https://api.twitter.com/1.1';

// Get Twiiter bearer token
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

const getTweets = (twitterQuery) => {
  const twitterURL = `${baseURL}/search/tweets.json?q=${twitterQuery}&count=5&lang=en`;
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

module.exports = {
  getTweets,
};
