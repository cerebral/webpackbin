function removeMyBin ({state, firebase, path}) {
  const userUid = state.get('app.user.uid')
  const currentBinKey = state.get('app.currentBinKey')
  const myBins = state.get('myBins.list')

  const myBinKey = Object.keys(myBins).reduce((myBinKeyMatch, key) => {
    if (myBinKeyMatch) {
      return myBinKeyMatch
    }

    if (myBins[key].binKey === currentBinKey) {
      return key
    }

    return myBinKeyMatch
  }, null)

  return firebase.set(`myBins.${userUid}.${myBinKey}`, null)
    .then(() => {
      return path.success({
        myBinKey
      })
    })
    .catch(path.error)
}

export default removeMyBin
