function isCurrentBinKeyFactory (keyTag) {
  function isCurrentBinKey ({state, path, resolve}) {
    const key = resolve.value(keyTag)
    const currentBinKey = state.get('bin.currentBinKey')

    if (currentBinKey && currentBinKey === key) {
      return path.true()
    }

    return path.false()
  }

  return isCurrentBinKey
}

export default isCurrentBinKeyFactory
