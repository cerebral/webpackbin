function selectNewFile ({state}) {
  const filesCount = state.get('bin.files.list').length

  state.set('bin.files.selectedFileIndex', filesCount - 1)
}

export default selectNewFile
