function setNewSelectedFileIndex ({state}) {
  const selectedFileIndex = state.get('bin.selectedFileIndex')

  state.set('bin.selectedFileIndex', selectedFileIndex - 1)
}

export default setNewSelectedFileIndex
