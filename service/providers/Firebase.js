function FirebaseProvider(firebase) {
  return (context) => {
    context.firebase = {
      verifyIdToken(token) {
        return firebase.auth().verifyIdToken(token)
      },
      createKey(path) {
        return firebase.database().ref(path).push().key;
      },
      deleteUser(uid) {
        context.debugger && context.debugger.send({
          method: 'firebase.deleteUser',
          color: 'green',
          args: [uid]
        })

        return new Promise((resolve, reject) => {
          firebase.auth().deleteUser(uid)
            .then(() => resolve())
            .catch((error) => reject({error}));
        });
      },
      remove(path) {
        const ref = firebase.database().ref(path);

        context.debugger && context.debugger.send({
          method: 'firebase.remove',
          color: 'green',
          args: [path]
        })
        return new Promise((resolve, reject) => {
          ref.remove()
            .then(() => resolve())
            .catch((error) => reject({error: error.message}));
        });
      },
      push(path, value) {
        const ref = firebase.database().ref(path).push();

        context.debugger && context.debugger.send({
          method: 'firebase.push',
          color: 'green',
          args: [path, value]
        })
        return new Promise((resolve, reject) => {
          ref.set(value)
            .then(() => resolve({key: ref.key}))
            .catch((error) => reject({error: error.message}));
        });
      },
      set(path, value) {
        context.debugger && context.debugger.send({
          method: 'firebase.set',
          color: 'green',
          args: [path, value]
        })
        return new Promise((resolve, reject) => {
          firebase.database().ref(path).set(value)
            .then(() => resolve())
            .catch((error) => reject({error: error.message}));
        });
      },
      update(path, value) {
        context.debugger && context.debugger.send({
          method: 'firebase.update',
          color: 'green',
          args: [path, value]
        })
        return new Promise((resolve, reject) => {
          firebase.database().ref(path).update(value)
            .then(() => resolve())
            .catch((error) => reject({error: error.message}));
        });
      },
      value(path, options) {
        context.debugger && context.debugger.send({
          method: 'firebase.value',
          color: 'green',
          args: [path].concat(options || [])
        })
        options = options || {};

        return new Promise((resolve, reject) => {
          Object.keys(options).reduce((currentRef, optionKey) => {
            return currentRef[optionKey](options[optionKey]);
          }, firebase.database().ref(path)).once('value', (snapshot) => {
            resolve({
              key: path.split('\/').pop(),
              value: snapshot.val()
            });
          }, (error) => reject({error: error.message}));
        });
      },
      transaction(path, cb) {
        context.debugger && context.debugger.send({
          method: 'firebase.transaction',
          color: 'green',
          args: [path]
        })
        return new Promise((resolve, reject) => {
          firebase.database().ref(path).transaction(cb)
            .then(() => resolve())
            .catch((error) => reject({error: error.message}));
        });
      }
    };

    return context;
  };
}

module.exports = FirebaseProvider;
