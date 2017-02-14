function saveNewBin ({state, firebase, path}) {
  return firebase.push('bins', state.get('app.currentBin'))
    .then(function ({key}) {
      return path.success({
        binKey: key
      })
    })
    .catch(path.error)
}

export default saveNewBin
