function listenToBinUpdates ({firebase, state}) {
  const binKey = state.get('bin.currentBinKey')

  firebase.onChildChanged(`bins.${binKey}`, 'bin.liveBinChanged')
  firebase.onChildAdded(`codeChanges.${binKey}`, 'bin.liveCodeChanged')
}

export default listenToBinUpdates
