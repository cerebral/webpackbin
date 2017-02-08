function setCurrentBin ({input, state}) {
  state.set('bin.currentBin', {
    title: input.value.title,
    owner: input.value.owner,
    key: input.key
  })
  state.set('bin.files.list', input.value.files)
  state.set('bin.configure.loaders', input.value.loaders || {})
  state.set('bin.configure.packages', input.value.packages || {})
}

export default setCurrentBin
