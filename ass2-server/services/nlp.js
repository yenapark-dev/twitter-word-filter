const natural = require('natural');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
const fs = require('fs');
const NUM_TAGS = 5;
const { getRandomText } = require('../services/ramdomText');

const preprocess = async () => {
  try {
    const wordsData = await getRandomText();
    // Split each word
    wordsArray = wordsData.map((e) => ([e] = e.split(' ')));
    return wordsArray;
  } catch (error) {
    console.log(error);
  }
};

// input from user
const getTags = (userInput, corpus) => {
  tfidf.addDocument(formatInput(userInput));
  corpus.map((tweet) => {
    if (tweet !== undefined) {
      tfidf.addDocument(tweet);
    }
  });
  let analysis = [];
  let tags = [];
  tfidf.listTerms(0).forEach(function (item) {
    analysis.push(item);
  });
  for (let i = 0; i < NUM_TAGS; i++) {
    tags[i] = analysis[i];
  }

  return tags;
};

const formatInput = (input) => {
  return input.split(/[\r|\n| ]/);
};

module.exports = {
  preprocess,
  getTags,
};
