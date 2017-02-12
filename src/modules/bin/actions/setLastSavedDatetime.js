function setLastSavedDatetime ({state}) {
  state.set('bin.currentBin.lastSavedDatetime', Date.now())
}

export default setLastSavedDatetime
