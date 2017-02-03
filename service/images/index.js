const writePostImages = require('./writePostImages');
const writeAvatarImages = require('./writeAvatarImages');

module.exports = {
  init(app) {
    app.post('/upload/images/posts', (req, res) => {
      writePostImages(req)
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message
          });
        });
    });

    app.post('/upload/images/avatars', (req, res) => {
      writeAvatarImages(req)
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message
          });
        });
    });
  }
};
