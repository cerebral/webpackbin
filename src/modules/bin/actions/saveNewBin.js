function saveNewBin ({state, firebase, path}) {
  return firebase.push('bins', state.get('bin.currentBin'))
    .then(function ({key}) {
      return path.success({
        binKey: key
      })
    })
    .catch(path.error)
}

export default saveNewBin
