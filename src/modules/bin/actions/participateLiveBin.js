function participateLiveBin ({state, firebase, path}) {
  const binKey = state.get('bin.currentBinKey')
  const user = state.get('app.user')
  const displayName = user.providerData.length ? user.providerData[0].displayName : 'Anonymous'

  return firebase.set(`bins.${binKey}.participants.${user.uid}`, displayName)
    .then(path.success)
    .catch(path.error)
}

export default participateLiveBin
