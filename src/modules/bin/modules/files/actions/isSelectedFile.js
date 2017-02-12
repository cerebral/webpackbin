function isSelectedFile ({props, state, path}) {
  if (props.index === state.get('bin.currentBin.selectedFileIndex')) {
    return path.true()
  }

  return path.false()
}

export default isSelectedFile
