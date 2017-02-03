'use strict';

const uuid = require('uuid');
const multiparty = require('multiparty');
const utils = require('../../utils/common');
const im = require('imagemagick-stream');
const bucket = require('./bucket');

function writeAvatarImages(req) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();

    form.on('part', (part) => {
      const SMALL_SIZE = '50>x50>';
      const LARGE_SIZE = '125>x125>';

      if (part.filename) {
        const filenameSmall = `${uuid.v1()}.jpg`;
        const filenameLarge = `${uuid.v1()}.jpg`;
        const resizeSmall = im()
          .set('background', '#ffffff')
          .set('alpha', 'remove')
          .resize(SMALL_SIZE)
          .quality(90)
          .autoOrient()
          .outputFormat('jpg');
        const resizeLarge = im()
          .set('background', '#ffffff')
          .set('alpha', 'remove')
          .resize(LARGE_SIZE)
          .quality(90)
          .autoOrient()
          .outputFormat('jpg');

        part.on('error', utils.safeReject(reject));
        Promise.all([
          bucket.writeImage(part.pipe(resizeSmall), 'avatars/', filenameSmall),
          bucket.writeImage(part.pipe(resizeLarge), 'avatars/', filenameLarge)
        ])
          .then((images) => {
            resolve({
              small: images[0],
              large: images[1]
            });
          })
          .catch(reject);
      }
    });
    form.on('error', utils.safeReject(reject));
    form.parse(req);
  });
}

module.exports = writeAvatarImages;
