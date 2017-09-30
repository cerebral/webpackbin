function listenToBinUpdates({ firebase, state }) {
  const binKey = state.get('app.currentBinKey');

  firebase.onChildChanged(`bins.${binKey}`, 'live.liveBinChanged');
  firebase.onChildAdded(`bins.${binKey}`, 'live.liveBinChanged');
  firebase.onChildRemoved(`bins.${binKey}`, 'live.liveBinChanged');
  firebase.onChildAdded(`codeChanges.${binKey}`, 'live.liveCodeChanged');
}

export default listenToBinUpdates;
