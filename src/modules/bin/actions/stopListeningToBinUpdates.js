function stopListeningToBinUpdates ({firebase, state}) {
  const binKey = state.get('bin.currentBinKey')

  firebase.off(`bins.${binKey}`, 'onChildChanged', 'bin.liveBinChanged')
  firebase.off(`bins.${binKey}`, 'onChildAdded', 'bin.liveBinChanged')
  firebase.off(`bins.${binKey}`, 'onChildRemoved', 'bin.liveBinChanged')
  firebase.off(`codeChanges.${binKey}`, 'onChildAdded', 'bin.liveCodeChanged')
}

export default stopListeningToBinUpdates
