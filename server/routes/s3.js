const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk');
// Set the credentials
const SESConfig = {
  apiVersion: "latest",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
  region: "ap-south-1"
}
console.log(SESConfig);

AWS.config.update(SESConfig);
// AWS.config.update({region: 'ap-south-1'});

// Create S3 service object
s3 = new AWS.S3();

// get buckets
router.get('/listbuckets',(req,res) => {

    s3.listBuckets(function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Buckets);
          res.send(data.Buckets)
        }
      });

});

// get bucket objects
router.get('/listobjects/:name',(req,res) => {
    let bucketParams = {
        Bucket : `${req.params.name}`,
      };
      
      // Call S3 to obtain a list of the objects in the bucket
      s3.listObjects(bucketParams, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
          res.send(data.Contents)
        }
      });
});
// create bucket
// request body 
// {'name':'bucket name'}
router.post('/create', (req,res) => {
    var bucketParams = {
        Bucket : `${req.body.name}`
      };
      
      // call S3 to create the bucket
      s3.createBucket(bucketParams, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
          res.send(data)
        }
      });
});

// upload obj to bucket
router.post('/upload', (req,res) => {
    
    // call S3 to retrieve upload file to specified bucket
    let uploadParams = {Bucket: `${req.body.name}`, Key: '', Body: ''};
    let file = `${req.body.file}`

    // Configure the file stream and obtain the upload parameters
    let fs = require('fs');
    let fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
    console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    let path = require('path');
    uploadParams.Key = path.basename(file);

    // call S3 to retrieve upload file to specified bucket
    s3.upload (uploadParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } if (data) {
        console.log("Upload Success", data.Location);
        res.send(data)
    }
    });
});

// delete bucket
router.delete('/delete/:name',(req,res) => {
    var bucketParams = {
        Bucket : `${req.params.name}`
      };
      
      // Call S3 to delete the bucket
      s3.deleteBucket(bucketParams, function(err, data) {
        if (err) {
          console.log("Error", err);
          res.status(409).send(err)
        } else {
          console.log("Success", data);
          res.send(data)
        }
      });
});

module.exports = router