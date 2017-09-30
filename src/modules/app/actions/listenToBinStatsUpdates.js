function listenToBinStatsUpdates({ state, firebase }) {
  const currentBinKey = state.get('app.currentBinKey');

  firebase.onValue(
    `stats.bins.${currentBinKey}.viewCount`,
    'app.currentBinViewCountUpdated'
  );
}

export default listenToBinStatsUpdates;
