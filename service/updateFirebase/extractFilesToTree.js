const path = require('path');
const fs = require('fs');

function readFile(filesPath) {
  return (file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve(filesPath, file), (error, content) => {
        if (error) {
          return reject(error);
        }
        resolve({
          name: file,
          content: content.toString()
        });
      });
    });
  };
}

function createRulesTree(tree) {
  return (files) => {
    return files.reduce((rules, file) => {
      rules[path.basename(file.name, '.json')] = JSON.parse(file.content);
      return rules;
    }, tree);
  };
}

module.exports = function extractRules(filesPath, tree) {
  const files = fs.readdirSync(filesPath);

  return Promise.all(files.map(readFile(filesPath)))
    .then(createRulesTree(tree))
    .catch((error) => {
      console.log('Could not extract', filePath, error);
    });
};
