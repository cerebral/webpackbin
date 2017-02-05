function setCurrentBin ({input, state}) {
  state.set('bin.currentBin', {
    title: input.value.title,
    owner: input.value.owner,
    key: input.key
  })
  state.set('bin.files.list', input.value.files)
}

export default setCurrentBin
