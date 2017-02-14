function setCurrentBin ({props, state}) {
  state.set('app.currentBinKey', props.key)
  state.set('app.currentBin', Object.assign(props.value, {
    packages: props.value.packages || {},
    loaders: props.value.loaders || {},
    changedFiles: props.value.changedFiles || {}
  }))
}

export default setCurrentBin
