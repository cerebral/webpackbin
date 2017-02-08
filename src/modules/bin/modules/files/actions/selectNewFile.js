function selectNewFile ({state}) {
  const filesCount = state.get('bin.currentBin.files').length

  state.set('bin.files.selectedFileIndex', filesCount - 1)
}

export default selectNewFile
