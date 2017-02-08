function setCurrentBin ({input, state}) {
  state.set('bin.currentBin', {
    title: input.value.title,
    owner: input.value.owner,
    key: input.key,
    files: input.value.files,
    packages: input.value.packages || {},
    loaders: input.value.loaders || {}
  })
}

export default setCurrentBin
