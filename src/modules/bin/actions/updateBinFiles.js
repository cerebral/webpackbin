function updateBinFiles ({state, firebase, path}) {
  const key = state.get('bin.currentBin.key')
  const files = state.get('bin.files.list')

  return firebase.set(`bins.${key}.files`, files)
    .then(path.success)
    .catch(path.error)
}

export default updateBinFiles
