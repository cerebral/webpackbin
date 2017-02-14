function updateLiveBin ({state, firebase, path}) {
  const key = state.get('app.currentBinKey')
  const currentBin = state.get('app.currentBin')

  return firebase.update(`bins.${key}`, {
    files: currentBin.files,
    packages: currentBin.packages,
    loaders: currentBin.loaders
  })
    .then(path.success)
    .catch(path.error)
}

export default updateLiveBin
