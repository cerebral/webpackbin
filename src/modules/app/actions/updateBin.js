function updateBin ({state, firebase, path}) {
  const key = state.get('app.currentBinKey')
  const currentBin = state.get('app.currentBin')

  return firebase.set(`bins.${key}`, currentBin)
    .then(path.success)
    .catch(path.error)
}

export default updateBin
