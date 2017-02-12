function updateLiveBin ({state, firebase, path}) {
  const key = state.get('bin.currentBinKey')
  const currentBin = state.get('bin.currentBin')

  return firebase.update(`bins.${key}`, {
    files: currentBin.files,
    packages: currentBin.packages,
    loaders: currentBin.loaders,
    logs: []
  })
    .then(path.success)
    .catch(path.error)
}

export default updateLiveBin
