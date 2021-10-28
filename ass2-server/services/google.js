const googleTrends = require('google-trends-api');

const googleTend = (query) => {
  let relatedTopics;
  googleTrends
    .relatedTopics({ keyword: query })
    .then(function (results) {
      const topics = JSON.parse(results);
      const { default: data } = topics;
      const { rankedList } = data;
      const { rankedKeyword } = rankedList[0];
      relatedTopics = rankedKeyword;
      return rankedKeyword;
    })
    .catch(function (err) {
      console.error('Oh no there was an error', err);
    });
  return relatedTopics;
};

module.exports = {
  googleTend,
};
