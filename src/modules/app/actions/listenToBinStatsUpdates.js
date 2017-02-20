function listenToBinStatsUpdates ({state, firebase}) {
  const currentBinKey = state.get('app.currentBinKey')

  firebase.onValue(`stats.bins.${currentBinKey}.seenCount`, 'app.currentBinSeenCountUpdated')
}

export default listenToBinStatsUpdates
