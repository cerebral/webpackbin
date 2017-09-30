function setPackagesFromLive({ input, state }) {
  state.set('app.currentBin.packages', input.value || {});
}

export default setPackagesFromLive;
