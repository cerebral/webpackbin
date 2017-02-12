function setCurrentBin ({props, state}) {
  state.set('bin.currentBinKey', props.key)
  state.set('bin.currentBin', Object.assign(props.value, {
    packages: props.value.packages || {},
    loaders: props.value.loaders || {},
    changedFiles: props.value.changedFiles || {}
  }))
}

export default setCurrentBin
