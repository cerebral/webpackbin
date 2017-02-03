/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const firebase = require('firebase-admin');
const username = require('username');
const extractFilesToTree = require('./extractFilesToTree');
const config = require(`../../configs/service-${process.env.DUCKY_ENV}.json`);

firebase.initializeApp({
  credential: firebase.credential.cert(config.firebaseServiceAccount),
  databaseURL: config.databaseURL
});

function writeRulesFile(rules) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.resolve(config.databaseRules),
      JSON.stringify({rules: rules}, null, 2),
      'utf8',
      (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
  });
}

function writeSpecsToDatabase(specs) {
  return new Promise((resolve, reject) => {
    const specsRef = firebase.database().ref('queue/specs');

    specsRef.update(specs, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

function updateLastDeployDatetime() {
  if (process.env.NODE_ENV !== 'production') {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const lastDeployRef = firebase.database().ref('lastDeploy');

    lastDeployRef.set(Date.now(), (error) => {
      if (error) {
        return reject(error);
      }
      console.log('lastDeployDatetime updated');
      resolve();
    });
  });
}

const updateRules = extractFilesToTree(
  path.resolve('service', 'rules'),
  {'.write': false, '.read': false}
)
  .then((result) => {
    console.log('Writing rules');
    return result;
  })
  .then(writeRulesFile)
  .then(() => {
    console.log('RULES: Updated');
  });

const updateSpecs = extractFilesToTree(path.resolve('service', 'specs'), {})
  .then((result) => {
    console.log('Uploading specs');
    if (process.env.NODE_ENV === 'production') {
      return result;
    }
    const specPrefix = username.sync();

    return Object.keys(result).reduce((allSpecs, key) => {
      allSpecs[`${specPrefix}_${key}`] = result[key];
      result[key].start_state = `${specPrefix}_${result[key].start_state}`;
      result[key].error_state = `${specPrefix}_${result[key].error_state}`;
      result[key].in_progress_state = `${specPrefix}_${result[key].in_progress_state}`;

      return allSpecs;
    }, {});
  })
  .then(writeSpecsToDatabase)
  .then(() => {
    console.log('SPECS: Uploaded');
  });

Promise.all([
  updateRules,
  updateSpecs
])
  .then(() => {
    console.log('Specs deployed, rules ready and activities up and running!');
    process.exit(0);
  })
  .catch((error) => {
    console.log('Could not deploy specs or write rules', error);
  });
