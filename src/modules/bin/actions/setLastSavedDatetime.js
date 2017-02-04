function setLastSavedDatetime ({state}) {
  state.set('bin.lastSavedDatetime', Date.now())
}

export default setLastSavedDatetime
