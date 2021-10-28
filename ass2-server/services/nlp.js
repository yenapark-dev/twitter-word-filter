const natural = require('natural');
const TfIdf = natural.TfIdf;
const fs = require('fs');
const NUM_TAGS = 5;
const { getRandomText } = require('./randomText');

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
  const tfidf = new TfIdf();
  tfidf.addDocument(formatInput(userInput));
  corpus.map((praragraph) => {
    if (praragraph !== undefined) {
      tfidf.addDocument(praragraph);
    }
  });
  let analysis = [];
  let tags = [];

  tfidf.listTerms(0).forEach(function (item) {
    console.log(item, 'item');
    analysis.push(item);
  });
  for (let i = 0; i < NUM_TAGS; i++) {
    tags[i] = analysis[i];
  }
  console.log(tags);

  return tags;
};

const formatInput = (input) => {
  input = input.toLowerCase();
  input = input.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
  result = input.filter((word) => {
    if (commonWords.indexOf(word) == -1) return word;
  });

  return result;
};

const commonWords = [
  'about',
  'above',
  'after',
  'again',
  'all',
  'also',
  'am',
  'an',
  'and',
  'another',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'before',
  'being',
  'below',
  'between',
  'both',
  'but',
  'by',
  'came',
  'can',
  'cannot',
  'come',
  'could',
  'did',
  'do',
  'does',
  'doing',
  'during',
  'each',
  'few',
  'for',
  'from',
  'further',
  'get',
  'got',
  'has',
  'had',
  'he',
  'have',
  'her',
  'here',
  'him',
  'himself',
  'his',
  'how',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'itself',
  'like',
  'make',
  'many',
  'me',
  'might',
  'more',
  'most',
  'much',
  'must',
  'my',
  'myself',
  'never',
  'now',
  'of',
  'on',
  'only',
  'or',
  'other',
  'our',
  'ours',
  'ourselves',
  'out',
  'over',
  'own',
  'really',
  'said',
  'same',
  'see',
  'should',
  'since',
  'so',
  'some',
  'still',
  'such',
  'take',
  'than',
  'that',
  'the',
  'their',
  'theirs',
  'them',
  'themselves',
  'then',
  'there',
  'these',
  'they',
  'this',
  'those',
  'through',
  'to',
  'too',
  'under',
  'until',
  'up',
  'very',
  'was',
  'way',
  'we',
  'well',
  'were',
  'what',
  'where',
  'when',
  'which',
  'while',
  'who',
  'whom',
  'will',
  'with',
  'would',
  'why',
  'you',
  'your',
  'yours',
  'yourself',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '$',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '_',
];

module.exports = {
  preprocess,
  getTags,
};
