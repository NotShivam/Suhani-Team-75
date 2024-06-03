//Sets up Amazon S3

const aws = require('aws-sdk');
const { S3Client, AbortMultipartUploadCommand } = require("@aws-sdk/client-s3");
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new aws.S3({ apiVersion: '2006-03-01'});

module.exports = { s3 }