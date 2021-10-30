const axios = require('axios');

const baseURL = 'http://metaphorpsum.com/paragraphs/25/50';

const getRandomText = async () => {
  let result = [];

  for (i = 0; i < 1; i++) {
    const res = await axios.get(baseURL);
    result.push(res.data);
  }

  return result;
};

module.exports = {
  getRandomText,
};
