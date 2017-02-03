'use strict';

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const firebase = require('firebase-admin');
const dashboard = require('./dashboard');
const images = require('./images');
const registerTasks = require('./registerTasks');
const cors = require('cors');
const registerApi = require('./api');
const bodyParser = require('body-parser');
const config = require(`../configs/service-${process.env.DUCKY_ENV}.json`);
const tasks = require('./taskHandlers');
const runTask = require('./runTask');

firebase.initializeApp({
  credential: firebase.credential.cert(config.firebaseServiceAccount),
  databaseURL: config.databaseURL
});

app.use((req, res, next) => {
  // For production, lock out other requests
  next();
});
// This should be removed?
app.use(cors());
app.use(bodyParser.json());

const io = dashboard.init(app, server, runTask);
images.init(app);

const queues = registerTasks(tasks);
registerApi(app);

server.listen(port, () => {
  console.log('Server listening on ' + port);
});

let isShuttingDown = false
process.on('SIGTERM', function () {
  if (isShuttingDown) {
    return
  }
  isShuttingDown = true

  console.log('FIREBASE: Shutting down ' + queues.length + ' queues');
  console.log('HTTP: Closing remaining connections');
  const queuesShutdown = queues.map((queue, index) => {
    return new Promise((resolve, reject) => {
      queue.shutdown().then(resolve, reject);
    })
      .then(() => console.log('FIREBASE: Queue ' + index + ', has been shut down'))
  })
  const apiShutdown = new Promise((resolve) => {
    server.close(resolve);
  })
    .then(() => console.log('HTTP: Api has shut down successfully'))
  const dashboardShutdown = new Promise((resolve) => {
    io.close(resolve);
  })
    .then(() => console.log('IO: Dashboard has shut down successfully'))

  Promise.all(queuesShutdown.concat(apiShutdown, dashboardShutdown))
  .then(() => {
    console.log('Graceful shutdown successful');
    process.exit(0);
  })
  .catch((error) => {
    console.error('An error occured gracefully shutting down');
    console.error(error);
    process.exit(1);
  });
});
