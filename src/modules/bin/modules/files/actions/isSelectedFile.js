function isSelectedFile ({input, state, path}) {
  if (input.index === state.get('bin.files.selectedFileIndex')) {
    return path.true()
  }

  return path.false()
}

export default isSelectedFile
