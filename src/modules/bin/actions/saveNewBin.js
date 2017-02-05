function saveNewBin ({state, firebase, path}) {
  const bin = {
    title: '',
    owner: state.get('app.user.uid'),
    files: state.get('bin.files.list'),
    packages: {},
    loaders: []
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
