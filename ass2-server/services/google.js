const googleTrends = require('google-trends-api');

const googleTend = (query) => {
  googleTrends
    .relatedTopics({ keyword: 'apple' })
    .then(function (results) {
      console.log('These results are awesome', results);
    })
    .catch(function (err) {
      console.error('Oh no there was an error', err);
    });
};

module.exports = {
  googleTend,
};
