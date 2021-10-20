// Import librabries
const needle = require('needle');

// Get Twiiter bearer token
const TOKEN = process.env.TWITTER_BEARER_TOKEN;

// Endpoint URL
const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL =
  'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id';

// Set stream rules
const setRules = async (rules) => {
  const data = {
    add: rules,
  };
  const response = await needle('post', rulesURL, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.body;
};

// Get stream rules
const getRules = async () => {
  const response = await needle('get', rulesURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  console.log(response.body);
  return response.body;
};

// Delete stream rules
const deleteRules = async (rules) => {
  if (!Array.isArray(rules.data)) {
    return null;
  }

  const ids = rules.data.map((rule) => rule.id);

  const data = {
    delete: {
      ids: ids,
    },
  };

  const response = await needle('post', rulesURL, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.body;
};

// Stream Tweets
const streamTweets = () => {
  const stream = needle.get(streamURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  stream.on('data', (data) => {
    try {
      const json = JSON.parse(data);
      console.log(json);
    } catch (error) {
      console.log('stream error', error);
    }
  });

  return stream;
};

module.exports = {
  setRules,
  deleteRules,
  getRules,
  streamTweets,
};
