const axios = require('axios');

const baseURL = 'http://metaphorpsum.com/paragraphs/1/50';

const getRandomText = async () => {
  let result = [];

  for (i = 0; i < 10; i++) {
    const res = await axios.get(baseURL);
    result.push(res.data);
  }

  return result;
};

module.exports = {
  getRandomText,
};
