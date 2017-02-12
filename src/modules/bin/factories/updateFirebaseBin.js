function updateFirebaseBinFactory (keysOrKey, paths) {
  return [
    function updateFirebaseBin ({firebase, path, state}) {
      const binKey = state.get('bin.currentBinKey')
      const currentParticipantKey = state.get('bin.currentBin.currentParticipantKey')
      const userUid = state.get('app.user.uid')

      if (!binKey || currentParticipantKey !== userUid) {
        return Promise.resolve(path.notAllowed())
      }

      if (Array.isArray(keysOrKey)) {
        return firebase.update(`bins.${binKey}`, keysOrKey.reduce((payload, binPropKey) => {
          payload[binPropKey] = state.get(`bin.currentBin.${binPropKey}`)

          return payload
        }, {}))
          .then(path.success)
          .catch(path.error)
      }

      return firebase.set(`bins.${binKey}.${keysOrKey}`, state.get(`bin.currentBin.${keysOrKey}`))
        .then(path.success)
        .catch(path.error)
    }, paths ? Object.assign({
      success: [],
      error: [],
      notAllowed: []
    }, paths) : {
      success: [],
      error: [],
      notAllowed: []
    }
  ]
}

export default updateFirebaseBinFactory
