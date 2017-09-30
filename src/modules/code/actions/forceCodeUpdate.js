function forceCodeUpdate({ state }) {
  state.set('code.lastForceCodeUpdate', Date.now());
}

export default forceCodeUpdate;
