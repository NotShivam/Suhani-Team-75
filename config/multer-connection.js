const { S3Client } = require('@aws-sdk/client-s3')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path=require("path");
const app = express();
const uuid=require('uuid').v4;

const s3 = new S3Client({region:'ap-south-1'});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'doubtco-test-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuid()}${ext}`);    //Generates Unique name for Video
    }
  })
})

module.exports=upload;