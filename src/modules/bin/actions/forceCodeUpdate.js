function forceCodeUpdate ({state}) {
  state.set('bin.lastForceCodeUpdate', Date.now())
}

export default forceCodeUpdate
