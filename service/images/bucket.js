'use strict'
const path = require('path');
const utils = require('../../utils/common');
const gcloud = require('gcloud');
const config = require(`../../configs/service-${process.env.DUCKY_ENV}.json`);
const gcs = gcloud.storage({
  projectId: process.env.DUCKY_ENV,
  keyFilename: path.resolve('configs', `gcloud-${process.env.DUCKY_ENV}.json`)
});
const bucket = gcs.bucket(config.storageBucketUrl);

function writeImage(readStream, filePath, filename) {
  return new Promise((resolve, reject) => {
    const remoteWriteStream = bucket.file(`${filePath}${filename}`).createWriteStream();

    remoteWriteStream.on('finish', () => {
      resolve(filename);
    });
    remoteWriteStream.on('error', utils.safeReject(reject));
    readStream.on('error', utils.safeReject(reject));
    readStream.pipe(remoteWriteStream);
  });
}

module.exports = {
  writeImage: writeImage
};
