function setPackagesFromLive ({input, state}) {
  state.set('bin.currentBin.packages', input.value || {})
}

export default setPackagesFromLive
