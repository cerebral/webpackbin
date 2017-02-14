function isOwnerOfCurrentBin ({state, path}) {
  const bin = state.get('app.currentBin')
  const user = state.get('app.user')

  if (bin && bin.owner === user.uid) {
    return path.true()
  }

  return path.false()
}

export default isOwnerOfCurrentBin
