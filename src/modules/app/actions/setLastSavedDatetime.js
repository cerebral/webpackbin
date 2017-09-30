function setLastSavedDatetime({ state }) {
  state.set('app.currentBin.lastSavedDatetime', Date.now());
}

export default setLastSavedDatetime;
