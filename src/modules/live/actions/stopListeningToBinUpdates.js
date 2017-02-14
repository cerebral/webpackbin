function stopListeningToBinUpdates ({firebase, state}) {
  const binKey = state.get('app.currentBinKey')

  firebase.off(`bins.${binKey}`, 'onChildChanged', 'live.liveBinChanged')
  firebase.off(`bins.${binKey}`, 'onChildAdded', 'live.liveBinChanged')
  firebase.off(`bins.${binKey}`, 'onChildRemoved', 'live.liveBinChanged')
  firebase.off(`codeChanges.${binKey}`, 'onChildAdded', 'live.liveCodeChanged')
}

export default stopListeningToBinUpdates
