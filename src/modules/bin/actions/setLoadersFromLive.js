function setLoadersFromLive ({input, state}) {
  state.set('bin.currentBin.loaders', input.value || {})
}

export default setLoadersFromLive
