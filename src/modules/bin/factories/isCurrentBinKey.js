function isCurrentBinKeyFactory (keyTag) {
  function isCurrentBinKey ({state, path, resolve}) {
    const key = resolve.value(keyTag)
    const currentBin = state.get('bin.currentBin')

    if (currentBin && currentBin.key === key) {
      return path.true()
    }

    return path.false()
  }

  return isCurrentBinKey
}

export default isCurrentBinKeyFactory
