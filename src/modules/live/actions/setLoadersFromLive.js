function setLoadersFromLive({ input, state }) {
  state.set('app.currentBin.loaders', input.value || {});
}

export default setLoadersFromLive;
