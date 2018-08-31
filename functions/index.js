'use-strict'
const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
// exports.addSmallImage = functions.firestore
//   .document('productsDev/{productsDevId}')
//   .onCreate((snap, context) => {

//   });
exports.addThumbNail = functions.storage.object().onFinalize((object) => {
  console.log(object);

    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const fileName = path.basename(filePath);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const contentType = object.contentType; // File content type.
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
    const metadata = {
      contentType: contentType
    };
    if (!contentType.startsWith('image/')) {
      console.log('This is not an image.');
      return null;
    }
    // Exit if the image is already a thumbnail.
    if (fileName.startsWith('thumb_')) {
      console.log('Already a Thumbnail.');
      return null;
    }
    const bucket = gcs.bucket(fileBucket);
    // perform desired operations ...
    return bucket.file(filePath).download({
      destination: tempFilePath,
    }).then(() => {
      console.log('Image downloaded locally to', tempFilePath);
      // Generate a thumbnail using ImageMagick.
      return spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);
    }).then(() => {
      console.log('Thumbnail created at', tempFilePath);
      // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
      const thumbFileName = `thumb_200x200_${fileName}`;
      const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
      // Uploading the thumbnail.
      return bucket.upload(tempFilePath, {
        destination: thumbFilePath,
        metadata: metadata,
      }).then((res1, res2) => {
        console.log(res1, 'res1');
        console.log(res2, 'res2');
      });
      // Once the thumbnail has been uploaded delete the local file to free up disk space.
    }).then(() => fs.unlinkSync(tempFilePath));;
})
