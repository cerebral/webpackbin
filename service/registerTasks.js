'use strict';

const uuid = require('uuid');
const firebase = require('firebase-admin');
const Queue = require('firebase-queue');
const runTask = require('./runTask');
const username = require('username');
const rejectTask = require('./taskHandlers/common/factories/rejectTask');
const errors = require('./taskHandlers/errors');

runTask.on('error', (error) => {
  console.error(`UNCAUGHT TASK ERROR - ${error.message}`, error.stack);
})

function authenticate(context) {
  return new Promise((resolve, reject) => {
    context.firebase.verifyIdToken(context.input.data._token)
      .then((decodedToken) => resolve(context.path.success({uid: decodedToken.uid})))
      .catch((error) => reject(context.path.error({error})));
  });
}

function createRunTask(task) {
  return (data, progress, resolve, reject) => {
    runTask(task.specId, [
      authenticate, {
        success: task.tree,
        error: [rejectTask(errors.AUTHENTICATE)]
      }
    ], {
      data,
      task: {
        id: uuid.v4(),
        type: task.specId,
        resolve,
        reject
      }
    });
  };
}

module.exports = (tasks) => {
  const queueRef = firebase.database().ref('queue');

  return tasks.map((task) => {
    return new Queue(queueRef, {
      specId: (
        process.env.NODE_ENV === 'production' ?
          task.specId
        :
          `${username.sync()}_${task.specId}`
      ),
      numWorkers: task.numWorkers
    }, createRunTask(task));
  });
};
