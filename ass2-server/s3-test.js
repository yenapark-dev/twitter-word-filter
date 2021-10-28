// require("dotenv").config();
// const AWS = require("aws-sdk");

// // Create unique bucket name
// const bucketName = "yenapark-tweet-store";
// //Basic key/key - fixed here, modify for the route code
// const key = `wonder`;
// const s3Key = `wikipedia-${key}`;

// // // Create a promise on S3 service object
// // const bucketPromise = new AWS.S3({ apiVersion: "2006-03-01" })
// //   .createBucket({ Bucket: bucketName })
// //   .promise();
// // bucketPromise
// //   .then(function (data) {
// //     console.log("Successfully created " + bucketName);
// //   })
// //   .catch(function (err) {
// //     console.error(err, err.stack);
// //   });

// // Create a promise on S3 service object
// const bucketPromise = new AWS.S3({ apiVersion: "2006-03-01" })
//   .createBucket({ Bucket: bucketName })
//   .promise();
// // Handle promise fulfilled/rejected states
// bucketPromise
//   .then(function (data) {
//     // Create params for put Object call
//     const objectParams = {
//       Bucket: bucketName,
//       Key: s3Key,
//       Body: "Sam Wonder Dog",
//     };
//     // Create object upload promise
//     const uploadPromise = new AWS.S3({ apiVersion: "2006-03-01" })
//       .putObject(objectParams)
//       .promise();
//     uploadPromise.then(function (data) {
//       console.log("Successfully uploaded data to " + bucketName + "/" + s3Key);
//     });
//   })
//   .catch(function (err) {
//     console.error(err, err.stack);
//   });

