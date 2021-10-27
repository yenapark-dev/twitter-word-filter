// Load env files from .env file
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const redis = require('redis');

const indexRouter = require('./routes/index');

const app = express();

// create and connect redis client to local instance. =>>>> not to local, change to ELASTIC
const redisClient = redis.createClient();

// Print redis errors to the console
redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

// const AWS = require('aws-sdk');

// // Create unique bucket name
// const bucketName = 'angelwong6-wikipedia-store';

// // Create a promise on S3 service object
// const bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' })
//   .createBucket({ Bucket: bucketName })
//   .promise();
// bucketPromise
//   .then(function (data) {
//     console.log('Successfully created ' + bucketName);
//   })
//   .catch(function (err) {
//     console.error(err, err.stack);
//   });

// Configure CORS settings
const WHITELISTED_ORIGINS = ['http://localhost:3000', 'http://localhost:8080'];
app.use(cors({ origin: WHITELISTED_ORIGINS, credentials: true }));

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);
app.use(express.static(path.join(__dirname, '../client/build')));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('server is up on port', port);
});
