function updateBin ({state, firebase, path}) {
  const key = state.get('bin.currentBin.key')
  const currentBin = state.get('bin.currentBin')

  return Promise.all([
    firebase.set(`bins.${key}.files`, currentBin.files),
    firebase.set(`bins.${key}.packages`, currentBin.packages),
    firebase.set(`bins.${key}.loaders`, currentBin.loaders)
  ])
    .then(path.success)
    .catch(path.error)
}

export default updateBin
