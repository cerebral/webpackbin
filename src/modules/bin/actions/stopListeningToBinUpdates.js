function stopListeningToBinUpdates ({firebase, state}) {
  const binKey = state.get('bin.currentBinKey')

  firebase.off('onChildChanged', `bins.${binKey}`, 'bin.liveBinChanged')
  firebase.off('onChildAdded', `codeChanges.${binKey}`, 'bin.liveCodeChanged')
}

export default stopListeningToBinUpdates
