function saveNewBin ({state, firebase, path}) {
  const bin = {
    title: state.get('bin.currentBin.title'),
    owner: state.get('app.user.uid'),
    files: state.get('bin.currentBin.files'),
    packages: state.get('bin.currentBin.packages'),
    loaders: state.get('bin.currentBin.loaders')
  }

  return firebase.push('bins', bin)
    .then(function ({key}) {
      return path.success({
        bin: Object.assign(bin, {key})
      })
    })
    .catch(path.error)
}

export default saveNewBin
