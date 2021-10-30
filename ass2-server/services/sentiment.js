const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const createCSVWriter = require('csv-writer').createObjectCsvWriter;

// Calculate the sentiment score of each tweet input
function sentimentAnalysis(text, tags, id) {
  let output = {};
  return new Promise((resolve) => {
    if (text !== undefined) {
      text = text.replace(/[^a-zA-Z ]/g, '');
      const result = sentiment.analyze(text);
      console.log(result);
      output = {
        id: 'cab432-tweets-' + id,
        tags: tags,
        text,
        score: result.score,
        pos_words: result.positive,
        neg_word: result.negative,
      };
      console.log(output);
      resolve(output);
    }
  });
}
sentimentAnalysis(
  'Corrupt Burr’s Brother-in-Law Called Stock Broker, One Minute After Getting Off Phone With Senator',
  'phone',
  'phone'
);
// Extract the tweet text from the tweet object from the streaming
async function parseTweets(body) {
  return new Promise((resolve) => {
    let tweet = body;
    let tweetMessage = '';
    if (tweet != undefined) {
      if (tweet.extended_tweet) {
        tweetMessage = tweet.extended_tweet.full_text;
      } else {
        if (tweet.retweeted_status) {
          if (tweet.retweeted_status.extended_tweet) {
            tweetMessage = tweet.retweeted_status.extended_tweet.full_text;
          } else {
            tweetMessage = tweet.retweeted_status.text;
          }
        } else {
          tweetMessage = tweet.text;
        }
      }
    }
    resolve(tweetMessage);
  });
}

/// This function sorts iterates over an array of tweets and stores the word and the word counts in an objeect
function parseDataArray(rawData) {
  let word_count = {};
  // Parse the Data
  for (let i = 0; i < rawData.length; i++) {
    let textString = rawData[i];
    //console.log(textString)
    let words = textString.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    //console.log(words)
    words.forEach(function (word) {
      word = word.toLowerCase();
      if (word != '' && commonWords.indexOf(word) == -1 && word.length > 1) {
        if (word_count[word]) {
          word_count[word]++;
        } else {
          word_count[word] = 1;
        }
      }
    });
  }
  //console.log(word_count);
  return word_count;
}

// This function will turn the object of wordcounts and save it into a CSVfile for D3JS to visualise
function saveCSV(word_count, path) {
  const csvWriter = createCSVWriter({
    path: path,
    header: [
      { id: 'word', title: 'Word' },
      { id: 'frequency', title: 'Frequency' },
    ],
  });
  let data = [];
  for (let key in word_count) {
    //let str = "{ word: " + "'"+ key + "'" + "," + " frequency:" + "'" + word_count[key] +"'" + "}";
    let obj = {};
    obj.word = key;
    obj.frequency = word_count[key];
    //eval('var obj='+str);
    data.push(obj);
  }
  csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written Successfully'));
}

module.exports = {
  sentimentAnalysis,
};
