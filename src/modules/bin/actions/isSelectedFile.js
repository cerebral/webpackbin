function isSelectedFile ({input, state, path}) {
  if (input.index === state.get('bin.selectedFileIndex')) {
    return path.true()
  }

  return path.false()
}

export default isSelectedFile
