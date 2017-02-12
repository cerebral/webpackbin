function setNewSelectedFileIndex ({state}) {
  const selectedFileIndex = state.get('bin.currentBin.selectedFileIndex')

  state.set('bin.currentBin.selectedFileIndex', selectedFileIndex - 1)
}

export default setNewSelectedFileIndex
