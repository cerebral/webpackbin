function updateBin ({state, firebase, path}) {
  const key = state.get('bin.currentBinKey')
  const currentBin = state.get('bin.currentBin')

  return firebase.set(`bins.${key}`, currentBin)
    .then(path.success)
    .catch(path.error)
}

export default updateBin
